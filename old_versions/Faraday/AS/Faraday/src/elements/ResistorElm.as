package elements
{
	import flash.display.Graphics;
	import flash.geom.Point;
	
	import main.CirSim;
	
	import ui.EditInfo;
	
	import utility.StringTokenizer;

	public class ResistorElm extends CircuitElm {
		public var resistance:Number;
		public var ps3:Point;
		public var ps4:Point;
		

		public function ResistorElm( xa:int, ya:int, xb:int, yb:int, f:int, st:StringTokenizer ) {
			super(xa, ya, xb, yb, f);
			if(st != null)
				this.resistance = Number(st.nextToken());
		}
		
		override public function draw(g:Graphics):void {
			var segments:int = 16;
			
			var i:int;
			var ox:int;
			var hs:Number = 6;
			var v1:Number = volts[0];
			var v2:Number = volts[1];
			setBboxPt(point1, point2, hs);
			draw2Leads(g);
			setPowerColor(true);
			var segf:Number = 1 / segments;
			
			for (i = 0; i != segments; i++) {
				var nx:int = 0;
				switch (i & 3) {
					case 0:
						nx = 1;
						break;
					case 2:
						nx = -1;
						break;
					default:
						nx = 0;
						break;
				}
				var v:Number = v1 + (v2 - v1) * i / segments;
				var color:uint = setVoltageColor(v);
				interpPoint(lead1, lead2, ps1, i * segf, hs * ox);
				interpPoint(lead1, lead2, ps2, (i + 1) * segf, hs * nx);
				drawThickLinePt(ps1, ps2, color);
				ox = nx;
			}
			
			if(sim.showValuesCheckItem) {
				var s:String = getShortUnitText(resistance, "");
				drawValues(s, hs);
			}
			
			doDots();
			drawPosts();
			
		}
		
		override public function dump():String {
			// TODO Auto Generated method stub
			return super.dump() + " " + resistance;
		}
		
		override public function getDumpType() : * {
			return 'r';
		}
		
		override public function getEditInfo(n:int):EditInfo {
			// TODO Auto Generated method stub
			return super.getEditInfo(n);
		}
		
		override public function getInfo(arr:Array) : void {
			arr[0] = "resistor";
			getBasicInfo(arr);
			arr[3] = "R = " + getUnitText(resistance, CirSim.ohmString);
			arr[4] = "P = " + getUnitText(getPower(), "W");
		}
		
		override public function needsShortcut() : Boolean {
			return true;
		}
		
		override public function calculateCurrent() : void {
			current = (volts[0] - volts[1]) / resistance;
		}
		
		override public function setEditValue(n:int, ei:EditInfo):void {
			// TODO Auto Generated method stub
			super.setEditValue(n, ei);
		}
		
		override public function setPoints() : void {
			super.setPoints();
			calcLeads(32);
			ps3 = new Point();
			ps4 = new Point();
		}
		
		override public function stamp():void {
			sim.stampResistor(nodes[0], nodes[1], resistance);
		}
		
		
		
	}
}