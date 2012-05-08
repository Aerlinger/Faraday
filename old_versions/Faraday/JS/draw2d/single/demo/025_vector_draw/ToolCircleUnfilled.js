draw2d.ToolCircleUnfilled=function(_1d4d){
draw2d.ToolGeneric.call(this,_1d4d);
this.setDimension(24,24);
};
draw2d.ToolCircleUnfilled.prototype=new draw2d.ToolGeneric();
draw2d.ToolCircleUnfilled.prototype.type="ToolCircleUnfilled";
draw2d.ToolCircleUnfilled.prototype.execute=function(x,y){
var _1d50=new draw2d.Circle();
_1d50.setDimension(100,100);
this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_1d50,x,y));
draw2d.ToolGeneric.prototype.execute.call(this,x,y);
};
