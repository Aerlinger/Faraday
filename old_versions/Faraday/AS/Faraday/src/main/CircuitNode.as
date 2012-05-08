package main
{
	/* began porting */
	public class CircuitNode
	{
		public var x:int;
		public var y:int;
		
		public var links:Array;
		public var intern:Boolean;
		
		
		public function CircuitNode() {
			links = new Array();
		}
	}
}