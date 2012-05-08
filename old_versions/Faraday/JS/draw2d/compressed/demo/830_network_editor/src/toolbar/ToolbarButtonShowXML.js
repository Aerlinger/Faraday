/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolbarButtonShowXML=function(_155){draw2d.AbstractToolbarButton.call(this,_155,draw2d.I18N.TOOLBAR_BUTTON_SHOW_XML);};draw2d.ToolbarButtonShowXML.prototype=new draw2d.AbstractToolbarButton();draw2d.ToolbarButtonShowXML.prototype.execute=function(){var _156=draw2d.ModelXMLSerializer.toXML(editor.getModel());var res="<?xml version=\"1.0\" encoding=\"ISO-8859-2\"?>\n"+_156;var _158=window.open("","new");_158.document.open("text/xml");_158.document.write(res);};