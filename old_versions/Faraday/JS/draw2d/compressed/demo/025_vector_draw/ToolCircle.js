/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolCircle=function(_d){draw2d.ToolGeneric.call(this,_d);this.setDimension(24,24);};draw2d.ToolCircle.prototype=new draw2d.ToolGeneric();draw2d.ToolCircle.prototype.type="ToolCircle";draw2d.ToolCircle.prototype.execute=function(x,y){var _10=new draw2d.Circle();_10.setDimension(100,100);_10.setBackgroundColor(new draw2d.Color(255,255,255));this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_10,x,y));draw2d.ToolGeneric.prototype.execute.call(this,x,y);};