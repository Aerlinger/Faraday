var fx=new Object();
fx.Base=function(){
};
fx.Base.prototype={setOptions:function(_3987){
this.options={duration:500,onComplete:"",transition:fx.sinoidal};
Object.extend(this.options,_3987||{});
},step:function(){
var time=(new Date).getTime();
if(time>=this.options.duration+this.startTime){
this.now=this.to;
clearInterval(this.timer);
this.timer=null;
if(this.options.onComplete){
setTimeout(this.options.onComplete.bind(this),10);
}
}else{
var Tpos=(time-this.startTime)/(this.options.duration);
this.now=this.options.transition(Tpos)*(this.to-this.from)+this.from;
}
this.increase();
},custom:function(from,to){
if(this.timer!=null){
return;
}
this.from=from;
this.to=to;
this.startTime=(new Date).getTime();
this.timer=setInterval(this.step.bind(this),13);
},compute:function(from,to){
var _398e=to-from;
return this.options.transition(this.cTime,from,_398e,this.options.duration);
},hide:function(){
this.now=0;
this.increase();
},clearTimer:function(){
clearInterval(this.timer);
this.timer=null;
}};
fx.Color=Class.create();
Object.extend(Object.extend(fx.Color.prototype,fx.Base.prototype),{initialize:function(el,_3990,_3991){
this.el=$(el);
this.now={};
this.property=_3990.camelize();
this.setOptions(_3991);
},step:function(){
var time=(new Date).getTime();
if(time>=this.options.duration+this.startTime){
this.now=this.to;
clearInterval(this.timer);
this.timer=null;
if(this.options.onComplete){
setTimeout(this.options.onComplete.bind(this),10);
}
}else{
var Tpos=this.options.transition((time-this.startTime)/(this.options.duration));
this.now[0]=parseInt(Tpos*(this.to[0]-this.from[0])+this.from[0]);
this.now[1]=parseInt(Tpos*(this.to[1]-this.from[1])+this.from[1]);
this.now[2]=parseInt(Tpos*(this.to[2]-this.from[2])+this.from[2]);
}
this.increase();
},clearTimer:function(){
clearInterval(this.timer);
this.timer=null;
},custom:function(from,to){
if(this.timer!=null){
return;
}
this.from=from.hexToRgb(true);
this.to=to.hexToRgb(true);
this.startTime=(new Date).getTime();
this.timer=setInterval(this.step.bind(this),13);
},set:function(to){
this.now=to.hexToRgb(true);
this.increase();
},increase:function(){
this.el.style[this.property]="rgb("+this.now[0]+","+this.now[1]+","+this.now[2]+")";
}});
fx.Interval=Class.create();
fx.Interval.prototype={initialize:function(_3997,_3998,count){
if(typeof _3997=="function"){
var index=0;
var _399b=window.setInterval(function(){
try{
_3997();
}
catch(e){
}
if(++index==(count||1)){
window.clearInterval(_399b);
}
},(_3998||5)*1000);
}
}};
fx.Scroll=Class.create();
Object.extend(Object.extend(fx.Scroll.prototype,fx.Base.prototype),{initialize:function(el,_399d){
this.el=$(el);
this.options={duration:500,onComplete:"",transition:fx.sinoidal};
},step:function(){
var time=(new Date).getTime();
if(time>=this.options.duration+this.startTime){
this.nowX=this.toX;
this.nowY=this.toY;
clearInterval(this.timer);
this.timer=null;
if(this.options.onComplete){
setTimeout(this.options.onComplete.bind(this),10);
}
}else{
var Tpos=(time-this.startTime)/(this.options.duration);
this.nowX=this.options.transition(Tpos)*(this.toX-this.fromX)+this.fromX;
this.nowY=this.options.transition(Tpos)*(this.toY-this.fromY)+this.fromY;
}
this.increase();
},scrollTo:function(x,y){
this.custom(x,y);
},custom:function(toX,toY){
if(this.timer!=null){
return;
}
this.fromX=this.el.scrollLeft;
this.fromY=this.el.scrollTop;
this.toX=toX;
this.toY=toY;
this.startTime=(new Date).getTime();
this.timer=setInterval(this.step.bind(this),13);
},clearTimer:function(){
clearInterval(this.timer);
this.timer=null;
},increase:function(){
this.el.scrollLeft=this.nowX;
this.el.scrollTop=this.nowY;
}});
fx.Layout=Class.create();
fx.Layout.prototype=Object.extend(new fx.Base(),{initialize:function(el,_39a5){
this.el=$(el);
this.el.style.overflow="hidden";
this.iniWidth=this.el.offsetWidth;
this.iniHeight=this.el.offsetHeight;
this.setOptions(_39a5);
}});
fx.Top=Class.create();
Object.extend(Object.extend(fx.Top.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.top=this.now+"px";
}});
fx.Left=Class.create();
Object.extend(Object.extend(fx.Left.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.left=this.now+"px";
}});
fx.Height=Class.create();
Object.extend(Object.extend(fx.Height.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.height=this.now+"px";
},toggle:function(){
if(this.el.offsetHeight>0){
this.custom(this.el.offsetHeight,0);
}else{
this.custom(0,this.el.scrollHeight);
}
}});
fx.Width=Class.create();
Object.extend(Object.extend(fx.Width.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.width=this.now+"px";
},toggle:function(){
if(this.el.offsetWidth>0){
this.custom(this.el.offsetWidth,0);
}else{
this.custom(0,this.iniWidth);
}
}});
fx.Opacity=Class.create();
fx.Opacity.prototype=Object.extend(new fx.Base(),{initialize:function(el,_39a7){
this.el=$(el);
this.setOptions(_39a7);
},increase:function(){
if(this.now==1&&(/Firefox/.test(navigator.userAgent))){
this.now=0.9999;
}
this.setOpacity(this.now);
},setOpacity:function(_39a8){
if(_39a8==0&&this.el.style.visibility!="hidden"){
this.el.style.visibility="hidden";
}else{
if(this.el.style.visibility!="visible"){
this.el.style.visibility="visible";
}
}
if(window.ActiveXObject){
this.el.style.filter="alpha(opacity="+_39a8*100+")";
}
this.el.style.opacity=_39a8;
},toggle:function(){
if(this.now>0){
this.custom(1,0);
}else{
this.custom(0,1);
}
}});
fx.sinoidal=function(pos){
return ((-Math.cos(pos*Math.PI)/2)+0.5);
};
fx.linear=function(pos){
return pos;
};
fx.cubic=function(pos){
return Math.pow(pos,3);
};
fx.circ=function(pos){
return Math.sqrt(pos);
};
