draw2d.ToolRedo=function(_1d3a){
draw2d.Button.call(this,_1d3a);
};
draw2d.ToolRedo.prototype=new draw2d.Button();
draw2d.ToolRedo.prototype.type="ToolRedo";
draw2d.ToolRedo.prototype.execute=function(){
this.palette.workflow.getCommandStack().redo();
draw2d.ToolGeneric.prototype.execute.call(this);
};
