package elements.core
{
	import main.CirSim;

	public class Inductor {
		
		public static const FLAG_BACK_EULER:uint = 2;
		private var nodes:Array;
		private var flags:int;
		private var sim:CirSim;
		
		private var inductance:Number = 0;
		private var compResistance:Number = 0;
		private var current:Number = 0;
		private var curSourceValue:Number = 0;
		
		public function Inductor(s:CirSim) {
			sim = s;
			nodes = new Array(2);
		}
		
		public function setup(ic:Number, cr:Number, f:int) : void {
			inductance = ic;
			current = cr;
			flags = f;
		}
		
		public function isTrapezoidal() : Boolean {
			return (flags & FLAG_BACK_EULER) == 0;
		}
		
		public function reset() : void {
			current = 0;
		}
		
		public function stamp(n0:int, n1:int) : void {
			// inductor companion model using trapezoidal or backward euler
			// approximations (Norton equivalent) consists of a current
			// source in parallel with a resistor.  Trapezoidal is more
			// accurate than backward euler but can cause oscillatory behavior.
			// The oscillation is a real problem in circuits with switches.
			nodes[0] = n0;
			nodes[1] = n1;
			if (isTrapezoidal())
				compResistance = 2 * inductance / sim.timeStep;
			else // backward euler
				compResistance = inductance / sim.timeStep;
			
			sim.stampResistor(nodes[0], nodes[1], compResistance);
			sim.stampRightSide(nodes[0]);
			sim.stampRightSide(nodes[1]);
		}
		
		public function nonLinear() : Boolean{
			return false;
		}
		
		public function startIteration(voltdiff:Number) : void {
			if (isTrapezoidal())
				curSourceValue = voltdiff / compResistance + current;
			else // backward euler
				curSourceValue = current;
		}
		
		public function calculateCurrent(voltdiff:Number) : Number {
			// we check compResistance because this might get called
			// before stamp(), which sets compResistance, causing
			// infinite current
			if (compResistance > 0)
				current = voltdiff / compResistance + curSourceValue;
			return current;
		}
		
		public function doStep(voltdiff:Number) : void {
			sim.stampCurrentSource(nodes[0], nodes[1], curSourceValue);
		}
	}
}