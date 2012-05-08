draw2d.AbstractCloudNodeModel=function(id){
draw2d.AbstractObjectModel.call(this);
if(id!==undefined&&id!==null){
this.id=id;
draw2d.IdGenerator.reserve(this.id);
}else{
this.id=draw2d.IdGenerator.getNext();
}
this.connections=new draw2d.ArrayList();
};
draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED="property changed";
draw2d.AbstractCloudNodeModel.EVENT_POSITION_CHANGED="position changed";
draw2d.AbstractCloudNodeModel.prototype=new draw2d.AbstractObjectModel();
draw2d.AbstractCloudNodeModel.prototype.type="draw2d.AbstractCloudNodeModel";
draw2d.AbstractCloudNodeModel.prototype.setId=function(id){
var save=this.id;
this.id=id;
this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_ID_CHANGED,save,this.id);
};
draw2d.AbstractCloudNodeModel.prototype.getId=function(){
return this.id;
};
draw2d.AbstractCloudNodeModel.prototype.getNetworkCloudModel=function(){
return this.getModelParent().getNetworkCloudModel();
};
draw2d.AbstractCloudNodeModel.prototype.getConnectionModels=function(){
return this.connections;
};
draw2d.AbstractCloudNodeModel.prototype.addConnectionModel=function(_248d){
if(!(_248d instanceof draw2d.AbstractConnectionModel)){
throw "Invalid parameter type in [AbstractCloudNodeModel.prototype.addConnectionModel]";
}
if(this.connections.indexOf(_248d)===-1){
this.connections.add(_248d);
_248d.setModelParent(this);
this.firePropertyChange(draw2d.AbstractObjectModel.EVENT_CONNECTION_ADDED,null,_248d);
}
};
draw2d.AbstractCloudNodeModel.prototype.removeConnectionModel=function(_248e){
if(!(_248e instanceof draw2d.AbstractConnectionModel)){
throw "Invalid parameter type in [AbstractCloudNodeModel.prototype.removeConnectionModel]";
}
if(this.connections.remove(_248e)!==null){
_248e.setModelParent(null);
this.firePropertyChange(draw2d.AbstractObjectModel.EVENT_CONNECTION_REMOVED,_248e,null);
}
};
draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes=function(){
var _248f={attributes:{}};
return _248f;
};
