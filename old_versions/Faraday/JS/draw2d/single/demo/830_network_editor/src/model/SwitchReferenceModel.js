draw2d.SwitchReferenceModel=function(_24db){
draw2d.AbstractCloudNodeModel.call(this);
this.reference=_24db;
};
draw2d.SwitchReferenceModel.prototype=new draw2d.AbstractCloudNodeModel();
draw2d.SwitchReferenceModel.prototype.type="draw2d.SwitchReferenceModel";
draw2d.SwitchReferenceModel.prototype.tag="switch";
draw2d.SwitchReferenceModel.prototype.getReference=function(){
return this.reference;
};
draw2d.SwitchReferenceModel.prototype.getPersistentAttributes=function(){
var _24dc=draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);
_24dc.attributes.reference=this.reference;
return _24dc;
};
