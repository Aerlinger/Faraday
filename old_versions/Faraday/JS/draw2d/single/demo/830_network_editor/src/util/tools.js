function ellipsis(e){
var w=e.getWidth()-10;
var t=e.innerHTML;
var title=t.replace(/<br>/g,"");
var _21a0=false;
e.innerHTML="<span>"+t+"</span>";
e=e.down();
var cut=0;
while(t.length>0&&e.getWidth()>=w){
var _21a2=(t.length-cut/2);
text="..."+t.substr(cut,t.length-1);
e.innerHTML=text;
_21a0=true;
cut+=1;
}
if(_21a0){
e.setAttribute("title",title);
}
}
draw2d.IdGenerator=function(){
alert("Don't create an instance of this class. Call draw2d.IdGenerator.getNext()");
};
draw2d.IdGenerator.nextId=0;
draw2d.IdGenerator.getNext=function(){
draw2d.IdGenerator.nextId+=1;
return draw2d.IdGenerator.nextId-1;
};
draw2d.IdGenerator.reserve=function(id){
id=parseInt(id,10);
if(isNaN(id)){
id=0;
}
draw2d.IdGenerator.nextId=Math.max(draw2d.IdGenerator.nextId,id+1);
};
function urlParam(_21a4){
_21a4=_21a4.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
var _21a5="[\\?&]"+_21a4+"=([^&#]*)";
var regex=new RegExp(_21a5);
var _21a7=regex.exec(window.location.href);
if(_21a7===null){
return "";
}
return _21a7[1];
}
function loadDocument(docId){
var req=new Ajax.Request(draw2d.Configuration.GET_XML+"?xml="+docId,{method:"get",onFailure:function(_21aa){
editor=new draw2d.NetworkCloudGraphicalEditor("paintarea",true);
editor.setModel(new draw2d.VirtualNetworkCloudModel());
editor.setFatalError(draw2d.I18N.ERRORMESSAGE_WRONG_MODELURL+draw2d.Configuration.GET_XML+"?xml="+docId);
resize();
},onSuccess:function(_21ab){
try{
var model=null;
var _21ad=null;
if(_21ab.responseText.indexOf("<vnetwork")!==-1){
model=draw2d.ModelXMLDeserializer.fromXML(_21ab.responseXML.firstChild);
}
if(model===null){
model=new draw2d.VirtualNetworkCloudModel();
_21ad=draw2d.I18N.ERRORMESSAGE_NULL_MODEL;
}
editor=new draw2d.NetworkCloudGraphicalEditor("paintarea",false);
editor.setModel(model);
if(_21ad!=null){
editor.setFatalError(_21ad);
}
resize();
}
catch(e){
alert("Edit Document\n"+e+"\n"+_errorStack_+"\n");
}
}});
}
function TransparentMessage(msg){
this.msg=msg;
}
TransparentMessage.prototype.show=function(){
var _21af=$("body");
this.center=document.createElement("center");
this.center.id="transparentMessage";
this.center.style.padding="20px";
this.center.style.position="absolute";
this.center.style.top="0px";
this.center.style.width="100%";
this.center.style.opacity="0.001";
this.center.style.filter="alpha(opacity=1)";
var _21b0=document.createElement("div");
this.center.appendChild(_21b0);
_21b0.innerHTML=this.msg;
_21b0.className="transparent_message";
_21b0.style.backgroundColor="#8CC73F";
_21b0.style.color="white";
_21b0.style.width="300px";
_21b0.style.fontWeight="bold";
_21b0.style.fontSize="15pt";
_21b0.style.position="relative";
_21af.appendChild(this.center);
var x=new fx.Opacity("transparentMessage",{duration:300}).custom(0.001,0.8);
var y=new fx.Interval(function(){
try{
var z1=new fx.Opacity("transparentMessage",{duration:1000}).custom(0.8,0);
var z2=new fx.Top("transparentMessage",{duration:1500,onComplete:function(){
$("transparentMessage").remove();
}}).custom(0,-100);
}
catch(e){
alert(e);
}
},1);
};
