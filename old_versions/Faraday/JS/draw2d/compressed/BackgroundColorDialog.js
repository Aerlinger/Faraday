/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.BackgroundColorDialog=function(_7ad){draw2d.ColorDialog.call(this);this.figure=_7ad;var _7ae=_7ad.getBackgroundColor();if(_7ae!==null){this.updateH(this.rgb2hex(_7ae.getRed(),_7ae.getGreen(),_7ae.getBlue()));}};draw2d.BackgroundColorDialog.prototype=new draw2d.ColorDialog();draw2d.BackgroundColorDialog.prototype.type="draw2d.BackgroundColorDialog";draw2d.BackgroundColorDialog.prototype.onOk=function(){var _7af=this.workflow;draw2d.ColorDialog.prototype.onOk.call(this);if(typeof this.figure.setBackgroundColor=="function"){_7af.getCommandStack().execute(new draw2d.CommandSetBackgroundColor(this.figure,this.getSelectedColor()));if(_7af.getCurrentSelection()==this.figure){_7af.setCurrentSelection(this.figure);}}};