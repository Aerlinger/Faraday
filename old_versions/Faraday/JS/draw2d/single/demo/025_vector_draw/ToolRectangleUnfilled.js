draw2d.ToolRectangleUnfilled=function(_1ecc){
draw2d.ToolGeneric.call(this,_1ecc);
this.setDimension(24,24);
};
draw2d.ToolRectangleUnfilled.prototype=new draw2d.ToolGeneric;
draw2d.ToolRectangleUnfilled.prototype.type="ToolRectangleUnfilled";
draw2d.ToolRectangleUnfilled.prototype.execute=function(x,y){
var _1ecf=new draw2d.Rectangle();
_1ecf.setDimension(100,60);
this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_1ecf,x,y));
draw2d.ToolGeneric.prototype.execute.call(this,x,y);
};
