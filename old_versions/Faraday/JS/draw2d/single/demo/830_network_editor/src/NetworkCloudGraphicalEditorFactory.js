draw2d.NetworkCloudGraphicalEditorFactory=function(_1ec4){
this.readonly=_1ec4;
draw2d.EditPartFactory.call(this);
};
draw2d.NetworkCloudGraphicalEditorFactory.prototype=new draw2d.EditPartFactory();
draw2d.NetworkCloudGraphicalEditorFactory.prototype.type="draw2d.NetworkCloudGraphicalEditorFactory";
draw2d.NetworkCloudGraphicalEditorFactory.prototype.createEditPart=function(model){
var _1ec6=null;
if(model instanceof draw2d.ServerModel){
_1ec6=new draw2d.ServerFigure();
}else{
if(model instanceof draw2d.StorageModel){
_1ec6=new draw2d.StorageFigure();
}else{
if(model instanceof draw2d.SwitchModel){
_1ec6=new draw2d.SwitchFigure();
}else{
if(model instanceof draw2d.MountModel){
_1ec6=new draw2d.MountFigure();
}else{
if(model instanceof draw2d.NicConnectionModel){
_1ec6=new draw2d.NicConnectionFigure();
}
}
}
}
}
if(_1ec6===null){
throw "factory called with unknown model class:"+model.type;
}
_1ec6.setModel(model);
if(this.readonly){
_1ec6.setDeleteable(false);
_1ec6.setCanDrag(false);
}
return _1ec6;
};
