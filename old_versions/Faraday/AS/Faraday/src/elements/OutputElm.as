package elements
{
	import flash.display.Graphics;
	import flash.geom.Point;
	import flash.text.Font;
	import flash.text.FontStyle;
	import flash.text.engine.FontMetrics;
	
	import ui.EditInfo;
	
	import utility.StringTokenizer;

	public class OutputElm extends CircuitElm {
		
		final var FLAG_VALUE:int = 1;
		
		/*
		public OutputElm(int xx, int yy) {
			super(xx, yy);
		}
		*/
		
		public function OutputElm( xa:int, ya:int, xb:int, yb:int, f:int, st:StringTokenizer) {
			super(xa, ya, xb, yb, f);
		}
		
		override public function getDumpType() : * {
			return 'O';
		}
		
		override public function getPostCount() : int{
			return 1;
		}
		
		override public function setPoints() : void {
			super.setPoints();
			lead1 = new Point();
		}
		
		override public function draw( g:Graphics ) : void {
			
			var selected:Boolean = (needsHighlight() || sim.plotYElm == this);
			
			//var f:Font = new Font("SansSerif", selected ? FontStyle.BOLD : 0, 14);
			//g.setFont(f);
			//g.setColor(selected ? selectColor : whiteColor);
			var s:String = (flags & FLAG_VALUE) != 0 ? getVoltageText(volts[0]) : "out";
			var fm:FontMetrics = new FontMetrics();// = g.getFontMetrics();
			if (this == sim.plotXElm)
				s = "X";
			if (this == sim.plotYElm)
				s = "Y";
			
			interpPointPt(point1, point2, lead1, 1 - (/*fm.stringWidth(s)*/3 / 2 + 8) / dn);
			setBboxPt(point1, lead1, 0);
			drawCenteredText(g, s, x2, y2, true);
			setVoltageColor(g, volts[0]);
			//if (selected)
			//	g.setColor(selectColor);
			drawThickLinePt(point1, lead1);
			drawPosts(g);
		}
		
		override public function getVoltageDiff() : Number {
			return volts[0];
		}
		
		override public function getInfo(arr:Array) : void{
			arr[0] = "output";
			arr[1] = "V = " + getVoltageText(volts[0]);
		}
		
		public function getEditInfo( n:int ) : EditInfo {
//			if (n == 0) {
//				var ei:EditInfo = new EditInfo("", 0, -1, -1);
//				ei.checkbox = new Checkbox("Show Voltage",
//					(flags & FLAG_VALUE) != 0);
//				return ei;
//			}
			return null;
		}
		
		public function setEditValue( n:int, ei:EditInfo ) : void {
//			if (n == 0)
//				flags = (ei.checkbox) ?
//					(flags | FLAG_VALUE) :
//					(flags & ~FLAG_VALUE);
		}
		
	}
}