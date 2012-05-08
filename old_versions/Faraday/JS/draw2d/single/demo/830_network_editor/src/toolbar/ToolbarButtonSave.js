draw2d.ToolbarButtonSave=function(_21bb){
draw2d.AbstractToolbarButton.call(this,_21bb,draw2d.I18N.TOOLBAR_BUTTON_SAVE_XML);
this.saveTimer=-1;
};
draw2d.ToolbarButtonSave.prototype=new draw2d.AbstractToolbarButton();
draw2d.ToolbarButtonSave.prototype.execute=function(){
var _21bc=true;
if(this.saveTimer!==-1&&draw2d.Drag.current!==null){
var _21bd=this.execute.bind(this);
this.saveTimer=_21bd.delay(draw2d.Configuration.AUTOSAVE_IN_SECONDS);
return;
}
if(this.saveTimer!==-1){
_21bc=false;
}
this.saveTimer=-1;
var _21be=draw2d.ModelXMLSerializer.toXML(editor.getModel());
var req=new Ajax.Request(draw2d.Configuration.SAVE_XML,{method:"post",parameters:{xml:documentId,content:_21be},onFailure:function(_21c0){
alert(draw2d.I18N.ERRORMESSAGE_SAVE_ERROR_404);
},onSuccess:function(_21c1){
if(_21bc==false){
return;
}
var msg=new TransparentMessage("saved");
msg.show();
}});
};
draw2d.ToolbarButtonSave.prototype.stackChanged=function(event){
if(draw2d.Configuration.AUTOSAVE_IN_SECONDS===-1){
return;
}
var _21c4=this.execute.bind(this);
if(this.saveTimer!=-1){
window.clearTimeout(this.saveTimer);
}
this.saveTimer=_21c4.delay(draw2d.Configuration.AUTOSAVE_IN_SECONDS);
};
