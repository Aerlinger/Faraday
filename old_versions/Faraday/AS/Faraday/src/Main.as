package 
{
	import elements.CircuitElm;
	
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.Graphics;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.events.TimerEvent;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.text.TextField;
	import flash.utils.Timer;
	
	import main.BitmapCanvas;
	import main.CirSim;
	
	import spark.primitives.Rect;
	
	import utility.Color;
	import utility.ColorConstants;
	import utility.Dimension;
	
	
	
	/** Application entry point */
	[SWF(width=1280, height=740, frameRate="30", widthPercent="50", pageTitle="Circuit Simulator")] // Initialize the background color of the SWF to a dark grey.
	public class Main extends MovieClip {
		
		// Core computational engine
		public static var CircuitSimulator:CirSim;
		
		// Hybrid bitmap-vector canvas for background
		public static var MainCanvas:BitmapCanvas = new BitmapCanvas(1280, 740);
		
		
		/** Begin by adding our canvas background and setting up listener events. Circuit is update on the ENTER_FRAME event. */
		public function Main() {
			
			// Add our background bitmap to the scene
			addChild(MainCanvas);
			
			CircuitSimulator = new CirSim();
			CircuitSimulator.root = this;
			CircuitSimulator.init();
			
			this.parent.addEventListener( MouseEvent.MOUSE_MOVE, CircuitSimulator.onMouseMove );
			this.parent.addEventListener( MouseEvent.MOUSE_DOWN, CircuitSimulator.onMousePressed );
			this.parent.addEventListener( MouseEvent.MOUSE_UP, CircuitSimulator.onMouseReleased );
			this.parent.addEventListener( MouseEvent.CLICK, CircuitSimulator.onMouseClicked );
			
		}
		
		public function start() : void {
			this.addEventListener(Event.ENTER_FRAME, iterate);
		}
		
		/** Returns the static reference to the main canvas */
		public static function getMainCanvas() : BitmapCanvas {
			return MainCanvas;
		}
		
		/** Updates the circuit. Called every frame. */
		private function iterate(evt:Event) : void {
			CircuitSimulator.updateCircuit();
		}
		
		/** Forces an update and redraws the canvas */
		public function repaint() : void {
			trace("repainting");
			CircuitSimulator.updateCircuit();
		}
		
		
	}
}