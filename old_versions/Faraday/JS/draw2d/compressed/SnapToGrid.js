/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.SnapToGrid=function(_d5f){draw2d.SnapToHelper.call(this,_d5f);};draw2d.SnapToGrid.prototype=new draw2d.SnapToHelper();draw2d.SnapToGrid.prototype.type="draw2d.SnapToGrid";draw2d.SnapToGrid.prototype.snapPoint=function(_d60,_d61,_d62){_d62.x=this.workflow.gridWidthX*Math.floor(((_d61.x+this.workflow.gridWidthX/2)/this.workflow.gridWidthX));_d62.y=this.workflow.gridWidthY*Math.floor(((_d61.y+this.workflow.gridWidthY/2)/this.workflow.gridWidthY));return 0;};draw2d.SnapToGrid.prototype.snapRectangle=function(_d63,_d64){_d64.x=_d63.x;_d64.y=_d63.y;_d64.w=_d63.w;_d64.h=_d63.h;return 0;};