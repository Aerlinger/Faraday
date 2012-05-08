package elements
{
	import flash.display.Graphics;
	import flash.text.Font;
	
	import utility.StringTokenizer;

	public class RailElm extends VoltageElm
	{
		public function RailElm(xa:int, ya:int, xb:int, yb:int, f:int, st:StringTokenizer) {
			super(xa, ya, xb, yb, f, st);
		}
		
		public const FLAG_CLOCK:int = 1;
		
		override public function getDumpType() : * {
			return 'R';
		}
		
		override public function getPostCount():int {
			return 1;
		}
		
		override public function setPoints():void {
			super.setPoints();
			lead1 = interpPointPt(point1, point2, 1-circleSize/dn);
		}
		
		override public function draw(g:Graphics) : void {
			setBboxPt(point1, point2, circleSize);
			var color:uint = setVoltageColor(volts[0]);
			drawThickLinePt(point1, lead1, color);
			
			var clock:Boolean = waveform == WF_SQUARE && (flags & FLAG_CLOCK) != 0;
			if (waveform == WF_DC || waveform == WF_VAR || clock) {
				
				// TODO: Draw text here
//				var f:Font = new Font();
//				g.setFont(f);
				
//				g.setColor(needsHighlight() ? selectColor : whiteColor);
				
				setPowerColor(false);
				var v:Number = getVoltage();
				var s:String = getShortUnitText(v, "V");
				
				if (Math.abs(v) < 1)
					s = showFormat.formatNumber(v) + "V";
				if (getVoltage() > 0)
					s = "+" + s;
				if (this instanceof AntennaElm)
					s = "Ant";
				if (clock)
					s = "CLK";
				drawCenteredText(s, x2, y2, true);
			} else {
				drawWaveform(point2);
			}
			drawPosts();
			curcount = updateDotCount(-current, curcount);
			if (sim.dragElm != this)
				drawDots(point1, lead1, curcount);
		}
		
		override public function getVoltageDiff():Number {
			return volts[0];
		}
		
		override public function stamp():void {
			if (waveform == WF_DC)
				sim.stampVoltageSource(0, nodes[0], voltSource, getVoltage());
			else
				sim.stampVoltageSource(0, nodes[0], voltSource);
		}
		
		override public function doStep():void {
			if (waveform != WF_DC)
				sim.updateVoltageSource(0, nodes[0], voltSource, getVoltage());
		}
		
		override public function hasGroundConnection(n1:int):Boolean {
			return true;
		}
		
		
	}
}