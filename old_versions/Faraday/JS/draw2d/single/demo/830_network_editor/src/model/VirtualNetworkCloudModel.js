draw2d.VirtualNetworkCloudModel=function(id){
this.nodes=new draw2d.ArrayList();
this.id=id;
this.dbid="";
this.name=draw2d.Configuration.DEFAULT_NETWORK_NAME;
};
draw2d.VirtualNetworkCloudModel.prototype=new draw2d.AbstractObjectModel();
draw2d.VirtualNetworkCloudModel.prototype.type="draw2d.VirtualNetworkCloudModel";
draw2d.VirtualNetworkCloudModel.prototype.tag="vnetwork";
draw2d.VirtualNetworkCloudModel.prototype.getModelChildren=function(){
return this.nodes;
};
draw2d.VirtualNetworkCloudModel.prototype.setName=function(name){
var save=this.name;
if(save===name){
return;
}
this.name=name;
this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED,save,name);
};
draw2d.VirtualNetworkCloudModel.prototype.getName=function(){
return this.name;
};
draw2d.VirtualNetworkCloudModel.prototype.getConnectionModels=function(){
var _27b1=new draw2d.ArrayList();
var count=this.nodes.getSize();
for(var i=0;i<count;i++){
var model=this.nodes.get(i);
_27b1.addAll(model.getConnectionModels());
}
return _27b1;
};
draw2d.VirtualNetworkCloudModel.prototype.getCloudNodeModels=function(){
return this.nodes;
};
draw2d.VirtualNetworkCloudModel.prototype.getServerModels=function(){
var _27b5=new draw2d.ArrayList();
for(var i=0;i<this.nodes.getSize();i++){
var node=this.nodes.get(i);
if(node instanceof draw2d.ServerModel){
_27b5.add(node);
}
}
return _27b5;
};
draw2d.VirtualNetworkCloudModel.prototype.getSwitchModels=function(){
var _27b8=new draw2d.ArrayList();
for(var i=0;i<this.nodes.getSize();i++){
var node=this.nodes.get(i);
if(node instanceof draw2d.SwitchModel){
_27b8.add(node);
}
}
return _27b8;
};
draw2d.VirtualNetworkCloudModel.prototype.getStorageModels=function(){
var _27bb=new draw2d.ArrayList();
for(var i=0;i<this.nodes.getSize();i++){
var node=this.nodes.get(i);
if(node instanceof draw2d.StorageModel){
_27bb.add(node);
}
}
return _27bb;
};
draw2d.VirtualNetworkCloudModel.prototype.getMountModels=function(){
var _27be=new draw2d.ArrayList();
var cons=this.getConnectionModels();
for(var i=0;i<cons.getSize();i++){
var con=cons.get(i);
if(con instanceof draw2d.MountModel){
_27be.add(con);
}
}
return _27be;
};
draw2d.VirtualNetworkCloudModel.prototype.addCloudNodeModel=function(model){
this.nodes.add(model);
model.setModelParent(this);
this.firePropertyChange(draw2d.AbstractObjectModel.EVENT_ELEMENT_ADDED,null,model);
};
draw2d.VirtualNetworkCloudModel.prototype.removeCloudNodeModel=function(model){
if(this.nodes.remove(model)!==null){
model.setModelParent(null);
this.firePropertyChange(draw2d.AbstractObjectModel.EVENT_ELEMENT_REMOVED,model,null);
}
};
draw2d.VirtualNetworkCloudModel.prototype.getCloudNodeModel=function(_27c4){
var count=this.nodes.getSize();
for(var i=0;i<count;i++){
var _27c7=this.nodes.get(i);
if(_27c7.getId()==_27c4){
return _27c7;
}
}
return null;
};
draw2d.VirtualNetworkCloudModel.prototype.getDbId=function(){
return this.dbid;
};
draw2d.VirtualNetworkCloudModel.prototype.getId=function(){
return this.id;
};
draw2d.VirtualNetworkCloudModel.prototype.setId=function(id){
this.id=id;
};
draw2d.VirtualNetworkCloudModel.prototype.getNetworkCloudModel=function(){
return this;
};
draw2d.VirtualNetworkCloudModel.prototype.getPersistentAttributes=function(){
var _27c9=draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);
_27c9.attributes.id=this.id;
_27c9.attributes.xmlns=this.xmlns;
_27c9.attributes["xmlns:xsi"]=this["xmlns:xsi"];
_27c9.attributes["xsi:schemaLocation"]=this["xsi:schemaLocation"];
if(this.dbid.length>0){
_27c9.dbid=this.dbid;
}
_27c9.name=this.name;
_27c9.switches=this.getSwitchModels().asArray();
_27c9.servers=this.getServerModels().asArray();
_27c9.storage=this.getStorageModels().asArray();
_27c9.mounts=this.getMountModels().asArray();
return _27c9;
};
