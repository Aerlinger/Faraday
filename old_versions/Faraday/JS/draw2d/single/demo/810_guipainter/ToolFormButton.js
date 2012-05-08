draw2d.ToolFormButton=function(_366a){
draw2d.ToolGeneric.call(this,_366a);
this.setDimension(25,25);
};
draw2d.ToolFormButton.prototype=new draw2d.ToolGeneric;
draw2d.ToolFormButton.prototype.type="ToolFormButton";
draw2d.ToolFormButton.prototype.execute=function(x,y){
var _366d=new draw2d.ButtonFigure();
_366d.setDimension(100,20);
var _366e=this.palette.workflow.getBestCompartmentFigure(x,y);
this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_366d,x,y,_366e));
draw2d.ToolGeneric.prototype.execute.call(this,x,y);
};
