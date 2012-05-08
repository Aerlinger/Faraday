draw2d.OverviewWindow=function(name){
draw2d.WindowFigure.call(this,"Overview Window");
this.setDimension(180,150);
this.servers={};
this.name=name;
};
draw2d.OverviewWindow.prototype=new draw2d.WindowFigure();
draw2d.OverviewWindow.prototype.type="OverviewWindow";
draw2d.OverviewWindow.prototype.createHTMLElement=function(){
var item=draw2d.WindowFigure.prototype.createHTMLElement.call(this);
this.inputDiv=document.createElement("div");
this.inputDiv.style.position="absolute";
this.inputDiv.style.left="10px";
this.inputDiv.style.top="20px";
this.inputDiv.style.overflow="auto";
this.inputDiv.style.border="1px solid black";
this.inputDiv.style.font="normal 10px verdana";
item.appendChild(this.inputDiv);
return item;
};
draw2d.OverviewWindow.prototype.setDimension=function(w,h){
draw2d.WindowFigure.prototype.setDimension.call(this,w,h);
if(this.inputDiv!==null){
this.inputDiv.style.height=Math.max(1,(h-30))+"px";
this.inputDiv.style.width=Math.max(1,(w-20))+"px";
}
};
draw2d.OverviewWindow.prototype.addServer=function(_24ce){
this.servers[_24ce.id]=_24ce;
this.createList();
};
draw2d.OverviewWindow.prototype.removeServer=function(_24cf){
this.servers[_24cf.id]=null;
this.createList();
};
draw2d.OverviewWindow.prototype.createList=function(){
this.inputDiv.innerHTML="";
var list=document.createElement("ul");
for(key in this.servers){
var _24d1=this.servers[key];
if(_24d1!==null){
var li=document.createElement("li");
var a=document.createElement("a");
a.href="javascript:draw2d.OverviewWindow.scrollTo('"+_24d1.id+"')";
a.innerHTML=_24d1.ip;
li.appendChild(a);
if(_24d1.isReachable()){
a.style.color="green";
}else{
a.style.color="red";
a.style.fontWeight="bold";
}
list.appendChild(li);
}
}
this.inputDiv.appendChild(list);
};
draw2d.OverviewWindow.scrollTo=function(id){
var _24d5=workflow.getFigure(id);
workflow.scrollTo(_24d5.getX()-draw2d.OverviewWindow.screenWidth()/2,_24d5.getY()-draw2d.OverviewWindow.screenHeight()/2);
};
draw2d.OverviewWindow.prototype.onDragend=function(){
draw2d.WindowFigure.prototype.onDragend.call(this);
};
draw2d.OverviewWindow.screenWidth=function(){
var _24d6=0;
if(typeof (window.innerWidth)=="number"){
_24d6=window.innerWidth;
}else{
if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){
_24d6=document.documentElement.clientWidth;
}else{
if(document.body&&(document.body.clientWidth||document.body.clientHeight)){
_24d6=document.body.clientWidth;
}
}
}
return _24d6;
};
draw2d.OverviewWindow.screenHeight=function(){
var _24d7=0;
if(typeof (window.innerWidth)=="number"){
_24d7=window.innerHeight;
}else{
if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){
_24d7=document.documentElement.clientHeight;
}else{
if(document.body&&(document.body.clientWidth||document.body.clientHeight)){
_24d7=document.body.clientHeight;
}
}
}
return _24d7;
};
