draw2d.ToolGroup=function(_24c2){
draw2d.ToolGeneric.call(this,_24c2);
this.setDimension(25,25);
this.setTooltip("Form Group");
};
draw2d.ToolGroup.prototype=new draw2d.ToolGeneric;
draw2d.ToolGroup.prototype.type="ToolGroup";
draw2d.ToolGroup.prototype.execute=function(x,y){
var _24c5=new draw2d.GroupFigure();
_24c5.setDimension(100,60);
var _24c6=this.palette.workflow.getBestCompartmentFigure(x,y);
this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_24c5,x,y,_24c6));
draw2d.ToolGeneric.prototype.execute.call(this,x,y);
};
