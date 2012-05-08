/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolInputBox=function(_b58){draw2d.ToolGeneric.call(this,_b58);this.setDimension(25,25);};draw2d.ToolInputBox.prototype=new draw2d.ToolGeneric;draw2d.ToolInputBox.prototype.type="ToolInputBox";draw2d.ToolInputBox.prototype.execute=function(x,y){var _b5b=new draw2d.InputBoxFigure();_b5b.setDimension(100,20);this.palette.workflow.addFigure(_b5b,x,y);var _b5c=this.palette.workflow.getBestCompartmentFigure(x,y);if(_b5c){_b5c.addChild(_b5b);}draw2d.ToolGeneric.prototype.execute.call(this,x,y);};