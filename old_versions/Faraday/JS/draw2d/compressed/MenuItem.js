/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.MenuItem=function(label,_18a8,_18a9){this.label=label;this.iconUrl=_18a8;this.parentMenu=null;this.action=_18a9;};draw2d.MenuItem.prototype.type="draw2d.MenuItem";draw2d.MenuItem.prototype.isEnabled=function(){return true;};draw2d.MenuItem.prototype.getLabel=function(){return this.label;};draw2d.MenuItem.prototype.execute=function(x,y){this.parentMenu.workflow.showMenu(null);this.action(x,y);};