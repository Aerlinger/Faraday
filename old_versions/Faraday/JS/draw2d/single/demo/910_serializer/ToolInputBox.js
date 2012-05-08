draw2d.ToolInputBox=function(_2841){
draw2d.ToolGeneric.call(this,_2841);
this.setDimension(25,25);
};
draw2d.ToolInputBox.prototype=new draw2d.ToolGeneric;
draw2d.ToolInputBox.prototype.type="ToolInputBox";
draw2d.ToolInputBox.prototype.execute=function(x,y){
var _2844=new draw2d.InputBoxFigure();
_2844.setDimension(100,20);
this.palette.workflow.addFigure(_2844,x,y);
var _2845=this.palette.workflow.getBestCompartmentFigure(x,y);
if(_2845){
_2845.addChild(_2844);
}
draw2d.ToolGeneric.prototype.execute.call(this,x,y);
};
