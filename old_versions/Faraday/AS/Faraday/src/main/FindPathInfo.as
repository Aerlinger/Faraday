package main
{
	import elements.*;
	import elements.CircuitElm;
	
	import mx.utils.ArrayUtil;
	
	import utility.ArrayUtils;

	public class FindPathInfo {
		
		public static const INDUCT:uint = 1;
		public static const VOLTAGE:uint = 2;
		public static const SHORT:uint = 3;
		public static const CAP_V:uint = 4;
		
		private var used:Array;		// Array of boolean values
		
		private var dest:int;
		private var firstElm:CircuitElm;
		private var type:int;
		
		private var elmList:Array;
		
		public function FindPathInfo(t:int, e:CircuitElm, d:int, elementList:Array, numNodes:int) {
			dest = d;
			type = t;
			firstElm = e;
			
			elmList = elementList;
			//used = ArrayUtils.initializeOneDArray(sim.nodeList.length);
			used = new Array(numNodes);
			/*used = */ArrayUtils.initializeOneDArray(used, numNodes);
		}
		
		
		public function findPath(n1:int, depth:int=-1) : Boolean {
			if (n1 == dest)
				return true;
			if (depth-- == 0)
				return false;
			if (used[n1]) {
				//System.out.println("used " + n1);
				return false;
			}
			used[n1] = true;
			var i:int;
			for (i = 0; i != elmList.length; i++) {
				var ce:CircuitElm = elmList[i]
				if (ce == firstElm)
					continue;
				if (type == INDUCT) {
					if (ce instanceof CurrentElm)
						continue;
				}
				if (type == VOLTAGE) {
					if (!(ce.isWire() || ce instanceof VoltageElm))
						continue;
				}
				if (type == SHORT && !ce.isWire())
					continue;
				if (type == CAP_V) {
					if (!(ce.isWire() || ce instanceof CapacitorElm ||
						ce instanceof VoltageElm))
						continue;
				}
				if (n1 == 0) {
					// look for posts which have a ground connection;
					// our path can go through ground
					var j:int;
					for (j = 0; j != ce.getPostCount(); j++)
						if (ce.hasGroundConnection(j) &&
								findPath(ce.getNode(j), depth)) {
							used[n1] = false;
							return true;
						}
				}
				var j:int;
				for (j = 0; j != ce.getPostCount(); j++) {
					//System.out.println(ce + " " + ce.getNode(j));
					if (ce.getNode(j) == n1)
						break;
				}
				if (j == ce.getPostCount())
					continue;
				if (ce.hasGroundConnection(j) && findPath(0, depth)) {
					//System.out.println(ce + " has ground");
					used[n1] = false;
					return true;
				}
				if (type == INDUCT && ce instanceof InductorElm) {
					var c:Number = ce.getCurrent();
					if (j == 0)
						c = -c;
					//System.out.println("matching " + c + " to " + firstElm.getCurrent());
					//System.out.println(ce + " " + firstElm);
					if (Math.abs(c - firstElm.getCurrent()) > 1e-10)
						continue;
				}
				var k:int;
				for (k = 0; k != ce.getPostCount(); k++) {
					if (j == k)
						continue;
					//System.out.println(ce + " " + ce.getNode(j) + "-" + ce.getNode(k));
					if (ce.getConnection(j, k) && findPath(ce.getNode(k), depth)) {
						//System.out.println("got findpath " + n1);
						used[n1] = false;
						return true;
					}
					//System.out.println("back on findpath " + n1);
				}
			}
			used[n1] = false;
			//System.out.println(n1 + " failed");
			return false;
		}
		
	} // END Class
}