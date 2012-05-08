/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.CanvasDocument=function(_1c3a){this.canvas=_1c3a;};draw2d.CanvasDocument.prototype.type="draw2d.CanvasDocument";draw2d.CanvasDocument.prototype.getFigures=function(){var _1c3b=new draw2d.ArrayList();var _1c3c=this.canvas.figures;var _1c3d=this.canvas.dialogs;for(var i=0;i<_1c3c.getSize();i++){var _1c3f=_1c3c.get(i);if(_1c3d.indexOf(_1c3f)==-1&&_1c3f.getParent()===null&&!(_1c3f instanceof draw2d.WindowFigure)){_1c3b.add(_1c3f);}}return _1c3b;};draw2d.CanvasDocument.prototype.getFigure=function(id){return this.canvas.getFigure(id);};draw2d.CanvasDocument.prototype.getLines=function(){return this.canvas.getLines();};draw2d.CanvasDocument.prototype.getLine=function(id){return this.canvas.getLine(id);};