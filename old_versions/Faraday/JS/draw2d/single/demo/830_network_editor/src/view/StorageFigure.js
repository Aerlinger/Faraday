draw2d.StorageFigure=function(){
draw2d.AbstractCloudNodeFigure.call(this);
};
draw2d.StorageFigure.prototype=new draw2d.AbstractCloudNodeFigure();
draw2d.StorageFigure.prototype.type="draw2d.StorageFigure";
draw2d.StorageFigure.prototype.paint=function(){
draw2d.AbstractCloudNodeFigure.prototype.paint.call(this);
try{
var model=this.getModel();
this.header.innerHTML="Storage";
this.qualifier.innerHTML=this.getModel().getQualifier();
this.storage.innerHTML=this.getModel().getStorage()+" MB";
this.setDimension(this.getWidth(),this.getHeight());
}
catch(e){
pushErrorStack(e,"draw2d.StorageFigure.prototype.paint=function()");
}
};
draw2d.StorageFigure.prototype.createHTMLElement=function(){
var item=draw2d.AbstractCloudNodeFigure.prototype.createHTMLElement.call(this);
item.className="storage_frame";
this.header.className="storage_header";
item.style.border="";
var x=this.table.insertRow(this.table.rows.length);
this.qualifierLabel=x.insertCell(0);
this.qualifierLabel.innerHTML=draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_STORAGE_QUALIFIER;
this.qualifierLabel.className="storage_label";
this.disableTextSelection(this.qualifierLabel);
this.qualifier=x.insertCell(1);
this.qualifier.className="storage_data";
this.disableTextSelection(this.qualifier);
x=this.table.insertRow(this.table.rows.length);
this.storageLabel=x.insertCell(0);
this.storageLabel.innerHTML=draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_STORAGE_STORAGE;
this.storageLabel.className="storage_label";
this.disableTextSelection(this.storageLabel);
this.storage=x.insertCell(1);
this.storage.className="storage_data";
this.disableTextSelection(this.storage);
this.setDimension(this.getWidth(),this.getHeight());
return item;
};
draw2d.StorageFigure.prototype.initPorts=function(){
try{
if(this.outputPort!==null){
return;
}
this.outputPort=new draw2d.MountOutputPort();
this.outputPort.setWorkflow(this.workflow);
this.outputPort.setCanDrag(this.getCanDrag());
this.addPort(this.outputPort,0,0);
this.outputPort.paint();
this.setDimension(this.getWidth(),this.getHeight());
}
catch(e){
pushErrorStack(e,"draw2d.StorageFigure.prototype.initPorts=function()");
}
};
draw2d.StorageFigure.prototype.setDimension=function(w,h){
draw2d.AbstractCloudNodeFigure.prototype.setDimension.call(this,w,h);
if(this.outputPort===null){
return;
}
this.outputPort.setPosition(w+5,h/2);
};
