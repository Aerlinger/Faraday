/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolCircleUnfilled=function(_64){draw2d.ToolGeneric.call(this,_64);this.setDimension(24,24);};draw2d.ToolCircleUnfilled.prototype=new draw2d.ToolGeneric();draw2d.ToolCircleUnfilled.prototype.type="ToolCircleUnfilled";draw2d.ToolCircleUnfilled.prototype.execute=function(x,y){var _67=new draw2d.Circle();_67.setDimension(100,100);this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_67,x,y));draw2d.ToolGeneric.prototype.execute.call(this,x,y);};