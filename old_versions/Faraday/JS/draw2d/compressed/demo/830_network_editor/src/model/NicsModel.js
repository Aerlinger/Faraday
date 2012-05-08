/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.NicsModel=function(){draw2d.AbstractCloudNodeModel.call(this);this.nics=new draw2d.ArrayList();};draw2d.NicsModel.prototype=new draw2d.AbstractCloudNodeModel();draw2d.NicsModel.prototype.type="draw2d.NicsModel";draw2d.NicsModel.prototype.tag="nics";draw2d.NicsModel.prototype.addNicModel=function(model){this.nics.add(model);this.firePropertyChange(draw2d.AbstractObjectModel.EVENT_ELEMENT_ADDED,null,model);};draw2d.NicsModel.prototype.removeNicModel=function(model){if(this.nics.remove(model)!==null){this.firePropertyChange(draw2d.AbstractObjectModel.EVENT_ELEMENT_REMOVED,model,null);}};draw2d.NicsModel.prototype.removeNic=function(nicId){for(var i=0;i<this.nics.getSize();i++){var nic=this.nics.get(i);if(nic.getId()===nicId){this.removeNicModel(nic);break;}}};draw2d.NicsModel.prototype.getNicModel=function(nicId){for(var i=0;i<this.nics.getSize();i++){var nic=this.nics.get(i);if(nic.getId()===nicId){return nic;}}return null;};draw2d.NicsModel.prototype.getPersistentAttributes=function(){var _1c9d=draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);_1c9d.attributes.id=this.id;_1c9d.nics=this.nics.asArray();return _1c9d;};