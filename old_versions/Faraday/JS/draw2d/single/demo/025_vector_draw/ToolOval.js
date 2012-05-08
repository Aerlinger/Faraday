draw2d.ToolOval=function(_2734){
draw2d.ToolGeneric.call(this,_2734);
this.setDimension(24,24);
};
draw2d.ToolOval.prototype=new draw2d.ToolGeneric();
draw2d.ToolOval.prototype.type="ToolOval";
draw2d.ToolOval.prototype.execute=function(x,y){
var _2737=new draw2d.Oval();
_2737.setDimension(100,60);
_2737.setBackgroundColor(new draw2d.Color(255,255,255));
this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_2737,x,y));
draw2d.ToolGeneric.prototype.execute.call(this,x,y);
};
