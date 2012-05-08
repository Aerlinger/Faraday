package elements
{
	import flash.display.Graphics;
	
	import utility.StringTokenizer;

	public class GroundElm extends CircuitElm {
		
		public function GroundElm(xa:int, ya:int, xb:int, yb:int, f:int, st:StringTokenizer) {
			super(xa, ya, xb, yb, f);
		}
		
		override public function getDumpType() : * {
			return 'g';
		}
		
		override public function getPostCount() : int {
			return 1;
		}
		
		override public function draw(g:Graphics) : void {
			var color:uint = setVoltageColor(0);
			drawThickLinePt(point1, point2, color);
			var i:int;
			
			for (i = 0; i != 3; i++) {
				var a:int = 10 - i * 4;
				var b:int = i * 5; // -10;
				interpPoint2(point1, point2, ps1, ps2, 1 + b / dn, a);
				drawThickLinePt(ps1, ps2, color);
			}
			
			doDots();
			interpPoint(point1, point2, ps2, 1 + 11. / dn);
			setBboxPt(point1, ps2, 11);
			drawPost(x, y, nodes[0]);
		}
		
		override public function setCurrent(x:int, c:Number) : * {
			current = -c;
		}
		
		override public function stamp() : void {
			sim.stampVoltageSource(0, nodes[0], voltSource, 0);
		}
		
		override public function getVoltageDiff() : Number {
			return 0;
		}
		
		override public function getVoltageSourceCount() : int {
			return 1;
		}
		
		override public function getInfo(arr:Array) : void {
			arr[0] = "ground";
			arr[1] = "I = " + getCurrentText(getCurrent());
		}
		
		override public function hasGroundConnection(n1:int) : Boolean {
			return true;
		}
		
		override public function needsShortcut():Boolean {
			return true;
		}
		
	}
}