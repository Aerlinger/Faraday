/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.NicModel=function(id){draw2d.AbstractCloudNodeModel.call(this,id);this.ipaddress=draw2d.Configuration.DEFAULT_NIC_IPADDRESS;this.dbid="";this.server=null;this["switch"]=null;};draw2d.NicModel.prototype=new draw2d.AbstractCloudNodeModel();draw2d.NicModel.prototype.type="draw2d.NicModel";draw2d.NicModel.prototype.tag="nic";draw2d.NicModel.prototype.getSwitchReferenceModel=function(){return this["switch"];};draw2d.NicModel.prototype.getServerReferenceModel=function(){return this.server;};draw2d.NicModel.prototype.setSwitchReferenceModel=function(_141d){this["switch"]=_141d;};draw2d.NicModel.prototype.setServerReferenceModel=function(_141e){this.server=_141e;};draw2d.NicModel.prototype.setIpAddress=function(ip){this.ipaddress=ip;};draw2d.NicModel.prototype.getIpAddress=function(){return this.ipaddress;};draw2d.NicModel.prototype.getPersistentAttributes=function(){var _1420=draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);_1420.attributes.id=this.id;if(this.dbid.length>0){_1420.dbid=this.dbid;}if(this.ipaddress.length>0){_1420.ipaddress=this.ipaddress;}if(this.server!==null){_1420.server=this.server;}if(this["switch"]!==null){_1420["switch"]=this["switch"];}return _1420;};