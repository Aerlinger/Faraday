draw2d.ButtonMoveFront=function(_3017){
draw2d.Button.call(this,_3017,16,16);
};
draw2d.ButtonMoveFront.prototype=new draw2d.Button();
draw2d.ButtonMoveFront.prototype.type="ButtonMoveFront";
draw2d.ButtonMoveFront.prototype.execute=function(){
this.palette.workflow.moveFront(this.palette.workflow.getCurrentSelection());
draw2d.ToolGeneric.prototype.execute.call(this);
};
