draw2d.CommandChangeProperty=function(view,func,_1e62,_1e63){
draw2d.Command.call(this,"Change Property");
this.func=func;
this.oldValue=_1e62;
this.newValue=_1e63;
this.view=view;
this.objToSelect=this.view.getCurrentSelection();
};
draw2d.CommandChangeProperty.prototype=new draw2d.Command();
draw2d.CommandChangeProperty.prototype.type="draw2d.CommandChangeProperty";
draw2d.CommandChangeProperty.prototype.canExecute=function(){
return true;
};
draw2d.CommandChangeProperty.prototype.execute=function(){
this.func(this.newValue);
};
draw2d.CommandChangeProperty.prototype.redo=function(){
this.func(this.newValue);
this.view.setCurrentSelection(this.objToSelect);
};
draw2d.CommandChangeProperty.prototype.undo=function(){
this.func(this.oldValue);
this.view.setCurrentSelection(this.objToSelect);
};
