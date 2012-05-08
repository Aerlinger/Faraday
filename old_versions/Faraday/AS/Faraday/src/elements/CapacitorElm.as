package elements
{
	import flash.display.Graphics;
	
	import ui.EditInfo;
	
	import utility.Color;
	import utility.StringTokenizer;

	public class CapacitorElm extends CircuitElm
	{
		public var capacitance:Number;
		private var compResistance:Number;
		private var voltdiff:Number;
		
		private var plate1:Array;
		private var plate2:Array;
		
		public static const FLAG_BACK_EULER:int = 2;
		
		public function CapacitorElm( xa:int, ya:int, xb:int, yb:int, f:int, st:StringTokenizer ) {
			super(xa, ya, xb, yb, f);
			
			if(st!=null) {
				this.capacitance = Number(st.nextToken());
				this.voltdiff = Number(st.nextToken());
			}
		}
		
		public function isTrapezoidal() : Boolean {
			return (flags & FLAG_BACK_EULER) == 0;
		}
		
		override public function setNodeVoltage(n:int, c:Number) : void {
			super.setNodeVoltage(n, c);
			voltdiff = volts[0] - volts[1];
		}
		
		override public function reset() : void {
			current = curcount = 0;
			// put small charge on caps when reset to start oscillators
			voltdiff = 1e-3;
		}
		
		override public function getDumpType() : * {
			return 'c';
		}
		
		override public function dump() : String {
			return super.dump() + " " + capacitance + " " + voltdiff;
		}
		
		override public function setPoints() : void {
			super.setPoints();
			var f:Number = (dn / 2 - 4) / dn;
			// calc leads
			lead1 = interpPointPt(point1, point2, f);
			lead2 = interpPointPt(point1, point2, 1 - f);
			// calc plates
			plate1 = newPointArray(2);
			plate2 = newPointArray(2);
			interpPoint2(point1, point2, plate1[0], plate1[1], f, 12);
			interpPoint2(point1, point2, plate2[0], plate2[1], 1 - f, 12);
		}
		
		override public function draw( g:Graphics ) : void {
			var hs:int = 12;
			setBboxPt(point1, point2, hs);
			
			// draw first lead and plate
			var color:uint = setVoltageColor(volts[0]);
			drawThickLinePt(point1, lead1, color);
			setPowerColor(false);
			drawThickLinePt(plate1[0], plate1[1], color);
			if (sim.powerCheckItem)
				g.beginFill(Color.GRAY);
			
			// draw second lead and plate
			color = setVoltageColor(volts[1]);
			drawThickLinePt(point2, lead2, color);
			setPowerColor(false);
			drawThickLinePt(plate2[0], plate2[1], color);
			
			curcount = updateDotCount();
			if (sim.dragElm != this) {
				drawDots(point1, lead1, curcount);
				drawDots(point2, lead2, -curcount);
			}
			drawPosts();
			if (sim.showValuesCheckItem) {
				var s:String = getShortUnitText(capacitance, "F");
				drawValues(s, hs);
			}
		}
		
		override public function stamp() : void {
			// capacitor companion model using trapezoidal approximation
			// (Norton equivalent) consists of a current source in
			// parallel with a resistor.  Trapezoidal is more accurate
			// than backward euler but can cause oscillatory behavior
			// if RC is small relative to the timestep.
			if (isTrapezoidal())
				compResistance = sim.timeStep / (2 * capacitance);
			else
				compResistance = sim.timeStep / capacitance;
			
			sim.stampResistor(nodes[0], nodes[1], compResistance);
			sim.stampRightSide(nodes[0]);
			sim.stampRightSide(nodes[1]);
		}
		
		override public function startIteration() : void {
			if (isTrapezoidal())
				curSourceValue = -voltdiff / compResistance - current;
			else
				curSourceValue = -voltdiff / compResistance;
			//System.out.println("cap " + compResistance + " " + curSourceValue + " " + current + " " + voltdiff);
		}
		
		override public function calculateCurrent() : void {
			var voltdiff:Number = volts[0] - volts[1];
			// we check compResistance because this might get called
			// before stamp(), which sets compResistance, causing
			// infinite current
			if (compResistance > 0)
				current = voltdiff / compResistance + curSourceValue;
		}
		
		var curSourceValue:Number;
		
		override public function doStep() : void {
			sim.stampCurrentSource(nodes[0], nodes[1], curSourceValue);
		}
		
		override public function getInfo(arr:Array) : void {
			arr[0] = "capacitor";
			getBasicInfo(arr);
			arr[3] = "C = " + getUnitText(capacitance, "F");
			arr[4] = "P = " + getUnitText(getPower(), "W");
			//double v = getVoltageDiff();
			//arr[4] = "U = " + getUnitText(.5*capacitance*v*v, "J");
		}
		
		override public function getEditInfo(n:int) : EditInfo {
			if (n == 0)
				return new EditInfo("Capacitance (F)", capacitance, 0, 0);
			if (n == 1) {
				var ei:EditInfo = new EditInfo("", 0, -1, -1);
				//ei.checkbox = new Checkbox("Trapezoidal Approximation", isTrapezoidal());
				return ei;
			}
			return null;
		}
		
		override public function setEditValue( n:int, ei:EditInfo ) : void {
			if (n == 0 && ei.value > 0)
				capacitance = ei.value;
			if (n == 1) {
				if (ei.isChecked)
					flags &= ~FLAG_BACK_EULER;
				else
					flags |= FLAG_BACK_EULER;
			}
		}
		
		override public function needsShortcut() : Boolean {
			return true;
		}
		
	}
}