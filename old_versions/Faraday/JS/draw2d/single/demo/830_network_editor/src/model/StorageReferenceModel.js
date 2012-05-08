draw2d.StorageReferenceModel=function(_1d4a){
draw2d.AbstractCloudNodeModel.call(this);
this.reference=_1d4a;
};
draw2d.StorageReferenceModel.prototype=new draw2d.AbstractCloudNodeModel();
draw2d.StorageReferenceModel.prototype.type="draw2d.StorageReferenceModel";
draw2d.StorageReferenceModel.prototype.tag="storage";
draw2d.StorageReferenceModel.prototype.getPersistentAttributes=function(){
var _1d4b=draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);
_1d4b.attributes.reference=this.reference;
return _1d4b;
};
