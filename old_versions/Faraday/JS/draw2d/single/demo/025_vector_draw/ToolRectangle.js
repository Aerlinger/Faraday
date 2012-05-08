draw2d.ToolRectangle=function(_2cac){
draw2d.ToolGeneric.call(this,_2cac);
this.setDimension(24,24);
};
draw2d.ToolRectangle.prototype=new draw2d.ToolGeneric;
draw2d.ToolRectangle.prototype.type="ToolRectangle";
draw2d.ToolRectangle.prototype.execute=function(x,y){
var _2caf=new draw2d.Rectangle();
_2caf.setDimension(100,60);
_2caf.setBackgroundColor(new draw2d.Color(255,255,255));
this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_2caf,x,y));
draw2d.ToolGeneric.prototype.execute.call(this,x,y);
};
