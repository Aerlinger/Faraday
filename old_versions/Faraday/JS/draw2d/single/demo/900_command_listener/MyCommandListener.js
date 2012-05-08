draw2d.MyCommandListener=function(){
draw2d.CommandStackEventListener.call(this);
};
draw2d.MyCommandListener.prototype=new draw2d.CommandStackEventListener;
draw2d.MyCommandListener.prototype.type="draw2d.MyCommandListener";
draw2d.MyCommandListener.prototype.stackChanged=function(event){
var _30f8=document.getElementById("log");
var log=document.createElement("div");
if(event.isPostChangeEvent()){
log.innerHTML="POST:";
}else{
log.innerHTML="PRE:";
}
var _30fa=event.getDetails();
if(0!=(_30fa&(draw2d.CommandStack.PRE_EXECUTE|draw2d.CommandStack.POST_EXECUTE))){
log.innerHTML=log.innerHTML+" EXECUTE";
}else{
if(0!=(_30fa&(draw2d.CommandStack.PRE_UNDO|draw2d.CommandStack.POST_UNDO))){
log.innerHTML=log.innerHTML+" UNDO";
}else{
if(0!=(_30fa&(draw2d.CommandStack.PRE_REDO|draw2d.CommandStack.POST_REDO))){
log.innerHTML=log.innerHTML+" REDO";
}
}
}
var _30fb=event.getCommand();
if(_30fb instanceof draw2d.CommandAdd){
log.innerHTML=log.innerHTML+" => ADD Element";
}else{
if(_30fb instanceof draw2d.CommandConnect){
log.innerHTML=log.innerHTML+" => Connect two Ports";
}else{
if(_30fb instanceof draw2d.CommandDelete){
log.innerHTML=log.innerHTML+" => Delete Element";
}else{
if(_30fb instanceof draw2d.CommandMove){
log.innerHTML=log.innerHTML+" => Moving Element";
}else{
if(_30fb instanceof draw2d.CommandResize){
log.innerHTML=log.innerHTML+" => Resize Element";
}
}
}
}
}
_30f8.appendChild(log);
};
