package main
{
	public class RowInfo
	{
		
		public static const ROW_NORMAL:uint = 0;
		public static const ROW_CONST:uint = 1;
		public static const ROW_EQUAL:uint = 2;
		
		public var nodeEq:int = 0;
		public var type:int = 0;
		public var mapCol:int = 0;
		public var mapRow:int = 0;
		
		public var value:Number = 0;
		public var rsChanges:Boolean = false;
		public var lsChanges:Boolean = false;
		public var dropRow:Boolean = false;
		
		public function RowInfo() {
			type = ROW_NORMAL;
		}
		
	}
}