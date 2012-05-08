/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.PropertyPage=function(){};draw2d.PropertyPage.prototype.type="draw2d.PropertyPage";draw2d.PropertyPage.prototype.init=function(_944){throw "Inherit classes must override the abstract function [PropertyPage.prototype.init]";};draw2d.PropertyPage.prototype.deinit=function(){throw "Inherit classes must override the abstract function [PropertyPage.prototype.deinit]";};draw2d.PropertyPage.prototype.getHTMLElement=function(){throw "Inherit classes must override the abstract function [PropertyPage.prototype.getHTMLElement]";};draw2d.PropertyPage.prototype.onResize=function(w,h){};draw2d.PropertyPage.prototype.createInputElement=function(x,y){var _949=document.createElement("input");_949.type="text";_949.style.width="260px";_949.style.left=x+"px";_949.style.top=y+"px";_949.style.font="normal 11px verdana";_949.style.paddingLeft="5px";_949.style.position="absolute";return _949;};draw2d.PropertyPage.prototype.createLabelElement=function(text,x,y){var _94d=document.createElement("div");_94d.style.left=x+"px";_94d.style.top=y+"px";_94d.style.position="absolute";_94d.className="property_panel_label";_94d.innerHTML=text;return _94d;};