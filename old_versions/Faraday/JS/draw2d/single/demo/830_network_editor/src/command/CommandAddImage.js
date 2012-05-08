draw2d.CommandAddImage=function(view,_39ae,image){
draw2d.Command.call(this,"Add Image to Server");
this.server=_39ae;
this.image=image;
this.view=view;
this.objToSelect=this.view.getCurrentSelection();
};
draw2d.CommandAddImage.prototype=new draw2d.Command();
draw2d.CommandAddImage.prototype.type="draw2d.CommandAddImage";
draw2d.CommandAddImage.prototype.canExecute=function(){
return true;
};
draw2d.CommandAddImage.prototype.execute=function(){
this.redo();
};
draw2d.CommandAddImage.prototype.undo=function(){
this.server.removeImageModel(this.image);
this.view.setCurrentSelection(null);
this.view.setCurrentSelection(this.objToSelect);
};
draw2d.CommandAddImage.prototype.redo=function(){
this.server.addImageModel(this.image);
this.view.setCurrentSelection(null);
this.view.setCurrentSelection(this.objToSelect);
};
