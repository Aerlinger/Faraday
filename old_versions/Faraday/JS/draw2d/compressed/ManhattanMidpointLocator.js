/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ManhattanMidpointLocator=function(_a2f){draw2d.ConnectionLocator.call(this,_a2f);};draw2d.ManhattanMidpointLocator.prototype=new draw2d.ConnectionLocator;draw2d.ManhattanMidpointLocator.prototype.type="draw2d.ManhattanMidpointLocator";draw2d.ManhattanMidpointLocator.prototype.relocate=function(_a30){var conn=this.getConnection();var p=new draw2d.Point();var _a33=conn.getPoints();var _a34=Math.floor((_a33.getSize()-2)/2);if(_a33.getSize()<=_a34+1){return;}var p1=_a33.get(_a34);var p2=_a33.get(_a34+1);p.x=(p2.x-p1.x)/2+p1.x+5;p.y=(p2.y-p1.y)/2+p1.y+5;_a30.setPosition(p.x,p.y);};