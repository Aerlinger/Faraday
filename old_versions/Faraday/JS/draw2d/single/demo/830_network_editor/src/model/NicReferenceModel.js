draw2d.NicReferenceModel=function(_2f03){
draw2d.AbstractCloudNodeModel.call(this);
this.reference=_2f03;
};
draw2d.NicReferenceModel.prototype=new draw2d.AbstractCloudNodeModel();
draw2d.NicReferenceModel.prototype.type="draw2d.NicReferenceModel";
draw2d.NicReferenceModel.prototype.tag="nic";
draw2d.NicReferenceModel.prototype.getPersistentAttributes=function(){
var _2f04={attributes:{}};
_2f04.attributes.reference=this.reference;
return _2f04;
};
