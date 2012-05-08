draw2d.ImageModel=function(id){
draw2d.AbstractCloudNodeModel.call(this,id);
this.index=0;
this.name=draw2d.Configuration.DEFAULT_IMAGE_NAME;
this["file-name"]=draw2d.Configuration.DEFAULT_IMAGE_FILENAME;
this["image-type"]=draw2d.Configuration.DEFAULT_IMAGE_IMAGETYPE;
this.writeback=draw2d.Configuration.DEFAULT_IMAGE_WRITEBACK;
this.dbid=null;
this.order=draw2d.Configuration.DEFAULT_IMAGE_ORDER;
this["boot-order"]=draw2d.Configuration.DEFAULT_IMAGE_BOOTORDER;
this.readonly=draw2d.Configuration.DEFAULT_IMAGE_READONLY;
};
draw2d.ImageModel.prototype=new draw2d.AbstractCloudNodeModel();
draw2d.ImageModel.prototype.type="draw2d.ImageModel";
draw2d.ImageModel.prototype.tag="image";
draw2d.ImageModel.TYPE=new draw2d.ArrayList();
draw2d.ImageModel.TYPE.add("cdrom");
draw2d.ImageModel.TYPE.add("fdd");
draw2d.ImageModel.TYPE.add("hdd");
draw2d.ImageModel.TYPE.add("usb");
draw2d.ImageModel.WRITEBACK=new draw2d.ArrayList();
draw2d.ImageModel.WRITEBACK.add("inplace");
draw2d.ImageModel.WRITEBACK.add("snapshot");
draw2d.ImageModel.WRITEBACK.add("none");
draw2d.ImageModel.prototype.setName=function(name){
var save=this.name;
if(save===name){
return;
}
this.name=name;
this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED,save,name);
};
draw2d.ImageModel.prototype.setIndex=function(index){
var save=this.index;
if(save===index){
return;
}
this.index=index;
this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED,save,index);
};
draw2d.ImageModel.prototype.getIndex=function(){
return this.index;
};
draw2d.ImageModel.prototype.getName=function(){
return this.name;
};
draw2d.ImageModel.prototype.getFileName=function(){
return this["file-name"];
};
draw2d.ImageModel.prototype.setFileName=function(_24aa){
var save=this.getFileName();
if(save===_24aa){
return;
}
this["file-name"]=_24aa;
this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED,save,_24aa);
};
draw2d.ImageModel.prototype.getImageType=function(){
return this["image-type"];
};
draw2d.ImageModel.prototype.setImageType=function(_24ac){
var save=this.getImageType();
if(save===_24ac){
return;
}
if(draw2d.ImageModel.TYPE.indexOf(_24ac)===-1){
throw "Invalid image type ["+_24ac+"] in [draw2d.ImageModel.prototype.setImageType]. Valid values "+draw2d.ImageModel.TYPE.asArray().toJSON();
}
this["image-type"]=_24ac;
this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED,save,_24ac);
};
draw2d.ImageModel.prototype.getWriteback=function(){
return this.writeback;
};
draw2d.ImageModel.prototype.setWriteback=function(_24ae){
var save=this.getWriteback();
if(save===_24ae){
return;
}
if(draw2d.ImageModel.WRITEBACK.indexOf(_24ae)===-1){
throw "Invalid writeback type ["+_24ae+"] in [draw2d.ImageModel.prototype.setWriteback]. Valid values "+draw2d.ImageModel.WRITEBACK.asArray().toJSON();
}
this.writeback=_24ae;
this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED,save,_24ae);
};
draw2d.ImageModel.prototype.getOrder=function(){
return this.order;
};
draw2d.ImageModel.prototype.setOrder=function(order){
order=parseInt(order,10);
if(isNaN(order)){
return;
}
var save=this.getOrder();
if(save===order){
return;
}
this.order=order;
this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED,save,order);
};
draw2d.ImageModel.prototype.getBootOrder=function(){
var order=parseInt(this["boot-order"],10);
if(isNaN(order)){
order=1;
}
return order;
};
draw2d.ImageModel.prototype.setBootOrder=function(order){
order=parseInt(order,10);
if(isNaN(order)){
return;
}
var save=this.getBootOrder();
if(save===order){
return;
}
this["boot-order"]=order;
this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED,save,order);
};
draw2d.ImageModel.prototype.getReadonly=function(){
return this.readonly;
};
draw2d.ImageModel.prototype.setReadonly=function(_24b5){
var save=this.getReadonly();
if(save===_24b5){
return;
}
this.readonly=_24b5;
this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED,save,_24b5);
};
draw2d.ImageModel.prototype.getPersistentAttributes=function(){
var _24b7=draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);
_24b7.attributes.id=this.id;
_24b7.attributes.index=this.index;
_24b7.name=this.name;
_24b7["file-name"]=this["file-name"];
_24b7["image-type"]=this["image-type"];
_24b7.writeback=this.writeback;
if(this.dbid){
_24b7.dbid=this.dbid;
}
_24b7.order=this.order;
if(this["boot-order"]){
_24b7["boot-order"]=this["boot-order"];
}
if(this.index!==null){
_24b7["index"]=this.index;
}
_24b7.readonly=this.readonly;
return _24b7;
};
