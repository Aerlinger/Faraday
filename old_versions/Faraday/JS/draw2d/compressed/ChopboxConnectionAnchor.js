/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ChopboxConnectionAnchor=function(_d65){draw2d.ConnectionAnchor.call(this,_d65);};draw2d.ChopboxConnectionAnchor.prototype=new draw2d.ConnectionAnchor();draw2d.ChopboxConnectionAnchor.prototype.type="draw2d.ChopboxConnectionAnchor";draw2d.ChopboxConnectionAnchor.prototype.getLocation=function(_d66){var r=new draw2d.Dimension();r.setBounds(this.getBox());r.translate(-1,-1);r.resize(1,1);var _d68=r.x+r.w/2;var _d69=r.y+r.h/2;if(r.isEmpty()||(_d66.x==_d68&&_d66.y==_d69)){return new Point(_d68,_d69);}var dx=_d66.x-_d68;var dy=_d66.y-_d69;var _d6c=0.5/Math.max(Math.abs(dx)/r.w,Math.abs(dy)/r.h);dx*=_d6c;dy*=_d6c;_d68+=dx;_d69+=dy;return new draw2d.Point(Math.round(_d68),Math.round(_d69));};draw2d.ChopboxConnectionAnchor.prototype.getBox=function(){return this.getOwner().getParent().getBounds();};draw2d.ChopboxConnectionAnchor.prototype.getReferencePoint=function(){return this.getBox().getCenter();};