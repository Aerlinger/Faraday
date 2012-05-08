draw2d.VectorPropertyWindow=function(){
draw2d.PropertyWindow.call(this);
this.setDimension(180,150);
};
draw2d.VectorPropertyWindow.prototype=new draw2d.PropertyWindow();
draw2d.VectorPropertyWindow.prototype.type="VectorPropertyWindow";
draw2d.VectorPropertyWindow.prototype.createHTMLElement=function(){
var item=draw2d.PropertyWindow.prototype.createHTMLElement.call(this);
this.lineColorLabel=this.createLabel("Line Color:",15,100);
item.appendChild(this.lineColorLabel);
this.fillColorLabel=this.createLabel("Fill Color:",15,120);
item.appendChild(this.fillColorLabel);
this.lineColorArea=this.createLabel("&nbsp;",85,100);
this.lineColorArea.style.width="50px";
this.lineColorArea.style.border="1px solid gray";
this.lineColorArea.hostDialog=this;
this.lineColorArea.onclick=function(){
this.hostDialog.showLineColorDialog();
};
item.appendChild(this.lineColorArea);
this.fillColorArea=this.createLabel("&nbsp;",85,120);
this.fillColorArea.style.width="50px";
this.fillColorArea.style.border="1px solid gray";
this.fillColorArea.hostDialog=this;
this.fillColorArea.onclick=function(){
this.hostDialog.showFillColorDialog();
};
item.appendChild(this.fillColorArea);
return item;
};
draw2d.VectorPropertyWindow.prototype.onSelectionChanged=function(_1d71){
draw2d.PropertyWindow.prototype.onSelectionChanged.call(this,_1d71);
if(_1d71!==null&&(typeof _1d71.getColor=="function")){
if(_1d71.getColor()!==null){
this.lineColorArea.style.background=_1d71.getColor().getHTMLStyle();
}else{
this.lineColorArea.style.background="transparent";
}
this.lineColorArea.style.cursor="pointer";
this.lineColorArea.style.border="1px solid gray";
this.lineColorLabel.style.color="black";
}else{
this.lineColorArea.style.background="transparent";
this.lineColorArea.style.cursor=null;
this.lineColorArea.style.border="1px solid #d0d0d0";
this.lineColorLabel.style.color="#d0d0d0";
}
if(_1d71!==null&&(typeof _1d71.getBackgroundColor=="function")){
if(_1d71.getBackgroundColor()!==null){
this.fillColorArea.style.background=_1d71.getBackgroundColor().getHTMLStyle();
}else{
this.fillColorArea.style.background="transparent";
}
this.fillColorArea.style.cursor="pointer";
this.fillColorArea.style.border="1px solid gray";
this.fillColorLabel.style.color="black";
}else{
this.fillColorArea.style.background="transparent";
this.fillColorArea.style.cursor=null;
this.fillColorArea.style.border="1px solid #d0d0d0";
this.fillColorLabel.style.color="#d0d0d0";
}
};
draw2d.VectorPropertyWindow.prototype.showLineColorDialog=function(){
if((this.getCurrentSelection()===null)||(typeof this.getCurrentSelection().getColor!="function")){
return;
}
var _1d72=new draw2d.LineColorDialog(this.getCurrentSelection());
_1d72.setColor(this.getCurrentSelection().getColor());
this.workflow.showDialog(_1d72);
};
draw2d.VectorPropertyWindow.prototype.showFillColorDialog=function(){
if(typeof this.getCurrentSelection().getBackgroundColor!="function"){
return;
}
var _1d73=new draw2d.BackgroundColorDialog(this.getCurrentSelection());
_1d73.setColor(this.getCurrentSelection().getBackgroundColor());
this.workflow.showDialog(_1d73);
};
