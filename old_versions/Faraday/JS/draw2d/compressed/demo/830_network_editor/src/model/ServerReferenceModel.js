/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ServerReferenceModel=function(_143d){draw2d.AbstractCloudNodeModel.call(this);this.reference=_143d;};draw2d.ServerReferenceModel.prototype=new draw2d.AbstractCloudNodeModel();draw2d.ServerReferenceModel.prototype.type="draw2d.ServerReferenceModel";draw2d.ServerReferenceModel.prototype.tag="server";draw2d.ServerReferenceModel.prototype.getReference=function(){return this.reference;};draw2d.ServerReferenceModel.prototype.getPersistentAttributes=function(){var _143e=draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);_143e.attributes.reference=this.reference;return _143e;};