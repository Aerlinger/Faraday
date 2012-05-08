
package main {
	import air.net.URLMonitor;
	
	import elements.*;
	import elements.CircuitElm;
	import elements.core.Diode;
	
	import flash.display.Graphics;
	import flash.display.MovieClip;
	import flash.display.NativeMenu;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.events.NativeDragEvent;
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.net.FileFilter;
	import flash.net.FileReference;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.text.Font;
	import flash.utils.ByteArray;
	import flash.utils.Dictionary;
	import flash.utils.getDefinitionByName;
	import flash.utils.setTimeout;
	
	import mx.charts.chartClasses.DataDescription;
	import mx.controls.Menu;
	import mx.controls.scrollClasses.ScrollBar;
	import mx.skins.halo.WindowBackground;
	import mx.utils.StringUtil;
	import mx.utils.URLUtil;
	import mx.utils.object_proxy;
	
	import spark.components.Button;
	import spark.components.CheckBox;
	import spark.components.Image;
	import spark.components.Label;
	
	import ui.EditDialog;
	import ui.ImportDialog;
	
	import utility.ArrayUtils;
	import utility.Color;
	import utility.Dimension;
	import utility.FileStreamWithLineReader;
	import utility.StringTokenizer;
	import utility.TimerUtilities;
	
	
	
	public final class CirSim {
		
		public static const PI:Number = Math.PI;
		
		public static const MODE_ADD_ELM:uint 		= 0;
		public static const MODE_DRAG_ALL:uint 		= 1;
		public static const MODE_DRAG_ROW:uint 		= 2;
		public static const MODE_DRAG_COLUMN:uint 	= 3;
		public static const MODE_DRAG_SELECTED:uint = 4;
		public static const MODE_DRAG_POST:uint 	= 5;
		public static const MODE_SELECT:uint 		= 6;
		
		private var winSize:Dimension = new Dimension(1280, 740);
		private var dbimage:Image;
		
		//static Container main;
		public static var iterationNum:uint = 0;
		
		private var titleLabel:Label;
		private var resetButton:Button;
		private var dumpMatrixButton:Button;
		
		private var powerLabel:Label;
		
		private var addingClass:Class;
		
		public var mouseMode:uint = MODE_SELECT;
		private var tempMouseMode:uint = MODE_SELECT;
		
		private var mouseModeStr:String = "Select";
		
		public var dragX:int;
		public var dragY:int;
		public var initDragX:int;
		public var initDragY:int;
		
		public var selectedArea:Rectangle;
		
		public var gridSize:uint;
		public var gridMask:uint;
		public var gridRound:uint;
		
		public var dragging:Boolean;
		public var analyzeFlag:Boolean;
		public var dumpMatrix:Boolean;
		public var useBufferedImage:Boolean;
		public var isMac:Boolean;
		public var ctrlMetaKey:Number;
		public var t:Number = 0;
		public var pause:int = 10;
		public var scopeSelected:int = -1;
		public var menuScope:int = -1;
		public var hintType:int = -1;
		public var hintItem1:int, hintItem2:int;
		public var stopMessage:String;
		
		public static const HINT_LC:uint = 1;
		public static const HINT_RC:uint = 2;
		public static const HINT_3DB_C:uint = 3;
		public static const HINT_TWINT:uint = 4;
		public static const HINT_3DB_L:uint = 5;
		
		public var elmList:Array = new Array();
		public var setupList:Array;
		
		// Simulation state variables ///////////////////////
		public var stoppedCheck:Boolean = false;
		public var showPowerCheck:Boolean = false;
		public var showValuesCheckItem:Boolean = true;
		public var powerCheckItem:Boolean = false;
		public var voltsCheckItem:Boolean = true;
		public var dotsCheckItem:Boolean = true;
		public var printableCheckItem:Boolean = false;
		public var conventionCheckItem:Boolean = true;
		public var speedBar:Number = 117;
		public var currentBar:Number = 100;
		public var smallGridCheckItem:Boolean = false;
		public var powerBar:Number = 50;
		
		public var timeStep:Number;
		/////////////////////////////////////////////////////
		
		public var dragElm:CircuitElm;
		public var menuElm:CircuitElm;
		public var mouseElm:CircuitElm;
		public var stopElm:CircuitElm;
		
		public var mousePost:int = -1;
		public var plotXElm:CircuitElm, plotYElm:CircuitElm;
		public var draggingPost:int;
		public var heldSwitchElm:SwitchElm;
		
		// Circuit data Arrays: //////////////////////////////////////////////////////////
		private var circuitMatrix:Array; 	// Two dimensional floating point array;
		private var circuitRightSide:Array; // Column vector (floating point)
		private var origRightSide:Array;	// Column vector floating point
		private var origMatrix:Array;		// Two dimensional floating point array;
		
		private var circuitRowInfo:Array;	// Array of RowInfo Elements
		
		private var circuitPermute:Array;	// Array of integers
		//////////////////////////////////////////////////////////////////////////////////
		
		private var circuitNonLinear:Boolean;
		
		private var voltageSourceCount:int;
		
		private var circuitMatrixSize:int;
		private var circuitMatrixFullSize:int;
		private var circuitNeedsMap:Boolean;
		
		public var useFrame:Boolean;
		
		public var scopeCount:int;
		private var scopes:Array;
		
		private static var editDialog:EditDialog;
		private static var impDialog:ImportDialog;
		
		public static var muString:String = "u";
		public static var ohmString:String = "ohm";
		private var clipBoard:String;
		
		private var circuitArea:Rectangle;
		private var circuitBottom:int;
		private var undoStack:Array;
		private var redoStack:Array;
		
		public var root:Main;
		
		private var startCircuit:String = null;
		private var startLabel:String = null;
		private var startCircuitText:String = null;
		private var baseURL:String = "";
		
		public static var instances:int = 0;
		
		private var dumpTypes:Dictionary = new Dictionary();	// Array of classes
		private var menuMapping:Dictionary = new Dictionary();
		
		
		public function CirSim() {
			trace("Started Simulation");
			useFrame = false;
			
			instances++;
			trace("INSTANCES: " + instances);
		}
		
		private function register( elmClassName:String ) : void {
			
			var elm:CircuitElm = constructElement(elmClassName, 0, 0, 0, 0, 0, null);
			var dumpType:String = elm.getDumpType();
			
			var dclass:String = elmClassName;//elmClassName.getDumpClass();
			if(dumpTypes[dumpType] == dclass)
				return;
			if( dumpTypes[dumpType] != null) {
				trace("Dump type conflict: " + dumpType + " " + dumpTypes[dumpType]);
				return;
			}
			
			dumpTypes[dumpType] = dclass;
		}
		
		public function constructElement(className:String, xa:int, ya:int, xb:int, yb:int, f:int, st:StringTokenizer) : * {
			
			var newElm:CircuitElm;
			
			var classDef:Class = Class(getDefinitionByName(className));
			
			newElm = new classDef(xa, ya, xb, yb, f, st);
			
			return newElm;
			
		}
		
		public function init() : void {
			
			var euroResistor:String = null;
			var useFrameStr:String = null;
			
			var printable:Boolean = false;
			var convention:Boolean = true;
			
			CircuitElm.initClass(this);
			
			needAnalyze();
			
			/////////////////////////////////////////
			// Set up UI Here:
			/////////////////////////////////////////
			
			try {
				baseURL = "/";
				//baseURL = applet.getDocumentBase().getFile(); // JAVA code
				// Look for circuit embedded in URL:
				//var doc:String = applet.getDocumentBase.toString();		// JAVA code
				var doc:String = "";		// JAVA code
			
				var idx:int = doc.indexOf('#');
			
				if(idx > 0) {
					var x:String = null;
			
					try {
						x = doc.substring(idx + 1);	// JAVA code
						
						//x = URLDecoder.decoder(x); // JAVA code
						//x = unescape(x);
						x = decodeURI(x);
						
						startCircuitText = x;
					} catch ( E:Error ) {
						trace("Can't decode " + x);
					}
				}
			
				idx = doc.lastIndexOf('/');
				
				if(idx > 0)
					baseURL = doc.substring(0, idx + 1);
				
				//var param:String = applet.getParameter("PAUSE");	// JAVA code
				//startCircuit 	= applet.getParameter("startCircuit");
				//startLabel 		= applet.getParameter("startLabel");
				//euroResistor 	= applet.getParameter("euroResistors");
				//useFrameStr 	= applet.getParameter("useFrame");
				
				//var x:String	= applet.getParameter("whiteBackground");
				
				//if(x != null && x.toLowerCase() == "true" )
				//	printable = true;
				
				//x = applet.getParameter("conventionalCurrent");
				
				//if( x 1+ null && x.toLowerCase() == "true" )
				//	convention = false;
			
			} catch( E:Error ) {
			}
			
			registerAll();
			
			//var euro = false; //(euroResistor != null && euroResistor.equalsIgnoreCase("true") );
			//useFrame = (useFrameStr == null || useFrameStr.equalsIgnoreCase("false") );
			
			//if(useFrame)
				//main = this;
			//else
			//	main = applet;
			
			//dumpTypes = new Array(300);
			
			
//			dumpTypes[(int) 'o'] = Scope.class;
//			dumpTypes[(int) 'h'] = Scope.class;
//			dumpTypes[(int) '$'] = Scope.class;
//			dumpTypes[(int) '%'] = Scope.class;
//			dumpTypes[(int) '?'] = Scope.class;
//			dumpTypes[(int) 'B'] = Scope.class;
			
			setGrid();
			elmList = new Array();
			setupList = new Array();
			undoStack = new Array();
			redoStack = new Array();
			
			loadSetupFile();
			
			
		}
		
		private function registerAll() : void {
			
			var mosfetElm:MosfetElm;
			var diodeElm:DiodeElm;
			
			register("elements.ResistorElm");
			register("elements.CapacitorElm");
			register("elements.SwitchElm");
			register("elements.GroundElm");
			register("elements.WireElm");
			register("elements.VoltageElm");
			register("elements.RailElm");
			register("elements.InductorElm");
			register("elements.DiodeElm");
			
//			register("elements.OutputElm");
			register("elements.MosfetElm");
//			register("elements.NMosfetElm");
//			register("elements.PMosfetElm");
			
		}
		
		/** Reads a circuit from a string buffer after loaded from from file. Called when the defaultCircuitFile is finished loading*/
		private function readDefaultCircuit(b:String, len:int, retain:Boolean = false) : void {
			
			if (!retain) {
				
				// reset the interface
				for (var i:uint = 0; i < elmList.length; i++) {
					var ce:CircuitElm = getElm(i);
					ce.destroy();
				}
				
				elmList.removeAllElements();
				hintType = -1;
				timeStep = 5e-6;
				
				dotsCheckItem = true;
				smallGridCheckItem = false;
				powerCheckItem = false;
				voltsCheckItem = true;
				showValuesCheckItem = true;
				setGrid();
				speedBar = 117; // 57
				currentBar = 50;
				powerBar = 50;
				CircuitElm.voltageRange = 5;
				scopeCount = 0;
				
			}
			
			for (var p:uint = 0; p < len;) {
				
				var l:int;
				var linelen:int = 0;
				for (l = 0; l != len - p; l++) {
					if (b.charAt(l + p) == '\n' || b.charAt(l + p) == '\r') {
						linelen = l++;
						if (l + p < b.length && b.charAt(l + p) == '\n')
							l++;
						break;
					}
				}
				
				var line:String = b.substring(p, p+linelen);
				var st:StringTokenizer = new StringTokenizer( line, " " );
				
				while ( st.hasMoreTokens() ) {
					
					var type:String = st.nextToken();
					var tint:String 	= type.charAt(0);
					
					try {
						// Scope input
						if (tint == 'o') {
							//var sc:Scope = new Scope(this);
							//sc.position = scopeCount;
							//sc.undump(st);
							//scopes[scopeCount++] = sc;
							break;
						}
						if (tint == ('h')) {
							readHint(st);
							break;
						}
						if (tint == ('$')) {
							readOptions(st);
							break;
						}
						if (tint == ('%') || tint == ('?') || tint == ('B')) {
							// ignore filter-specific stuff
							break;
						}
						//if (tint >= ('0') && tint <= ('9'))
						//	tint = int(type);
						
						
						var x1:int = int(st.nextToken());
						var y1:int = int(st.nextToken());
						var x2:int = int(st.nextToken());
						var y2:int = int(st.nextToken());
						var f:int = int(st.nextToken());
						
						var cls:String = dumpTypes[tint];
						
						if (cls == null) {
							trace("unrecognized dump type: " + type);
							break;
						}
						
						// NEW ELEMENTS ARE INSTANTIATED HERE
						//trace("run: " + cls + " " + " " + st.nextToken() + " " + st.nextToken() + " " + st.nextToken() );
						var ce:CircuitElm = constructElement(cls, int(x1), int(y1), int(x2), int(y2), int(f), st);
						ce.setPoints();
						
						// Add the element to the Element list
						elmList.push(ce);
					} catch ( ee:Error ) {
						trace("Error reading circuit file: " + ee.getStackTrace() );
						break;
					}
					break;
				}
				p += l;
				
			}
			
			var dumpMessage:String = dumpCircuit();
			
			if (!retain)
				handleResize(); // for scopes
			
			needAnalyze();
			handleResize();
			
			//initCircuit();
			trace("dump: \n" + dumpMessage);
			
			/////////////////////////////////////////////////////////////
			// Once the input files have been loaded
			// Simulation starts here.
			/////////////////////////////////////////////////////////////
			root.start();
			
		}
		
		public function initCircuit() : void {
			
			for (var i:int = 0; i != elmList.length; i++) {
				var ce:CircuitElm = getElm(i);
				ce.destroy();
			}
			
			// reset the interface
			t = 0;
			elmList = new Array();
			hintType = -1;
			timeStep = 1e-6;
			
			dotsCheckItem = true;
			smallGridCheckItem = false;
			powerCheckItem = false;
			voltsCheckItem = true;
			showValuesCheckItem = true;
			setGrid();
			speedBar = 117; // 57
			currentBar = 50;
			powerBar = 50;
			CircuitElm.voltageRange = 5;
			scopeCount = 0;
			
			/*
			R 480 160 416 160 0 1 500.0 5.0 0.0 0.0 0.5
			r 480 160 480 272 0 .000001 0
			c 480 272 480 372 0 500 0
			g 480 372 480 472 0
			*/
			
			var ClassSubPath:String = "elements.";
			
			// Initialization!
			var voltageElm:VoltageElm = constructElement(ClassSubPath + "VoltageElm", 304, 85, 368, 85, 0, new StringTokenizer("1 4000.0 15.0 0.0 0.0 0.5"));   
			voltageElm.setPoints();
			
			var switchElm:SwitchElm = constructElement(ClassSubPath + "SwitchElm", 368, 100, 368, 160, 0, new StringTokenizer("true false"));   
			switchElm.setPoints();
			
			var resistorElm:ResistorElm = constructElement(ClassSubPath + "ResistorElm", 368, 160, 368, 220, 0, new StringTokenizer("50")); 
			resistorElm.setPoints();
			
			var inductorElm:InductorElm = constructElement(ClassSubPath + "InductorElm", 368, 220, 368, 300, 0, new StringTokenizer(".01 0")); 
			inductorElm.setPoints();
			
			var capacitorElm:CapacitorElm = constructElement(ClassSubPath + "CapacitorElm", 368, 300, 368, 400, 0, new StringTokenizer("6.25e-6 0")); 
			capacitorElm.setPoints();
			
			var groundElm:GroundElm = constructElement(ClassSubPath + "GroundElm", 368, 400, 368, 440, 0, null);  
			groundElm.setPoints();
			
			var groundElm2:GroundElm = constructElement(ClassSubPath + "GroundElm", 304, 100, 304, 440, 0, null);  
			groundElm2.setPoints();
			
			elmList.push(voltageElm);
			elmList.push(groundElm2);
			
			elmList.push(resistorElm);
			elmList.push(groundElm);
			elmList.push(switchElm);
			elmList.push(inductorElm);
			elmList.push(capacitorElm);
			
			nodeList = new Array();
			
			handleResize();
			needAnalyze();
			
			root.start();
			
		}
		
		
		/** Not yet implemented */
		public function onKeyPressed(evt:KeyboardEvent) : void {
			//			if (e.getKeyChar() > ' ' && e.getKeyChar() < 127) {
			//			Class c = dumpTypes[e.getKeyChar()];
			//			if (c == null || c == Scope.class)
			//				return;
			//				CircuitElm elm = null;
			//				elm = constructElement(c, 0, 0);
			//				if (elm == null || !(elm.needsShortcut() && elm.getDumpClass() == c))
			//					return;
			//				mouseMode = MODE_ADD_ELM;
			//				mouseModeStr = c.getName();
			//				addingClass = c;
			//				}
			//				if (e.getKeyChar() == ' ') {
			//					mouseMode = MODE_SELECT;
			//					mouseModeStr = "Select";
			//				}
			//				tempMouseMode = mouseMode;
		}
		
		/** Key released not used */
		public function onKeyReleased(evt:KeyboardEvent) : void {
		}
		
		public function onMouseDragged( evt:MouseEvent ) : void {
			// ignore right mouse button with no modifiers (needed on PC)
//			if ((e.getModifiers() & MouseEvent.BUTTON3_MASK) != 0) {
//				int ex = e.getModifiersEx();
//				if ((ex & (MouseEvent.META_DOWN_MASK |
//					MouseEvent.SHIFT_DOWN_MASK |
//					MouseEvent.CTRL_DOWN_MASK |
//					MouseEvent.ALT_DOWN_MASK)) == 0)
//					return;
//			}
			if (!circuitArea.contains(evt.stageX, evt.stageY))
				return;
			if (dragElm != null)
				dragElm.drag(evt.stageX, evt.stageY);
			var success:Boolean = true;
			switch (tempMouseMode) {
				case MODE_DRAG_ALL:
					dragAll(snapGrid(evt.stageX), snapGrid(evt.stageY));
					break;
				case MODE_DRAG_ROW:
					dragRow(snapGrid(evt.stageX), snapGrid(evt.stageY));
					break;
				case MODE_DRAG_COLUMN:
					dragColumn(snapGrid(evt.stageX), snapGrid(evt.stageY));
					break;
				case MODE_DRAG_POST:
					if (mouseElm != null)
						dragPost(snapGrid(evt.stageX), snapGrid(evt.stageY));
					break;
				case MODE_SELECT:
					if (mouseElm == null)
						selectArea(evt.stageX, evt.stageY);
					else {
						tempMouseMode = MODE_DRAG_SELECTED;
						success = dragSelected(evt.stageX, evt.stageY);
					}
					break;
				case MODE_DRAG_SELECTED:
					success = dragSelected(evt.stageX, evt.stageY);
					break;
			}
			dragging = true;
			if (success) {
				if (tempMouseMode == MODE_DRAG_SELECTED && mouseElm is TextElm) {
					dragX = evt.stageX;
					dragY = evt.stageY;
				} else {
					dragX = snapGrid(evt.stageX);
					dragY = snapGrid(evt.stageY);
				}
			}
			root.repaint();
		}
		
		public function onMouseMove( evt:MouseEvent ) : void {
			if ( evt.buttonDown ) {
				onMouseDragged(evt);
				return;
			}
			
			trace("MOVE: " + evt.stageX + "  " + evt.stageY);
			
			// X and Y mouse position
			var x:Number = evt.stageX;
			var y:Number = evt.stageY;
			
			dragX = snapGrid(x);
			dragY = snapGrid(y);
			
			draggingPost = -1;
			
			var i:int;
			var origMouse:CircuitElm = mouseElm;
			
			mouseElm = null;
			mousePost = -1;
			
			plotXElm = plotYElm = null;
			var bestDist:int = 100000;
			var bestArea:int = 100000;
			
			for (i = 0; i != elmList.length; i++) {
				var ce:CircuitElm = getElm(i);
				if (ce.boundingBox.contains(x, y)) {
					var j:int;
					var area:int = ce.boundingBox.width * ce.boundingBox.height;
					var jn:int = ce.getPostCount();
					if (jn > 2)
						jn = 2;
					for (j = 0; j != jn; j++) {
						var pt:Point = ce.getPost(j);
						var distance:Number = distanceSq(x, y, pt.x, pt.y);
						
						// if multiple elements have overlapping bounding boxes,
						// we prefer selecting elements that have posts close
						// to the mouse pointer and that have a small bounding
						// box area.
						if (distance <= bestDist && area <= bestArea) {
							bestDist = distance;
							bestArea = area;
							mouseElm = ce;
						}
					}
					if (ce.getPostCount() == 0)
						mouseElm = ce;
				}
			}
			scopeSelected = -1;
			if (mouseElm == null) {
				// TODO: Add scopes
				//				for (i = 0; i != scopeCount; i++) {
				//					var s:Scope = scopes[i];
				//					if (s.rect.contains(x, y)) {
				//						s.select();
				//						scopeSelected = i;
				//					}
				//				}
				// the mouse pointer was not in any of the bounding boxes, but we
				// might still be close to a post
				for (i = 0; i != elmList.length; i++) {
					var ce:CircuitElm = getElm(i);
					var j:int;
					var jn:int = ce.getPostCount();
					for (j = 0; j != jn; j++) {
						var pt:Point = ce.getPost(j);
						
						var distance:Number = distanceSq(x, y, pt.x, pt.y);
						if (distanceSq(pt.x, pt.y, x, y) < 26) {
							mouseElm = ce;
							mousePost = j;
							break;
						}
					}
				}
			} else {
				mousePost = -1;
				// look for post close to the mouse pointer
				for (i = 0; i != mouseElm.getPostCount(); i++) {
					var pt:Point = mouseElm.getPost(i);
					if (distanceSq(pt.x, pt.y, x, y) < 26)
						mousePost = i;
				}
			}
			//if (CircuitSimulator.mouseElm != origMouse)
			//	this.repaint();
		}
		
		public function onMouseClicked(evt:MouseEvent) : void {
			
			trace("CLICK: " + evt.stageX + "  " + evt.stageY);

			//if (evt.buttonDown) {
				//if (mouseMode == MODE_SELECT || mouseMode == MODE_DRAG_SELECTED)
				//	clearSelection();
			//}
		}
		
		public function onMouseEntered(evt:MouseEvent) : void {
			
		}
		
		public function onMouseExited(evt:MouseEvent) : void {
			scopeSelected = -1;
			mouseElm = plotXElm = plotYElm = null;
			root.repaint();
		}
		
		public function onMousePressed(evt:MouseEvent) : void {
			trace(evt.toString());
			//var ex:uint = evt.getModifiersEx();
			
//			if ((ex & (MouseEvent.META_DOWN_MASK |
//				MouseEvent.SHIFT_DOWN_MASK)) == 0 && e.isPopupTrigger()) {
//				doPopupMenu(e);
//				return;
//			}
			
			//if (evt.buttonDown) {
				// left mouse
				tempMouseMode = mouseMode;
				if ( evt.altKey )
					tempMouseMode = MODE_DRAG_ALL;
				else if ( evt.altKey && evt.shiftKey )
					tempMouseMode = MODE_DRAG_ROW;
				else if ( evt.shiftKey )
					tempMouseMode = MODE_SELECT;
				//else if ((ex & MouseEvent.ALT_DOWN_MASK) != 0)
				//	tempMouseMode = MODE_DRAG_ALL;
				else if ( evt.controlKey)
					tempMouseMode = MODE_DRAG_POST;
			//} 
			
			/*else if ((e.getModifiers() & MouseEvent.BUTTON3_MASK) != 0) {
				// right mouse
				if ((ex & MouseEvent.SHIFT_DOWN_MASK) != 0)
					tempMouseMode = MODE_DRAG_ROW;
				else if ((ex & (MouseEvent.CTRL_DOWN_MASK |
					MouseEvent.META_DOWN_MASK)) != 0)
					tempMouseMode = MODE_DRAG_COLUMN;
				else
					return;
			}*/
			
			if (tempMouseMode != MODE_SELECT && tempMouseMode != MODE_DRAG_SELECTED)
				clearSelection();
			
			if ( doSwitch(evt.stageX, evt.stageY) )
				return;
			
			//pushUndo();
			initDragX = evt.stageX;
			initDragY = evt.stageY;
			dragging = true;
			if (tempMouseMode != MODE_ADD_ELM || addingClass == null)
				return;
			
			var x0:int = snapGrid(evt.stageX);
			var y0:int = snapGrid(evt.stageY);
			if (!circuitArea.contains(x0, y0))
				return;
			
			//dragElm = constructElement(addingClass, x0, y0);
		}
		
		public function onMouseReleased( evt:MouseEvent ) : void {
			//int ex = e.getModifiersEx();
			if(evt.shiftKey || evt.ctrlKey ) {
				
			}
			
//			if ((ex & (MouseEvent.SHIFT_DOWN_MASK | MouseEvent.CTRL_DOWN_MASK |
//				MouseEvent.META_DOWN_MASK)) == 0 && e.isPopupTrigger()) {
//				doPopupMenu(e);
//				return;
//			}
			
			tempMouseMode = mouseMode;
			selectedArea = null;
			dragging = false;
			var circuitChanged:Boolean = false;
			
			if (heldSwitchElm != null) {
				heldSwitchElm.mouseUp();
				heldSwitchElm = null;
				circuitChanged = true;
			}
			
			if (dragElm != null) {
				// if the element is zero size then don't create it
				if (dragElm.x == dragElm.x2 && dragElm.y == dragElm.y2)
					dragElm.destroy();
				else {
					elmList.addElement(dragElm);
					circuitChanged = true;
				}
				dragElm = null;
			}
			
			if (circuitChanged)
				needAnalyze();
			if (dragElm != null)
				dragElm.destroy();
			dragElm = null;
			root.repaint();
		}
		
		public function dragAll( x:int, y:int) : void {
			var dx:int = x - dragX;
			var dy:int = y - dragY;
			if (dx == 0 && dy == 0)
				return;
			var i:int;
			for (i = 0; i != elmList.length; i++) {
				var ce:CircuitElm = getElm(i);
				ce.move(dx, dy);
			}
			removeZeroLengthElements();
		}
		
		public function dumpCircuit() : String {
			var i:int;
			
			var f:int = (dotsCheckItem) ? 1 : 0;
			f |= (smallGridCheckItem) ? 2 : 0;
			f |= (voltsCheckItem) ? 0 : 4;
			f |= (powerCheckItem) ? 8 : 0;
			f |= (showValuesCheckItem) ? 0 : 16;
			
			// 32 = linear scale in afilter
			var dump:String = "$ " + f + " " +
				timeStep + " " + getIterCount() + " " +
				currentBar + " " + CircuitElm.voltageRange + " " +
				powerBar + "\n";
			
			for (i = 0; i != elmList.length; i++)
				dump += getElm(i).dump() + "\n";
			
			for (i = 0; i != scopeCount; i++) {
				var d:String = scopes[i].dump();
				if (d != null)
					dump += d + "\n";
			}
			
			if (hintType != -1)
				dump += "h " + hintType + " " + hintItem1 + " " +
					hintItem2 + "\n";
			
			return dump;
		}
		
		public function dragRow( x:int, y:int ) : void {
			var dy:int = y - dragY;
			if (dy == 0)
				return;
			var i:int;
			for (i = 0; i != elmList.length; i++) {
				var ce:CircuitElm = getElm(i);
				if (ce.y == dragY)
					ce.movePoint(0, 0, dy);
				if (ce.y2 == dragY)
					ce.movePoint(1, 0, dy);
			}
			removeZeroLengthElements();
		}
		
		public function dragColumn( x:int, y:int) : void {
			var dx:int = x - dragX;
			if (dx == 0)
				return;
			var i:int;
			for (i = 0; i != elmList.length; i++) {
				var ce:CircuitElm = getElm(i);
				if (ce.x == dragX)
					ce.movePoint(0, dx, 0);
				if (ce.x2 == dragX)
					ce.movePoint(1, dx, 0);
			}
			removeZeroLengthElements();
		}
		
		private function dragSelected( x:int, y:int) : Boolean {
			var me:Boolean = false;
			if (mouseElm != null && !mouseElm.isSelected())
				mouseElm.setSelected(me = true);
			
			// snap grid, unless we're only dragging text elements
			var i:int;
			for (i = 0; i != elmList.length; i++) {
				var ce:CircuitElm = getElm(i);
				if (ce.isSelected() && !(ce instanceof TextElm))
					break;
			}
			if (i != elmList.length) {
				x = snapGrid(x);
				y = snapGrid(y);
			}
			
			var dx:int = x - dragX;
			var dy:int = y - dragY;
			if (dx == 0 && dy == 0) {
				// don't leave mouseElm selected if we selected it above
				if (me)
					mouseElm.setSelected(false);
				return false;
			}
			var allowed:Boolean = true;
			
			// check if moves are allowed
			for (i = 0; allowed && i != elmList.length; i++) {
				var ce:CircuitElm = getElm(i);
				if (ce.isSelected() && !ce.allowMove(dx, dy))
					allowed = false;
			}
			
			if (allowed) {
				for (i = 0; i != elmList.length; i++) {
					var ce:CircuitElm = getElm(i);
					if (ce.isSelected())
						ce.move(dx, dy);
				}
				needAnalyze();
			}
			
			// don't leave mouseElm selected if we selected it above
			if (me)
				mouseElm.setSelected(false);
			
			return allowed;
		}
		
		private function dragPost(x:int, y:int) : void {
			if (draggingPost == -1) {
				draggingPost =
					(distanceSq(mouseElm.x, mouseElm.y, x, y) >
						distanceSq(mouseElm.x2, mouseElm.y2, x, y)) ? 1 : 0;
			}
			var dx:int = x - dragX;
			var dy:int = y - dragY;
			if (dx == 0 && dy == 0)
				return;
			
			mouseElm.movePoint(draggingPost, dx, dy);
			needAnalyze();
		}
		
		private function selectArea( x:int, y:int) : void {
			var x1:int = Math.min(x, initDragX);
			var x2:int = Math.max(x, initDragX);
			var y1:int = Math.min(y, initDragY);
			var y2:int = Math.max(y, initDragY);
			selectedArea = new Rectangle(x1, y1, x2 - x1, y2 - y1);
			var i:int;
			for (i = 0; i != elmList.length; i++) {
				var ce:CircuitElm = getElm(i);
				ce.selectRect(selectedArea);
			}
		}
		
		/** todo: port */
		public function removeZeroLengthElements() : void {
			var i:int;
			var changed:Boolean = false;
			for (i = elmList.length - 1; i >= 0; i--) {
				var ce:CircuitElm = getElm(i);
				if (ce.x == ce.x2 && ce.y == ce.y2) {
					elmList.removeElementAt(i);
					ce.destroy();
					changed = true;
				}
			}
			needAnalyze();
		}
		
		/** Not yet ported */
		public function doPaste() : void {
			
		}
		
		private function clearSelection() : void {
			var i:uint;
			for (i = 0; i != elmList.length; i++) {
				var ce:CircuitElm = getElm(i);
				ce.setSelected(false);
			}
		}
		
		private function doSelectAll() : void {
			var i:int;
			for (i = 0; i != elmList.length; i++) {
				var ce:CircuitElm = getElm(i);
				ce.setSelected(true);
			}
		}
		
		private function setGrid() : void {
			gridSize = (smallGridCheckItem) ? 8 : 16;
			gridMask = ~(gridSize - 1);
			gridRound = gridSize / 2 - 1;
		}
		
		private function handleResize() : void {
			
//			winSize = cv.getSize();
//			if (winSize.width == 0)
//				return;
//			dbimage = main.createImage(winSize.width, winSize.height);
//			int h = winSize.height / 5;
//			/*if (h < 128 && winSize.height > 300)
//			h = 128;*/
//			circuitArea = new Rectangle(0, 0, winSize.width, winSize.height - h);
//			int i;
//			int minx = 1000, maxx = 0, miny = 1000, maxy = 0;
//			for (i = 0; i != elmList.length; i++) {
//				CircuitElm ce = getElm(i);
//				// centered text causes problems when trying to center the circuit,
//				// so we special-case it here
//				if (!ce.isCenteredText()) {
//					minx = min(ce.x, min(ce.x2, minx));
//					maxx = max(ce.x, max(ce.x2, maxx));
//				}
//				miny = min(ce.y, min(ce.y2, miny));
//				maxy = max(ce.y, max(ce.y2, maxy));
//			}
//			// center circuit; we don't use snapGrid() because that rounds
//			int dx = gridMask & ((circuitArea.width - (maxx - minx)) / 2 - minx);
//			int dy = gridMask & ((circuitArea.height - (maxy - miny)) / 2 - miny);
//			if (dx + minx < 0)
//				dx = gridMask & (-minx);
//			if (dy + miny < 0)
//				dy = gridMask & (-miny);
//			for (i = 0; i != elmList.length; i++) {
//				CircuitElm ce = getElm(i);
//				ce.move(dx, dy);
//			}
			
			// after moving elements, need this to avoid singular matrix probs
			var h:int = winSize.height / 5;
			circuitArea = new Rectangle(0, 0, winSize.width, winSize.height - h);
			
			needAnalyze();
			circuitBottom = 0;
		}
		
		private function destroyFrame() : void {
			// From FALSTAD
		}
		
		public function getHint() : String {
			
			var c1:CircuitElm = getElm(hintItem1);
			var c2:CircuitElm = getElm(hintItem2);
			
			if (c1 == null || c2 == null)
				return null;
			if (hintType == HINT_LC) {
				if (!(c1 is InductorElm))
					return null;
				if (!(c2 is CapacitorElm))
					return null;
				var ie:InductorElm = c1 as InductorElm;
				var ce:CapacitorElm = c2 as CapacitorElm;
				return "res.f = " + CircuitElm.getUnitText(1 / (2 * Math.PI * Math.sqrt(ie.inductance *
					ce.capacitance)), "Hz");
			}
			if (hintType == HINT_RC) {
				if (!(c1 is ResistorElm))
					return null;
				if (!(c2 is CapacitorElm))
					return null;
				var re:ResistorElm = c1 as ResistorElm;
				var ce:CapacitorElm = c2 as CapacitorElm;
				return "RC = " + CircuitElm.getUnitText(re.resistance * ce.capacitance,
					"s");
			}
			if (hintType == HINT_3DB_C) {
				if (!(c1 is ResistorElm))
					return null;
				if (!(c2 is CapacitorElm))
					return null;
				var re:ResistorElm = c1 as ResistorElm;
				var ce:CapacitorElm = c2 as CapacitorElm;
				return "f.3db = " +
					CircuitElm.getUnitText(1 / (2 * PI * re.resistance * ce.capacitance), "Hz");
			}
			if (hintType == HINT_3DB_L) {
				if (!(c1 is ResistorElm))
					return null;
				if (!(c2 is InductorElm))
					return null;
				var re:ResistorElm = c1 as ResistorElm;
				var ie:InductorElm = c2 as InductorElm;
				return "f.3db = " +
					CircuitElm.getUnitText(re.resistance / (2 * PI * ie.inductance), "Hz");
			}
			if (hintType == HINT_TWINT) {
				if (!(c1 is ResistorElm))
					return null;
				if (!(c2 is CapacitorElm))
					return null;
				var re:ResistorElm = c1 as ResistorElm;
				var ce:CapacitorElm = c2 as CapacitorElm;
				return "fc = " +
					CircuitElm.getUnitText(1 / (2 * PI * re.resistance * ce.capacitance), "Hz");
			}
			return null;
		}
		
		// Variables used in update circuit:
		public static const resct:int = 6;
		private var lastTime:int = 0;
		private var lastFrameTime:int;
		private var lastIterTime:int;
		private var secTime:int = 0;
		private var frames:int = 0;
		private var steps:int = 0;
		private var framerate:int = 0;
		private var steprate:int = 0;
		
		
		public function snapGrid(x:int) : int {
			return (x + gridRound) & gridMask;
		}
		
		public function toggleSwitch(n:int) : void {
			var i:int;
			for (i = 0; i != elmList.length; i++) {
				var ce:CircuitElm = getElm(i);
				if (ce is SwitchElm) {
					n--;
					if (n == 0) {
						(ce as SwitchElm).toggle();
						analyzeFlag = true;
						//cv.repaint();
						return;
					}
				}
			}
		}
		
		/* ported */
		public function doSwitch(x:int, y:int) : Boolean {
			if (mouseElm == null || !(mouseElm is SwitchElm))
				return false;
			var se:SwitchElm = mouseElm as SwitchElm;
			se.toggle();
			if (se.momentary)
				heldSwitchElm = se;
			needAnalyze();
			return true;
		}
		
		private function getIterCount() : Number {
			if (speedBar == 0)
				return 0;
			//return (Math.exp((speedBar.getValue()-1)/24.) + .5);
			return .1 * Math.exp((speedBar - 61) / 24.);
		}
		
		private function needAnalyze() : void {
			analyzeFlag = true;
			//cv.repaint();
		}
		
		public var nodeList:Array;
		public var voltageSources:Array;
		
		public function getCircuitNode(n:int) : CircuitNode {
			if(n >= nodeList.length)
				return new CircuitNode();
			
			return nodeList[n] as CircuitNode;
		}
		
		public function getElm(n:int) : CircuitElm {
			if(n >= elmList.length)
				return null;
			return elmList[n] as CircuitElm;
		}
		
		public function stop(s:String, ce:CircuitElm) : void {
			stopMessage = s;
			circuitMatrix = null;
			stopElm = ce;
			//stoppedCheck = true;
			analyzeFlag = false;
			trace("Error: " + s);
			//cv.repaint();
			// TODO: Put error message here
		}
		
		//////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////
		// CIRCUIT ANALYSIS CODE
		//////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////
		
		
		/** Circuit rendering goes here  */
		public function updateCircuit() : void {
			
			var startTime:uint = TimerUtilities.currentTimeMillis();
			
			iterationNum++;
			Main.getMainCanvas().clear();
			
			var realMouseElm:CircuitElm;
			if(winSize == null || winSize.width == 0)
				return;
			if(analyzeFlag) {
				analyzeCircuit();
				analyzeFlag = false;
			}
			
			if(editDialog != null && editDialog.elm is CircuitElm)
				mouseElm =  editDialog.elm as CircuitElm;
			
			realMouseElm = mouseElm;
			
			if( mouseElm == null)
				mouseElm = stopElm;
			
			//setupScopes();
			
			CircuitElm.selectColor = Settings.SELECT_COLOR;
			
			if(printableCheckItem) {
				CircuitElm.whiteColor = Color.BLACK;
				CircuitElm.lightGrayColor = Color.BLACK;
			} else {
				CircuitElm.whiteColor = Color.WHITE;
				CircuitElm.lightGrayColor = Color.LIGHT_GRAY;
			}
			
			if(!stoppedCheck) {
				try {
					runCircuit();
				} catch ( e:Error ) {
					trace(e.getStackTrace());
					analyzeFlag = true;
					
					//cv.paint(g);
					return;
				}
			}
			
			if(!stoppedCheck) {
				var sysTime:int = TimerUtilities.currentTimeMillis();
				if(lastTime != 0) {
					var inc:int = sysTime - lastTime;
					var c:Number = currentBar;//55; 	// The value of this number must be carefully set for current to display properly
					
					trace("Frame time: " + inc  + "   #: "  + frames);
					
					c = Math.exp( c / 3.5 - 14.2 );
					CircuitElm.currentMult = 1.7 * inc * c;
					trace("cur: " + CircuitElm.currentMult);
					if(!conventionCheckItem)
						CircuitElm.currentMult = -CircuitElm.currentMult;
					
				}
				if(sysTime - secTime >= 1000) {
					framerate = frames;
					steprate = steps;
					frames = 0;
					steps = 0;
					secTime = sysTime;
				}
				
				lastTime = sysTime;
			} else {
				lastTime = 0;
			}
			
			CircuitElm.powerMult = Math.exp(powerBar / 4.762 - 7);
			
			var i:int;
			for( i=0; i<elmList.length; ++i) {
				getElm(i).draw(null);
			}
			
			if(tempMouseMode == MODE_DRAG_ROW || tempMouseMode == MODE_DRAG_COLUMN ||
				tempMouseMode == MODE_DRAG_POST || tempMouseMode == MODE_DRAG_SELECTED)
				for(i=0; i<elmList.length; ++i) {
					var ce:CircuitElm = getElm(i);
					Main.getMainCanvas().renderPost(ce.x, ce.y);
					Main.getMainCanvas().renderPost(ce.x2, ce.y2);
				}
			var badNodes:int = 0;
			
			// find bad connections. Nodes not connected to other elements which intersect other elements' bounding boxes
			for( i=0; i<nodeList.length; ++i ) {
				var cn:CircuitNode = getCircuitNode(i);
				
				if(!cn.intern && cn.links.length == 1) {
					var bb:int = 0;
					var j:int;
					var cn1:CircuitNodeLink = cn.links[0];
					for( j=0; j<elmList.length; ++j) {
						
						if( cn1.elm != getElm(j) && getElm(j).boundingBox.contains(cn.x, cn.y) )
							bb++;
					}
					if(bb>0) {
						Main.getMainCanvas().drawThickCircle(cn.x, cn.y, 5, Color.RED);
						badNodes++;
					}
				}
			}
			
			if (dragElm != null && (dragElm.x != dragElm.x2 || dragElm.y != dragElm.y2))
				dragElm.draw(null);
			
			var ct:int = scopeCount;
			if(stopMessage != null)
				ct = 0;
			for(i=0; i!=ct; ++i) {}
				//scopes[i].draw(g);
				
				
				if(stopMessage != null) {
					// TODO: Display error text here
				} else {
					if(circuitBottom ==0)
						calcCircuitBottom();
					
					var info:Array = new Array(10);  // Array of messages to be displayed at the bottom of the canvas
					if(mouseElm != null) {
						if(mousePost == -1)
							mouseElm.getInfo(info);
						else
							info[0] = "V = " + CircuitElm.getUnitText(mouseElm.getPostVoltage(mousePost), "V");
					} else {
						CircuitElm.showFormat.fractionalDigits = 2;
						info[0] = "t = " + CircuitElm.getUnitText(t, "s") + " \nf.t.: " + (lastTime-lastFrameTime) + "\n";
					}
					if(hintType != -1) {
						for( i=0; info[i] != null; ++i) {}
						var s:String = getHint();
						if(s == null)
							hintType = -1;
						else
							info[i] = s;
					}
					var x:int = 0;
					if(ct != 0)
						x = scopes[ct-1].rightEdge() + 20;
					
					x = Math.max(x, winSize.width * 2 / 3);
					
					for(i=0; info[i] != null; ++i) {}
					if(badNodes > 0)
						info[++i] = badNodes + ((badNodes==1) ? " bad connection" : " bad connections");
					
					// Find where to show data; below ciruit, not too high unless we need it
					var ybase:int = winSize.height - 15*i - 5;
					ybase = Math.min(ybase, circuitArea.height);
					ybase = Math.max(ybase, circuitBottom);
					
					Main.getMainCanvas().setInfoText(info, x, ybase);
					/*
					for( i=0; info[i] != null; ++i ) {	
						// TODO: draw status string here:  g.drawString(info[i], x, ybase + 15 * (i + 1));
						//cv.clearStrings();
						//cv.drawString(info[i], x, ybase + 15 * (i+1));
						
					}
					*/
				}
			
			// Draw selection outline:
			if( selectedArea != null) {
				Main.getMainCanvas().bitmapRect(selectedArea.x, selectedArea.y, selectedArea.width, selectedArea.height, CircuitElm.selectColor);
			}
			
			mouseElm = realMouseElm;
			frames++;
			
			var endTime:uint = TimerUtilities.currentTimeMillis();
			var computationTime:uint = (endTime-startTime);
			
			Main.getMainCanvas().setFrameTimeText("Frame: " + frames + "\nComputationTime: " + computationTime);
			trace("Computation Time: " + computationTime); 
			
			Main.getMainCanvas().setSimulationInfoText("Sim: sp: " + speedBar + "\ncurSpeed: " + currentBar 
				+ "\nt.s.:" + timeStep + "\nvrange: " + CircuitElm.voltageRange);
			
			lastFrameTime = lastTime;
			
		}
		
		private function analyzeCircuit() : void {
			
			calcCircuitBottom();
			
			if(elmList.length==0)
				return;
			
			stopMessage = null;
			stopElm = null;
			
			var i:int;
			var j:int;
			
			var vscount:int = 0;
			
			nodeList = new Array();
			var gotGround:Boolean = false;
			var gotRail:Boolean = false;
			
			var volt:CircuitElm = null;
			
			for(i=0; i<elmList.length; ++i) {
				var ce:CircuitElm = getElm(i);
				if( ce is GroundElm) {
					gotGround = true;
					break;
				}
				if(ce is RailElm)
					gotRail = true;
				if(volt == null && ce is VoltageElm)
					volt = ce;
			}
			
			// If no ground and no rails then voltage element's first terminal is referenced to ground:
			if(!gotGround && volt != null && !gotRail) {
				var cn:CircuitNode = new CircuitNode();
				
				var pt:Point = volt.getPost(0);
				cn.x = pt.x;
				cn.y = pt.y;
				nodeList.push(cn);
			} else {
				// Else allocate extra node for ground
				var cn:CircuitNode = new CircuitNode();
				cn.x = cn.y = -1;
				nodeList.push(cn);
			}
			
			// Allocate nodes and voltage sources
			for(i=0; i<elmList.length; ++i) {
				var ce:CircuitElm = getElm(i);
				
				var inodes:int = ce.getInternalNodeCount();
				var ivs:int = ce.getVoltageSourceCount();
				var posts:int = ce.getPostCount();
				
				// allocate a node for each post and match posts to nodes
				for(j=0; j != posts; ++j) {
					var pt:Point = ce.getPost(j);
					
					var k:int;
					for( k=0; k != nodeList.length; ++k ) {
						var cn:CircuitNode = getCircuitNode(k);
						if(pt.x == cn.x && pt.y == cn.y)
							break;
					}
					if( k==nodeList.length ) {
						var cn:CircuitNode = new CircuitNode();
						cn.x = pt.x;
						cn.y = pt.y;
						var cn1:CircuitNodeLink =  new CircuitNodeLink();
						cn1.num = j;
						cn1.elm = ce;
						cn.links.push(cn1);
						ce.setNode(j, nodeList.length);
						nodeList.push(cn);
					} else {
						var cn1:CircuitNodeLink = new CircuitNodeLink();
						cn1.num = j;
						cn1.elm = ce;
						getCircuitNode(k).links.push(cn1);
						ce.setNode(j, k);
						// If it's the groudn node, make suer the node voltage is 0, because it may not get set later.
						if(k==0)
							ce.setNodeVoltage(j, 0);
					}
					
				}
				for(j=0; j!=inodes; ++j) {
					var cn:CircuitNode = new CircuitNode();
					
					cn.x = cn.y = -1;
					cn.intern = true;
					
					var cn1:CircuitNodeLink = new CircuitNodeLink();
					cn1.num = j+posts;
					cn1.elm = ce;
					cn.links.push(cn1);
					ce.setNode(cn1.num, nodeList.length);
					nodeList.push(cn);
				}
				vscount += ivs;
			}
			
			voltageSources = new Array(vscount);
			vscount = 0;
			circuitNonLinear = false;
			
			// determine if circuit is nonlinear
			for( i=0; i != elmList.length; ++i ) {
				var ce:CircuitElm = getElm(i);
				if(ce.nonLinear())
					circuitNonLinear = true;
				var ivs:int = ce.getVoltageSourceCount();
				for(j=0; j != ivs; ++j) {
					voltageSources[vscount] = ce;
					ce.setVoltageSource(j, vscount++);
				}
			}
			
			voltageSourceCount = vscount;
			
			var matrixSize:int = nodeList.length-1 + vscount;
			circuitMatrix = new Array(matrixSize);
			/*circuitMatrix = */ArrayUtils.initializeTwoDArray(circuitMatrix, matrixSize, matrixSize);
			origMatrix = new Array(matrixSize);
			/*origMatrix = */ArrayUtils.initializeTwoDArray(origMatrix, matrixSize, matrixSize);
			
			circuitRightSide = new Array(matrixSize);
			/*circuitRightSide = */ArrayUtils.initializeOneDArray(circuitRightSide, matrixSize);
			origRightSide = new Array(matrixSize);
			/*origRightSide = */ArrayUtils.initializeOneDArray(origRightSide, matrixSize);
			circuitMatrixSize = circuitMatrixFullSize = matrixSize;
			
			circuitRowInfo = new Array(matrixSize);
			circuitPermute = new Array(matrixSize);
			/*circuitRowInfo = */ArrayUtils.initializeOneDArray(circuitRowInfo, matrixSize);
			/*circuitPermute = */ArrayUtils.initializeOneDArray(circuitPermute, matrixSize);
			
			for( i=0; i!=matrixSize; ++i) {
				circuitRowInfo[i] = new RowInfo();
			}
			
			circuitNeedsMap = false;
			
			// stamp linear circuit elements
			for(i=0; i != elmList.length; ++i) {
				var ce:CircuitElm = getElm(i);
				ce.stamp();
			}
			
			var closure:Array = new Array(nodeList.length);
			var changed:Boolean = true;
			
			closure[0] = true;
			
			while(changed) {
				changed = false;
				for( i=0; i != elmList.length; ++i ) {
					var ce:CircuitElm = getElm(i);
					
					// Loop through all ce's nodes to see if theya are connected to otehr nodes not in closure
					for(j=0; j<ce.getPostCount(); ++j) {
						if(!closure[ce.getNode(j)]) {
							if(ce.hasGroundConnection(j))
								closure[ce.getNode(j)] = changed = true;
							continue;
						}
						
						var k:int;
						for(k=0; k!= ce.getPostCount(); ++k) {
							if(j==k)
								continue;
							var kn:int = ce.getNode(k);
							if(ce.getConnection(j, k) &&!closure[kn]) {
								closure[kn] = true;
								changed = true;
							}
						}
					}
				}
				
				if(changed)
					continue;
				
				// connect unconnected nodes
				for(i=0; i!=nodeList.length; ++i) {
					if(!closure[i] && !getCircuitNode(i).intern) {
						trace("node " + i + " unconnected");
						stampResistor(0, i, 1e8);
						closure[i] = true;
						changed = true;
						break;
					}
				}
			}
			
			for(i=0; i!=elmList.length; ++i) {
				var ce:CircuitElm = getElm(i);
				
				if( ce is InductorElm ) {
					var fpi:FindPathInfo = new FindPathInfo(FindPathInfo.INDUCT, ce, ce.getNode(1), elmList, nodeList.length);
					
					// try findPath with maximum depth of 5, to avoid slowdown
					if( !fpi.findPath(ce.getNode(0), 5) && !fpi.findPath(ce.getNode(0)) ) {
						trace(ce.toString() + " no path");
						ce.reset();
					}
				}
				
				// look for current sources with no current path
				if(ce is CurrentElm) {
					var fpi:FindPathInfo = new FindPathInfo(FindPathInfo.INDUCT, ce, ce.getNode(1), elmList, nodeList.length);
					
					if(!fpi.findPath(ce.getNode(0))) {
						stop("No path for current source!", ce);
						return;
					}
				}
				
				// Look for voltage soure loops:
				if( (ce is VoltageElm && ce.getPostCount() == 2) || ce is WireElm ) {
					var fpi:FindPathInfo = new FindPathInfo(FindPathInfo.VOLTAGE, ce, ce.getNode(1), elmList, nodeList.length);
					
					if( fpi.findPath(ce.getNode(0))) {
						stop("Voltage source/wire loop with no resistance!", ce);
						return;
					}
				}
				
				// Look for shorted caps or caps with voltage but no resistance
				if( ce is CapacitorElm ) {
					var fpi:FindPathInfo = new FindPathInfo( FindPathInfo.SHORT, ce, ce.getNode(1), elmList, nodeList.length );
					
					if( fpi.findPath(ce.getNode(0)) ) {
						trace( ce.toString() + " shorted");
						ce.reset();
					} else {
						
						fpi = new FindPathInfo( FindPathInfo.CAP_V, ce, ce.getNode(1), elmList, nodeList.length );
						if( fpi.findPath(ce.getNode(0)) ) {
							stop("Capacitor loop with no resistance!", ce);
							return;
						}
					
					}
				}
			
			}
			
			for( i=0; i != matrixSize; ++i) {
				var qm:int = -1;
				var qp:int = -1;
				var qv:Number = 0;
				var re:RowInfo = circuitRowInfo[i];
				
				if(re.lsChanges || re.dropRow || re.rsChanges)
					continue;
				
				var rsadd:Number = 0;
				
				// look for rows that can be removed
				for( j=0; j != matrixSize; ++j) {
					var q:Number = circuitMatrix[i][j];
					if(circuitRowInfo[j].type == RowInfo.ROW_CONST) {
						// Keep a running total of const values that have been removed already
						rsadd -= circuitRowInfo[j].value * q;
						continue;
					}
					if(q==0)
						continue;
					if(qp == -1) {
						qp = j;
						qv = q;
						continue;
					}
					if(qm == -1 && q == -qv) {
						qm = j;
						continue;
					}
					break;
				}
				
				//trace("line " + i + " " + qp + " " + qm + " " + j);
				/*if (qp != -1 && circuitRowInfo[qp].lsChanges) {
				trace("lschanges");
				continue;
				}
				if (qm != -1 && circuitRowInfo[qm].lsChanges) {
				trace("lschanges");
				continue;
				}*/
				
				if( j==matrixSize) {
					if(qp == -1) {
						stop("Matrix error", null);
						return;
					}
					
					var elt:RowInfo = circuitRowInfo[qp];
					if(qm == -1) {
						// We found a row with only one nonzero entry, that value is constant
						var k:int;
						for(k=0; elt.type == RowInfo.ROW_EQUAL && k < 100; ++k) {
							// Follow the chain
							qp = elt.nodeEq;
							elt = circuitRowInfo[qp];
						}
						if (elt.type == RowInfo.ROW_EQUAL) {
							// break equal chains
							//System.out.println("Break equal chain");
							elt.type = RowInfo.ROW_NORMAL;
							continue;
						}
						if (elt.type != RowInfo.ROW_NORMAL) {
							trace("type already " + elt.type + " for " + qp + "!");
							continue;
						}
						
						elt.type = RowInfo.ROW_CONST;
						elt.value = (circuitRightSide[i] + rsadd) / qv;
						circuitRowInfo[i].dropRow = true;
						//trace(qp + " * " + qv + " = const " + elt.value);
						i = -1; // start over from scratch
					} else if (circuitRightSide[i] + rsadd == 0) {
						// we found a row with only two nonzero entries, and one
						// is the negative of the other; the values are equal
						if (elt.type != RowInfo.ROW_NORMAL) {
							//trace("swapping");
							var qq:int = qm;
							qm = qp;
							qp = qq;
							elt = circuitRowInfo[qp];
							if (elt.type != RowInfo.ROW_NORMAL) {
								// we should follow the chain here, but this hardly ever happens so it's not worth worrying about
								trace("swap failed");
								continue;
							}
						}
						elt.type = RowInfo.ROW_EQUAL;
						elt.nodeEq = qm;
						circuitRowInfo[i].dropRow = true;
						//trace(qp + " = " + qm);
					} // end elseif
					
				} // end if(j==matrixSize)
				
			} // end for(matrixSize)
			
			// find size of new matrix:
			var nn:int = 0;
			for(i=0; i!= matrixSize; ++i) {
				var elt:RowInfo = circuitRowInfo[i];
				if (elt.type == RowInfo.ROW_NORMAL) {
					elt.mapCol = nn++;
					//System.out.println("col " + i + " maps to " + elt.mapCol);
					continue;
				}
				if (elt.type == RowInfo.ROW_EQUAL) {
					var e2:RowInfo = null;
					// resolve chains of equality; 100 max steps to avoid loops
					for (j = 0; j != 100; j++) {
						e2 = circuitRowInfo[elt.nodeEq];
						if (e2.type != RowInfo.ROW_EQUAL)
							break;
						if (i == e2.nodeEq)
							break;
						elt.nodeEq = e2.nodeEq;
					}
				}
				if (elt.type == RowInfo.ROW_CONST)
					elt.mapCol = -1;
			} // END for
			
			for (i = 0; i != matrixSize; i++) {
				var elt:RowInfo = circuitRowInfo[i];
				if (elt.type == RowInfo.ROW_EQUAL) {
					var e2:RowInfo = circuitRowInfo[elt.nodeEq];
					if (e2.type == RowInfo.ROW_CONST) {
						// if something is equal to a const, it's a const
						elt.type = e2.type;
						elt.value = e2.value;
						elt.mapCol = -1;
						//System.out.println(i + " = [late]const " + elt.value);
					} else {
						elt.mapCol = e2.mapCol;
						//System.out.println(i + " maps to: " + e2.mapCol);
					}
				}
			}
			
			// make the new, simplified matrix
			var newsize:int = nn;
			var newmatx:Array = new Array(newsize);
			/*newmatx = */ArrayUtils.initializeTwoDArray(newmatx, newsize, newsize);
			
			var newrs:Array = new Array(newsize);
			/*var newrs:Array = */ArrayUtils.initializeOneDArray(newrs, newsize);
			var ii:int = 0;
			for (i = 0; i != matrixSize; i++) {
				var rri:RowInfo = circuitRowInfo[i];
				if (rri.dropRow) {
					rri.mapRow = -1;
					continue;
				}
				newrs[ii] = circuitRightSide[i];
				rri.mapRow = ii;
				//System.out.println("Row " + i + " maps to " + ii);
				for (j = 0; j != matrixSize; j++) {
					var ri:RowInfo = circuitRowInfo[j];
					if (ri.type == RowInfo.ROW_CONST)
						newrs[ii] -= ri.value * circuitMatrix[i][j];
					else
						newmatx[ii][ri.mapCol] += circuitMatrix[i][j];
				}
				ii++;
			}
			
			circuitMatrix = newmatx;
			circuitRightSide = newrs;
			matrixSize = circuitMatrixSize = newsize;
			for (i = 0; i != matrixSize; i++)
				origRightSide[i] = circuitRightSide[i];
			for (i = 0; i != matrixSize; i++)
				for (j = 0; j != matrixSize; j++)
					origMatrix[i][j] = circuitMatrix[i][j];
			circuitNeedsMap = true;
			
			/* // For debugging
			trace("matrixSize = " + matrixSize + " " + circuitNonLinear);
			for (j = 0; j != circuitMatrixSize; j++) {
				for (i = 0; i != circuitMatrixSize; i++)
					trace(circuitMatrix[j][i] + " ");
				trace("  " + circuitRightSide[j] + "\n");
			}
			trace("\n");
			*/
			
			// if a matrix is linear, we can do the lu_factor here instead of
			// needing to do it every frame
			if (!circuitNonLinear) {
				if (!lu_factor(circuitMatrix, circuitMatrixSize, circuitPermute)) {
					stop("Singular matrix!", null);
					return;
				}
			}
			
		}
		
		private function calcCircuitBottom() : void {
			var i:int;
			circuitBottom = 0;
			for (i = 0; i != elmList.length; i++) {
				var rect:Rectangle = getElm(i).boundingBox;
				var bottom:int = rect.height + rect.y;
				if (bottom > circuitBottom)
					circuitBottom = bottom;
			}
		}
		
		/* ported */
		public function locateElm( elm:CircuitElm ) : int {
			var i:int;
			for (i = 0; i != elmList.length; i++)
				if (elm == elmList[i])
					return i;
			return -1;
		}
		
		/** control voltage source vs with voltage from n1 to n2 (must
		 also call stampVoltageSource()) */
		public function stampVCVS(n1:int, n2:int, coef:Number, vs:int ) : void {
			var vn:int = nodeList.length + vs;
			stampMatrix(vn, n1, coef);
			stampMatrix(vn, n2, -coef);
		}
		
		/** stamp independent voltage source #vs, from n1 to n2, amount v */
		public function stampVoltageSource(n1:int, n2:int, vs:int, v:Number=NaN) : void {
			var vn:int = nodeList.length + vs;
			stampMatrix(vn, n1, -1);
			stampMatrix(vn, n2, 1);
			stampRightSide(vn, v);
			stampMatrix(n1, vn, 1);
			stampMatrix(n2, vn, -1);
		}
		
		public function updateVoltageSource(n1:int, n2:int, vs:int, v:Number ) : void {
			var vn:int = nodeList.length + vs;
			stampRightSide(vn, v);
		}
		
		public function stampResistor(n1:int, n2:int, r:Number) : void {
			var r0:Number = 1 / r;
			if (isNaN(r0) || isInfinite(r0)) {
				trace("bad resistance " + r + " " + r0 + "\n");
				var tempError:Error = new Error();
				var stackTrace:String = tempError.getStackTrace();
				trace("bad resistance " + tempError.getStackTrace());
				var a:int = 0;
				a /= a;
			}
			trace("Stamp resistor: " + n1 + " " + n2 + " " + r + " " ); 
			stampMatrix(n1, n1, r0);
			stampMatrix(n2, n2, r0);
			stampMatrix(n1, n2, -r0);
			stampMatrix(n2, n1, -r0);
		}
		
		public function stampConductance(n1:int, n2:int, r0:Number) : void {
			stampMatrix(n1, n1, r0);
			stampMatrix(n2, n2, r0);
			stampMatrix(n1, n2, -r0);
			stampMatrix(n2, n1, -r0);
		}
		
		/** current from cn1 to cn2 is equal to voltage from vn1 to 2, divided by g */
		public function stampVCCurrentSource(cn1:int, cn2:int, vn1:int, vn2:int, g:int) : void {
			stampMatrix(cn1, vn1, g);
			stampMatrix(cn2, vn2, g);
			stampMatrix(cn1, vn2, -g);
			stampMatrix(cn2, vn1, -g);
		}
		
		public function stampCurrentSource(n1:int, n2:int, i:Number) : void {
			stampRightSide(n1, -i);
			stampRightSide(n2, i);
		}
		
		/** stamp a current source from n1 to n2 depending on current through vs */
		public function stampCCCS(n1:int, n2:int, vs:int, gain:Number ) : void {
			var vn:int = nodeList.length + vs;
			stampMatrix(n1, vn, gain);
			stampMatrix(n2, vn, -gain);
		}
		
		/** stamp value x in row i, column j, meaning that a voltage change
		 of dv in node j will increase the current into node i by x dv.
		 (Unless i or j is a voltage source node.)
		 */
		public function stampMatrix( i:int, j:int, x:Number) : void {
			if (i > 0 && j > 0) {
				if (circuitNeedsMap) {
					i = circuitRowInfo[i - 1].mapRow;
					var ri:RowInfo = circuitRowInfo[j - 1];
					if (ri.type == RowInfo.ROW_CONST) {
						trace("Stamping constant " + i + " " + j + " " + x);
						circuitRightSide[i] -= x * ri.value;
						return;
					}
					j = ri.mapCol;
					//trace("stamping " + i + " " + j + " " + x);
				} else {
					i--;
					j--;
				}
				circuitMatrix[i][j] += x;
			}
		}
		
		/** stamp value x on the right side of row i, representing an
		 independent current source flowing into node i 
		 */
		public function stampRightSide(i:int, x:Number=NaN) : void {
			if(isNaN(x)) {
				trace("rschanges true " + (i-1));
				if (i > 0)
					circuitRowInfo[i - 1].rsChanges = true;
			}else {
				if (i > 0) {
					if (circuitNeedsMap) {
						i = circuitRowInfo[i - 1].mapRow;
						trace("stamping rs " + i + " " + x);
					} else
						i--;
					circuitRightSide[i] += x;
				}
			}
		}
		
		/** Indicate that the values on the left side of row i change in doStep() */
		public function stampNonLinear( i:int ) : void {
			if (i > 0)
				circuitRowInfo[i - 1].lsChanges = true;
		}
		
		/** Todo: Check if working */
		public function getCodeBase() : String {
			return "";
		}
		
		
		public var converged:Boolean;
		private var subIterations:int;
		
		private function runCircuit() : void {
			
			if(circuitMatrix == null || elmList.length == 0 ) {
				circuitMatrix = null;
				return;
			}
			
			var iter:int;
			var debugPrint:Boolean = dumpMatrix;
			
			dumpMatrix = false;
			
			var steprate:Number = 160*getIterCount();
			
			var tm:Number = TimerUtilities.currentTimeMillis();
			var lit:Number = lastIterTime;
			
			if( 1000 >= steprate * (tm - lastIterTime) )
				return;
			
			// Main iteration
			for(iter=1; ; ++iter) {
				
				var i:int;
				var j:int;
				var k:int;
				var subiter:int;
				
				// Start Iteration for each element in the circuit
				for( i=0; i<elmList.length; ++i ) {
					var ce:CircuitElm = getElm(i);
					ce.startIteration();
				}
				
				// Keep track of the number of steps
				++steps;
				
				// The number of maximum allowable iterations
				var subiterCount:int = 5000;
				
				// Sub iteration
				for(subiter=0; subiter<subiterCount; subiter++) {
					converged = true;
					
					subIterations = subiter;
					
					for( i=0; i<circuitMatrixSize; ++i )
						circuitRightSide[i] = origRightSide[i];
					if(circuitNonLinear) {
						for(i=0; i<circuitMatrixSize; ++i)
							for(j=0; j<circuitMatrixSize; ++j)
								circuitMatrix[i][j] = origMatrix[i][j];
					}
					
					// Step each element this iteration
					for(i=0; i<elmList.length; ++i) {
						var ce:CircuitElm = getElm(i);
						ce.doStep();
					}
					
					if(stopMessage != null)
						return;
					
					var printit:Boolean = debugPrint;
					debugPrint = false;
					for(j=0; j<circuitMatrixSize; ++j) {
						for(i=0; i<circuitMatrixSize; ++i ) {
							var x:Number = circuitMatrix[i][j];
//							if(isNaN(x) || isInfinite(x) ) {
//								trace("Matrix is invalid (NaN)");
//								stop("NaN matrix", null);
//								return;
//							}
						}
					}
					
//					if(printit) {
//						for(j=0; i<circuitMatrixSize; j++) {
//							for( i=0; i<circuitMatrixSize; ++i) 
//								trace(circuitMatrix[j][i] + ",");
//							trace(" " + circuitRightSide[j] + "\n");
//						}
//						trace("\n");
//					}
//					
					if(circuitNonLinear) {
						if( converged && subiter>0 )
							break;
						
						if( !lu_factor(circuitMatrix, circuitMatrixSize, circuitPermute) ) {
							stop("Singular matrix!", null);
							return;
						}
						
					}
					
					lu_solve(circuitMatrix, circuitMatrixSize, circuitPermute, circuitRightSide);
					
					for( j=0; j<circuitMatrixFullSize; ++j ) {
						var ri:RowInfo = circuitRowInfo[j];
						var res:Number = 0;
						
						if(ri.type == RowInfo.ROW_CONST) 
							res = ri.value;
						else
							res = circuitRightSide[ri.mapCol];
						
						if( isNaN(res) ) {
							converged = false;
							break;
						}
						
						if(j < (nodeList.length - 1)) {
							
							var cn:CircuitNode = getCircuitNode(j+1);
							for(k=0; k<cn.links.length; ++k) {
								var cn1:CircuitNodeLink = cn.links[k] as CircuitNodeLink;
								
								cn1.elm.setNodeVoltage(cn1.num, res);
							}
						} else {
							var ji:int = j - (nodeList.length-1);
							//trace("setting vsrc " + ji + " to " + res);
							voltageSources[ji].setCurrent(ji, res);
						}
							
					}
					
					if(!circuitNonLinear)
						break;

				}	// End for
				
				if(subiter > 5)
					trace("converged after " + subiter + " iterations\n");
				if(subiter == subiterCount) {
					stop("Convergence failed", null);
					break;
				}
				
				t += timeStep;
//				for(i=0; i<scopeCount; ++i) 
//					scopes[i].timeStep();
				
				tm = utility.TimerUtilities.currentTimeMillis();
				lit = tm;
				
				trace("diff: " + (tm-lastIterTime) + " iter: " + iter + " ");
				if(iter*1000 >= steprate * (tm - lastIterTime) ) {
					trace("1 breaking from iteration: " + " sr: " + steprate + " iter: " + iter + " time: " + tm + " lastIterTime: " + lastIterTime + " lastFrametime: " + lastFrameTime );
					break;
				} else if (tm - lastFrameTime > 500) {
					trace("2 breaking from iteration: " + " sr: " + steprate + " iter: " + iter + " time: " + tm + " lastIterTime: " + lastIterTime + " lastFrametime: " + lastFrameTime );
					break;
				}				
			}
				
			lastIterTime = lit;
		}
		
		/** Input array a is a two dimensional array */
		private function lu_factor( a:Array, n:int, ipvt:Array ) : Boolean {
			var scaleFactors:Array = new Array(n);
			///*var scaleFactors:Array = */ArrayUtils.initializeOneDArray(scaleFactors, n);	// Array of numbers
			trace("N: " + n);
			
			var i:int;
			var j:int;
			var k:int;
			
			// Divide each row by largest element in that row and remember scale factors
			for( i=0; i<n; ++i ) {
				var largest:Number = 0;
				 
				for( j=0; j<n; ++j ) {
					var x:Number = Math.abs(a[i][j]);
					if (x>largest) 
						largest = x;
				}
				// Check for singular matrix:
				if( largest==0 ) 
					return false;
				scaleFactors[i] = 1/largest;
			}
			
			// Crout's method: Loop through columns first
			for(j=0; j<n; ++j) {
				
				// Calculate upper trangular elements for this column:
				for( i=0; i<j; ++i) {
					var q:Number = a[i][j];
					
					for(k=0; k!=i; ++k)
						q -= a[i][k] * a[k][j];
					
					a[i][j] = q;
				}
				
				// Calculate lower triangular elements for this column
				var largest:Number = 0;
				var largestRow:int = -1;
				
				for(i=j; i<n; ++i) {
					var q:Number = a[i][j];
					
					for(k=0; k<j; ++k)
						q -= a[i][k]*a[k][j];
					
					a[i][j] = q;
					var x:Number = Math.abs(q);
					
					if( x>= largest) {
						largest = x;
						largestRow = i;
					}
				}
				
				// Pivot
				if (j != largestRow) {
					var x:Number;
					
					for( var k=0; k<n; ++k ) {
						x = a[largestRow][k];
						a[largestRow][k] = a[j][k];
						a[j][k] = x;
					}
					scaleFactors[largestRow] = scaleFactors[j];
				}
				
				// keep track of row interchanges
				ipvt[j] = largestRow;
				
				// avoid zeros
				if( a[j][j] == 0) {
					//trace("avoided zero");
					a[j][j] = 1e-18;
				}
				
				if (j!=n-1) {
					var mult:Number = 1/ a[j][j];
					for(i=j+1; i != n; ++i)
						a[i][j] *= mult;
				}
			
			}
			
			return true;
		}
		
		/** Solves the factored matrix */
		private function lu_solve( a:Array, n:int, ipvt:Array, b:Array ) : void {
			var i:int;
			
			// find first nonzero b element
			for(i=0; i<n; ++i ) {
				var row:int = ipvt[i];
				
				var swap:Number = b[row];
				b[row] = b[i];
				b[i] = swap;
				if(swap != 0)
					break;
			}
			
			var bi:int = i++;
			for(; i<n; ++i) {
				var row:int = ipvt[i];
				var j:int;
				var tot:Number = b[row];
				
				b[row] = b[i];
				// Forward substitution by using the lower triangular matrix;
				for( j=bi; j<i; ++j ) 
					tot -= a[i][j] * b[j];
				b[i] = tot;
				
			}
			
			for( i=n-1; i>=0; i--) {
				var tot:Number = b[i];
				
				// back-substitution using the upper triangular matrix
				var j:int;
				for( j=i+1; j!=n; ++j ) 
					tot -= a[i][j] * b[j];
				b[i] = tot / a[i][i];	
				
			}
		}
		
		//////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////
		// END: CIRCUIT ANALYSIS CODE
		//////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////
		
		//////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////
		// CIRCUIT FILE IO 
		//////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////
		
		var setupListLoader:URLLoader;
		var defaultCircuitLoader:URLLoader;
		
		public function loadSetupFile() : void {
			setupListLoader = new URLLoader();
			setupListLoader.addEventListener(Event.COMPLETE, onSetupListLoadComplete);
			setupListLoader.load(new URLRequest(getCodeBase() + "setupList.txt"));
		}
		
		/** Loads the file for the specified circuit */
		public function loadDefaultCircuitFile( circuitName:String, title:String ) : void {
			defaultCircuitLoader = new URLLoader();
			defaultCircuitLoader.addEventListener( Event.COMPLETE, onDefaultCircuitLoadComplete );
			defaultCircuitLoader.load( new URLRequest("circuits/"+circuitName) );
		}
		
		private function onSetupListLoadComplete( evt:Event ) : void {
		
			var stack:Array = new Array();
			var stackptr:int = 0;
			/*stack[stackptr++] = menu;*/
			
			try {
				var ba:String = setupListLoader.data as String;
				var b:String = ba; // copy?
				var len:int = ba.length;
				var p:int;
				
				if (len == 0 || b.charAt(0) != '#') {
					// got a redirect, try again
					onSetupListLoadComplete( evt /*menu, */);
					return;
				}
				
				for (p = 0; p < len;) {
					var l:int;
					for (l = 0; l != len - p; l++) {
						if (b.charAt(l + p) == '\n') {
							l++;
							break;
						}
					}
					var line:String = b.substr(p, l-1);//encodeString(b);//new String(b, p, l - 1);
					if (line.charAt(0) == '#') {} // Do nothing on comment
						
					else if (line.charAt(0) == '+') {
						//var n:Menu = new Menu(line.substring(1));
						/*menu.add(n);*/
						/*menu = stack[stackptr++] = n;*/
					} else if (line.charAt(0) == '-') {
						/*menu = stack[--stackptr - 1];*/
					} else {
						var i:int = line.indexOf(' ');
						if (i > 0) {
							
							var title:String = line.substring(i + 1);
							var first:Boolean = false;
							
							if (line.charAt(0) == '>')
								first = true;
							
							var file:String = line.substring(first ? 1 : 0, i);
							
							// Add object to our class mapping
							menuMapping[title] = "setup " + file;
							//menu.add( getMenuItem(title, "setup " + file) );
							
							if (first && startCircuit == null) {
								startCircuit = file;
								startLabel = title;
							}
						}
					}
					p += l;
				}
			} catch ( e:Error ) {
				trace("Error: " + e.message);
				stop("Can't read setuplist.txt! " + e.getStackTrace(), null);
			}
			
			// Now that the setup file is finished loading, load the default circuit as specified.			

			//if (useFrame)
			//setMenuBar(mb);
//			if (startCircuitText != null)
//				readSetup(startCircuitText);
//			else if (stopMessage == null && startCircuit != null)
//				loadDefaultCircuitFile(startCircuit, startLabel);
			
			initCircuit();
		}
		
		private function onDefaultCircuitLoadComplete(evt:Event) : void {
			readDefaultCircuit(defaultCircuitLoader.data as String, defaultCircuitLoader.data.length, true);
		}
		
		private function readSetup(text:String, retain:Boolean = false) : void {
			readDefaultCircuit(text, text.length, retain);
			//titleLabel.setText("untitled");
		}
		
		private function readSetupArray( stream:FileStreamWithLineReader ) : void {
			var bytes:ByteArray;
			stream.readBytes(bytes);
			
			var byteLength:uint = stream.bytesAvailable;
		}
		
		/*
		function readSetupFile( str:String, title:String) : void {
		try {
		var url:URLRequest = new URLRequest(getCodeBase() + "circuits/" + str);
		var ba:ByteArray = readUrlData(url);
		readSetupByteArray(ba, ba.length, false);
		} catch ( e:Error ) {
		trace("Could not read setup file! \n" + e.getStackTrace());
		stop("Unable to read " + str + "!", null);
		}
		//titleLabel.setText(title);
		}
		*/
		
		/*
		function readUrlData(url:URLRequest) : ByteArray {
		
			var loader:URLLoader = new URLLoader(url);
			loader.addEventListener(Event.COMPLETE, loadComplete);
			
			var o:Object = url.data;
			var fis:FileStream = o as FileStream;
			
			var blen:int = 1024;
			var ba:ByteArray = new ByteArray();
			
			var b:ByteArray = new ByteArray();
			
			while (true) {
			
				fis.readBytes(b, 0, b.length);
				var len:int = b.length;
				if (len <= 0)
					break;
			
				ba.writeBytes(b, 0, len);
			}
		
			return ba;
		}
		*/
		
		//////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////
		// LOCAL UTILITY FUNCTIONS
		//////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////
		
		private function isInfinite(num:Number) : Boolean {
			return ( num > 1e18 );
		}
		
		/** Converts a ByteArray into its corresponding String */
		private function encodeString(ba:ByteArray) : String {
			var origPos:uint = ba.position;
			var result:Array = new Array();
			
			for (ba.position = 0; ba.position < ba.length - 1; )
				result.push(ba.readShort());
			
			if (ba.position != ba.length)
				result.push(ba.readByte() << 8);
			
			ba.position = origPos;
			return String.fromCharCode.apply(null, result);
		}
		
		/** Computes the Euclidean distance between two points */
		public function distanceSq(x1:int, y1:int, x2:int, y2:int) : Number {
			x2 -= x1;
			y2 -= y1;
			return x2 * x2 + y2 * y2;
		}
		
		
		/** Converts a String into its corresponding ByteArray */
		private function decodeString(str:String):ByteArray {
			var result:ByteArray = new ByteArray();
			for (var i:int = 0; i < str.length; ++i) {
				result.writeShort(str.charCodeAt(i));
			}
			result.position = 0;
			return result;
		}
		
		private function readHint(st:StringTokenizer) : void {
			hintType = int(st.nextToken());
			hintItem1 = int(st.nextToken());
			hintItem2 = int(st.nextToken());
		}
		
		private function readOptions( st:StringTokenizer ) : void {
			
			var flags:int = int(st.nextToken());
			
			dotsCheckItem = ((flags & 1) != 0);
			smallGridCheckItem = ((flags & 2) != 0);
			voltsCheckItem = ((flags & 4) == 0);
			powerCheckItem = ((flags & 8) == 8);
			showValuesCheckItem = ((flags & 16) == 0);
			timeStep = Number(st.nextToken());
			
			var sp:Number = Number(st.nextToken());
			var sp2:int = int(Math.log(10 * sp) * 24 + 61.5);
			
			//int sp2 = (int) (Math.log(sp)*24+1.5);
			speedBar = sp2;
			currentBar = int(st.nextToken());
			
			var vrange:Number = Number(st.nextToken());
			CircuitElm.voltageRange = vrange; 
			
			//			try {
			powerBar = int(st.nextToken());
			//			} catch (e:Error) {
			//			}
			
			setGrid();
		}
		
	} // END CLASS
		
	
	
} // END PACKAGE

