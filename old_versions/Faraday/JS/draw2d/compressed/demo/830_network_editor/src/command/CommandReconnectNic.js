/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.CommandReconnectNic=function(con){draw2d.Command.call(this,"Reconnect Switch");this.con=con;this.oldSourceModel=con.getSourceModel();this.oldTargetModel=con.getTargetModel();};draw2d.CommandReconnectNic.prototype=new draw2d.Command();draw2d.CommandReconnectNic.prototype.type="draw2d.CommandReconnectNic";draw2d.CommandReconnectNic.prototype.canExecute=function(){return true;};draw2d.CommandReconnectNic.prototype.setNewPorts=function(_7a8,_7a9){this.newSourceModel=_7a8.getParent().getModel();this.newTargetModel=_7a9.getParent().getModel();};draw2d.CommandReconnectNic.prototype.execute=function(){this.redo();};draw2d.CommandReconnectNic.prototype.cancel=function(){this.con.setSourceModel(this.oldSourceModel);this.con.setTargetModel(this.oldTargetModel);};draw2d.CommandReconnectNic.prototype.undo=function(){this.con.setSourceModel(this.oldSourceModel);this.con.setTargetModel(this.oldTargetModel);};draw2d.CommandReconnectNic.prototype.redo=function(){this.con.setSourceModel(this.newSourceModel);this.con.setTargetModel(this.newTargetModel);};