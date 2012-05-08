draw2d.ButtonMoveBack=function(_1ed4){
draw2d.Button.call(this,_1ed4,16,16);
};
draw2d.ButtonMoveBack.prototype=new draw2d.Button();
draw2d.ButtonMoveBack.prototype.type="ButtonMoveBack";
draw2d.ButtonMoveBack.prototype.execute=function(){
this.palette.workflow.moveBack(this.palette.workflow.getCurrentSelection());
draw2d.ToolGeneric.prototype.execute.call(this);
};
