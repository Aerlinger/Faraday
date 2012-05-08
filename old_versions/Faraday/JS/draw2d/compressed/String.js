/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

String.prototype.trim=function(){return (this.replace(new RegExp("^([\\s]+)|([\\s]+)$","gm"),""));};String.prototype.lefttrim=function(){return (this.replace(new RegExp("^[\\s]+","gm"),""));};String.prototype.righttrim=function(){return (this.replace(new RegExp("[\\s]+$","gm"),""));};String.prototype.between=function(_4,_5,_6){if(!_6){_6=0;}var li=this.indexOf(_4,_6);if(li==-1){return null;}var ri=this.indexOf(_5,li);if(ri==-1){return null;}return this.substring(li+_4.length,ri);};