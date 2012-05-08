/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ServerPalettePart=function(_4c){draw2d.AbstractPalettePart.call(this);this.networkModel=_4c;};draw2d.ServerPalettePart.prototype=new draw2d.AbstractPalettePart();draw2d.ServerPalettePart.prototype.type="draw2d.ServerPalettePart";draw2d.ServerPalettePart.prototype.createHTMLElement=function(){var _4d=draw2d.AbstractPalettePart.prototype.createHTMLElement.call(this);_4d.className="palette_part_server";_4d.innerHTML=draw2d.I18N.PALETTE_OBJECT_SERVER_LABEL;_4d.title=draw2d.I18N.PALETTE_OBJECT_SERVER_TOOLTIP;return _4d;};draw2d.ServerPalettePart.prototype.execute=function(x,y){editor.getGraphicalViewer().getCommandStack().execute(new draw2d.CommandAddServer(this.networkModel,x-10,y-10));};