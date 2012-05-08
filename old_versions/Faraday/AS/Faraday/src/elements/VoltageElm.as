package elements
{
	import flash.display.Graphics;
	import flash.geom.Point;
	
	import main.BitmapCanvas;
	import main.Settings;
	
	import ui.EditInfo;
	
	import utility.Color;
	import utility.StringTokenizer;

	public class VoltageElm extends CircuitElm
	{
		
		public static const FLAG_COS:int = 2;
		
		public static const WF_DC:int 	= 0;
		public static const WF_AC:int 	= 1;
		public static const WF_SQUARE:int 	= 2;
		public static const WF_TRIANGLE:int = 3;
		public static const WF_SAWTOOTH:int = 4;
		public static const WF_PULSE:int 	= 5;
		public static const WF_VAR:int 		= 6;
		
		public var waveform:int;
		
		public var frequency:Number;
		public var maxVoltage:Number;
		public var freqTimeZero:Number;
		public var bias:Number;
		public var phaseShift:Number;
		public var dutyCycle:Number;
		
		
		
		public function VoltageElm( xa:int, ya:int, xb:int, yb:int, f:int, st:StringTokenizer ) {
			super(xa, ya, xb, yb, f);
			
			maxVoltage = 5;
			frequency = 40;
			waveform = WF_DC;
			dutyCycle = 0.5;
			
			if(st != null) {
				try {
					waveform = int(st.nextToken());
					frequency = Number(st.nextToken());
					maxVoltage = Number(st.nextToken());
					bias = Number(st.nextToken());
					phaseShift = Number(st.nextToken());
					dutyCycle = Number(st.nextToken());
				} catch ( e:Error ) {
					trace("VoltageElm: Error initializing values from tokenizer!");
				}
			}
			
			if( (flags&FLAG_COS) != 0 ) {
				flags &= ~FLAG_COS;
				
				phaseShift = pi/2;
			}
			
			reset();
			
		}
		
		override public function getDumpType() : * {
			return 'v';
		}
		
		override public function dump() : String {
			return super.dump() + " " + waveform + " " + frequency + " " + maxVoltage + " " + bias + " " + phaseShift + " " + dutyCycle;
		}
		
		override public function reset() : void {
			freqTimeZero = 0;
			curcount = 0;
		}
		
		public function triangleFunc(x:Number) : Number {
			if (x < pi)
				return x * (2 / pi) - 1;
			
			return 1 - (x - pi) * (2 / pi);
		}
		
		override public function stamp() : void {
			if (waveform == WF_DC)
				sim.stampVoltageSource(nodes[0], nodes[1], voltSource,
					getVoltage());
			else
				sim.stampVoltageSource(nodes[0], nodes[1], voltSource);
		}
		
		override public function doStep() : void {
			if (waveform != WF_DC)
				sim.updateVoltageSource(nodes[0], nodes[1], voltSource, getVoltage());
		}
		
		public function getVoltage() : Number {
			var w:Number = 2 * pi * (sim.t - freqTimeZero) * frequency + phaseShift;
			switch (waveform) {
				case WF_DC:
					return maxVoltage + bias;
				case WF_AC:
					return Math.sin(w) * maxVoltage + bias;
				case WF_SQUARE:
					return bias + ((w % (2 * pi) > (2 * pi * dutyCycle)) ?
						-maxVoltage : maxVoltage);
				case WF_TRIANGLE:
					return bias + triangleFunc(w % (2 * pi)) * maxVoltage;
				case WF_SAWTOOTH:
					return bias + (w % (2 * pi)) * (maxVoltage / pi) - maxVoltage;
				case WF_PULSE:
					return ((w % (2 * pi)) < 1) ? maxVoltage + bias : bias;
				default:
					return 0;
			}
		}

		public const circleSize:int = 17;
		
		override public function setPoints() : void {
			super.setPoints();
			calcLeads( (waveform == WF_DC || waveform == WF_VAR) ? 8 : circleSize *2);
		}
		
		override public function draw(g:Graphics) : void {
			setBbox(x, y, x2, y2);
			draw2Leads(g);
			if (waveform == WF_DC) {
				setPowerColor(false);
				var color:uint = setVoltageColor(volts[0]);
				interpPoint2(lead1, lead2, ps1, ps2, 0, 10);
				drawThickLinePt(ps1, ps2, color);
				color = setVoltageColor(volts[1]);
				var hs:int = 16;
				setBboxPt(point1, point2, hs);
				interpPoint2(lead1, lead2, ps1, ps2, 1, hs);
				drawThickLinePt(ps1, ps2, color);
			} else {
				setBboxPt(point1, point2, circleSize);
				interpPoint(lead1, lead2, ps1, .5);
				drawWaveform(ps1);
			}
			updateDotCount();
			if (sim.dragElm != this) {
				if (waveform == WF_DC)
					drawDots(point1, point2, curcount);
				else {
					drawDots(point1, lead1, curcount);
					drawDots(point2, lead2, -curcount);
				}
			}
			drawPosts();
		}
		
		public function drawWaveform( center:Point ) : void {
			
			var color:uint = needsHighlight() ? selectColor : Settings.FG_COLOR;
			
			//g.beginFill();
			setPowerColor(false);
			var xc:int = center.x;
			var yc:int = center.y;
			Main.getMainCanvas().drawThickCircle(xc, yc, circleSize, color);
			var wl:int = 8;
			adjustBbox(xc - circleSize, yc - circleSize, xc + circleSize, yc + circleSize);
			var xc2:int;
			switch (waveform) {
				case WF_DC: {
					break;
				}
				case WF_SQUARE:
					xc2 = (int) (wl * 2 * dutyCycle - wl + xc);
					xc2 = Math.max(xc - wl + 3, Math.min(xc + wl - 3, xc2));
					drawThickLine(xc - wl, yc - wl, xc - wl, yc, color);
					drawThickLine(xc - wl, yc - wl, xc2, yc - wl, color);
					drawThickLine(xc2, yc - wl, xc2, yc + wl, color);
					drawThickLine(xc + wl, yc + wl, xc2, yc + wl, color);
					drawThickLine(xc + wl, yc, xc + wl, yc + wl, color);
					break;
				case WF_PULSE:
					yc += wl / 2;
					drawThickLine(xc - wl, yc - wl, xc - wl, yc, color);
					drawThickLine(xc - wl, yc - wl, xc - wl / 2, yc - wl, color);
					drawThickLine(xc - wl / 2, yc - wl, xc - wl / 2, yc, color);
					drawThickLine(xc - wl / 2, yc, xc + wl, yc, color);
					break;
				case WF_SAWTOOTH:
					drawThickLine(xc, yc - wl, xc - wl, yc, color);
					drawThickLine(xc, yc - wl, xc, yc + wl, color);
					drawThickLine(xc, yc + wl, xc + wl, yc, color);
					break;
				case WF_TRIANGLE: {
					var xl:int = 5;
					drawThickLine(xc - xl * 2, yc, xc - xl, yc - wl, color);
					drawThickLine(xc - xl, yc - wl, xc, yc, color);
					drawThickLine(xc, yc, xc + xl, yc + wl, color);
					drawThickLine(xc + xl, yc + wl, xc + xl * 2, yc, color);
					break;
				}
				case WF_AC: {
					var i:int;
					var xl:int = 10;
					var ox:int = -1;
					var oy:int = -1;
					for (i = -xl; i <= xl; i++) {
						var yy:int = yc + (int) (.95 * Math.sin(i * pi / xl) * wl);
						if (ox != -1)
							drawThickLine(ox, oy, xc + i, yy, color);
						ox = xc + i;
						oy = yy;
					}
					break;
				}
			}
			if (sim.showValuesCheckItem) {
				var s:String = getShortUnitText(frequency, "Hz");
				if (dx == 0 || dy == 0)
					drawValues(s, circleSize);
			}
		}
		
		override public function getVoltageSourceCount() : int {
			return 1;
		}
		
		override public function getPower() : Number {
			return -getVoltageDiff() * current;
		}
		
		override public function getVoltageDiff() : Number {
			return volts[1] - volts[0];
		}
		
		override public function getInfo(arr:Array) : void {
			switch (waveform) {
				case WF_DC:
				case WF_VAR:
					arr[0] = "voltage source";
					break;
				case WF_AC:
					arr[0] = "A/C source";
					break;
				case WF_SQUARE:
					arr[0] = "square wave gen";
					break;
				case WF_PULSE:
					arr[0] = "pulse gen";
					break;
				case WF_SAWTOOTH:
					arr[0] = "sawtooth gen";
					break;
				case WF_TRIANGLE:
					arr[0] = "triangle gen";
					break;
			}
			arr[1] = "I = " + getCurrentText(getCurrent());
			arr[2] = ((this instanceof RailElm) ? "V = " : "Vd = ") +
				getVoltageText(getVoltageDiff());
			if (waveform != WF_DC && waveform != WF_VAR) {
				arr[3] = "f = " + getUnitText(frequency, "Hz");
				arr[4] = "Vmax = " + getVoltageText(maxVoltage);
				var i:int = 5;
				if (bias != 0)
					arr[i++] = "Voff = " + getVoltageText(bias);
				else if (frequency > 500)
					arr[i++] = "wavelength = " +
						getUnitText(2.9979e8 / frequency, "m");
				arr[i++] = "P = " + getUnitText(getPower(), "W");
			}
		}
		
		override public function getEditInfo(n:int):EditInfo {
			if (n == 0)
				return new EditInfo(waveform == WF_DC ? "Voltage" :
					"Max Voltage", maxVoltage, -20, 20);
			if (n == 1) {
				var ei:EditInfo = new EditInfo("Waveform", waveform, -1, -1);
//				ei.choice = new Choice();
//				ei.choice.add("D/C");
//				ei.choice.add("A/C");
//				ei.choice.add("Square Wave");
//				ei.choice.add("Triangle");
//				ei.choice.add("Sawtooth");
//				ei.choice.add("Pulse");
//				ei.choice.select(waveform);
				return ei;
			}
			if (waveform == WF_DC)
				return null;
			if (n == 2)
				return new EditInfo("Frequency (Hz)", frequency, 4, 500);
			if (n == 3)
				return new EditInfo("DC Offset (V)", bias, -20, 20);
			if (n == 4)
				return new EditInfo("Phase Offset (degrees)", phaseShift * 180 / pi,
					-180, 180).setDimensionless();
			if (n == 5 && waveform == WF_SQUARE)
				return new EditInfo("Duty Cycle", dutyCycle * 100, 0, 100).
					setDimensionless();
			return null;
		}
		
		override public function setEditValue(n:int, ei:EditInfo):void {
			if (n == 0)
				maxVoltage = ei.value;
			if (n == 3)
				bias = ei.value;
			if (n == 2) {
				// adjust time zero to maintain continuity in the waveform
				// even though the frequency has changed.
				var oldfreq:Number = frequency;
				frequency = ei.value;
				var maxfreq:Number = 1 / (8 * sim.timeStep);
				if (frequency > maxfreq)
					frequency = maxfreq;
				var adj:Number = frequency - oldfreq;
				freqTimeZero = sim.t - oldfreq * (sim.t - freqTimeZero) / frequency;
			}
			if (n == 1) {
				var ow:int = waveform;
				//waveform = ei.choice.getSelectedIndex();
				if (waveform == WF_DC && ow != WF_DC) {
					//ei.newDialog = true;
					bias = 0;
				} else if (waveform != WF_DC && ow == WF_DC) {
					//ei.newDialog = true;
				}
				if ((waveform == WF_SQUARE || ow == WF_SQUARE) &&
					waveform != ow)
					//ei.newDialog = true;
				setPoints();
			}
			if (n == 4)
				phaseShift = ei.value * pi / 180;
			if (n == 5)
				dutyCycle = ei.value * .01;
		}
		
	}
}