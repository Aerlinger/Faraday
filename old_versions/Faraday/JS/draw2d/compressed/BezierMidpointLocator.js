/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.BezierMidpointLocator=function(_57){draw2d.ConnectionLocator.call(this,_57);};draw2d.BezierMidpointLocator.prototype=new draw2d.ConnectionLocator;draw2d.BezierMidpointLocator.prototype.type="draw2d.BezierMidpointLocator";draw2d.BezierMidpointLocator.prototype.relocate=function(_58){var _59=this.getConnection();var p=new draw2d.Point();var _5b=_59.getPoints();var _5c=Math.floor((_5b.getSize()-2)/2);if(_5b.getSize()<=_5c+1){return;}var p1=_5b.get(_5c);var p2=_5b.get(_5c+1);p.x=(p2.x-p1.x)/2+p1.x+5;p.y=(p2.y-p1.y)/2+p1.y+5;_58.setPosition(p.x,p.y);};