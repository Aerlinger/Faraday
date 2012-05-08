draw2d.ToolbarButtonApply=function(_273b){
draw2d.AbstractToolbarButton.call(this,_273b,draw2d.I18N.TOOLBAR_BUTTON_APPLY_XML);
};
draw2d.ToolbarButtonApply.prototype=new draw2d.AbstractToolbarButton();
draw2d.ToolbarButtonApply.prototype.execute=function(){
var _273c=draw2d.ModelXMLSerializer.toXML(editor.getModel());
var req=new Ajax.Request(draw2d.Configuration.APPLY_XML,{method:"post",parameters:{xml:documentId,content:_273c},onFailure:function(_273e){
alert(draw2d.I18N.ERRORMESSAGE_APPLY_ERROR_404);
},onSuccess:function(_273f){
var msg=new TransparentMessage("Configuration Applied");
msg.show();
}});
};
