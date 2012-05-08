draw2d.ToolCircle=function(_1cf6){
draw2d.ToolGeneric.call(this,_1cf6);
this.setDimension(24,24);
};
draw2d.ToolCircle.prototype=new draw2d.ToolGeneric();
draw2d.ToolCircle.prototype.type="ToolCircle";
draw2d.ToolCircle.prototype.execute=function(x,y){
var _1cf9=new draw2d.Circle();
_1cf9.setDimension(100,100);
_1cf9.setBackgroundColor(new draw2d.Color(255,255,255));
this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_1cf9,x,y));
draw2d.ToolGeneric.prototype.execute.call(this,x,y);
};
