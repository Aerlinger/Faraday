/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.Toolbar=function(_144){this.groups=new draw2d.ArrayList();this.divId=_144;};draw2d.Toolbar.prototype.getHTMLElement=function(){return $(this.divId);};draw2d.Toolbar.prototype.addElement=function(_145){this.groups.add(_145);this.getHTMLElement().appendChild(_145.getHTMLElement());};