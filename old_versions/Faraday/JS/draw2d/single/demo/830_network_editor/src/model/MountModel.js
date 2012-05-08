draw2d.MountModel=function(_243a,_243b,id){
draw2d.AbstractConnectionModel.call(this);
this.sourceNodeId=_243a;
this.sourcePort="output";
this.targetNodeId=_243b;
this.targetPort="input";
if(id!==undefined&&id!==null){
this.id=id;
draw2d.IdGenerator.reserve(this.id);
}else{
this.id=draw2d.IdGenerator.getNext();
}
this.dbid="";
this.order=draw2d.Configuration.DEFAULT_MOUNT_ORDER;
};
draw2d.MountModel.EVENT_SOURCE_CHANGED="source changed";
draw2d.MountModel.EVENT_TARGET_CHANGED="target changed";
draw2d.MountModel.EVENT_PROPERTY_CHANGED="property changed";
draw2d.MountModel.prototype=new draw2d.AbstractConnectionModel();
draw2d.MountModel.prototype.type="draw2d.MountModel";
draw2d.MountModel.prototype.tag="mount";
draw2d.MountModel.prototype.setOrder=function(order){
var save=this.order;
if(save===order){
return;
}
this.order=order;
this.firePropertyChange(draw2d.MountModel.EVENT_PROPERTY_CHANGED,save,this.order);
};
draw2d.MountModel.prototype.getOrder=function(){
return this.order;
};
draw2d.MountModel.prototype.setSourceModel=function(model){
var save1=this.sourceNodeId;
var save2=this.sourcePort;
this.sourceNodeId=model.getId();
this.sourcePort="output";
if(save1===this.sourceNodeId&&save2===this.sourcePort){
return;
}
this.firePropertyChange(draw2d.MountModel.EVENT_SOURCE_CHANGED,null,model);
};
draw2d.MountModel.prototype.getSourceModel=function(){
return this.getNetworkCloudModel().getCloudNodeModel(this.sourceNodeId);
};
draw2d.MountModel.prototype.setTargetModel=function(model){
var save1=this.targetNodeId;
var save2=this.targetPort;
this.targetNodeId=model.getId();
this.targetField="input";
if(save1==this.targetNodeId&&save2==this.targetPort){
return;
}
this.firePropertyChange(draw2d.MountModel.EVENT_TARGET_CHANGED,null,model);
};
draw2d.MountModel.prototype.getTargetModel=function(){
return this.getNetworkCloudModel().getCloudNodeModel(this.targetNodeId);
};
draw2d.MountModel.prototype.getSourcePortName=function(){
return this.sourcePort;
};
draw2d.MountModel.prototype.getTargetPortName=function(){
return this.targetPort;
};
draw2d.MountModel.prototype.getNetworkCloudModel=function(){
return this.getModelParent().getNetworkCloudModel();
};
draw2d.MountModel.prototype.getPersistentAttributes=function(){
var _2445={attributes:{}};
_2445.attributes.id=this.id;
_2445.storage=this.getSourceModel().createReferenceModel();
_2445.server=this.getTargetModel().createReferenceModel();
if(this.order.length>0){
_2445.order=this.order;
}
if(this.dbid.length>0){
_2445.dbid=this.dbid;
}
return _2445;
};
