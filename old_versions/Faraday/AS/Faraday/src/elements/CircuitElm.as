package elements
{
	import flash.display.BitmapData;
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.globalization.LocaleID;
	import flash.globalization.NumberFormatter;
	import flash.text.Font;
	import flash.text.TextField;
	import flash.text.engine.FontMetrics;
	import flash.utils.getQualifiedClassName;
	
	import main.BitmapCanvas;
	import main.CirSim;
	import main.Settings;
	
	import spark.formatters.NumberFormatter;
	
	import ui.EditInfo;
	
	import utility.ArrayUtils;
	import utility.Color;
	import utility.ColorConstants;
	import utility.Polygon;
	
	

	/** Ported */
	public class CircuitElm
	{
		public static var voltageRange:Number = 5;
		
		public static var colorScaleCount:uint = 32;
		public static var colorScale:Array;
		
		public static var currentMult:Number = 0;
		public static var powerMult:Number = 10;
		
		public static var ps1:Point;
		public static var ps2:Point;
		
		public static var sim:CirSim;
		
		public static var whiteColor:uint;
		public static var selectColor:uint;
		public static var lightGrayColor:uint;
		
		protected static var unitsFont:Font;
		
		public static var showFormat:flash.globalization.NumberFormatter;
		public static var shortFormat:flash.globalization.NumberFormatter;
		public static var noCommaFormat:flash.globalization.NumberFormatter;
		
		
		
		public static const pi:Number = 3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955;
		
		// Node Locations:
		public var x:int;
		public var y:int;
		public var x2:int;
		public var y2:int;
		
		public var flags:int;
		public var voltSource:int;
		public var nodes:Array;
		
		protected var dx:int;
		protected var dy:int;
		protected var dsign:int;
		protected var dn:Number;
		protected var dpx1:Number;
		protected var dpy1:Number;
		
		protected var point1:Point;
		protected var point2:Point;
		protected var lead1:Point;
		protected var lead2:Point;
		
		protected var volts:Array;
		
		protected var current:Number = 0;
		protected var curcount:Number = 0;
		
		public var boundingBox:Rectangle;
		
		protected var noDiagonal:Boolean;
		
		public var selected:Boolean;
		
		
		
		public function getDumpType() : * {
			return 0;
		}
		
		public function getDumpClass() : String {
			return ( getQualifiedClassName(this).replace("::", ".") );
		}
		
		public function getDefaultFlags() : int {
			return 0;
		}
		
		
		public function CircuitElm(xa:int, ya:int, xb:int, yb:int, f:int) {
			
			x = sim.snapGrid(xa);
			y = sim.snapGrid(ya);
			x2 = isNaN(xb) ? x : sim.snapGrid(xb);
			y2 = isNaN(yb) ? y : sim.snapGrid(yb);
			flags = isNaN(flags) ? getDefaultFlags() : f;
			
			whiteColor = Settings.FG_COLOR;
			selectColor = Settings.SELECT_COLOR;
			lightGrayColor = Color.LIGHT_GRAY;
			
			allocNodes();
			initBoundingBox();
			
		}
		
		public static function initClass( s:CirSim ) : void {
			
			unitsFont = new Font();
			sim = s;
			
			colorScale = new Array(colorScaleCount);
			
			var i:int;
			for( i=0; i < colorScaleCount; ++i ) {
				var v:Number = i * 2 / colorScaleCount - 1;
				if(v<0) {
					var n1:int = (128 * -v) + 127;
					var n2:int = (127 * (1+v));
					// Color is red for a negative voltage:
					colorScale[i] = new Color(n1, n2, n2);
				} else {
					var n1:int = (128 * v) + 127;
					var n2:int = (127 * (1-v));
					// Color is green for a positive voltage
					colorScale[i] = new Color(n2, n1, n2);
				}
			}
			
			ps1 = new Point();
			ps2 = new Point();
			
			shortFormat = new flash.globalization.NumberFormatter(LocaleID.DEFAULT);
			shortFormat.fractionalDigits = 1;
			showFormat = new flash.globalization.NumberFormatter(LocaleID.DEFAULT);
			showFormat.fractionalDigits = 2;
			showFormat.leadingZero = true;
			noCommaFormat = new flash.globalization.NumberFormatter(LocaleID.DEFAULT);
			noCommaFormat.fractionalDigits = 10;
			noCommaFormat.useGrouping = false;
		}
		
		protected function initBoundingBox() : void {
			boundingBox = new Rectangle();
			
			boundingBox.x = Math.min(x, x2);
			boundingBox.y = Math.min(y, y2);
			boundingBox.width = Math.abs(x2 - x) + 1;
			boundingBox.height = Math.abs(y2 - y) + 1;
		}
		
		protected function allocNodes() : void {
			nodes = new Array(getPostCount() + getInternalNodeCount());
			volts = new Array(getPostCount() + getInternalNodeCount());
			
			ArrayUtils.initializeOneDArray(volts, getPostCount() + getInternalNodeCount());
			ArrayUtils.initializeOneDArray(nodes, getPostCount() + getInternalNodeCount());
		}
		
		public function dump() : String {
			var t = getDumpType();
			return (("" + t + " ") + " " + x + " " + y + " " + x2 + " " + y2 + " " + flags) as String;
		}
		
		public function reset() : void {
			var i:int;
			for( i=0; i<getPostCount() + getInternalNodeCount(); ++i )
				volts[i] = 0;
			
			curcount = 0;
		}
		
		public function draw(g:Graphics) : void {
		}
		
		public function setCurrent(x:int, c:Number) : * {
			current = c;
		}
		
		public function getCurrent() : Number {
			return current;
		}
		
		public function doStep() : void {
		}
		
		public function destroy() : void {
			
		}
		
		public function startIteration() : void {
			
		}
		
		public function getPostVoltage(x:int) : Number {
			return volts[x];
		}
		
		public function setNodeVoltage(n:int, c:Number) : void {
			volts[n] = c;
			calculateCurrent();
		}
		
		public function calculateCurrent() : void {
		}
		
		public function setPoints() : void {
			dx = x2 - x;
			dy = y2 - y;
			dn = Math.sqrt(dx*dx + dy*dy);
			
			dpx1 = dy / dn;
			dpy1 = -dx / dn;
			dsign = (dy == 0) ? sign(dx) : sign(dy);
			point1 = new Point(x, y);
			point2 = new Point(x2, y2);
		}
		
		protected function calcLeads(len:int) : void {
			if( dn < len || len == 0) {
				lead1 = point1;
				lead2 = point2;
				return;
			}
			lead1 = interpPointPt( point1, point2, (dn-len)/(2*dn) );
			lead2 = interpPointPt( point1, point2, (dn + len)/(2*dn) );
		}
		
		public function interpPointPt(a:Point, b:Point, f:Number, g:Number=0) : Point {
			var p:Point = new Point();
			interpPoint(a, b, p, f, g);
			return p;
		}
		
		public function interpPoint(a:Point, b:Point, c:Point, f:Number, g:Number=0) : void {
			
			var gx:int;
			var gy:int;
			
			if(g != 0) {
				gx = b.y - a.y;
				gy = a.x - b.x;
				g /= Math.sqrt(gx*gx + gy*gy);
			}
			
			c.x = Math.floor(a.x * (1-f) + b.x * f + g * gx + .48);
			c.y = Math.floor(a.y * (1-f) + b.y * f + g * gy + .48);
		}
		
		public function interpPoint2( a:Point, b:Point, c:Point, d:Point, f:Number, g:Number=0 ) : void  {
			var gx:int;
			var gy:int;
			
			if(g != 0) {
				gx = b.y - a.y;
				gy = a.x - b.x;
				g /= Math.sqrt(gx*gx + gy*gy);
			}
			
			var offset:Number = .48;
			
			c.x = Math.floor(a.x * (1 - f) + b.x * f + g * gx + offset);
			c.y = Math.floor(a.y * (1 - f) + b.y * f + g * gy + offset);
			d.x = Math.floor(a.x * (1 - f) + b.x * f - g * gx + offset);
			d.y = Math.floor(a.y * (1 - f) + b.y * f - g * gy + offset);
		}
		
		public function draw2Leads(g:Graphics) : void {
			// draw first lead
			var color:uint = setVoltageColor(volts[0]);
			drawThickLinePt(point1, lead1, color);
			
			// draw second lead:
			color = setVoltageColor(volts[1]);
			drawThickLinePt(lead2, point2, color);
		}
		
		protected function newPointArray(n:int) : Array {
			var a:Array = new Array(n);
			while(n>0)
				a[--n] = new Point();
			return a;
		}
		
		protected function drawDots(pa:Point, pb:Point, pos:Number) : void {
			// If the sim is stopped or has dots disabled
			if(sim.stoppedCheck || pos == 0 || !sim.dotsCheckItem )
				return;
			
			var dx:int = pb.x - pa.x;
			var dy:int = pb.y - pa.y;
			
			var dn:Number = Math.sqrt(dx*dx + dy*dy);
			
			var ds:int = 16;
			pos %= ds;
			
			if(pos < 0)
				pos += ds;
			
			for( var di:Number=pos; di<dn; di += ds) {
				var x0:int = (pa.x + di * dx / dn);
				var y0:int = (pa.y + di * dy / dn);
				
				Main.getMainCanvas().drawThickCircle(x0, y0, 1, Settings.DOTS_COLOR);
			}
		}
		
		public function calcArrow(a:Point, b:Point, al:Number, aw:Number) : Polygon {
			var poly:Polygon = new Polygon();
			
			var p1:Point = new Point();
			var p2:Point = new Point();
			
			var adx:int = b.x - a.x;
			var ady:int = b.y - a.y;
			
			var l:Number = Math.sqrt(adx*adx + ady*ady);
			
			poly.addVertex(b.x, b.y);
			interpPoint2(a, b,p1, p2, 1-al/l, aw);
			poly.addVertex(p1.x, p1.y);
			poly.addVertex(p2.x, p2.y);
			
			return poly;
		}
		
		public function createPolygon( a:Point, b:Point, c:Point, d:Point=null ) : Polygon {
			var p:Polygon = new Polygon();
			
			p.addVertex(a.x, a.y);
			p.addVertex(b.x, b.y);
			p.addVertex(c.x, c.y);
			
			if( d!=null )
				p.addVertex(d.x, d.y);
			
			return p;
		}
		
		
		public function createPolygonFromArray(a:Array) : Polygon {
			var p:Polygon = new Polygon();
			
			for( var i:uint=0; i<a.length; ++i ) 
				p.addVertex(a[i].x, a[i].y);
			
			return p;
		}
		
		public function drag( xx:int, yy:int) : void {
			xx = sim.snapGrid(xx);
			yy = sim.snapGrid(yy);
			
			if (noDiagonal) {
				if( Math.abs(x-xx) < Math.abs(y-yy) )
					xx = x;
				else
					yy = y;
			}
			
			x2 = xx;
			y2 = yy;
			
			setPoints();
		}
		
		public function move( dx:int, dy:int ) : void {
			x += dx;
			y += dy;
			x2 += dx;
			y2 += dy;
			
			boundingBox.x += dx;
			boundingBox.y += dy;
			
			setPoints();
		}
		
		public function allowMove( dx:int, dy:int ) : Boolean {
			
			var nx:int = x + dx;
			var ny:int = y + dy;
			
			var nx2:int = x2 + dx;
			var ny2:int = y2 + dy;
			
			for( var i:int=0; i<sim.elmList.length; ++i ) {
				var ce:CircuitElm = sim.getElm(i);
				
				if ( ce.x == nx && ce.y == ny && ce.x2 == nx2 && ce.y2 == ny2 )
					return false;
				if ( ce.x == nx2 && ce.y == ny2 && ce.x2 == nx && ce.y2 == ny )
					return false;
			}
			
			return true;
			
		}
		
		public function movePoint( n:int, dx:int, dy:int ) : void {
			if( n==0 ) {
				x += dx;
				y += dy;
			} else {
				x2 += dx;
				y2 += dy;
			}
			
			setPoints();
		}
		
		
		public function stamp() : void {
		}
		
		public function getVoltageSourceCount() : int {
			return 0;
		}
		
		public function getInternalNodeCount() : int {
			return 0;
		}
		
		public function setNode(p:int, n:int) : void {
			nodes[p] = n;
		}
		
		public function setVoltageSource(n:int, v:int) : void {
			voltSource = v;
		}
		
		public function getVoltageSource() :int {
			return voltSource;
		}
		
		public function getVoltageDiff() : Number {
			return volts[0] - volts[1];
		}
		
		public function nonLinear() : Boolean {
			return false;
		}
		
		public function getPostCount() : int {
			return 2;
		}
		
		public function getNode(n:int) : int {
			return nodes[n];
		}
		
		public function getPost(n:int) : Point {
			return (n==0) ? point1 : (n==1) ? point2 : null;
		}
		
		public function setBbox(x1:int, y1:int, x2:int, y2:int) : void {
			if(x1 > x2) {
				var q:int = x1;
				x1 = x2;
				x2 = q;
			}
			if(y1>y2) {
				var q:int = y1;
				y1 = y2;
				y2 = q;
			}
			boundingBox.x = x1;
			boundingBox.y = y1;
			boundingBox.width = x2-x1+1;
			boundingBox.height = y2-y1+1;
		}
		
		public function setBboxPt(p1:Point, p2:Point, w:Number) : void {
			setBbox(p1.x, p1.y, p2.x, p2.y)
			
			var dpx:int = (dpx1 * w);
			var dpy:int = (dpy1 * w);
			adjustBbox(p1.x + dpx, p1.y + dpy, p1.x - dpx, p1.y - dpy);
		}
		
		public function adjustBbox(x1:int, y1:int, x2:int, y2:int) : void {
			if (x1 > x2) {
				var q = x1;
				x1 = x2;
				x2 = q;
			}
			if (y1 > y2) {
				var q = y1;
				y1 = y2;
				y2 = q;
			}
			x1 = Math.min(boundingBox.x, x1);
			y1 = Math.min(boundingBox.y, y1);
			x2 = Math.max(boundingBox.x + boundingBox.width - 1, x2);
			y2 = Math.max(boundingBox.y + boundingBox.height - 1, y2);
			
			boundingBox.x = x1;
			boundingBox.y = y1;
			boundingBox.width = x2 - x1;
			boundingBox.height = y2 - y1;
		}
		
		public function adjustBboxPt(p1:Point, p2:Point) : void {
			adjustBbox(p1.x, p1.y, p2.x, p2.y);
		}
		
		public function isCenteredText() : Boolean {
			return false;
		}
		
		/** Not yet implemented */
		public function drawCenteredText(s:String, x:int, y:int, cx:Boolean=true) : void {
			var fm:FontMetrics;
			
			var text:TextField;
			var w:int = 10*s.length;//fm.stringWidth(s);
			
			if (cx)
				x -= w / 2;
			
			var ascent:int = -10;//fm.getAscent() / 2;
			var descent:int = 5;//fm.getAscent() / 2;
			
			Main.getMainCanvas().drawString(s, x, y + ascent);
			adjustBbox(x, y - ascent, x + w, y + ascent + descent);
		}
		
		/** Not yet implemented */
		public function drawValues(s:String, hs:Number) : void {
			
			if (s == null)
				return;
			
			//g.setFont(unitsFont);
			
			//FontMetrics fm = g.getFontMetrics();
			var w:int = 100;//fm.stringWidth(s);
			
			Main.getMainCanvas().setColor(Settings.TEXT_COLOR);
			
			
			var ya:int = -10;//fm.getAscent() / 2;
			var xc:int;
			var yc:int;
			
			if (this is RailElm || this is SweepElm) {
				xc = x2;
				yc = y2;
			} else {
				xc = (x2 + x) / 2;
				yc = (y2 + y) / 2;
			}
			
			var dpx:int = (int) (dpx1 * hs);
			var dpy:int = (int) (dpy1 * hs);
			
			if (dpx == 0) {
				Main.getMainCanvas().drawString(s, xc - w / 2, yc - Math.abs(dpy) - 2);
				//g.drawString(s, xc - w / 2, yc - Math.abs(dpy) - 2);
			} else {
				var xx:int = xc + Math.abs(dpx) + 2;
				
				if (this is VoltageElm || (x < x2 && y > y2))
					xx = xc - (w + Math.abs(dpx) + 2);
				
				Main.getMainCanvas().drawString(s, xx, yc + dpy + ya);
				
				//g.drawString(s, xx, yc + dpy + ya);
			}
			
		}
		
		public function drawCoil(g:Graphics, hs:int, p1:Point, p2:Point, v1:Number, v2:Number) : void {
			var segments:int = 30;
			
			var segf:Number = 1 /segments;
			
			ps1.x = p1.x;
			ps1.y = p1.y;
			
			for( var i:int=0; i<segments; ++i ) {
				var cx:Number = ( ((i+1)*6*segf)%2 ) -1;
				var hsx:Number = Math.sqrt(1 - cx*cx);
				if(hsx<0)
					hsx = -hsx;
				interpPoint(p1, p2, ps2, i*segf, hsx*hs);
				var v:Number = v1 + (v2-v1) * i/segments;
				
				var color:uint = setVoltageColor(v);
				drawThickLinePt(ps1, ps2, color);
				
				ps1.x = ps2.x;
				ps1.y = ps2.y;
			}
		}
		
		public function drawThickLine(x:int, y:int, x2:int, y2:int, color:uint=0xFFFFFF) : void {
			
			if( Settings.DRAW_STYLE_VECTOR ) {
				
				var lineSprite:Sprite = new Sprite(); 
				
				lineSprite.graphics.lineStyle(2, color);
				lineSprite.graphics.moveTo(x, y);
				lineSprite.graphics.lineTo(x2, y2);
				
				Main.getMainCanvas().getBitmapData().draw(lineSprite);
				
			} else {
				Main.getMainCanvas().bitmapMoveTo(x, y);
				Main.getMainCanvas().bitmapLineTo(x2, y2, Settings.FG_COLOR);
			}
			
		}
		
		public function drawThickLinePt(pa:Point, pb:Point, color:uint=0xFFFFFF) : void {
			drawThickLine(pa.x, pa.y, pb.x, pb.y, color);
		}
		
		public function drawThickPolygon(xs:Array, ys:Array, c:Array, color:uint=0xFFFFFF ) : void {
			
			var i:int;
			for(i=0; i<(c.length-1); ++i) 
				drawThickLine(xs[i], ys[i], xs[i+1], ys[i+1], color);
			
			drawThickLine(xs[i], ys[i], xs[0], ys[0], color);
		}
		
		public function drawThickPolygonP(p:Polygon, color:uint) : void {
			var c:uint = p.numPoints();
			var i:uint;
			for(i=0; i<(c-1); ++i) 
				drawThickLine( p.getX(i), p.getX(i), p.getX(i+1), p.getY(i+1), color );
			
			drawThickLine( p.getX(i), p.getX(i), p.getX(0), p.getY(0), color );
		}
		
		
		public function drawPosts() : void {
			for( var i:uint=0; i<getPostCount(); ++i ) {
				var p:Point = getPost(i);
				drawPost(p.x, p.y, nodes[i]);
			}
		}
		
		public function drawPost(x0:int, y0:int, n:int) : void {
			if (sim.dragElm == null && !needsHighlight() && sim.getCircuitNode(n).links.length == 2)
				return;
			if(sim.mouseMode == CirSim.MODE_DRAG_ROW || sim.mouseMode == CirSim.MODE_DRAG_COLUMN)
				return;
			
			Main.getMainCanvas().renderPost(x0, y0);
		}
		
		public static function getVoltageDText(v:Number) : String {
			return getUnitText(Math.abs(v), "V");
		}
		
		public static function getVoltageText(v:Number) : String {
			return getUnitText(v, "V");
		}
		
		public static function  getUnitText(v:Number, u:String ) : String {
			var va:Number = Math.abs(v);
			if (va < 1e-14)
				return "0 " + u;
			if (va < 1e-9)
				return showFormat.formatNumber(v * 1e12) + " p" + u;
			if (va < 1e-6)
				return showFormat.formatNumber(v * 1e9) + " n" + u;
			if (va < 1e-3)
				return showFormat.formatNumber(v * 1e6) + " " + CirSim.muString + u;
			if (va < 1)
				return showFormat.formatNumber(v * 1e3) + " m" + u;
			if (va < 1e3)
				return showFormat.formatNumber(v) + " " + u;
			if (va < 1e6)
				return showFormat.formatNumber(v * 1e-3) + " k" + u;
			if (va < 1e9)
				return showFormat.formatNumber(v * 1e-6) + " M" + u;
			return showFormat.formatNumber(v * 1e-9) + " G" + u;
		}
		
		public static function getShortUnitText( v:Number, u:String ) : String {
			var va:Number = Math.abs(v);
			if (va < 1e-13)
				return null;
			if (va < 1e-9)
				return shortFormat.formatNumber(v * 1e12) + "p" + u;
			if (va < 1e-6)
				return shortFormat.formatNumber(v * 1e9) + "n" + u;
			if (va < 1e-3)
				return shortFormat.formatNumber(v * 1e6) + CirSim.muString + u;
			if (va < 1)
				return shortFormat.formatNumber(v * 1e3) + "m" + u;
			if (va < 1e3)
				return shortFormat.formatNumber(v) + u;
			if (va < 1e6)
				return shortFormat.formatNumber(v * 1e-3) + "k" + u;
			if (va < 1e9)
				return shortFormat.formatNumber(v * 1e-6) + "M" + u;
			return shortFormat.formatNumber(v * 1e-9) + "G" + u;
		}
		
		public static function getCurrentText(i:Number) : String {
			return getUnitText(i, "A");
		}
		
		public static function getCurrentDText(i:Number) : String {
			return getUnitText(Math.abs(i), "A");
		}
		
		
		public function updateDotCount(cur:Number=NaN, cc:Number=NaN) : Number {
			if(isNaN(cur))
				cur = current;
			if(isNaN(cc))
				cc = curcount;
			
			if (sim.stoppedCheck)
				return cc;
			var cadd:Number = cur * currentMult;

			cadd %= 8;

			return cc + cadd;
		}
		
		public function doDots() : void {
			curcount = updateDotCount();
			
			if(sim.dragElm != this) 
				drawDots(point1, point2, curcount);
			
		}
		
		public function getInfo(arr:Array) : void {
		}
		
		public function getBasicInfo(arr:Array) : int {
			arr[1] = "I = " + getCurrentDText(getCurrent());
			arr[2] = "Vd = " + getVoltageDText(getVoltageDiff());
			return 3;
		}
		
		protected function setVoltageColor(volts:Number) : uint {
			if (needsHighlight()) {
				//g.beginFill(selectColor);
				return selectColor;
			}
			if (!sim.voltsCheckItem) {
				if (!sim.powerCheckItem) // && !conductanceCheckItem.getState())
					//g.beginFill(whiteColor);
					return whiteColor;
			}
			var c:int = (int) ((volts + voltageRange) * (colorScaleCount - 1) / (voltageRange * 2));
			if (c < 0)
				c = 0;
			if (c >= colorScaleCount)
				c = colorScaleCount - 1;
			
			return colorScale[c].getColor();
		}
		
		
		public function setPowerColor( yellow:Boolean ) : void {
			
			if (!sim.powerCheckItem)
				return;
			
			var w0:Number = getPower();
			
			w0 *= powerMult;
			//System.out.println(w);
			var w:int = (w0 < 0) ? -w0 : w0;
			if (w > 1)
				w = 1;
			var rg:int = 128 + (int) (w * 127);
			var b:int = (int) (128 * (1 - w));
			/*if (yellow)
			//g.setColor(new Color(rg, rg, b));
			else */
			
			//if (w0 > 0)
				//g.beginFill( (new Color(rg, b, b)).getColor() );
			//else
				//g.beginFill( (new Color(b, rg, b)).getColor() );
		}
		
		public function getPower() : Number {
			return getVoltageDiff() * current;
		}
		
		public function getScopeValue(x:int) : Number {
			return (x == 1) ? getPower() : getVoltageDiff();
		}
		
		public function getScopeUnits(x:int ) : String {
			return (x == 1) ? "W" : "V";
		}
		
		public function getEditInfo(n:int) : EditInfo {
			return null;
		}
		
		public function setEditValue( n:int, ei:EditInfo ) : void {
		}
		
		public function getConnection(n1:int, n2:int) : Boolean {
			return true;
		}
		
		public function hasGroundConnection(n1:int) : Boolean {
			return false;
		}
		
		public function isWire() : Boolean {
			return false;
		}
		
		public function canViewInScope() : Boolean {
			return getPostCount() <= 2;
		}
		
		public function comparePair(x1:int, x2:int, y1:int, y2:int) : Boolean {
			return ((x1 == y1 && x2 == y2) || (x1 == y2 && x2 == y1));
		}
		
		public function needsHighlight() : Boolean {
			return (sim.mouseElm == this || selected);
		}
		
		public function isSelected() : Boolean {
			return selected;
		}
		
		public function setSelected( x:Boolean ) : void {
			selected = x;
		}
		
		public function selectRect(r:Rectangle) : void {
			selected = r.intersects(boundingBox);
		}
		
		public function getBoundingBox() : Rectangle {
			return boundingBox;
		}
		
		public function needsShortcut() : Boolean {
			return false;
		}
		
		public static function sign(x:int) : int {
			return (x < 0) ? -1 : (x == 0) ? 0 : 1;
		}
		
		public function toString():String
		{
			return "Circuit Element";
		}
		
		
		
	}
}