/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.StorageReferenceModel=function(_61){draw2d.AbstractCloudNodeModel.call(this);this.reference=_61;};draw2d.StorageReferenceModel.prototype=new draw2d.AbstractCloudNodeModel();draw2d.StorageReferenceModel.prototype.type="draw2d.StorageReferenceModel";draw2d.StorageReferenceModel.prototype.tag="storage";draw2d.StorageReferenceModel.prototype.getPersistentAttributes=function(){var _62=draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);_62.attributes.reference=this.reference;return _62;};