draw2d.MyGraphicalEditorFactory=function(){
draw2d.EditPartFactory.call(this);
};
draw2d.MyGraphicalEditorFactory.prototype=new draw2d.EditPartFactory();
draw2d.MyGraphicalEditorFactory.prototype.type="draw2d.MyGraphicalEditorFactory";
draw2d.MyGraphicalEditorFactory.prototype.createEditPart=function(model){
var _2f2d;
if(model instanceof draw2d.TableModel){
_2f2d=new draw2d.TableFigure();
}
if(model instanceof draw2d.ForeignKeyModel){
_2f2d=new draw2d.ForeignKeyFigure();
}
if(_2f2d===null){
alert("factory called with unknown model class:"+model.type);
}
_2f2d.setModel(model);
return _2f2d;
};
