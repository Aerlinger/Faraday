/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.InputBoxFigure=function(_9){if(_9){this.title=_9;}else{this.title="";}draw2d.Figure.call(this);};draw2d.InputBoxFigure.prototype=new draw2d.Figure();draw2d.InputBoxFigure.prototype.type="InputBoxFigure";draw2d.InputBoxFigure.prototype.createHTMLElement=function(){var _a=draw2d.Figure.prototype.createHTMLElement.call(this);_a.style.margin="0px";_a.style.padding="0px";this.ui_element=document.createElement("div");this.ui_element.style.position="absolute";this.ui_element.style.left="0px";this.ui_element.style.top="0px";this.ui_element.style.cursor="move";this.ui_element.style.borderStyle="inset";_a.appendChild(this.ui_element);return _a;};draw2d.InputBoxFigure.prototype.setDimension=function(w,h){draw2d.Figure.prototype.setDimension.call(this,w,20);if(this.ui_element!==null){this.ui_element.style.width=(this.getWidth()-4)+"px";this.ui_element.style.height=(this.getHeight()-4)+"px";}};draw2d.InputBoxFigure.prototype.getMinWidth=function(){return 50;};