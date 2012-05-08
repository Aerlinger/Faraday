/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.MyCompartmentFigure=function(){draw2d.CompartmentFigure.call(this);this.defaultColor=new draw2d.Color(230,230,250);this.setBackgroundColor(this.defaultColor);};draw2d.MyCompartmentFigure.prototype=new draw2d.CompartmentFigure();draw2d.MyCompartmentFigure.prototype.onFigureLeave=function(_4ea){draw2d.CompartmentFigure.prototype.onFigureLeave.call(this,_4ea);if(_4ea instanceof draw2d.CompartmentFigure){_4ea.setBackgroundColor(_4ea.defaultColor);}};draw2d.MyCompartmentFigure.prototype.onFigureDrop=function(_4eb){draw2d.CompartmentFigure.prototype.onFigureDrop.call(this,_4eb);if(_4eb instanceof draw2d.CompartmentFigure){_4eb.setBackgroundColor(this.getBackgroundColor().darker(0.1));}};draw2d.MyCompartmentFigure.prototype.setBackgroundColor=function(_4ec){draw2d.CompartmentFigure.prototype.setBackgroundColor.call(this,_4ec);for(var i=0;i<this.children.getSize();i++){var _4ee=this.children.get(i);if(_4ee instanceof draw2d.CompartmentFigure){_4ee.setBackgroundColor(this.getBackgroundColor().darker(0.1));}}};