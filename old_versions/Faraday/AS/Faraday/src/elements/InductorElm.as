package elements
{
	import elements.core.Inductor;
	
	import flash.display.Graphics;
	
	import flashx.textLayout.factory.StringTextLineFactory;
	
	import ui.EditInfo;
	
	import utility.StringTokenizer;

	public class InductorElm extends CircuitElm {
		
		private var ind:Inductor;
		public var inductance:Number = 0;
		
		public function InductorElm( xa:int, ya:int, xb:int, yb:int, f:int, st:StringTokenizer ) {
			super(xa, ya, xb, yb, f);
			ind = new Inductor(sim);
			if( st!=null ) {
				this.inductance = Number(st.nextToken());
				this.current = Number(st.nextToken());
			}
			
			ind.setup(inductance, current, flags);
		}
		
		override public function draw(g:Graphics) : void {
			var v1:Number = volts[0];
			var v2:Number = volts[1];
			var i:int;
			var hs:int = 8;
			setBboxPt(point1, point2, hs);
			draw2Leads(g);
			setPowerColor(false);
			drawCoil(g, 8, lead1, lead2, v1, v2);
			
			if (sim.showValuesCheckItem) {
				var s:String = getShortUnitText(inductance, "H");
				drawValues(s, hs);
			}
			
			doDots();
			drawPosts();
		}
		
		override public function dump():String {
			return super.dump() + " " + inductance + " " + current;
		}
		
		override public function getDumpType() : * {
			return 'l';
		}
		
		override public function getEditInfo(n:int) : EditInfo {
			if (n == 0)
				return new EditInfo("Inductance (H)", inductance, 0, 0);
			if (n == 1) {
				var ei:EditInfo = new EditInfo("", 0, -1, -1);
				//ei.checkbox = new Checkbox("Trapezoidal Approximation",
				//	ind.isTrapezoidal());
				return ei;
			}
			return null;
		}
		
		override public function startIteration() : void {
			ind.startIteration(volts[0] - volts[1]);
		}
		
		override public function nonLinear() : Boolean {
			return ind.nonLinear();
		}
		
		override public function calculateCurrent() : void {
			var voltdiff:Number = volts[0] - volts[1];
			current = ind.calculateCurrent(voltdiff);
		}
		
		override public function doStep() : void {
			var voltdiff:Number = volts[0] - volts[1];
			ind.doStep(voltdiff);
		}
		
		
		override public function getInfo(arr:Array) : void {
			arr[0] = "inductor";
			getBasicInfo(arr);
			arr[3] = "L = " + getUnitText(inductance, "H");
			arr[4] = "P = " + getUnitText(getPower(), "W");
		}
		
//		override public function needsShortcut() : Boolean {
//			return true;
//		}
		
		override public function reset() : void {
			current = volts[0] = volts[1] = curcount = 0;
			ind.reset();
		}
		
		override public function setEditValue(n:int, ei:EditInfo) : void {
			// TODO Auto Generated method stub
			super.setEditValue(n, ei);
		}
		
		override public function setPoints() : void {
			super.setPoints();
			calcLeads(32);
		}
		
		override public function stamp():void {
			ind.stamp(nodes[0], nodes[1]);
		}
	}
}