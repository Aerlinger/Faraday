draw2d.ToolCheckBox=function(_379c){
draw2d.ToolGeneric.call(this,_379c);
this.setDimension(25,25);
};
draw2d.ToolCheckBox.prototype=new draw2d.ToolGeneric;
draw2d.ToolCheckBox.prototype.type="ToolCheckBox";
draw2d.ToolCheckBox.prototype.execute=function(x,y){
var _379f=new draw2d.CheckBoxFigure();
_379f.setDimension(100,20);
var _37a0=this.palette.workflow.getBestCompartmentFigure(x,y);
this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_379f,x,y,_37a0));
draw2d.ToolGeneric.prototype.execute.call(this,x,y);
};
