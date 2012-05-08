draw2d.ToolOvalUnfilled=function(_2fec){
draw2d.ToolGeneric.call(this,_2fec);
this.setDimension(24,24);
};
draw2d.ToolOvalUnfilled.prototype=new draw2d.ToolGeneric();
draw2d.ToolOvalUnfilled.prototype.type="ToolOvalUnfilled";
draw2d.ToolOvalUnfilled.prototype.execute=function(x,y){
var _2fef=new draw2d.Oval();
_2fef.setDimension(100,60);
this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_2fef,x,y));
draw2d.ToolGeneric.prototype.execute.call(this,x,y);
};
