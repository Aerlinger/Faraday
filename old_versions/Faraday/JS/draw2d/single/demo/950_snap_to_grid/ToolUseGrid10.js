draw2d.ToolUseGrid10=function(_3666){
draw2d.ToggleButton.call(this,_3666);
};
draw2d.ToolUseGrid10.prototype=new draw2d.ToggleButton();
draw2d.ToolUseGrid10.prototype.type="ToolUseGrid10";
draw2d.ToolUseGrid10.prototype.execute=function(){
if(this.isDown()){
this.getToolPalette().getWorkflow().setBackgroundImage("grid_10.png",true);
}else{
this.getToolPalette().getWorkflow().setBackgroundImage(null,false);
}
this.getToolPalette().getWorkflow().setGridWidth(10,10);
this.getToolPalette().getWorkflow().setSnapToGrid(this.isDown());
this.getToolPalette().tool2.setActive(false);
};
