/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.SwitchPropertyPage=function(){draw2d.PropertyPage.call(this);this.html=document.createElement("div");this.html.style.width="100%";this.html.style.height="100%";this.header=this.createLabelElement(draw2d.I18N.PROPERTYPANEL_HEADER_SWITCH,0,0);this.header.className="panel_header";this.html.appendChild(this.header);this.nameLabel=this.createLabelElement(draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_NAME,10,45);this.nameLabel.style.color="gray";this.html.appendChild(this.nameLabel);this.nameText=document.createElement("input");this.nameText.type="text";var _a3c=this;if(editor.isReadonly()){this.nameText.disabled="true";}else{Event.observe(this.nameText,"keyup",function(e){var func=_a3c.currentModel.setName.bind(_a3c.currentModel);var _a3f=new draw2d.CommandChangeProperty(editor.getGraphicalViewer(),func,_a3c.currentModel.getName(),_a3c.nameText.value);editor.executeCommand(_a3f);});}this.nameText.style.position="absolute";this.nameText.style.width="110px";this.nameText.style.top="65px";this.nameText.style.left="10px";this.html.appendChild(this.nameText);};draw2d.SwitchPropertyPage.prototype=new draw2d.PropertyPage();draw2d.SwitchPropertyPage.prototype.type="draw2d.SwitchPropertyPage";draw2d.SwitchPropertyPage.prototype.init=function(_a40){this.currentModel=_a40;this.nameText.value=_a40.getName();};draw2d.SwitchPropertyPage.prototype.deinit=function(){};draw2d.SwitchPropertyPage.prototype.getHTMLElement=function(){return this.html;};