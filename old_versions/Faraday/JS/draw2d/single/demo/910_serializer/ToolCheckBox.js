draw2d.ToolCheckBox=function(_1ed5){
draw2d.ToolGeneric.call(this,_1ed5);
this.setDimension(25,25);
};
draw2d.ToolCheckBox.prototype=new draw2d.ToolGeneric;
draw2d.ToolCheckBox.prototype.type="ToolCheckBox";
draw2d.ToolCheckBox.prototype.execute=function(x,y){
var _1ed8=new draw2d.CheckBoxFigure();
_1ed8.setDimension(100,20);
this.palette.workflow.addFigure(_1ed8,x,y);
var _1ed9=this.palette.workflow.getBestCompartmentFigure(x,y);
if(_1ed9){
_1ed9.addChild(_1ed8);
}
draw2d.ToolGeneric.prototype.execute.call(this,x,y);
};
