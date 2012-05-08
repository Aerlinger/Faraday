package elements
{
	
	import flash.display.Graphics;
	
	import ui.EditInfo;
	
	import utility.StringTokenizer;
	
	public class WireElm extends CircuitElm {
		public static const FLAG_SHOWCURRENT:uint = 1;
		public static const FLAG_SHOWVOLTAGE:uint = 2;
		
		public function WireElm(xa:int, ya:int, xb:int, yb:int, f:int, st:StringTokenizer) {
			super(xa, ya, xb, yb, f);
		}

		
		override public function draw(g:Graphics) : void {
			var color:uint = setVoltageColor(volts[0]);
			
			drawThickLinePt(point1, point2, color);
			doDots();
			setBboxPt(point1, point2, 3);
			
			if( mustShowCurrent() ) {
				var s:String = getShortUnitText( Math.abs(getCurrent()), "A" );
				drawValues(s, 4);
			} else if(mustShowVoltage()) {
				var s:String = getShortUnitText(volts[0], "V");
				drawValues(s, 4);
			}
			
			drawPosts();
			
		}
		
		override public function stamp() : void {
			sim.stampVoltageSource(nodes[0], nodes[1], voltSource, 0);
		}
		
		function mustShowCurrent() : Boolean {
			return (flags & FLAG_SHOWCURRENT) != 0;
		}
		
		function mustShowVoltage() : Boolean {
			return (flags & FLAG_SHOWVOLTAGE) != 0;
		}
		
		override public function getVoltageSourceCount() : int {
			return 1;
		}
		
		override public function getInfo(arr:Array) : void {
			arr[0] = "Wire";
			arr[1] = "I = " + getCurrentDText(getCurrent());
			arr[2] = "V = " + getVoltageText(volts[0]);
		}
		
		override public function getEditInfo(n:int):EditInfo {
			if(n==0) {
				var ei:EditInfo = new EditInfo("", 0, -1, -1);
				//ei.checkbox = new Checkbox("Show Current", mustShowCurrent());
				return ei;
			}
			if( n==1) {
				var ei:EditInfo = new EditInfo("", 0, -1, -1);
				//ei.checkbox = new Checkbox("Show Voltage", mustShowVoltage());
				return ei;
			}
			return null;
		}
		
		override public function setEditValue(n:int, ei:EditInfo) : void {
			if(n==0) {
				if(ei.isChecked)
					flags = FLAG_SHOWCURRENT;
				else
					flags &= ~FLAG_SHOWCURRENT;
			}
			if( n==1 ) {
				if(ei.isChecked)
					flags = FLAG_SHOWVOLTAGE;
				else
					flags &- ~FLAG_SHOWVOLTAGE;
			}
		}
		
		override public function getDumpType() : * {
			return 'w';
		}
		
		override public function getPower() : Number {
			return 0;
		}
		
		override public function getVoltageDiff() : Number {
			return volts[0];
		}
		
		override public function isWire():Boolean {
			return true;
		}
		
		override public function needsShortcut() : Boolean {
			return true;
		}
	}
}