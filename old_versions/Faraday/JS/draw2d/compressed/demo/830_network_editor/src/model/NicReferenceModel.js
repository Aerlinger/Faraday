/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.NicReferenceModel=function(_121a){draw2d.AbstractCloudNodeModel.call(this);this.reference=_121a;};draw2d.NicReferenceModel.prototype=new draw2d.AbstractCloudNodeModel();draw2d.NicReferenceModel.prototype.type="draw2d.NicReferenceModel";draw2d.NicReferenceModel.prototype.tag="nic";draw2d.NicReferenceModel.prototype.getPersistentAttributes=function(){var _121b={attributes:{}};_121b.attributes.reference=this.reference;return _121b;};