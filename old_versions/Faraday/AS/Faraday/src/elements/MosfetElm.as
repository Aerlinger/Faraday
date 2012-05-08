package elements
{
	import flash.display.Graphics;
	import flash.geom.Point;
	
	import main.Settings;
	
	import ui.EditInfo;
	
	import utility.Polygon;
	import utility.StringTokenizer;
	
	/** ported 1/27/12 */
	public class MosfetElm extends CircuitElm {
		
		protected var pnp:int;
		protected var vt:Number;
		
		protected const FLAG_PNP:int = 1;
		protected const FLAG_SHOWVT:int = 2;
		protected const FLAG_DIGITAL:int = 4;
		
		/*
		public MosfetElm( xx:int, yy:int, pnpflag:Boolean) {
			super(xx, yy);
			pnp = (pnpflag) ? -1 : 1;
			flags = (pnpflag) ? FLAG_PNP : 0;
			noDiagonal = true;
			vt = getDefaultThreshold();
		}
		*/
		
		public function MosfetElm( xa:int, ya:int, xb:int, yb:int, f:int, st:StringTokenizer ) {
			super(xa, ya, xb, yb, f);
			
			pnp = ((f & FLAG_PNP) != 0) ? -1 : 1;
			noDiagonal = true;
			vt = getDefaultThreshold();
			if(st != null) {
				try {
					vt = Number(st.nextToken());
				} catch ( e:Error ) {
				}
			}
		}
		
		private function getDefaultThreshold() : Number {
			return 1.5;
		}
		
		public function getBeta() : Number {
			return .02;
		}
		
		override public function nonLinear() : Boolean {
			return true;
		}
		
		public function drawDigital() : Boolean {
			return (flags & FLAG_DIGITAL) != 0;
		}
		
		override public function reset() : void {
			lastv1 = lastv2 = volts[0] = volts[1] = volts[2] = curcount = 0;
		}
		
		override public function dump() : String {
			return super.dump() + " " + vt;
		}
		
		override public function getDumpType() : * {
			return 'f';
		}
		
		protected const hs:int = 16;
		
		override public function draw(g:Graphics) : void {
			setBboxPt(point1, point2, hs);
			
			var color:uint = setVoltageColor(volts[1]);
			drawThickLinePt(src[0], src[1], color);
			color = setVoltageColor(volts[2]);
			drawThickLinePt(drn[0], drn[1], color);
			var segments:int = 6;
			var i:int;
			setPowerColor(true);
			var segf:Number = 1. / segments;
			
			for (i = 0; i != segments; i++) {
				var v:Number = volts[1] + (volts[2] - volts[1]) * i / segments;
				color = setVoltageColor(v);
				interpPoint(src[1], drn[1], ps1, i * segf);
				interpPoint(src[1], drn[1], ps2, (i + 1) * segf);
				drawThickLinePt(ps1, ps2, color);
			}
			
			color = setVoltageColor(volts[1]);
			drawThickLinePt(src[1], src[2], color);
			color = setVoltageColor(volts[2]);
			drawThickLinePt(drn[1], drn[2], color);
			
			if (!drawDigital()) {
				color = setVoltageColor(pnp == 1 ? volts[1] : volts[2]);
				drawThickPolygonP(arrowPoly, color);
				//g.fillPolygon(arrowPoly);
			}
			
			if (sim.powerCheckItem) {}
				//g.setColor(Color.gray);
			color = setVoltageColor(volts[0]);
			drawThickLinePt(point1, gate[1], color);
			drawThickLinePt(gate[0], gate[2], color);
			
			if (drawDigital() && pnp == -1)
				Main.getMainCanvas().drawThickCircle(pcircle.x, pcircle.y, pcircler, Settings.FG_COLOR);
				//drawThickCircle(g, pcircle.x, pcircle.y, pcircler);
			
			if ((flags & FLAG_SHOWVT) != 0) {
				var s:String = "" + (vt * pnp);
				//g.setColor(whiteColor);
				//g.setFont(unitsFont);
				drawCenteredText(s, x2 + 2, y2, false);
			}
			
			if ((needsHighlight() || sim.dragElm == this) && dy == 0) {
				//g.setColor(Color.white);
				//g.setFont(unitsFont);
				var ds:int = sign(dx);
				Main.getMainCanvas().drawString("G", gate[1].x - 10 * ds, gate[1].y - 5);
				Main.getMainCanvas().drawString(pnp == -1 ? "D" : "S", src[0].x - 3 + 9 * ds, src[0].y + 4);
				Main.getMainCanvas().drawString(pnp == -1 ? "S" : "D", drn[0].x - 3 + 9 * ds, drn[0].y + 4);
				
//				g.drawString("G", gate[1].x - 10 * ds, gate[1].y - 5);
//				g.drawString(pnp == -1 ? "D" : "S", src[0].x - 3 + 9 * ds, src[0].y + 4); // x+6 if ds=1, -12 if -1
//				g.drawString(pnp == -1 ? "S" : "D", drn[0].x - 3 + 9 * ds, drn[0].y + 4);
			}
			
			curcount = updateDotCount(-ids, curcount);
			drawDots(src[0], src[1], curcount);
			drawDots(src[1], drn[1], curcount);
			drawDots(drn[1], drn[0], curcount);
			drawPosts();
		}
		
		override public function getPost(n:int) : Point {
			return (n == 0) ? point1 : (n == 1) ? src[0] : drn[0];
		}
		
		override public function getCurrent() : Number {
			return ids;
		}
		
		override public function getPower() : Number {
			return ids * (volts[2] - volts[1]);
		}
		
		override public function getPostCount() : int {
			return 3;
		}
		
		protected var pcircler:int;
		protected var src:Array; // Array of points
		protected var drn:Array; // Array of points
		protected var gate:Array;
		protected var pcircle:Point;
		
		protected var arrowPoly:Polygon;
		
		override public function setPoints() : void {
			super.setPoints();
			
			// find the coordinates of the various points we need to draw
			// the MOSFET.
			var hs2:int = hs * dsign;
			src = newPointArray(3);
			drn = newPointArray(3);
			interpPoint2(point1, point2, src[0], drn[0], 1, -hs2);
			interpPoint2(point1, point2, src[1], drn[1], 1 - 22 / dn, -hs2);
			interpPoint2(point1, point2, src[2], drn[2], 1 - 22 / dn, -hs2 * 4 / 3);
			
			gate = newPointArray(3);
			interpPoint2(point1, point2, gate[0], gate[2], 1 - 28 / dn, hs2 / 2); // was 1-20/dn
			interpPoint(gate[0], gate[2], gate[1], .5);
			
			if (!drawDigital()) {
				if (pnp == 1)
					arrowPoly = calcArrow(src[1], src[0], 10, 4);
				else
					arrowPoly = calcArrow(drn[0], drn[1], 12, 5);
			} else if (pnp == -1) {
				interpPoint(point1, point2, gate[1], 1 - 36 / dn);
				var dist:int = (dsign < 0) ? 32 : 31;
				pcircle = interpPointPt(point1, point2, 1 - dist / dn);
				pcircler = 3;
			}
		}
		
		protected var lastv1:Number;
		protected var lastv2:Number;
		protected var ids:Number;
		protected var mode:int = 0;
		protected var gm:Number = 0;
		
		override public function stamp() : void {
			
			sim.stampNonLinear(nodes[1]);
			sim.stampNonLinear(nodes[2]);
		}
		
		override public function doStep() : void {
			var vs:Array = new Array(3);
			vs[0] = volts[0];
			vs[1] = volts[1];
			vs[2] = volts[2];
			
			if (vs[1] > lastv1 + .5)
				vs[1] = lastv1 + .5;
			if (vs[1] < lastv1 - .5)
				vs[1] = lastv1 - .5;
			if (vs[2] > lastv2 + .5)
				vs[2] = lastv2 + .5;
			if (vs[2] < lastv2 - .5)
				vs[2] = lastv2 - .5;
			
			var source:int = 1;
			var drain:int = 2;
			
			if (pnp * vs[1] > pnp * vs[2]) {
				source = 2;
				drain = 1;
			}
			
			var gate:int = 0;
			var vgs:Number = vs[gate] - vs[source];
			var vds:Number = vs[drain] - vs[source];
			
			if (Math.abs(lastv1 - vs[1]) > .01 ||
				Math.abs(lastv2 - vs[2]) > .01)
				sim.converged = false;
			
			lastv1 = vs[1];
			lastv2 = vs[2];
			
			var realvgs:Number = vgs;
			var realvds:Number = vds;
			
			vgs *= pnp;
			vds *= pnp;
			ids = 0;
			gm = 0;
			var Gds:Number = 0;
			var beta:Number = getBeta();
			
			if (vgs > .5 && this is JfetElm) {
				sim.stop("JFET is reverse biased!", this);
				return;
			}
			if (vgs < vt) {
				// should be all zero, but that causes a singular matrix,
				// so instead we treat it as a large resistor
				Gds = 1e-8;
				ids = vds * Gds;
				mode = 0;
			} else if (vds < vgs - vt) {
				// linear
				ids = beta * ((vgs - vt) * vds - vds * vds * .5);
				gm = beta * vds;
				Gds = beta * (vgs - vds - vt);
				mode = 1;
			} else {
				// saturation; Gds = 0
				gm = beta * (vgs - vt);
				// use very small Gds to avoid nonconvergence
				Gds = 1e-8;
				ids = .5 * beta * (vgs - vt) * (vgs - vt) + (vds - (vgs - vt)) * Gds;
				mode = 2;
			}
			
			var rs:Number = -pnp * ids + Gds * realvds + gm * realvgs;
			//System.out.println("M " + vds + " " + vgs + " " + ids + " " + gm + " "+ Gds + " " + volts[0] + " " + volts[1] + " " + volts[2] + " " + source + " " + rs + " " + this);
			sim.stampMatrix(nodes[drain], nodes[drain], Gds);
			sim.stampMatrix(nodes[drain], nodes[source], -Gds - gm);
			sim.stampMatrix(nodes[drain], nodes[gate], gm);
			
			sim.stampMatrix(nodes[source], nodes[drain], -Gds);
			sim.stampMatrix(nodes[source], nodes[source], Gds + gm);
			sim.stampMatrix(nodes[source], nodes[gate], -gm);
			
			sim.stampRightSide(nodes[drain], rs);
			sim.stampRightSide(nodes[source], -rs);
			
			if (source == 2 && pnp == 1 ||
				source == 1 && pnp == -1)
				ids = -ids;
		}
		
		public function getFetInfo(arr:Array, n:String) : void {
			arr[0] = ((pnp == -1) ? "p-" : "n-") + n;
			arr[0] += " (Vt = " + getVoltageText(pnp * vt) + ")";
			arr[1] = ((pnp == 1) ? "Ids = " : "Isd = ") + getCurrentText(ids);
			arr[2] = "Vgs = " + getVoltageText(volts[0] - volts[pnp == -1 ? 2 : 1]);
			arr[3] = ((pnp == 1) ? "Vds = " : "Vsd = ") + getVoltageText(volts[2] - volts[1]);
			arr[4] = (mode == 0) ? "off" :
				(mode == 1) ? "linear" : "saturation";
			arr[5] = "gm = " + getUnitText(gm, "A/V");
		}
		
		override public function getInfo(arr:Array) : void {
			getFetInfo(arr, "MOSFET");
		}
		
		override public function canViewInScope() : Boolean {
			return true;
		}
		
		override public function getVoltageDiff() : Number {
			return volts[2] - volts[1];
		}
		
		override public function getConnection( n1:int, n2:int) : Boolean{
			return !(n1 == 0 || n2 == 0);
		}
		
		override public function getEditInfo(n:int) : EditInfo {
			if (n == 0)
				return new EditInfo("Threshold Voltage", pnp * vt, .01, 5);
			if (n == 1) {
				var ei:EditInfo = new EditInfo("", 0, -1, -1);
				//ei.checkbox = new Checkbox("Digital Symbol", drawDigital());
				return ei;
			}
			
			return null;
		}
		
		override public function setEditValue(n:int, ei:EditInfo ) : void {
			if (n == 0)
				vt = pnp * ei.value;
			if (n == 1) {
				//flags = (ei.checkbox) ? (flags | FLAG_DIGITAL) : (flags & ~FLAG_DIGITAL);
				setPoints();
			}
		}
		

	}
}