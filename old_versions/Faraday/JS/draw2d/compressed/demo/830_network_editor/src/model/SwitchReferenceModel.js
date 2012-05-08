/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.SwitchReferenceModel=function(_7f2){draw2d.AbstractCloudNodeModel.call(this);this.reference=_7f2;};draw2d.SwitchReferenceModel.prototype=new draw2d.AbstractCloudNodeModel();draw2d.SwitchReferenceModel.prototype.type="draw2d.SwitchReferenceModel";draw2d.SwitchReferenceModel.prototype.tag="switch";draw2d.SwitchReferenceModel.prototype.getReference=function(){return this.reference;};draw2d.SwitchReferenceModel.prototype.getPersistentAttributes=function(){var _7f3=draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);_7f3.attributes.reference=this.reference;return _7f3;};