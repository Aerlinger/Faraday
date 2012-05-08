package utility
{
	
	import flash.display.Sprite;
	import flash.geom.Matrix;
	import flash.geom.Point;
	
	/**
	 * Polygon
	 */
	public class Polygon extends Sprite 
	{

		public static var LINE_COLOUR : uint = 0x000000;
		public static var FILL_COLOUR : uint = 0xFFFFFF;
		private var _vertices : Vector.<Point> = new Vector.<Point>();
		

		public function Polygon(...verts)
		{
			if(verts.length * 0.5 is int)
			{
				for (var i : int = 0;i < verts.length;i += 2) addVertex(verts[i], verts[i + 1]);
				draw();
			}
			else
			{
				trace("Invalid vertex list");
			}
		}
		
		public function numPoints() : int {
			return _vertices.length;
		}
		
		public function draw() : void
		{
			if(_vertices.length == 0) return;
			
//			var n1 : int = Random.integer(_vertices.length - 1);
//			var n2 : int = (n1 + 1) % (_vertices.length - 1);
//			
//			var dx : Number = _vertices[n2].x - _vertices[n1].x;
//			var dy : Number = _vertices[n2].y - _vertices[n1].y;
//			
//			var ang : Number = Math.atan2(dy, dx);
//			var scl : Number = Random.float(0.15, 0.25);
//			var mat : Matrix = new Matrix();
//			mat.scale(scl, scl);
//			mat.rotate(ang);
			
			graphics.clear();
			graphics.lineStyle(0, LINE_COLOUR);
			graphics.beginFill(FILL_COLOUR);
			
			var v : Point = _vertices[0];
			
			graphics.moveTo(v.x, v.y);
			
			for (var i : int = 0;i < _vertices.length;i++)
			{
				v = _vertices[i];
				graphics.lineTo(v.x, v.y);
			}
			
			v = _vertices[0];
			graphics.lineTo(v.x, v.y);
		}
		
		public function addVertex(__x : Number, __y : Number) : void
		{
			_vertices.push(new Point(__x, __y));
			draw();
		}
		
		public function averageSideLength() : Number
		{
			var l : Number = 0.0;
			var v1 : Point, v2 : Point;
			var dx : Number, dy : Number;
			var i : int, n : int = _vertices.length - 1;
			
			for (i = 0;i < n;++i) 
			{
				v1 = _vertices[i];
				v2 = _vertices[int(i + 1)];
				
				dx = v2.x - v1.x;
				dy = v2.y - v1.y;
				
				l += dx * dx + dy * dy;
			}
			
			return Math.sqrt(l) / n;
		}
		
		public function getX(n:int) {
			_vertices[n].x;
		}
		
		public function getY(n:int) {
			_vertices[n].y;
		}
		
	}
	/*
	internal class Point
	{
		public var x : Number;
		public var y : Number;
		
		public function Point(__x : Number = 0.0, __y : Number = 0.0) 
		{
			x = __x;
			y = __y;
		}
	}*/
}