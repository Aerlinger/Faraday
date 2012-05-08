/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.CommandConnectNic=function(_a1f,_a20){draw2d.Command.call(this,"Connect Switch");if(_a1f===null||_a20===null){throw "Source and target must be set to create a new  draw2d.CommandConnectNodes object (draw2d.CommandConnectNic.constructor)";}if(!(_a1f instanceof draw2d.ServerModel)){throw "Source must be type of class draw2d.ServerModel. (draw2d.CommandConnectNic.constructor)";}if(!(_a20 instanceof draw2d.SwitchModel)){throw "Target must be type of class draw2d.SwitchModel. (draw2d.CommandConnectNic.constructor)";}this.source=_a1f;this.target=_a20;this.model=null;};draw2d.CommandConnectNic.prototype=new draw2d.Command();draw2d.CommandConnectNic.prototype.type="draw2d.CommandConnectNic";draw2d.CommandConnectNic.prototype.setConnection=function(_a21){this.connection=_a21;};draw2d.CommandConnectNic.prototype.execute=function(){this.redo();};draw2d.CommandConnectNic.prototype.redo=function(){if(this.model===null){this.model=new draw2d.NicConnectionModel(this.source.getId(),this.target.getId());var nic=new draw2d.NicModel();nic.setServerReferenceModel(new draw2d.ServerReferenceModel(this.source.getId()));nic.setSwitchReferenceModel(new draw2d.SwitchReferenceModel(this.target.getId()));this.model.nicModel=nic;}this.source.getNicsModel().addNicModel(this.model.nicModel);this.source.addConnectionModel(this.model);};draw2d.CommandConnectNic.prototype.undo=function(){this.source.removeConnectionModel(this.model);this.source.getNicsModel().removeNicModel(this.model.nicModel);};