/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.Circle=function(_125d){draw2d.Oval.call(this);if(_125d){this.setDimension(_125d,_125d);}};draw2d.Circle.prototype=new draw2d.Oval();draw2d.Circle.prototype.type="draw2d.Circle";draw2d.Circle.prototype.setDimension=function(w,h){if(w>h){draw2d.Oval.prototype.setDimension.call(this,w,w);}else{draw2d.Oval.prototype.setDimension.call(this,h,h);}};draw2d.Circle.prototype.isStrechable=function(){return false;};