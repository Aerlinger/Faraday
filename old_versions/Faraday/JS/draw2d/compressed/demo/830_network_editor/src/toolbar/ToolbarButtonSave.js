/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolbarButtonSave=function(_4d2){draw2d.AbstractToolbarButton.call(this,_4d2,draw2d.I18N.TOOLBAR_BUTTON_SAVE_XML);this.saveTimer=-1;};draw2d.ToolbarButtonSave.prototype=new draw2d.AbstractToolbarButton();draw2d.ToolbarButtonSave.prototype.execute=function(){var _4d3=true;if(this.saveTimer!==-1&&draw2d.Drag.current!==null){var _4d4=this.execute.bind(this);this.saveTimer=_4d4.delay(draw2d.Configuration.AUTOSAVE_IN_SECONDS);return;}if(this.saveTimer!==-1){_4d3=false;}this.saveTimer=-1;var _4d5=draw2d.ModelXMLSerializer.toXML(editor.getModel());var req=new Ajax.Request(draw2d.Configuration.SAVE_XML,{method:"post",parameters:{xml:documentId,content:_4d5},onFailure:function(_4d7){alert(draw2d.I18N.ERRORMESSAGE_SAVE_ERROR_404);},onSuccess:function(_4d8){if(_4d3==false){return;}var msg=new TransparentMessage("saved");msg.show();}});};draw2d.ToolbarButtonSave.prototype.stackChanged=function(_4da){if(draw2d.Configuration.AUTOSAVE_IN_SECONDS===-1){return;}var _4db=this.execute.bind(this);if(this.saveTimer!=-1){window.clearTimeout(this.saveTimer);}this.saveTimer=_4db.delay(draw2d.Configuration.AUTOSAVE_IN_SECONDS);};