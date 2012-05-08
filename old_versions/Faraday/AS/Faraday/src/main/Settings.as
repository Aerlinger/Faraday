package main
{
	import utility.Color;
	
	public final class Settings
	{
		public static const DRAW_STYLE_VECTOR:Boolean = true;
		
		// Colors:
		public static const BG_COLOR:uint = new Color(45, 45, 45).getColor();
		public static const FG_COLOR:uint = new Color(220, 220, 220).getColor();
		public static const SELECT_COLOR:uint = Color.CYAN;
		public static const POST_COLOR_SELECTED:uint = Color.YELLOW;
		public static const POST_COLOR:uint = Color.WHITE;
		public static const DOTS_COLOR:uint = Color.YELLOW;
		public static const TEXT_COLOR:uint = Color.WHITE;
		public static const TEXT_ERROR:uint = Color.RED;
		public static const TEXT_WARNING:uint = Color.YELLOW;
	}
}