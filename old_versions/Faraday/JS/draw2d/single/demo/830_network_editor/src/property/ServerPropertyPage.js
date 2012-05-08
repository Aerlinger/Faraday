draw2d.ServerPropertyPage=function(){
draw2d.PropertyPage.call(this);
this.html=document.createElement("div");
this.html.style.width="100%";
this.html.style.height="100%";
this.header=this.createLabelElement(draw2d.I18N.PROPERTYPANEL_HEADER_SERVER,0,0);
this.header.className="panel_header";
this.html.appendChild(this.header);
this.datarowLabel=this.createLabelElement(draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_NAME,10,45);
this.html.appendChild(this.datarowLabel);
this.nameText=document.createElement("input");
this.nameText.type="text";
var oThis=this;
if(editor.isReadonly()){
this.nameText.disabled="true";
}else{
Event.observe(this.nameText,"keyup",function(e){
var func=oThis.currentModel.setName.bind(oThis.currentModel);
var _2461=new draw2d.CommandChangeProperty(editor.getGraphicalViewer(),func,oThis.currentModel.getName(),oThis.nameText.value);
editor.executeCommand(_2461);
});
}
this.nameText.style.position="absolute";
this.nameText.style.width="210px";
this.nameText.style.top="65px";
this.nameText.style.left="10px";
this.html.appendChild(this.nameText);
this.cpuLabel=this.createLabelElement(draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_CPUUNITS,10,95);
this.html.appendChild(this.cpuLabel);
this.listboxCPU=document.createElement("select");
this.listboxCPU.style.position="absolute";
this.listboxCPU.style.overflow="auto";
this.listboxCPU.style.width="60px";
this.listboxCPU.style.top="115px";
this.listboxCPU.style.left="10px";
this.listboxCPU.size=1;
this.listboxCPU["onchange"]=function(){
var func=oThis.currentModel.setCpuUnits.bind(oThis.currentModel);
var _2463=new draw2d.CommandChangeProperty(editor.getGraphicalViewer(),func,oThis.currentModel.getCpuUnits(),oThis.listboxCPU.selectedIndex+1);
editor.executeCommand(_2463);
};
for(var i=1;i<8;i++){
var node=document.createElement("option");
node.value=""+i;
node.appendChild(document.createTextNode(""+i));
this.listboxCPU.appendChild(node);
}
this.html.appendChild(this.listboxCPU);
this.ramLabel=this.createLabelElement(draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_RAM_MB,100,95);
this.html.appendChild(this.ramLabel);
this.ramText=document.createElement("input");
this.ramText.type="text";
var _2466=function(_2467){
var ram=parseInt(_2467.value,10);
if(isNaN(ram)){
ram=1024;
}
_2467.value=""+ram;
var func=this.currentModel.setRAM.bind(this.currentModel);
var _246a=new draw2d.CommandChangeProperty(editor.getGraphicalViewer(),func,this.currentModel.getRAM(),_2467.value);
editor.executeCommand(_246a);
};
_2466=_2466.bind(this,this.ramText);
Event.observe(this.ramText,"keyup",_2466);
this.ramText.style.position="absolute";
this.ramText.style.width="110px";
this.ramText.style.top="115px";
this.ramText.style.left="100px";
this.html.appendChild(this.ramText);
this.imagesLabel=this.createLabelElement(draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGES,10,155);
this.imagesLabel.className="property_panel_image_header";
this.html.appendChild(this.imagesLabel);
this.imagesAddLabel=this.createLabelElement(" ",120,155);
this.imagesAddLabel.className="property_panel_image_add";
this.imagesAddLabel.title=draw2d.I18N.TOOLTIP_BUTTON_ADD_IMAGE;
this.html.appendChild(this.imagesAddLabel);
Event.observe(this.imagesAddLabel,"click",function(){
var _246b=new draw2d.AddImageDialog("dialog_add_image",this.currentModel);
_246b.show();
}.bind(this));
this.imageContainer=document.createElement("div");
this.imageContainer.style.position="absolute";
this.imageContainer.style.top="175px";
this.imageContainer.style.left="10px";
this.imageContainer.style.width="240px";
this.imageContainer.style.overflowX="hidden";
this.imageContainer.style.overflowY="auto";
this.imageContainer.className="property_panel_image_container";
this.html.appendChild(this.imageContainer);
};
draw2d.ServerPropertyPage.prototype=new draw2d.PropertyPage();
draw2d.ServerPropertyPage.prototype.type="draw2d.ServerPropertyPage";
draw2d.ServerPropertyPage.prototype.init=function(model){
this.currentModel=model;
this.nameText.value=model.getName();
this.ramText.value=model.getRAM();
this.listboxCPU.selectedIndex=parseInt(model.getCpuUnits(),10)-1;
this.imageContainer.innerHTML="";
var table=new Element("table");
table.style.position="absolute";
table.style.top="0px";
table.style.left="0px";
table.style.width="220px";
table.style.tableLayout="fixed";
table.cellspacing="0";
table.cellpadding="0";
var _246e=model.getImagesModel().getImageModels();
this.imageContainer.appendChild(table);
for(var i=0;i<_246e.getSize();i++){
var img=_246e.get(i);
this.createNewImageHeader(table,img);
cell=this.createNewImageCell(table,draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGE_BOOTORDER);
var _2471=document.createElement("select");
_2471.style.overflow="auto";
_2471.style.width="60px";
_2471.size=1;
var _2472=function(_2473){
var func=this.setBootOrder.bind(this);
var _2475=new draw2d.CommandChangeProperty(editor.getGraphicalViewer(),func,this.getBootOrder(),_2473.selectedIndex+1);
editor.executeCommand(_2475);
};
for(var ii=1;ii<10;ii++){
var node=document.createElement("option");
node.value=""+ii;
node.appendChild(document.createTextNode(""+ii));
_2471.appendChild(node);
}
_2471.selectedIndex=img.getBootOrder()-1;
cell.appendChild(_2471);
_2472=_2472.bind(img,_2471);
Event.observe(_2471,"change",_2472);
cell=this.createNewImageCell(table,draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGE_FILENAME);
cell.innerHTML=img.getFileName();
ellipsis(cell);
cell=this.createNewImageCell(table,draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGE_TYPE);
cell.innerHTML=img.getImageType();
cell=this.createNewImageCell(table,draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGE_WRITEBACK);
cell.innerHTML=img.getWriteback();
cell=this.createNewImageCell(table,draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGE_READONLY);
cell.innerHTML=img.getReadonly();
cell=this.createSeparator(table);
}
};
draw2d.ServerPropertyPage.prototype.onResize=function(w,h){
this.imageContainer.style.height=Math.max(10,h-parseInt(this.imageContainer.style.top,10))+"px";
};
draw2d.ServerPropertyPage.prototype.createNewImageHeader=function(_247a,image){
var row=_247a.insertRow(_247a.rows.length);
var cell=row.insertCell(0);
cell.style.width="70px";
cell.innerHTML=image.getName()+"   ";
cell.className="property_panel_image_name";
cell.setAttribute("colspan","2");
var _247e=document.createElement("span");
_247e.style.whiteSpace="nowrap";
_247e.className="property_panel_image_remove";
_247e.title=draw2d.I18N.TOOLTIP_BUTTON_REMOVE_IMAGE;
_247e.innerHTML=" ";
cell.appendChild(_247e);
Event.observe(_247e,"click",function(_247f,image){
var _2481=new draw2d.CommandRemoveImage(editor.getGraphicalViewer(),_247f,image);
editor.getCommandStack().execute(_2481);
}.bind(this,this.currentModel,image));
};
draw2d.ServerPropertyPage.prototype.createNewImageCell=function(_2482,label){
var row=_2482.insertRow(_2482.rows.length);
var cell=row.insertCell(0);
cell.innerHTML=label;
cell.className="property_panel_label";
cell.style.width="70px";
var cell=row.insertCell(1);
cell.style.overflow="hidden";
cell.style.width="130px";
cell.className="property_panel_data";
var _2486=document.createElement("div");
_2486.style.whiteSpace="nowrap";
_2486.style.overflow="hidden";
cell.appendChild(_2486);
return _2486;
};
draw2d.ServerPropertyPage.prototype.createSeparator=function(_2487){
var row=_2487.insertRow(_2487.rows.length);
var cell=row.insertCell(0);
cell.innerHTML=" ";
cell.className="property_panel_image_separator";
cell.setAttribute("colspan","2");
};
draw2d.ServerPropertyPage.prototype.deinit=function(){
};
draw2d.ServerPropertyPage.prototype.getHTMLElement=function(){
return this.html;
};
