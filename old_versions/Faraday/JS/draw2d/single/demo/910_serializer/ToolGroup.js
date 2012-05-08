draw2d.ToolGroup=function(_1ec8){
draw2d.ToolGeneric.call(this,_1ec8);
this.setDimension(25,25);
this.setTooltip("Form Group");
};
draw2d.ToolGroup.prototype=new draw2d.ToolGeneric;
draw2d.ToolGroup.prototype.type="ToolGroup";
draw2d.ToolGroup.prototype.execute=function(x,y){
var _1ecb=new draw2d.GroupFigure();
_1ecb.setDimension(100,60);
this.palette.workflow.addFigure(_1ecb,x,y);
draw2d.ToolGeneric.prototype.execute.call(this,x,y);
};
