draw2d.ToolUndo=function(_21d2){
draw2d.Button.call(this,_21d2);
this.setDimension(24,24);
};
draw2d.ToolUndo.prototype=new draw2d.Button();
draw2d.ToolUndo.prototype.type="ToolUndo";
draw2d.ToolUndo.prototype.execute=function(){
this.getWorkflow().getCommandStack().undo();
};
