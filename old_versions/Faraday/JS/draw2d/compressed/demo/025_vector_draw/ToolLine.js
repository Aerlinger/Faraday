/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolLine=function(_1e7){draw2d.ToolGeneric.call(this,_1e7);this.setDimension(24,24);};draw2d.ToolLine.prototype=new draw2d.ToolGeneric();draw2d.ToolLine.prototype.type="ToolLine";draw2d.ToolLine.prototype.execute=function(x,y){var _1ea=new draw2d.Line();_1ea.setStartPoint(x,y);_1ea.setEndPoint(x+100,y+100);this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_1ea));draw2d.ToolGeneric.prototype.execute.call(this,x,y);};