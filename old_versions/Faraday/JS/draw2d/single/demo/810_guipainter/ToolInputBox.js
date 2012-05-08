draw2d.ToolInputBox=function(_2dde){
draw2d.ToolGeneric.call(this,_2dde);
this.setDimension(25,25);
};
draw2d.ToolInputBox.prototype=new draw2d.ToolGeneric;
draw2d.ToolInputBox.prototype.type="ToolInputBox";
draw2d.ToolInputBox.prototype.execute=function(x,y){
var _2de1=new draw2d.InputBoxFigure();
_2de1.setDimension(100,20);
var _2de2=this.palette.workflow.getBestCompartmentFigure(x,y);
this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_2de1,x,y,_2de2));
draw2d.ToolGeneric.prototype.execute.call(this,x,y);
};
