/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolbarButtonGroup=function(){this.buttons=new draw2d.ArrayList();this.html=null;};draw2d.ToolbarButtonGroup.prototype.getHTMLElement=function(){if(this.html===null){this.html=new Element("ul");this.html.className="toolbar_button_group";}return this.html;};draw2d.ToolbarButtonGroup.prototype.addElement=function(_d70){this.getHTMLElement().appendChild(_d70.getHTMLElement());if(this.buttons.getSize()===0){this.buttons.add(_d70);$(_d70.getHTMLElement()).addClassName("first_button");}else{if(this.buttons.getSize()===1){this.buttons.add(_d70);$(_d70.getHTMLElement()).addClassName("last_button");}else{var _d71=this.buttons.getLastElement();$(_d71.getHTMLElement()).removeClassName("last_button");$(_d71.getHTMLElement()).addClassName("center_button");this.buttons.add(_d70);$(_d70.getHTMLElement()).addClassName("last_button");}}};