draw2d.ToolUseGrid20=function(_21d8){
draw2d.ToggleButton.call(this,_21d8);
};
draw2d.ToolUseGrid20.prototype=new draw2d.ToggleButton();
draw2d.ToolUseGrid20.prototype.type="ToolUseGrid20";
draw2d.ToolUseGrid20.prototype.execute=function(){
if(this.isDown()){
this.getToolPalette().getWorkflow().setBackgroundImage("grid_20.png",true);
}else{
this.getToolPalette().getWorkflow().setBackgroundImage(null,false);
}
this.getToolPalette().getWorkflow().setGridWidth(20,20);
this.getToolPalette().getWorkflow().setSnapToGrid(this.isDown());
this.getToolPalette().tool1.setActive(false);
};
