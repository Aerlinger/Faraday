draw2d.AddImageDialog=function(id,_2a66){
draw2d.FormDialog.call(this,id);
if(!(_2a66 instanceof draw2d.ServerModel)){
throw "Wrong type of parameter in draw2d.AddImageDialog=function(/*:String*/ id, /*:ServerModel*/ server)";
}
this.server=_2a66;
this.currentSelectedIcon=null;
this.currentSelectedImage=null;
$("dialog_select_image_header").update(draw2d.I18N.DIALOG_ADDIMAGE_HEADER);
this.dialog_box.select(".draw2d_window_button_ok")[0].update(draw2d.I18N.DIALOG_ADDIMAGE_OK);
this.dialog_box.select(".draw2d_window_button_cancel")[0].update(draw2d.I18N.DIALOG_ADDIMAGE_CANCEL);
var _2a67=$("dialog_select_image_images");
_2a67.innerHTML="";
var ul=$(document.createElement("ul"));
ul.className="gallery";
_2a67.appendChild(ul);
for(var i=0;i<draw2d.ImageTemplates.length;i++){
var _2a6a=draw2d.ImageTemplates[i];
var li=$(document.createElement("li"));
li.addClassName("gallery_li");
li.observe("click",function(li,image){
if(this.currentSelectedIcon!=null){
this.currentSelectedIcon.removeClassName("gallery_li_selected");
}
this.currentSelectedIcon=li;
this.currentSelectedImage=image;
this.currentSelectedIcon.addClassName("gallery_li_selected");
}.bind(this,li,_2a6a));
var img=$(document.createElement("img"));
img.addClassName("gallery_li_img");
img.title=_2a6a.name;
li.appendChild(img);
if(_2a6a.icon!==undefined&&_2a6a.icon!==null){
img.src=_2a6a.icon;
}else{
img.src=draw2d.Configuration.IMAGEPATH+"image_default.png";
var label=new Element("div");
label.update(_2a6a.name);
li.appendChild(label);
img.style.height="70px";
img.style.width="100px";
}
ul.appendChild(li);
}
};
draw2d.AddImageDialog.prototype=new draw2d.FormDialog();
draw2d.AddImageDialog.prototype.type="draw2d.AddImageDialog";
draw2d.AddImageDialog.prototype.onOk=function(){
try{
var image=new draw2d.ImageModel();
image.setName(this.currentSelectedImage.name);
image.setFileName(this.currentSelectedImage["file-name"]);
image.setImageType(this.currentSelectedImage["image-type"]);
image.setWriteback(this.currentSelectedImage["writeback"]);
image.setReadonly(this.currentSelectedImage["readonly"]);
var _2a71=new draw2d.CommandAddImage(editor.getGraphicalViewer(),this.server,image);
editor.getCommandStack().execute(_2a71);
}
catch(e){
alert(e);
}
};
draw2d.AddImageDialog.prototype.onCancel=function(){
};
