package ui
{
	public class EditInfo
	{
		public var name:String;
		public var text:String;
		
		public var value:Number;
		public var minValue:Number;
		public var maxValue:Number;
		
		public var dimensionless:Boolean;
		public var forceLargeM;
		
		public var isChecked:Boolean;
		
		
		public function EditInfo( n:String, val:Number, mn:Number, mx:Number)
		{
			name = n;
			value = val;
			if (mn == 0 && mx == 0 && val > 0) {
				minValue = 1e10;
				while (minValue > val / 100)
					minValue /= 10.;
				maxValue = minValue * 1000;
			} else {
				minValue = mn;
				maxValue = mx;
			}
			forceLargeM = name.indexOf("(ohms)") > 0 ||
				name.indexOf("(Hz)") > 0;
			dimensionless = false;
		}
		
		public function setDimensionless() : EditInfo {
			dimensionless = true;
			return this;
		}
	}
}