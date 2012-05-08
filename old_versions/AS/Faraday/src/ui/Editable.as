package ui
{
	interface Editable {
		function getEditInfo(n:int) : EditInfo;
		function setEditValue(n:int, ei:EditInfo );
	}
}