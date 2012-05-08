/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.CommandConnectMount=function(_12fd,_12fe){draw2d.Command.call(this,"Connect Storage");this.source=_12fd;this.target=_12fe;this.model=null;if(this.source===null||this.target===null){throw "Source and target must be set to create a new  draw2d.CommandConnectNodes object";}};draw2d.CommandConnectMount.prototype=new draw2d.Command();draw2d.CommandConnectMount.prototype.type="draw2d.CommandConnectMount";draw2d.CommandConnectMount.prototype.setConnection=function(_12ff){this.connection=_12ff;};draw2d.CommandConnectMount.prototype.execute=function(){this.redo();};draw2d.CommandConnectMount.prototype.redo=function(){if(this.model===null){this.model=new draw2d.MountModel(this.source.getId(),this.target.getId());}this.source.addConnectionModel(this.model);};draw2d.CommandConnectMount.prototype.undo=function(){this.source.removeConnectionModel(this.model);};