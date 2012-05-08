draw2d.ToolbarButtonShowXML=function(_1e3e){
draw2d.AbstractToolbarButton.call(this,_1e3e,draw2d.I18N.TOOLBAR_BUTTON_SHOW_XML);
};
draw2d.ToolbarButtonShowXML.prototype=new draw2d.AbstractToolbarButton();
draw2d.ToolbarButtonShowXML.prototype.execute=function(){
var _1e3f=draw2d.ModelXMLSerializer.toXML(editor.getModel());
var res="<?xml version=\"1.0\" encoding=\"ISO-8859-2\"?>\n"+_1e3f;
var _1e41=window.open("","new");
_1e41.document.open("text/xml");
_1e41.document.write(res);
};
