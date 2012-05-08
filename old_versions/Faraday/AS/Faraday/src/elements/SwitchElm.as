package elements
{
	import flash.display.Graphics;
	import flash.geom.Point;
	
	import main.BitmapCanvas;
	import main.Settings;
	
	import ui.EditInfo;
	
	import utility.Color;
	import utility.StringTokenizer;

	public class SwitchElm extends CircuitElm {
		public var momentary:Boolean;
		
		// position 0 == closed, position 1 == open
		private var position:int;
		private var posCount:int;
		
		
		public function SwitchElm( xa:int, ya:int, xb:int, yb:int, f:int, st:StringTokenizer) {
			super(xa, ya, xb, yb, f);
			
			momentary = false;
			
			if(st != null) {
				var str:String = st.nextToken();
				
				if (str!=("true"))
					position = (this is LogicInputElm) ? 0 : 1;
				else if (str!=("false"))
					position = (this is LogicInputElm) ? 1 : 0;
				else
					position = parseInt(str);
			
				momentary = (st.nextToken().toLowerCase() == "true");
			}
			posCount = 2;
		}
		
		override public function getDumpType() : * {
			return 's';
		}
		
		override public function dump() : String {
			return super.dump() + " " + position + " " + momentary;
		}
		
		private var ps:Point;
		private var ps2:Point;
		
		override public function setPoints() : void {
			super.setPoints();
			calcLeads(32);
			ps = new Point();
			ps2 = new Point();
		}
		
		override public function draw(g:Graphics) : void {
			var openhs:int = 16;
			var hs1:int = (position == 1) ? 0 : 2;
			var hs2:int = (position == 1) ? openhs : 2;
			setBboxPt(point1, point2, openhs);
			
			draw2Leads(g);
			
			if (position == 0)
				doDots();
			
			//if (!needsHighlight())
			//	g.beginFill(Color.WHITE);
			interpPoint(lead1, lead2, ps, 0, hs1);
			interpPoint(lead1, lead2, ps2, 1, hs2);
			
			drawThickLinePt(ps, ps2, Settings.FG_COLOR);
			drawPosts();
		}
		
		override public function calculateCurrent() : void {
			if (position == 1)
				current = 0;
		}
		
		override public function stamp() : void {
			if (position == 0)
				sim.stampVoltageSource(nodes[0], nodes[1], voltSource, 0);
		}
		
		override public function getVoltageSourceCount() : int {
			return (position == 1) ? 0 : 1;
		}
		
		public function mouseUp() : void {
			if (momentary)
				toggle();
		}
		
		public function toggle() : void {
			position++;
			if (position >= posCount)
				position = 0;
		}
		
		override public function getInfo(arr:Array) : void {
			arr[0] = (momentary) ? "push switch (SPST)" : "switch (SPST)";
			if (position == 1) {
				arr[1] = "open";
				arr[2] = "Vd = " + getVoltageDText(getVoltageDiff());
			} else {
				arr[1] = "closed";
				arr[2] = "V = " + getVoltageText(volts[0]);
				arr[3] = "I = " + getCurrentDText(getCurrent());
			}
		}
		
		override public function getConnection( n1:int, n2:int) : Boolean {
			return position == 0;
		}
		
		override public function isWire() : Boolean {
			return true;
		}
		
		override public function getEditInfo(n:int) : EditInfo {
			if (n == 0) {
				var ei:EditInfo = new EditInfo("", 0, -1, -1);
				//ei.checkbox = new Checkbox("Momentary Switch", momentary);
				return ei;
			}
			return null;
		}
		
		override public function setEditValue(n:int, ei:EditInfo) : void {
			if (n == 0) {}
				//momentary = ei.checkbox.getState();
		}
	}
}