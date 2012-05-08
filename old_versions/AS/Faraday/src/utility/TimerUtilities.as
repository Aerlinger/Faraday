package utility
{
	import flash.utils.clearInterval;
	import flash.utils.getTimer;
	import flash.utils.setInterval;
	
	public class TimerUtilities
	{
		public static function currentTimeMillis() : int {
			return getTimer();
		}
		
		private static var hiddenInterval:Number = 0;
		
		private static function sleepwait() : void { 
			stopSleeping();
		}
		
		private static function stopSleeping() { 
			clearInterval(hiddenInterval);
		}
		
		public static function sleep(milliseconds) : void {
			
			hiddenInterval = setInterval(sleepwait, milliseconds); 
		}
		
		
	}
}