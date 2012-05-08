/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.XMLSerializer_01=function(){};draw2d.XMLSerializer_01.prototype.type="XMLSerializer_01";draw2d.XMLSerializer_01.prototype.toXML=function(_132f){var xml="<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n";xml=xml+"<form>\n";var _1331=_132f.getFigures();for(var i=0;i<_1331.getSize();i++){var _1333=_1331.get(i);xml=xml+"<"+_1333.type+" x=\""+_1333.getX()+"\" y=\""+_1333.getY()+"\" id=\""+_1333.getId()+"\">\n";xml=xml+this.getPropertyXML(_1333,"   ");if(_1333 instanceof draw2d.CompartmentFigure){xml=xml+this.getChildXML(_1333,"   ");}xml=xml+"</"+_1333.type+">\n";}xml=xml+"</form>\n";return xml;};draw2d.XMLSerializer_01.prototype.getChildXML=function(_1334,_1335){var xml="";var _1337=_1334.getChildren();for(var i=0;i<_1337.getSize();i++){var _1339=_1337.get(i);xml=xml+_1335+"<"+_1339.type+" x=\""+_1339.getX()+"\" y=\""+_1339.getY()+"\" id=\""+_1339.getId()+"\">\n";xml=xml+this.getPropertyXML(_1339,"   "+_1335);if(_1339 instanceof draw2d.CompartmentFigure){xml=xml+this.getChildXML(_1339,"   "+_1335);}xml=xml+_1335+"</"+_1339.type+">\n";}return xml;};draw2d.XMLSerializer_01.prototype.getPropertyXML=function(_133a,_133b){var xml="";var _133d=_133a.getProperties();for(key in _133d){var value=_133d[key];if(value!==null){xml=xml+_133b+"<property name=\""+key+"\" value=\""+value+"\">\n";}}return xml;};