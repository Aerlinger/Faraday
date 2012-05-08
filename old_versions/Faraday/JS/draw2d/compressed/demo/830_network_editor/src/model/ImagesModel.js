/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ImagesModel=function(){draw2d.AbstractCloudNodeModel.call(this);this.images=new draw2d.ArrayList();};draw2d.ImagesModel.prototype=new draw2d.AbstractCloudNodeModel();draw2d.ImagesModel.prototype.type="draw2d.ImagesModel";draw2d.ImagesModel.prototype.tag="images";draw2d.ImagesModel.prototype.addImageModel=function(_2c){this.images.add(_2c);this.firePropertyChange(draw2d.AbstractObjectModel.EVENT_ELEMENT_ADDED,null,_2c);};draw2d.ImagesModel.prototype.removeImageModel=function(_2d){if(this.images.remove(_2d)!==null){this.firePropertyChange(draw2d.AbstractObjectModel.EVENT_ELEMENT_REMOVED,_2d,null);}};draw2d.ImagesModel.prototype.getImageModels=function(){return this.images;};draw2d.ImagesModel.prototype.renumber=function(){for(var i=0;i<this.images.getSize();i++){this.images.get(i).setIndex(i);}};draw2d.ImagesModel.prototype.getPersistentAttributes=function(){var _2f=draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);this.renumber();_2f.img=this.images.asArray();return _2f;};