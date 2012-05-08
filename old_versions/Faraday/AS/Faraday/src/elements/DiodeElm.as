package elements
{
	import elements.core.Diode;
	
	import flash.display.Graphics;
	
	import ui.EditInfo;
	
	import utility.Polygon;
	import utility.StringTokenizer;

	public class DiodeElm extends CircuitElm {
		
		var diode:Diode;
		static const FLAG_FWDROP:int = 1;
		const defaultdrop:Number = .805904783;
		var fwdrop:Number;
		var zvoltage:Number;
		
//		public DiodeElm( xx:int, yy:int) {
//			super(xx, yy);
//			diode = new Diode(sim);
//			fwdrop = defaultdrop;
//			zvoltage = 0;
//			setup();
//		}
		
		public function DiodeElm( xa:int, ya:int, xb:int, yb:int, f:int, st:StringTokenizer) {
			super(xa, ya, xb, yb, f);
			diode = new Diode(sim);
			fwdrop = defaultdrop;
			zvoltage = 0;
			if ((f & FLAG_FWDROP) > 0) {
				try {
					fwdrop = Number(st.nextToken());
				} catch ( e:Error ) {
				}
			}
			setup();
		}
		
		override public function nonLinear() : Boolean {
			return true;
		}
		
		public function setup() : void {
			diode.setup(fwdrop, zvoltage);
		}
		
		override public function getDumpType() : *{
			return 'd';
		}
		
		override public function dump() : String {
			flags |= FLAG_FWDROP;
			return super.dump() + " " + fwdrop;
		}
		
		
		const hs:int = 8;
		var poly:Polygon;
		var cathode:Array;
		
		override public function setPoints() : void {
			super.setPoints();
			calcLeads(16);
			cathode = newPointArray(2);
			var pa:Array = newPointArray(2);	// Point array
			interpPoint2(lead1, lead2, pa[0], pa[1], 0, hs);
			interpPoint2(lead1, lead2, cathode[0], cathode[1], 1, hs);
			poly = createPolygon(pa[0], pa[1], lead2);
		}
		
		override public function draw(g:Graphics) : void {
			drawDiode(g);
			doDots();
			drawPosts();
		}
		
		override public function reset() : void {
			diode.reset();
			volts[0] = volts[1] = curcount = 0;
		}
		
		private function drawDiode( g:Graphics ) : void {
			setBboxPt(point1, point2, hs);
			
			var v1:Number = volts[0];
			var v2:Number = volts[1];
			
			draw2Leads(g);
			
			// draw arrow thingy
			setPowerColor(true);
			var color:int = setVoltageColor(v1);
			
			super.drawThickPolygonP(poly, color);
			//g.fillPolygon(poly);
			
			// draw thing arrow is pointing to
			color = setVoltageColor(v2);
			drawThickLinePt(cathode[0], cathode[1], color);
		}
		
		override public function stamp() : void {
			diode.stamp(nodes[0], nodes[1]);
		}
		
		override public function doStep() : void {
			diode.doStep(volts[0] - volts[1]);
		}
		
		override public function calculateCurrent() : void {
			current = diode.calculateCurrent(volts[0] - volts[1]);
		}
		
		override public function getInfo( arr:Array) : void {
			arr[0] = "diode";
			arr[1] = "I = " + getCurrentText(getCurrent());
			arr[2] = "Vd = " + getVoltageText(getVoltageDiff());
			arr[3] = "P = " + getUnitText(getPower(), "W");
			arr[4] = "Vf = " + getVoltageText(fwdrop);
		}
		
		override public function getEditInfo(n:int) : EditInfo {
			if (n == 0)
				return new EditInfo("Fwd Voltage @ 1A", fwdrop, 10, 1000);
			
			return null;
		}
		
		override public function setEditValue( n:int, ei:EditInfo ) : void {
			fwdrop = ei.value;
			setup();
		}
		
		// TODO: fix
		override public function needsShortcut() : Boolean {
			//return getClass() == DiodeElm.class;
			return true;
		}
	}
}