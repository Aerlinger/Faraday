draw2d.ToolLine=function(_1ed0){
draw2d.ToolGeneric.call(this,_1ed0);
this.setDimension(24,24);
};
draw2d.ToolLine.prototype=new draw2d.ToolGeneric();
draw2d.ToolLine.prototype.type="ToolLine";
draw2d.ToolLine.prototype.execute=function(x,y){
var _1ed3=new draw2d.Line();
_1ed3.setStartPoint(x,y);
_1ed3.setEndPoint(x+100,y+100);
this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_1ed3));
draw2d.ToolGeneric.prototype.execute.call(this,x,y);
};
