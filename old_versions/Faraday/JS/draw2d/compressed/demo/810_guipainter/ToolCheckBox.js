/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolCheckBox=function(_1ab3){draw2d.ToolGeneric.call(this,_1ab3);this.setDimension(25,25);};draw2d.ToolCheckBox.prototype=new draw2d.ToolGeneric;draw2d.ToolCheckBox.prototype.type="ToolCheckBox";draw2d.ToolCheckBox.prototype.execute=function(x,y){var _1ab6=new draw2d.CheckBoxFigure();_1ab6.setDimension(100,20);var _1ab7=this.palette.workflow.getBestCompartmentFigure(x,y);this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_1ab6,x,y,_1ab7));draw2d.ToolGeneric.prototype.execute.call(this,x,y);};