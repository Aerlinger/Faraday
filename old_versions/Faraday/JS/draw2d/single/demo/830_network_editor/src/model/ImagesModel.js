draw2d.ImagesModel=function(){
draw2d.AbstractCloudNodeModel.call(this);
this.images=new draw2d.ArrayList();
};
draw2d.ImagesModel.prototype=new draw2d.AbstractCloudNodeModel();
draw2d.ImagesModel.prototype.type="draw2d.ImagesModel";
draw2d.ImagesModel.prototype.tag="images";
draw2d.ImagesModel.prototype.addImageModel=function(model){
this.images.add(model);
this.firePropertyChange(draw2d.AbstractObjectModel.EVENT_ELEMENT_ADDED,null,model);
};
draw2d.ImagesModel.prototype.removeImageModel=function(model){
if(this.images.remove(model)!==null){
this.firePropertyChange(draw2d.AbstractObjectModel.EVENT_ELEMENT_REMOVED,model,null);
}
};
draw2d.ImagesModel.prototype.getImageModels=function(){
return this.images;
};
draw2d.ImagesModel.prototype.renumber=function(){
for(var i=0;i<this.images.getSize();i++){
this.images.get(i).setIndex(i);
}
};
draw2d.ImagesModel.prototype.getPersistentAttributes=function(){
var _1d18=draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);
this.renumber();
_1d18.img=this.images.asArray();
return _1d18;
};
