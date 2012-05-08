/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.Point=function(x,y){this.x=x;this.y=y;};draw2d.Point.prototype.type="draw2d.Point";draw2d.Point.prototype.getX=function(){return this.x;};draw2d.Point.prototype.getY=function(){return this.y;};draw2d.Point.prototype.getPosition=function(p){var dx=p.x-this.x;var dy=p.y-this.y;if(Math.abs(dx)>Math.abs(dy)){if(dx<0){return draw2d.PositionConstants.WEST;}return draw2d.PositionConstants.EAST;}if(dy<0){return draw2d.PositionConstants.NORTH;}return draw2d.PositionConstants.SOUTH;};draw2d.Point.prototype.equals=function(o){return this.x==o.x&&this.y==o.y;};draw2d.Point.prototype.getDistance=function(_d7a){return Math.sqrt((this.x-_d7a.x)*(this.x-_d7a.x)+(this.y-_d7a.y)*(this.y-_d7a.y));};draw2d.Point.prototype.getTranslated=function(_d7b){return new draw2d.Point(this.x+_d7b.x,this.y+_d7b.y);};draw2d.Point.prototype.getPersistentAttributes=function(){return {x:this.x,y:this.y};};