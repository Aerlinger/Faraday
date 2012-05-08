/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolbarButtonApply=function(_a52){draw2d.AbstractToolbarButton.call(this,_a52,draw2d.I18N.TOOLBAR_BUTTON_APPLY_XML);};draw2d.ToolbarButtonApply.prototype=new draw2d.AbstractToolbarButton();draw2d.ToolbarButtonApply.prototype.execute=function(){var _a53=draw2d.ModelXMLSerializer.toXML(editor.getModel());var req=new Ajax.Request(draw2d.Configuration.APPLY_XML,{method:"post",parameters:{xml:documentId,content:_a53},onFailure:function(_a55){alert(draw2d.I18N.ERRORMESSAGE_APPLY_ERROR_404);},onSuccess:function(_a56){var msg=new TransparentMessage("Configuration Applied");msg.show();}});};