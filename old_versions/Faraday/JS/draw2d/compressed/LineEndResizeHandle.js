/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.LineEndResizeHandle=function(_17b){draw2d.ResizeHandle.call(this,_17b,9);this.setDimension(10,10);this.setBackgroundColor(new draw2d.Color(0,255,0));this.setZOrder(10000);};draw2d.LineEndResizeHandle.prototype=new draw2d.ResizeHandle();draw2d.LineEndResizeHandle.prototype.type="draw2d.LineEndResizeHandle";draw2d.LineEndResizeHandle.prototype.onDragend=function(){if(this.workflow.currentSelection instanceof draw2d.Connection){if(this.command!==null){this.command.cancel();}}else{if(this.command!==null){this.workflow.getCommandStack().execute(this.command);}}this.command=null;};draw2d.LineEndResizeHandle.prototype.onDragstart=function(x,y){if(!this.canDrag){return false;}this.command=this.workflow.currentSelection.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.MOVE));return this.command!==null;};draw2d.LineEndResizeHandle.prototype.onDrag=function(){var oldX=this.getX();var oldY=this.getY();draw2d.Rectangle.prototype.onDrag.call(this);var _180=oldX-this.getX();var _181=oldY-this.getY();var _182=this.workflow.currentSelection.getEndPoint();var line=this.workflow.currentSelection;line.setEndPoint(_182.x-_180,_182.y-_181);line.isMoving=true;};draw2d.LineEndResizeHandle.prototype.onDrop=function(_184){var line=this.workflow.currentSelection;line.isMoving=false;if(line instanceof draw2d.Connection){this.command.setNewPorts(line.getSource(),_184);this.getWorkflow().getCommandStack().execute(this.command);}this.command=null;};