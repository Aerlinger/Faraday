/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.AnnotationDialog=function(_12dd){this.figure=_12dd;draw2d.Dialog.call(this);this.setDimension(400,100);};draw2d.AnnotationDialog.prototype=new draw2d.Dialog();draw2d.AnnotationDialog.prototype.type="draw2d.AnnotationDialog";draw2d.AnnotationDialog.prototype.createHTMLElement=function(){var item=draw2d.Dialog.prototype.createHTMLElement.call(this);var _12df=document.createElement("form");_12df.style.position="absolute";_12df.style.left="10px";_12df.style.top="30px";_12df.style.width="375px";_12df.style.font="normal 10px verdana";item.appendChild(_12df);this.label=document.createTextNode("Text");_12df.appendChild(this.label);this.input=document.createElement("input");this.input.style.border="1px solid gray";this.input.style.font="normal 10px verdana";this.input.type="text";var value=this.figure.getText();if(value){this.input.value=value;}else{this.input.value="";}this.input.style.width="100%";_12df.appendChild(this.input);this.input.focus();return item;};draw2d.AnnotationDialog.prototype.onOk=function(){this.workflow.getCommandStack().execute(new draw2d.CommandSetText(this.figure,this.input.value));this.workflow.removeFigure(this);};