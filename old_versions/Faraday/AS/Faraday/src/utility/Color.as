package utility
{
	//import mx.graphics.shaderClasses.ExclusionShader;

	public final class Color
	{
		public static const R_MASK:uint = 0xFF0000;
		public static const G_MASK:uint = 0x00FF00;
		public static const B_MASK:uint = 0x0000FF;
		public static const BYTE_MASK:uint = 0x0000FF;
		
		private var color:uint;
		
		public static const WHITE : uint = (new Color(255, 255, 255)).color;
		public static const LIGHT_GRAY : uint = (new Color(200, 200, 200)).color;
		public static const GRAY : uint = (new Color(155, 155, 155)).color;
		public static const GREY : uint = (new Color(155, 155, 155)).color;
		public static const BLACK : uint = (new Color(0, 0, 0)).color;
		
		public static const CYAN : uint = (new Color(0, 255, 255)).color;
		public static const YELLOW : uint = (new Color(255, 255, 0)).color;
		public static const MAGENTA : uint = (new Color(255, 0, 255)).color;
		
		public static const RED : uint = (new Color(255, 0, 0)).color;
		public static const GREEN : uint = (new Color(0, 255, 0)).color;
		public static const BLUE : uint = (new Color(0, 0, 255)).color;
		
		public function Color(r:uint, g:uint, b:uint) {
			
			checkByte(r);
			checkByte(g);
			checkByte(b);
			
			color = 0;
			color += r << 16;
			color += g << 8;
			color += b;
		}
		
		private function checkByte( num:uint ) {
			if( num < 0 || num > 255 )
				throw new Error("Input: " + num + " is outsize the allowable range (0-255)");
		}
		
		public function getColor() : uint {
			return color;
		}
		
		public function getRed() : uint {
			return (color >> 16) & R_MASK;
		}
		
		public function getGreen() : uint {
			return (color >> 8) & G_MASK;
		}
		
		public function getBlue() : uint {
			return color & B_MASK;
		}
	}
}