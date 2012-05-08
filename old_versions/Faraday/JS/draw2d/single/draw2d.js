
/**This notice must be untouched at all times.
This is the COMPRESSED version of the Draw2D Library
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/
var draw2d=new Object();
var _errorStack_=[];
function pushErrorStack(e,_27ce){
_errorStack_.push(_27ce+"\n");
throw e;
}
draw2d.AbstractEvent=function(){
this.type=null;
this.target=null;
this.relatedTarget=null;
this.cancelable=false;
this.timeStamp=null;
this.returnValue=true;
};
draw2d.AbstractEvent.prototype.initEvent=function(sType,_27d0){
this.type=sType;
this.cancelable=_27d0;
this.timeStamp=(new Date()).getTime();
};
draw2d.AbstractEvent.prototype.preventDefault=function(){
if(this.cancelable){
this.returnValue=false;
}
};
draw2d.AbstractEvent.fireDOMEvent=function(_27d1,_27d2){
if(document.createEvent){
var evt=document.createEvent("Events");
evt.initEvent(_27d1,true,true);
_27d2.dispatchEvent(evt);
}else{
if(document.createEventObject){
var evt=document.createEventObject();
_27d2.fireEvent("on"+_27d1,evt);
}
}
};
draw2d.EventTarget=function(){
this.eventhandlers={};
};
draw2d.EventTarget.prototype.addEventListener=function(sType,_27d5){
if(typeof this.eventhandlers[sType]=="undefined"){
this.eventhandlers[sType]=[];
}
this.eventhandlers[sType][this.eventhandlers[sType].length]=_27d5;
};
draw2d.EventTarget.prototype.dispatchEvent=function(_27d6){
_27d6.target=this;
if(typeof this.eventhandlers[_27d6.type]!="undefined"){
for(var i=0;i<this.eventhandlers[_27d6.type].length;i++){
this.eventhandlers[_27d6.type][i](_27d6);
}
}
return _27d6.returnValue;
};
draw2d.EventTarget.prototype.removeEventListener=function(sType,_27d9){
if(typeof this.eventhandlers[sType]!="undefined"){
var _27da=[];
for(var i=0;i<this.eventhandlers[sType].length;i++){
if(this.eventhandlers[sType][i]!=_27d9){
_27da[_27da.length]=this.eventhandlers[sType][i];
}
}
this.eventhandlers[sType]=_27da;
}
};
String.prototype.trim=function(){
return (this.replace(new RegExp("^([\\s]+)|([\\s]+)$","gm"),""));
};
String.prototype.lefttrim=function(){
return (this.replace(new RegExp("^[\\s]+","gm"),""));
};
String.prototype.righttrim=function(){
return (this.replace(new RegExp("[\\s]+$","gm"),""));
};
String.prototype.between=function(left,right,_1cef){
if(!_1cef){
_1cef=0;
}
var li=this.indexOf(left,_1cef);
if(li==-1){
return null;
}
var ri=this.indexOf(right,li);
if(ri==-1){
return null;
}
return this.substring(li+left.length,ri);
};
draw2d.UUID=function(){
};
draw2d.UUID.prototype.type="draw2d.UUID";
draw2d.UUID.create=function(){
var _27ea=function(){
return (((1+Math.random())*65536)|0).toString(16).substring(1);
};
return (_27ea()+_27ea()+"-"+_27ea()+"-"+_27ea()+"-"+_27ea()+"-"+_27ea()+_27ea()+_27ea());
};
draw2d.ArrayList=function(){
this.increment=10;
this.size=0;
this.data=new Array(this.increment);
};
draw2d.ArrayList.EMPTY_LIST=new draw2d.ArrayList();
draw2d.ArrayList.prototype.type="draw2d.ArrayList";
draw2d.ArrayList.prototype.reverse=function(){
var _3169=new Array(this.size);
for(var i=0;i<this.size;i++){
_3169[i]=this.data[this.size-i-1];
}
this.data=_3169;
};
draw2d.ArrayList.prototype.getCapacity=function(){
return this.data.length;
};
draw2d.ArrayList.prototype.getSize=function(){
return this.size;
};
draw2d.ArrayList.prototype.isEmpty=function(){
return this.getSize()===0;
};
draw2d.ArrayList.prototype.getLastElement=function(){
if(this.data[this.getSize()-1]!==null){
return this.data[this.getSize()-1];
}
};
draw2d.ArrayList.prototype.asArray=function(){
this.trimToSize();
return this.data;
};
draw2d.ArrayList.prototype.getFirstElement=function(){
if(this.data[0]!==null&&this.data[0]!==undefined){
return this.data[0];
}
return null;
};
draw2d.ArrayList.prototype.get=function(i){
return this.data[i];
};
draw2d.ArrayList.prototype.add=function(obj){
if(this.getSize()==this.data.length){
this.resize();
}
this.data[this.size++]=obj;
};
draw2d.ArrayList.prototype.addAll=function(obj){
for(var i=0;i<obj.getSize();i++){
this.add(obj.get(i));
}
};
draw2d.ArrayList.prototype.remove=function(obj){
var index=this.indexOf(obj);
if(index>=0){
return this.removeElementAt(index);
}
return null;
};
draw2d.ArrayList.prototype.insertElementAt=function(obj,index){
if(this.size==this.capacity){
this.resize();
}
for(var i=this.getSize();i>index;i--){
this.data[i]=this.data[i-1];
}
this.data[index]=obj;
this.size++;
};
draw2d.ArrayList.prototype.removeElementAt=function(index){
var _3175=this.data[index];
for(var i=index;i<(this.getSize()-1);i++){
this.data[i]=this.data[i+1];
}
this.data[this.getSize()-1]=null;
this.size--;
return _3175;
};
draw2d.ArrayList.prototype.removeAllElements=function(){
this.size=0;
for(var i=0;i<this.data.length;i++){
this.data[i]=null;
}
};
draw2d.ArrayList.prototype.indexOf=function(obj){
for(var i=0;i<this.getSize();i++){
if(this.data[i]==obj){
return i;
}
}
return -1;
};
draw2d.ArrayList.prototype.contains=function(obj){
for(var i=0;i<this.getSize();i++){
if(this.data[i]==obj){
return true;
}
}
return false;
};
draw2d.ArrayList.prototype.resize=function(){
newData=new Array(this.data.length+this.increment);
for(var i=0;i<this.data.length;i++){
newData[i]=this.data[i];
}
this.data=newData;
};
draw2d.ArrayList.prototype.trimToSize=function(){
if(this.data.length==this.size){
return;
}
var temp=new Array(this.getSize());
for(var i=0;i<this.getSize();i++){
temp[i]=this.data[i];
}
this.size=temp.length;
this.data=temp;
};
draw2d.ArrayList.prototype.sort=function(f){
var i,j;
var _3181;
var _3182;
var _3183;
var _3184;
for(i=1;i<this.getSize();i++){
_3182=this.data[i];
_3181=_3182[f];
j=i-1;
_3183=this.data[j];
_3184=_3183[f];
while(j>=0&&_3184>_3181){
this.data[j+1]=this.data[j];
j--;
if(j>=0){
_3183=this.data[j];
_3184=_3183[f];
}
}
this.data[j+1]=_3182;
}
};
draw2d.ArrayList.prototype.clone=function(){
var _3185=new draw2d.ArrayList(this.size);
for(var i=0;i<this.size;i++){
_3185.add(this.data[i]);
}
return _3185;
};
draw2d.ArrayList.prototype.overwriteElementAt=function(obj,index){
this.data[index]=obj;
};
draw2d.ArrayList.prototype.getPersistentAttributes=function(){
return {data:this.data,increment:this.increment,size:this.getSize()};
};
function trace(_1e2f){
var _1e30=openwindow("about:blank",700,400);
_1e30.document.writeln("<pre>"+_1e2f+"</pre>");
}
function openwindow(url,width,_1e33){
var left=(screen.width-width)/2;
var top=(screen.height-_1e33)/2;
property="left="+left+", top="+top+", toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,alwaysRaised,width="+width+",height="+_1e33;
return window.open(url,"_blank",property);
}
function dumpObject(obj){
trace("----------------------------------------------------------------------------");
trace("- Object dump");
trace("----------------------------------------------------------------------------");
for(var i in obj){
try{
if(typeof obj[i]!="function"){
trace(i+" --&gt; "+obj[i]);
}
}
catch(e){
}
}
for(var i in obj){
try{
if(typeof obj[i]=="function"){
trace(i+" --&gt; "+obj[i]);
}
}
catch(e){
}
}
trace("----------------------------------------------------------------------------");
}
draw2d.Drag=function(){
};
draw2d.Drag.current=null;
draw2d.Drag.currentTarget=null;
draw2d.Drag.currentHover=null;
draw2d.Drag.currentCompartment=null;
draw2d.Drag.dragging=false;
draw2d.Drag.isDragging=function(){
return this.dragging;
};
draw2d.Drag.setCurrent=function(_38e4){
this.current=_38e4;
this.dragging=true;
};
draw2d.Drag.getCurrent=function(){
return this.current;
};
draw2d.Drag.clearCurrent=function(){
this.current=null;
this.dragging=false;
this.currentTarget=null;
};
draw2d.Draggable=function(_38e5,_38e6){
this.id=draw2d.UUID.create();
this.node=null;
draw2d.EventTarget.call(this);
this.construct(_38e5,_38e6);
this.diffX=0;
this.diffY=0;
this.targets=new draw2d.ArrayList();
};
draw2d.Draggable.prototype=new draw2d.EventTarget();
draw2d.Draggable.prototype.construct=function(_38e7){
if(_38e7===null||_38e7===undefined){
return;
}
this.element=_38e7;
var oThis=this;
var _38e9=function(){
var _38ea=new draw2d.DragDropEvent();
_38ea.initDragDropEvent("dblclick",true);
oThis.dispatchEvent(_38ea);
var _38eb=arguments[0]||window.event;
_38eb.cancelBubble=true;
_38eb.returnValue=false;
};
var _38ec=function(){
var _38ed=arguments[0]||window.event;
var _38ee=new draw2d.DragDropEvent();
if(oThis.node!==null){
var _38ef=oThis.node.getWorkflow().getAbsoluteX();
var _38f0=oThis.node.getWorkflow().getAbsoluteY();
var _38f1=oThis.node.getWorkflow().getScrollLeft();
var _38f2=oThis.node.getWorkflow().getScrollTop();
_38ee.x=_38ed.clientX-oThis.element.offsetLeft+_38f1-_38ef;
_38ee.y=_38ed.clientY-oThis.element.offsetTop+_38f2-_38f0;
}
if(_38ed.button===2){
_38ee.initDragDropEvent("contextmenu",true);
oThis.dispatchEvent(_38ee);
}else{
_38ee.initDragDropEvent("dragstart",true);
if(oThis.dispatchEvent(_38ee)){
oThis.diffX=_38ed.clientX-oThis.element.offsetLeft;
oThis.diffY=_38ed.clientY-oThis.element.offsetTop;
draw2d.Drag.setCurrent(oThis);
if(oThis.isAttached==true){
oThis.detachEventHandlers();
}
oThis.attachEventHandlers();
}
}
_38ed.cancelBubble=true;
_38ed.returnValue=false;
};
var _38f3=function(){
if(draw2d.Drag.getCurrent()===null){
var _38f4=arguments[0]||window.event;
if(draw2d.Drag.currentHover!==null&&oThis!==draw2d.Drag.currentHover){
var _38f5=new draw2d.DragDropEvent();
_38f5.initDragDropEvent("mouseleave",false,oThis);
draw2d.Drag.currentHover.dispatchEvent(_38f5);
}
if(oThis!==null&&oThis!==draw2d.Drag.currentHover){
var _38f5=new draw2d.DragDropEvent();
_38f5.initDragDropEvent("mouseenter",false,oThis);
oThis.dispatchEvent(_38f5);
}
draw2d.Drag.currentHover=oThis;
}else{
}
};
if(this.element.addEventListener){
this.element.addEventListener("mousemove",_38f3,false);
this.element.addEventListener("mousedown",_38ec,false);
this.element.addEventListener("dblclick",_38e9,false);
}else{
if(this.element.attachEvent){
this.element.attachEvent("onmousemove",_38f3);
this.element.attachEvent("onmousedown",_38ec);
this.element.attachEvent("ondblclick",_38e9);
}else{
throw "Drag not supported in this browser.";
}
}
};
draw2d.Draggable.prototype.onDrop=function(_38f6,_38f7){
};
draw2d.Draggable.prototype.attachEventHandlers=function(){
var oThis=this;
oThis.isAttached=true;
this.tempMouseMove=function(){
var _38f9=arguments[0]||window.event;
var _38fa=new draw2d.Point(_38f9.clientX-oThis.diffX,_38f9.clientY-oThis.diffY);
if(oThis.node!==null&&oThis.node.getCanSnapToHelper()){
_38fa=oThis.node.getWorkflow().snapToHelper(oThis.node,_38fa);
}
oThis.element.style.left=_38fa.x+"px";
oThis.element.style.top=_38fa.y+"px";
if(oThis.node!==null){
var _38fb=oThis.node.getWorkflow().getScrollLeft();
var _38fc=oThis.node.getWorkflow().getScrollTop();
var _38fd=oThis.node.getWorkflow().getAbsoluteX();
var _38fe=oThis.node.getWorkflow().getAbsoluteY();
var _38ff=oThis.getDropTarget(_38f9.clientX+_38fb-_38fd,_38f9.clientY+_38fc-_38fe);
var _3900=oThis.getCompartment(_38f9.clientX+_38fb-_38fd,_38f9.clientY+_38fc-_38fe);
if(draw2d.Drag.currentTarget!==null&&_38ff!=draw2d.Drag.currentTarget){
var _3901=new draw2d.DragDropEvent();
_3901.initDragDropEvent("dragleave",false,oThis);
draw2d.Drag.currentTarget.dispatchEvent(_3901);
}
if(_38ff!==null&&_38ff!==draw2d.Drag.currentTarget){
var _3901=new draw2d.DragDropEvent();
_3901.initDragDropEvent("dragenter",false,oThis);
_38ff.dispatchEvent(_3901);
}
draw2d.Drag.currentTarget=_38ff;
if(draw2d.Drag.currentCompartment!==null&&_3900!==draw2d.Drag.currentCompartment){
var _3901=new draw2d.DragDropEvent();
_3901.initDragDropEvent("figureleave",false,oThis);
draw2d.Drag.currentCompartment.dispatchEvent(_3901);
}
if(_3900!==null&&_3900.node!=oThis.node&&_3900!==draw2d.Drag.currentCompartment){
var _3901=new draw2d.DragDropEvent();
_3901.initDragDropEvent("figureenter",false,oThis);
_3900.dispatchEvent(_3901);
}
draw2d.Drag.currentCompartment=_3900;
}
var _3902=new draw2d.DragDropEvent();
_3902.initDragDropEvent("drag",false);
oThis.dispatchEvent(_3902);
};
oThis.tempMouseUp=function(){
oThis.detachEventHandlers();
var _3903=arguments[0]||window.event;
if(oThis.node!==null){
var _3904=oThis.node.getWorkflow().getScrollLeft();
var _3905=oThis.node.getWorkflow().getScrollTop();
var _3906=oThis.node.getWorkflow().getAbsoluteX();
var _3907=oThis.node.getWorkflow().getAbsoluteY();
var _3908=oThis.getDropTarget(_3903.clientX+_3904-_3906,_3903.clientY+_3905-_3907);
var _3909=oThis.getCompartment(_3903.clientX+_3904-_3906,_3903.clientY+_3905-_3907);
if(_3908!==null){
var _390a=new draw2d.DragDropEvent();
_390a.initDragDropEvent("drop",false,oThis);
_3908.dispatchEvent(_390a);
}
if(_3909!==null&&_3909.node!==oThis.node){
var _390a=new draw2d.DragDropEvent();
_390a.initDragDropEvent("figuredrop",false,oThis);
_3909.dispatchEvent(_390a);
}
if(draw2d.Drag.currentTarget!==null){
var _390a=new draw2d.DragDropEvent();
_390a.initDragDropEvent("dragleave",false,oThis);
draw2d.Drag.currentTarget.dispatchEvent(_390a);
draw2d.Drag.currentTarget=null;
}
}
var _390b=new draw2d.DragDropEvent();
_390b.initDragDropEvent("dragend",false);
oThis.dispatchEvent(_390b);
oThis.onDrop(_3903.clientX,_3903.clientY);
draw2d.Drag.currentCompartment=null;
draw2d.Drag.clearCurrent();
};
if(document.body.addEventListener){
document.body.addEventListener("mousemove",this.tempMouseMove,false);
document.body.addEventListener("mouseup",this.tempMouseUp,false);
}else{
if(document.body.attachEvent){
document.body.attachEvent("onmousemove",this.tempMouseMove);
document.body.attachEvent("onmouseup",this.tempMouseUp);
}else{
throw new Error("Drag doesn't support this browser.");
}
}
};
draw2d.Draggable.prototype.detachEventHandlers=function(){
this.isAttached=false;
if(document.body.removeEventListener){
document.body.removeEventListener("mousemove",this.tempMouseMove,false);
document.body.removeEventListener("mouseup",this.tempMouseUp,false);
}else{
if(document.body.detachEvent){
document.body.detachEvent("onmousemove",this.tempMouseMove);
document.body.detachEvent("onmouseup",this.tempMouseUp);
}else{
throw new Error("Drag doesn't support this browser.");
}
}
};
draw2d.Draggable.prototype.getDropTarget=function(x,y){
for(var i=0;i<this.targets.getSize();i++){
var _390f=this.targets.get(i);
if(_390f.node.isOver(x,y)&&_390f.node!==this.node){
return _390f;
}
}
return null;
};
draw2d.Draggable.prototype.getCompartment=function(x,y){
var _3912=null;
for(var i=0;i<this.node.getWorkflow().compartments.getSize();i++){
var _3914=this.node.getWorkflow().compartments.get(i);
if(_3914.isOver(x,y)&&_3914!==this.node){
if(_3912===null){
_3912=_3914;
}else{
if(_3912.getZOrder()<_3914.getZOrder()){
_3912=_3914;
}
}
}
}
return _3912===null?null:_3912.dropable;
};
draw2d.Draggable.prototype.getLeft=function(){
return this.element.offsetLeft;
};
draw2d.Draggable.prototype.getTop=function(){
return this.element.offsetTop;
};
draw2d.DragDropEvent=function(){
draw2d.AbstractEvent.call(this);
};
draw2d.DragDropEvent.prototype=new draw2d.AbstractEvent();
draw2d.DragDropEvent.prototype.initDragDropEvent=function(sType,_3916,_3917){
this.initEvent(sType,_3916);
this.relatedTarget=_3917;
};
draw2d.DropTarget=function(_3918){
draw2d.EventTarget.call(this);
this.construct(_3918);
};
draw2d.DropTarget.prototype=new draw2d.EventTarget();
draw2d.DropTarget.prototype.construct=function(_3919){
this.element=_3919;
};
draw2d.DropTarget.prototype.getLeft=function(){
var el=this.element;
var ol=el.offsetLeft;
while((el=el.offsetParent)!==null){
ol+=el.offsetLeft;
}
return ol;
};
draw2d.DropTarget.prototype.getTop=function(){
var el=this.element;
var ot=el.offsetTop;
while((el=el.offsetParent)!==null){
ot+=el.offsetTop;
}
return ot;
};
draw2d.DropTarget.prototype.getHeight=function(){
return this.element.offsetHeight;
};
draw2d.DropTarget.prototype.getWidth=function(){
return this.element.offsetWidth;
};
draw2d.PositionConstants=function(){
};
draw2d.PositionConstants.NORTH=1;
draw2d.PositionConstants.SOUTH=4;
draw2d.PositionConstants.WEST=8;
draw2d.PositionConstants.EAST=16;
draw2d.Color=function(red,green,blue){
if(typeof green=="undefined"){
var rgb=this.hex2rgb(red);
this.red=rgb[0];
this.green=rgb[1];
this.blue=rgb[2];
}else{
this.red=red;
this.green=green;
this.blue=blue;
}
};
draw2d.Color.prototype.type="draw2d.Color";
draw2d.Color.prototype.getHTMLStyle=function(){
return "rgb("+this.red+","+this.green+","+this.blue+")";
};
draw2d.Color.prototype.getRed=function(){
return this.red;
};
draw2d.Color.prototype.getGreen=function(){
return this.green;
};
draw2d.Color.prototype.getBlue=function(){
return this.blue;
};
draw2d.Color.prototype.getIdealTextColor=function(){
var _2ed4=105;
var _2ed5=(this.red*0.299)+(this.green*0.587)+(this.blue*0.114);
return (255-_2ed5<_2ed4)?new draw2d.Color(0,0,0):new draw2d.Color(255,255,255);
};
draw2d.Color.prototype.hex2rgb=function(_2ed6){
_2ed6=_2ed6.replace("#","");
return ({0:parseInt(_2ed6.substr(0,2),16),1:parseInt(_2ed6.substr(2,2),16),2:parseInt(_2ed6.substr(4,2),16)});
};
draw2d.Color.prototype.hex=function(){
return (this.int2hex(this.red)+this.int2hex(this.green)+this.int2hex(this.blue));
};
draw2d.Color.prototype.int2hex=function(v){
v=Math.round(Math.min(Math.max(0,v),255));
return ("0123456789ABCDEF".charAt((v-v%16)/16)+"0123456789ABCDEF".charAt(v%16));
};
draw2d.Color.prototype.darker=function(_2ed8){
var red=parseInt(Math.round(this.getRed()*(1-_2ed8)));
var green=parseInt(Math.round(this.getGreen()*(1-_2ed8)));
var blue=parseInt(Math.round(this.getBlue()*(1-_2ed8)));
if(red<0){
red=0;
}else{
if(red>255){
red=255;
}
}
if(green<0){
green=0;
}else{
if(green>255){
green=255;
}
}
if(blue<0){
blue=0;
}else{
if(blue>255){
blue=255;
}
}
return new draw2d.Color(red,green,blue);
};
draw2d.Color.prototype.lighter=function(_2edc){
var red=parseInt(Math.round(this.getRed()*(1+_2edc)));
var green=parseInt(Math.round(this.getGreen()*(1+_2edc)));
var blue=parseInt(Math.round(this.getBlue()*(1+_2edc)));
if(red<0){
red=0;
}else{
if(red>255){
red=255;
}
}
if(green<0){
green=0;
}else{
if(green>255){
green=255;
}
}
if(blue<0){
blue=0;
}else{
if(blue>255){
blue=255;
}
}
return new draw2d.Color(red,green,blue);
};
draw2d.Point=function(x,y){
this.x=x;
this.y=y;
};
draw2d.Point.prototype.type="draw2d.Point";
draw2d.Point.prototype.getX=function(){
return this.x;
};
draw2d.Point.prototype.getY=function(){
return this.y;
};
draw2d.Point.prototype.getPosition=function(p){
var dx=p.x-this.x;
var dy=p.y-this.y;
if(Math.abs(dx)>Math.abs(dy)){
if(dx<0){
return draw2d.PositionConstants.WEST;
}
return draw2d.PositionConstants.EAST;
}
if(dy<0){
return draw2d.PositionConstants.NORTH;
}
return draw2d.PositionConstants.SOUTH;
};
draw2d.Point.prototype.equals=function(o){
return this.x==o.x&&this.y==o.y;
};
draw2d.Point.prototype.getDistance=function(other){
return Math.sqrt((this.x-other.x)*(this.x-other.x)+(this.y-other.y)*(this.y-other.y));
};
draw2d.Point.prototype.getTranslated=function(other){
return new draw2d.Point(this.x+other.x,this.y+other.y);
};
draw2d.Point.prototype.getPersistentAttributes=function(){
return {x:this.x,y:this.y};
};
draw2d.Dimension=function(x,y,w,h){
draw2d.Point.call(this,x,y);
this.w=w;
this.h=h;
};
draw2d.Dimension.prototype=new draw2d.Point();
draw2d.Dimension.prototype.type="draw2d.Dimension";
draw2d.Dimension.prototype.translate=function(dx,dy){
this.x+=dx;
this.y+=dy;
return this;
};
draw2d.Dimension.prototype.resize=function(dw,dh){
this.w+=dw;
this.h+=dh;
return this;
};
draw2d.Dimension.prototype.setBounds=function(rect){
this.x=rect.x;
this.y=rect.y;
this.w=rect.w;
this.h=rect.h;
return this;
};
draw2d.Dimension.prototype.isEmpty=function(){
return this.w<=0||this.h<=0;
};
draw2d.Dimension.prototype.getWidth=function(){
return this.w;
};
draw2d.Dimension.prototype.getHeight=function(){
return this.h;
};
draw2d.Dimension.prototype.getRight=function(){
return this.x+this.w;
};
draw2d.Dimension.prototype.getBottom=function(){
return this.y+this.h;
};
draw2d.Dimension.prototype.getTopLeft=function(){
return new draw2d.Point(this.x,this.y);
};
draw2d.Dimension.prototype.getCenter=function(){
return new draw2d.Point(this.x+this.w/2,this.y+this.h/2);
};
draw2d.Dimension.prototype.getBottomRight=function(){
return new draw2d.Point(this.x+this.w,this.y+this.h);
};
draw2d.Dimension.prototype.equals=function(o){
return this.x==o.x&&this.y==o.y&&this.w==o.w&&this.h==o.h;
};
draw2d.SnapToHelper=function(_1e38){
this.workflow=_1e38;
};
draw2d.SnapToHelper.NORTH=1;
draw2d.SnapToHelper.SOUTH=4;
draw2d.SnapToHelper.WEST=8;
draw2d.SnapToHelper.EAST=16;
draw2d.SnapToHelper.CENTER=32;
draw2d.SnapToHelper.NORTH_EAST=draw2d.SnapToHelper.NORTH|draw2d.SnapToHelper.EAST;
draw2d.SnapToHelper.NORTH_WEST=draw2d.SnapToHelper.NORTH|draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.SOUTH_EAST=draw2d.SnapToHelper.SOUTH|draw2d.SnapToHelper.EAST;
draw2d.SnapToHelper.SOUTH_WEST=draw2d.SnapToHelper.SOUTH|draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.NORTH_SOUTH=draw2d.SnapToHelper.NORTH|draw2d.SnapToHelper.SOUTH;
draw2d.SnapToHelper.EAST_WEST=draw2d.SnapToHelper.EAST|draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.NSEW=draw2d.SnapToHelper.NORTH_SOUTH|draw2d.SnapToHelper.EAST_WEST;
draw2d.SnapToHelper.prototype.snapPoint=function(_1e39,_1e3a,_1e3b){
return _1e3a;
};
draw2d.SnapToHelper.prototype.snapRectangle=function(_1e3c,_1e3d){
return _1e3c;
};
draw2d.SnapToHelper.prototype.onSetDocumentDirty=function(){
};
draw2d.SnapToGrid=function(_2a48){
draw2d.SnapToHelper.call(this,_2a48);
};
draw2d.SnapToGrid.prototype=new draw2d.SnapToHelper();
draw2d.SnapToGrid.prototype.type="draw2d.SnapToGrid";
draw2d.SnapToGrid.prototype.snapPoint=function(_2a49,_2a4a,_2a4b){
_2a4b.x=this.workflow.gridWidthX*Math.floor(((_2a4a.x+this.workflow.gridWidthX/2)/this.workflow.gridWidthX));
_2a4b.y=this.workflow.gridWidthY*Math.floor(((_2a4a.y+this.workflow.gridWidthY/2)/this.workflow.gridWidthY));
return 0;
};
draw2d.SnapToGrid.prototype.snapRectangle=function(_2a4c,_2a4d){
_2a4d.x=_2a4c.x;
_2a4d.y=_2a4c.y;
_2a4d.w=_2a4c.w;
_2a4d.h=_2a4c.h;
return 0;
};
draw2d.SnapToGeometryEntry=function(type,_31ab){
this.type=type;
this.location=_31ab;
};
draw2d.SnapToGeometryEntry.prototype.getLocation=function(){
return this.location;
};
draw2d.SnapToGeometryEntry.prototype.getType=function(){
return this.type;
};
draw2d.SnapToGeometry=function(_2f05){
draw2d.SnapToHelper.call(this,_2f05);
this.rows=null;
this.cols=null;
};
draw2d.SnapToGeometry.prototype=new draw2d.SnapToHelper();
draw2d.SnapToGeometry.THRESHOLD=5;
draw2d.SnapToGeometry.prototype.snapPoint=function(_2f06,_2f07,_2f08){
if(this.rows===null||this.cols===null){
this.populateRowsAndCols();
}
if((_2f06&draw2d.SnapToHelper.EAST)!==0){
var _2f09=this.getCorrectionFor(this.cols,_2f07.getX()-1,1);
if(_2f09!==draw2d.SnapToGeometry.THRESHOLD){
_2f06&=~draw2d.SnapToHelper.EAST;
_2f08.x+=_2f09;
}
}
if((_2f06&draw2d.SnapToHelper.WEST)!==0){
var _2f0a=this.getCorrectionFor(this.cols,_2f07.getX(),-1);
if(_2f0a!==draw2d.SnapToGeometry.THRESHOLD){
_2f06&=~draw2d.SnapToHelper.WEST;
_2f08.x+=_2f0a;
}
}
if((_2f06&draw2d.SnapToHelper.SOUTH)!==0){
var _2f0b=this.getCorrectionFor(this.rows,_2f07.getY()-1,1);
if(_2f0b!==draw2d.SnapToGeometry.THRESHOLD){
_2f06&=~draw2d.SnapToHelper.SOUTH;
_2f08.y+=_2f0b;
}
}
if((_2f06&draw2d.SnapToHelper.NORTH)!==0){
var _2f0c=this.getCorrectionFor(this.rows,_2f07.getY(),-1);
if(_2f0c!==draw2d.SnapToGeometry.THRESHOLD){
_2f06&=~draw2d.SnapToHelper.NORTH;
_2f08.y+=_2f0c;
}
}
return _2f06;
};
draw2d.SnapToGeometry.prototype.snapRectangle=function(_2f0d,_2f0e){
var _2f0f=_2f0d.getTopLeft();
var _2f10=_2f0d.getBottomRight();
var _2f11=this.snapPoint(draw2d.SnapToHelper.NORTH_WEST,_2f0d.getTopLeft(),_2f0f);
_2f0e.x=_2f0f.x;
_2f0e.y=_2f0f.y;
var _2f12=this.snapPoint(draw2d.SnapToHelper.SOUTH_EAST,_2f0d.getBottomRight(),_2f10);
if(_2f11&draw2d.SnapToHelper.WEST){
_2f0e.x=_2f10.x-_2f0d.getWidth();
}
if(_2f11&draw2d.SnapToHelper.NORTH){
_2f0e.y=_2f10.y-_2f0d.getHeight();
}
return _2f11|_2f12;
};
draw2d.SnapToGeometry.prototype.populateRowsAndCols=function(){
this.rows=[];
this.cols=[];
var _2f13=this.workflow.getDocument().getFigures();
var index=0;
for(var i=0;i<_2f13.getSize();i++){
var _2f16=_2f13.get(i);
if(_2f16!=this.workflow.getCurrentSelection()){
var _2f17=_2f16.getBounds();
this.cols[index*3]=new draw2d.SnapToGeometryEntry(-1,_2f17.getX());
this.rows[index*3]=new draw2d.SnapToGeometryEntry(-1,_2f17.getY());
this.cols[index*3+1]=new draw2d.SnapToGeometryEntry(0,_2f17.x+(_2f17.getWidth()-1)/2);
this.rows[index*3+1]=new draw2d.SnapToGeometryEntry(0,_2f17.y+(_2f17.getHeight()-1)/2);
this.cols[index*3+2]=new draw2d.SnapToGeometryEntry(1,_2f17.getRight()-1);
this.rows[index*3+2]=new draw2d.SnapToGeometryEntry(1,_2f17.getBottom()-1);
index++;
}
}
};
draw2d.SnapToGeometry.prototype.getCorrectionFor=function(_2f18,value,side){
var _2f1b=draw2d.SnapToGeometry.THRESHOLD;
var _2f1c=draw2d.SnapToGeometry.THRESHOLD;
for(var i=0;i<_2f18.length;i++){
var entry=_2f18[i];
var _2f1f;
if(entry.type===-1&&side!==0){
_2f1f=Math.abs(value-entry.location);
if(_2f1f<_2f1b){
_2f1b=_2f1f;
_2f1c=entry.location-value;
}
}else{
if(entry.type===0&&side===0){
_2f1f=Math.abs(value-entry.location);
if(_2f1f<_2f1b){
_2f1b=_2f1f;
_2f1c=entry.location-value;
}
}else{
if(entry.type===1&&side!==0){
_2f1f=Math.abs(value-entry.location);
if(_2f1f<_2f1b){
_2f1b=_2f1f;
_2f1c=entry.location-value;
}
}
}
}
}
return _2f1c;
};
draw2d.SnapToGeometry.prototype.onSetDocumentDirty=function(){
this.rows=null;
this.cols=null;
};
draw2d.Border=function(){
this.color=null;
};
draw2d.Border.prototype.type="draw2d.Border";
draw2d.Border.prototype.dispose=function(){
this.color=null;
};
draw2d.Border.prototype.getHTMLStyle=function(){
return "";
};
draw2d.Border.prototype.setColor=function(c){
this.color=c;
};
draw2d.Border.prototype.getColor=function(){
return this.color;
};
draw2d.Border.prototype.refresh=function(){
};
draw2d.LineBorder=function(width){
draw2d.Border.call(this);
this.width=1;
if(width){
this.width=width;
}
this.figure=null;
};
draw2d.LineBorder.prototype=new draw2d.Border();
draw2d.LineBorder.prototype.type="draw2d.LineBorder";
draw2d.LineBorder.prototype.dispose=function(){
draw2d.Border.prototype.dispose.call(this);
this.figure=null;
};
draw2d.LineBorder.prototype.setLineWidth=function(w){
this.width=w;
if(this.figure!==null){
this.figure.html.style.border=this.getHTMLStyle();
}
};
draw2d.LineBorder.prototype.getHTMLStyle=function(){
if(this.getColor()!==null){
return this.width+"px solid "+this.getColor().getHTMLStyle();
}
return this.width+"px solid black";
};
draw2d.LineBorder.prototype.refresh=function(){
this.setLineWidth(this.width);
};
draw2d.Figure=function(){
this.construct();
};
draw2d.Figure.prototype.type="draw2d.Figure";
draw2d.Figure.ZOrderBaseIndex=100;
draw2d.Figure.setZOrderBaseIndex=function(index){
draw2d.Figure.ZOrderBaseIndex=index;
};
draw2d.Figure.prototype.construct=function(){
this.lastDragStartTime=0;
this.x=0;
this.y=0;
this.width=10;
this.height=10;
this.border=null;
this.id=draw2d.UUID.create();
this.html=this.createHTMLElement();
this.canvas=null;
this.workflow=null;
this.draggable=null;
this.parent=null;
this.isMoving=false;
this.canSnapToHelper=true;
this.snapToGridAnchor=new draw2d.Point(0,0);
this.timer=-1;
this.model=null;
this.alpha=1;
this.alphaBeforeOnDrag=1;
this.properties={};
this.moveListener=new draw2d.ArrayList();
this.setDimension(this.width,this.height);
this.setDeleteable(true);
this.setCanDrag(true);
this.setResizeable(true);
this.setSelectable(true);
};
draw2d.Figure.prototype.dispose=function(){
this.canvas=null;
this.workflow=null;
this.moveListener=null;
if(this.draggable!==null){
this.draggable.removeEventListener("mouseenter",this.tmpMouseEnter);
this.draggable.removeEventListener("mouseleave",this.tmpMouseLeave);
this.draggable.removeEventListener("dragend",this.tmpDragend);
this.draggable.removeEventListener("dragstart",this.tmpDragstart);
this.draggable.removeEventListener("drag",this.tmpDrag);
this.draggable.removeEventListener("dblclick",this.tmpDoubleClick);
this.draggable.node=null;
this.draggable.target.removeAllElements();
}
this.draggable=null;
if(this.border!==null){
this.border.dispose();
}
this.border=null;
if(this.parent!==null){
this.parent.removeChild(this);
}
};
draw2d.Figure.prototype.getProperties=function(){
return this.properties;
};
draw2d.Figure.prototype.getProperty=function(key){
return this.properties[key];
};
draw2d.Figure.prototype.setProperty=function(key,value){
this.properties[key]=value;
this.setDocumentDirty();
};
draw2d.Figure.prototype.getId=function(){
return this.id;
};
draw2d.Figure.prototype.setId=function(id){
this.id=id;
if(this.html!==null){
this.html.id=id;
}
};
draw2d.Figure.prototype.setCanvas=function(_275f){
this.canvas=_275f;
};
draw2d.Figure.prototype.getWorkflow=function(){
return this.workflow;
};
draw2d.Figure.prototype.setWorkflow=function(_2760){
if(this.draggable===null){
this.html.tabIndex="0";
var oThis=this;
this.keyDown=function(event){
event.cancelBubble=true;
event.returnValue=true;
oThis.onKeyDown(event.keyCode,event.ctrlKey);
};
if(this.html.addEventListener){
this.html.addEventListener("keydown",this.keyDown,false);
}else{
if(this.html.attachEvent){
this.html.attachEvent("onkeydown",this.keyDown);
}
}
this.draggable=new draw2d.Draggable(this.html,draw2d.Draggable.DRAG_X|draw2d.Draggable.DRAG_Y);
this.draggable.node=this;
this.tmpContextMenu=function(_2763){
oThis.onContextMenu(oThis.x+_2763.x,_2763.y+oThis.y);
};
this.tmpMouseEnter=function(_2764){
oThis.onMouseEnter();
};
this.tmpMouseLeave=function(_2765){
oThis.onMouseLeave();
};
this.tmpDragend=function(_2766){
oThis.onDragend();
};
this.tmpDragstart=function(_2767){
var w=oThis.workflow;
w.showMenu(null);
if(w.toolPalette&&w.toolPalette.activeTool){
_2767.returnValue=false;
w.onMouseDown(oThis.x+_2767.x,_2767.y+oThis.y);
w.onMouseUp(oThis.x+_2767.x,_2767.y+oThis.y);
return;
}
if(!(oThis instanceof draw2d.ResizeHandle)&&!(oThis instanceof draw2d.Port)){
var line=w.getBestLine(oThis.x+_2767.x,_2767.y+oThis.y);
if(line!==null){
_2767.returnValue=false;
w.setCurrentSelection(line);
w.showLineResizeHandles(line);
w.onMouseDown(oThis.x+_2767.x,_2767.y+oThis.y);
return;
}else{
if(oThis.isSelectable()){
w.showResizeHandles(oThis);
w.setCurrentSelection(oThis);
}
}
}
_2767.returnValue=oThis.onDragstart(_2767.x,_2767.y);
};
this.tmpDrag=function(_276a){
oThis.onDrag();
};
this.tmpDoubleClick=function(_276b){
oThis.onDoubleClick();
};
this.draggable.addEventListener("contextmenu",this.tmpContextMenu);
this.draggable.addEventListener("mouseenter",this.tmpMouseEnter);
this.draggable.addEventListener("mouseleave",this.tmpMouseLeave);
this.draggable.addEventListener("dragend",this.tmpDragend);
this.draggable.addEventListener("dragstart",this.tmpDragstart);
this.draggable.addEventListener("drag",this.tmpDrag);
this.draggable.addEventListener("dblclick",this.tmpDoubleClick);
}
this.workflow=_2760;
};
draw2d.Figure.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.height=this.width+"px";
item.style.width=this.height+"px";
item.style.margin="0px";
item.style.padding="0px";
item.style.outline="none";
item.style.zIndex=""+draw2d.Figure.ZOrderBaseIndex;
return item;
};
draw2d.Figure.prototype.setParent=function(_276d){
this.parent=_276d;
};
draw2d.Figure.prototype.getParent=function(){
return this.parent;
};
draw2d.Figure.prototype.getZOrder=function(){
return this.html.style.zIndex;
};
draw2d.Figure.prototype.setZOrder=function(index){
this.html.style.zIndex=index;
};
draw2d.Figure.prototype.hasFixedPosition=function(){
return false;
};
draw2d.Figure.prototype.getMinWidth=function(){
return 5;
};
draw2d.Figure.prototype.getMinHeight=function(){
return 5;
};
draw2d.Figure.prototype.getHTMLElement=function(){
if(this.html===null){
this.html=this.createHTMLElement();
}
return this.html;
};
draw2d.Figure.prototype.paint=function(){
};
draw2d.Figure.prototype.setBorder=function(_276f){
if(this.border!==null){
this.border.figure=null;
}
this.border=_276f;
this.border.figure=this;
this.border.refresh();
this.setDocumentDirty();
};
draw2d.Figure.prototype.onRemove=function(_2770){
};
draw2d.Figure.prototype.onContextMenu=function(x,y){
var menu=this.getContextMenu();
if(menu!==null){
this.workflow.showMenu(menu,x,y);
}
};
draw2d.Figure.prototype.getContextMenu=function(){
return null;
};
draw2d.Figure.prototype.onDoubleClick=function(){
};
draw2d.Figure.prototype.onMouseEnter=function(){
};
draw2d.Figure.prototype.onMouseLeave=function(){
};
draw2d.Figure.prototype.onDrag=function(){
this.x=this.draggable.getLeft();
this.y=this.draggable.getTop();
if(this.isMoving==false){
this.isMoving=true;
this.alphaBeforeOnDrag=this.getAlpha();
this.setAlpha(this.alphaBeforeOnDrag*0.5);
}
this.fireMoveEvent();
};
draw2d.Figure.prototype.onDragend=function(){
if(this.getWorkflow().getEnableSmoothFigureHandling()===true){
var oThis=this;
var _2775=function(){
if(oThis.alpha<oThis.alphaBeforeOnDrag){
oThis.setAlpha(Math.min(1,oThis.alpha+0.05));
}else{
window.clearInterval(oThis.timer);
oThis.timer=-1;
}
};
if(oThis.timer>0){
window.clearInterval(oThis.timer);
}
oThis.timer=window.setInterval(_2775,20);
}else{
this.setAlpha(this.alphaBeforeOnDrag);
}
this.command.setPosition(this.x,this.y);
this.workflow.commandStack.execute(this.command);
this.command=null;
this.isMoving=false;
this.workflow.hideSnapToHelperLines();
this.fireMoveEvent();
};
draw2d.Figure.prototype.onDragstart=function(x,y){
this.command=this.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.MOVE));
return this.command!==null;
};
draw2d.Figure.prototype.setCanDrag=function(flag){
this.canDrag=flag;
if(flag){
this.html.style.cursor="move";
}else{
this.html.style.cursor="";
}
};
draw2d.Figure.prototype.getCanDrag=function(){
return this.canDrag;
};
draw2d.Figure.prototype.setAlpha=function(_2779){
if(this.alpha===_2779){
return;
}
this.alpha=Math.max(0,Math.min(1,_2779));
if(this.alpha==1){
this.html.style.filter="";
this.html.style.opacity="";
}else{
this.html.style.filter="alpha(opacity="+Math.round(this.alpha*100)+")";
this.html.style.opacity=this.alpha;
}
};
draw2d.Figure.prototype.getAlpha=function(){
return this.alpha;
};
draw2d.Figure.prototype.setDimension=function(w,h){
this.width=Math.max(this.getMinWidth(),w);
this.height=Math.max(this.getMinHeight(),h);
if(this.html===null){
return;
}
this.html.style.width=this.width+"px";
this.html.style.height=this.height+"px";
this.fireMoveEvent();
if(this.workflow!==null&&this.workflow.getCurrentSelection()==this){
this.workflow.showResizeHandles(this);
}
};
draw2d.Figure.prototype.setPosition=function(xPos,yPos){
this.x=xPos;
this.y=yPos;
if(this.html===null){
return;
}
this.html.style.left=this.x+"px";
this.html.style.top=this.y+"px";
this.fireMoveEvent();
if(this.workflow!==null&&this.workflow.getCurrentSelection()==this){
this.workflow.showResizeHandles(this);
}
};
draw2d.Figure.prototype.isResizeable=function(){
return this.resizeable;
};
draw2d.Figure.prototype.setResizeable=function(flag){
this.resizeable=flag;
};
draw2d.Figure.prototype.isSelectable=function(){
return this.selectable;
};
draw2d.Figure.prototype.setSelectable=function(flag){
this.selectable=flag;
};
draw2d.Figure.prototype.isStrechable=function(){
return true;
};
draw2d.Figure.prototype.isDeleteable=function(){
return this.deleteable;
};
draw2d.Figure.prototype.setDeleteable=function(flag){
this.deleteable=flag;
};
draw2d.Figure.prototype.setCanSnapToHelper=function(flag){
this.canSnapToHelper=flag;
};
draw2d.Figure.prototype.getCanSnapToHelper=function(){
return this.canSnapToHelper;
};
draw2d.Figure.prototype.getSnapToGridAnchor=function(){
return this.snapToGridAnchor;
};
draw2d.Figure.prototype.setSnapToGridAnchor=function(point){
this.snapToGridAnchor=point;
};
draw2d.Figure.prototype.getBounds=function(){
return new draw2d.Dimension(this.getX(),this.getY(),this.getWidth(),this.getHeight());
};
draw2d.Figure.prototype.getWidth=function(){
return this.width;
};
draw2d.Figure.prototype.getHeight=function(){
return this.height;
};
draw2d.Figure.prototype.getY=function(){
return this.y;
};
draw2d.Figure.prototype.getX=function(){
return this.x;
};
draw2d.Figure.prototype.getAbsoluteY=function(){
return this.y;
};
draw2d.Figure.prototype.getAbsoluteX=function(){
return this.x;
};
draw2d.Figure.prototype.onKeyDown=function(_2783,ctrl){
if(_2783==46){
this.workflow.getCommandStack().execute(this.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.DELETE)));
}
if(ctrl){
this.workflow.onKeyDown(_2783,ctrl);
}
};
draw2d.Figure.prototype.getPosition=function(){
return new draw2d.Point(this.x,this.y);
};
draw2d.Figure.prototype.isOver=function(iX,iY){
var x=this.getAbsoluteX();
var y=this.getAbsoluteY();
var iX2=x+this.width;
var iY2=y+this.height;
return (iX>=x&&iX<=iX2&&iY>=y&&iY<=iY2);
};
draw2d.Figure.prototype.attachMoveListener=function(_278b){
if(_278b===null||this.moveListener===null){
return;
}
this.moveListener.add(_278b);
};
draw2d.Figure.prototype.detachMoveListener=function(_278c){
if(_278c===null||this.moveListener===null){
return;
}
this.moveListener.remove(_278c);
};
draw2d.Figure.prototype.fireMoveEvent=function(){
this.setDocumentDirty();
var size=this.moveListener.getSize();
for(var i=0;i<size;i++){
this.moveListener.get(i).onOtherFigureMoved(this);
}
};
draw2d.Figure.prototype.setModel=function(model){
if(this.model!==null){
this.model.removePropertyChangeListener(this);
}
this.model=model;
if(this.model!==null){
this.model.addPropertyChangeListener(this);
}
};
draw2d.Figure.prototype.getModel=function(){
return this.model;
};
draw2d.Figure.prototype.onOtherFigureMoved=function(_2790){
};
draw2d.Figure.prototype.setDocumentDirty=function(){
if(this.workflow!==null){
this.workflow.setDocumentDirty();
}
};
draw2d.Figure.prototype.disableTextSelection=function(_2791){
_2791.onselectstart=function(){
return false;
};
_2791.unselectable="on";
_2791.className=_2791.className+" unselectable";
_2791.onmousedown=function(){
return false;
};
};
draw2d.Figure.prototype.createCommand=function(_2792){
if(_2792.getPolicy()==draw2d.EditPolicy.MOVE){
if(!this.canDrag){
return null;
}
return new draw2d.CommandMove(this);
}
if(_2792.getPolicy()==draw2d.EditPolicy.DELETE){
if(!this.isDeleteable()){
return null;
}
return new draw2d.CommandDelete(this);
}
if(_2792.getPolicy()==draw2d.EditPolicy.RESIZE){
if(!this.isResizeable()){
return null;
}
return new draw2d.CommandResize(this);
}
return null;
};
draw2d.Node=function(){
this.bgColor=null;
this.lineColor=new draw2d.Color(128,128,255);
this.lineStroke=1;
this.ports=new draw2d.ArrayList();
draw2d.Figure.call(this);
};
draw2d.Node.prototype=new draw2d.Figure();
draw2d.Node.prototype.type="draw2d.Node";
draw2d.Node.prototype.dispose=function(){
for(var i=0;i<this.ports.getSize();i++){
this.ports.get(i).dispose();
}
this.ports=null;
draw2d.Figure.prototype.dispose.call(this);
};
draw2d.Node.prototype.createHTMLElement=function(){
var item=draw2d.Figure.prototype.createHTMLElement.call(this);
item.style.width="auto";
item.style.height="auto";
item.style.margin="0px";
item.style.padding="0px";
if(this.lineColor!==null){
item.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
}
item.style.fontSize="1px";
if(this.bgColor!==null){
item.style.backgroundColor=this.bgColor.getHTMLStyle();
}
return item;
};
draw2d.Node.prototype.paint=function(){
draw2d.Figure.prototype.paint.call(this);
for(var i=0;i<this.ports.getSize();i++){
this.ports.get(i).paint();
}
};
draw2d.Node.prototype.getPorts=function(){
return this.ports;
};
draw2d.Node.prototype.getInputPorts=function(){
var _2dc3=new draw2d.ArrayList();
for(var i=0;i<this.ports.getSize();i++){
var port=this.ports.get(i);
if(port instanceof draw2d.InputPort){
_2dc3.add(port);
}
}
return _2dc3;
};
draw2d.Node.prototype.getOutputPorts=function(){
var _2dc6=new draw2d.ArrayList();
for(var i=0;i<this.ports.getSize();i++){
var port=this.ports.get(i);
if(port instanceof draw2d.OutputPort){
_2dc6.add(port);
}
}
return _2dc6;
};
draw2d.Node.prototype.getPort=function(_2dc9){
if(this.ports===null){
return null;
}
for(var i=0;i<this.ports.getSize();i++){
var port=this.ports.get(i);
if(port.getName()==_2dc9){
return port;
}
}
};
draw2d.Node.prototype.getInputPort=function(_2dcc){
if(this.ports===null){
return null;
}
for(var i=0;i<this.ports.getSize();i++){
var port=this.ports.get(i);
if(port.getName()==_2dcc&&port instanceof draw2d.InputPort){
return port;
}
}
};
draw2d.Node.prototype.getOutputPort=function(_2dcf){
if(this.ports===null){
return null;
}
for(var i=0;i<this.ports.getSize();i++){
var port=this.ports.get(i);
if(port.getName()==_2dcf&&port instanceof draw2d.OutputPort){
return port;
}
}
};
draw2d.Node.prototype.addPort=function(port,x,y){
this.ports.add(port);
port.setOrigin(x,y);
port.setPosition(x,y);
port.setParent(this);
port.setDeleteable(false);
this.html.appendChild(port.getHTMLElement());
if(this.workflow!==null){
this.workflow.registerPort(port);
}
};
draw2d.Node.prototype.removePort=function(port){
if(this.ports!==null){
this.ports.remove(port);
}
try{
this.html.removeChild(port.getHTMLElement());
}
catch(exc){
}
if(this.workflow!==null){
this.workflow.unregisterPort(port);
}
var _2dd6=port.getConnections();
for(var i=0;i<_2dd6.getSize();++i){
this.workflow.removeFigure(_2dd6.get(i));
}
};
draw2d.Node.prototype.setWorkflow=function(_2dd8){
var _2dd9=this.workflow;
draw2d.Figure.prototype.setWorkflow.call(this,_2dd8);
if(_2dd9!==null){
for(var i=0;i<this.ports.getSize();i++){
_2dd9.unregisterPort(this.ports.get(i));
}
}
if(this.workflow!==null){
for(var i=0;i<this.ports.getSize();i++){
this.workflow.registerPort(this.ports.get(i));
}
}
};
draw2d.Node.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.bgColor!==null){
this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
}else{
this.html.style.backgroundColor="transparent";
}
};
draw2d.Node.prototype.getBackgroundColor=function(){
return this.bgColor;
};
draw2d.Node.prototype.setColor=function(color){
this.lineColor=color;
if(this.lineColor!==null){
this.html.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
}else{
this.html.style.border="0px";
}
};
draw2d.Node.prototype.setLineWidth=function(w){
this.lineStroke=w;
if(this.lineColor!==null){
this.html.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
}else{
this.html.style.border="0px";
}
};
draw2d.Node.prototype.getModelSourceConnections=function(){
throw "You must override the method [Node.prototype.getModelSourceConnections]";
};
draw2d.Node.prototype.refreshConnections=function(){
if(this.workflow!==null){
this.workflow.refreshConnections(this);
}
};
draw2d.VectorFigure=function(){
this.bgColor=null;
this.lineColor=new draw2d.Color(0,0,0);
this.stroke=1;
this.graphics=null;
draw2d.Node.call(this);
};
draw2d.VectorFigure.prototype=new draw2d.Node;
draw2d.VectorFigure.prototype.type="draw2d.VectorFigure";
draw2d.VectorFigure.prototype.dispose=function(){
draw2d.Node.prototype.dispose.call(this);
this.bgColor=null;
this.lineColor=null;
if(this.graphics!==null){
this.graphics.clear();
}
this.graphics=null;
};
draw2d.VectorFigure.prototype.createHTMLElement=function(){
var item=draw2d.Node.prototype.createHTMLElement.call(this);
item.style.border="0px";
item.style.backgroundColor="transparent";
return item;
};
draw2d.VectorFigure.prototype.setWorkflow=function(_21e0){
draw2d.Node.prototype.setWorkflow.call(this,_21e0);
if(this.workflow===null){
this.graphics.clear();
this.graphics=null;
}
};
draw2d.VectorFigure.prototype.paint=function(){
if(this.html===null){
return;
}
try{
if(this.graphics===null){
this.graphics=new jsGraphics(this.html);
}else{
this.graphics.clear();
}
draw2d.Node.prototype.paint.call(this);
for(var i=0;i<this.ports.getSize();i++){
this.getHTMLElement().appendChild(this.ports.get(i).getHTMLElement());
}
}
catch(e){
pushErrorStack(e,"draw2d.VectorFigure.prototype.paint=function()["+area+"]");
}
};
draw2d.VectorFigure.prototype.setDimension=function(w,h){
draw2d.Node.prototype.setDimension.call(this,w,h);
if(this.graphics!==null){
this.paint();
}
};
draw2d.VectorFigure.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.graphics!==null){
this.paint();
}
};
draw2d.VectorFigure.prototype.getBackgroundColor=function(){
return this.bgColor;
};
draw2d.VectorFigure.prototype.setLineWidth=function(w){
this.stroke=w;
if(this.graphics!==null){
this.paint();
}
};
draw2d.VectorFigure.prototype.setColor=function(color){
this.lineColor=color;
if(this.graphics!==null){
this.paint();
}
};
draw2d.VectorFigure.prototype.getColor=function(){
return this.lineColor;
};
draw2d.SVGFigure=function(width,_312f){
this.bgColor=null;
this.lineColor=new draw2d.Color(0,0,0);
this.stroke=1;
this.context=null;
draw2d.Node.call(this);
if(width&&_312f){
this.setDimension(width,_312f);
}
};
draw2d.SVGFigure.prototype=new draw2d.Node();
draw2d.SVGFigure.prototype.type="draw2d.SVGFigure";
draw2d.SVGFigure.prototype.createHTMLElement=function(){
var item=new MooCanvas(this.id,{width:100,height:100});
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.zIndex=""+draw2d.Figure.ZOrderBaseIndex;
this.context=item.getContext("2d");
return item;
};
draw2d.SVGFigure.prototype.paint=function(){
this.context.clearRect(0,0,this.getWidth(),this.getHeight());
this.context.fillStyle="rgba(200,0,0,0.3)";
this.context.fillRect(0,0,this.getWidth(),this.getHeight());
};
draw2d.SVGFigure.prototype.setDimension=function(w,h){
draw2d.Node.prototype.setDimension.call(this,w,h);
this.html.width=w;
this.html.height=h;
this.html.style.width=w+"px";
this.html.style.height=h+"px";
if(this.context!==null){
if(this.context.element){
this.context.element.style.width=w+"px";
this.context.element.style.height=h+"px";
}
this.paint();
}
};
draw2d.SVGFigure.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.graphics!==null){
this.paint();
}
};
draw2d.SVGFigure.prototype.getBackgroundColor=function(){
return this.bgColor;
};
draw2d.SVGFigure.prototype.setLineWidth=function(w){
this.stroke=w;
if(this.context!==null){
this.paint();
}
};
draw2d.SVGFigure.prototype.setColor=function(color){
this.lineColor=color;
if(this.context!==null){
this.paint();
}
};
draw2d.SVGFigure.prototype.getColor=function(){
return this.lineColor;
};
draw2d.Label=function(msg){
this.msg=msg;
this.bgColor=null;
this.color=new draw2d.Color(0,0,0);
this.fontSize=10;
this.textNode=null;
this.align="center";
draw2d.Figure.call(this);
};
draw2d.Label.prototype=new draw2d.Figure();
draw2d.Label.prototype.type="draw2d.Label";
draw2d.Label.prototype.createHTMLElement=function(){
var item=draw2d.Figure.prototype.createHTMLElement.call(this);
this.textNode=document.createTextNode(this.msg);
item.appendChild(this.textNode);
item.style.color=this.color.getHTMLStyle();
item.style.fontSize=this.fontSize+"pt";
item.style.width="auto";
item.style.height="auto";
item.style.paddingLeft="3px";
item.style.paddingRight="3px";
item.style.textAlign=this.align;
item.style.MozUserSelect="none";
this.disableTextSelection(item);
if(this.bgColor!==null){
item.style.backgroundColor=this.bgColor.getHTMLStyle();
}
return item;
};
draw2d.Label.prototype.isResizeable=function(){
return false;
};
draw2d.Label.prototype.setWordwrap=function(flag){
this.html.style.whiteSpace=flag?"wrap":"nowrap";
};
draw2d.Label.prototype.setAlign=function(align){
this.align=align;
this.html.style.textAlign=align;
};
draw2d.Label.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.bgColor!==null){
this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
}else{
this.html.style.backgroundColor="transparent";
}
};
draw2d.Label.prototype.setColor=function(color){
this.color=color;
this.html.style.color=this.color.getHTMLStyle();
};
draw2d.Label.prototype.setFontSize=function(size){
this.fontSize=size;
this.html.style.fontSize=this.fontSize+"pt";
};
draw2d.Label.prototype.setDimension=function(w,h){
};
draw2d.Label.prototype.getWidth=function(){
if(window.getComputedStyle){
return parseInt(getComputedStyle(this.html,"").getPropertyValue("width"));
}
return parseInt(this.html.clientWidth);
};
draw2d.Label.prototype.getHeight=function(){
if(window.getComputedStyle){
return parseInt(getComputedStyle(this.html,"").getPropertyValue("height"));
}
return parseInt(this.html.clientHeight);
};
draw2d.Label.prototype.getText=function(){
return this.msg;
};
draw2d.Label.prototype.setText=function(text){
this.msg=text;
this.html.removeChild(this.textNode);
this.textNode=document.createTextNode(this.msg);
this.html.appendChild(this.textNode);
};
draw2d.Label.prototype.setStyledText=function(text){
this.msg=text;
this.html.removeChild(this.textNode);
this.textNode=document.createElement("div");
this.textNode.style.whiteSpace="nowrap";
this.textNode.innerHTML=text;
this.html.appendChild(this.textNode);
};
draw2d.Oval=function(){
draw2d.VectorFigure.call(this);
};
draw2d.Oval.prototype=new draw2d.VectorFigure();
draw2d.Oval.prototype.type="draw2d.Oval";
draw2d.Oval.prototype.paint=function(){
if(this.html===null){
return;
}
try{
draw2d.VectorFigure.prototype.paint.call(this);
this.graphics.setStroke(this.stroke);
if(this.bgColor!==null){
this.graphics.setColor(this.bgColor.getHTMLStyle());
this.graphics.fillOval(0,0,this.getWidth()-1,this.getHeight()-1);
}
if(this.lineColor!==null){
this.graphics.setColor(this.lineColor.getHTMLStyle());
this.graphics.drawOval(0,0,this.getWidth()-1,this.getHeight()-1);
}
this.graphics.paint();
}
catch(e){
pushErrorStack(e,"draw2d.Oval.prototype.paint=function()");
}
};
draw2d.Circle=function(_2f46){
draw2d.Oval.call(this);
if(_2f46){
this.setDimension(_2f46,_2f46);
}
};
draw2d.Circle.prototype=new draw2d.Oval();
draw2d.Circle.prototype.type="draw2d.Circle";
draw2d.Circle.prototype.setDimension=function(w,h){
if(w>h){
draw2d.Oval.prototype.setDimension.call(this,w,w);
}else{
draw2d.Oval.prototype.setDimension.call(this,h,h);
}
};
draw2d.Circle.prototype.isStrechable=function(){
return false;
};
draw2d.Rectangle=function(width,_1ee0){
this.bgColor=null;
this.lineColor=new draw2d.Color(0,0,0);
this.lineStroke=1;
draw2d.Figure.call(this);
if(width&&_1ee0){
this.setDimension(width,_1ee0);
}
};
draw2d.Rectangle.prototype=new draw2d.Figure();
draw2d.Rectangle.prototype.type="draw2d.Rectangle";
draw2d.Rectangle.prototype.dispose=function(){
draw2d.Figure.prototype.dispose.call(this);
this.bgColor=null;
this.lineColor=null;
};
draw2d.Rectangle.prototype.createHTMLElement=function(){
var item=draw2d.Figure.prototype.createHTMLElement.call(this);
item.style.width="auto";
item.style.height="auto";
item.style.margin="0px";
item.style.padding="0px";
item.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
item.style.fontSize="1px";
item.style.lineHeight="1px";
item.innerHTML="&nbsp";
if(this.bgColor!==null){
item.style.backgroundColor=this.bgColor.getHTMLStyle();
}
return item;
};
draw2d.Rectangle.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.bgColor!==null){
this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
}else{
this.html.style.backgroundColor="transparent";
}
};
draw2d.Rectangle.prototype.getBackgroundColor=function(){
return this.bgColor;
};
draw2d.Rectangle.prototype.setColor=function(color){
this.lineColor=color;
if(this.lineColor!==null){
this.html.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
}else{
this.html.style.border=this.lineStroke+"0px";
}
};
draw2d.Rectangle.prototype.getColor=function(){
return this.lineColor;
};
draw2d.Rectangle.prototype.getWidth=function(){
return draw2d.Figure.prototype.getWidth.call(this)+2*this.lineStroke;
};
draw2d.Rectangle.prototype.getHeight=function(){
return draw2d.Figure.prototype.getHeight.call(this)+2*this.lineStroke;
};
draw2d.Rectangle.prototype.setDimension=function(w,h){
draw2d.Figure.prototype.setDimension.call(this,w-2*this.lineStroke,h-2*this.lineStroke);
};
draw2d.Rectangle.prototype.setLineWidth=function(w){
var diff=w-this.lineStroke;
this.setDimension(this.getWidth()-2*diff,this.getHeight()-2*diff);
this.lineStroke=w;
var c="transparent";
if(this.lineColor!==null){
c=this.lineColor.getHTMLStyle();
}
this.html.style.border=this.lineStroke+"px solid "+c;
};
draw2d.Rectangle.prototype.getLineWidth=function(){
return this.lineStroke;
};
draw2d.ImageFigure=function(url){
if(url===undefined){
url=null;
}
this.url=url;
draw2d.Node.call(this);
this.setDimension(40,40);
};
draw2d.ImageFigure.prototype=new draw2d.Node;
draw2d.ImageFigure.prototype.type="draw2d.Image";
draw2d.ImageFigure.prototype.createHTMLElement=function(){
var item=draw2d.Node.prototype.createHTMLElement.call(this);
item.style.width=this.width+"px";
item.style.height=this.height+"px";
item.style.margin="0px";
item.style.padding="0px";
item.style.border="0px";
if(this.url!==null){
item.style.backgroundImage="url("+this.url+")";
}else{
item.style.backgroundImage="";
}
return item;
};
draw2d.ImageFigure.prototype.setColor=function(color){
};
draw2d.ImageFigure.prototype.isResizeable=function(){
return false;
};
draw2d.ImageFigure.prototype.setImage=function(url){
if(url===undefined){
url=null;
}
this.url=url;
if(this.url!==null){
this.html.style.backgroundImage="url("+this.url+")";
}else{
this.html.style.backgroundImage="";
}
};
draw2d.Port=function(_1e6f,_1e70){
Corona=function(){
};
Corona.prototype=new draw2d.Circle();
Corona.prototype.setAlpha=function(_1e71){
draw2d.Circle.prototype.setAlpha.call(this,Math.min(0.3,_1e71));
this.setDeleteable(false);
this.setCanDrag(false);
this.setResizeable(false);
this.setSelectable(false);
};
if(_1e6f===null||_1e6f===undefined){
this.currentUIRepresentation=new draw2d.Circle();
}else{
this.currentUIRepresentation=_1e6f;
}
if(_1e70===null||_1e70===undefined){
this.connectedUIRepresentation=new draw2d.Circle();
this.connectedUIRepresentation.setColor(null);
}else{
this.connectedUIRepresentation=_1e70;
}
this.disconnectedUIRepresentation=this.currentUIRepresentation;
this.hideIfConnected=false;
this.uiRepresentationAdded=true;
this.parentNode=null;
this.originX=0;
this.originY=0;
this.coronaWidth=10;
this.corona=null;
draw2d.Rectangle.call(this);
this.setDimension(8,8);
this.setBackgroundColor(new draw2d.Color(100,180,100));
this.setColor(new draw2d.Color(90,150,90));
draw2d.Rectangle.prototype.setColor.call(this,null);
this.dropable=new draw2d.DropTarget(this.html);
this.dropable.node=this;
this.dropable.addEventListener("dragenter",function(_1e72){
_1e72.target.node.onDragEnter(_1e72.relatedTarget.node);
});
this.dropable.addEventListener("dragleave",function(_1e73){
_1e73.target.node.onDragLeave(_1e73.relatedTarget.node);
});
this.dropable.addEventListener("drop",function(_1e74){
_1e74.relatedTarget.node.onDrop(_1e74.target.node);
});
};
draw2d.Port.prototype=new draw2d.Rectangle();
draw2d.Port.prototype.type="draw2d.Port";
draw2d.Port.ZOrderBaseIndex=5000;
draw2d.Port.setZOrderBaseIndex=function(index){
draw2d.Port.ZOrderBaseIndex=index;
};
draw2d.Port.prototype.setHideIfConnected=function(flag){
this.hideIfConnected=flag;
};
draw2d.Port.prototype.dispose=function(){
var size=this.moveListener.getSize();
for(var i=0;i<size;i++){
var _1e79=this.moveListener.get(i);
this.parentNode.workflow.removeFigure(_1e79);
_1e79.dispose();
}
draw2d.Rectangle.prototype.dispose.call(this);
this.parentNode=null;
this.dropable.node=null;
this.dropable=null;
this.disconnectedUIRepresentation.dispose();
this.connectedUIRepresentation.dispose();
};
draw2d.Port.prototype.createHTMLElement=function(){
var item=draw2d.Rectangle.prototype.createHTMLElement.call(this);
item.style.zIndex=draw2d.Port.ZOrderBaseIndex;
this.currentUIRepresentation.html.zIndex=draw2d.Port.ZOrderBaseIndex;
item.appendChild(this.currentUIRepresentation.html);
this.uiRepresentationAdded=true;
return item;
};
draw2d.Port.prototype.setUiRepresentation=function(_1e7b){
if(_1e7b===null){
_1e7b=new draw2d.Figure();
}
if(this.uiRepresentationAdded){
this.html.removeChild(this.currentUIRepresentation.getHTMLElement());
}
this.html.appendChild(_1e7b.getHTMLElement());
_1e7b.paint();
this.currentUIRepresentation=_1e7b;
};
draw2d.Port.prototype.onMouseEnter=function(){
this.setLineWidth(2);
};
draw2d.Port.prototype.onMouseLeave=function(){
this.setLineWidth(0);
};
draw2d.Port.prototype.setDimension=function(width,_1e7d){
draw2d.Rectangle.prototype.setDimension.call(this,width,_1e7d);
this.connectedUIRepresentation.setDimension(width,_1e7d);
this.disconnectedUIRepresentation.setDimension(width,_1e7d);
this.setPosition(this.x,this.y);
};
draw2d.Port.prototype.setBackgroundColor=function(color){
this.currentUIRepresentation.setBackgroundColor(color);
};
draw2d.Port.prototype.getBackgroundColor=function(){
return this.currentUIRepresentation.getBackgroundColor();
};
draw2d.Port.prototype.getConnections=function(){
var _1e7f=new draw2d.ArrayList();
var size=this.moveListener.getSize();
for(var i=0;i<size;i++){
var _1e82=this.moveListener.get(i);
if(_1e82 instanceof draw2d.Connection){
_1e7f.add(_1e82);
}
}
return _1e7f;
};
draw2d.Port.prototype.setColor=function(color){
this.currentUIRepresentation.setColor(color);
};
draw2d.Port.prototype.getColor=function(){
return this.currentUIRepresentation.getColor();
};
draw2d.Port.prototype.setLineWidth=function(width){
this.currentUIRepresentation.setLineWidth(width);
};
draw2d.Port.prototype.getLineWidth=function(){
return this.currentUIRepresentation.getLineWidth();
};
draw2d.Port.prototype.paint=function(){
try{
this.currentUIRepresentation.paint();
}
catch(e){
pushErrorStack(e,"draw2d.Port.prototype.paint=function()");
}
};
draw2d.Port.prototype.setPosition=function(xPos,yPos){
this.originX=xPos;
this.originY=yPos;
draw2d.Rectangle.prototype.setPosition.call(this,xPos,yPos);
if(this.html===null){
return;
}
this.html.style.left=(this.x-this.getWidth()/2)+"px";
this.html.style.top=(this.y-this.getHeight()/2)+"px";
};
draw2d.Port.prototype.setParent=function(_1e87){
if(this.parentNode!==null){
this.parentNode.detachMoveListener(this);
}
this.parentNode=_1e87;
if(this.parentNode!==null){
this.parentNode.attachMoveListener(this);
}
};
draw2d.Port.prototype.attachMoveListener=function(_1e88){
draw2d.Rectangle.prototype.attachMoveListener.call(this,_1e88);
if(this.hideIfConnected==true){
this.setUiRepresentation(this.connectedUIRepresentation);
}
};
draw2d.Port.prototype.detachMoveListener=function(_1e89){
draw2d.Rectangle.prototype.detachMoveListener.call(this,_1e89);
if(this.getConnections().getSize()==0){
this.setUiRepresentation(this.disconnectedUIRepresentation);
}
};
draw2d.Port.prototype.getParent=function(){
return this.parentNode;
};
draw2d.Port.prototype.onDrag=function(){
draw2d.Rectangle.prototype.onDrag.call(this);
this.parentNode.workflow.showConnectionLine(this.parentNode.x+this.x,this.parentNode.y+this.y,this.parentNode.x+this.originX,this.parentNode.y+this.originY);
};
draw2d.Port.prototype.getCoronaWidth=function(){
return this.coronaWidth;
};
draw2d.Port.prototype.setCoronaWidth=function(width){
this.coronaWidth=width;
};
draw2d.Port.prototype.setOrigin=function(x,y){
this.originX=x;
this.originY=y;
};
draw2d.Port.prototype.onDragend=function(){
this.setAlpha(1);
this.setPosition(this.originX,this.originY);
this.parentNode.workflow.hideConnectionLine();
document.body.focus();
};
draw2d.Port.prototype.onDragEnter=function(port){
var _1e8e=new draw2d.EditPolicy(draw2d.EditPolicy.CONNECT);
_1e8e.canvas=this.parentNode.workflow;
_1e8e.source=port;
_1e8e.target=this;
var _1e8f=this.createCommand(_1e8e);
if(_1e8f===null){
return;
}
this.parentNode.workflow.connectionLine.setColor(new draw2d.Color(0,150,0));
this.parentNode.workflow.connectionLine.setLineWidth(3);
this.showCorona(true);
};
draw2d.Port.prototype.onDragLeave=function(port){
this.parentNode.workflow.connectionLine.setColor(new draw2d.Color(0,0,0));
this.parentNode.workflow.connectionLine.setLineWidth(1);
this.showCorona(false);
};
draw2d.Port.prototype.onDrop=function(port){
var _1e92=new draw2d.EditPolicy(draw2d.EditPolicy.CONNECT);
_1e92.canvas=this.parentNode.workflow;
_1e92.source=port;
_1e92.target=this;
var _1e93=this.createCommand(_1e92);
if(_1e93!==null){
this.parentNode.workflow.getCommandStack().execute(_1e93);
}
};
draw2d.Port.prototype.getAbsolutePosition=function(){
return new draw2d.Point(this.getAbsoluteX(),this.getAbsoluteY());
};
draw2d.Port.prototype.getAbsoluteBounds=function(){
return new draw2d.Dimension(this.getAbsoluteX(),this.getAbsoluteY(),this.getWidth(),this.getHeight());
};
draw2d.Port.prototype.getAbsoluteY=function(){
return this.originY+this.parentNode.getY();
};
draw2d.Port.prototype.getAbsoluteX=function(){
return this.originX+this.parentNode.getX();
};
draw2d.Port.prototype.onOtherFigureMoved=function(_1e94){
this.fireMoveEvent();
};
draw2d.Port.prototype.getName=function(){
return this.name;
};
draw2d.Port.prototype.setName=function(name){
this.name=name;
};
draw2d.Port.prototype.isOver=function(iX,iY){
var x=this.getAbsoluteX()-this.coronaWidth-this.getWidth()/2;
var y=this.getAbsoluteY()-this.coronaWidth-this.getHeight()/2;
var iX2=x+this.width+(this.coronaWidth*2)+this.getWidth()/2;
var iY2=y+this.height+(this.coronaWidth*2)+this.getHeight()/2;
return (iX>=x&&iX<=iX2&&iY>=y&&iY<=iY2);
};
draw2d.Port.prototype.showCorona=function(flag,_1e9d){
if(flag===true){
this.corona=new Corona();
this.corona.setAlpha(0.3);
this.corona.setBackgroundColor(new draw2d.Color(0,125,125));
this.corona.setColor(null);
this.corona.setDimension(this.getWidth()+(this.getCoronaWidth()*2),this.getWidth()+(this.getCoronaWidth()*2));
this.parentNode.getWorkflow().addFigure(this.corona,this.getAbsoluteX()-this.getCoronaWidth()-this.getWidth()/2,this.getAbsoluteY()-this.getCoronaWidth()-this.getHeight()/2);
}else{
if(flag===false&&this.corona!==null){
this.parentNode.getWorkflow().removeFigure(this.corona);
this.corona=null;
}
}
};
draw2d.Port.prototype.createCommand=function(_1e9e){
if(_1e9e.getPolicy()===draw2d.EditPolicy.MOVE){
if(!this.canDrag){
return null;
}
return new draw2d.CommandMovePort(this);
}
if(_1e9e.getPolicy()===draw2d.EditPolicy.CONNECT){
if(_1e9e.source.parentNode.id===_1e9e.target.parentNode.id){
return null;
}else{
return new draw2d.CommandConnect(_1e9e.canvas,_1e9e.source,_1e9e.target);
}
}
return null;
};
draw2d.InputPort=function(_3595){
draw2d.Port.call(this,_3595);
};
draw2d.InputPort.prototype=new draw2d.Port();
draw2d.InputPort.prototype.type="draw2d.InputPort";
draw2d.InputPort.prototype.onDragstart=function(x,y){
if(!this.canDrag){
return false;
}
return true;
};
draw2d.InputPort.prototype.onDragEnter=function(port){
if(port instanceof draw2d.OutputPort){
draw2d.Port.prototype.onDragEnter.call(this,port);
}else{
if(port instanceof draw2d.LineStartResizeHandle){
var line=this.workflow.currentSelection;
if(line instanceof draw2d.Connection&&line.getSource() instanceof draw2d.InputPort){
draw2d.Port.prototype.onDragEnter.call(this,line.getTarget());
}
}else{
if(port instanceof draw2d.LineEndResizeHandle){
var line=this.workflow.currentSelection;
if(line instanceof draw2d.Connection&&line.getTarget() instanceof draw2d.InputPort){
draw2d.Port.prototype.onDragEnter.call(this,line.getSource());
}
}
}
}
};
draw2d.InputPort.prototype.onDragLeave=function(port){
if(port instanceof draw2d.OutputPort){
draw2d.Port.prototype.onDragLeave.call(this,port);
}else{
if(port instanceof draw2d.LineStartResizeHandle){
var line=this.workflow.currentSelection;
if(line instanceof draw2d.Connection&&line.getSource() instanceof draw2d.InputPort){
draw2d.Port.prototype.onDragLeave.call(this,line.getTarget());
}
}else{
if(port instanceof draw2d.LineEndResizeHandle){
var line=this.workflow.currentSelection;
if(line instanceof draw2d.Connection&&line.getTarget() instanceof draw2d.InputPort){
draw2d.Port.prototype.onDragLeave.call(this,line.getSource());
}
}
}
}
};
draw2d.InputPort.prototype.createCommand=function(_359c){
if(_359c.getPolicy()==draw2d.EditPolicy.CONNECT){
if(_359c.source.parentNode.id==_359c.target.parentNode.id){
return null;
}
if(_359c.source instanceof draw2d.OutputPort){
return new draw2d.CommandConnect(_359c.canvas,_359c.source,_359c.target);
}
return null;
}
return draw2d.Port.prototype.createCommand.call(this,_359c);
};
draw2d.OutputPort=function(_3672){
draw2d.Port.call(this,_3672);
this.maxFanOut=100;
};
draw2d.OutputPort.prototype=new draw2d.Port();
draw2d.OutputPort.prototype.type="draw2d.OutputPort";
draw2d.OutputPort.prototype.onDragEnter=function(port){
if(this.getMaxFanOut()<=this.getFanOut()){
return;
}
if(port instanceof draw2d.InputPort){
draw2d.Port.prototype.onDragEnter.call(this,port);
}else{
if(port instanceof draw2d.LineStartResizeHandle){
var line=this.workflow.currentSelection;
if(line instanceof draw2d.Connection&&line.getSource() instanceof draw2d.OutputPort){
draw2d.Port.prototype.onDragEnter.call(this,line.getTarget());
}
}else{
if(port instanceof draw2d.LineEndResizeHandle){
var line=this.workflow.currentSelection;
if(line instanceof draw2d.Connection&&line.getTarget() instanceof draw2d.OutputPort){
draw2d.Port.prototype.onDragEnter.call(this,line.getSource());
}
}
}
}
};
draw2d.OutputPort.prototype.onDragLeave=function(port){
if(port instanceof draw2d.InputPort){
draw2d.Port.prototype.onDragLeave.call(this,port);
}else{
if(port instanceof draw2d.LineStartResizeHandle){
var line=this.workflow.currentSelection;
if(line instanceof draw2d.Connection&&line.getSource() instanceof draw2d.OutputPort){
draw2d.Port.prototype.onDragLeave.call(this,line.getTarget());
}
}else{
if(port instanceof draw2d.LineEndResizeHandle){
var line=this.workflow.currentSelection;
if(line instanceof draw2d.Connection&&line.getTarget() instanceof draw2d.OutputPort){
draw2d.Port.prototype.onDragLeave.call(this,line.getSource());
}
}
}
}
};
draw2d.OutputPort.prototype.onDragstart=function(x,y){
if(!this.canDrag){
return false;
}
if(this.maxFanOut===-1){
return true;
}
if(this.getMaxFanOut()<=this.getFanOut()){
return false;
}
return true;
};
draw2d.OutputPort.prototype.setMaxFanOut=function(count){
this.maxFanOut=count;
};
draw2d.OutputPort.prototype.getMaxFanOut=function(){
return this.maxFanOut;
};
draw2d.OutputPort.prototype.getFanOut=function(){
if(this.getParent().workflow===null){
return 0;
}
var count=0;
var lines=this.getParent().workflow.getLines();
var size=lines.getSize();
for(var i=0;i<size;i++){
var line=lines.get(i);
if(line instanceof draw2d.Connection){
if(line.getSource()==this){
count++;
}else{
if(line.getTarget()==this){
count++;
}
}
}
}
return count;
};
draw2d.OutputPort.prototype.createCommand=function(_367f){
if(_367f.getPolicy()===draw2d.EditPolicy.CONNECT){
if(_367f.source.parentNode.id===_367f.target.parentNode.id){
return null;
}
if(_367f.source instanceof draw2d.InputPort){
return new draw2d.CommandConnect(_367f.canvas,_367f.target,_367f.source);
}
return null;
}
return draw2d.Port.prototype.createCommand.call(this,_367f);
};
draw2d.Line=function(){
this.lineColor=new draw2d.Color(0,0,0);
this.stroke=1;
this.canvas=null;
this.parent=null;
this.workflow=null;
this.html=null;
this.graphics=null;
this.id=draw2d.UUID.create();
this.startX=30;
this.startY=30;
this.endX=100;
this.endY=100;
this.alpha=1;
this.isMoving=false;
this.model=null;
this.zOrder=draw2d.Line.ZOrderBaseIndex;
this.corona=draw2d.Line.CoronaWidth;
this.properties={};
this.moveListener=new draw2d.ArrayList();
this.setSelectable(true);
this.setDeleteable(true);
};
draw2d.Line.prototype.type="draw2d.Line";
draw2d.Line.ZOrderBaseIndex=200;
draw2d.Line.CoronaWidth=5;
draw2d.Line.setZOrderBaseIndex=function(index){
draw2d.Line.ZOrderBaseIndex=index;
};
draw2d.Line.setDefaultCoronaWidth=function(width){
draw2d.Line.CoronaWidth=width;
};
draw2d.Line.prototype.dispose=function(){
this.canvas=null;
this.workflow=null;
if(this.graphics!==null){
this.graphics.clear();
}
this.graphics=null;
};
draw2d.Line.prototype.getZOrder=function(){
return this.zOrder;
};
draw2d.Line.prototype.setZOrder=function(index){
if(this.html!==null){
this.html.style.zIndex=index;
}
this.zOrder=index;
};
draw2d.Line.prototype.setCoronaWidth=function(width){
this.corona=width;
};
draw2d.Line.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.left="0px";
item.style.top="0px";
item.style.height="0px";
item.style.width="0px";
item.style.zIndex=this.zOrder;
return item;
};
draw2d.Line.prototype.setId=function(id){
this.id=id;
if(this.html!==null){
this.html.id=id;
}
};
draw2d.Line.prototype.getId=function(){
return this.id;
};
draw2d.Line.prototype.getProperties=function(){
return this.properties;
};
draw2d.Line.prototype.getProperty=function(key){
return this.properties[key];
};
draw2d.Line.prototype.setProperty=function(key,value){
this.properties[key]=value;
this.setDocumentDirty();
};
draw2d.Line.prototype.getHTMLElement=function(){
if(this.html===null){
this.html=this.createHTMLElement();
}
return this.html;
};
draw2d.Line.prototype.getWorkflow=function(){
return this.workflow;
};
draw2d.Line.prototype.isResizeable=function(){
return true;
};
draw2d.Line.prototype.setCanvas=function(_3637){
this.canvas=_3637;
if(this.graphics!==null){
this.graphics.clear();
}
this.graphics=null;
};
draw2d.Line.prototype.setWorkflow=function(_3638){
this.workflow=_3638;
if(this.graphics!==null){
this.graphics.clear();
}
this.graphics=null;
};
draw2d.Line.prototype.paint=function(){
if(this.html===null){
return;
}
try{
if(this.graphics===null){
this.graphics=new jsGraphics(this.html);
}else{
this.graphics.clear();
}
this.graphics.setStroke(this.stroke);
this.graphics.setColor(this.lineColor.getHTMLStyle());
this.graphics.drawLine(this.startX,this.startY,this.endX,this.endY);
this.graphics.paint();
}
catch(e){
pushErrorStack(e,"draw2d.Line.prototype.paint=function()");
}
};
draw2d.Line.prototype.attachMoveListener=function(_3639){
this.moveListener.add(_3639);
};
draw2d.Line.prototype.detachMoveListener=function(_363a){
this.moveListener.remove(_363a);
};
draw2d.Line.prototype.fireMoveEvent=function(){
var size=this.moveListener.getSize();
for(var i=0;i<size;i++){
this.moveListener.get(i).onOtherFigureMoved(this);
}
};
draw2d.Line.prototype.onOtherFigureMoved=function(_363d){
};
draw2d.Line.prototype.setLineWidth=function(w){
this.stroke=w;
if(this.graphics!==null){
this.paint();
}
this.setDocumentDirty();
};
draw2d.Line.prototype.setColor=function(color){
this.lineColor=color;
if(this.graphics!==null){
this.paint();
}
this.setDocumentDirty();
};
draw2d.Line.prototype.getColor=function(){
return this.lineColor;
};
draw2d.Line.prototype.setAlpha=function(_3640){
if(_3640==this.alpha){
return;
}
try{
this.html.style.MozOpacity=_3640;
}
catch(exc1){
}
try{
this.html.style.opacity=_3640;
}
catch(exc2){
}
try{
var _3641=Math.round(_3640*100);
if(_3641>=99){
this.html.style.filter="";
}else{
this.html.style.filter="alpha(opacity="+_3641+")";
}
}
catch(exc3){
}
this.alpha=_3640;
};
draw2d.Line.prototype.setStartPoint=function(x,y){
this.startX=x;
this.startY=y;
if(this.graphics!==null){
this.paint();
}
this.setDocumentDirty();
};
draw2d.Line.prototype.setEndPoint=function(x,y){
this.endX=x;
this.endY=y;
if(this.graphics!==null){
this.paint();
}
this.setDocumentDirty();
};
draw2d.Line.prototype.getStartX=function(){
return this.startX;
};
draw2d.Line.prototype.getStartY=function(){
return this.startY;
};
draw2d.Line.prototype.getStartPoint=function(){
return new draw2d.Point(this.startX,this.startY);
};
draw2d.Line.prototype.getEndX=function(){
return this.endX;
};
draw2d.Line.prototype.getEndY=function(){
return this.endY;
};
draw2d.Line.prototype.getEndPoint=function(){
return new draw2d.Point(this.endX,this.endY);
};
draw2d.Line.prototype.isSelectable=function(){
return this.selectable;
};
draw2d.Line.prototype.setSelectable=function(flag){
this.selectable=flag;
};
draw2d.Line.prototype.isDeleteable=function(){
return this.deleteable;
};
draw2d.Line.prototype.setDeleteable=function(flag){
this.deleteable=flag;
};
draw2d.Line.prototype.getLength=function(){
return Math.sqrt((this.startX-this.endX)*(this.startX-this.endX)+(this.startY-this.endY)*(this.startY-this.endY));
};
draw2d.Line.prototype.getAngle=function(){
var _3648=this.getLength();
var angle=-(180/Math.PI)*Math.asin((this.startY-this.endY)/_3648);
if(angle<0){
if(this.endX<this.startX){
angle=Math.abs(angle)+180;
}else{
angle=360-Math.abs(angle);
}
}else{
if(this.endX<this.startX){
angle=180-angle;
}
}
return angle;
};
draw2d.Line.prototype.createCommand=function(_364a){
if(_364a.getPolicy()==draw2d.EditPolicy.MOVE){
var x1=this.getStartX();
var y1=this.getStartY();
var x2=this.getEndX();
var y2=this.getEndY();
return new draw2d.CommandMoveLine(this,x1,y1,x2,y2);
}
if(_364a.getPolicy()==draw2d.EditPolicy.DELETE){
if(this.isDeleteable()==false){
return null;
}
return new draw2d.CommandDelete(this);
}
return null;
};
draw2d.Line.prototype.setModel=function(model){
if(this.model!==null){
this.model.removePropertyChangeListener(this);
}
this.model=model;
if(this.model!==null){
this.model.addPropertyChangeListener(this);
}
};
draw2d.Line.prototype.getModel=function(){
return this.model;
};
draw2d.Line.prototype.onRemove=function(_3650){
};
draw2d.Line.prototype.onContextMenu=function(x,y){
var menu=this.getContextMenu();
if(menu!==null){
this.workflow.showMenu(menu,x,y);
}
};
draw2d.Line.prototype.getContextMenu=function(){
return null;
};
draw2d.Line.prototype.onDoubleClick=function(){
};
draw2d.Line.prototype.setDocumentDirty=function(){
if(this.workflow!==null){
this.workflow.setDocumentDirty();
}
};
draw2d.Line.prototype.containsPoint=function(px,py){
return draw2d.Line.hit(this.corona,this.startX,this.startY,this.endX,this.endY,px,py);
};
draw2d.Line.hit=function(_3656,X1,Y1,X2,Y2,px,py){
X2-=X1;
Y2-=Y1;
px-=X1;
py-=Y1;
var _365d=px*X2+py*Y2;
var _365e;
if(_365d<=0){
_365e=0;
}else{
px=X2-px;
py=Y2-py;
_365d=px*X2+py*Y2;
if(_365d<=0){
_365e=0;
}else{
_365e=_365d*_365d/(X2*X2+Y2*Y2);
}
}
var lenSq=px*px+py*py-_365e;
if(lenSq<0){
lenSq=0;
}
return Math.sqrt(lenSq)<_3656;
};
draw2d.ConnectionRouter=function(){
};
draw2d.ConnectionRouter.prototype.type="draw2d.ConnectionRouter";
draw2d.ConnectionRouter.prototype.getDirection=function(r,p){
var _279a=Math.abs(r.x-p.x);
var _279b=3;
var i=Math.abs(r.y-p.y);
if(i<=_279a){
_279a=i;
_279b=0;
}
i=Math.abs(r.getBottom()-p.y);
if(i<=_279a){
_279a=i;
_279b=2;
}
i=Math.abs(r.getRight()-p.x);
if(i<_279a){
_279a=i;
_279b=1;
}
return _279b;
};
draw2d.ConnectionRouter.prototype.getEndDirection=function(conn){
var p=conn.getEndPoint();
var rect=conn.getTarget().getParent().getBounds();
return this.getDirection(rect,p);
};
draw2d.ConnectionRouter.prototype.getStartDirection=function(conn){
var p=conn.getStartPoint();
var rect=conn.getSource().getParent().getBounds();
return this.getDirection(rect,p);
};
draw2d.ConnectionRouter.prototype.route=function(_27a3){
};
draw2d.NullConnectionRouter=function(){
};
draw2d.NullConnectionRouter.prototype=new draw2d.ConnectionRouter();
draw2d.NullConnectionRouter.prototype.type="draw2d.NullConnectionRouter";
draw2d.NullConnectionRouter.prototype.invalidate=function(){
};
draw2d.NullConnectionRouter.prototype.route=function(_3143){
_3143.addPoint(_3143.getStartPoint());
_3143.addPoint(_3143.getEndPoint());
};
draw2d.ManhattanConnectionRouter=function(){
this.MINDIST=20;
};
draw2d.ManhattanConnectionRouter.prototype=new draw2d.ConnectionRouter();
draw2d.ManhattanConnectionRouter.prototype.type="draw2d.ManhattanConnectionRouter";
draw2d.ManhattanConnectionRouter.prototype.route=function(conn){
var _1eea=conn.getStartPoint();
var _1eeb=this.getStartDirection(conn);
var toPt=conn.getEndPoint();
var toDir=this.getEndDirection(conn);
this._route(conn,toPt,toDir,_1eea,_1eeb);
};
draw2d.ManhattanConnectionRouter.prototype._route=function(conn,_1eef,_1ef0,toPt,toDir){
var TOL=0.1;
var _1ef4=0.01;
var UP=0;
var RIGHT=1;
var DOWN=2;
var LEFT=3;
var xDiff=_1eef.x-toPt.x;
var yDiff=_1eef.y-toPt.y;
var point;
var dir;
if(((xDiff*xDiff)<(_1ef4))&&((yDiff*yDiff)<(_1ef4))){
conn.addPoint(new draw2d.Point(toPt.x,toPt.y));
return;
}
if(_1ef0==LEFT){
if((xDiff>0)&&((yDiff*yDiff)<TOL)&&(toDir===RIGHT)){
point=toPt;
dir=toDir;
}else{
if(xDiff<0){
point=new draw2d.Point(_1eef.x-this.MINDIST,_1eef.y);
}else{
if(((yDiff>0)&&(toDir===DOWN))||((yDiff<0)&&(toDir==UP))){
point=new draw2d.Point(toPt.x,_1eef.y);
}else{
if(_1ef0==toDir){
var pos=Math.min(_1eef.x,toPt.x)-this.MINDIST;
point=new draw2d.Point(pos,_1eef.y);
}else{
point=new draw2d.Point(_1eef.x-(xDiff/2),_1eef.y);
}
}
}
if(yDiff>0){
dir=UP;
}else{
dir=DOWN;
}
}
}else{
if(_1ef0==RIGHT){
if((xDiff<0)&&((yDiff*yDiff)<TOL)&&(toDir===LEFT)){
point=toPt;
dir=toDir;
}else{
if(xDiff>0){
point=new draw2d.Point(_1eef.x+this.MINDIST,_1eef.y);
}else{
if(((yDiff>0)&&(toDir===DOWN))||((yDiff<0)&&(toDir===UP))){
point=new draw2d.Point(toPt.x,_1eef.y);
}else{
if(_1ef0==toDir){
var pos=Math.max(_1eef.x,toPt.x)+this.MINDIST;
point=new draw2d.Point(pos,_1eef.y);
}else{
point=new draw2d.Point(_1eef.x-(xDiff/2),_1eef.y);
}
}
}
if(yDiff>0){
dir=UP;
}else{
dir=DOWN;
}
}
}else{
if(_1ef0==DOWN){
if(((xDiff*xDiff)<TOL)&&(yDiff<0)&&(toDir==UP)){
point=toPt;
dir=toDir;
}else{
if(yDiff>0){
point=new draw2d.Point(_1eef.x,_1eef.y+this.MINDIST);
}else{
if(((xDiff>0)&&(toDir===RIGHT))||((xDiff<0)&&(toDir===LEFT))){
point=new draw2d.Point(_1eef.x,toPt.y);
}else{
if(_1ef0===toDir){
var pos=Math.max(_1eef.y,toPt.y)+this.MINDIST;
point=new draw2d.Point(_1eef.x,pos);
}else{
point=new draw2d.Point(_1eef.x,_1eef.y-(yDiff/2));
}
}
}
if(xDiff>0){
dir=LEFT;
}else{
dir=RIGHT;
}
}
}else{
if(_1ef0==UP){
if(((xDiff*xDiff)<TOL)&&(yDiff>0)&&(toDir===DOWN)){
point=toPt;
dir=toDir;
}else{
if(yDiff<0){
point=new draw2d.Point(_1eef.x,_1eef.y-this.MINDIST);
}else{
if(((xDiff>0)&&(toDir===RIGHT))||((xDiff<0)&&(toDir===LEFT))){
point=new draw2d.Point(_1eef.x,toPt.y);
}else{
if(_1ef0===toDir){
var pos=Math.min(_1eef.y,toPt.y)-this.MINDIST;
point=new draw2d.Point(_1eef.x,pos);
}else{
point=new draw2d.Point(_1eef.x,_1eef.y-(yDiff/2));
}
}
}
if(xDiff>0){
dir=LEFT;
}else{
dir=RIGHT;
}
}
}
}
}
}
this._route(conn,point,dir,toPt,toDir);
conn.addPoint(_1eef);
};
draw2d.BezierConnectionRouter=function(_2ff0){
if(!_2ff0){
this.cheapRouter=new draw2d.ManhattanConnectionRouter();
}else{
this.cheapRouter=null;
}
this.iteration=5;
};
draw2d.BezierConnectionRouter.prototype=new draw2d.ConnectionRouter();
draw2d.BezierConnectionRouter.prototype.type="draw2d.BezierConnectionRouter";
draw2d.BezierConnectionRouter.prototype.drawBezier=function(_2ff1,_2ff2,t,iter){
var n=_2ff1.length-1;
var q=[];
var _2ff7=n+1;
for(var i=0;i<_2ff7;i++){
q[i]=[];
q[i][0]=_2ff1[i];
}
for(var j=1;j<=n;j++){
for(var i=0;i<=(n-j);i++){
q[i][j]=new draw2d.Point((1-t)*q[i][j-1].x+t*q[i+1][j-1].x,(1-t)*q[i][j-1].y+t*q[i+1][j-1].y);
}
}
var c1=[];
var c2=[];
for(var i=0;i<n+1;i++){
c1[i]=q[0][i];
c2[i]=q[i][n-i];
}
if(iter>=0){
this.drawBezier(c1,_2ff2,t,--iter);
this.drawBezier(c2,_2ff2,t,--iter);
}else{
for(var i=0;i<n;i++){
_2ff2.push(q[i][n-i]);
}
}
};
draw2d.BezierConnectionRouter.prototype.route=function(conn){
if(this.cheapRouter!==null&&(conn.getSource().getParent().isMoving===true||conn.getTarget().getParent().isMoving===true)){
this.cheapRouter.route(conn);
return;
}
var _2ffd=[];
var _2ffe=conn.getStartPoint();
var toPt=conn.getEndPoint();
this._route(_2ffd,conn,toPt,this.getEndDirection(conn),_2ffe,this.getStartDirection(conn));
var _3000=[];
this.drawBezier(_2ffd,_3000,0.5,this.iteration);
for(var i=0;i<_3000.length;i++){
conn.addPoint(_3000[i]);
}
conn.addPoint(toPt);
};
draw2d.BezierConnectionRouter.prototype._route=function(_3002,conn,_3004,_3005,toPt,toDir){
var TOL=0.1;
var _3009=0.01;
var _300a=90;
var UP=0;
var RIGHT=1;
var DOWN=2;
var LEFT=3;
var xDiff=_3004.x-toPt.x;
var yDiff=_3004.y-toPt.y;
var point;
var dir;
if(((xDiff*xDiff)<(_3009))&&((yDiff*yDiff)<(_3009))){
_3002.push(new draw2d.Point(toPt.x,toPt.y));
return;
}
if(_3005===LEFT){
if((xDiff>0)&&((yDiff*yDiff)<TOL)&&(toDir===RIGHT)){
point=toPt;
dir=toDir;
}else{
if(xDiff<0){
point=new draw2d.Point(_3004.x-_300a,_3004.y);
}else{
if(((yDiff>0)&&(toDir===DOWN))||((yDiff<0)&&(toDir===UP))){
point=new draw2d.Point(toPt.x,_3004.y);
}else{
if(_3005===toDir){
var pos=Math.min(_3004.x,toPt.x)-_300a;
point=new draw2d.Point(pos,_3004.y);
}else{
point=new draw2d.Point(_3004.x-(xDiff/2),_3004.y);
}
}
}
if(yDiff>0){
dir=UP;
}else{
dir=DOWN;
}
}
}else{
if(_3005===RIGHT){
if((xDiff<0)&&((yDiff*yDiff)<TOL)&&(toDir==LEFT)){
point=toPt;
dir=toDir;
}else{
if(xDiff>0){
point=new draw2d.Point(_3004.x+_300a,_3004.y);
}else{
if(((yDiff>0)&&(toDir===DOWN))||((yDiff<0)&&(toDir===UP))){
point=new draw2d.Point(toPt.x,_3004.y);
}else{
if(_3005===toDir){
var pos=Math.max(_3004.x,toPt.x)+_300a;
point=new draw2d.Point(pos,_3004.y);
}else{
point=new draw2d.Point(_3004.x-(xDiff/2),_3004.y);
}
}
}
if(yDiff>0){
dir=UP;
}else{
dir=DOWN;
}
}
}else{
if(_3005===DOWN){
if(((xDiff*xDiff)<TOL)&&(yDiff<0)&&(toDir===UP)){
point=toPt;
dir=toDir;
}else{
if(yDiff>0){
point=new draw2d.Point(_3004.x,_3004.y+_300a);
}else{
if(((xDiff>0)&&(toDir===RIGHT))||((xDiff<0)&&(toDir===LEFT))){
point=new draw2d.Point(_3004.x,toPt.y);
}else{
if(_3005===toDir){
var pos=Math.max(_3004.y,toPt.y)+_300a;
point=new draw2d.Point(_3004.x,pos);
}else{
point=new draw2d.Point(_3004.x,_3004.y-(yDiff/2));
}
}
}
if(xDiff>0){
dir=LEFT;
}else{
dir=RIGHT;
}
}
}else{
if(_3005===UP){
if(((xDiff*xDiff)<TOL)&&(yDiff>0)&&(toDir===DOWN)){
point=toPt;
dir=toDir;
}else{
if(yDiff<0){
point=new draw2d.Point(_3004.x,_3004.y-_300a);
}else{
if(((xDiff>0)&&(toDir===RIGHT))||((xDiff<0)&&(toDir===LEFT))){
point=new draw2d.Point(_3004.x,toPt.y);
}else{
if(_3005===toDir){
var pos=Math.min(_3004.y,toPt.y)-_300a;
point=new draw2d.Point(_3004.x,pos);
}else{
point=new draw2d.Point(_3004.x,_3004.y-(yDiff/2));
}
}
}
if(xDiff>0){
dir=LEFT;
}else{
dir=RIGHT;
}
}
}
}
}
}
this._route(_3002,conn,point,dir,toPt,toDir);
_3002.push(_3004);
};
draw2d.FanConnectionRouter=function(){
};
draw2d.FanConnectionRouter.prototype=new draw2d.NullConnectionRouter();
draw2d.FanConnectionRouter.prototype.type="draw2d.FanConnectionRouter";
draw2d.FanConnectionRouter.prototype.route=function(conn){
var _1d52=conn.getStartPoint();
var toPt=conn.getEndPoint();
var lines=conn.getSource().getConnections();
var _1d55=new draw2d.ArrayList();
var index=0;
for(var i=0;i<lines.getSize();i++){
var _1d58=lines.get(i);
if(_1d58.getTarget()==conn.getTarget()||_1d58.getSource()==conn.getTarget()){
_1d55.add(_1d58);
if(conn==_1d58){
index=_1d55.getSize();
}
}
}
if(_1d55.getSize()>1){
this.routeCollision(conn,index);
}else{
draw2d.NullConnectionRouter.prototype.route.call(this,conn);
}
};
draw2d.FanConnectionRouter.prototype.routeNormal=function(conn){
conn.addPoint(conn.getStartPoint());
conn.addPoint(conn.getEndPoint());
};
draw2d.FanConnectionRouter.prototype.routeCollision=function(conn,index){
var start=conn.getStartPoint();
var end=conn.getEndPoint();
conn.addPoint(start);
var _1d5e=10;
var _1d5f=new draw2d.Point((end.x+start.x)/2,(end.y+start.y)/2);
var _1d60=end.getPosition(start);
var ray;
if(_1d60==draw2d.PositionConstants.SOUTH||_1d60==draw2d.PositionConstants.EAST){
ray=new draw2d.Point(end.x-start.x,end.y-start.y);
}else{
ray=new draw2d.Point(start.x-end.x,start.y-end.y);
}
var _1d62=Math.sqrt(ray.x*ray.x+ray.y*ray.y);
var _1d63=_1d5e*ray.x/_1d62;
var _1d64=_1d5e*ray.y/_1d62;
var _1d65;
if(index%2===0){
_1d65=new draw2d.Point(_1d5f.x+(index/2)*(-1*_1d64),_1d5f.y+(index/2)*_1d63);
}else{
_1d65=new draw2d.Point(_1d5f.x+(index/2)*_1d64,_1d5f.y+(index/2)*(-1*_1d63));
}
conn.addPoint(_1d65);
conn.addPoint(end);
};
draw2d.Graphics=function(_2ee0,_2ee1,_2ee2){
this.jsGraphics=_2ee0;
this.xt=_2ee2.x;
this.yt=_2ee2.y;
this.radian=_2ee1*Math.PI/180;
this.sinRadian=Math.sin(this.radian);
this.cosRadian=Math.cos(this.radian);
};
draw2d.Graphics.prototype.setStroke=function(x){
this.jsGraphics.setStroke(x);
};
draw2d.Graphics.prototype.drawLine=function(x1,y1,x2,y2){
var _x1=this.xt+x1*this.cosRadian-y1*this.sinRadian;
var _y1=this.yt+x1*this.sinRadian+y1*this.cosRadian;
var _x2=this.xt+x2*this.cosRadian-y2*this.sinRadian;
var _y2=this.yt+x2*this.sinRadian+y2*this.cosRadian;
this.jsGraphics.drawLine(_x1,_y1,_x2,_y2);
};
draw2d.Graphics.prototype.fillRect=function(x,y,w,h){
var x1=this.xt+x*this.cosRadian-y*this.sinRadian;
var y1=this.yt+x*this.sinRadian+y*this.cosRadian;
var x2=this.xt+(x+w)*this.cosRadian-y*this.sinRadian;
var y2=this.yt+(x+w)*this.sinRadian+y*this.cosRadian;
var x3=this.xt+(x+w)*this.cosRadian-(y+h)*this.sinRadian;
var y3=this.yt+(x+w)*this.sinRadian+(y+h)*this.cosRadian;
var x4=this.xt+x*this.cosRadian-(y+h)*this.sinRadian;
var y4=this.yt+x*this.sinRadian+(y+h)*this.cosRadian;
this.jsGraphics.fillPolygon([x1,x2,x3,x4],[y1,y2,y3,y4]);
};
draw2d.Graphics.prototype.fillPolygon=function(_2ef8,_2ef9){
var rotX=[];
var rotY=[];
for(var i=0;i<_2ef8.length;i++){
rotX[i]=this.xt+_2ef8[i]*this.cosRadian-_2ef9[i]*this.sinRadian;
rotY[i]=this.yt+_2ef8[i]*this.sinRadian+_2ef9[i]*this.cosRadian;
}
this.jsGraphics.fillPolygon(rotX,rotY);
};
draw2d.Graphics.prototype.setColor=function(color){
this.jsGraphics.setColor(color.getHTMLStyle());
};
draw2d.Graphics.prototype.drawPolygon=function(_2efe,_2eff){
var rotX=[];
var rotY=[];
for(var i=0;i<_2efe.length;i++){
rotX[i]=this.xt+_2efe[i]*this.cosRadian-_2eff[i]*this.sinRadian;
rotY[i]=this.yt+_2efe[i]*this.sinRadian+_2eff[i]*this.cosRadian;
}
this.jsGraphics.drawPolygon(rotX,rotY);
};
draw2d.Connection=function(){
draw2d.Line.call(this);
this.sourcePort=null;
this.targetPort=null;
this.canDrag=true;
this.sourceDecorator=null;
this.targetDecorator=null;
this.sourceAnchor=new draw2d.ConnectionAnchor();
this.targetAnchor=new draw2d.ConnectionAnchor();
this.router=draw2d.Connection.defaultRouter;
this.lineSegments=new draw2d.ArrayList();
this.children=new draw2d.ArrayList();
this.setColor(new draw2d.Color(0,0,115));
this.setLineWidth(1);
};
draw2d.Connection.prototype=new draw2d.Line();
draw2d.Connection.prototype.type="draw2d.Connection";
draw2d.Connection.defaultRouter=new draw2d.ManhattanConnectionRouter();
draw2d.Connection.setDefaultRouter=function(_27f9){
draw2d.Connection.defaultRouter=_27f9;
};
draw2d.Connection.prototype.disconnect=function(){
if(this.sourcePort!==null){
this.sourcePort.detachMoveListener(this);
this.fireSourcePortRouteEvent();
}
if(this.targetPort!==null){
this.targetPort.detachMoveListener(this);
this.fireTargetPortRouteEvent();
}
};
draw2d.Connection.prototype.reconnect=function(){
if(this.sourcePort!==null){
this.sourcePort.attachMoveListener(this);
this.fireSourcePortRouteEvent();
}
if(this.targetPort!==null){
this.targetPort.attachMoveListener(this);
this.fireTargetPortRouteEvent();
}
};
draw2d.Connection.prototype.isResizeable=function(){
return this.getCanDrag();
};
draw2d.Connection.prototype.setCanDrag=function(flag){
this.canDrag=flag;
};
draw2d.Connection.prototype.getCanDrag=function(){
return this.canDrag;
};
draw2d.Connection.prototype.addFigure=function(_27fb,_27fc){
var entry={};
entry.figure=_27fb;
entry.locator=_27fc;
this.children.add(entry);
if(this.graphics!==null){
this.paint();
}
var oThis=this;
var _27ff=function(){
var _2800=arguments[0]||window.event;
_2800.returnValue=false;
oThis.getWorkflow().setCurrentSelection(oThis);
oThis.getWorkflow().showLineResizeHandles(oThis);
};
if(_27fb.getHTMLElement().addEventListener){
_27fb.getHTMLElement().addEventListener("mousedown",_27ff,false);
}else{
if(_27fb.getHTMLElement().attachEvent){
_27fb.getHTMLElement().attachEvent("onmousedown",_27ff);
}
}
};
draw2d.Connection.prototype.setSourceDecorator=function(_2801){
this.sourceDecorator=_2801;
if(this.graphics!==null){
this.paint();
}
};
draw2d.Connection.prototype.getSourceDecorator=function(){
return this.sourceDecorator;
};
draw2d.Connection.prototype.setTargetDecorator=function(_2802){
this.targetDecorator=_2802;
if(this.graphics!==null){
this.paint();
}
};
draw2d.Connection.prototype.getTargetDecorator=function(){
return this.targetDecorator;
};
draw2d.Connection.prototype.setSourceAnchor=function(_2803){
this.sourceAnchor=_2803;
this.sourceAnchor.setOwner(this.sourcePort);
if(this.graphics!==null){
this.paint();
}
};
draw2d.Connection.prototype.setTargetAnchor=function(_2804){
this.targetAnchor=_2804;
this.targetAnchor.setOwner(this.targetPort);
if(this.graphics!==null){
this.paint();
}
};
draw2d.Connection.prototype.setRouter=function(_2805){
if(_2805!==null){
this.router=_2805;
}else{
this.router=new draw2d.NullConnectionRouter();
}
if(this.graphics!==null){
this.paint();
}
};
draw2d.Connection.prototype.getRouter=function(){
return this.router;
};
draw2d.Connection.prototype.setWorkflow=function(_2806){
draw2d.Line.prototype.setWorkflow.call(this,_2806);
for(var i=0;i<this.children.getSize();i++){
this.children.get(i).isAppended=false;
}
};
draw2d.Connection.prototype.paint=function(){
if(this.html===null){
return;
}
try{
for(var i=0;i<this.children.getSize();i++){
var entry=this.children.get(i);
if(entry.isAppended==true){
this.html.removeChild(entry.figure.getHTMLElement());
}
entry.isAppended=false;
}
if(this.graphics===null){
this.graphics=new jsGraphics(this.html);
}else{
this.graphics.clear();
}
this.graphics.setStroke(this.stroke);
this.graphics.setColor(this.lineColor.getHTMLStyle());
this.startStroke();
this.router.route(this);
if(this.getSource().getParent().isMoving==false&&this.getTarget().getParent().isMoving==false){
if(this.targetDecorator!==null){
this.targetDecorator.paint(new draw2d.Graphics(this.graphics,this.getEndAngle(),this.getEndPoint()));
}
if(this.sourceDecorator!==null){
this.sourceDecorator.paint(new draw2d.Graphics(this.graphics,this.getStartAngle(),this.getStartPoint()));
}
}
this.finishStroke();
for(var i=0;i<this.children.getSize();i++){
var entry=this.children.get(i);
this.html.appendChild(entry.figure.getHTMLElement());
entry.isAppended=true;
entry.locator.relocate(entry.figure);
}
}
catch(e){
pushErrorStack(e,"draw2d.Connection.prototype.paint=function()");
}
};
draw2d.Connection.prototype.getStartPoint=function(){
if(this.isMoving==false){
return this.sourceAnchor.getLocation(this.targetAnchor.getReferencePoint());
}else{
return draw2d.Line.prototype.getStartPoint.call(this);
}
};
draw2d.Connection.prototype.getEndPoint=function(){
if(this.isMoving==false){
return this.targetAnchor.getLocation(this.sourceAnchor.getReferencePoint());
}else{
return draw2d.Line.prototype.getEndPoint.call(this);
}
};
draw2d.Connection.prototype.startStroke=function(){
this.oldPoint=null;
this.lineSegments=new draw2d.ArrayList();
};
draw2d.Connection.prototype.finishStroke=function(){
this.graphics.paint();
this.oldPoint=null;
};
draw2d.Connection.prototype.getPoints=function(){
var _280a=new draw2d.ArrayList();
var line=null;
for(var i=0;i<this.lineSegments.getSize();i++){
line=this.lineSegments.get(i);
_280a.add(line.start);
}
if(line!==null){
_280a.add(line.end);
}
return _280a;
};
draw2d.Connection.prototype.addPoint=function(p){
p=new draw2d.Point(parseInt(p.x),parseInt(p.y));
if(this.oldPoint!==null){
this.graphics.drawLine(this.oldPoint.x,this.oldPoint.y,p.x,p.y);
var line={};
line.start=this.oldPoint;
line.end=p;
this.lineSegments.add(line);
}
this.oldPoint={};
this.oldPoint.x=p.x;
this.oldPoint.y=p.y;
};
draw2d.Connection.prototype.refreshSourcePort=function(){
var model=this.getModel().getSourceModel();
var _2810=this.getModel().getSourcePortName();
var _2811=this.getWorkflow().getDocument().getFigures();
var count=_2811.getSize();
for(var i=0;i<count;i++){
var _2814=_2811.get(i);
if(_2814.getModel()==model){
var port=_2814.getOutputPort(_2810);
this.setSource(port);
}
}
this.setRouter(this.getRouter());
};
draw2d.Connection.prototype.refreshTargetPort=function(){
var model=this.getModel().getTargetModel();
var _2817=this.getModel().getTargetPortName();
var _2818=this.getWorkflow().getDocument().getFigures();
var count=_2818.getSize();
for(var i=0;i<count;i++){
var _281b=_2818.get(i);
if(_281b.getModel()==model){
var port=_281b.getInputPort(_2817);
this.setTarget(port);
}
}
this.setRouter(this.getRouter());
};
draw2d.Connection.prototype.setSource=function(port){
if(this.sourcePort!==null){
this.sourcePort.detachMoveListener(this);
}
this.sourcePort=port;
if(this.sourcePort===null){
return;
}
this.sourceAnchor.setOwner(this.sourcePort);
this.fireSourcePortRouteEvent();
this.sourcePort.attachMoveListener(this);
this.setStartPoint(port.getAbsoluteX(),port.getAbsoluteY());
};
draw2d.Connection.prototype.getSource=function(){
return this.sourcePort;
};
draw2d.Connection.prototype.setTarget=function(port){
if(this.targetPort!==null){
this.targetPort.detachMoveListener(this);
}
this.targetPort=port;
if(this.targetPort===null){
return;
}
this.targetAnchor.setOwner(this.targetPort);
this.fireTargetPortRouteEvent();
this.targetPort.attachMoveListener(this);
this.setEndPoint(port.getAbsoluteX(),port.getAbsoluteY());
};
draw2d.Connection.prototype.getTarget=function(){
return this.targetPort;
};
draw2d.Connection.prototype.onOtherFigureMoved=function(_281f){
if(_281f==this.sourcePort){
this.setStartPoint(this.sourcePort.getAbsoluteX(),this.sourcePort.getAbsoluteY());
}else{
this.setEndPoint(this.targetPort.getAbsoluteX(),this.targetPort.getAbsoluteY());
}
};
draw2d.Connection.prototype.containsPoint=function(px,py){
for(var i=0;i<this.lineSegments.getSize();i++){
var line=this.lineSegments.get(i);
if(draw2d.Line.hit(this.corona,line.start.x,line.start.y,line.end.x,line.end.y,px,py)){
return true;
}
}
return false;
};
draw2d.Connection.prototype.getStartAngle=function(){
var p1=this.lineSegments.get(0).start;
var p2=this.lineSegments.get(0).end;
if(this.router instanceof draw2d.BezierConnectionRouter){
p2=this.lineSegments.get(5).end;
}
var _2826=Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
var angle=-(180/Math.PI)*Math.asin((p1.y-p2.y)/_2826);
if(angle<0){
if(p2.x<p1.x){
angle=Math.abs(angle)+180;
}else{
angle=360-Math.abs(angle);
}
}else{
if(p2.x<p1.x){
angle=180-angle;
}
}
return angle;
};
draw2d.Connection.prototype.getEndAngle=function(){
if(this.lineSegments.getSize()===0){
return 90;
}
var p1=this.lineSegments.get(this.lineSegments.getSize()-1).end;
var p2=this.lineSegments.get(this.lineSegments.getSize()-1).start;
if(this.router instanceof draw2d.BezierConnectionRouter){
p2=this.lineSegments.get(this.lineSegments.getSize()-5).end;
}
var _282a=Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
var angle=-(180/Math.PI)*Math.asin((p1.y-p2.y)/_282a);
if(angle<0){
if(p2.x<p1.x){
angle=Math.abs(angle)+180;
}else{
angle=360-Math.abs(angle);
}
}else{
if(p2.x<p1.x){
angle=180-angle;
}
}
return angle;
};
draw2d.Connection.prototype.fireSourcePortRouteEvent=function(){
var _282c=this.sourcePort.getConnections();
for(var i=0;i<_282c.getSize();i++){
_282c.get(i).paint();
}
};
draw2d.Connection.prototype.fireTargetPortRouteEvent=function(){
var _282e=this.targetPort.getConnections();
for(var i=0;i<_282e.getSize();i++){
_282e.get(i).paint();
}
};
draw2d.Connection.prototype.createCommand=function(_2830){
if(_2830.getPolicy()==draw2d.EditPolicy.MOVE){
return new draw2d.CommandReconnect(this);
}
if(_2830.getPolicy()==draw2d.EditPolicy.DELETE){
if(this.isDeleteable()==true){
return new draw2d.CommandDelete(this);
}
return null;
}
return null;
};
draw2d.ConnectionAnchor=function(owner){
this.owner=owner;
};
draw2d.ConnectionAnchor.prototype.type="draw2d.ConnectionAnchor";
draw2d.ConnectionAnchor.prototype.getLocation=function(_319f){
return this.getReferencePoint();
};
draw2d.ConnectionAnchor.prototype.getOwner=function(){
return this.owner;
};
draw2d.ConnectionAnchor.prototype.setOwner=function(owner){
this.owner=owner;
};
draw2d.ConnectionAnchor.prototype.getBox=function(){
return this.getOwner().getAbsoluteBounds();
};
draw2d.ConnectionAnchor.prototype.getReferencePoint=function(){
if(this.getOwner()===null){
return null;
}else{
return this.getOwner().getAbsolutePosition();
}
};
draw2d.ChopboxConnectionAnchor=function(owner){
draw2d.ConnectionAnchor.call(this,owner);
};
draw2d.ChopboxConnectionAnchor.prototype=new draw2d.ConnectionAnchor();
draw2d.ChopboxConnectionAnchor.prototype.type="draw2d.ChopboxConnectionAnchor";
draw2d.ChopboxConnectionAnchor.prototype.getLocation=function(_2a4f){
var r=new draw2d.Dimension();
r.setBounds(this.getBox());
r.translate(-1,-1);
r.resize(1,1);
var _2a51=r.x+r.w/2;
var _2a52=r.y+r.h/2;
if(r.isEmpty()||(_2a4f.x==_2a51&&_2a4f.y==_2a52)){
return new Point(_2a51,_2a52);
}
var dx=_2a4f.x-_2a51;
var dy=_2a4f.y-_2a52;
var scale=0.5/Math.max(Math.abs(dx)/r.w,Math.abs(dy)/r.h);
dx*=scale;
dy*=scale;
_2a51+=dx;
_2a52+=dy;
return new draw2d.Point(Math.round(_2a51),Math.round(_2a52));
};
draw2d.ChopboxConnectionAnchor.prototype.getBox=function(){
return this.getOwner().getParent().getBounds();
};
draw2d.ChopboxConnectionAnchor.prototype.getReferencePoint=function(){
return this.getBox().getCenter();
};
draw2d.ConnectionDecorator=function(){
this.color=new draw2d.Color(0,0,0);
this.backgroundColor=new draw2d.Color(250,250,250);
};
draw2d.ConnectionDecorator.prototype.type="draw2d.ConnectionDecorator";
draw2d.ConnectionDecorator.prototype.paint=function(g){
};
draw2d.ConnectionDecorator.prototype.setColor=function(c){
this.color=c;
};
draw2d.ConnectionDecorator.prototype.setBackgroundColor=function(c){
this.backgroundColor=c;
};
draw2d.ArrowConnectionDecorator=function(_27df,width){
draw2d.ConnectionDecorator.call(this);
if(_27df===undefined||_27df<1){
this.lenght=15;
}
if(width===undefined||width<1){
this.width=10;
}
};
draw2d.ArrowConnectionDecorator.prototype=new draw2d.ConnectionDecorator();
draw2d.ArrowConnectionDecorator.prototype.type="draw2d.ArrowConnectionDecorator";
draw2d.ArrowConnectionDecorator.prototype.paint=function(g){
if(this.backgroundColor!==null){
g.setColor(this.backgroundColor);
g.fillPolygon([3,this.lenght,this.lenght,3],[0,(this.width/2),-(this.width/2),0]);
}
g.setColor(this.color);
g.setStroke(1);
g.drawPolygon([3,this.lenght,this.lenght,3],[0,(this.width/2),-(this.width/2),0]);
};
draw2d.ArrowConnectionDecorator.prototype.setDimension=function(l,width){
this.width=w;
this.lenght=l;
};
draw2d.CompartmentFigure=function(){
draw2d.Node.call(this);
this.children=new draw2d.ArrayList();
this.setBorder(new draw2d.LineBorder(1));
this.dropable=new draw2d.DropTarget(this.html);
this.dropable.node=this;
this.dropable.addEventListener("figureenter",function(_1d19){
_1d19.target.node.onFigureEnter(_1d19.relatedTarget.node);
});
this.dropable.addEventListener("figureleave",function(_1d1a){
_1d1a.target.node.onFigureLeave(_1d1a.relatedTarget.node);
});
this.dropable.addEventListener("figuredrop",function(_1d1b){
_1d1b.target.node.onFigureDrop(_1d1b.relatedTarget.node);
});
};
draw2d.CompartmentFigure.prototype=new draw2d.Node();
draw2d.CompartmentFigure.prototype.type="draw2d.CompartmentFigure";
draw2d.CompartmentFigure.prototype.onFigureEnter=function(_1d1c){
};
draw2d.CompartmentFigure.prototype.onFigureLeave=function(_1d1d){
};
draw2d.CompartmentFigure.prototype.onFigureDrop=function(_1d1e){
};
draw2d.CompartmentFigure.prototype.getChildren=function(){
return this.children;
};
draw2d.CompartmentFigure.prototype.addChild=function(_1d1f){
_1d1f.setZOrder(this.getZOrder()+1);
_1d1f.setParent(this);
this.children.add(_1d1f);
};
draw2d.CompartmentFigure.prototype.removeChild=function(_1d20){
_1d20.setParent(null);
this.children.remove(_1d20);
};
draw2d.CompartmentFigure.prototype.setZOrder=function(index){
draw2d.Node.prototype.setZOrder.call(this,index);
for(var i=0;i<this.children.getSize();i++){
this.children.get(i).setZOrder(index+1);
}
};
draw2d.CompartmentFigure.prototype.setPosition=function(xPos,yPos){
var oldX=this.getX();
var oldY=this.getY();
draw2d.Node.prototype.setPosition.call(this,xPos,yPos);
for(var i=0;i<this.children.getSize();i++){
var child=this.children.get(i);
child.setPosition(child.getX()+this.getX()-oldX,child.getY()+this.getY()-oldY);
}
};
draw2d.CompartmentFigure.prototype.onDrag=function(){
var oldX=this.getX();
var oldY=this.getY();
draw2d.Node.prototype.onDrag.call(this);
for(var i=0;i<this.children.getSize();i++){
var child=this.children.get(i);
child.setPosition(child.getX()+this.getX()-oldX,child.getY()+this.getY()-oldY);
}
};
draw2d.CanvasDocument=function(_3923){
this.canvas=_3923;
};
draw2d.CanvasDocument.prototype.type="draw2d.CanvasDocument";
draw2d.CanvasDocument.prototype.getFigures=function(){
var _3924=new draw2d.ArrayList();
var _3925=this.canvas.figures;
var _3926=this.canvas.dialogs;
for(var i=0;i<_3925.getSize();i++){
var _3928=_3925.get(i);
if(_3926.indexOf(_3928)==-1&&_3928.getParent()===null&&!(_3928 instanceof draw2d.WindowFigure)){
_3924.add(_3928);
}
}
return _3924;
};
draw2d.CanvasDocument.prototype.getFigure=function(id){
return this.canvas.getFigure(id);
};
draw2d.CanvasDocument.prototype.getLines=function(){
return this.canvas.getLines();
};
draw2d.CanvasDocument.prototype.getLine=function(id){
return this.canvas.getLine(id);
};
draw2d.Annotation=function(msg){
this.msg=msg;
this.alpha=1;
this.color=new draw2d.Color(0,0,0);
this.bgColor=new draw2d.Color(241,241,121);
this.fontSize=10;
this.textNode=null;
draw2d.Figure.call(this);
};
draw2d.Annotation.prototype=new draw2d.Figure();
draw2d.Annotation.prototype.type="draw2d.Annotation";
draw2d.Annotation.prototype.createHTMLElement=function(){
var item=draw2d.Figure.prototype.createHTMLElement.call(this);
item.style.color=this.color.getHTMLStyle();
item.style.backgroundColor=this.bgColor.getHTMLStyle();
item.style.fontSize=this.fontSize+"pt";
item.style.width="auto";
item.style.height="auto";
item.style.margin="0px";
item.style.padding="0px";
item.onselectstart=function(){
return false;
};
item.unselectable="on";
item.style.cursor="default";
this.textNode=document.createTextNode(this.msg);
item.appendChild(this.textNode);
this.disableTextSelection(item);
return item;
};
draw2d.Annotation.prototype.onDoubleClick=function(){
var _35a1=new draw2d.AnnotationDialog(this);
this.workflow.showDialog(_35a1);
};
draw2d.Annotation.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.bgColor!==null){
this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
}else{
this.html.style.backgroundColor="transparent";
}
};
draw2d.Annotation.prototype.getBackgroundColor=function(){
return this.bgColor;
};
draw2d.Annotation.prototype.setFontSize=function(size){
this.fontSize=size;
this.html.style.fontSize=this.fontSize+"pt";
};
draw2d.Annotation.prototype.getText=function(){
return this.msg;
};
draw2d.Annotation.prototype.setText=function(text){
this.msg=text;
this.html.removeChild(this.textNode);
this.textNode=document.createTextNode(this.msg);
this.html.appendChild(this.textNode);
};
draw2d.Annotation.prototype.setStyledText=function(text){
this.msg=text;
this.html.removeChild(this.textNode);
this.textNode=document.createElement("div");
this.textNode.innerHTML=text;
this.html.appendChild(this.textNode);
};
draw2d.ResizeHandle=function(_3774,type){
draw2d.Rectangle.call(this,5,5);
this.type=type;
var _3776=this.getWidth();
var _3777=_3776/2;
switch(this.type){
case 1:
this.setSnapToGridAnchor(new draw2d.Point(_3776,_3776));
break;
case 2:
this.setSnapToGridAnchor(new draw2d.Point(_3777,_3776));
break;
case 3:
this.setSnapToGridAnchor(new draw2d.Point(0,_3776));
break;
case 4:
this.setSnapToGridAnchor(new draw2d.Point(0,_3777));
break;
case 5:
this.setSnapToGridAnchor(new draw2d.Point(0,0));
break;
case 6:
this.setSnapToGridAnchor(new draw2d.Point(_3777,0));
break;
case 7:
this.setSnapToGridAnchor(new draw2d.Point(_3776,0));
break;
case 8:
this.setSnapToGridAnchor(new draw2d.Point(_3776,_3777));
case 9:
this.setSnapToGridAnchor(new draw2d.Point(_3777,_3777));
break;
}
this.setBackgroundColor(new draw2d.Color(0,255,0));
this.setWorkflow(_3774);
this.setZOrder(10000);
};
draw2d.ResizeHandle.prototype=new draw2d.Rectangle();
draw2d.ResizeHandle.prototype.type="draw2d.ResizeHandle";
draw2d.ResizeHandle.prototype.getSnapToDirection=function(){
switch(this.type){
case 1:
return draw2d.SnapToHelper.NORTH_WEST;
case 2:
return draw2d.SnapToHelper.NORTH;
case 3:
return draw2d.SnapToHelper.NORTH_EAST;
case 4:
return draw2d.SnapToHelper.EAST;
case 5:
return draw2d.SnapToHelper.SOUTH_EAST;
case 6:
return draw2d.SnapToHelper.SOUTH;
case 7:
return draw2d.SnapToHelper.SOUTH_WEST;
case 8:
return draw2d.SnapToHelper.WEST;
case 9:
return draw2d.SnapToHelper.CENTER;
}
};
draw2d.ResizeHandle.prototype.onDragend=function(){
var _3778=this.workflow.currentSelection;
if(this.commandMove!==null){
this.commandMove.setPosition(_3778.getX(),_3778.getY());
this.workflow.getCommandStack().execute(this.commandMove);
this.commandMove=null;
}
if(this.commandResize!==null){
this.commandResize.setDimension(_3778.getWidth(),_3778.getHeight());
this.workflow.getCommandStack().execute(this.commandResize);
this.commandResize=null;
}
this.workflow.hideSnapToHelperLines();
};
draw2d.ResizeHandle.prototype.setPosition=function(xPos,yPos){
this.x=xPos;
this.y=yPos;
if(this.html===null){
return;
}
this.html.style.left=this.x+"px";
this.html.style.top=this.y+"px";
};
draw2d.ResizeHandle.prototype.onDragstart=function(x,y){
if(!this.canDrag){
return false;
}
var _377d=this.workflow.currentSelection;
this.commandMove=_377d.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.MOVE));
this.commandResize=_377d.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.RESIZE));
return true;
};
draw2d.ResizeHandle.prototype.onDrag=function(){
var oldX=this.getX();
var oldY=this.getY();
draw2d.Rectangle.prototype.onDrag.call(this);
var diffX=oldX-this.getX();
var diffY=oldY-this.getY();
var _3782=this.workflow.currentSelection.getX();
var _3783=this.workflow.currentSelection.getY();
var _3784=this.workflow.currentSelection.getWidth();
var _3785=this.workflow.currentSelection.getHeight();
switch(this.type){
case 1:
this.workflow.currentSelection.setPosition(_3782-diffX,_3783-diffY);
this.workflow.currentSelection.setDimension(_3784+diffX,_3785+diffY);
break;
case 2:
this.workflow.currentSelection.setPosition(_3782,_3783-diffY);
this.workflow.currentSelection.setDimension(_3784,_3785+diffY);
break;
case 3:
this.workflow.currentSelection.setPosition(_3782,_3783-diffY);
this.workflow.currentSelection.setDimension(_3784-diffX,_3785+diffY);
break;
case 4:
this.workflow.currentSelection.setPosition(_3782,_3783);
this.workflow.currentSelection.setDimension(_3784-diffX,_3785);
break;
case 5:
this.workflow.currentSelection.setPosition(_3782,_3783);
this.workflow.currentSelection.setDimension(_3784-diffX,_3785-diffY);
break;
case 6:
this.workflow.currentSelection.setPosition(_3782,_3783);
this.workflow.currentSelection.setDimension(_3784,_3785-diffY);
break;
case 7:
this.workflow.currentSelection.setPosition(_3782-diffX,_3783);
this.workflow.currentSelection.setDimension(_3784+diffX,_3785-diffY);
break;
case 8:
this.workflow.currentSelection.setPosition(_3782-diffX,_3783);
this.workflow.currentSelection.setDimension(_3784+diffX,_3785);
break;
}
this.workflow.moveResizeHandles(this.workflow.getCurrentSelection());
};
draw2d.ResizeHandle.prototype.setCanDrag=function(flag){
draw2d.Rectangle.prototype.setCanDrag.call(this,flag);
if(this.html===null){
return;
}
if(!flag){
this.html.style.cursor="";
return;
}
switch(this.type){
case 1:
this.html.style.cursor="nw-resize";
break;
case 2:
this.html.style.cursor="s-resize";
break;
case 3:
this.html.style.cursor="ne-resize";
break;
case 4:
this.html.style.cursor="w-resize";
break;
case 5:
this.html.style.cursor="se-resize";
break;
case 6:
this.html.style.cursor="n-resize";
break;
case 7:
this.html.style.cursor="sw-resize";
break;
case 8:
this.html.style.cursor="e-resize";
break;
case 9:
this.html.style.cursor="resize";
break;
}
};
draw2d.ResizeHandle.prototype.onKeyDown=function(_3787,ctrl){
this.workflow.onKeyDown(_3787,ctrl);
};
draw2d.ResizeHandle.prototype.fireMoveEvent=function(){
};
draw2d.LineStartResizeHandle=function(_3193){
draw2d.ResizeHandle.call(this,_3193,9);
this.setDimension(10,10);
this.setBackgroundColor(new draw2d.Color(100,255,0));
this.setZOrder(10000);
};
draw2d.LineStartResizeHandle.prototype=new draw2d.ResizeHandle();
draw2d.LineStartResizeHandle.prototype.type="draw2d.LineStartResizeHandle";
draw2d.LineStartResizeHandle.prototype.onDragend=function(){
if(this.workflow.currentSelection instanceof draw2d.Connection){
if(this.command!==null){
this.command.cancel();
}
}else{
if(this.command!==null){
this.getWorkflow().getCommandStack().execute(this.command);
}
}
this.command=null;
};
draw2d.LineStartResizeHandle.prototype.onDragstart=function(x,y){
if(!this.canDrag){
return false;
}
this.command=this.workflow.currentSelection.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.MOVE));
return this.command!==null;
};
draw2d.LineStartResizeHandle.prototype.onDrag=function(){
var oldX=this.getX();
var oldY=this.getY();
draw2d.Rectangle.prototype.onDrag.call(this);
var diffX=oldX-this.getX();
var diffY=oldY-this.getY();
var _319a=this.workflow.currentSelection.getStartPoint();
var line=this.workflow.currentSelection;
line.setStartPoint(_319a.x-diffX,_319a.y-diffY);
line.isMoving=true;
};
draw2d.LineStartResizeHandle.prototype.onDrop=function(_319c){
var line=this.workflow.currentSelection;
line.isMoving=false;
if(line instanceof draw2d.Connection){
this.command.setNewPorts(_319c,line.getTarget());
this.getWorkflow().getCommandStack().execute(this.command);
}
this.command=null;
};
draw2d.LineEndResizeHandle=function(_1e64){
draw2d.ResizeHandle.call(this,_1e64,9);
this.setDimension(10,10);
this.setBackgroundColor(new draw2d.Color(0,255,0));
this.setZOrder(10000);
};
draw2d.LineEndResizeHandle.prototype=new draw2d.ResizeHandle();
draw2d.LineEndResizeHandle.prototype.type="draw2d.LineEndResizeHandle";
draw2d.LineEndResizeHandle.prototype.onDragend=function(){
if(this.workflow.currentSelection instanceof draw2d.Connection){
if(this.command!==null){
this.command.cancel();
}
}else{
if(this.command!==null){
this.workflow.getCommandStack().execute(this.command);
}
}
this.command=null;
};
draw2d.LineEndResizeHandle.prototype.onDragstart=function(x,y){
if(!this.canDrag){
return false;
}
this.command=this.workflow.currentSelection.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.MOVE));
return this.command!==null;
};
draw2d.LineEndResizeHandle.prototype.onDrag=function(){
var oldX=this.getX();
var oldY=this.getY();
draw2d.Rectangle.prototype.onDrag.call(this);
var diffX=oldX-this.getX();
var diffY=oldY-this.getY();
var _1e6b=this.workflow.currentSelection.getEndPoint();
var line=this.workflow.currentSelection;
line.setEndPoint(_1e6b.x-diffX,_1e6b.y-diffY);
line.isMoving=true;
};
draw2d.LineEndResizeHandle.prototype.onDrop=function(_1e6d){
var line=this.workflow.currentSelection;
line.isMoving=false;
if(line instanceof draw2d.Connection){
this.command.setNewPorts(line.getSource(),_1e6d);
this.getWorkflow().getCommandStack().execute(this.command);
}
this.command=null;
};
draw2d.Canvas=function(_38b8){
try{
if(_38b8){
this.construct(_38b8);
}
this.enableSmoothFigureHandling=false;
this.canvasLines=new draw2d.ArrayList();
}
catch(e){
pushErrorStack(e,"draw2d.Canvas=function(/*:String*/id)");
}
};
draw2d.Canvas.IMAGE_BASE_URL="";
draw2d.Canvas.prototype.type="draw2d.Canvas";
draw2d.Canvas.prototype.construct=function(_38b9){
this.canvasId=_38b9;
this.html=document.getElementById(this.canvasId);
this.scrollArea=document.body.parentNode;
};
draw2d.Canvas.prototype.setViewPort=function(divId){
this.scrollArea=document.getElementById(divId);
};
draw2d.Canvas.prototype.addFigure=function(_38bb,xPos,yPos,_38be){
try{
if(this.enableSmoothFigureHandling===true){
if(_38bb.timer<=0){
_38bb.setAlpha(0.001);
}
var _38bf=_38bb;
var _38c0=function(){
if(_38bf.alpha<1){
_38bf.setAlpha(Math.min(1,_38bf.alpha+0.05));
}else{
window.clearInterval(_38bf.timer);
_38bf.timer=-1;
}
};
if(_38bf.timer>0){
window.clearInterval(_38bf.timer);
}
_38bf.timer=window.setInterval(_38c0,30);
}
_38bb.setCanvas(this);
if(xPos&&yPos){
_38bb.setPosition(xPos,yPos);
}
if(_38bb instanceof draw2d.Line){
this.canvasLines.add(_38bb);
this.html.appendChild(_38bb.getHTMLElement());
}else{
var obj=this.canvasLines.getFirstElement();
if(obj===null){
this.html.appendChild(_38bb.getHTMLElement());
}else{
this.html.insertBefore(_38bb.getHTMLElement(),obj.getHTMLElement());
}
}
if(!_38be){
_38bb.paint();
}
}
catch(e){
pushErrorStack(e,"draw2d.Canvas.prototype.addFigure= function( /*:draw2d.Figure*/figure,/*:int*/ xPos,/*:int*/ yPos, /*:boolean*/ avoidPaint)");
}
};
draw2d.Canvas.prototype.removeFigure=function(_38c2){
if(this.enableSmoothFigureHandling===true){
var oThis=this;
var _38c4=_38c2;
var _38c5=function(){
if(_38c4.alpha>0){
_38c4.setAlpha(Math.max(0,_38c4.alpha-0.05));
}else{
window.clearInterval(_38c4.timer);
_38c4.timer=-1;
oThis.html.removeChild(_38c4.html);
_38c4.setCanvas(null);
}
};
if(_38c4.timer>0){
window.clearInterval(_38c4.timer);
}
_38c4.timer=window.setInterval(_38c5,20);
}else{
this.html.removeChild(_38c2.html);
_38c2.setCanvas(null);
}
if(_38c2 instanceof draw2d.Line){
this.canvasLines.remove(_38c2);
}
};
draw2d.Canvas.prototype.getEnableSmoothFigureHandling=function(){
return this.enableSmoothFigureHandling;
};
draw2d.Canvas.prototype.setEnableSmoothFigureHandling=function(flag){
this.enableSmoothFigureHandling=flag;
};
draw2d.Canvas.prototype.getWidth=function(){
return parseInt(this.html.style.width);
};
draw2d.Canvas.prototype.setWidth=function(width){
if(this.scrollArea!==null){
this.scrollArea.style.width=width+"px";
}else{
this.html.style.width=width+"px";
}
};
draw2d.Canvas.prototype.getHeight=function(){
return parseInt(this.html.style.height);
};
draw2d.Canvas.prototype.setHeight=function(_38c8){
if(this.scrollArea!==null){
this.scrollArea.style.height=_38c8+"px";
}else{
this.html.style.height=_38c8+"px";
}
};
draw2d.Canvas.prototype.setBackgroundImage=function(_38c9,_38ca){
if(_38c9!==null){
if(_38ca){
this.html.style.background="transparent url("+_38c9+") ";
}else{
this.html.style.background="transparent url("+_38c9+") no-repeat";
}
}else{
this.html.style.background="transparent";
}
};
draw2d.Canvas.prototype.getY=function(){
return this.y;
};
draw2d.Canvas.prototype.getX=function(){
return this.x;
};
draw2d.Canvas.prototype.getAbsoluteY=function(){
var el=this.html;
var ot=el.offsetTop;
while((el=el.offsetParent)!==null){
ot+=el.offsetTop;
}
return ot;
};
draw2d.Canvas.prototype.getAbsoluteX=function(){
var el=this.html;
var ol=el.offsetLeft;
while((el=el.offsetParent)!==null){
ol+=el.offsetLeft;
}
return ol;
};
draw2d.Canvas.prototype.getScrollLeft=function(){
return this.scrollArea.scrollLeft;
};
draw2d.Canvas.prototype.getScrollTop=function(){
return this.scrollArea.scrollTop;
};
draw2d.Workflow=function(id){
try{
if(!id){
return;
}
this.isIPad=navigator.userAgent.match(/iPad/i)!=null;
this.menu=null;
this.gridWidthX=10;
this.gridWidthY=10;
this.snapToGridHelper=null;
this.verticalSnapToHelperLine=null;
this.horizontalSnapToHelperLine=null;
this.snapToGeometryHelper=null;
this.figures=new draw2d.ArrayList();
this.lines=new draw2d.ArrayList();
this.commonPorts=new draw2d.ArrayList();
this.dropTargets=new draw2d.ArrayList();
this.compartments=new draw2d.ArrayList();
this.selectionListeners=new draw2d.ArrayList();
this.dialogs=new draw2d.ArrayList();
this.toolPalette=null;
this.dragging=false;
this.tooltip=null;
this.draggingLine=null;
this.draggingLineCommand=null;
this.commandStack=new draw2d.CommandStack();
this.oldScrollPosLeft=0;
this.oldScrollPosTop=0;
this.currentSelection=null;
this.currentMenu=null;
this.connectionLine=new draw2d.Line();
this.resizeHandleStart=new draw2d.LineStartResizeHandle(this);
this.resizeHandleEnd=new draw2d.LineEndResizeHandle(this);
this.resizeHandle1=new draw2d.ResizeHandle(this,1);
this.resizeHandle2=new draw2d.ResizeHandle(this,2);
this.resizeHandle3=new draw2d.ResizeHandle(this,3);
this.resizeHandle4=new draw2d.ResizeHandle(this,4);
this.resizeHandle5=new draw2d.ResizeHandle(this,5);
this.resizeHandle6=new draw2d.ResizeHandle(this,6);
this.resizeHandle7=new draw2d.ResizeHandle(this,7);
this.resizeHandle8=new draw2d.ResizeHandle(this,8);
this.resizeHandleHalfWidth=parseInt(this.resizeHandle2.getWidth()/2);
draw2d.Canvas.call(this,id);
this.setPanning(this.isIPad);
if(this.html!==null){
this.html.style.backgroundImage="url(grid_10.png)";
this.html.className="Workflow";
oThis=this;
this.html.tabIndex="0";
var _3031=function(){
var _3032=arguments[0]||window.event;
_3032.cancelBubble=true;
_3032.returnValue=false;
_3032.stopped=true;
var diffX=_3032.clientX;
var diffY=_3032.clientY;
var _3035=oThis.getScrollLeft();
var _3036=oThis.getScrollTop();
var _3037=oThis.getAbsoluteX();
var _3038=oThis.getAbsoluteY();
var line=oThis.getBestLine(diffX+_3035-_3037,diffY+_3036-_3038,null);
if(line!==null){
line.onContextMenu(diffX+_3035-_3037,diffY+_3036-_3038);
}else{
oThis.onContextMenu(diffX+_3035-_3037,diffY+_3036-_3038);
}
};
this.html.oncontextmenu=function(){
return false;
};
var oThis=this;
var _303b=function(event){
var ctrl=event.ctrlKey;
oThis.onKeyDown(event.keyCode,ctrl);
};
var _303e=function(){
var _303f=arguments[0]||window.event;
if(_303f.returnValue==false){
return;
}
var diffX=_303f.clientX;
var diffY=_303f.clientY;
var _3042=oThis.getScrollLeft();
var _3043=oThis.getScrollTop();
var _3044=oThis.getAbsoluteX();
var _3045=oThis.getAbsoluteY();
oThis.onMouseDown(diffX+_3042-_3044,diffY+_3043-_3045);
};
var _3046=function(e){
var _3048=e.touches.item(0);
var diffX=_3048.clientX;
var diffY=_3048.clientY;
var _304b=oThis.getScrollLeft();
var _304c=oThis.getScrollTop();
var _304d=oThis.getAbsoluteX();
var _304e=oThis.getAbsoluteY();
oThis.onMouseDown(diffX+_304b-_304d,diffY+_304c-_304e);
e.preventDefault();
};
var _304f=function(){
var _3050=arguments[0]||window.event;
if(oThis.currentMenu!==null){
oThis.removeFigure(oThis.currentMenu);
oThis.currentMenu=null;
}
if(_3050.button==2){
return;
}
var diffX=_3050.clientX;
var diffY=_3050.clientY;
var _3053=oThis.getScrollLeft();
var _3054=oThis.getScrollTop();
var _3055=oThis.getAbsoluteX();
var _3056=oThis.getAbsoluteY();
oThis.onMouseUp(diffX+_3053-_3055,diffY+_3054-_3056);
};
var _3057=function(e){
var _3059=e.touches.item(0);
var diffX=_3059.clientX;
var diffY=_3059.clientY;
var _305c=oThis.getScrollLeft();
var _305d=oThis.getScrollTop();
var _305e=oThis.getAbsoluteX();
var _305f=oThis.getAbsoluteY();
oThis.currentMouseX=diffX+_305c-_305e;
oThis.currentMouseY=diffY+_305d-_305f;
var obj=oThis.getBestFigure(oThis.currentMouseX,oThis.currentMouseY);
if(draw2d.Drag.currentHover!==null&&obj===null){
var _3061=new draw2d.DragDropEvent();
_3061.initDragDropEvent("mouseleave",false,oThis);
draw2d.Drag.currentHover.dispatchEvent(_3061);
}else{
var diffX=_3059.clientX;
var diffY=_3059.clientY;
var _305c=oThis.getScrollLeft();
var _305d=oThis.getScrollTop();
var _305e=oThis.getAbsoluteX();
var _305f=oThis.getAbsoluteY();
oThis.onMouseMove(diffX+_305c-_305e,diffY+_305d-_305f);
}
if(obj===null){
draw2d.Drag.currentHover=null;
}
e.preventDefault();
};
var _3062=function(){
var _3063=arguments[0]||window.event;
var diffX=_3063.clientX;
var diffY=_3063.clientY;
var _3066=oThis.getScrollLeft();
var _3067=oThis.getScrollTop();
var _3068=oThis.getAbsoluteX();
var _3069=oThis.getAbsoluteY();
oThis.currentMouseX=diffX+_3066-_3068;
oThis.currentMouseY=diffY+_3067-_3069;
var obj=oThis.getBestFigure(oThis.currentMouseX,oThis.currentMouseY);
if(draw2d.Drag.currentHover!==null&&obj===null){
var _306b=new draw2d.DragDropEvent();
_306b.initDragDropEvent("mouseleave",false,oThis);
draw2d.Drag.currentHover.dispatchEvent(_306b);
}else{
var diffX=_3063.clientX;
var diffY=_3063.clientY;
var _3066=oThis.getScrollLeft();
var _3067=oThis.getScrollTop();
var _3068=oThis.getAbsoluteX();
var _3069=oThis.getAbsoluteY();
oThis.onMouseMove(diffX+_3066-_3068,diffY+_3067-_3069);
}
if(obj===null){
draw2d.Drag.currentHover=null;
}
if(oThis.tooltip!==null){
if(Math.abs(oThis.currentTooltipX-oThis.currentMouseX)>10||Math.abs(oThis.currentTooltipY-oThis.currentMouseY)>10){
oThis.showTooltip(null);
}
}
};
var _306c=function(_306d){
var _306d=arguments[0]||window.event;
var diffX=_306d.clientX;
var diffY=_306d.clientY;
var _3070=oThis.getScrollLeft();
var _3071=oThis.getScrollTop();
var _3072=oThis.getAbsoluteX();
var _3073=oThis.getAbsoluteY();
var line=oThis.getBestLine(diffX+_3070-_3072,diffY+_3071-_3073,null);
if(line!==null){
line.onDoubleClick();
}
};
if(this.html.addEventListener){
this.html.addEventListener("contextmenu",_3031,false);
this.html.addEventListener("touchstart",_3046,false);
this.html.addEventListener("touchmove",_3057,false);
this.html.addEventListener("mousemove",_3062,false);
this.html.addEventListener("mouseup",_304f,false);
this.html.addEventListener("mousedown",_303e,false);
this.html.addEventListener("keydown",_303b,false);
this.html.addEventListener("dblclick",_306c,false);
}else{
if(this.html.attachEvent){
this.html.attachEvent("oncontextmenu",_3031);
this.html.attachEvent("onmousemove",_3062);
this.html.attachEvent("onmousedown",_303e);
this.html.attachEvent("onmouseup",_304f);
this.html.attachEvent("onkeydown",_303b);
this.html.attachEvent("ondblclick",_306c);
}else{
throw "FreeGroup Draw2D 0.9.26 not supported in this browser.";
}
}
}
}
catch(e){
pushErrorStack(e,"draw2d.Workflow=function(/*:String*/id)");
}
};
draw2d.Workflow.prototype=new draw2d.Canvas();
draw2d.Workflow.prototype.type="draw2d.Workflow";
draw2d.Workflow.COLOR_GREEN=new draw2d.Color(0,255,0);
draw2d.Workflow.prototype.clear=function(){
this.scrollTo(0,0,true);
this.gridWidthX=10;
this.gridWidthY=10;
this.snapToGridHelper=null;
this.verticalSnapToHelperLine=null;
this.horizontalSnapToHelperLine=null;
var _3075=this.getDocument();
var _3076=_3075.getLines().clone();
for(var i=0;i<_3076.getSize();i++){
(new draw2d.CommandDelete(_3076.get(i))).execute();
}
var _3078=_3075.getFigures().clone();
for(var i=0;i<_3078.getSize();i++){
(new draw2d.CommandDelete(_3078.get(i))).execute();
}
this.commonPorts.removeAllElements();
this.dropTargets.removeAllElements();
this.compartments.removeAllElements();
this.selectionListeners.removeAllElements();
this.dialogs.removeAllElements();
this.commandStack=new draw2d.CommandStack();
this.currentSelection=null;
this.currentMenu=null;
draw2d.Drag.clearCurrent();
};
draw2d.Workflow.prototype.onScroll=function(){
var _3079=this.getScrollLeft();
var _307a=this.getScrollTop();
var _307b=_3079-this.oldScrollPosLeft;
var _307c=_307a-this.oldScrollPosTop;
for(var i=0;i<this.figures.getSize();i++){
var _307e=this.figures.get(i);
if(_307e.hasFixedPosition&&_307e.hasFixedPosition()==true){
_307e.setPosition(_307e.getX()+_307b,_307e.getY()+_307c);
}
}
this.oldScrollPosLeft=_3079;
this.oldScrollPosTop=_307a;
};
draw2d.Workflow.prototype.setPanning=function(flag){
this.panning=flag;
if(flag){
this.html.style.cursor="move";
}else{
this.html.style.cursor="default";
}
};
draw2d.Workflow.prototype.scrollTo=function(x,y,fast){
if(fast){
this.scrollArea.scrollLeft=x;
this.scrollArea.scrollTop=y;
}else{
var steps=40;
var xStep=(x-this.getScrollLeft())/steps;
var yStep=(y-this.getScrollTop())/steps;
var oldX=this.getScrollLeft();
var oldY=this.getScrollTop();
for(var i=0;i<steps;i++){
this.scrollArea.scrollLeft=oldX+(xStep*i);
this.scrollArea.scrollTop=oldY+(yStep*i);
}
}
};
draw2d.Workflow.prototype.showTooltip=function(_3089,_308a){
if(this.tooltip!==null){
this.removeFigure(this.tooltip);
this.tooltip=null;
if(this.tooltipTimer>=0){
window.clearTimeout(this.tooltipTimer);
this.tooltipTimer=-1;
}
}
this.tooltip=_3089;
if(this.tooltip!==null){
this.currentTooltipX=this.currentMouseX;
this.currentTooltipY=this.currentMouseY;
this.addFigure(this.tooltip,this.currentTooltipX+10,this.currentTooltipY+10);
var oThis=this;
var _308c=function(){
oThis.tooltipTimer=-1;
oThis.showTooltip(null);
};
if(_308a==true){
this.tooltipTimer=window.setTimeout(_308c,5000);
}
}
};
draw2d.Workflow.prototype.showDialog=function(_308d,xPos,yPos){
if(xPos){
this.addFigure(_308d,xPos,yPos);
}else{
this.addFigure(_308d,200,100);
}
this.dialogs.add(_308d);
};
draw2d.Workflow.prototype.showMenu=function(menu,xPos,yPos){
if(this.menu!==null){
this.html.removeChild(this.menu.getHTMLElement());
this.menu.setWorkflow();
}
this.menu=menu;
if(this.menu!==null){
this.menu.setWorkflow(this);
this.menu.setPosition(xPos,yPos);
this.html.appendChild(this.menu.getHTMLElement());
this.menu.paint();
}
};
draw2d.Workflow.prototype.onContextMenu=function(x,y){
var menu=this.getContextMenu();
if(menu!==null){
this.showMenu(menu,x,y);
}
};
draw2d.Workflow.prototype.getContextMenu=function(){
return null;
};
draw2d.Workflow.prototype.setToolWindow=function(_3096,x,y){
this.toolPalette=_3096;
if(y){
this.addFigure(_3096,x,y);
}else{
this.addFigure(_3096,20,20);
}
this.dialogs.add(_3096);
};
draw2d.Workflow.prototype.setSnapToGrid=function(flag){
if(flag){
this.snapToGridHelper=new draw2d.SnapToGrid(this);
}else{
this.snapToGridHelper=null;
}
};
draw2d.Workflow.prototype.setSnapToGeometry=function(flag){
if(flag){
this.snapToGeometryHelper=new draw2d.SnapToGeometry(this);
}else{
this.snapToGeometryHelper=null;
}
};
draw2d.Workflow.prototype.setGridWidth=function(dx,dy){
this.gridWidthX=dx;
this.gridWidthY=dy;
};
draw2d.Workflow.prototype.addFigure=function(_309d,xPos,yPos){
try{
draw2d.Canvas.prototype.addFigure.call(this,_309d,xPos,yPos,true);
_309d.setWorkflow(this);
var _30a0=this;
if(_309d instanceof draw2d.CompartmentFigure){
this.compartments.add(_309d);
}
if(_309d instanceof draw2d.Line){
this.lines.add(_309d);
}else{
this.figures.add(_309d);
_309d.draggable.addEventListener("drag",function(_30a1){
var _30a2=_30a0.getFigure(_30a1.target.element.id);
if(_30a2===null){
return;
}
if(_30a2.isSelectable()==false){
return;
}
_30a0.moveResizeHandles(_30a2);
});
}
_309d.paint();
this.setDocumentDirty();
}
catch(e){
pushErrorStack(e,"draw2d.Workflow.prototype.addFigure=function(/*:draw2d.Figure*/ figure ,/*:int*/ xPos, /*:int*/ yPos)");
}
};
draw2d.Workflow.prototype.removeFigure=function(_30a3){
draw2d.Canvas.prototype.removeFigure.call(this,_30a3);
this.figures.remove(_30a3);
this.lines.remove(_30a3);
this.dialogs.remove(_30a3);
_30a3.setWorkflow(null);
if(_30a3 instanceof draw2d.CompartmentFigure){
this.compartments.remove(_30a3);
}
if(_30a3 instanceof draw2d.Connection){
_30a3.disconnect();
}
if(this.currentSelection==_30a3){
this.setCurrentSelection(null);
}
this.setDocumentDirty();
_30a3.onRemove(this);
};
draw2d.Workflow.prototype.moveFront=function(_30a4){
this.html.removeChild(_30a4.getHTMLElement());
this.html.appendChild(_30a4.getHTMLElement());
};
draw2d.Workflow.prototype.moveBack=function(_30a5){
this.html.removeChild(_30a5.getHTMLElement());
this.html.insertBefore(_30a5.getHTMLElement(),this.html.firstChild);
};
draw2d.Workflow.prototype.getBestCompartmentFigure=function(x,y,_30a8){
var _30a9=null;
for(var i=0;i<this.figures.getSize();i++){
var _30ab=this.figures.get(i);
if((_30ab instanceof draw2d.CompartmentFigure)&&_30ab.isOver(x,y)==true&&_30ab!=_30a8){
if(_30a9===null){
_30a9=_30ab;
}else{
if(_30a9.getZOrder()<_30ab.getZOrder()){
_30a9=_30ab;
}
}
}
}
return _30a9;
};
draw2d.Workflow.prototype.getBestFigure=function(x,y,_30ae){
var _30af=null;
for(var i=0;i<this.figures.getSize();i++){
var _30b1=this.figures.get(i);
if(_30b1.isOver(x,y)==true&&_30b1!=_30ae){
if(_30af===null){
_30af=_30b1;
}else{
if(_30af.getZOrder()<_30b1.getZOrder()){
_30af=_30b1;
}
}
}
}
return _30af;
};
draw2d.Workflow.prototype.getBestLine=function(x,y,_30b4){
var _30b5=null;
var count=this.lines.getSize();
for(var i=0;i<count;i++){
var line=this.lines.get(i);
if(line.containsPoint(x,y)==true&&line!=_30b4){
if(_30b5===null){
_30b5=line;
}else{
if(_30b5.getZOrder()<line.getZOrder()){
_30b5=line;
}
}
}
}
return _30b5;
};
draw2d.Workflow.prototype.getFigure=function(id){
for(var i=0;i<this.figures.getSize();i++){
var _30bb=this.figures.get(i);
if(_30bb.id==id){
return _30bb;
}
}
return null;
};
draw2d.Workflow.prototype.getFigures=function(){
return this.figures;
};
draw2d.Workflow.prototype.getDocument=function(){
return new draw2d.CanvasDocument(this);
};
draw2d.Workflow.prototype.addSelectionListener=function(w){
if(w!==null){
if(w.onSelectionChanged){
this.selectionListeners.add(w);
}else{
throw "Object doesn't implement required callback method [onSelectionChanged]";
}
}
};
draw2d.Workflow.prototype.removeSelectionListener=function(w){
this.selectionListeners.remove(w);
};
draw2d.Workflow.prototype.setCurrentSelection=function(_30be){
if(_30be===null||this.currentSelection!=_30be){
this.hideResizeHandles();
this.hideLineResizeHandles();
}
this.currentSelection=_30be;
for(var i=0;i<this.selectionListeners.getSize();i++){
var w=this.selectionListeners.get(i);
if(w.onSelectionChanged){
w.onSelectionChanged(this.currentSelection,this.currentSelection?this.currentSelection.getModel():null);
}
}
if(_30be instanceof draw2d.Line){
this.showLineResizeHandles(_30be);
if(!(_30be instanceof draw2d.Connection)){
this.draggingLineCommand=_30be.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.MOVE));
if(this.draggingLineCommand!==null){
this.draggingLine=_30be;
}
}
}
};
draw2d.Workflow.prototype.getCurrentSelection=function(){
return this.currentSelection;
};
draw2d.Workflow.prototype.getLine=function(id){
var count=this.lines.getSize();
for(var i=0;i<count;i++){
var line=this.lines.get(i);
if(line.getId()==id){
return line;
}
}
return null;
};
draw2d.Workflow.prototype.getLines=function(){
return this.lines;
};
draw2d.Workflow.prototype.registerPort=function(port){
port.draggable.targets=this.dropTargets;
this.commonPorts.add(port);
this.dropTargets.add(port.dropable);
};
draw2d.Workflow.prototype.unregisterPort=function(port){
port.draggable.targets=null;
this.commonPorts.remove(port);
this.dropTargets.remove(port.dropable);
};
draw2d.Workflow.prototype.getCommandStack=function(){
return this.commandStack;
};
draw2d.Workflow.prototype.showConnectionLine=function(x1,y1,x2,y2){
this.connectionLine.setStartPoint(x1,y1);
this.connectionLine.setEndPoint(x2,y2);
if(this.connectionLine.canvas===null){
draw2d.Canvas.prototype.addFigure.call(this,this.connectionLine);
}
};
draw2d.Workflow.prototype.hideConnectionLine=function(){
if(this.connectionLine.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.connectionLine);
}
};
draw2d.Workflow.prototype.showLineResizeHandles=function(_30cb){
var _30cc=this.resizeHandleStart.getWidth()/2;
var _30cd=this.resizeHandleStart.getHeight()/2;
var _30ce=_30cb.getStartPoint();
var _30cf=_30cb.getEndPoint();
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandleStart,_30ce.x-_30cc,_30ce.y-_30cc);
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandleEnd,_30cf.x-_30cc,_30cf.y-_30cc);
this.resizeHandleStart.setCanDrag(_30cb.isResizeable());
this.resizeHandleEnd.setCanDrag(_30cb.isResizeable());
if(_30cb.isResizeable()){
this.resizeHandleStart.setBackgroundColor(draw2d.Workflow.COLOR_GREEN);
this.resizeHandleEnd.setBackgroundColor(draw2d.Workflow.COLOR_GREEN);
this.resizeHandleStart.draggable.targets=this.dropTargets;
this.resizeHandleEnd.draggable.targets=this.dropTargets;
}else{
this.resizeHandleStart.setBackgroundColor(null);
this.resizeHandleEnd.setBackgroundColor(null);
}
};
draw2d.Workflow.prototype.hideLineResizeHandles=function(){
if(this.resizeHandleStart.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandleStart);
}
if(this.resizeHandleEnd.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandleEnd);
}
};
draw2d.Workflow.prototype.showResizeHandles=function(_30d0){
this.hideLineResizeHandles();
this.hideResizeHandles();
if(this.getEnableSmoothFigureHandling()==true&&this.getCurrentSelection()!=_30d0){
this.resizeHandle1.setAlpha(0.01);
this.resizeHandle2.setAlpha(0.01);
this.resizeHandle3.setAlpha(0.01);
this.resizeHandle4.setAlpha(0.01);
this.resizeHandle5.setAlpha(0.01);
this.resizeHandle6.setAlpha(0.01);
this.resizeHandle7.setAlpha(0.01);
this.resizeHandle8.setAlpha(0.01);
}
var _30d1=this.resizeHandle1.getWidth();
var _30d2=this.resizeHandle1.getHeight();
var _30d3=_30d0.getHeight();
var _30d4=_30d0.getWidth();
var xPos=_30d0.getX();
var yPos=_30d0.getY();
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle1,xPos-_30d1,yPos-_30d2);
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle3,xPos+_30d4,yPos-_30d2);
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle5,xPos+_30d4,yPos+_30d3);
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle7,xPos-_30d1,yPos+_30d3);
this.moveFront(this.resizeHandle1);
this.moveFront(this.resizeHandle3);
this.moveFront(this.resizeHandle5);
this.moveFront(this.resizeHandle7);
this.resizeHandle1.setCanDrag(_30d0.isResizeable());
this.resizeHandle3.setCanDrag(_30d0.isResizeable());
this.resizeHandle5.setCanDrag(_30d0.isResizeable());
this.resizeHandle7.setCanDrag(_30d0.isResizeable());
if(_30d0.isResizeable()){
var green=new draw2d.Color(0,255,0);
this.resizeHandle1.setBackgroundColor(green);
this.resizeHandle3.setBackgroundColor(green);
this.resizeHandle5.setBackgroundColor(green);
this.resizeHandle7.setBackgroundColor(green);
}else{
this.resizeHandle1.setBackgroundColor(null);
this.resizeHandle3.setBackgroundColor(null);
this.resizeHandle5.setBackgroundColor(null);
this.resizeHandle7.setBackgroundColor(null);
}
if(_30d0.isStrechable()&&_30d0.isResizeable()){
this.resizeHandle2.setCanDrag(_30d0.isResizeable());
this.resizeHandle4.setCanDrag(_30d0.isResizeable());
this.resizeHandle6.setCanDrag(_30d0.isResizeable());
this.resizeHandle8.setCanDrag(_30d0.isResizeable());
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle2,xPos+(_30d4/2)-this.resizeHandleHalfWidth,yPos-_30d2);
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle4,xPos+_30d4,yPos+(_30d3/2)-(_30d2/2));
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle6,xPos+(_30d4/2)-this.resizeHandleHalfWidth,yPos+_30d3);
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle8,xPos-_30d1,yPos+(_30d3/2)-(_30d2/2));
this.moveFront(this.resizeHandle2);
this.moveFront(this.resizeHandle4);
this.moveFront(this.resizeHandle6);
this.moveFront(this.resizeHandle8);
}
};
draw2d.Workflow.prototype.hideResizeHandles=function(){
if(this.resizeHandle1.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle1);
}
if(this.resizeHandle2.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle2);
}
if(this.resizeHandle3.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle3);
}
if(this.resizeHandle4.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle4);
}
if(this.resizeHandle5.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle5);
}
if(this.resizeHandle6.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle6);
}
if(this.resizeHandle7.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle7);
}
if(this.resizeHandle8.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle8);
}
};
draw2d.Workflow.prototype.moveResizeHandles=function(_30d8){
var _30d9=this.resizeHandle1.getWidth();
var _30da=this.resizeHandle1.getHeight();
var _30db=_30d8.getHeight();
var _30dc=_30d8.getWidth();
var xPos=_30d8.getX();
var yPos=_30d8.getY();
this.resizeHandle1.setPosition(xPos-_30d9,yPos-_30da);
this.resizeHandle3.setPosition(xPos+_30dc,yPos-_30da);
this.resizeHandle5.setPosition(xPos+_30dc,yPos+_30db);
this.resizeHandle7.setPosition(xPos-_30d9,yPos+_30db);
if(_30d8.isStrechable()){
this.resizeHandle2.setPosition(xPos+(_30dc/2)-this.resizeHandleHalfWidth,yPos-_30da);
this.resizeHandle4.setPosition(xPos+_30dc,yPos+(_30db/2)-(_30da/2));
this.resizeHandle6.setPosition(xPos+(_30dc/2)-this.resizeHandleHalfWidth,yPos+_30db);
this.resizeHandle8.setPosition(xPos-_30d9,yPos+(_30db/2)-(_30da/2));
}
};
draw2d.Workflow.prototype.onMouseDown=function(x,y){
this.dragging=true;
this.mouseDownPosX=x;
this.mouseDownPosY=y;
if(this.toolPalette!==null&&this.toolPalette.getActiveTool()!==null){
this.toolPalette.getActiveTool().execute(x,y);
}
this.showMenu(null);
var line=this.getBestLine(x,y);
if(line!==null&&line.isSelectable()){
this.setCurrentSelection(line);
}else{
this.setCurrentSelection(null);
}
};
draw2d.Workflow.prototype.onMouseUp=function(x,y){
this.dragging=false;
if(this.draggingLineCommand!==null){
this.getCommandStack().execute(this.draggingLineCommand);
this.draggingLine=null;
this.draggingLineCommand=null;
}
};
draw2d.Workflow.prototype.onMouseMove=function(x,y){
if(this.dragging===true&&this.draggingLine!==null){
var diffX=x-this.mouseDownPosX;
var diffY=y-this.mouseDownPosY;
this.draggingLine.startX=this.draggingLine.getStartX()+diffX;
this.draggingLine.startY=this.draggingLine.getStartY()+diffY;
this.draggingLine.setEndPoint(this.draggingLine.getEndX()+diffX,this.draggingLine.getEndY()+diffY);
this.mouseDownPosX=x;
this.mouseDownPosY=y;
this.showLineResizeHandles(this.currentSelection);
}else{
if(this.dragging===true&&this.panning===true){
var diffX=x-this.mouseDownPosX;
var diffY=y-this.mouseDownPosY;
this.scrollTo(this.getScrollLeft()-diffX,this.getScrollTop()-diffY,true);
this.onScroll();
}
}
};
draw2d.Workflow.prototype.onKeyDown=function(_30e8,ctrl){
if(_30e8==46&&this.currentSelection!==null){
this.commandStack.execute(this.currentSelection.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.DELETE)));
}else{
if(_30e8==90&&ctrl){
this.commandStack.undo();
}else{
if(_30e8==89&&ctrl){
this.commandStack.redo();
}
}
}
};
draw2d.Workflow.prototype.setDocumentDirty=function(){
try{
for(var i=0;i<this.dialogs.getSize();i++){
var d=this.dialogs.get(i);
if(d!==null&&d.onSetDocumentDirty){
d.onSetDocumentDirty();
}
}
if(this.snapToGeometryHelper!==null){
this.snapToGeometryHelper.onSetDocumentDirty();
}
if(this.snapToGridHelper!==null){
this.snapToGridHelper.onSetDocumentDirty();
}
}
catch(e){
pushErrorStack(e,"draw2d.Workflow.prototype.setDocumentDirty=function()");
}
};
draw2d.Workflow.prototype.snapToHelper=function(_30ec,pos){
if(this.snapToGeometryHelper!==null){
if(_30ec instanceof draw2d.ResizeHandle){
var _30ee=_30ec.getSnapToGridAnchor();
pos.x+=_30ee.x;
pos.y+=_30ee.y;
var _30ef=new draw2d.Point(pos.x,pos.y);
var _30f0=_30ec.getSnapToDirection();
var _30f1=this.snapToGeometryHelper.snapPoint(_30f0,pos,_30ef);
if((_30f0&draw2d.SnapToHelper.EAST_WEST)&&!(_30f1&draw2d.SnapToHelper.EAST_WEST)){
this.showSnapToHelperLineVertical(_30ef.x);
}else{
this.hideSnapToHelperLineVertical();
}
if((_30f0&draw2d.SnapToHelper.NORTH_SOUTH)&&!(_30f1&draw2d.SnapToHelper.NORTH_SOUTH)){
this.showSnapToHelperLineHorizontal(_30ef.y);
}else{
this.hideSnapToHelperLineHorizontal();
}
_30ef.x-=_30ee.x;
_30ef.y-=_30ee.y;
return _30ef;
}else{
var _30f2=new draw2d.Dimension(pos.x,pos.y,_30ec.getWidth(),_30ec.getHeight());
var _30ef=new draw2d.Dimension(pos.x,pos.y,_30ec.getWidth(),_30ec.getHeight());
var _30f0=draw2d.SnapToHelper.NSEW;
var _30f1=this.snapToGeometryHelper.snapRectangle(_30f2,_30ef);
if((_30f0&draw2d.SnapToHelper.WEST)&&!(_30f1&draw2d.SnapToHelper.WEST)){
this.showSnapToHelperLineVertical(_30ef.x);
}else{
if((_30f0&draw2d.SnapToHelper.EAST)&&!(_30f1&draw2d.SnapToHelper.EAST)){
this.showSnapToHelperLineVertical(_30ef.getX()+_30ef.getWidth());
}else{
this.hideSnapToHelperLineVertical();
}
}
if((_30f0&draw2d.SnapToHelper.NORTH)&&!(_30f1&draw2d.SnapToHelper.NORTH)){
this.showSnapToHelperLineHorizontal(_30ef.y);
}else{
if((_30f0&draw2d.SnapToHelper.SOUTH)&&!(_30f1&draw2d.SnapToHelper.SOUTH)){
this.showSnapToHelperLineHorizontal(_30ef.getY()+_30ef.getHeight());
}else{
this.hideSnapToHelperLineHorizontal();
}
}
return _30ef.getTopLeft();
}
}else{
if(this.snapToGridHelper!==null){
var _30ee=_30ec.getSnapToGridAnchor();
pos.x=pos.x+_30ee.x;
pos.y=pos.y+_30ee.y;
var _30ef=new draw2d.Point(pos.x,pos.y);
this.snapToGridHelper.snapPoint(0,pos,_30ef);
_30ef.x=_30ef.x-_30ee.x;
_30ef.y=_30ef.y-_30ee.y;
return _30ef;
}
}
return pos;
};
draw2d.Workflow.prototype.showSnapToHelperLineHorizontal=function(_30f3){
if(this.horizontalSnapToHelperLine===null){
this.horizontalSnapToHelperLine=new draw2d.Line();
this.horizontalSnapToHelperLine.setColor(new draw2d.Color(175,175,255));
this.addFigure(this.horizontalSnapToHelperLine);
}
this.horizontalSnapToHelperLine.setStartPoint(0,_30f3);
this.horizontalSnapToHelperLine.setEndPoint(this.getWidth(),_30f3);
};
draw2d.Workflow.prototype.showSnapToHelperLineVertical=function(_30f4){
if(this.verticalSnapToHelperLine===null){
this.verticalSnapToHelperLine=new draw2d.Line();
this.verticalSnapToHelperLine.setColor(new draw2d.Color(175,175,255));
this.addFigure(this.verticalSnapToHelperLine);
}
this.verticalSnapToHelperLine.setStartPoint(_30f4,0);
this.verticalSnapToHelperLine.setEndPoint(_30f4,this.getHeight());
};
draw2d.Workflow.prototype.hideSnapToHelperLines=function(){
this.hideSnapToHelperLineHorizontal();
this.hideSnapToHelperLineVertical();
};
draw2d.Workflow.prototype.hideSnapToHelperLineHorizontal=function(){
if(this.horizontalSnapToHelperLine!==null){
this.removeFigure(this.horizontalSnapToHelperLine);
this.horizontalSnapToHelperLine=null;
}
};
draw2d.Workflow.prototype.hideSnapToHelperLineVertical=function(){
if(this.verticalSnapToHelperLine!==null){
this.removeFigure(this.verticalSnapToHelperLine);
this.verticalSnapToHelperLine=null;
}
};
draw2d.WindowFigure=function(title){
this.title=title;
this.titlebar=null;
draw2d.Figure.call(this);
this.dropShadow=5;
this.setDeleteable(false);
this.setCanSnapToHelper(false);
this.setZOrder(draw2d.WindowFigure.ZOrderIndex);
};
draw2d.WindowFigure.prototype=new draw2d.Figure();
draw2d.WindowFigure.prototype.type=":draw2d.WindowFigure";
draw2d.WindowFigure.ZOrderIndex=50000;
draw2d.WindowFigure.setZOrderBaseIndex=function(index){
draw2d.WindowFigure.ZOrderBaseIndex=index;
};
draw2d.WindowFigure.prototype.hasFixedPosition=function(){
return true;
};
draw2d.WindowFigure.prototype.hasTitleBar=function(){
return true;
};
draw2d.WindowFigure.prototype.createHTMLElement=function(){
var item=draw2d.Figure.prototype.createHTMLElement.call(this);
item.style.margin="0px";
item.style.padding="0px";
item.style.border="1px solid black";
item.style.backgroundImage="url(window_bg.png)";
if(this.dropShadow>0){
item.style.boxShadow=this.dropShadow+"px "+this.dropShadow+"px "+this.dropShadow+"px #ccc";
}
item.style.borderRadius="2px";
item.style.zIndex=draw2d.WindowFigure.ZOrderIndex;
item.style.cursor=null;
item.className="WindowFigure";
if(this.hasTitleBar()){
this.titlebar=document.createElement("div");
this.titlebar.style.position="absolute";
this.titlebar.style.left="0px";
this.titlebar.style.top="0px";
this.titlebar.style.width=this.getWidth()+"px";
this.titlebar.style.height="15px";
this.titlebar.style.margin="0px";
this.titlebar.style.padding="0px";
this.titlebar.style.font="normal 10px verdana";
this.titlebar.style.backgroundColor="blue";
this.titlebar.style.borderBottom="2px solid gray";
this.titlebar.style.whiteSpace="nowrap";
this.titlebar.style.textAlign="center";
this.titlebar.style.backgroundImage="url(window_toolbar.png)";
this.titlebar.className="WindowFigure_titlebar";
this.textNode=document.createTextNode(this.title);
this.titlebar.appendChild(this.textNode);
this.disableTextSelection(this.titlebar);
item.appendChild(this.titlebar);
}
return item;
};
draw2d.WindowFigure.prototype.setDocumentDirty=function(_1e46){
};
draw2d.WindowFigure.prototype.onDragend=function(){
};
draw2d.WindowFigure.prototype.onDragstart=function(x,y){
if(this.titlebar===null){
return false;
}
if(this.canDrag===true&&x<parseInt(this.titlebar.style.width)&&y<parseInt(this.titlebar.style.height)){
return true;
}
return false;
};
draw2d.WindowFigure.prototype.isSelectable=function(){
return false;
};
draw2d.WindowFigure.prototype.setCanDrag=function(flag){
draw2d.Figure.prototype.setCanDrag.call(this,flag);
this.html.style.cursor="";
if(this.titlebar===null){
return;
}
if(flag){
this.titlebar.style.cursor="move";
}else{
this.titlebar.style.cursor="";
}
};
draw2d.WindowFigure.prototype.setWorkflow=function(_1e4a){
var _1e4b=this.workflow;
draw2d.Figure.prototype.setWorkflow.call(this,_1e4a);
if(_1e4b!==null){
_1e4b.removeSelectionListener(this);
}
if(this.workflow!==null){
this.workflow.addSelectionListener(this);
}
};
draw2d.WindowFigure.prototype.setDropShadow=function(w){
this.dropShadow=w;
if(this.html===null){
return;
}
if(this.dropShadow>0){
this.html.style.boxShadow=w+"px "+w+"px "+w+"px #ccc";
}else{
this.html.style.boxShadow="";
}
};
draw2d.WindowFigure.prototype.setDimension=function(w,h){
draw2d.Figure.prototype.setDimension.call(this,w,h);
if(this.titlebar!==null){
this.titlebar.style.width=this.getWidth()+"px";
}
};
draw2d.WindowFigure.prototype.setTitle=function(title){
this.title=title;
};
draw2d.WindowFigure.prototype.getMinWidth=function(){
return 50;
};
draw2d.WindowFigure.prototype.getMinHeight=function(){
return 50;
};
draw2d.WindowFigure.prototype.isResizeable=function(){
return false;
};
draw2d.WindowFigure.prototype.setAlpha=function(_1e50){
};
draw2d.WindowFigure.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.bgColor!==null){
this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
}else{
this.html.style.backgroundColor="transparent";
this.html.style.backgroundImage="";
}
};
draw2d.WindowFigure.prototype.setColor=function(color){
this.lineColor=color;
if(this.lineColor!==null){
this.html.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
}else{
this.html.style.border="0px";
}
};
draw2d.WindowFigure.prototype.setLineWidth=function(w){
this.lineStroke=w;
this.html.style.border=this.lineStroke+"px solid black";
};
draw2d.WindowFigure.prototype.onSelectionChanged=function(_1e54,model){
};
draw2d.Button=function(_2fb3,width,_2fb5){
this.x=0;
this.y=0;
this.width=24;
this.height=24;
this.id=draw2d.UUID.create();
this.enabled=true;
this.active=false;
this.palette=_2fb3;
this.html=this.createHTMLElement();
if(width!==undefined&&_2fb5!==undefined){
this.setDimension(width,_2fb5);
}else{
this.setDimension(24,24);
}
};
draw2d.Button.prototype.type="draw2d.Button";
draw2d.Button.prototype.dispose=function(){
};
draw2d.Button.prototype.getImageUrl=function(){
return this.type+".png";
};
draw2d.Button.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.height=this.width+"px";
item.style.width=this.height+"px";
item.style.margin="0px";
item.style.padding="0px";
item.style.outline="none";
if(this.getImageUrl()!==null){
item.style.backgroundImage="url("+this.getImageUrl()+")";
}else{
item.style.backgroundImage="";
}
var oThis=this;
this.omousedown=function(event){
if(oThis.enabled){
oThis.setActive(true);
}
event.cancelBubble=true;
event.returnValue=false;
};
this.omouseup=function(event){
if(oThis.enabled){
oThis.setActive(false);
oThis.execute();
oThis.palette.setActiveTool(null);
}
event.cancelBubble=true;
event.returnValue=false;
};
if(item.addEventListener){
item.addEventListener("mousedown",this.omousedown,false);
item.addEventListener("mouseup",this.omouseup,false);
}else{
if(item.attachEvent){
item.attachEvent("onmousedown",this.omousedown);
item.attachEvent("onmouseup",this.omouseup);
}
}
return item;
};
draw2d.Button.prototype.getHTMLElement=function(){
if(this.html===null){
this.html=this.createHTMLElement();
}
return this.html;
};
draw2d.Button.prototype.execute=function(){
};
draw2d.Button.prototype.setTooltip=function(_2fba){
this.tooltip=_2fba;
if(this.tooltip!==null){
this.html.title=this.tooltip;
}else{
this.html.title="";
}
};
draw2d.Button.prototype.getWorkflow=function(){
return this.getToolPalette().getWorkflow();
};
draw2d.Button.prototype.getToolPalette=function(){
return this.palette;
};
draw2d.Button.prototype.setActive=function(flag){
if(!this.enabled){
return;
}
this.active=flag;
if(flag===true){
this.html.style.border="1px inset";
}else{
this.html.style.border="0px";
}
};
draw2d.Button.prototype.isActive=function(){
return this.active;
};
draw2d.Button.prototype.setEnabled=function(flag){
this.enabled=flag;
if(flag){
this.html.style.filter="alpha(opacity=100)";
this.html.style.opacity="1.0";
}else{
this.html.style.filter="alpha(opacity=30)";
this.html.style.opacity="0.3";
}
};
draw2d.Button.prototype.setDimension=function(w,h){
this.width=w;
this.height=h;
if(this.html===null){
return;
}
this.html.style.width=this.width+"px";
this.html.style.height=this.height+"px";
};
draw2d.Button.prototype.setPosition=function(xPos,yPos){
this.x=Math.max(0,xPos);
this.y=Math.max(0,yPos);
if(this.html===null){
return;
}
this.html.style.left=this.x+"px";
this.html.style.top=this.y+"px";
};
draw2d.Button.prototype.getWidth=function(){
return this.width;
};
draw2d.Button.prototype.getHeight=function(){
return this.height;
};
draw2d.Button.prototype.getY=function(){
return this.y;
};
draw2d.Button.prototype.getX=function(){
return this.x;
};
draw2d.Button.prototype.getPosition=function(){
return new draw2d.Point(this.x,this.y);
};
draw2d.ToggleButton=function(_35a6){
draw2d.Button.call(this,_35a6);
this.isDownFlag=false;
};
draw2d.ToggleButton.prototype=new draw2d.Button();
draw2d.ToggleButton.prototype.type="draw2d.ToggleButton";
draw2d.ToggleButton.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.height="24px";
item.style.width="24px";
item.style.margin="0px";
item.style.padding="0px";
if(this.getImageUrl()!==null){
item.style.backgroundImage="url("+this.getImageUrl()+")";
}else{
item.style.backgroundImage="";
}
var oThis=this;
this.omousedown=function(event){
if(oThis.enabled){
if(!oThis.isDown()){
draw2d.Button.prototype.setActive.call(oThis,true);
}
}
event.cancelBubble=true;
event.returnValue=false;
};
this.omouseup=function(event){
if(oThis.enabled){
if(oThis.isDown()){
draw2d.Button.prototype.setActive.call(oThis,false);
}
oThis.isDownFlag=!oThis.isDownFlag;
oThis.execute();
}
event.cancelBubble=true;
event.returnValue=false;
};
if(item.addEventListener){
item.addEventListener("mousedown",this.omousedown,false);
item.addEventListener("mouseup",this.omouseup,false);
}else{
if(item.attachEvent){
item.attachEvent("onmousedown",this.omousedown);
item.attachEvent("onmouseup",this.omouseup);
}
}
return item;
};
draw2d.ToggleButton.prototype.isDown=function(){
return this.isDownFlag;
};
draw2d.ToggleButton.prototype.setActive=function(flag){
draw2d.Button.prototype.setActive.call(this,flag);
this.isDownFlag=flag;
};
draw2d.ToggleButton.prototype.execute=function(){
};
draw2d.ToolGeneric=function(_2f38){
this.x=0;
this.y=0;
this.enabled=true;
this.tooltip=null;
this.palette=_2f38;
this.html=this.createHTMLElement();
this.setDimension(10,10);
};
draw2d.ToolGeneric.prototype.type="draw2d.ToolGeneric";
draw2d.ToolGeneric.prototype.dispose=function(){
};
draw2d.ToolGeneric.prototype.getImageUrl=function(){
return this.type+".png";
};
draw2d.ToolGeneric.prototype.getWorkflow=function(){
return this.getToolPalette().getWorkflow();
};
draw2d.ToolGeneric.prototype.getToolPalette=function(){
return this.palette;
};
draw2d.ToolGeneric.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.height="24px";
item.style.width="24px";
item.style.margin="0px";
item.style.padding="0px";
if(this.getImageUrl()!==null){
item.style.backgroundImage="url("+this.getImageUrl()+")";
}else{
item.style.backgroundImage="";
}
var oThis=this;
this.click=function(event){
if(oThis.enabled){
oThis.palette.setActiveTool(oThis);
}
event.cancelBubble=true;
event.returnValue=false;
};
if(item.addEventListener){
item.addEventListener("click",this.click,false);
}else{
if(item.attachEvent){
item.attachEvent("onclick",this.click);
}
}
if(this.tooltip!==null){
item.title=this.tooltip;
}else{
item.title="";
}
return item;
};
draw2d.ToolGeneric.prototype.getHTMLElement=function(){
if(this.html===null){
this.html=this.createHTMLElement();
}
return this.html;
};
draw2d.ToolGeneric.prototype.execute=function(x,y){
if(this.enabled){
this.palette.setActiveTool(null);
}
};
draw2d.ToolGeneric.prototype.setTooltip=function(_2f3e){
this.tooltip=_2f3e;
if(this.tooltip!==null){
this.html.title=this.tooltip;
}else{
this.html.title="";
}
};
draw2d.ToolGeneric.prototype.setActive=function(flag){
if(!this.enabled){
return;
}
if(flag===true){
this.html.style.border="1px inset";
}else{
this.html.style.border="0px";
}
};
draw2d.ToolGeneric.prototype.setEnabled=function(flag){
this.enabled=flag;
if(flag){
this.html.style.filter="alpha(opacity=100)";
this.html.style.opacity="1.0";
}else{
this.html.style.filter="alpha(opacity=30)";
this.html.style.opacity="0.3";
}
};
draw2d.ToolGeneric.prototype.setDimension=function(w,h){
this.width=w;
this.height=h;
if(this.html===null){
return;
}
this.html.style.width=this.width+"px";
this.html.style.height=this.height+"px";
};
draw2d.ToolGeneric.prototype.setPosition=function(xPos,yPos){
this.x=Math.max(0,xPos);
this.y=Math.max(0,yPos);
if(this.html===null){
return;
}
this.html.style.left=this.x+"px";
this.html.style.top=this.y+"px";
};
draw2d.ToolGeneric.prototype.getWidth=function(){
return this.width;
};
draw2d.ToolGeneric.prototype.getHeight=function(){
return this.height;
};
draw2d.ToolGeneric.prototype.getY=function(){
return this.y;
};
draw2d.ToolGeneric.prototype.getX=function(){
return this.x;
};
draw2d.ToolGeneric.prototype.getPosition=function(){
return new draw2d.Point(this.x,this.y);
};
draw2d.ToolPalette=function(title){
draw2d.WindowFigure.call(this,title);
this.setDimension(75,400);
this.activeTool=null;
this.children={};
};
draw2d.ToolPalette.prototype=new draw2d.WindowFigure();
draw2d.ToolPalette.prototype.type="draw2d.ToolPalette";
draw2d.ToolPalette.prototype.dispose=function(){
draw2d.WindowFigure.prototype.dispose.call(this);
};
draw2d.ToolPalette.prototype.createHTMLElement=function(){
var item=draw2d.WindowFigure.prototype.createHTMLElement.call(this);
this.scrollarea=document.createElement("div");
this.scrollarea.style.position="absolute";
this.scrollarea.style.left="0px";
if(this.hasTitleBar()){
this.scrollarea.style.top="15px";
}else{
this.scrollarea.style.top="0px";
}
this.scrollarea.style.width=this.getWidth()+"px";
this.scrollarea.style.height="15px";
this.scrollarea.style.margin="0px";
this.scrollarea.style.padding="0px";
this.scrollarea.style.font="normal 10px verdana";
this.scrollarea.style.borderBottom="2px solid gray";
this.scrollarea.style.whiteSpace="nowrap";
this.scrollarea.style.textAlign="center";
this.scrollarea.style.overflowX="auto";
this.scrollarea.style.overflowY="auto";
this.scrollarea.style.overflow="auto";
item.appendChild(this.scrollarea);
return item;
};
draw2d.ToolPalette.prototype.setDimension=function(w,h){
draw2d.WindowFigure.prototype.setDimension.call(this,w,h);
if(this.scrollarea!==null){
this.scrollarea.style.width=this.getWidth()+"px";
if(this.hasTitleBar()){
this.scrollarea.style.height=(this.getHeight()-15)+"px";
}else{
this.scrollarea.style.height=this.getHeight()+"px";
}
}
};
draw2d.ToolPalette.prototype.addChild=function(item){
this.children[item.id]=item;
this.scrollarea.appendChild(item.getHTMLElement());
};
draw2d.ToolPalette.prototype.getChild=function(id){
return this.children[id];
};
draw2d.ToolPalette.prototype.getActiveTool=function(){
return this.activeTool;
};
draw2d.ToolPalette.prototype.setActiveTool=function(tool){
if(this.activeTool!=tool&&this.activeTool!==null){
this.activeTool.setActive(false);
}
if(tool!==null){
tool.setActive(true);
}
this.activeTool=tool;
};
draw2d.Dialog=function(title){
this.buttonbar=null;
if(title){
draw2d.WindowFigure.call(this,title);
}else{
draw2d.WindowFigure.call(this,"Dialog");
}
this.setDimension(400,300);
};
draw2d.Dialog.prototype=new draw2d.WindowFigure();
draw2d.Dialog.prototype.type="draw2d.Dialog";
draw2d.Dialog.prototype.createHTMLElement=function(){
var item=draw2d.WindowFigure.prototype.createHTMLElement.call(this);
var oThis=this;
this.buttonbar=document.createElement("div");
this.buttonbar.style.position="absolute";
this.buttonbar.style.left="0px";
this.buttonbar.style.bottom="0px";
this.buttonbar.style.width=this.getWidth()+"px";
this.buttonbar.style.height="30px";
this.buttonbar.style.margin="0px";
this.buttonbar.style.padding="0px";
this.buttonbar.style.font="normal 10px verdana";
this.buttonbar.style.backgroundColor="#c0c0c0";
this.buttonbar.style.borderBottom="2px solid gray";
this.buttonbar.style.whiteSpace="nowrap";
this.buttonbar.style.textAlign="center";
this.buttonbar.className="Dialog_buttonbar";
this.okbutton=document.createElement("button");
this.okbutton.style.border="1px solid gray";
this.okbutton.style.font="normal 10px verdana";
this.okbutton.style.width="80px";
this.okbutton.style.margin="5px";
this.okbutton.className="Dialog_okbutton";
this.okbutton.innerHTML="Ok";
this.okbutton.onclick=function(){
var error=null;
try{
oThis.onOk();
}
catch(e){
error=e;
}
oThis.workflow.removeFigure(oThis);
if(error!==null){
throw error;
}
};
this.buttonbar.appendChild(this.okbutton);
this.cancelbutton=document.createElement("button");
this.cancelbutton.innerHTML="Cancel";
this.cancelbutton.style.font="normal 10px verdana";
this.cancelbutton.style.border="1px solid gray";
this.cancelbutton.style.width="80px";
this.cancelbutton.style.margin="5px";
this.cancelbutton.className="Dialog_cancelbutton";
this.cancelbutton.onclick=function(){
var error=null;
try{
oThis.onCancel();
}
catch(e){
error=e;
}
oThis.workflow.removeFigure(oThis);
if(error!==null){
throw error;
}
};
this.buttonbar.appendChild(this.cancelbutton);
item.appendChild(this.buttonbar);
return item;
};
draw2d.Dialog.prototype.onOk=function(){
};
draw2d.Dialog.prototype.onCancel=function(){
};
draw2d.Dialog.prototype.setDimension=function(w,h){
draw2d.WindowFigure.prototype.setDimension.call(this,w,h);
if(this.buttonbar!==null){
this.buttonbar.style.width=this.getWidth()+"px";
}
};
draw2d.Dialog.prototype.setWorkflow=function(_2628){
draw2d.WindowFigure.prototype.setWorkflow.call(this,_2628);
this.setFocus();
};
draw2d.Dialog.prototype.setFocus=function(){
};
draw2d.Dialog.prototype.onSetDocumentDirty=function(){
};
draw2d.InputDialog=function(){
draw2d.Dialog.call(this);
this.setDimension(400,100);
};
draw2d.InputDialog.prototype=new draw2d.Dialog();
draw2d.InputDialog.prototype.type="draw2d.InputDialog";
draw2d.InputDialog.prototype.createHTMLElement=function(){
var item=draw2d.Dialog.prototype.createHTMLElement.call(this);
return item;
};
draw2d.InputDialog.prototype.onOk=function(){
this.workflow.removeFigure(this);
};
draw2d.InputDialog.prototype.onCancel=function(){
this.workflow.removeFigure(this);
};
draw2d.PropertyDialog=function(_310a,_310b,label){
this.figure=_310a;
this.propertyName=_310b;
this.label=label;
draw2d.Dialog.call(this);
this.setDimension(400,120);
};
draw2d.PropertyDialog.prototype=new draw2d.Dialog();
draw2d.PropertyDialog.prototype.type="draw2d.PropertyDialog";
draw2d.PropertyDialog.prototype.createHTMLElement=function(){
var item=draw2d.Dialog.prototype.createHTMLElement.call(this);
var _310e=document.createElement("form");
_310e.style.position="absolute";
_310e.style.left="10px";
_310e.style.top="30px";
_310e.style.width="375px";
_310e.style.font="normal 10px verdana";
item.appendChild(_310e);
this.labelDiv=document.createElement("div");
this.labelDiv.innerHTML=this.label;
this.disableTextSelection(this.labelDiv);
_310e.appendChild(this.labelDiv);
this.input=document.createElement("input");
this.input.style.border="1px solid gray";
this.input.style.font="normal 10px verdana";
this.input.type="text";
var value=this.figure.getProperty(this.propertyName);
if(value){
this.input.value=value;
}else{
this.input.value="";
}
this.input.style.width="100%";
_310e.appendChild(this.input);
this.input.focus();
return item;
};
draw2d.PropertyDialog.prototype.onOk=function(){
draw2d.Dialog.prototype.onOk.call(this);
this.figure.setProperty(this.propertyName,this.input.value);
};
draw2d.AnnotationDialog=function(_2fc6){
this.figure=_2fc6;
draw2d.Dialog.call(this);
this.setDimension(400,100);
};
draw2d.AnnotationDialog.prototype=new draw2d.Dialog();
draw2d.AnnotationDialog.prototype.type="draw2d.AnnotationDialog";
draw2d.AnnotationDialog.prototype.createHTMLElement=function(){
var item=draw2d.Dialog.prototype.createHTMLElement.call(this);
var _2fc8=document.createElement("form");
_2fc8.style.position="absolute";
_2fc8.style.left="10px";
_2fc8.style.top="30px";
_2fc8.style.width="375px";
_2fc8.style.font="normal 10px verdana";
item.appendChild(_2fc8);
this.label=document.createTextNode("Text");
_2fc8.appendChild(this.label);
this.input=document.createElement("input");
this.input.style.border="1px solid gray";
this.input.style.font="normal 10px verdana";
this.input.type="text";
var value=this.figure.getText();
if(value){
this.input.value=value;
}else{
this.input.value="";
}
this.input.style.width="100%";
_2fc8.appendChild(this.input);
this.input.focus();
return item;
};
draw2d.AnnotationDialog.prototype.onOk=function(){
this.workflow.getCommandStack().execute(new draw2d.CommandSetText(this.figure,this.input.value));
this.workflow.removeFigure(this);
};
draw2d.PropertyWindow=function(){
this.currentSelection=null;
draw2d.WindowFigure.call(this,"Property Window");
this.setDimension(200,100);
};
draw2d.PropertyWindow.prototype=new draw2d.WindowFigure();
draw2d.PropertyWindow.prototype.type="draw2d.PropertyWindow";
draw2d.PropertyWindow.prototype.dispose=function(){
draw2d.WindowFigure.prototype.dispose.call(this);
};
draw2d.PropertyWindow.prototype.createHTMLElement=function(){
var item=draw2d.WindowFigure.prototype.createHTMLElement.call(this);
item.appendChild(this.createLabel("Type:",15,25));
item.appendChild(this.createLabel("X :",15,50));
item.appendChild(this.createLabel("Y :",15,70));
item.appendChild(this.createLabel("Width :",85,50));
item.appendChild(this.createLabel("Height :",85,70));
this.labelType=this.createLabel("",50,25);
this.labelX=this.createLabel("",40,50);
this.labelY=this.createLabel("",40,70);
this.labelWidth=this.createLabel("",135,50);
this.labelHeight=this.createLabel("",135,70);
this.labelType.style.fontWeight="normal";
this.labelX.style.fontWeight="normal";
this.labelY.style.fontWeight="normal";
this.labelWidth.style.fontWeight="normal";
this.labelHeight.style.fontWeight="normal";
item.appendChild(this.labelType);
item.appendChild(this.labelX);
item.appendChild(this.labelY);
item.appendChild(this.labelWidth);
item.appendChild(this.labelHeight);
return item;
};
draw2d.PropertyWindow.prototype.onSelectionChanged=function(_21cc){
draw2d.WindowFigure.prototype.onSelectionChanged.call(this,_21cc);
if(this.currentSelection!==null){
this.currentSelection.detachMoveListener(this);
}
this.currentSelection=_21cc;
if(_21cc!==null&&_21cc!=this){
this.labelType.innerHTML=_21cc.type;
if(_21cc.getX){
this.labelX.innerHTML=_21cc.getX();
this.labelY.innerHTML=_21cc.getY();
this.labelWidth.innerHTML=_21cc.getWidth();
this.labelHeight.innerHTML=_21cc.getHeight();
this.currentSelection=_21cc;
this.currentSelection.attachMoveListener(this);
}else{
this.labelX.innerHTML="";
this.labelY.innerHTML="";
this.labelWidth.innerHTML="";
this.labelHeight.innerHTML="";
}
}else{
this.labelType.innerHTML="&lt;none&gt;";
this.labelX.innerHTML="";
this.labelY.innerHTML="";
this.labelWidth.innerHTML="";
this.labelHeight.innerHTML="";
}
};
draw2d.PropertyWindow.prototype.getCurrentSelection=function(){
return this.currentSelection;
};
draw2d.PropertyWindow.prototype.onOtherFigureMoved=function(_21cd){
if(_21cd==this.currentSelection){
this.onSelectionChanged(_21cd);
}
};
draw2d.PropertyWindow.prototype.createLabel=function(text,x,y){
var l=document.createElement("div");
l.style.position="absolute";
l.style.left=x+"px";
l.style.top=y+"px";
l.style.font="normal 10px verdana";
l.style.whiteSpace="nowrap";
l.style.fontWeight="bold";
l.innerHTML=text;
this.disableTextSelection(l);
return l;
};
draw2d.ColorDialog=function(){
this.maxValue={"h":"359","s":"100","v":"100"};
this.HSV={0:359,1:100,2:100};
this.slideHSV={0:359,1:100,2:100};
this.SVHeight=165;
this.wSV=162;
this.wH=162;
draw2d.Dialog.call(this,"Color Chooser");
this.loadSV();
this.setColor(new draw2d.Color(255,0,0));
this.setDimension(219,244);
};
draw2d.ColorDialog.prototype=new draw2d.Dialog();
draw2d.ColorDialog.prototype.type="draw2d.ColorDialog";
draw2d.ColorDialog.prototype.createHTMLElement=function(){
var oThis=this;
var item=draw2d.Dialog.prototype.createHTMLElement.call(this);
this.outerDiv=document.createElement("div");
this.outerDiv.id="plugin";
this.outerDiv.style.top="15px";
this.outerDiv.style.left="0px";
this.outerDiv.style.width="201px";
this.outerDiv.style.position="absolute";
this.outerDiv.style.padding="9px";
this.outerDiv.display="block";
this.outerDiv.style.background="#0d0d0d";
this.plugHEX=document.createElement("div");
this.plugHEX.id="plugHEX";
this.plugHEX.innerHTML="F1FFCC";
this.plugHEX.style.color="white";
this.plugHEX.style.font="normal 10px verdana";
this.outerDiv.appendChild(this.plugHEX);
this.SV=document.createElement("div");
this.SV.onmousedown=function(event){
oThis.mouseDownSV(oThis.SVslide,event);
};
this.SV.id="SV";
this.SV.style.cursor="crosshair";
this.SV.style.background="#FF0000 url(SatVal.png)";
this.SV.style.position="absolute";
this.SV.style.height="166px";
this.SV.style.width="167px";
this.SV.style.marginRight="10px";
this.SV.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='SatVal.png', sizingMethod='scale')";
this.SV.style["float"]="left";
this.outerDiv.appendChild(this.SV);
this.SVslide=document.createElement("div");
this.SVslide.onmousedown=function(event){
oThis.mouseDownSV(event);
};
this.SVslide.style.top="40px";
this.SVslide.style.left="40px";
this.SVslide.style.position="absolute";
this.SVslide.style.cursor="crosshair";
this.SVslide.style.background="url(slide.gif)";
this.SVslide.style.height="9px";
this.SVslide.style.width="9px";
this.SVslide.style.lineHeight="1px";
this.outerDiv.appendChild(this.SVslide);
this.H=document.createElement("form");
this.H.id="H";
this.H.onmousedown=function(event){
oThis.mouseDownH(event);
};
this.H.style.border="1px solid #000000";
this.H.style.cursor="crosshair";
this.H.style.position="absolute";
this.H.style.width="19px";
this.H.style.top="28px";
this.H.style.left="191px";
this.outerDiv.appendChild(this.H);
this.Hslide=document.createElement("div");
this.Hslide.style.top="-7px";
this.Hslide.style.left="-8px";
this.Hslide.style.background="url(slideHue.gif)";
this.Hslide.style.height="5px";
this.Hslide.style.width="33px";
this.Hslide.style.position="absolute";
this.Hslide.style.lineHeight="1px";
this.H.appendChild(this.Hslide);
this.Hmodel=document.createElement("div");
this.Hmodel.style.height="1px";
this.Hmodel.style.width="19px";
this.Hmodel.style.lineHeight="1px";
this.Hmodel.style.margin="0px";
this.Hmodel.style.padding="0px";
this.Hmodel.style.fontSize="1px";
this.H.appendChild(this.Hmodel);
item.appendChild(this.outerDiv);
return item;
};
draw2d.ColorDialog.prototype.onOk=function(){
draw2d.Dialog.prototype.onOk.call(this);
};
draw2d.browser=function(v){
return (Math.max(navigator.userAgent.toLowerCase().indexOf(v),0));
};
draw2d.ColorDialog.prototype.showColor=function(c){
this.plugHEX.style.background="#"+c;
this.plugHEX.innerHTML=c;
};
draw2d.ColorDialog.prototype.getSelectedColor=function(){
var rgb=this.hex2rgb(this.plugHEX.innerHTML);
return new draw2d.Color(rgb[0],rgb[1],rgb[2]);
};
draw2d.ColorDialog.prototype.setColor=function(color){
if(color===null){
color=new draw2d.Color(100,100,100);
}
var hex=this.rgb2hex(Array(color.getRed(),color.getGreen(),color.getBlue()));
this.updateH(hex);
};
draw2d.ColorDialog.prototype.XY=function(e,v){
var z=draw2d.browser("msie")?Array(event.clientX+document.body.scrollLeft,event.clientY+document.body.scrollTop):Array(e.pageX,e.pageY);
return z[v];
};
draw2d.ColorDialog.prototype.mkHSV=function(a,b,c){
return (Math.min(a,Math.max(0,Math.ceil((parseInt(c)/b)*a))));
};
draw2d.ColorDialog.prototype.ckHSV=function(a,b){
if(a>=0&&a<=b){
return (a);
}else{
if(a>b){
return (b);
}else{
if(a<0){
return ("-"+oo);
}
}
}
};
draw2d.ColorDialog.prototype.mouseDownH=function(e){
this.slideHSV[0]=this.HSV[0];
var oThis=this;
this.H.onmousemove=function(e){
oThis.dragH(e);
};
this.H.onmouseup=function(e){
oThis.H.onmousemove="";
oThis.H.onmouseup="";
};
this.dragH(e);
};
draw2d.ColorDialog.prototype.dragH=function(e){
var y=this.XY(e,1)-this.getY()-40;
this.Hslide.style.top=(this.ckHSV(y,this.wH)-5)+"px";
this.slideHSV[0]=this.mkHSV(359,this.wH,this.Hslide.style.top);
this.updateSV();
this.showColor(this.commit());
this.SV.style.backgroundColor="#"+this.hsv2hex(Array(this.HSV[0],100,100));
};
draw2d.ColorDialog.prototype.mouseDownSV=function(o,e){
this.slideHSV[0]=this.HSV[0];
var oThis=this;
function reset(){
oThis.SV.onmousemove="";
oThis.SV.onmouseup="";
oThis.SVslide.onmousemove="";
oThis.SVslide.onmouseup="";
}
this.SV.onmousemove=function(e){
oThis.dragSV(e);
};
this.SV.onmouseup=reset;
this.SVslide.onmousemove=function(e){
oThis.dragSV(e);
};
this.SVslide.onmouseup=reset;
this.dragSV(e);
};
draw2d.ColorDialog.prototype.dragSV=function(e){
var x=this.XY(e,0)-this.getX()-1;
var y=this.XY(e,1)-this.getY()-20;
this.SVslide.style.left=this.ckHSV(x,this.wSV)+"px";
this.SVslide.style.top=this.ckHSV(y,this.wSV)+"px";
this.slideHSV[1]=this.mkHSV(100,this.wSV,this.SVslide.style.left);
this.slideHSV[2]=100-this.mkHSV(100,this.wSV,this.SVslide.style.top);
this.updateSV();
};
draw2d.ColorDialog.prototype.commit=function(){
var r="hsv";
var z={};
var j="";
for(var i=0;i<=r.length-1;i++){
j=r.substr(i,1);
z[i]=(j=="h")?this.maxValue[j]-this.mkHSV(this.maxValue[j],this.wH,this.Hslide.style.top):this.HSV[i];
}
return (this.updateSV(this.hsv2hex(z)));
};
draw2d.ColorDialog.prototype.updateSV=function(v){
this.HSV=v?this.hex2hsv(v):Array(this.slideHSV[0],this.slideHSV[1],this.slideHSV[2]);
if(!v){
v=this.hsv2hex(Array(this.slideHSV[0],this.slideHSV[1],this.slideHSV[2]));
}
this.showColor(v);
return v;
};
draw2d.ColorDialog.prototype.loadSV=function(){
var z="";
for(var i=this.SVHeight;i>=0;i--){
z+="<div style=\"background:#"+this.hsv2hex(Array(Math.round((359/this.SVHeight)*i),100,100))+";\"><br/></div>";
}
this.Hmodel.innerHTML=z;
};
draw2d.ColorDialog.prototype.updateH=function(v){
this.plugHEX.innerHTML=v;
this.HSV=this.hex2hsv(v);
this.SV.style.backgroundColor="#"+this.hsv2hex(Array(this.HSV[0],100,100));
this.SVslide.style.top=(parseInt(this.wSV-this.wSV*(this.HSV[1]/100))+20)+"px";
this.SVslide.style.left=(parseInt(this.wSV*(this.HSV[1]/100))+5)+"px";
this.Hslide.style.top=(parseInt(this.wH*((this.maxValue["h"]-this.HSV[0])/this.maxValue["h"]))-7)+"px";
};
draw2d.ColorDialog.prototype.toHex=function(v){
v=Math.round(Math.min(Math.max(0,v),255));
return ("0123456789ABCDEF".charAt((v-v%16)/16)+"0123456789ABCDEF".charAt(v%16));
};
draw2d.ColorDialog.prototype.hex2rgb=function(r){
return ({0:parseInt(r.substr(0,2),16),1:parseInt(r.substr(2,2),16),2:parseInt(r.substr(4,2),16)});
};
draw2d.ColorDialog.prototype.rgb2hex=function(r){
return (this.toHex(r[0])+this.toHex(r[1])+this.toHex(r[2]));
};
draw2d.ColorDialog.prototype.hsv2hex=function(h){
return (this.rgb2hex(this.hsv2rgb(h)));
};
draw2d.ColorDialog.prototype.hex2hsv=function(v){
return (this.rgb2hsv(this.hex2rgb(v)));
};
draw2d.ColorDialog.prototype.rgb2hsv=function(r){
var max=Math.max(r[0],r[1],r[2]);
var delta=max-Math.min(r[0],r[1],r[2]);
var H;
var S;
var V;
if(max!=0){
S=Math.round(delta/max*100);
if(r[0]==max){
H=(r[1]-r[2])/delta;
}else{
if(r[1]==max){
H=2+(r[2]-r[0])/delta;
}else{
if(r[2]==max){
H=4+(r[0]-r[1])/delta;
}
}
}
var H=Math.min(Math.round(H*60),360);
if(H<0){
H+=360;
}
}
return ({0:H?H:0,1:S?S:0,2:Math.round((max/255)*100)});
};
draw2d.ColorDialog.prototype.hsv2rgb=function(r){
var R;
var B;
var G;
var S=r[1]/100;
var V=r[2]/100;
var H=r[0]/360;
if(S>0){
if(H>=1){
H=0;
}
H=6*H;
F=H-Math.floor(H);
A=Math.round(255*V*(1-S));
B=Math.round(255*V*(1-(S*F)));
C=Math.round(255*V*(1-(S*(1-F))));
V=Math.round(255*V);
switch(Math.floor(H)){
case 0:
R=V;
G=C;
B=A;
break;
case 1:
R=B;
G=V;
B=A;
break;
case 2:
R=A;
G=V;
B=C;
break;
case 3:
R=A;
G=B;
B=V;
break;
case 4:
R=C;
G=A;
B=V;
break;
case 5:
R=V;
G=A;
B=B;
break;
}
return ({0:R?R:0,1:G?G:0,2:B?B:0});
}else{
return ({0:(V=Math.round(V*255)),1:V,2:V});
}
};
draw2d.LineColorDialog=function(_27a5){
draw2d.ColorDialog.call(this);
this.figure=_27a5;
var color=_27a5.getColor();
this.updateH(this.rgb2hex(color.getRed(),color.getGreen(),color.getBlue()));
};
draw2d.LineColorDialog.prototype=new draw2d.ColorDialog();
draw2d.LineColorDialog.prototype.type="draw2d.LineColorDialog";
draw2d.LineColorDialog.prototype.onOk=function(){
var _27a7=this.workflow;
draw2d.ColorDialog.prototype.onOk.call(this);
if(typeof this.figure.setColor=="function"){
_27a7.getCommandStack().execute(new draw2d.CommandSetColor(this.figure,this.getSelectedColor()));
if(_27a7.getCurrentSelection()==this.figure){
_27a7.setCurrentSelection(this.figure);
}
}
};
draw2d.BackgroundColorDialog=function(_2496){
draw2d.ColorDialog.call(this);
this.figure=_2496;
var color=_2496.getBackgroundColor();
if(color!==null){
this.updateH(this.rgb2hex(color.getRed(),color.getGreen(),color.getBlue()));
}
};
draw2d.BackgroundColorDialog.prototype=new draw2d.ColorDialog();
draw2d.BackgroundColorDialog.prototype.type="draw2d.BackgroundColorDialog";
draw2d.BackgroundColorDialog.prototype.onOk=function(){
var _2498=this.workflow;
draw2d.ColorDialog.prototype.onOk.call(this);
if(typeof this.figure.setBackgroundColor=="function"){
_2498.getCommandStack().execute(new draw2d.CommandSetBackgroundColor(this.figure,this.getSelectedColor()));
if(_2498.getCurrentSelection()==this.figure){
_2498.setCurrentSelection(this.figure);
}
}
};
draw2d.AnnotationDialog=function(_2fc6){
this.figure=_2fc6;
draw2d.Dialog.call(this);
this.setDimension(400,100);
};
draw2d.AnnotationDialog.prototype=new draw2d.Dialog();
draw2d.AnnotationDialog.prototype.type="draw2d.AnnotationDialog";
draw2d.AnnotationDialog.prototype.createHTMLElement=function(){
var item=draw2d.Dialog.prototype.createHTMLElement.call(this);
var _2fc8=document.createElement("form");
_2fc8.style.position="absolute";
_2fc8.style.left="10px";
_2fc8.style.top="30px";
_2fc8.style.width="375px";
_2fc8.style.font="normal 10px verdana";
item.appendChild(_2fc8);
this.label=document.createTextNode("Text");
_2fc8.appendChild(this.label);
this.input=document.createElement("input");
this.input.style.border="1px solid gray";
this.input.style.font="normal 10px verdana";
this.input.type="text";
var value=this.figure.getText();
if(value){
this.input.value=value;
}else{
this.input.value="";
}
this.input.style.width="100%";
_2fc8.appendChild(this.input);
this.input.focus();
return item;
};
draw2d.AnnotationDialog.prototype.onOk=function(){
this.workflow.getCommandStack().execute(new draw2d.CommandSetText(this.figure,this.input.value));
this.workflow.removeFigure(this);
};
draw2d.Command=function(label){
this.label=label;
};
draw2d.Command.prototype.type="draw2d.Command";
draw2d.Command.prototype.getLabel=function(){
return this.label;
};
draw2d.Command.prototype.canExecute=function(){
return true;
};
draw2d.Command.prototype.execute=function(){
};
draw2d.Command.prototype.cancel=function(){
};
draw2d.Command.prototype.undo=function(){
};
draw2d.Command.prototype.redo=function(){
};
draw2d.CommandStack=function(){
this.undostack=[];
this.redostack=[];
this.maxundo=50;
this.eventListeners=new draw2d.ArrayList();
};
draw2d.CommandStack.PRE_EXECUTE=1;
draw2d.CommandStack.PRE_REDO=2;
draw2d.CommandStack.PRE_UNDO=4;
draw2d.CommandStack.POST_EXECUTE=8;
draw2d.CommandStack.POST_REDO=16;
draw2d.CommandStack.POST_UNDO=32;
draw2d.CommandStack.POST_MASK=draw2d.CommandStack.POST_EXECUTE|draw2d.CommandStack.POST_UNDO|draw2d.CommandStack.POST_REDO;
draw2d.CommandStack.PRE_MASK=draw2d.CommandStack.PRE_EXECUTE|draw2d.CommandStack.PRE_UNDO|draw2d.CommandStack.PRE_REDO;
draw2d.CommandStack.prototype.type="draw2d.CommandStack";
draw2d.CommandStack.prototype.setUndoLimit=function(count){
this.maxundo=count;
};
draw2d.CommandStack.prototype.markSaveLocation=function(){
this.undostack=[];
this.redostack=[];
};
draw2d.CommandStack.prototype.execute=function(_3145){
if(_3145===null){
return;
}
if(_3145.canExecute()==false){
return;
}
this.notifyListeners(_3145,draw2d.CommandStack.PRE_EXECUTE);
this.undostack.push(_3145);
_3145.execute();
this.redostack=[];
if(this.undostack.length>this.maxundo){
this.undostack=this.undostack.slice(this.undostack.length-this.maxundo);
}
this.notifyListeners(_3145,draw2d.CommandStack.POST_EXECUTE);
};
draw2d.CommandStack.prototype.undo=function(){
var _3146=this.undostack.pop();
if(_3146){
this.notifyListeners(_3146,draw2d.CommandStack.PRE_UNDO);
this.redostack.push(_3146);
_3146.undo();
this.notifyListeners(_3146,draw2d.CommandStack.POST_UNDO);
}
};
draw2d.CommandStack.prototype.redo=function(){
var _3147=this.redostack.pop();
if(_3147){
this.notifyListeners(_3147,draw2d.CommandStack.PRE_REDO);
this.undostack.push(_3147);
_3147.redo();
this.notifyListeners(_3147,draw2d.CommandStack.POST_REDO);
}
};
draw2d.CommandStack.prototype.getRedoLabel=function(){
if(this.redostack.lenght===0){
return "";
}
var _3148=this.redostack[this.redostack.length-1];
if(_3148){
return _3148.getLabel();
}
return "";
};
draw2d.CommandStack.prototype.getUndoLabel=function(){
if(this.undostack.lenght===0){
return "";
}
var _3149=this.undostack[this.undostack.length-1];
if(_3149){
return _3149.getLabel();
}
return "";
};
draw2d.CommandStack.prototype.canRedo=function(){
return this.redostack.length>0;
};
draw2d.CommandStack.prototype.canUndo=function(){
return this.undostack.length>0;
};
draw2d.CommandStack.prototype.addCommandStackEventListener=function(_314a){
if(_314a instanceof draw2d.CommandStackEventListener){
this.eventListeners.add(_314a);
}else{
throw "Object doesn't implement required callback interface [draw2d.CommandStackListener]";
}
};
draw2d.CommandStack.prototype.removeCommandStackEventListener=function(_314b){
this.eventListeners.remove(_314b);
};
draw2d.CommandStack.prototype.notifyListeners=function(_314c,state){
var event=new draw2d.CommandStackEvent(_314c,state);
var size=this.eventListeners.getSize();
for(var i=0;i<size;i++){
this.eventListeners.get(i).stackChanged(event);
}
};
draw2d.CommandStackEvent=function(_2a5b,_2a5c){
this.command=_2a5b;
this.details=_2a5c;
};
draw2d.CommandStackEvent.prototype.type="draw2d.CommandStackEvent";
draw2d.CommandStackEvent.prototype.getCommand=function(){
return this.command;
};
draw2d.CommandStackEvent.prototype.getDetails=function(){
return this.details;
};
draw2d.CommandStackEvent.prototype.isPostChangeEvent=function(){
return 0!=(this.getDetails()&draw2d.CommandStack.POST_MASK);
};
draw2d.CommandStackEvent.prototype.isPreChangeEvent=function(){
return 0!=(this.getDetails()&draw2d.CommandStack.PRE_MASK);
};
draw2d.CommandStackEventListener=function(){
};
draw2d.CommandStackEventListener.prototype.type="draw2d.CommandStackEventListener";
draw2d.CommandStackEventListener.prototype.stackChanged=function(event){
};
draw2d.CommandAdd=function(_38b3,_38b4,x,y,_38b7){
draw2d.Command.call(this,"add figure");
if(_38b7===undefined){
_38b7=null;
}
this.parent=_38b7;
this.figure=_38b4;
this.x=x;
this.y=y;
this.workflow=_38b3;
};
draw2d.CommandAdd.prototype=new draw2d.Command();
draw2d.CommandAdd.prototype.type="draw2d.CommandAdd";
draw2d.CommandAdd.prototype.execute=function(){
this.redo();
};
draw2d.CommandAdd.prototype.redo=function(){
if(this.x&&this.y){
this.workflow.addFigure(this.figure,this.x,this.y);
}else{
this.workflow.addFigure(this.figure);
}
this.workflow.setCurrentSelection(this.figure);
if(this.parent!==null){
this.parent.addChild(this.figure);
}
};
draw2d.CommandAdd.prototype.undo=function(){
this.workflow.removeFigure(this.figure);
this.workflow.setCurrentSelection(null);
if(this.parent!==null){
this.parent.removeChild(this.figure);
}
};
draw2d.CommandDelete=function(_274f){
draw2d.Command.call(this,"delete figure");
this.parent=_274f.parent;
this.figure=_274f;
this.workflow=_274f.workflow;
this.connections=null;
this.compartmentDeleteCommands=null;
};
draw2d.CommandDelete.prototype=new draw2d.Command();
draw2d.CommandDelete.prototype.type="draw2d.CommandDelete";
draw2d.CommandDelete.prototype.execute=function(){
this.redo();
};
draw2d.CommandDelete.prototype.undo=function(){
if(this.figure instanceof draw2d.CompartmentFigure){
for(var i=0;i<this.compartmentDeleteCommands.getSize();i++){
var _2751=this.compartmentDeleteCommands.get(i);
this.figure.addChild(_2751.figure);
this.workflow.getCommandStack().undo();
}
}
this.workflow.addFigure(this.figure);
if(this.figure instanceof draw2d.Connection){
this.figure.reconnect();
}
this.workflow.setCurrentSelection(this.figure);
if(this.parent!==null){
this.parent.addChild(this.figure);
}
for(var i=0;i<this.connections.getSize();++i){
this.workflow.addFigure(this.connections.get(i));
this.connections.get(i).reconnect();
}
};
draw2d.CommandDelete.prototype.redo=function(){
if(this.figure instanceof draw2d.CompartmentFigure){
if(this.compartmentDeleteCommands===null){
this.compartmentDeleteCommands=new draw2d.ArrayList();
var _2752=this.figure.getChildren().clone();
for(var i=0;i<_2752.getSize();i++){
var child=_2752.get(i);
this.figure.removeChild(child);
var _2755=new draw2d.CommandDelete(child);
this.compartmentDeleteCommands.add(_2755);
this.workflow.getCommandStack().execute(_2755);
}
}else{
for(var i=0;i<this.compartmentDeleteCommands.getSize();i++){
this.workflow.redo();
}
}
}
this.workflow.removeFigure(this.figure);
this.workflow.setCurrentSelection(null);
if(this.figure instanceof draw2d.Node&&this.connections===null){
this.connections=new draw2d.ArrayList();
var ports=this.figure.getPorts();
for(var i=0;i<ports.getSize();i++){
var port=ports.get(i);
for(var c=0,c_size=port.getConnections().getSize();c<c_size;c++){
if(!this.connections.contains(port.getConnections().get(c))){
this.connections.add(port.getConnections().get(c));
}
}
}
}
if(this.connections===null){
this.connections=new draw2d.ArrayList();
}
if(this.parent!==null){
this.parent.removeChild(this.figure);
}
for(var i=0;i<this.connections.getSize();++i){
this.workflow.removeFigure(this.connections.get(i));
}
};
draw2d.CommandMove=function(_31a2,x,y){
draw2d.Command.call(this,"move figure");
this.figure=_31a2;
if(x==undefined){
this.oldX=_31a2.getX();
this.oldY=_31a2.getY();
}else{
this.oldX=x;
this.oldY=y;
}
this.oldCompartment=_31a2.getParent();
};
draw2d.CommandMove.prototype=new draw2d.Command();
draw2d.CommandMove.prototype.type="draw2d.CommandMove";
draw2d.CommandMove.prototype.setStartPosition=function(x,y){
this.oldX=x;
this.oldY=y;
};
draw2d.CommandMove.prototype.setPosition=function(x,y){
this.newX=x;
this.newY=y;
this.newCompartment=this.figure.workflow.getBestCompartmentFigure(x,y,this.figure);
};
draw2d.CommandMove.prototype.canExecute=function(){
return this.newX!=this.oldX||this.newY!=this.oldY;
};
draw2d.CommandMove.prototype.execute=function(){
this.redo();
};
draw2d.CommandMove.prototype.undo=function(){
this.figure.setPosition(this.oldX,this.oldY);
if(this.newCompartment!==null){
this.newCompartment.removeChild(this.figure);
}
if(this.oldCompartment!==null){
this.oldCompartment.addChild(this.figure);
}
this.figure.workflow.moveResizeHandles(this.figure);
};
draw2d.CommandMove.prototype.redo=function(){
this.figure.setPosition(this.newX,this.newY);
if(this.oldCompartment!==null){
this.oldCompartment.removeChild(this.figure);
}
if(this.newCompartment!==null){
this.newCompartment.addChild(this.figure);
}
this.figure.workflow.moveResizeHandles(this.figure);
};
draw2d.CommandResize=function(_391e,width,_3920){
draw2d.Command.call(this,"resize figure");
this.figure=_391e;
if(width===undefined){
this.oldWidth=_391e.getWidth();
this.oldHeight=_391e.getHeight();
}else{
this.oldWidth=width;
this.oldHeight=_3920;
}
};
draw2d.CommandResize.prototype=new draw2d.Command();
draw2d.CommandResize.prototype.type="draw2d.CommandResize";
draw2d.CommandResize.prototype.setDimension=function(width,_3922){
this.newWidth=width;
this.newHeight=_3922;
};
draw2d.CommandResize.prototype.canExecute=function(){
return this.newWidth!=this.oldWidth||this.newHeight!=this.oldHeight;
};
draw2d.CommandResize.prototype.execute=function(){
this.redo();
};
draw2d.CommandResize.prototype.undo=function(){
this.figure.setDimension(this.oldWidth,this.oldHeight);
this.figure.workflow.moveResizeHandles(this.figure);
};
draw2d.CommandResize.prototype.redo=function(){
this.figure.setDimension(this.newWidth,this.newHeight);
this.figure.workflow.moveResizeHandles(this.figure);
};
draw2d.CommandSetText=function(_2716,text){
draw2d.Command.call(this,"set text");
this.figure=_2716;
this.newText=text;
this.oldText=_2716.getText();
};
draw2d.CommandSetText.prototype=new draw2d.Command();
draw2d.CommandSetText.prototype.type="draw2d.CommandSetText";
draw2d.CommandSetText.prototype.execute=function(){
this.redo();
};
draw2d.CommandSetText.prototype.redo=function(){
this.figure.setText(this.newText);
};
draw2d.CommandSetText.prototype.undo=function(){
this.figure.setText(this.oldText);
};
draw2d.CommandSetColor=function(_359d,color){
draw2d.Command.call(this,"set color");
this.figure=_359d;
this.newColor=color;
this.oldColor=_359d.getColor();
};
draw2d.CommandSetColor.prototype=new draw2d.Command();
draw2d.CommandSetColor.prototype.type="draw2d.CommandSetColor";
draw2d.CommandSetColor.prototype.execute=function(){
this.redo();
};
draw2d.CommandSetColor.prototype.undo=function(){
this.figure.setColor(this.oldColor);
};
draw2d.CommandSetColor.prototype.redo=function(){
this.figure.setColor(this.newColor);
};
draw2d.CommandSetBackgroundColor=function(_274a,color){
draw2d.Command.call(this,"set background color");
this.figure=_274a;
this.newColor=color;
this.oldColor=_274a.getBackgroundColor();
};
draw2d.CommandSetBackgroundColor.prototype=new draw2d.Command();
draw2d.CommandSetBackgroundColor.prototype.type="draw2d.CommandSetBackgroundColor";
draw2d.CommandSetBackgroundColor.prototype.execute=function(){
this.redo();
};
draw2d.CommandSetBackgroundColor.prototype.undo=function(){
this.figure.setBackgroundColor(this.oldColor);
};
draw2d.CommandSetBackgroundColor.prototype.redo=function(){
this.figure.setBackgroundColor(this.newColor);
};
draw2d.CommandConnect=function(_2cb7,_2cb8,_2cb9){
draw2d.Command.call(this,"create connection");
this.workflow=_2cb7;
this.source=_2cb8;
this.target=_2cb9;
this.connection=null;
};
draw2d.CommandConnect.prototype=new draw2d.Command();
draw2d.CommandConnect.prototype.type="draw2d.CommandConnect";
draw2d.CommandConnect.prototype.setConnection=function(_2cba){
this.connection=_2cba;
};
draw2d.CommandConnect.prototype.execute=function(){
if(this.connection===null){
this.connection=new draw2d.Connection();
}
this.connection.setSource(this.source);
this.connection.setTarget(this.target);
this.workflow.addFigure(this.connection);
};
draw2d.CommandConnect.prototype.redo=function(){
this.workflow.addFigure(this.connection);
this.connection.reconnect();
};
draw2d.CommandConnect.prototype.undo=function(){
this.workflow.removeFigure(this.connection);
};
draw2d.CommandReconnect=function(con){
draw2d.Command.call(this,"reconnect connection");
this.con=con;
this.oldSourcePort=con.getSource();
this.oldTargetPort=con.getTarget();
this.oldRouter=con.getRouter();
this.con.setRouter(new draw2d.NullConnectionRouter());
};
draw2d.CommandReconnect.prototype=new draw2d.Command();
draw2d.CommandReconnect.prototype.type="draw2d.CommandReconnect";
draw2d.CommandReconnect.prototype.canExecute=function(){
return true;
};
draw2d.CommandReconnect.prototype.setNewPorts=function(_242f,_2430){
this.newSourcePort=_242f;
this.newTargetPort=_2430;
};
draw2d.CommandReconnect.prototype.execute=function(){
this.redo();
};
draw2d.CommandReconnect.prototype.cancel=function(){
var start=this.con.sourceAnchor.getLocation(this.con.targetAnchor.getReferencePoint());
var end=this.con.targetAnchor.getLocation(this.con.sourceAnchor.getReferencePoint());
this.con.setStartPoint(start.x,start.y);
this.con.setEndPoint(end.x,end.y);
this.con.getWorkflow().showLineResizeHandles(this.con);
this.con.setRouter(this.oldRouter);
};
draw2d.CommandReconnect.prototype.undo=function(){
this.con.setSource(this.oldSourcePort);
this.con.setTarget(this.oldTargetPort);
this.con.setRouter(this.oldRouter);
if(this.con.getWorkflow().getCurrentSelection()==this.con){
this.con.getWorkflow().showLineResizeHandles(this.con);
}
};
draw2d.CommandReconnect.prototype.redo=function(){
this.con.setSource(this.newSourcePort);
this.con.setTarget(this.newTargetPort);
this.con.setRouter(this.oldRouter);
if(this.con.getWorkflow().getCurrentSelection()==this.con){
this.con.getWorkflow().showLineResizeHandles(this.con);
}
};
draw2d.CommandMoveLine=function(line,_3798,_3799,endX,endY){
draw2d.Command.call(this,"move line");
this.line=line;
this.startX1=_3798;
this.startY1=_3799;
this.endX1=endX;
this.endY1=endY;
};
draw2d.CommandMoveLine.prototype=new draw2d.Command();
draw2d.CommandMoveLine.prototype.type="draw2d.CommandMoveLine";
draw2d.CommandMoveLine.prototype.canExecute=function(){
return this.startX1!=this.startX2||this.startY1!=this.startY2||this.endX1!=this.endX2||this.endY1!=this.endY2;
};
draw2d.CommandMoveLine.prototype.execute=function(){
this.startX2=this.line.getStartX();
this.startY2=this.line.getStartY();
this.endX2=this.line.getEndX();
this.endY2=this.line.getEndY();
this.redo();
};
draw2d.CommandMoveLine.prototype.undo=function(){
this.line.setStartPoint(this.startX1,this.startY1);
this.line.setEndPoint(this.endX1,this.endY1);
if(this.line.workflow.getCurrentSelection()==this.line){
this.line.workflow.showLineResizeHandles(this.line);
}
};
draw2d.CommandMoveLine.prototype.redo=function(){
this.line.setStartPoint(this.startX2,this.startY2);
this.line.setEndPoint(this.endX2,this.endY2);
if(this.line.workflow.getCurrentSelection()==this.line){
this.line.workflow.showLineResizeHandles(this.line);
}
};
draw2d.CommandMovePort=function(port){
draw2d.Command.call(this,"move port");
this.port=port;
};
draw2d.CommandMovePort.prototype=new draw2d.Command();
draw2d.CommandMovePort.prototype.type="draw2d.CommandMovePort";
draw2d.CommandMovePort.prototype.execute=function(){
this.port.setAlpha(1);
this.port.setPosition(this.port.originX,this.port.originY);
this.port.parentNode.workflow.hideConnectionLine();
};
draw2d.CommandMovePort.prototype.undo=function(){
};
draw2d.CommandMovePort.prototype.redo=function(){
};
draw2d.CommandMovePort.prototype.setPosition=function(x,y){
};
draw2d.Menu=function(){
this.menuItems=new draw2d.ArrayList();
draw2d.Figure.call(this);
this.setSelectable(false);
this.setDeleteable(false);
this.setCanDrag(false);
this.setResizeable(false);
this.setSelectable(false);
this.setZOrder(10000);
this.dirty=false;
};
draw2d.Menu.prototype=new draw2d.Figure();
draw2d.Menu.prototype.type="draw2d.Menu";
draw2d.Menu.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.margin="0px";
item.style.padding="0px";
item.style.zIndex=""+draw2d.Figure.ZOrderBaseIndex;
item.style.border="1px solid gray";
item.style.background="lavender";
item.style.cursor="pointer";
item.style.width="auto";
item.style.height="auto";
item.style.boxShadow="5px 5px 5px #ccc";
item.style.borderRadius="2px";
item.className="Menu";
return item;
};
draw2d.Menu.prototype.setWorkflow=function(_1ea3){
this.workflow=_1ea3;
};
draw2d.Menu.prototype.setDimension=function(w,h){
};
draw2d.Menu.prototype.appendMenuItem=function(item){
this.menuItems.add(item);
item.parentMenu=this;
this.dirty=true;
};
draw2d.Menu.prototype.getHTMLElement=function(){
var html=draw2d.Figure.prototype.getHTMLElement.call(this);
if(this.dirty){
this.createList();
}
return html;
};
draw2d.Menu.prototype.createList=function(){
this.dirty=false;
this.html.innerHTML="";
var oThis=this;
for(var i=0;i<this.menuItems.getSize();i++){
var item=this.menuItems.get(i);
var li=document.createElement("a");
li.innerHTML=item.getLabel();
li.style.display="block";
li.style.fontFamily="Verdana, Arial, Helvetica, sans-serif";
li.style.fontSize="9pt";
li.style.color="dimgray";
li.style.borderBottom="1px solid silver";
li.style.paddingLeft="5px";
li.style.paddingRight="5px";
li.style.whiteSpace="nowrap";
li.style.cursor="pointer";
li.className="MenuItem";
this.html.appendChild(li);
li.menuItem=item;
if(li.addEventListener){
li.addEventListener("click",function(event){
var _1ead=arguments[0]||window.event;
_1ead.cancelBubble=true;
_1ead.returnValue=false;
var diffX=_1ead.clientX;
var diffY=_1ead.clientY;
var _1eb0=document.body.parentNode.scrollLeft;
var _1eb1=document.body.parentNode.scrollTop;
this.menuItem.execute(diffX+_1eb0,diffY+_1eb1);
},false);
li.addEventListener("mouseup",function(event){
event.cancelBubble=true;
event.returnValue=false;
},false);
li.addEventListener("mousedown",function(event){
event.cancelBubble=true;
event.returnValue=false;
},false);
li.addEventListener("mouseover",function(event){
this.style.backgroundColor="silver";
},false);
li.addEventListener("mouseout",function(event){
this.style.backgroundColor="transparent";
},false);
}else{
if(li.attachEvent){
li.attachEvent("onclick",function(event){
var _1eb7=arguments[0]||window.event;
_1eb7.cancelBubble=true;
_1eb7.returnValue=false;
var diffX=_1eb7.clientX;
var diffY=_1eb7.clientY;
var _1eba=document.body.parentNode.scrollLeft;
var _1ebb=document.body.parentNode.scrollTop;
event.srcElement.menuItem.execute(diffX+_1eba,diffY+_1ebb);
});
li.attachEvent("onmousedown",function(event){
event.cancelBubble=true;
event.returnValue=false;
});
li.attachEvent("onmouseup",function(event){
event.cancelBubble=true;
event.returnValue=false;
});
li.attachEvent("onmouseover",function(event){
event.srcElement.style.backgroundColor="silver";
});
li.attachEvent("onmouseout",function(event){
event.srcElement.style.backgroundColor="transparent";
});
}
}
}
};
draw2d.MenuItem=function(label,_3591,_3592){
this.label=label;
this.iconUrl=_3591;
this.parentMenu=null;
this.action=_3592;
};
draw2d.MenuItem.prototype.type="draw2d.MenuItem";
draw2d.MenuItem.prototype.isEnabled=function(){
return true;
};
draw2d.MenuItem.prototype.getLabel=function(){
return this.label;
};
draw2d.MenuItem.prototype.execute=function(x,y){
this.parentMenu.workflow.showMenu(null);
this.action(x,y);
};
draw2d.Locator=function(){
};
draw2d.Locator.prototype.type="draw2d.Locator";
draw2d.Locator.prototype.relocate=function(_21c9){
};
draw2d.ConnectionLocator=function(_38a9){
draw2d.Locator.call(this);
this.connection=_38a9;
};
draw2d.ConnectionLocator.prototype=new draw2d.Locator;
draw2d.ConnectionLocator.prototype.type="draw2d.ConnectionLocator";
draw2d.ConnectionLocator.prototype.getConnection=function(){
return this.connection;
};
draw2d.ManhattanMidpointLocator=function(_2718){
draw2d.ConnectionLocator.call(this,_2718);
};
draw2d.ManhattanMidpointLocator.prototype=new draw2d.ConnectionLocator;
draw2d.ManhattanMidpointLocator.prototype.type="draw2d.ManhattanMidpointLocator";
draw2d.ManhattanMidpointLocator.prototype.relocate=function(_2719){
var conn=this.getConnection();
var p=new draw2d.Point();
var _271c=conn.getPoints();
var index=Math.floor((_271c.getSize()-2)/2);
if(_271c.getSize()<=index+1){
return;
}
var p1=_271c.get(index);
var p2=_271c.get(index+1);
p.x=(p2.x-p1.x)/2+p1.x+5;
p.y=(p2.y-p1.y)/2+p1.y+5;
_2719.setPosition(p.x,p.y);
};
draw2d.BezierMidpointLocator=function(_1d40){
draw2d.ConnectionLocator.call(this,_1d40);
};
draw2d.BezierMidpointLocator.prototype=new draw2d.ConnectionLocator;
draw2d.BezierMidpointLocator.prototype.type="draw2d.BezierMidpointLocator";
draw2d.BezierMidpointLocator.prototype.relocate=function(_1d41){
var conn=this.getConnection();
var p=new draw2d.Point();
var _1d44=conn.getPoints();
var index=Math.floor((_1d44.getSize()-2)/2);
if(_1d44.getSize()<=index+1){
return;
}
var p1=_1d44.get(index);
var p2=_1d44.get(index+1);
p.x=(p2.x-p1.x)/2+p1.x+5;
p.y=(p2.y-p1.y)/2+p1.y+5;
_1d41.setPosition(p.x,p.y);
};
draw2d.EditPartFactory=function(){
};
draw2d.EditPartFactory.prototype.type="draw2d.EditPartFactory";
draw2d.EditPartFactory.prototype.createEditPart=function(model){
};
draw2d.AbstractObjectModel=function(){
this.listeners=new draw2d.ArrayList();
this.id=draw2d.UUID.create();
};
draw2d.AbstractObjectModel.EVENT_ELEMENT_ADDED="element added";
draw2d.AbstractObjectModel.EVENT_ELEMENT_REMOVED="element removed";
draw2d.AbstractObjectModel.EVENT_CONNECTION_ADDED="connection addedx";
draw2d.AbstractObjectModel.EVENT_CONNECTION_REMOVED="connection removed";
draw2d.AbstractObjectModel.prototype.type="draw2d.AbstractObjectModel";
draw2d.AbstractObjectModel.prototype.getModelChildren=function(){
return new draw2d.ArrayList();
};
draw2d.AbstractObjectModel.prototype.getModelParent=function(){
return this.modelParent;
};
draw2d.AbstractObjectModel.prototype.setModelParent=function(_27eb){
this.modelParent=_27eb;
};
draw2d.AbstractObjectModel.prototype.getId=function(){
return this.id;
};
draw2d.AbstractObjectModel.prototype.firePropertyChange=function(_27ec,_27ed,_27ee){
var count=this.listeners.getSize();
if(count===0){
return;
}
var event=new draw2d.PropertyChangeEvent(this,_27ec,_27ed,_27ee);
for(var i=0;i<count;i++){
try{
this.listeners.get(i).propertyChange(event);
}
catch(e){
alert("Method: draw2d.AbstractObjectModel.prototype.firePropertyChange\n"+e+"\nProperty: "+_27ec+"\nListener Class:"+this.listeners.get(i).type);
}
}
};
draw2d.AbstractObjectModel.prototype.addPropertyChangeListener=function(_27f2){
if(_27f2!==null){
this.listeners.add(_27f2);
}
};
draw2d.AbstractObjectModel.prototype.removePropertyChangeListener=function(_27f3){
if(_27f3!==null){
this.listeners.remove(_27f3);
}
};
draw2d.AbstractObjectModel.prototype.getPersistentAttributes=function(){
return {id:this.id};
};
draw2d.AbstractConnectionModel=function(){
draw2d.AbstractObjectModel.call(this);
};
draw2d.AbstractConnectionModel.prototype=new draw2d.AbstractObjectModel();
draw2d.AbstractConnectionModel.prototype.type="draw2d.AbstractConnectionModel";
draw2d.AbstractConnectionModel.prototype.getSourceModel=function(){
throw "you must override the method [AbstractConnectionModel.prototype.getSourceModel]";
};
draw2d.AbstractConnectionModel.prototype.getTargetModel=function(){
throw "you must override the method [AbstractConnectionModel.prototype.getTargetModel]";
};
draw2d.AbstractConnectionModel.prototype.getSourcePortName=function(){
throw "you must override the method [AbstractConnectionModel.prototype.getSourcePortName]";
};
draw2d.AbstractConnectionModel.prototype.getTargetPortName=function(){
throw "you must override the method [AbstractConnectionModel.prototype.getTargetPortName]";
};
draw2d.AbstractConnectionModel.prototype.getSourcePortModel=function(){
throw "you must override the method [AbstractConnectionModel.prototype.getSourcePortModel]";
};
draw2d.AbstractConnectionModel.prototype.getTargetPortModel=function(){
throw "you must override the method [AbstractConnectionModel.prototype.getTargetPortModel]";
};
draw2d.PropertyChangeEvent=function(model,_2d93,_2d94,_2d95){
this.model=model;
this.property=_2d93;
this.oldValue=_2d94;
this.newValue=_2d95;
};
draw2d.PropertyChangeEvent.prototype.type="draw2d.PropertyChangeEvent";
draw2d.GraphicalViewer=function(id){
try{
draw2d.Workflow.call(this,id);
this.factory=null;
this.model=null;
this.initDone=false;
}
catch(e){
pushErrorStack(e,"draw2d.GraphicalViewer=function(/*:String*/ id)");
}
};
draw2d.GraphicalViewer.prototype=new draw2d.Workflow();
draw2d.GraphicalViewer.prototype.type="draw2d.GraphicalViewer";
draw2d.GraphicalViewer.prototype.setEditPartFactory=function(_2605){
this.factory=_2605;
this.checkInit();
};
draw2d.GraphicalViewer.prototype.setModel=function(model){
try{
if(model instanceof draw2d.AbstractObjectModel){
this.model=model;
this.checkInit();
this.model.addPropertyChangeListener(this);
}else{
alert("Invalid model class type:"+model.type);
}
}
catch(e){
pushErrorStack(e,"draw2d.GraphicalViewer.prototype.setModel=function(/*:draw2d.AbstractObjectModel*/ model )");
}
};
draw2d.GraphicalViewer.prototype.propertyChange=function(event){
switch(event.property){
case draw2d.AbstractObjectModel.EVENT_ELEMENT_REMOVED:
var _2608=this.getFigure(event.oldValue.getId());
this.removeFigure(_2608);
break;
case draw2d.AbstractObjectModel.EVENT_ELEMENT_ADDED:
var _2608=this.factory.createEditPart(event.newValue);
_2608.setId(event.newValue.getId());
this.addFigure(_2608);
this.setCurrentSelection(_2608);
break;
}
};
draw2d.GraphicalViewer.prototype.checkInit=function(){
if(this.factory!==null&&this.model!==null&&this.initDone==false){
try{
var _2609=this.model.getModelChildren();
var count=_2609.getSize();
for(var i=0;i<count;i++){
var child=_2609.get(i);
var _260d=this.factory.createEditPart(child);
_260d.setId(child.getId());
this.addFigure(_260d);
}
}
catch(e){
pushErrorStack(e,"draw2d.GraphicalViewer.prototype.checkInit=function()[addFigures]");
}
try{
var _260e=this.getDocument().getFigures();
var count=_260e.getSize();
for(var i=0;i<count;i++){
var _260d=_260e.get(i);
if(_260d instanceof draw2d.Node){
this.refreshConnections(_260d);
}
}
}
catch(e){
pushErrorStack(e,"draw2d.GraphicalViewer.prototype.checkInit=function()[refreshConnections]");
}
}
};
draw2d.GraphicalViewer.prototype.refreshConnections=function(node){
try{
var _2610=new draw2d.ArrayList();
var _2611=node.getModelSourceConnections();
var count=_2611.getSize();
for(var i=0;i<count;i++){
var _2614=_2611.get(i);
_2610.add(_2614.getId());
var _2615=this.getLine(_2614.getId());
if(_2615===null){
_2615=this.factory.createEditPart(_2614);
var _2616=_2614.getSourceModel();
var _2617=_2614.getTargetModel();
var _2618=this.getFigure(_2616.getId());
var _2619=this.getFigure(_2617.getId());
var _261a=_2618.getOutputPort(_2614.getSourcePortName());
var _261b=_2619.getInputPort(_2614.getTargetPortName());
_2615.setTarget(_261b);
_2615.setSource(_261a);
_2615.setId(_2614.getId());
this.addFigure(_2615);
this.setCurrentSelection(_2615);
}
}
var ports=node.getOutputPorts();
count=ports.getSize();
for(var i=0;i<count;i++){
var _261d=ports.get(i).getConnections();
var _261e=_261d.getSize();
for(var ii=0;ii<_261e;ii++){
var _2620=_261d.get(ii);
if(!_2610.contains(_2620.getId())){
this.removeFigure(_2620);
_2610.add(_2620.getId());
}
}
}
}
catch(e){
pushErrorStack(e,"draw2d.GraphicalViewer.prototype.refreshConnections=function(/*:draw2d.Node*/ node )");
}
};
draw2d.GraphicalEditor=function(id){
try{
this.view=new draw2d.GraphicalViewer(id);
this.initializeGraphicalViewer();
}
catch(e){
pushErrorStack(e,"draw2d.GraphicalEditor=function(/*:String*/ id)");
}
};
draw2d.GraphicalEditor.prototype.type="draw2d.GraphicalEditor";
draw2d.GraphicalEditor.prototype.initializeGraphicalViewer=function(){
};
draw2d.GraphicalEditor.prototype.getGraphicalViewer=function(){
return this.view;
};
draw2d.GraphicalEditor.prototype.executeCommand=function(_3670){
this.view.getCommandStack().execute(_3670);
};
var whitespace="\n\r\t ";
XMLP=function(_35ca){
_35ca=SAXStrings.replace(_35ca,null,null,"\r\n","\n");
_35ca=SAXStrings.replace(_35ca,null,null,"\r","\n");
this.m_xml=_35ca;
this.m_iP=0;
this.m_iState=XMLP._STATE_PROLOG;
this.m_stack=new Stack();
this._clearAttributes();
};
XMLP._NONE=0;
XMLP._ELM_B=1;
XMLP._ELM_E=2;
XMLP._ELM_EMP=3;
XMLP._ATT=4;
XMLP._TEXT=5;
XMLP._ENTITY=6;
XMLP._PI=7;
XMLP._CDATA=8;
XMLP._COMMENT=9;
XMLP._DTD=10;
XMLP._ERROR=11;
XMLP._CONT_XML=0;
XMLP._CONT_ALT=1;
XMLP._ATT_NAME=0;
XMLP._ATT_VAL=1;
XMLP._STATE_PROLOG=1;
XMLP._STATE_DOCUMENT=2;
XMLP._STATE_MISC=3;
XMLP._errs=[];
XMLP._errs[XMLP.ERR_CLOSE_PI=0]="PI: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_DTD=1]="DTD: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_COMMENT=2]="Comment: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_CDATA=3]="CDATA: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_ELM=4]="Element: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_ENTITY=5]="Entity: missing closing sequence";
XMLP._errs[XMLP.ERR_PI_TARGET=6]="PI: target is required";
XMLP._errs[XMLP.ERR_ELM_EMPTY=7]="Element: cannot be both empty and closing";
XMLP._errs[XMLP.ERR_ELM_NAME=8]="Element: name must immediatly follow \"<\"";
XMLP._errs[XMLP.ERR_ELM_LT_NAME=9]="Element: \"<\" not allowed in element names";
XMLP._errs[XMLP.ERR_ATT_VALUES=10]="Attribute: values are required and must be in quotes";
XMLP._errs[XMLP.ERR_ATT_LT_NAME=11]="Element: \"<\" not allowed in attribute names";
XMLP._errs[XMLP.ERR_ATT_LT_VALUE=12]="Attribute: \"<\" not allowed in attribute values";
XMLP._errs[XMLP.ERR_ATT_DUP=13]="Attribute: duplicate attributes not allowed";
XMLP._errs[XMLP.ERR_ENTITY_UNKNOWN=14]="Entity: unknown entity";
XMLP._errs[XMLP.ERR_INFINITELOOP=15]="Infininte loop";
XMLP._errs[XMLP.ERR_DOC_STRUCTURE=16]="Document: only comments, processing instructions, or whitespace allowed outside of document element";
XMLP._errs[XMLP.ERR_ELM_NESTING=17]="Element: must be nested correctly";
XMLP.prototype._addAttribute=function(name,value){
this.m_atts[this.m_atts.length]=new Array(name,value);
};
XMLP.prototype._checkStructure=function(_35cd){
if(XMLP._STATE_PROLOG==this.m_iState){
if((XMLP._TEXT==_35cd)||(XMLP._ENTITY==_35cd)){
if(SAXStrings.indexOfNonWhitespace(this.getContent(),this.getContentBegin(),this.getContentEnd())!=-1){
return this._setErr(XMLP.ERR_DOC_STRUCTURE);
}
}
if((XMLP._ELM_B==_35cd)||(XMLP._ELM_EMP==_35cd)){
this.m_iState=XMLP._STATE_DOCUMENT;
}
}
if(XMLP._STATE_DOCUMENT==this.m_iState){
if((XMLP._ELM_B==_35cd)||(XMLP._ELM_EMP==_35cd)){
this.m_stack.push(this.getName());
}
if((XMLP._ELM_E==_35cd)||(XMLP._ELM_EMP==_35cd)){
var _35ce=this.m_stack.pop();
if((_35ce===null)||(_35ce!=this.getName())){
return this._setErr(XMLP.ERR_ELM_NESTING);
}
}
if(this.m_stack.count()===0){
this.m_iState=XMLP._STATE_MISC;
return _35cd;
}
}
if(XMLP._STATE_MISC==this.m_iState){
if((XMLP._ELM_B==_35cd)||(XMLP._ELM_E==_35cd)||(XMLP._ELM_EMP==_35cd)||(XMLP.EVT_DTD==_35cd)){
return this._setErr(XMLP.ERR_DOC_STRUCTURE);
}
if((XMLP._TEXT==_35cd)||(XMLP._ENTITY==_35cd)){
if(SAXStrings.indexOfNonWhitespace(this.getContent(),this.getContentBegin(),this.getContentEnd())!=-1){
return this._setErr(XMLP.ERR_DOC_STRUCTURE);
}
}
}
return _35cd;
};
XMLP.prototype._clearAttributes=function(){
this.m_atts=[];
};
XMLP.prototype._findAttributeIndex=function(name){
for(var i=0;i<this.m_atts.length;i++){
if(this.m_atts[i][XMLP._ATT_NAME]==name){
return i;
}
}
return -1;
};
XMLP.prototype.getAttributeCount=function(){
return this.m_atts?this.m_atts.length:0;
};
XMLP.prototype.getAttributeName=function(index){
return ((index<0)||(index>=this.m_atts.length))?null:this.m_atts[index][XMLP._ATT_NAME];
};
XMLP.prototype.getAttributeValue=function(index){
return ((index<0)||(index>=this.m_atts.length))?null:__unescapeString(this.m_atts[index][XMLP._ATT_VAL]);
};
XMLP.prototype.getAttributeValueByName=function(name){
return this.getAttributeValue(this._findAttributeIndex(name));
};
XMLP.prototype.getColumnNumber=function(){
return SAXStrings.getColumnNumber(this.m_xml,this.m_iP);
};
XMLP.prototype.getContent=function(){
return (this.m_cSrc==XMLP._CONT_XML)?this.m_xml:this.m_cAlt;
};
XMLP.prototype.getContentBegin=function(){
return this.m_cB;
};
XMLP.prototype.getContentEnd=function(){
return this.m_cE;
};
XMLP.prototype.getLineNumber=function(){
return SAXStrings.getLineNumber(this.m_xml,this.m_iP);
};
XMLP.prototype.getName=function(){
return this.m_name;
};
XMLP.prototype.next=function(){
return this._checkStructure(this._parse());
};
XMLP.prototype._parse=function(){
if(this.m_iP==this.m_xml.length){
return XMLP._NONE;
}
if(this.m_iP==this.m_xml.indexOf("<?",this.m_iP)){
return this._parsePI(this.m_iP+2);
}else{
if(this.m_iP==this.m_xml.indexOf("<!DOCTYPE",this.m_iP)){
return this._parseDTD(this.m_iP+9);
}else{
if(this.m_iP==this.m_xml.indexOf("<!--",this.m_iP)){
return this._parseComment(this.m_iP+4);
}else{
if(this.m_iP==this.m_xml.indexOf("<![CDATA[",this.m_iP)){
return this._parseCDATA(this.m_iP+9);
}else{
if(this.m_iP==this.m_xml.indexOf("<",this.m_iP)){
return this._parseElement(this.m_iP+1);
}else{
if(this.m_iP==this.m_xml.indexOf("&",this.m_iP)){
return this._parseEntity(this.m_iP+1);
}else{
return this._parseText(this.m_iP);
}
}
}
}
}
}
};
XMLP.prototype._parseAttribute=function(iB,iE){
var iNB,iNE,iEq,iVB,iVE;
var _35d7,strN,strV;
this.m_cAlt="";
iNB=SAXStrings.indexOfNonWhitespace(this.m_xml,iB,iE);
if((iNB==-1)||(iNB>=iE)){
return iNB;
}
iEq=this.m_xml.indexOf("=",iNB);
if((iEq==-1)||(iEq>iE)){
return this._setErr(XMLP.ERR_ATT_VALUES);
}
iNE=SAXStrings.lastIndexOfNonWhitespace(this.m_xml,iNB,iEq);
iVB=SAXStrings.indexOfNonWhitespace(this.m_xml,iEq+1,iE);
if((iVB==-1)||(iVB>iE)){
return this._setErr(XMLP.ERR_ATT_VALUES);
}
_35d7=this.m_xml.charAt(iVB);
if(SAXStrings.QUOTES.indexOf(_35d7)==-1){
return this._setErr(XMLP.ERR_ATT_VALUES);
}
iVE=this.m_xml.indexOf(_35d7,iVB+1);
if((iVE==-1)||(iVE>iE)){
return this._setErr(XMLP.ERR_ATT_VALUES);
}
strN=this.m_xml.substring(iNB,iNE+1);
strV=this.m_xml.substring(iVB+1,iVE);
if(strN.indexOf("<")!=-1){
return this._setErr(XMLP.ERR_ATT_LT_NAME);
}
if(strV.indexOf("<")!=-1){
return this._setErr(XMLP.ERR_ATT_LT_VALUE);
}
strV=SAXStrings.replace(strV,null,null,"\n"," ");
strV=SAXStrings.replace(strV,null,null,"\t"," ");
iRet=this._replaceEntities(strV);
if(iRet==XMLP._ERROR){
return iRet;
}
strV=this.m_cAlt;
if(this._findAttributeIndex(strN)==-1){
this._addAttribute(strN,strV);
}else{
return this._setErr(XMLP.ERR_ATT_DUP);
}
this.m_iP=iVE+2;
return XMLP._ATT;
};
XMLP.prototype._parseCDATA=function(iB){
var iE=this.m_xml.indexOf("]]>",iB);
if(iE==-1){
return this._setErr(XMLP.ERR_CLOSE_CDATA);
}
this._setContent(XMLP._CONT_XML,iB,iE);
this.m_iP=iE+3;
return XMLP._CDATA;
};
XMLP.prototype._parseComment=function(iB){
var iE=this.m_xml.indexOf("-"+"->",iB);
if(iE==-1){
return this._setErr(XMLP.ERR_CLOSE_COMMENT);
}
this._setContent(XMLP._CONT_XML,iB,iE);
this.m_iP=iE+3;
return XMLP._COMMENT;
};
XMLP.prototype._parseDTD=function(iB){
var iE,strClose,iInt,iLast;
iE=this.m_xml.indexOf(">",iB);
if(iE==-1){
return this._setErr(XMLP.ERR_CLOSE_DTD);
}
iInt=this.m_xml.indexOf("[",iB);
strClose=((iInt!=-1)&&(iInt<iE))?"]>":">";
while(true){
if(iE==iLast){
return this._setErr(XMLP.ERR_INFINITELOOP);
}
iLast=iE;
iE=this.m_xml.indexOf(strClose,iB);
if(iE==-1){
return this._setErr(XMLP.ERR_CLOSE_DTD);
}
if(this.m_xml.substring(iE-1,iE+2)!="]]>"){
break;
}
}
this.m_iP=iE+strClose.length;
return XMLP._DTD;
};
XMLP.prototype._parseElement=function(iB){
var iE,iDE,iNE,iRet;
var iType,strN,iLast;
iDE=iE=this.m_xml.indexOf(">",iB);
if(iE==-1){
return this._setErr(XMLP.ERR_CLOSE_ELM);
}
if(this.m_xml.charAt(iB)=="/"){
iType=XMLP._ELM_E;
iB++;
}else{
iType=XMLP._ELM_B;
}
if(this.m_xml.charAt(iE-1)=="/"){
if(iType==XMLP._ELM_E){
return this._setErr(XMLP.ERR_ELM_EMPTY);
}
iType=XMLP._ELM_EMP;
iDE--;
}
iDE=SAXStrings.lastIndexOfNonWhitespace(this.m_xml,iB,iDE);
if(iE-iB!=1){
if(SAXStrings.indexOfNonWhitespace(this.m_xml,iB,iDE)!=iB){
return this._setErr(XMLP.ERR_ELM_NAME);
}
}
this._clearAttributes();
iNE=SAXStrings.indexOfWhitespace(this.m_xml,iB,iDE);
if(iNE==-1){
iNE=iDE+1;
}else{
this.m_iP=iNE;
while(this.m_iP<iDE){
if(this.m_iP==iLast){
return this._setErr(XMLP.ERR_INFINITELOOP);
}
iLast=this.m_iP;
iRet=this._parseAttribute(this.m_iP,iDE);
if(iRet==XMLP._ERROR){
return iRet;
}
}
}
strN=this.m_xml.substring(iB,iNE);
if(strN.indexOf("<")!=-1){
return this._setErr(XMLP.ERR_ELM_LT_NAME);
}
this.m_name=strN;
this.m_iP=iE+1;
return iType;
};
XMLP.prototype._parseEntity=function(iB){
var iE=this.m_xml.indexOf(";",iB);
if(iE==-1){
return this._setErr(XMLP.ERR_CLOSE_ENTITY);
}
this.m_iP=iE+1;
return this._replaceEntity(this.m_xml,iB,iE);
};
XMLP.prototype._parsePI=function(iB){
var iE,iTB,iTE,iCB,iCE;
iE=this.m_xml.indexOf("?>",iB);
if(iE==-1){
return this._setErr(XMLP.ERR_CLOSE_PI);
}
iTB=SAXStrings.indexOfNonWhitespace(this.m_xml,iB,iE);
if(iTB==-1){
return this._setErr(XMLP.ERR_PI_TARGET);
}
iTE=SAXStrings.indexOfWhitespace(this.m_xml,iTB,iE);
if(iTE==-1){
iTE=iE;
}
iCB=SAXStrings.indexOfNonWhitespace(this.m_xml,iTE,iE);
if(iCB==-1){
iCB=iE;
}
iCE=SAXStrings.lastIndexOfNonWhitespace(this.m_xml,iCB,iE);
if(iCE==-1){
iCE=iE-1;
}
this.m_name=this.m_xml.substring(iTB,iTE);
this._setContent(XMLP._CONT_XML,iCB,iCE+1);
this.m_iP=iE+2;
return XMLP._PI;
};
XMLP.prototype._parseText=function(iB){
var iE,iEE;
iE=this.m_xml.indexOf("<",iB);
if(iE==-1){
iE=this.m_xml.length;
}
iEE=this.m_xml.indexOf("&",iB);
if((iEE!=-1)&&(iEE<=iE)){
iE=iEE;
}
this._setContent(XMLP._CONT_XML,iB,iE);
this.m_iP=iE;
return XMLP._TEXT;
};
XMLP.prototype._replaceEntities=function(strD,iB,iE){
if(SAXStrings.isEmpty(strD)){
return "";
}
iB=iB||0;
iE=iE||strD.length;
var iEB,iEE,strRet="";
iEB=strD.indexOf("&",iB);
iEE=iB;
while((iEB>0)&&(iEB<iE)){
strRet+=strD.substring(iEE,iEB);
iEE=strD.indexOf(";",iEB)+1;
if((iEE===0)||(iEE>iE)){
return this._setErr(XMLP.ERR_CLOSE_ENTITY);
}
iRet=this._replaceEntity(strD,iEB+1,iEE-1);
if(iRet==XMLP._ERROR){
return iRet;
}
strRet+=this.m_cAlt;
iEB=strD.indexOf("&",iEE);
}
if(iEE!=iE){
strRet+=strD.substring(iEE,iE);
}
this._setContent(XMLP._CONT_ALT,strRet);
return XMLP._ENTITY;
};
XMLP.prototype._replaceEntity=function(strD,iB,iE){
if(SAXStrings.isEmpty(strD)){
return -1;
}
iB=iB||0;
iE=iE||strD.length;
switch(strD.substring(iB,iE)){
case "amp":
strEnt="&";
break;
case "lt":
strEnt="<";
break;
case "gt":
strEnt=">";
break;
case "apos":
strEnt="'";
break;
case "quot":
strEnt="\"";
break;
default:
if(strD.charAt(iB)=="#"){
strEnt=String.fromCharCode(parseInt(strD.substring(iB+1,iE)));
}else{
return this._setErr(XMLP.ERR_ENTITY_UNKNOWN);
}
break;
}
this._setContent(XMLP._CONT_ALT,strEnt);
return XMLP._ENTITY;
};
XMLP.prototype._setContent=function(iSrc){
var args=arguments;
if(XMLP._CONT_XML==iSrc){
this.m_cAlt=null;
this.m_cB=args[1];
this.m_cE=args[2];
}else{
this.m_cAlt=args[1];
this.m_cB=0;
this.m_cE=args[1].length;
}
this.m_cSrc=iSrc;
};
XMLP.prototype._setErr=function(iErr){
var _35f1=XMLP._errs[iErr];
this.m_cAlt=_35f1;
this.m_cB=0;
this.m_cE=_35f1.length;
this.m_cSrc=XMLP._CONT_ALT;
return XMLP._ERROR;
};
SAXDriver=function(){
this.m_hndDoc=null;
this.m_hndErr=null;
this.m_hndLex=null;
};
SAXDriver.DOC_B=1;
SAXDriver.DOC_E=2;
SAXDriver.ELM_B=3;
SAXDriver.ELM_E=4;
SAXDriver.CHARS=5;
SAXDriver.PI=6;
SAXDriver.CD_B=7;
SAXDriver.CD_E=8;
SAXDriver.CMNT=9;
SAXDriver.DTD_B=10;
SAXDriver.DTD_E=11;
SAXDriver.prototype.parse=function(strD){
var _35f3=new XMLP(strD);
if(this.m_hndDoc&&this.m_hndDoc.setDocumentLocator){
this.m_hndDoc.setDocumentLocator(this);
}
this.m_parser=_35f3;
this.m_bErr=false;
if(!this.m_bErr){
this._fireEvent(SAXDriver.DOC_B);
}
this._parseLoop();
if(!this.m_bErr){
this._fireEvent(SAXDriver.DOC_E);
}
this.m_xml=null;
this.m_iP=0;
};
SAXDriver.prototype.setDocumentHandler=function(hnd){
this.m_hndDoc=hnd;
};
SAXDriver.prototype.setErrorHandler=function(hnd){
this.m_hndErr=hnd;
};
SAXDriver.prototype.setLexicalHandler=function(hnd){
this.m_hndLex=hnd;
};
SAXDriver.prototype.getColumnNumber=function(){
return this.m_parser.getColumnNumber();
};
SAXDriver.prototype.getLineNumber=function(){
return this.m_parser.getLineNumber();
};
SAXDriver.prototype.getMessage=function(){
return this.m_strErrMsg;
};
SAXDriver.prototype.getPublicId=function(){
return null;
};
SAXDriver.prototype.getSystemId=function(){
return null;
};
SAXDriver.prototype.getLength=function(){
return this.m_parser.getAttributeCount();
};
SAXDriver.prototype.getName=function(index){
return this.m_parser.getAttributeName(index);
};
SAXDriver.prototype.getValue=function(index){
return this.m_parser.getAttributeValue(index);
};
SAXDriver.prototype.getValueByName=function(name){
return this.m_parser.getAttributeValueByName(name);
};
SAXDriver.prototype._fireError=function(_35fa){
this.m_strErrMsg=_35fa;
this.m_bErr=true;
if(this.m_hndErr&&this.m_hndErr.fatalError){
this.m_hndErr.fatalError(this);
}
};
SAXDriver.prototype._fireEvent=function(iEvt){
var hnd,func,args=arguments,iLen=args.length-1;
if(this.m_bErr){
return;
}
if(SAXDriver.DOC_B==iEvt){
func="startDocument";
hnd=this.m_hndDoc;
}else{
if(SAXDriver.DOC_E==iEvt){
func="endDocument";
hnd=this.m_hndDoc;
}else{
if(SAXDriver.ELM_B==iEvt){
func="startElement";
hnd=this.m_hndDoc;
}else{
if(SAXDriver.ELM_E==iEvt){
func="endElement";
hnd=this.m_hndDoc;
}else{
if(SAXDriver.CHARS==iEvt){
func="characters";
hnd=this.m_hndDoc;
}else{
if(SAXDriver.PI==iEvt){
func="processingInstruction";
hnd=this.m_hndDoc;
}else{
if(SAXDriver.CD_B==iEvt){
func="startCDATA";
hnd=this.m_hndLex;
}else{
if(SAXDriver.CD_E==iEvt){
func="endCDATA";
hnd=this.m_hndLex;
}else{
if(SAXDriver.CMNT==iEvt){
func="comment";
hnd=this.m_hndLex;
}
}
}
}
}
}
}
}
}
if(hnd&&hnd[func]){
if(0==iLen){
hnd[func]();
}else{
if(1==iLen){
hnd[func](args[1]);
}else{
if(2==iLen){
hnd[func](args[1],args[2]);
}else{
if(3==iLen){
hnd[func](args[1],args[2],args[3]);
}
}
}
}
}
};
SAXDriver.prototype._parseLoop=function(_35fd){
var _35fe,_35fd;
_35fd=this.m_parser;
while(!this.m_bErr){
_35fe=_35fd.next();
if(_35fe==XMLP._ELM_B){
this._fireEvent(SAXDriver.ELM_B,_35fd.getName(),this);
}else{
if(_35fe==XMLP._ELM_E){
this._fireEvent(SAXDriver.ELM_E,_35fd.getName());
}else{
if(_35fe==XMLP._ELM_EMP){
this._fireEvent(SAXDriver.ELM_B,_35fd.getName(),this);
this._fireEvent(SAXDriver.ELM_E,_35fd.getName());
}else{
if(_35fe==XMLP._TEXT){
this._fireEvent(SAXDriver.CHARS,_35fd.getContent(),_35fd.getContentBegin(),_35fd.getContentEnd()-_35fd.getContentBegin());
}else{
if(_35fe==XMLP._ENTITY){
this._fireEvent(SAXDriver.CHARS,_35fd.getContent(),_35fd.getContentBegin(),_35fd.getContentEnd()-_35fd.getContentBegin());
}else{
if(_35fe==XMLP._PI){
this._fireEvent(SAXDriver.PI,_35fd.getName(),_35fd.getContent().substring(_35fd.getContentBegin(),_35fd.getContentEnd()));
}else{
if(_35fe==XMLP._CDATA){
this._fireEvent(SAXDriver.CD_B);
this._fireEvent(SAXDriver.CHARS,_35fd.getContent(),_35fd.getContentBegin(),_35fd.getContentEnd()-_35fd.getContentBegin());
this._fireEvent(SAXDriver.CD_E);
}else{
if(_35fe==XMLP._COMMENT){
this._fireEvent(SAXDriver.CMNT,_35fd.getContent(),_35fd.getContentBegin(),_35fd.getContentEnd()-_35fd.getContentBegin());
}else{
if(_35fe==XMLP._DTD){
}else{
if(_35fe==XMLP._ERROR){
this._fireError(_35fd.getContent());
}else{
if(_35fe==XMLP._NONE){
return;
}
}
}
}
}
}
}
}
}
}
}
}
};
SAXStrings=function(){
};
SAXStrings.WHITESPACE=" \t\n\r";
SAXStrings.QUOTES="\"'";
SAXStrings.getColumnNumber=function(strD,iP){
if(SAXStrings.isEmpty(strD)){
return -1;
}
iP=iP||strD.length;
var arrD=strD.substring(0,iP).split("\n");
var _3602=arrD[arrD.length-1];
arrD.length--;
var _3603=arrD.join("\n").length;
return iP-_3603;
};
SAXStrings.getLineNumber=function(strD,iP){
if(SAXStrings.isEmpty(strD)){
return -1;
}
iP=iP||strD.length;
return strD.substring(0,iP).split("\n").length;
};
SAXStrings.indexOfNonWhitespace=function(strD,iB,iE){
if(SAXStrings.isEmpty(strD)){
return -1;
}
iB=iB||0;
iE=iE||strD.length;
for(var i=iB;i<iE;i++){
if(SAXStrings.WHITESPACE.indexOf(strD.charAt(i))==-1){
return i;
}
}
return -1;
};
SAXStrings.indexOfWhitespace=function(strD,iB,iE){
if(SAXStrings.isEmpty(strD)){
return -1;
}
iB=iB||0;
iE=iE||strD.length;
for(var i=iB;i<iE;i++){
if(SAXStrings.WHITESPACE.indexOf(strD.charAt(i))!=-1){
return i;
}
}
return -1;
};
SAXStrings.isEmpty=function(strD){
return (strD===null)||(strD.length===0);
};
SAXStrings.lastIndexOfNonWhitespace=function(strD,iB,iE){
if(SAXStrings.isEmpty(strD)){
return -1;
}
iB=iB||0;
iE=iE||strD.length;
for(var i=iE-1;i>=iB;i--){
if(SAXStrings.WHITESPACE.indexOf(strD.charAt(i))==-1){
return i;
}
}
return -1;
};
SAXStrings.replace=function(strD,iB,iE,strF,strR){
if(SAXStrings.isEmpty(strD)){
return "";
}
iB=iB||0;
iE=iE||strD.length;
return strD.substring(iB,iE).split(strF).join(strR);
};
Stack=function(){
this.m_arr=[];
};
Stack.prototype.clear=function(){
this.m_arr=[];
};
Stack.prototype.count=function(){
return this.m_arr.length;
};
Stack.prototype.destroy=function(){
this.m_arr=null;
};
Stack.prototype.peek=function(){
if(this.m_arr.length===0){
return null;
}
return this.m_arr[this.m_arr.length-1];
};
Stack.prototype.pop=function(){
if(this.m_arr.length===0){
return null;
}
var o=this.m_arr[this.m_arr.length-1];
this.m_arr.length--;
return o;
};
Stack.prototype.push=function(o){
this.m_arr[this.m_arr.length]=o;
};
function isEmpty(str){
return (str===null)||(str.length==0);
}
function trim(_361b,_361c,_361d){
if(isEmpty(_361b)){
return "";
}
if(_361c===null){
_361c=true;
}
if(_361d===null){
_361d=true;
}
var left=0;
var right=0;
var i=0;
var k=0;
if(_361c==true){
while((i<_361b.length)&&(whitespace.indexOf(_361b.charAt(i++))!=-1)){
left++;
}
}
if(_361d==true){
k=_361b.length-1;
while((k>=left)&&(whitespace.indexOf(_361b.charAt(k--))!=-1)){
right++;
}
}
return _361b.substring(left,_361b.length-right);
}
function __escapeString(str){
var _3623=/&/g;
var _3624=/</g;
var _3625=/>/g;
var _3626=/"/g;
var _3627=/'/g;
str=str.replace(_3623,"&amp;");
str=str.replace(_3624,"&lt;");
str=str.replace(_3625,"&gt;");
str=str.replace(_3626,"&quot;");
str=str.replace(_3627,"&apos;");
return str;
}
function __unescapeString(str){
var _3629=/&amp;/g;
var _362a=/&lt;/g;
var _362b=/&gt;/g;
var _362c=/&quot;/g;
var _362d=/&apos;/g;
str=str.replace(_3629,"&");
str=str.replace(_362a,"<");
str=str.replace(_362b,">");
str=str.replace(_362c,"\"");
str=str.replace(_362d,"'");
return str;
}
function addClass(_24e0,_24e1){
if(_24e0){
if(_24e0.indexOf("|"+_24e1+"|")<0){
_24e0+=_24e1+"|";
}
}else{
_24e0="|"+_24e1+"|";
}
return _24e0;
}
DOMException=function(code){
this._class=addClass(this._class,"DOMException");
this.code=code;
};
DOMException.INDEX_SIZE_ERR=1;
DOMException.DOMSTRING_SIZE_ERR=2;
DOMException.HIERARCHY_REQUEST_ERR=3;
DOMException.WRONG_DOCUMENT_ERR=4;
DOMException.INVALID_CHARACTER_ERR=5;
DOMException.NO_DATA_ALLOWED_ERR=6;
DOMException.NO_MODIFICATION_ALLOWED_ERR=7;
DOMException.NOT_FOUND_ERR=8;
DOMException.NOT_SUPPORTED_ERR=9;
DOMException.INUSE_ATTRIBUTE_ERR=10;
DOMException.INVALID_STATE_ERR=11;
DOMException.SYNTAX_ERR=12;
DOMException.INVALID_MODIFICATION_ERR=13;
DOMException.NAMESPACE_ERR=14;
DOMException.INVALID_ACCESS_ERR=15;
DOMImplementation=function(){
this._class=addClass(this._class,"DOMImplementation");
this._p=null;
this.preserveWhiteSpace=false;
this.namespaceAware=true;
this.errorChecking=true;
};
DOMImplementation.prototype.escapeString=function DOMNode__escapeString(str){
return __escapeString(str);
};
DOMImplementation.prototype.unescapeString=function DOMNode__unescapeString(str){
return __unescapeString(str);
};
DOMImplementation.prototype.hasFeature=function DOMImplementation_hasFeature(_24e5,_24e6){
var ret=false;
if(_24e5.toLowerCase()=="xml"){
ret=(!_24e6||(_24e6=="1.0")||(_24e6=="2.0"));
}else{
if(_24e5.toLowerCase()=="core"){
ret=(!_24e6||(_24e6=="2.0"));
}
}
return ret;
};
DOMImplementation.prototype.loadXML=function DOMImplementation_loadXML(_24e8){
var _24e9;
try{
_24e9=new XMLP(_24e8);
}
catch(e){
alert("Error Creating the SAX Parser. Did you include xmlsax.js or tinyxmlsax.js in your web page?\nThe SAX parser is needed to populate XML for <SCRIPT>'s W3C DOM Parser with data.");
}
var doc=new DOMDocument(this);
this._parseLoop(doc,_24e9);
doc._parseComplete=true;
return doc;
};
DOMImplementation.prototype.translateErrCode=function DOMImplementation_translateErrCode(code){
var msg="";
switch(code){
case DOMException.INDEX_SIZE_ERR:
msg="INDEX_SIZE_ERR: Index out of bounds";
break;
case DOMException.DOMSTRING_SIZE_ERR:
msg="DOMSTRING_SIZE_ERR: The resulting string is too long to fit in a DOMString";
break;
case DOMException.HIERARCHY_REQUEST_ERR:
msg="HIERARCHY_REQUEST_ERR: The Node can not be inserted at this location";
break;
case DOMException.WRONG_DOCUMENT_ERR:
msg="WRONG_DOCUMENT_ERR: The source and the destination Documents are not the same";
break;
case DOMException.INVALID_CHARACTER_ERR:
msg="INVALID_CHARACTER_ERR: The string contains an invalid character";
break;
case DOMException.NO_DATA_ALLOWED_ERR:
msg="NO_DATA_ALLOWED_ERR: This Node / NodeList does not support data";
break;
case DOMException.NO_MODIFICATION_ALLOWED_ERR:
msg="NO_MODIFICATION_ALLOWED_ERR: This object cannot be modified";
break;
case DOMException.NOT_FOUND_ERR:
msg="NOT_FOUND_ERR: The item cannot be found";
break;
case DOMException.NOT_SUPPORTED_ERR:
msg="NOT_SUPPORTED_ERR: This implementation does not support function";
break;
case DOMException.INUSE_ATTRIBUTE_ERR:
msg="INUSE_ATTRIBUTE_ERR: The Attribute has already been assigned to another Element";
break;
case DOMException.INVALID_STATE_ERR:
msg="INVALID_STATE_ERR: The object is no longer usable";
break;
case DOMException.SYNTAX_ERR:
msg="SYNTAX_ERR: Syntax error";
break;
case DOMException.INVALID_MODIFICATION_ERR:
msg="INVALID_MODIFICATION_ERR: Cannot change the type of the object";
break;
case DOMException.NAMESPACE_ERR:
msg="NAMESPACE_ERR: The namespace declaration is incorrect";
break;
case DOMException.INVALID_ACCESS_ERR:
msg="INVALID_ACCESS_ERR: The object does not support this function";
break;
default:
msg="UNKNOWN: Unknown Exception Code ("+code+")";
}
return msg;
};
DOMImplementation.prototype._parseLoop=function DOMImplementation__parseLoop(doc,p){
var iEvt,iNode,iAttr,strName;
iNodeParent=doc;
var _24f0=0;
var _24f1=[];
var _24f2=[];
if(this.namespaceAware){
var iNS=doc.createNamespace("");
iNS.setValue("http://www.w3.org/2000/xmlns/");
doc._namespaces.setNamedItem(iNS);
}
while(true){
iEvt=p.next();
if(iEvt==XMLP._ELM_B){
var pName=p.getName();
pName=trim(pName,true,true);
if(!this.namespaceAware){
iNode=doc.createElement(p.getName());
for(var i=0;i<p.getAttributeCount();i++){
strName=p.getAttributeName(i);
iAttr=iNode.getAttributeNode(strName);
if(!iAttr){
iAttr=doc.createAttribute(strName);
}
iAttr.setValue(p.getAttributeValue(i));
iNode.setAttributeNode(iAttr);
}
}else{
iNode=doc.createElementNS("",p.getName());
iNode._namespaces=iNodeParent._namespaces._cloneNodes(iNode);
for(var i=0;i<p.getAttributeCount();i++){
strName=p.getAttributeName(i);
if(this._isNamespaceDeclaration(strName)){
var _24f6=this._parseNSName(strName);
if(strName!="xmlns"){
iNS=doc.createNamespace(strName);
}else{
iNS=doc.createNamespace("");
}
iNS.setValue(p.getAttributeValue(i));
iNode._namespaces.setNamedItem(iNS);
}else{
iAttr=iNode.getAttributeNode(strName);
if(!iAttr){
iAttr=doc.createAttributeNS("",strName);
}
iAttr.setValue(p.getAttributeValue(i));
iNode.setAttributeNodeNS(iAttr);
if(this._isIdDeclaration(strName)){
iNode.id=p.getAttributeValue(i);
}
}
}
if(iNode._namespaces.getNamedItem(iNode.prefix)){
iNode.namespaceURI=iNode._namespaces.getNamedItem(iNode.prefix).value;
}
for(var i=0;i<iNode.attributes.length;i++){
if(iNode.attributes.item(i).prefix!=""){
if(iNode._namespaces.getNamedItem(iNode.attributes.item(i).prefix)){
iNode.attributes.item(i).namespaceURI=iNode._namespaces.getNamedItem(iNode.attributes.item(i).prefix).value;
}
}
}
}
if(iNodeParent.nodeType==DOMNode.DOCUMENT_NODE){
iNodeParent.documentElement=iNode;
}
iNodeParent.appendChild(iNode);
iNodeParent=iNode;
}else{
if(iEvt==XMLP._ELM_E){
iNodeParent=iNodeParent.parentNode;
}else{
if(iEvt==XMLP._ELM_EMP){
pName=p.getName();
pName=trim(pName,true,true);
if(!this.namespaceAware){
iNode=doc.createElement(pName);
for(var i=0;i<p.getAttributeCount();i++){
strName=p.getAttributeName(i);
iAttr=iNode.getAttributeNode(strName);
if(!iAttr){
iAttr=doc.createAttribute(strName);
}
iAttr.setValue(p.getAttributeValue(i));
iNode.setAttributeNode(iAttr);
}
}else{
iNode=doc.createElementNS("",p.getName());
iNode._namespaces=iNodeParent._namespaces._cloneNodes(iNode);
for(var i=0;i<p.getAttributeCount();i++){
strName=p.getAttributeName(i);
if(this._isNamespaceDeclaration(strName)){
var _24f6=this._parseNSName(strName);
if(strName!="xmlns"){
iNS=doc.createNamespace(strName);
}else{
iNS=doc.createNamespace("");
}
iNS.setValue(p.getAttributeValue(i));
iNode._namespaces.setNamedItem(iNS);
}else{
iAttr=iNode.getAttributeNode(strName);
if(!iAttr){
iAttr=doc.createAttributeNS("",strName);
}
iAttr.setValue(p.getAttributeValue(i));
iNode.setAttributeNodeNS(iAttr);
if(this._isIdDeclaration(strName)){
iNode.id=p.getAttributeValue(i);
}
}
}
if(iNode._namespaces.getNamedItem(iNode.prefix)){
iNode.namespaceURI=iNode._namespaces.getNamedItem(iNode.prefix).value;
}
for(var i=0;i<iNode.attributes.length;i++){
if(iNode.attributes.item(i).prefix!=""){
if(iNode._namespaces.getNamedItem(iNode.attributes.item(i).prefix)){
iNode.attributes.item(i).namespaceURI=iNode._namespaces.getNamedItem(iNode.attributes.item(i).prefix).value;
}
}
}
}
if(iNodeParent.nodeType==DOMNode.DOCUMENT_NODE){
iNodeParent.documentElement=iNode;
}
iNodeParent.appendChild(iNode);
}else{
if(iEvt==XMLP._TEXT||iEvt==XMLP._ENTITY){
var _24f7=p.getContent().substring(p.getContentBegin(),p.getContentEnd());
if(!this.preserveWhiteSpace){
if(trim(_24f7,true,true)==""){
_24f7="";
}
}
if(_24f7.length>0){
var _24f8=doc.createTextNode(_24f7);
iNodeParent.appendChild(_24f8);
if(iEvt==XMLP._ENTITY){
_24f1[_24f1.length]=_24f8;
}else{
_24f2[_24f2.length]=_24f8;
}
}
}else{
if(iEvt==XMLP._PI){
iNodeParent.appendChild(doc.createProcessingInstruction(p.getName(),p.getContent().substring(p.getContentBegin(),p.getContentEnd())));
}else{
if(iEvt==XMLP._CDATA){
_24f7=p.getContent().substring(p.getContentBegin(),p.getContentEnd());
if(!this.preserveWhiteSpace){
_24f7=trim(_24f7,true,true);
_24f7.replace(/ +/g," ");
}
if(_24f7.length>0){
iNodeParent.appendChild(doc.createCDATASection(_24f7));
}
}else{
if(iEvt==XMLP._COMMENT){
var _24f7=p.getContent().substring(p.getContentBegin(),p.getContentEnd());
if(!this.preserveWhiteSpace){
_24f7=trim(_24f7,true,true);
_24f7.replace(/ +/g," ");
}
if(_24f7.length>0){
iNodeParent.appendChild(doc.createComment(_24f7));
}
}else{
if(iEvt==XMLP._DTD){
}else{
if(iEvt==XMLP._ERROR){
throw (new DOMException(DOMException.SYNTAX_ERR));
}else{
if(iEvt==XMLP._NONE){
if(iNodeParent==doc){
break;
}else{
throw (new DOMException(DOMException.SYNTAX_ERR));
}
}
}
}
}
}
}
}
}
}
}
}
var _24f9=_24f1.length;
for(intLoop=0;intLoop<_24f9;intLoop++){
var _24fa=_24f1[intLoop];
var _24fb=_24fa.getParentNode();
if(_24fb){
_24fb.normalize();
if(!this.preserveWhiteSpace){
var _24fc=_24fb.getChildNodes();
var _24fd=_24fc.getLength();
for(intLoop2=0;intLoop2<_24fd;intLoop2++){
var child=_24fc.item(intLoop2);
if(child.getNodeType()==DOMNode.TEXT_NODE){
var _24ff=child.getData();
_24ff=trim(_24ff,true,true);
_24ff.replace(/ +/g," ");
child.setData(_24ff);
}
}
}
}
}
if(!this.preserveWhiteSpace){
var _24f9=_24f2.length;
for(intLoop=0;intLoop<_24f9;intLoop++){
var node=_24f2[intLoop];
if(node.getParentNode()!==null){
var _2501=node.getData();
_2501=trim(_2501,true,true);
_2501.replace(/ +/g," ");
node.setData(_2501);
}
}
}
};
DOMImplementation.prototype._isNamespaceDeclaration=function DOMImplementation__isNamespaceDeclaration(_2502){
return (_2502.indexOf("xmlns")>-1);
};
DOMImplementation.prototype._isIdDeclaration=function DOMImplementation__isIdDeclaration(_2503){
return (_2503.toLowerCase()=="id");
};
DOMImplementation.prototype._isValidName=function DOMImplementation__isValidName(name){
return name.match(re_validName);
};
re_validName=/^[a-zA-Z_:][a-zA-Z0-9\.\-_:]*$/;
DOMImplementation.prototype._isValidString=function DOMImplementation__isValidString(name){
return (name.search(re_invalidStringChars)<0);
};
re_invalidStringChars=/\x01|\x02|\x03|\x04|\x05|\x06|\x07|\x08|\x0B|\x0C|\x0E|\x0F|\x10|\x11|\x12|\x13|\x14|\x15|\x16|\x17|\x18|\x19|\x1A|\x1B|\x1C|\x1D|\x1E|\x1F|\x7F/;
DOMImplementation.prototype._parseNSName=function DOMImplementation__parseNSName(_2506){
var _2507={};
_2507.prefix=_2506;
_2507.namespaceName="";
delimPos=_2506.indexOf(":");
if(delimPos>-1){
_2507.prefix=_2506.substring(0,delimPos);
_2507.namespaceName=_2506.substring(delimPos+1,_2506.length);
}
return _2507;
};
DOMImplementation.prototype._parseQName=function DOMImplementation__parseQName(_2508){
var _2509={};
_2509.localName=_2508;
_2509.prefix="";
delimPos=_2508.indexOf(":");
if(delimPos>-1){
_2509.prefix=_2508.substring(0,delimPos);
_2509.localName=_2508.substring(delimPos+1,_2508.length);
}
return _2509;
};
DOMNodeList=function(_250a,_250b){
this._class=addClass(this._class,"DOMNodeList");
this._nodes=[];
this.length=0;
this.parentNode=_250b;
this.ownerDocument=_250a;
this._readonly=false;
};
DOMNodeList.prototype.getLength=function DOMNodeList_getLength(){
return this.length;
};
DOMNodeList.prototype.item=function DOMNodeList_item(index){
var ret=null;
if((index>=0)&&(index<this._nodes.length)){
ret=this._nodes[index];
}
return ret;
};
DOMNodeList.prototype._findItemIndex=function DOMNodeList__findItemIndex(id){
var ret=-1;
if(id>-1){
for(var i=0;i<this._nodes.length;i++){
if(this._nodes[i]._id==id){
ret=i;
break;
}
}
}
return ret;
};
DOMNodeList.prototype._insertBefore=function DOMNodeList__insertBefore(_2511,_2512){
if((_2512>=0)&&(_2512<this._nodes.length)){
var _2513=[];
_2513=this._nodes.slice(0,_2512);
if(_2511.nodeType==DOMNode.DOCUMENT_FRAGMENT_NODE){
_2513=_2513.concat(_2511.childNodes._nodes);
}else{
_2513[_2513.length]=_2511;
}
this._nodes=_2513.concat(this._nodes.slice(_2512));
this.length=this._nodes.length;
}
};
DOMNodeList.prototype._replaceChild=function DOMNodeList__replaceChild(_2514,_2515){
var ret=null;
if((_2515>=0)&&(_2515<this._nodes.length)){
ret=this._nodes[_2515];
if(_2514.nodeType==DOMNode.DOCUMENT_FRAGMENT_NODE){
var _2517=[];
_2517=this._nodes.slice(0,_2515);
_2517=_2517.concat(_2514.childNodes._nodes);
this._nodes=_2517.concat(this._nodes.slice(_2515+1));
}else{
this._nodes[_2515]=_2514;
}
}
return ret;
};
DOMNodeList.prototype._removeChild=function DOMNodeList__removeChild(_2518){
var ret=null;
if(_2518>-1){
ret=this._nodes[_2518];
var _251a=[];
_251a=this._nodes.slice(0,_2518);
this._nodes=_251a.concat(this._nodes.slice(_2518+1));
this.length=this._nodes.length;
}
return ret;
};
DOMNodeList.prototype._appendChild=function DOMNodeList__appendChild(_251b){
if(_251b.nodeType==DOMNode.DOCUMENT_FRAGMENT_NODE){
this._nodes=this._nodes.concat(_251b.childNodes._nodes);
}else{
this._nodes[this._nodes.length]=_251b;
}
this.length=this._nodes.length;
};
DOMNodeList.prototype._cloneNodes=function DOMNodeList__cloneNodes(deep,_251d){
var _251e=new DOMNodeList(this.ownerDocument,_251d);
for(var i=0;i<this._nodes.length;i++){
_251e._appendChild(this._nodes[i].cloneNode(deep));
}
return _251e;
};
DOMNodeList.prototype.toString=function DOMNodeList_toString(){
var ret="";
for(var i=0;i<this.length;i++){
ret+=this._nodes[i].toString();
}
return ret;
};
DOMNamedNodeMap=function(_2522,_2523){
this._class=addClass(this._class,"DOMNamedNodeMap");
this.DOMNodeList=DOMNodeList;
this.DOMNodeList(_2522,_2523);
};
DOMNamedNodeMap.prototype=new DOMNodeList;
DOMNamedNodeMap.prototype.getNamedItem=function DOMNamedNodeMap_getNamedItem(name){
var ret=null;
var _2526=this._findNamedItemIndex(name);
if(_2526>-1){
ret=this._nodes[_2526];
}
return ret;
};
DOMNamedNodeMap.prototype.setNamedItem=function DOMNamedNodeMap_setNamedItem(arg){
if(this.ownerDocument.implementation.errorChecking){
if(this.ownerDocument!=arg.ownerDocument){
throw (new DOMException(DOMException.WRONG_DOCUMENT_ERR));
}
if(this._readonly||(this.parentNode&&this.parentNode._readonly)){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(arg.ownerElement&&(arg.ownerElement!=this.parentNode)){
throw (new DOMException(DOMException.INUSE_ATTRIBUTE_ERR));
}
}
var _2528=this._findNamedItemIndex(arg.name);
var ret=null;
if(_2528>-1){
ret=this._nodes[_2528];
if(this.ownerDocument.implementation.errorChecking&&ret._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}else{
this._nodes[_2528]=arg;
}
}else{
this._nodes[this.length]=arg;
}
this.length=this._nodes.length;
arg.ownerElement=this.parentNode;
return ret;
};
DOMNamedNodeMap.prototype.removeNamedItem=function DOMNamedNodeMap_removeNamedItem(name){
var ret=null;
if(this.ownerDocument.implementation.errorChecking&&(this._readonly||(this.parentNode&&this.parentNode._readonly))){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
var _252c=this._findNamedItemIndex(name);
if(this.ownerDocument.implementation.errorChecking&&(_252c<0)){
throw (new DOMException(DOMException.NOT_FOUND_ERR));
}
var _252d=this._nodes[_252c];
if(this.ownerDocument.implementation.errorChecking&&_252d._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
return this._removeChild(_252c);
};
DOMNamedNodeMap.prototype.getNamedItemNS=function DOMNamedNodeMap_getNamedItemNS(_252e,_252f){
var ret=null;
var _2531=this._findNamedItemNSIndex(_252e,_252f);
if(_2531>-1){
ret=this._nodes[_2531];
}
return ret;
};
DOMNamedNodeMap.prototype.setNamedItemNS=function DOMNamedNodeMap_setNamedItemNS(arg){
if(this.ownerDocument.implementation.errorChecking){
if(this._readonly||(this.parentNode&&this.parentNode._readonly)){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(this.ownerDocument!=arg.ownerDocument){
throw (new DOMException(DOMException.WRONG_DOCUMENT_ERR));
}
if(arg.ownerElement&&(arg.ownerElement!=this.parentNode)){
throw (new DOMException(DOMException.INUSE_ATTRIBUTE_ERR));
}
}
var _2533=this._findNamedItemNSIndex(arg.namespaceURI,arg.localName);
var ret=null;
if(_2533>-1){
ret=this._nodes[_2533];
if(this.ownerDocument.implementation.errorChecking&&ret._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}else{
this._nodes[_2533]=arg;
}
}else{
this._nodes[this.length]=arg;
}
this.length=this._nodes.length;
arg.ownerElement=this.parentNode;
return ret;
};
DOMNamedNodeMap.prototype.removeNamedItemNS=function DOMNamedNodeMap_removeNamedItemNS(_2535,_2536){
var ret=null;
if(this.ownerDocument.implementation.errorChecking&&(this._readonly||(this.parentNode&&this.parentNode._readonly))){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
var _2538=this._findNamedItemNSIndex(_2535,_2536);
if(this.ownerDocument.implementation.errorChecking&&(_2538<0)){
throw (new DOMException(DOMException.NOT_FOUND_ERR));
}
var _2539=this._nodes[_2538];
if(this.ownerDocument.implementation.errorChecking&&_2539._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
return this._removeChild(_2538);
};
DOMNamedNodeMap.prototype._findNamedItemIndex=function DOMNamedNodeMap__findNamedItemIndex(name){
var ret=-1;
for(var i=0;i<this._nodes.length;i++){
if(this._nodes[i].name==name){
ret=i;
break;
}
}
return ret;
};
DOMNamedNodeMap.prototype._findNamedItemNSIndex=function DOMNamedNodeMap__findNamedItemNSIndex(_253d,_253e){
var ret=-1;
if(_253e){
for(var i=0;i<this._nodes.length;i++){
if((this._nodes[i].namespaceURI==_253d)&&(this._nodes[i].localName==_253e)){
ret=i;
break;
}
}
}
return ret;
};
DOMNamedNodeMap.prototype._hasAttribute=function DOMNamedNodeMap__hasAttribute(name){
var ret=false;
var _2543=this._findNamedItemIndex(name);
if(_2543>-1){
ret=true;
}
return ret;
};
DOMNamedNodeMap.prototype._hasAttributeNS=function DOMNamedNodeMap__hasAttributeNS(_2544,_2545){
var ret=false;
var _2547=this._findNamedItemNSIndex(_2544,_2545);
if(_2547>-1){
ret=true;
}
return ret;
};
DOMNamedNodeMap.prototype._cloneNodes=function DOMNamedNodeMap__cloneNodes(_2548){
var _2549=new DOMNamedNodeMap(this.ownerDocument,_2548);
for(var i=0;i<this._nodes.length;i++){
_2549._appendChild(this._nodes[i].cloneNode(false));
}
return _2549;
};
DOMNamedNodeMap.prototype.toString=function DOMNamedNodeMap_toString(){
var ret="";
for(var i=0;i<this.length-1;i++){
ret+=this._nodes[i].toString()+" ";
}
if(this.length>0){
ret+=this._nodes[this.length-1].toString();
}
return ret;
};
DOMNamespaceNodeMap=function(_254d,_254e){
this._class=addClass(this._class,"DOMNamespaceNodeMap");
this.DOMNamedNodeMap=DOMNamedNodeMap;
this.DOMNamedNodeMap(_254d,_254e);
};
DOMNamespaceNodeMap.prototype=new DOMNamedNodeMap;
DOMNamespaceNodeMap.prototype._findNamedItemIndex=function DOMNamespaceNodeMap__findNamedItemIndex(_254f){
var ret=-1;
for(var i=0;i<this._nodes.length;i++){
if(this._nodes[i].localName==_254f){
ret=i;
break;
}
}
return ret;
};
DOMNamespaceNodeMap.prototype._cloneNodes=function DOMNamespaceNodeMap__cloneNodes(_2552){
var _2553=new DOMNamespaceNodeMap(this.ownerDocument,_2552);
for(var i=0;i<this._nodes.length;i++){
_2553._appendChild(this._nodes[i].cloneNode(false));
}
return _2553;
};
DOMNamespaceNodeMap.prototype.toString=function DOMNamespaceNodeMap_toString(){
var ret="";
for(var ind=0;ind<this._nodes.length;ind++){
var ns=null;
try{
var ns=this.parentNode.parentNode._namespaces.getNamedItem(this._nodes[ind].localName);
}
catch(e){
break;
}
if(!(ns&&(""+ns.nodeValue==""+this._nodes[ind].nodeValue))){
ret+=this._nodes[ind].toString()+" ";
}
}
return ret;
};
DOMNode=function(_2558){
this._class=addClass(this._class,"DOMNode");
if(_2558){
this._id=_2558._genId();
}
this.namespaceURI="";
this.prefix="";
this.localName="";
this.nodeName="";
this.nodeValue="";
this.nodeType=0;
this.parentNode=null;
this.childNodes=new DOMNodeList(_2558,this);
this.firstChild=null;
this.lastChild=null;
this.previousSibling=null;
this.nextSibling=null;
this.attributes=new DOMNamedNodeMap(_2558,this);
this.ownerDocument=_2558;
this._namespaces=new DOMNamespaceNodeMap(_2558,this);
this._readonly=false;
};
DOMNode.ELEMENT_NODE=1;
DOMNode.ATTRIBUTE_NODE=2;
DOMNode.TEXT_NODE=3;
DOMNode.CDATA_SECTION_NODE=4;
DOMNode.ENTITY_REFERENCE_NODE=5;
DOMNode.ENTITY_NODE=6;
DOMNode.PROCESSING_INSTRUCTION_NODE=7;
DOMNode.COMMENT_NODE=8;
DOMNode.DOCUMENT_NODE=9;
DOMNode.DOCUMENT_TYPE_NODE=10;
DOMNode.DOCUMENT_FRAGMENT_NODE=11;
DOMNode.NOTATION_NODE=12;
DOMNode.NAMESPACE_NODE=13;
DOMNode.prototype.hasAttributes=function DOMNode_hasAttributes(){
if(this.attributes.length===0){
return false;
}else{
return true;
}
};
DOMNode.prototype.getNodeName=function DOMNode_getNodeName(){
return this.nodeName;
};
DOMNode.prototype.getNodeValue=function DOMNode_getNodeValue(){
return this.nodeValue;
};
DOMNode.prototype.setNodeValue=function DOMNode_setNodeValue(_2559){
if(this.ownerDocument.implementation.errorChecking&&this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
this.nodeValue=_2559;
};
DOMNode.prototype.getNodeType=function DOMNode_getNodeType(){
return this.nodeType;
};
DOMNode.prototype.getParentNode=function DOMNode_getParentNode(){
return this.parentNode;
};
DOMNode.prototype.getChildNodes=function DOMNode_getChildNodes(){
return this.childNodes;
};
DOMNode.prototype.getFirstChild=function DOMNode_getFirstChild(){
return this.firstChild;
};
DOMNode.prototype.getLastChild=function DOMNode_getLastChild(){
return this.lastChild;
};
DOMNode.prototype.getPreviousSibling=function DOMNode_getPreviousSibling(){
return this.previousSibling;
};
DOMNode.prototype.getNextSibling=function DOMNode_getNextSibling(){
return this.nextSibling;
};
DOMNode.prototype.getAttributes=function DOMNode_getAttributes(){
return this.attributes;
};
DOMNode.prototype.getOwnerDocument=function DOMNode_getOwnerDocument(){
return this.ownerDocument;
};
DOMNode.prototype.getNamespaceURI=function DOMNode_getNamespaceURI(){
return this.namespaceURI;
};
DOMNode.prototype.getPrefix=function DOMNode_getPrefix(){
return this.prefix;
};
DOMNode.prototype.setPrefix=function DOMNode_setPrefix(_255a){
if(this.ownerDocument.implementation.errorChecking){
if(this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(!this.ownerDocument.implementation._isValidName(_255a)){
throw (new DOMException(DOMException.INVALID_CHARACTER_ERR));
}
if(!this.ownerDocument._isValidNamespace(this.namespaceURI,_255a+":"+this.localName)){
throw (new DOMException(DOMException.NAMESPACE_ERR));
}
if((_255a=="xmlns")&&(this.namespaceURI!="http://www.w3.org/2000/xmlns/")){
throw (new DOMException(DOMException.NAMESPACE_ERR));
}
if((_255a=="")&&(this.localName=="xmlns")){
throw (new DOMException(DOMException.NAMESPACE_ERR));
}
}
this.prefix=_255a;
if(this.prefix!=""){
this.nodeName=this.prefix+":"+this.localName;
}else{
this.nodeName=this.localName;
}
};
DOMNode.prototype.getLocalName=function DOMNode_getLocalName(){
return this.localName;
};
DOMNode.prototype.insertBefore=function DOMNode_insertBefore(_255b,_255c){
var _255d;
if(this.ownerDocument.implementation.errorChecking){
if(this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(this.ownerDocument!=_255b.ownerDocument){
throw (new DOMException(DOMException.WRONG_DOCUMENT_ERR));
}
if(this._isAncestor(_255b)){
throw (new DOMException(DOMException.HIERARCHY_REQUEST_ERR));
}
}
if(_255c){
var _255e=this.childNodes._findItemIndex(_255c._id);
if(this.ownerDocument.implementation.errorChecking&&(_255e<0)){
throw (new DOMException(DOMException.NOT_FOUND_ERR));
}
var _255f=_255b.parentNode;
if(_255f){
_255f.removeChild(_255b);
}
this.childNodes._insertBefore(_255b,this.childNodes._findItemIndex(_255c._id));
_255d=_255c.previousSibling;
if(_255b.nodeType==DOMNode.DOCUMENT_FRAGMENT_NODE){
if(_255b.childNodes._nodes.length>0){
for(var ind=0;ind<_255b.childNodes._nodes.length;ind++){
_255b.childNodes._nodes[ind].parentNode=this;
}
_255c.previousSibling=_255b.childNodes._nodes[_255b.childNodes._nodes.length-1];
}
}else{
_255b.parentNode=this;
_255c.previousSibling=_255b;
}
}else{
_255d=this.lastChild;
this.appendChild(_255b);
}
if(_255b.nodeType==DOMNode.DOCUMENT_FRAGMENT_NODE){
if(_255b.childNodes._nodes.length>0){
if(_255d){
_255d.nextSibling=_255b.childNodes._nodes[0];
}else{
this.firstChild=_255b.childNodes._nodes[0];
}
_255b.childNodes._nodes[0].previousSibling=_255d;
_255b.childNodes._nodes[_255b.childNodes._nodes.length-1].nextSibling=_255c;
}
}else{
if(_255d){
_255d.nextSibling=_255b;
}else{
this.firstChild=_255b;
}
_255b.previousSibling=_255d;
_255b.nextSibling=_255c;
}
return _255b;
};
DOMNode.prototype.replaceChild=function DOMNode_replaceChild(_2561,_2562){
var ret=null;
if(this.ownerDocument.implementation.errorChecking){
if(this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(this.ownerDocument!=_2561.ownerDocument){
throw (new DOMException(DOMException.WRONG_DOCUMENT_ERR));
}
if(this._isAncestor(_2561)){
throw (new DOMException(DOMException.HIERARCHY_REQUEST_ERR));
}
}
var index=this.childNodes._findItemIndex(_2562._id);
if(this.ownerDocument.implementation.errorChecking&&(index<0)){
throw (new DOMException(DOMException.NOT_FOUND_ERR));
}
var _2565=_2561.parentNode;
if(_2565){
_2565.removeChild(_2561);
}
ret=this.childNodes._replaceChild(_2561,index);
if(_2561.nodeType==DOMNode.DOCUMENT_FRAGMENT_NODE){
if(_2561.childNodes._nodes.length>0){
for(var ind=0;ind<_2561.childNodes._nodes.length;ind++){
_2561.childNodes._nodes[ind].parentNode=this;
}
if(_2562.previousSibling){
_2562.previousSibling.nextSibling=_2561.childNodes._nodes[0];
}else{
this.firstChild=_2561.childNodes._nodes[0];
}
if(_2562.nextSibling){
_2562.nextSibling.previousSibling=_2561;
}else{
this.lastChild=_2561.childNodes._nodes[_2561.childNodes._nodes.length-1];
}
_2561.childNodes._nodes[0].previousSibling=_2562.previousSibling;
_2561.childNodes._nodes[_2561.childNodes._nodes.length-1].nextSibling=_2562.nextSibling;
}
}else{
_2561.parentNode=this;
if(_2562.previousSibling){
_2562.previousSibling.nextSibling=_2561;
}else{
this.firstChild=_2561;
}
if(_2562.nextSibling){
_2562.nextSibling.previousSibling=_2561;
}else{
this.lastChild=_2561;
}
_2561.previousSibling=_2562.previousSibling;
_2561.nextSibling=_2562.nextSibling;
}
return ret;
};
DOMNode.prototype.removeChild=function DOMNode_removeChild(_2567){
if(this.ownerDocument.implementation.errorChecking&&(this._readonly||_2567._readonly)){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
var _2568=this.childNodes._findItemIndex(_2567._id);
if(this.ownerDocument.implementation.errorChecking&&(_2568<0)){
throw (new DOMException(DOMException.NOT_FOUND_ERR));
}
this.childNodes._removeChild(_2568);
_2567.parentNode=null;
if(_2567.previousSibling){
_2567.previousSibling.nextSibling=_2567.nextSibling;
}else{
this.firstChild=_2567.nextSibling;
}
if(_2567.nextSibling){
_2567.nextSibling.previousSibling=_2567.previousSibling;
}else{
this.lastChild=_2567.previousSibling;
}
_2567.previousSibling=null;
_2567.nextSibling=null;
return _2567;
};
DOMNode.prototype.appendChild=function DOMNode_appendChild(_2569){
if(this.ownerDocument.implementation.errorChecking){
if(this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(this.ownerDocument!=_2569.ownerDocument){
throw (new DOMException(DOMException.WRONG_DOCUMENT_ERR));
}
if(this._isAncestor(_2569)){
throw (new DOMException(DOMException.HIERARCHY_REQUEST_ERR));
}
}
var _256a=_2569.parentNode;
if(_256a){
_256a.removeChild(_2569);
}
this.childNodes._appendChild(_2569);
if(_2569.nodeType==DOMNode.DOCUMENT_FRAGMENT_NODE){
if(_2569.childNodes._nodes.length>0){
for(var ind=0;ind<_2569.childNodes._nodes.length;ind++){
_2569.childNodes._nodes[ind].parentNode=this;
}
if(this.lastChild){
this.lastChild.nextSibling=_2569.childNodes._nodes[0];
_2569.childNodes._nodes[0].previousSibling=this.lastChild;
this.lastChild=_2569.childNodes._nodes[_2569.childNodes._nodes.length-1];
}else{
this.lastChild=_2569.childNodes._nodes[_2569.childNodes._nodes.length-1];
this.firstChild=_2569.childNodes._nodes[0];
}
}
}else{
_2569.parentNode=this;
if(this.lastChild){
this.lastChild.nextSibling=_2569;
_2569.previousSibling=this.lastChild;
this.lastChild=_2569;
}else{
this.lastChild=_2569;
this.firstChild=_2569;
}
}
return _2569;
};
DOMNode.prototype.hasChildNodes=function DOMNode_hasChildNodes(){
return (this.childNodes.length>0);
};
DOMNode.prototype.cloneNode=function DOMNode_cloneNode(deep){
try{
return this.ownerDocument.importNode(this,deep);
}
catch(e){
return null;
}
};
DOMNode.prototype.normalize=function DOMNode_normalize(){
var inode;
var _256e=new DOMNodeList();
if(this.nodeType==DOMNode.ELEMENT_NODE||this.nodeType==DOMNode.DOCUMENT_NODE){
var _256f=null;
for(var i=0;i<this.childNodes.length;i++){
inode=this.childNodes.item(i);
if(inode.nodeType==DOMNode.TEXT_NODE){
if(inode.length<1){
_256e._appendChild(inode);
}else{
if(_256f){
_256f.appendData(inode.data);
_256e._appendChild(inode);
}else{
_256f=inode;
}
}
}else{
_256f=null;
inode.normalize();
}
}
for(var i=0;i<_256e.length;i++){
inode=_256e.item(i);
inode.parentNode.removeChild(inode);
}
}
};
DOMNode.prototype.isSupported=function DOMNode_isSupported(_2571,_2572){
return this.ownerDocument.implementation.hasFeature(_2571,_2572);
};
DOMNode.prototype.getElementsByTagName=function DOMNode_getElementsByTagName(_2573){
return this._getElementsByTagNameRecursive(_2573,new DOMNodeList(this.ownerDocument));
};
DOMNode.prototype._getElementsByTagNameRecursive=function DOMNode__getElementsByTagNameRecursive(_2574,_2575){
if(this.nodeType==DOMNode.ELEMENT_NODE||this.nodeType==DOMNode.DOCUMENT_NODE){
if((this.nodeName==_2574)||(_2574=="*")){
_2575._appendChild(this);
}
for(var i=0;i<this.childNodes.length;i++){
_2575=this.childNodes.item(i)._getElementsByTagNameRecursive(_2574,_2575);
}
}
return _2575;
};
DOMNode.prototype.getXML=function DOMNode_getXML(){
return this.toString();
};
DOMNode.prototype.getElementsByTagNameNS=function DOMNode_getElementsByTagNameNS(_2577,_2578){
return this._getElementsByTagNameNSRecursive(_2577,_2578,new DOMNodeList(this.ownerDocument));
};
DOMNode.prototype._getElementsByTagNameNSRecursive=function DOMNode__getElementsByTagNameNSRecursive(_2579,_257a,_257b){
if(this.nodeType==DOMNode.ELEMENT_NODE||this.nodeType==DOMNode.DOCUMENT_NODE){
if(((this.namespaceURI==_2579)||(_2579=="*"))&&((this.localName==_257a)||(_257a=="*"))){
_257b._appendChild(this);
}
for(var i=0;i<this.childNodes.length;i++){
_257b=this.childNodes.item(i)._getElementsByTagNameNSRecursive(_2579,_257a,_257b);
}
}
return _257b;
};
DOMNode.prototype._isAncestor=function DOMNode__isAncestor(node){
return ((this==node)||((this.parentNode)&&(this.parentNode._isAncestor(node))));
};
DOMNode.prototype.importNode=function DOMNode_importNode(_257e,deep){
var _2580;
this.getOwnerDocument()._performingImportNodeOperation=true;
try{
if(_257e.nodeType==DOMNode.ELEMENT_NODE){
if(!this.ownerDocument.implementation.namespaceAware){
_2580=this.ownerDocument.createElement(_257e.tagName);
for(var i=0;i<_257e.attributes.length;i++){
_2580.setAttribute(_257e.attributes.item(i).name,_257e.attributes.item(i).value);
}
}else{
_2580=this.ownerDocument.createElementNS(_257e.namespaceURI,_257e.nodeName);
for(var i=0;i<_257e.attributes.length;i++){
_2580.setAttributeNS(_257e.attributes.item(i).namespaceURI,_257e.attributes.item(i).name,_257e.attributes.item(i).value);
}
for(var i=0;i<_257e._namespaces.length;i++){
_2580._namespaces._nodes[i]=this.ownerDocument.createNamespace(_257e._namespaces.item(i).localName);
_2580._namespaces._nodes[i].setValue(_257e._namespaces.item(i).value);
}
}
}else{
if(_257e.nodeType==DOMNode.ATTRIBUTE_NODE){
if(!this.ownerDocument.implementation.namespaceAware){
_2580=this.ownerDocument.createAttribute(_257e.name);
}else{
_2580=this.ownerDocument.createAttributeNS(_257e.namespaceURI,_257e.nodeName);
for(var i=0;i<_257e._namespaces.length;i++){
_2580._namespaces._nodes[i]=this.ownerDocument.createNamespace(_257e._namespaces.item(i).localName);
_2580._namespaces._nodes[i].setValue(_257e._namespaces.item(i).value);
}
}
_2580.setValue(_257e.value);
}else{
if(_257e.nodeType==DOMNode.DOCUMENT_FRAGMENT){
_2580=this.ownerDocument.createDocumentFragment();
}else{
if(_257e.nodeType==DOMNode.NAMESPACE_NODE){
_2580=this.ownerDocument.createNamespace(_257e.nodeName);
_2580.setValue(_257e.value);
}else{
if(_257e.nodeType==DOMNode.TEXT_NODE){
_2580=this.ownerDocument.createTextNode(_257e.data);
}else{
if(_257e.nodeType==DOMNode.CDATA_SECTION_NODE){
_2580=this.ownerDocument.createCDATASection(_257e.data);
}else{
if(_257e.nodeType==DOMNode.PROCESSING_INSTRUCTION_NODE){
_2580=this.ownerDocument.createProcessingInstruction(_257e.target,_257e.data);
}else{
if(_257e.nodeType==DOMNode.COMMENT_NODE){
_2580=this.ownerDocument.createComment(_257e.data);
}else{
throw (new DOMException(DOMException.NOT_SUPPORTED_ERR));
}
}
}
}
}
}
}
}
if(deep){
for(var i=0;i<_257e.childNodes.length;i++){
_2580.appendChild(this.ownerDocument.importNode(_257e.childNodes.item(i),true));
}
}
this.getOwnerDocument()._performingImportNodeOperation=false;
return _2580;
}
catch(eAny){
this.getOwnerDocument()._performingImportNodeOperation=false;
throw eAny;
}
};
DOMNode.prototype.__escapeString=function DOMNode__escapeString(str){
return __escapeString(str);
};
DOMNode.prototype.__unescapeString=function DOMNode__unescapeString(str){
return __unescapeString(str);
};
DOMDocument=function(_2584){
this._class=addClass(this._class,"DOMDocument");
this.DOMNode=DOMNode;
this.DOMNode(this);
this.doctype=null;
this.implementation=_2584;
this.documentElement=null;
this.all=[];
this.nodeName="#document";
this.nodeType=DOMNode.DOCUMENT_NODE;
this._id=0;
this._lastId=0;
this._parseComplete=false;
this.ownerDocument=this;
this._performingImportNodeOperation=false;
};
DOMDocument.prototype=new DOMNode;
DOMDocument.prototype.getDoctype=function DOMDocument_getDoctype(){
return this.doctype;
};
DOMDocument.prototype.getImplementation=function DOMDocument_implementation(){
return this.implementation;
};
DOMDocument.prototype.getDocumentElement=function DOMDocument_getDocumentElement(){
return this.documentElement;
};
DOMDocument.prototype.createElement=function DOMDocument_createElement(_2585){
if(this.ownerDocument.implementation.errorChecking&&(!this.ownerDocument.implementation._isValidName(_2585))){
throw (new DOMException(DOMException.INVALID_CHARACTER_ERR));
}
var node=new DOMElement(this);
node.tagName=_2585;
node.nodeName=_2585;
this.all[this.all.length]=node;
return node;
};
DOMDocument.prototype.createDocumentFragment=function DOMDocument_createDocumentFragment(){
var node=new DOMDocumentFragment(this);
return node;
};
DOMDocument.prototype.createTextNode=function DOMDocument_createTextNode(data){
var node=new DOMText(this);
node.data=data;
node.nodeValue=data;
node.length=data.length;
return node;
};
DOMDocument.prototype.createComment=function DOMDocument_createComment(data){
var node=new DOMComment(this);
node.data=data;
node.nodeValue=data;
node.length=data.length;
return node;
};
DOMDocument.prototype.createCDATASection=function DOMDocument_createCDATASection(data){
var node=new DOMCDATASection(this);
node.data=data;
node.nodeValue=data;
node.length=data.length;
return node;
};
DOMDocument.prototype.createProcessingInstruction=function DOMDocument_createProcessingInstruction(_258e,data){
if(this.ownerDocument.implementation.errorChecking&&(!this.implementation._isValidName(_258e))){
throw (new DOMException(DOMException.INVALID_CHARACTER_ERR));
}
var node=new DOMProcessingInstruction(this);
node.target=_258e;
node.nodeName=_258e;
node.data=data;
node.nodeValue=data;
node.length=data.length;
return node;
};
DOMDocument.prototype.createAttribute=function DOMDocument_createAttribute(name){
if(this.ownerDocument.implementation.errorChecking&&(!this.ownerDocument.implementation._isValidName(name))){
throw (new DOMException(DOMException.INVALID_CHARACTER_ERR));
}
var node=new DOMAttr(this);
node.name=name;
node.nodeName=name;
return node;
};
DOMDocument.prototype.createElementNS=function DOMDocument_createElementNS(_2593,_2594){
if(this.ownerDocument.implementation.errorChecking){
if(!this.ownerDocument._isValidNamespace(_2593,_2594)){
throw (new DOMException(DOMException.NAMESPACE_ERR));
}
if(!this.ownerDocument.implementation._isValidName(_2594)){
throw (new DOMException(DOMException.INVALID_CHARACTER_ERR));
}
}
var node=new DOMElement(this);
var qname=this.implementation._parseQName(_2594);
node.nodeName=_2594;
node.namespaceURI=_2593;
node.prefix=qname.prefix;
node.localName=qname.localName;
node.tagName=_2594;
this.all[this.all.length]=node;
return node;
};
DOMDocument.prototype.createAttributeNS=function DOMDocument_createAttributeNS(_2597,_2598){
if(this.ownerDocument.implementation.errorChecking){
if(!this.ownerDocument._isValidNamespace(_2597,_2598,true)){
throw (new DOMException(DOMException.NAMESPACE_ERR));
}
if(!this.ownerDocument.implementation._isValidName(_2598)){
throw (new DOMException(DOMException.INVALID_CHARACTER_ERR));
}
}
var node=new DOMAttr(this);
var qname=this.implementation._parseQName(_2598);
node.nodeName=_2598;
node.namespaceURI=_2597;
node.prefix=qname.prefix;
node.localName=qname.localName;
node.name=_2598;
node.nodeValue="";
return node;
};
DOMDocument.prototype.createNamespace=function DOMDocument_createNamespace(_259b){
var node=new DOMNamespace(this);
var qname=this.implementation._parseQName(_259b);
node.nodeName=_259b;
node.prefix=qname.prefix;
node.localName=qname.localName;
node.name=_259b;
node.nodeValue="";
return node;
};
DOMDocument.prototype.getElementById=function DOMDocument_getElementById(_259e){
retNode=null;
for(var i=0;i<this.all.length;i++){
var node=this.all[i];
if((node.id==_259e)&&(node._isAncestor(node.ownerDocument.documentElement))){
retNode=node;
break;
}
}
return retNode;
};
DOMDocument.prototype._genId=function DOMDocument__genId(){
this._lastId+=1;
return this._lastId;
};
DOMDocument.prototype._isValidNamespace=function DOMDocument__isValidNamespace(_25a1,_25a2,_25a3){
if(this._performingImportNodeOperation==true){
return true;
}
var valid=true;
var qName=this.implementation._parseQName(_25a2);
if(this._parseComplete==true){
if(qName.localName.indexOf(":")>-1){
valid=false;
}
if((valid)&&(!_25a3)){
if(!_25a1){
valid=false;
}
}
if((valid)&&(qName.prefix=="")){
valid=false;
}
}
if((valid)&&(qName.prefix=="xml")&&(_25a1!="http://www.w3.org/XML/1998/namespace")){
valid=false;
}
return valid;
};
DOMDocument.prototype.toString=function DOMDocument_toString(){
return ""+this.childNodes;
};
DOMElement=function(_25a6){
this._class=addClass(this._class,"DOMElement");
this.DOMNode=DOMNode;
this.DOMNode(_25a6);
this.tagName="";
this.id="";
this.nodeType=DOMNode.ELEMENT_NODE;
};
DOMElement.prototype=new DOMNode;
DOMElement.prototype.getTagName=function DOMElement_getTagName(){
return this.tagName;
};
DOMElement.prototype.getAttribute=function DOMElement_getAttribute(name){
var ret="";
var attr=this.attributes.getNamedItem(name);
if(attr){
ret=attr.value;
}
return ret;
};
DOMElement.prototype.setAttribute=function DOMElement_setAttribute(name,value){
var attr=this.attributes.getNamedItem(name);
if(!attr){
attr=this.ownerDocument.createAttribute(name);
}
var value=new String(value);
if(this.ownerDocument.implementation.errorChecking){
if(attr._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(!this.ownerDocument.implementation._isValidString(value)){
throw (new DOMException(DOMException.INVALID_CHARACTER_ERR));
}
}
if(this.ownerDocument.implementation._isIdDeclaration(name)){
this.id=value;
}
attr.value=value;
attr.nodeValue=value;
if(value.length>0){
attr.specified=true;
}else{
attr.specified=false;
}
this.attributes.setNamedItem(attr);
};
DOMElement.prototype.removeAttribute=function DOMElement_removeAttribute(name){
return this.attributes.removeNamedItem(name);
};
DOMElement.prototype.getAttributeNode=function DOMElement_getAttributeNode(name){
return this.attributes.getNamedItem(name);
};
DOMElement.prototype.setAttributeNode=function DOMElement_setAttributeNode(_25af){
if(this.ownerDocument.implementation._isIdDeclaration(_25af.name)){
this.id=_25af.value;
}
return this.attributes.setNamedItem(_25af);
};
DOMElement.prototype.removeAttributeNode=function DOMElement_removeAttributeNode(_25b0){
if(this.ownerDocument.implementation.errorChecking&&_25b0._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
var _25b1=this.attributes._findItemIndex(_25b0._id);
if(this.ownerDocument.implementation.errorChecking&&(_25b1<0)){
throw (new DOMException(DOMException.NOT_FOUND_ERR));
}
return this.attributes._removeChild(_25b1);
};
DOMElement.prototype.getAttributeNS=function DOMElement_getAttributeNS(_25b2,_25b3){
var ret="";
var attr=this.attributes.getNamedItemNS(_25b2,_25b3);
if(attr){
ret=attr.value;
}
return ret;
};
DOMElement.prototype.setAttributeNS=function DOMElement_setAttributeNS(_25b6,_25b7,value){
var attr=this.attributes.getNamedItem(_25b6,_25b7);
if(!attr){
attr=this.ownerDocument.createAttributeNS(_25b6,_25b7);
}
var value=new String(value);
if(this.ownerDocument.implementation.errorChecking){
if(attr._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(!this.ownerDocument._isValidNamespace(_25b6,_25b7)){
throw (new DOMException(DOMException.NAMESPACE_ERR));
}
if(!this.ownerDocument.implementation._isValidString(value)){
throw (new DOMException(DOMException.INVALID_CHARACTER_ERR));
}
}
if(this.ownerDocument.implementation._isIdDeclaration(name)){
this.id=value;
}
attr.value=value;
attr.nodeValue=value;
if(value.length>0){
attr.specified=true;
}else{
attr.specified=false;
}
this.attributes.setNamedItemNS(attr);
};
DOMElement.prototype.removeAttributeNS=function DOMElement_removeAttributeNS(_25ba,_25bb){
return this.attributes.removeNamedItemNS(_25ba,_25bb);
};
DOMElement.prototype.getAttributeNodeNS=function DOMElement_getAttributeNodeNS(_25bc,_25bd){
return this.attributes.getNamedItemNS(_25bc,_25bd);
};
DOMElement.prototype.setAttributeNodeNS=function DOMElement_setAttributeNodeNS(_25be){
if((_25be.prefix=="")&&this.ownerDocument.implementation._isIdDeclaration(_25be.name)){
this.id=_25be.value;
}
return this.attributes.setNamedItemNS(_25be);
};
DOMElement.prototype.hasAttribute=function DOMElement_hasAttribute(name){
return this.attributes._hasAttribute(name);
};
DOMElement.prototype.hasAttributeNS=function DOMElement_hasAttributeNS(_25c0,_25c1){
return this.attributes._hasAttributeNS(_25c0,_25c1);
};
DOMElement.prototype.toString=function DOMElement_toString(){
var ret="";
var ns=this._namespaces.toString();
if(ns.length>0){
ns=" "+ns;
}
var attrs=this.attributes.toString();
if(attrs.length>0){
attrs=" "+attrs;
}
ret+="<"+this.nodeName+ns+attrs+">";
ret+=this.childNodes.toString();
ret+="</"+this.nodeName+">";
return ret;
};
DOMAttr=function(_25c5){
this._class=addClass(this._class,"DOMAttr");
this.DOMNode=DOMNode;
this.DOMNode(_25c5);
this.name="";
this.specified=false;
this.value="";
this.nodeType=DOMNode.ATTRIBUTE_NODE;
this.ownerElement=null;
this.childNodes=null;
this.attributes=null;
};
DOMAttr.prototype=new DOMNode;
DOMAttr.prototype.getName=function DOMAttr_getName(){
return this.nodeName;
};
DOMAttr.prototype.getSpecified=function DOMAttr_getSpecified(){
return this.specified;
};
DOMAttr.prototype.getValue=function DOMAttr_getValue(){
return this.nodeValue;
};
DOMAttr.prototype.setValue=function DOMAttr_setValue(value){
if(this.ownerDocument.implementation.errorChecking&&this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
this.setNodeValue(value);
};
DOMAttr.prototype.setNodeValue=function DOMAttr_setNodeValue(value){
this.nodeValue=new String(value);
this.value=this.nodeValue;
this.specified=(this.value.length>0);
};
DOMAttr.prototype.toString=function DOMAttr_toString(){
var ret="";
ret+=this.nodeName+"=\""+this.__escapeString(this.nodeValue)+"\"";
return ret;
};
DOMAttr.prototype.getOwnerElement=function(){
return this.ownerElement;
};
DOMNamespace=function(_25c9){
this._class=addClass(this._class,"DOMNamespace");
this.DOMNode=DOMNode;
this.DOMNode(_25c9);
this.name="";
this.specified=false;
this.value="";
this.nodeType=DOMNode.NAMESPACE_NODE;
};
DOMNamespace.prototype=new DOMNode;
DOMNamespace.prototype.getValue=function DOMNamespace_getValue(){
return this.nodeValue;
};
DOMNamespace.prototype.setValue=function DOMNamespace_setValue(value){
this.nodeValue=new String(value);
this.value=this.nodeValue;
};
DOMNamespace.prototype.toString=function DOMNamespace_toString(){
var ret="";
if(this.nodeName!=""){
ret+=this.nodeName+"=\""+this.__escapeString(this.nodeValue)+"\"";
}else{
ret+="xmlns=\""+this.__escapeString(this.nodeValue)+"\"";
}
return ret;
};
DOMCharacterData=function(_25cc){
this._class=addClass(this._class,"DOMCharacterData");
this.DOMNode=DOMNode;
this.DOMNode(_25cc);
this.data="";
this.length=0;
};
DOMCharacterData.prototype=new DOMNode;
DOMCharacterData.prototype.getData=function DOMCharacterData_getData(){
return this.nodeValue;
};
DOMCharacterData.prototype.setData=function DOMCharacterData_setData(data){
this.setNodeValue(data);
};
DOMCharacterData.prototype.setNodeValue=function DOMCharacterData_setNodeValue(data){
if(this.ownerDocument.implementation.errorChecking&&this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
this.nodeValue=new String(data);
this.data=this.nodeValue;
this.length=this.nodeValue.length;
};
DOMCharacterData.prototype.getLength=function DOMCharacterData_getLength(){
return this.nodeValue.length;
};
DOMCharacterData.prototype.substringData=function DOMCharacterData_substringData(_25cf,count){
var ret=null;
if(this.data){
if(this.ownerDocument.implementation.errorChecking&&((_25cf<0)||(_25cf>this.data.length)||(count<0))){
throw (new DOMException(DOMException.INDEX_SIZE_ERR));
}
if(!count){
ret=this.data.substring(_25cf);
}else{
ret=this.data.substring(_25cf,_25cf+count);
}
}
return ret;
};
DOMCharacterData.prototype.appendData=function DOMCharacterData_appendData(arg){
if(this.ownerDocument.implementation.errorChecking&&this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
this.setData(""+this.data+arg);
};
DOMCharacterData.prototype.insertData=function DOMCharacterData_insertData(_25d3,arg){
if(this.ownerDocument.implementation.errorChecking&&this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(this.data){
if(this.ownerDocument.implementation.errorChecking&&((_25d3<0)||(_25d3>this.data.length))){
throw (new DOMException(DOMException.INDEX_SIZE_ERR));
}
this.setData(this.data.substring(0,_25d3).concat(arg,this.data.substring(_25d3)));
}else{
if(this.ownerDocument.implementation.errorChecking&&(_25d3!=0)){
throw (new DOMException(DOMException.INDEX_SIZE_ERR));
}
this.setData(arg);
}
};
DOMCharacterData.prototype.deleteData=function DOMCharacterData_deleteData(_25d5,count){
if(this.ownerDocument.implementation.errorChecking&&this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(this.data){
if(this.ownerDocument.implementation.errorChecking&&((_25d5<0)||(_25d5>this.data.length)||(count<0))){
throw (new DOMException(DOMException.INDEX_SIZE_ERR));
}
if(!count||(_25d5+count)>this.data.length){
this.setData(this.data.substring(0,_25d5));
}else{
this.setData(this.data.substring(0,_25d5).concat(this.data.substring(_25d5+count)));
}
}
};
DOMCharacterData.prototype.replaceData=function DOMCharacterData_replaceData(_25d7,count,arg){
if(this.ownerDocument.implementation.errorChecking&&this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(this.data){
if(this.ownerDocument.implementation.errorChecking&&((_25d7<0)||(_25d7>this.data.length)||(count<0))){
throw (new DOMException(DOMException.INDEX_SIZE_ERR));
}
this.setData(this.data.substring(0,_25d7).concat(arg,this.data.substring(_25d7+count)));
}else{
this.setData(arg);
}
};
DOMText=function(_25da){
this._class=addClass(this._class,"DOMText");
this.DOMCharacterData=DOMCharacterData;
this.DOMCharacterData(_25da);
this.nodeName="#text";
this.nodeType=DOMNode.TEXT_NODE;
};
DOMText.prototype=new DOMCharacterData;
DOMText.prototype.splitText=function DOMText_splitText(_25db){
var data,inode;
if(this.ownerDocument.implementation.errorChecking){
if(this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if((_25db<0)||(_25db>this.data.length)){
throw (new DOMException(DOMException.INDEX_SIZE_ERR));
}
}
if(this.parentNode){
data=this.substringData(_25db);
inode=this.ownerDocument.createTextNode(data);
if(this.nextSibling){
this.parentNode.insertBefore(inode,this.nextSibling);
}else{
this.parentNode.appendChild(inode);
}
this.deleteData(_25db);
}
return inode;
};
DOMText.prototype.toString=function DOMText_toString(){
return this.__escapeString(""+this.nodeValue);
};
DOMCDATASection=function(_25dd){
this._class=addClass(this._class,"DOMCDATASection");
this.DOMCharacterData=DOMCharacterData;
this.DOMCharacterData(_25dd);
this.nodeName="#cdata-section";
this.nodeType=DOMNode.CDATA_SECTION_NODE;
};
DOMCDATASection.prototype=new DOMCharacterData;
DOMCDATASection.prototype.splitText=function DOMCDATASection_splitText(_25de){
var data,inode;
if(this.ownerDocument.implementation.errorChecking){
if(this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if((_25de<0)||(_25de>this.data.length)){
throw (new DOMException(DOMException.INDEX_SIZE_ERR));
}
}
if(this.parentNode){
data=this.substringData(_25de);
inode=this.ownerDocument.createCDATASection(data);
if(this.nextSibling){
this.parentNode.insertBefore(inode,this.nextSibling);
}else{
this.parentNode.appendChild(inode);
}
this.deleteData(_25de);
}
return inode;
};
DOMCDATASection.prototype.toString=function DOMCDATASection_toString(){
var ret="";
ret+="<![CDATA["+this.nodeValue+"]]>";
return ret;
};
DOMComment=function(_25e1){
this._class=addClass(this._class,"DOMComment");
this.DOMCharacterData=DOMCharacterData;
this.DOMCharacterData(_25e1);
this.nodeName="#comment";
this.nodeType=DOMNode.COMMENT_NODE;
};
DOMComment.prototype=new DOMCharacterData;
DOMComment.prototype.toString=function DOMComment_toString(){
var ret="";
ret+="<!--"+this.nodeValue+"-->";
return ret;
};
DOMProcessingInstruction=function(_25e3){
this._class=addClass(this._class,"DOMProcessingInstruction");
this.DOMNode=DOMNode;
this.DOMNode(_25e3);
this.target="";
this.data="";
this.nodeType=DOMNode.PROCESSING_INSTRUCTION_NODE;
};
DOMProcessingInstruction.prototype=new DOMNode;
DOMProcessingInstruction.prototype.getTarget=function DOMProcessingInstruction_getTarget(){
return this.nodeName;
};
DOMProcessingInstruction.prototype.getData=function DOMProcessingInstruction_getData(){
return this.nodeValue;
};
DOMProcessingInstruction.prototype.setData=function DOMProcessingInstruction_setData(data){
this.setNodeValue(data);
};
DOMProcessingInstruction.prototype.setNodeValue=function DOMProcessingInstruction_setNodeValue(data){
if(this.ownerDocument.implementation.errorChecking&&this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
this.nodeValue=new String(data);
this.data=this.nodeValue;
};
DOMProcessingInstruction.prototype.toString=function DOMProcessingInstruction_toString(){
var ret="";
ret+="<?"+this.nodeName+" "+this.nodeValue+" ?>";
return ret;
};
DOMDocumentFragment=function(_25e7){
this._class=addClass(this._class,"DOMDocumentFragment");
this.DOMNode=DOMNode;
this.DOMNode(_25e7);
this.nodeName="#document-fragment";
this.nodeType=DOMNode.DOCUMENT_FRAGMENT_NODE;
};
DOMDocumentFragment.prototype=new DOMNode;
DOMDocumentFragment.prototype.toString=function DOMDocumentFragment_toString(){
var xml="";
var _25e9=this.getChildNodes().getLength();
for(intLoop=0;intLoop<_25e9;intLoop++){
xml+=this.getChildNodes().item(intLoop).toString();
}
return xml;
};
DOMDocumentType=function(){
alert("DOMDocumentType.constructor(): Not Implemented");
};
DOMEntity=function(){
alert("DOMEntity.constructor(): Not Implemented");
};
DOMEntityReference=function(){
alert("DOMEntityReference.constructor(): Not Implemented");
};
DOMNotation=function(){
alert("DOMNotation.constructor(): Not Implemented");
};
Strings=new Object();
Strings.WHITESPACE=" \t\n\r";
Strings.QUOTES="\"'";
Strings.isEmpty=function Strings_isEmpty(strD){
return (strD===null)||(strD.length===0);
};
Strings.indexOfNonWhitespace=function Strings_indexOfNonWhitespace(strD,iB,iE){
if(Strings.isEmpty(strD)){
return -1;
}
iB=iB||0;
iE=iE||strD.length;
for(var i=iB;i<iE;i++){
if(Strings.WHITESPACE.indexOf(strD.charAt(i))==-1){
return i;
}
}
return -1;
};
Strings.lastIndexOfNonWhitespace=function Strings_lastIndexOfNonWhitespace(strD,iB,iE){
if(Strings.isEmpty(strD)){
return -1;
}
iB=iB||0;
iE=iE||strD.length;
for(var i=iE-1;i>=iB;i--){
if(Strings.WHITESPACE.indexOf(strD.charAt(i))==-1){
return i;
}
}
return -1;
};
Strings.indexOfWhitespace=function Strings_indexOfWhitespace(strD,iB,iE){
if(Strings.isEmpty(strD)){
return -1;
}
iB=iB||0;
iE=iE||strD.length;
for(var i=iB;i<iE;i++){
if(Strings.WHITESPACE.indexOf(strD.charAt(i))!=-1){
return i;
}
}
return -1;
};
Strings.replace=function Strings_replace(strD,iB,iE,strF,strR){
if(Strings.isEmpty(strD)){
return "";
}
iB=iB||0;
iE=iE||strD.length;
return strD.substring(iB,iE).split(strF).join(strR);
};
Strings.getLineNumber=function Strings_getLineNumber(strD,iP){
if(Strings.isEmpty(strD)){
return -1;
}
iP=iP||strD.length;
return strD.substring(0,iP).split("\n").length;
};
Strings.getColumnNumber=function Strings_getColumnNumber(strD,iP){
if(Strings.isEmpty(strD)){
return -1;
}
iP=iP||strD.length;
var arrD=strD.substring(0,iP).split("\n");
var _2601=arrD[arrD.length-1];
arrD.length--;
var _2602=arrD.join("\n").length;
return iP-_2602;
};
StringBuffer=function(){
this._a=[];
};
StringBuffer.prototype.append=function StringBuffer_append(d){
this._a[this._a.length]=d;
};
StringBuffer.prototype.toString=function StringBuffer_toString(){
return this._a.join("");
};
draw2d.XMLSerializer=function(){
alert("do not init this class. Use the static methods instead");
};
draw2d.XMLSerializer.toXML=function(obj,_1cfb,_1cfc){
if(_1cfb==undefined){
_1cfb="model";
}
_1cfc=_1cfc?_1cfc:"";
var t=draw2d.XMLSerializer.getTypeName(obj);
var s=_1cfc+"<"+_1cfb+" type=\""+t+"\">";
switch(t){
case "int":
case "number":
case "boolean":
s+=obj;
break;
case "string":
s+=draw2d.XMLSerializer.xmlEncode(obj);
break;
case "date":
s+=obj.toLocaleString();
break;
case "Array":
case "array":
s+="\n";
var _1cff=_1cfc+"   ";
for(var i=0;i<obj.length;i++){
s+=draw2d.XMLSerializer.toXML(obj[i],("element"),_1cff);
}
s+=_1cfc;
break;
default:
if(obj!==null){
s+="\n";
if(obj instanceof draw2d.ArrayList){
obj.trimToSize();
}
var _1d01=obj.getPersistentAttributes();
var _1cff=_1cfc+"   ";
for(var name in _1d01){
s+=draw2d.XMLSerializer.toXML(_1d01[name],name,_1cff);
}
s+=_1cfc;
}
break;
}
s+="</"+_1cfb+">\n";
return s;
};
draw2d.XMLSerializer.isSimpleVar=function(t){
switch(t){
case "int":
case "string":
case "String":
case "Number":
case "number":
case "Boolean":
case "boolean":
case "bool":
case "dateTime":
case "Date":
case "date":
case "float":
return true;
}
return false;
};
draw2d.XMLSerializer.getTypeName=function(obj){
if(obj===null){
return "undefined";
}
if(obj instanceof Array){
return "Array";
}
if(obj instanceof Date){
return "Date";
}
var t=typeof (obj);
if(t=="number"){
return (parseInt(obj).toString()==obj)?"int":"number";
}
if(draw2d.XMLSerializer.isSimpleVar(t)){
return t;
}
return obj.type.replace("@NAMESPACE"+"@","");
};
draw2d.XMLSerializer.xmlEncode=function(_1d06){
var _1d07=_1d06;
var amp=/&/gi;
var gt=/>/gi;
var lt=/</gi;
var quot=/"/gi;
var apos=/'/gi;
var _1d0d="&#62;";
var _1d0e="&#38;#60;";
var _1d0f="&#38;#38;";
var _1d10="&#34;";
var _1d11="&#39;";
_1d07=_1d07.replace(amp,_1d0f);
_1d07=_1d07.replace(quot,_1d10);
_1d07=_1d07.replace(lt,_1d0e);
_1d07=_1d07.replace(gt,_1d0d);
_1d07=_1d07.replace(apos,_1d11);
return _1d07;
};
draw2d.XMLDeserializer=function(){
alert("do not init this class. Use the static methods instead");
};
draw2d.XMLDeserializer.fromXML=function(node,_272c){
var _272d=""+node.getAttributes().getNamedItem("type").getNodeValue();
var value=node.getNodeValue();
switch(_272d){
case "int":
try{
return parseInt(""+node.getChildNodes().item(0).getNodeValue());
}
catch(e){
alert("Error:"+e+"\nDataType:"+_272d+"\nXML Node:"+node);
}
case "string":
case "String":
try{
if(node.getChildNodes().getLength()>0){
return ""+node.getChildNodes().item(0).getNodeValue();
}
return "";
}
catch(e){
alert("Error:"+e+"\nDataType:"+_272d+"\nXML Node:"+node);
}
case "Number":
case "number":
try{
return parseFloat(""+node.getChildNodes().item(0).getNodeValue());
}
catch(e){
alert("Error:"+e+"\nDataType:"+_272d+"\nXML Node:"+node);
}
case "Boolean":
case "boolean":
case "bool":
try{
return "true"==(""+node.getChildNodes().item(0).getNodeValue()).toLowerCase();
}
catch(e){
alert("Error:"+e+"\nDataType:"+_272d+"\nXML Node:"+node);
}
case "dateTime":
case "Date":
case "date":
try{
return new Date(""+node.getChildNodes().item(0).getNodeValue());
}
catch(e){
alert("Error:"+e+"\nDataType:"+_272d+"\nXML Node:"+node);
}
case "float":
try{
return parseFloat(""+node.getChildNodes().item(0).getNodeValue());
}
catch(e){
alert("Error:"+e+"\nDataType:"+_272d+"\nXML Node:"+node);
}
break;
}
_272d=_272d.replace("@NAMESPACE"+"@","");
var obj=eval("new "+_272d+"()");
if(_272c!=undefined&&obj.setModelParent!=undefined){
obj.setModelParent(_272c);
}
var _2730=node.getChildNodes();
for(var i=0;i<_2730.length;i++){
var child=_2730.item(i);
var _2733=child.getNodeName();
if(obj instanceof Array){
_2733=i;
}
obj[_2733]=draw2d.XMLDeserializer.fromXML(child,obj instanceof draw2d.AbstractObjectModel?obj:_272c);
}
return obj;
};
draw2d.EditPolicy=function(_241e){
this.policy=_241e;
};
draw2d.EditPolicy.DELETE="DELETE";
draw2d.EditPolicy.MOVE="MOVE";
draw2d.EditPolicy.CONNECT="CONNECT";
draw2d.EditPolicy.RESIZE="RESIZE";
draw2d.EditPolicy.prototype.type="draw2d.EditPolicy";
draw2d.EditPolicy.prototype.getPolicy=function(){
return this.policy;
};
draw2d.AbstractPalettePart=function(){
this.x=0;
this.y=0;
this.html=null;
};
draw2d.AbstractPalettePart.prototype.type="draw2d.AbstractPalettePart";
draw2d.AbstractPalettePart.prototype=new draw2d.Draggable();
draw2d.AbstractPalettePart.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.height="24px";
item.style.width="24px";
return item;
};
draw2d.AbstractPalettePart.prototype.setEnviroment=function(_39bb,_39bc){
this.palette=_39bc;
this.workflow=_39bb;
};
draw2d.AbstractPalettePart.prototype.getHTMLElement=function(){
if(this.html===null){
this.html=this.createHTMLElement();
draw2d.Draggable.call(this,this.html);
}
return this.html;
};
draw2d.AbstractPalettePart.prototype.onDrop=function(_39bd,_39be){
var _39bf=this.workflow.getScrollLeft();
var _39c0=this.workflow.getScrollTop();
var _39c1=this.workflow.getAbsoluteX();
var _39c2=this.workflow.getAbsoluteY();
this.setPosition(this.x,this.y);
this.execute(_39bd+_39bf-_39c1,_39be+_39c0-_39c2);
};
draw2d.AbstractPalettePart.prototype.execute=function(x,y){
alert("inerited class should override the method 'draw2d.AbstractPalettePart.prototype.execute'");
};
draw2d.AbstractPalettePart.prototype.setTooltip=function(_39c5){
this.tooltip=_39c5;
if(this.tooltip!==null){
this.html.title=this.tooltip;
}else{
this.html.title="";
}
};
draw2d.AbstractPalettePart.prototype.setDimension=function(w,h){
this.width=w;
this.height=h;
if(this.html===null){
return;
}
this.html.style.width=this.width+"px";
this.html.style.height=this.height+"px";
};
draw2d.AbstractPalettePart.prototype.setPosition=function(xPos,yPos){
this.x=Math.max(0,xPos);
this.y=Math.max(0,yPos);
if(this.html===null){
return;
}
this.html.style.left=this.x+"px";
this.html.style.top=this.y+"px";
this.html.style.cursor="move";
};
draw2d.AbstractPalettePart.prototype.getWidth=function(){
return this.width;
};
draw2d.AbstractPalettePart.prototype.getHeight=function(){
return this.height;
};
draw2d.AbstractPalettePart.prototype.getY=function(){
return this.y;
};
draw2d.AbstractPalettePart.prototype.getX=function(){
return this.x;
};
draw2d.AbstractPalettePart.prototype.getPosition=function(){
return new draw2d.Point(this.x,this.y);
};
draw2d.AbstractPalettePart.prototype.disableTextSelection=function(e){
if(typeof e.onselectstart!="undefined"){
e.onselectstart=function(){
return false;
};
}else{
if(typeof e.style.MozUserSelect!="undefined"){
e.style.MozUserSelect="none";
}
}
};
draw2d.ExternalPalette=function(_21b5,divId){
this.html=document.getElementById(divId);
this.workflow=_21b5;
this.parts=new draw2d.ArrayList();
};
draw2d.ExternalPalette.prototype.type="draw2d.ExternalPalette";
draw2d.ExternalPalette.prototype.getHTMLElement=function(){
return this.html;
};
draw2d.ExternalPalette.prototype.addPalettePart=function(part){
if(!(part instanceof draw2d.AbstractPalettePart)){
throw "parameter is not instanceof [draw2d.AbstractPalettePart]";
}
this.parts.add(part);
this.html.appendChild(part.getHTMLElement());
part.setEnviroment(this.workflow,this);
};
