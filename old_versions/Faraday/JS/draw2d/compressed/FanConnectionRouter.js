/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.FanConnectionRouter=function(){};draw2d.FanConnectionRouter.prototype=new draw2d.NullConnectionRouter();draw2d.FanConnectionRouter.prototype.type="draw2d.FanConnectionRouter";draw2d.FanConnectionRouter.prototype.route=function(_68){var _69=_68.getStartPoint();var _6a=_68.getEndPoint();var _6b=_68.getSource().getConnections();var _6c=new draw2d.ArrayList();var _6d=0;for(var i=0;i<_6b.getSize();i++){var _6f=_6b.get(i);if(_6f.getTarget()==_68.getTarget()||_6f.getSource()==_68.getTarget()){_6c.add(_6f);if(_68==_6f){_6d=_6c.getSize();}}}if(_6c.getSize()>1){this.routeCollision(_68,_6d);}else{draw2d.NullConnectionRouter.prototype.route.call(this,_68);}};draw2d.FanConnectionRouter.prototype.routeNormal=function(_70){_70.addPoint(_70.getStartPoint());_70.addPoint(_70.getEndPoint());};draw2d.FanConnectionRouter.prototype.routeCollision=function(_71,_72){var _73=_71.getStartPoint();var end=_71.getEndPoint();_71.addPoint(_73);var _75=10;var _76=new draw2d.Point((end.x+_73.x)/2,(end.y+_73.y)/2);var _77=end.getPosition(_73);var ray;if(_77==draw2d.PositionConstants.SOUTH||_77==draw2d.PositionConstants.EAST){ray=new draw2d.Point(end.x-_73.x,end.y-_73.y);}else{ray=new draw2d.Point(_73.x-end.x,_73.y-end.y);}var _79=Math.sqrt(ray.x*ray.x+ray.y*ray.y);var _7a=_75*ray.x/_79;var _7b=_75*ray.y/_79;var _7c;if(_72%2===0){_7c=new draw2d.Point(_76.x+(_72/2)*(-1*_7b),_76.y+(_72/2)*_7a);}else{_7c=new draw2d.Point(_76.x+(_72/2)*_7b,_76.y+(_72/2)*(-1*_7a));}_71.addPoint(_7c);_71.addPoint(end);};