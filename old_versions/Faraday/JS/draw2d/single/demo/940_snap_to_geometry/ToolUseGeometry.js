draw2d.ToolUseGeometry=function(_2453){
draw2d.ToggleButton.call(this,_2453);
};
draw2d.ToolUseGeometry.prototype=new draw2d.ToggleButton();
draw2d.ToolUseGeometry.prototype.type="ToolUseGeometry";
draw2d.ToolUseGeometry.prototype.execute=function(){
this.getToolPalette().getWorkflow().setSnapToGeometry(this.isDown());
};
