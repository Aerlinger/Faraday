package utility
{
	public class ArrayUtils
	{
		public function ArrayUtils()
		{
			
		}
		
		public static function initializeOneDArray(OneDArray:Array, size:int) : Array {
			//var OneDArray:Array = new Array(size);
			
			if( isNaN(size) )
				size = OneDArray.length;
			
			for( var i:uint =0; i<size; ++i ) {
				OneDArray[i] = 0;
			}
			
			return OneDArray;
		}
		
		public static function initializeTwoDArray(TwoDArray:Array, numRows:uint, numCols:uint) : Array {
			//TwoDArray = new Array(numCols);
			//TwoDArray.length
			for( var i:uint = 0; i<numCols; ++i ) {
				var thisRow:Array = new Array(numRows);
				TwoDArray[i] = initializeOneDArray(thisRow, numRows);
			}
			
			return TwoDArray;
		}
		
		public static function printTwoDArray(TwoDArray:Array, numRows:uint, numCols:uint) : void {
			
		}
		
		
	}
}