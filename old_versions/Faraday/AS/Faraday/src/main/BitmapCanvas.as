package main
{
	
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.geom.Matrix;
	import flash.geom.Point;
	import flash.text.TextField;
	
	import spark.components.Label;
	import spark.components.TextArea;
	
	import utility.Color;

	public class BitmapCanvas extends Sprite {
		
		private var bmd:BitmapData;
		private var bm:Bitmap;
		
		//private var width:int;
		//private var height:int;
		
		private var frameTimeText:TextField = new TextField();
		private var elementInfoText:TextField = new TextField();
		private var simulationInfoText:TextField = new TextField();
		private var errorText:TextField = new TextField();
		
		public var fgColor:uint;
		
		
		public function BitmapCanvas(width:int, height:int) {
			super();

			bmd = new BitmapData( width, height, false, Settings.BG_COLOR);
			bm 	= new Bitmap(bmd);
			
			fgColor = Settings.FG_COLOR;
			
			bm.visible = true;
			addChild(bm);
			
			initLabels();
			
		}
		
		private function initLabels() : void {
			frameTimeText.visible = true;
			frameTimeText.width = 150;
			frameTimeText.height = 50;
			frameTimeText.textColor = Settings.TEXT_COLOR;
			frameTimeText.selectable = false;
			
			elementInfoText.visible = true;
			elementInfoText.width = 150;
			elementInfoText.height = 150;
			elementInfoText.textColor = Settings.TEXT_COLOR;
			elementInfoText.selectable = false;
			
			simulationInfoText.visible = true;
			simulationInfoText.width = 150;
			simulationInfoText.height = 100;
			simulationInfoText.textColor = Settings.TEXT_COLOR;
			simulationInfoText.selectable = false;
			
			errorText.visible = true;
			errorText.width = 150;
			errorText.height = 50;
			errorText.textColor = Settings.TEXT_ERROR;
			errorText.selectable = false;
			errorText.text = "ErrorText";
			//bmd.draw(errorText);
			//addChild(errorText);
		}
		
		public function setColor(Color:uint) {
			fgColor = Color;
		}
		
		public function getColor(Color:uint) {
			fgColor = Color;
		}
		
		public function drawString(s:String, xPos:int, yPos:int) {
//			var newText:TextField = new TextField();
//			newText.text = s;
//			
//			var transform:Matrix = new Matrix();
//			transform.translate(xPos, yPos);
//			newText.textColor = fgColor;
//			
//			bmd.draw(newText, transform);
		}
		
		public function setSimulationInfoText(text:*, xPos:int=700, yPos:int=20) : void {
//			elementInfoText.x = xPos;
//			elementInfoText.y = yPos;
			
			if(text is String) {
				elementInfoText.text = text;
			} else if (text is Array) {
				elementInfoText.text = "";
				for(var i:int=0; i<text.length; ++i) 
					elementInfoText.appendText(text[i] + "\n");
			}
			
			var transform:Matrix = new Matrix();
			transform.translate(xPos, yPos);
			bmd.draw(elementInfoText, transform);
			
		}
		
		public function setInfoText(text:*, xPos:int, yPos:int) : void {
			elementInfoText.x = xPos;
			elementInfoText.y = yPos;
			
			if(text is String) {
				elementInfoText.text = text;
			} else if (text is Array) {
				elementInfoText.text = "";
				for(var i:int=0; i<(text as Array).length; ++i) { 
					if((text[i] as String) != "undefined");
					elementInfoText.text += text[i] + "\n";
				}
				
			}
			
			var transform:Matrix = new Matrix();
			transform.translate(xPos, yPos);
			
			bmd.draw(elementInfoText, transform);
			
		}
		
		public function setFrameTimeText(text:String, xPos:int=400, yPos:int=400) : void {
			frameTimeText.x = xPos;
			frameTimeText.y = yPos;
			frameTimeText.text = text;
			frameTimeText.visible = true;
			
			bmd.draw(frameTimeText);
		}
		
		public function setErrorText(text:String, xPos:int=400, yPos:int = 750) {
			errorText.x = xPos;
			errorText.y = yPos;
			errorText.text = text;
			errorText.visible = true;
			
			bmd.draw(errorText);
		}
		
		public function clear() : void {
			//this.graphics.clear();
			bmd.fillRect( new flash.geom.Rectangle(0, 0, bm.width, bm.height), Settings.BG_COLOR );
		}
		
		public function getBitmapData() : BitmapData {
			return bmd;
		}
		
		public function getBitmap() : Bitmap {
			return bm;
		}
		
		private var lastPosFlag:Point = new Point(0, 0);
		
		public function bitmapRect(x1:Number, y1:Number, width:Number, height:Number, color:uint) : void {
			for( var i:uint=x1; i<x1+width; ++i ) {
				bmd.setPixel32(i, y1, color);
				bmd.setPixel32(i, y1+height, color);
			}
			
			for( var j:uint=y1; j<y1+height; ++j ) {
				bmd.setPixel32(x1, j, color);
				bmd.setPixel32(x1+width, j, color);
			}
			
		}
		
		public function bitmapFillRect(x1:Number, y1:Number, width:Number, height:Number, color:uint) : void {
			for( var i:uint=x1; i<x1+width; ++i ) {
				for( var j:uint=y1; j<y1+height; ++j ) {
					bmd.setPixel32(i, j, color);
				}
			}
			
		}
		
		public function bitmapLineTo(xDest:Number, yDest:Number, c:uint) : void {
			
			var e:Point = new Point(xDest, yDest);
			var s:Point = lastPosFlag.clone();
			
			lastPosFlag = e.clone();
			var steep:Boolean = Math.abs(e.y - s.y) > Math.abs(e.x - s.x);
			if(steep){
				s.x ^= s.y
				s.y ^= s.x
				s.x ^= s.y
				e.x ^= e.y
				e.y ^= e.x
				e.x ^= e.y
			}
			if(s.x > e.x){
				s.x ^= e.x
				e.x ^= s.x
				s.x ^= e.x
				s.y ^= e.y
				e.y ^= s.y
				s.y ^= e.y
			}
			var deltaX:int = e.x - s.x;
			var deltaY:int = Math.abs(e.y - s.y);
			var error:int = 0;
			var ystep:int = s.y < e.y ? 1 : -1;
			var y:int = s.y;
			for(var x:int = s.x; x < e.x; x++){
				if(steep){
					bmd.setPixel32(y, x, c);
				} else {
					bmd.setPixel32(x, y, c);
				}
				error += deltaY;
				if( (error << 1) >= deltaX){
					y += ystep;
					error -= deltaX;
				}
			}
		}
		
		public function bitmapMoveTo(xDest:Number, yDest:Number):void {
			var p:Point = new Point(xDest, yDest);
			lastPosFlag = p.clone();
		}
		
		///////////////////////////////////////
		// Vector rendering:
		///////////////////////////////////////
		
		public function renderPost(x0:int, y0:int) : void {
			
			var circ:Sprite = new Sprite();
			
			circ.graphics.beginFill( Settings.POST_COLOR );
			circ.graphics.lineStyle(3, Settings.POST_COLOR_SELECTED);
			circ.graphics.drawCircle(x0, y0, 3);
			
			bmd.draw(circ);
			
		}
		
		public function drawThickCircle(cx:int, cy:int, ri:int, color:uint) : void {
			var r:Number = ri * .98;
			
			var circ:Sprite = new Sprite();
			
			circ.graphics.lineStyle(3, color);
			circ.graphics.drawCircle(cx, cy, r);
			
			bmd.draw(circ);
			
		}
		
		public function fillThickCircle(cx:int, cy:int, ri:int, outlinecolor:uint, fillcolor:uint) : void {
			var r:Number = ri * .98;
			
			var circ:Sprite = new Sprite();
			
			circ.graphics.lineStyle(3, outlinecolor);
			circ.graphics.beginFill(fillcolor);
			
			bmd.draw(circ);
			
		}
		
	}
}