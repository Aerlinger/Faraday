draw2d.ServerReferenceModel=function(_3126){
draw2d.AbstractCloudNodeModel.call(this);
this.reference=_3126;
};
draw2d.ServerReferenceModel.prototype=new draw2d.AbstractCloudNodeModel();
draw2d.ServerReferenceModel.prototype.type="draw2d.ServerReferenceModel";
draw2d.ServerReferenceModel.prototype.tag="server";
draw2d.ServerReferenceModel.prototype.getReference=function(){
return this.reference;
};
draw2d.ServerReferenceModel.prototype.getPersistentAttributes=function(){
var _3127=draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);
_3127.attributes.reference=this.reference;
return _3127;
};
