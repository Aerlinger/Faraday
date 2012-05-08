String.prototype.parseColor=function(){
var color="#";
if(this.slice(0,4)=="rgb("){
var cols=this.slice(4,this.length-1).split(",");
var i=0;
do{
color+=parseInt(cols[i]).toColorPart();
}while(++i<3);
}else{
if(this.slice(0,1)=="#"){
if(this.length==4){
for(var i=1;i<4;i++){
color+=(this.charAt(i)+this.charAt(i)).toLowerCase();
}
}
if(this.length==7){
color=this.toLowerCase();
}
}
}
return (color.length==7?color:(arguments[0]||this));
};
Element.collectTextNodes=function(_2cbe){
return $A($(_2cbe).childNodes).collect(function(node){
return (node.nodeType==3?node.nodeValue:(node.hasChildNodes()?Element.collectTextNodes(node):""));
}).flatten().join("");
};
Element.collectTextNodesIgnoreClass=function(_2cc0,_2cc1){
return $A($(_2cc0).childNodes).collect(function(node){
return (node.nodeType==3?node.nodeValue:((node.hasChildNodes()&&!Element.hasClassName(node,_2cc1))?Element.collectTextNodesIgnoreClass(node,_2cc1):""));
}).flatten().join("");
};
Element.setContentZoom=function(_2cc3,_2cc4){
_2cc3=$(_2cc3);
_2cc3.setStyle({fontSize:(_2cc4/100)+"em"});
if(navigator.appVersion.indexOf("AppleWebKit")>0){
window.scrollBy(0,0);
}
return _2cc3;
};
Element.getOpacity=function(_2cc5){
return $(_2cc5).getStyle("opacity");
};
Element.setOpacity=function(_2cc6,value){
return $(_2cc6).setStyle({opacity:value});
};
Element.getInlineOpacity=function(_2cc8){
return $(_2cc8).style.opacity||"";
};
Element.forceRerendering=function(_2cc9){
try{
_2cc9=$(_2cc9);
var n=document.createTextNode(" ");
_2cc9.appendChild(n);
_2cc9.removeChild(n);
}
catch(e){
}
};
Array.prototype.call=function(){
var args=arguments;
this.each(function(f){
f.apply(this,args);
});
};
var Effect={_elementDoesNotExistError:{name:"ElementDoesNotExistError",message:"The specified DOM element does not exist, but is required for this effect to operate"},tagifyText:function(_2ccd){
if(typeof Builder=="undefined"){
throw ("Effect.tagifyText requires including script.aculo.us' builder.js library");
}
var _2cce="position:relative";
if(/MSIE/.test(navigator.userAgent)&&!window.opera){
_2cce+=";zoom:1";
}
_2ccd=$(_2ccd);
$A(_2ccd.childNodes).each(function(child){
if(child.nodeType==3){
child.nodeValue.toArray().each(function(_2cd0){
_2ccd.insertBefore(Builder.node("span",{style:_2cce},_2cd0==" "?String.fromCharCode(160):_2cd0),child);
});
Element.remove(child);
}
});
},multiple:function(_2cd1,_2cd2){
var _2cd3;
if(((typeof _2cd1=="object")||(typeof _2cd1=="function"))&&(_2cd1.length)){
_2cd3=_2cd1;
}else{
_2cd3=$(_2cd1).childNodes;
}
var _2cd4=Object.extend({speed:0.1,delay:0},arguments[2]||{});
var _2cd5=_2cd4.delay;
$A(_2cd3).each(function(_2cd6,index){
new _2cd2(_2cd6,Object.extend(_2cd4,{delay:index*_2cd4.speed+_2cd5}));
});
},PAIRS:{"slide":["SlideDown","SlideUp"],"blind":["BlindDown","BlindUp"],"appear":["Appear","Fade"]},toggle:function(_2cd8,_2cd9){
_2cd8=$(_2cd8);
_2cd9=(_2cd9||"appear").toLowerCase();
var _2cda=Object.extend({queue:{position:"end",scope:(_2cd8.id||"global"),limit:1}},arguments[2]||{});
Effect[_2cd8.visible()?Effect.PAIRS[_2cd9][1]:Effect.PAIRS[_2cd9][0]](_2cd8,_2cda);
}};
var Effect2=Effect;
Effect.Transitions={linear:Prototype.K,sinoidal:function(pos){
return (-Math.cos(pos*Math.PI)/2)+0.5;
},reverse:function(pos){
return 1-pos;
},flicker:function(pos){
return ((-Math.cos(pos*Math.PI)/4)+0.75)+Math.random()/4;
},wobble:function(pos){
return (-Math.cos(pos*Math.PI*(9*pos))/2)+0.5;
},pulse:function(pos,_2ce0){
_2ce0=_2ce0||5;
return (Math.round((pos%(1/_2ce0))*_2ce0)===0?((pos*_2ce0*2)-Math.floor(pos*_2ce0*2)):1-((pos*_2ce0*2)-Math.floor(pos*_2ce0*2)));
},none:function(pos){
return 0;
},full:function(pos){
return 1;
}};
Effect.ScopedQueue=Class.create();
Object.extend(Object.extend(Effect.ScopedQueue.prototype,Enumerable),{initialize:function(){
this.effects=[];
this.interval=null;
},_each:function(_2ce3){
this.effects._each(_2ce3);
},add:function(_2ce4){
var _2ce5=new Date().getTime();
var _2ce6=(typeof _2ce4.options.queue=="string")?_2ce4.options.queue:_2ce4.options.queue.position;
switch(_2ce6){
case "front":
this.effects.findAll(function(e){
return e.state=="idle";
}).each(function(e){
e.startOn+=_2ce4.finishOn;
e.finishOn+=_2ce4.finishOn;
});
break;
case "with-last":
_2ce5=this.effects.pluck("startOn").max()||_2ce5;
break;
case "end":
_2ce5=this.effects.pluck("finishOn").max()||_2ce5;
break;
}
_2ce4.startOn+=_2ce5;
_2ce4.finishOn+=_2ce5;
if(!_2ce4.options.queue.limit||(this.effects.length<_2ce4.options.queue.limit)){
this.effects.push(_2ce4);
}
if(!this.interval){
this.interval=setInterval(this.loop.bind(this),15);
}
},remove:function(_2ce9){
this.effects=this.effects.reject(function(e){
return e==_2ce9;
});
if(this.effects.length===0){
clearInterval(this.interval);
this.interval=null;
}
},loop:function(){
var _2ceb=new Date().getTime();
for(var i=0,len=this.effects.length;i<len;i++){
if(this.effects[i]){
this.effects[i].loop(_2ceb);
}
}
}});
Effect.Queues={instances:$H(),get:function(_2ced){
if(typeof _2ced!="string"){
return _2ced;
}
if(!this.instances[_2ced]){
this.instances[_2ced]=new Effect.ScopedQueue();
}
return this.instances[_2ced];
}};
Effect.Queue=Effect.Queues.get("global");
Effect.DefaultOptions={transition:Effect.Transitions.sinoidal,duration:1,fps:60,sync:false,from:0,to:1,delay:0,queue:"parallel"};
Effect.Base=function(){
};
Effect.Base.prototype={position:null,start:function(_2cee){
this.options=Object.extend(Object.extend({},Effect.DefaultOptions),_2cee||{});
this.currentFrame=0;
this.state="idle";
this.startOn=this.options.delay*1000;
this.finishOn=this.startOn+(this.options.duration*1000);
this.event("beforeStart");
if(!this.options.sync){
Effect.Queues.get(typeof this.options.queue=="string"?"global":this.options.queue.scope).add(this);
}
},loop:function(_2cef){
if(_2cef>=this.startOn){
if(_2cef>=this.finishOn){
this.render(1);
this.cancel();
this.event("beforeFinish");
if(this.finish){
this.finish();
}
this.event("afterFinish");
return;
}
var pos=(_2cef-this.startOn)/(this.finishOn-this.startOn);
var frame=Math.round(pos*this.options.fps*this.options.duration);
if(frame>this.currentFrame){
this.render(pos);
this.currentFrame=frame;
}
}
},render:function(pos){
if(this.state=="idle"){
this.state="running";
this.event("beforeSetup");
if(this.setup){
this.setup();
}
this.event("afterSetup");
}
if(this.state=="running"){
if(this.options.transition){
pos=this.options.transition(pos);
}
pos*=(this.options.to-this.options.from);
pos+=this.options.from;
this.position=pos;
this.event("beforeUpdate");
if(this.update){
this.update(pos);
}
this.event("afterUpdate");
}
},cancel:function(){
if(!this.options.sync){
Effect.Queues.get(typeof this.options.queue=="string"?"global":this.options.queue.scope).remove(this);
}
this.state="finished";
},event:function(_2cf3){
if(this.options[_2cf3+"Internal"]){
this.options[_2cf3+"Internal"](this);
}
if(this.options[_2cf3]){
this.options[_2cf3](this);
}
},inspect:function(){
var data=$H();
for(property in this){
if(typeof this[property]!="function"){
data[property]=this[property];
}
}
return "#<Effect:"+data.inspect()+",options:"+$H(this.options).inspect()+">";
}};
Effect.Parallel=Class.create();
Object.extend(Object.extend(Effect.Parallel.prototype,Effect.Base.prototype),{initialize:function(_2cf5){
this.effects=_2cf5||[];
this.start(arguments[1]);
},update:function(_2cf6){
this.effects.invoke("render",_2cf6);
},finish:function(_2cf7){
this.effects.each(function(_2cf8){
_2cf8.render(1);
_2cf8.cancel();
_2cf8.event("beforeFinish");
if(_2cf8.finish){
_2cf8.finish(_2cf7);
}
_2cf8.event("afterFinish");
});
}});
Effect.Event=Class.create();
Object.extend(Object.extend(Effect.Event.prototype,Effect.Base.prototype),{initialize:function(){
var _2cf9=Object.extend({duration:0},arguments[0]||{});
this.start(_2cf9);
},update:Prototype.emptyFunction});
Effect.Opacity=Class.create();
Object.extend(Object.extend(Effect.Opacity.prototype,Effect.Base.prototype),{initialize:function(_2cfa){
this.element=$(_2cfa);
if(!this.element){
throw (Effect._elementDoesNotExistError);
}
if(/MSIE/.test(navigator.userAgent)&&!window.opera&&(!this.element.currentStyle.hasLayout)){
this.element.setStyle({zoom:1});
}
var _2cfb=Object.extend({from:this.element.getOpacity()||0,to:1},arguments[1]||{});
this.start(_2cfb);
},update:function(_2cfc){
this.element.setOpacity(_2cfc);
}});
Effect.Move=Class.create();
Object.extend(Object.extend(Effect.Move.prototype,Effect.Base.prototype),{initialize:function(_2cfd){
this.element=$(_2cfd);
if(!this.element){
throw (Effect._elementDoesNotExistError);
}
var _2cfe=Object.extend({x:0,y:0,mode:"relative"},arguments[1]||{});
this.start(_2cfe);
},setup:function(){
this.element.makePositioned();
this.originalLeft=parseFloat(this.element.getStyle("left")||"0");
this.originalTop=parseFloat(this.element.getStyle("top")||"0");
if(this.options.mode=="absolute"){
this.options.x=this.options.x-this.originalLeft;
this.options.y=this.options.y-this.originalTop;
}
},update:function(_2cff){
this.element.setStyle({left:Math.round(this.options.x*_2cff+this.originalLeft)+"px",top:Math.round(this.options.y*_2cff+this.originalTop)+"px"});
}});
Effect.MoveBy=function(_2d00,toTop,_2d02){
return new Effect.Move(_2d00,Object.extend({x:_2d02,y:toTop},arguments[3]||{}));
};
Effect.Scale=Class.create();
Object.extend(Object.extend(Effect.Scale.prototype,Effect.Base.prototype),{initialize:function(_2d03,_2d04){
this.element=$(_2d03);
if(!this.element){
throw (Effect._elementDoesNotExistError);
}
var _2d05=Object.extend({scaleX:true,scaleY:true,scaleContent:true,scaleFromCenter:false,scaleMode:"box",scaleFrom:100,scaleTo:_2d04},arguments[2]||{});
this.start(_2d05);
},setup:function(){
this.restoreAfterFinish=this.options.restoreAfterFinish||false;
this.elementPositioning=this.element.getStyle("position");
this.originalStyle={};
["top","left","width","height","fontSize"].each(function(k){
this.originalStyle[k]=this.element.style[k];
}.bind(this));
this.originalTop=this.element.offsetTop;
this.originalLeft=this.element.offsetLeft;
var _2d07=this.element.getStyle("font-size")||"100%";
["em","px","%","pt"].each(function(_2d08){
if(_2d07.indexOf(_2d08)>0){
this.fontSize=parseFloat(_2d07);
this.fontSizeType=_2d08;
}
}.bind(this));
this.factor=(this.options.scaleTo-this.options.scaleFrom)/100;
this.dims=null;
if(this.options.scaleMode=="box"){
this.dims=[this.element.offsetHeight,this.element.offsetWidth];
}
if(/^content/.test(this.options.scaleMode)){
this.dims=[this.element.scrollHeight,this.element.scrollWidth];
}
if(!this.dims){
this.dims=[this.options.scaleMode.originalHeight,this.options.scaleMode.originalWidth];
}
},update:function(_2d09){
var _2d0a=(this.options.scaleFrom/100)+(this.factor*_2d09);
if(this.options.scaleContent&&this.fontSize){
this.element.setStyle({fontSize:this.fontSize*_2d0a+this.fontSizeType});
}
this.setDimensions(this.dims[0]*_2d0a,this.dims[1]*_2d0a);
},finish:function(_2d0b){
if(this.restoreAfterFinish){
this.element.setStyle(this.originalStyle);
}
},setDimensions:function(_2d0c,width){
var d={};
if(this.options.scaleX){
d.width=Math.round(width)+"px";
}
if(this.options.scaleY){
d.height=Math.round(_2d0c)+"px";
}
if(this.options.scaleFromCenter){
var topd=(_2d0c-this.dims[0])/2;
var leftd=(width-this.dims[1])/2;
if(this.elementPositioning=="absolute"){
if(this.options.scaleY){
d.top=this.originalTop-topd+"px";
}
if(this.options.scaleX){
d.left=this.originalLeft-leftd+"px";
}
}else{
if(this.options.scaleY){
d.top=-topd+"px";
}
if(this.options.scaleX){
d.left=-leftd+"px";
}
}
}
this.element.setStyle(d);
}});
Effect.Highlight=Class.create();
Object.extend(Object.extend(Effect.Highlight.prototype,Effect.Base.prototype),{initialize:function(_2d11){
this.element=$(_2d11);
if(!this.element){
throw (Effect._elementDoesNotExistError);
}
var _2d12=Object.extend({startcolor:"#ffff99"},arguments[1]||{});
this.start(_2d12);
},setup:function(){
if(this.element.getStyle("display")=="none"){
this.cancel();
return;
}
this.oldStyle={};
if(!this.options.keepBackgroundImage){
this.oldStyle.backgroundImage=this.element.getStyle("background-image");
this.element.setStyle({backgroundImage:"none"});
}
if(!this.options.endcolor){
this.options.endcolor=this.element.getStyle("background-color").parseColor("#ffffff");
}
if(!this.options.restorecolor){
this.options.restorecolor=this.element.getStyle("background-color");
}
this._base=$R(0,2).map(function(i){
return parseInt(this.options.startcolor.slice(i*2+1,i*2+3),16);
}.bind(this));
this._delta=$R(0,2).map(function(i){
return parseInt(this.options.endcolor.slice(i*2+1,i*2+3),16)-this._base[i];
}.bind(this));
},update:function(_2d15){
this.element.setStyle({backgroundColor:$R(0,2).inject("#",function(m,v,i){
return m+(Math.round(this._base[i]+(this._delta[i]*_2d15)).toColorPart());
}.bind(this))});
},finish:function(){
this.element.setStyle(Object.extend(this.oldStyle,{backgroundColor:this.options.restorecolor}));
}});
Effect.ScrollTo=Class.create();
Object.extend(Object.extend(Effect.ScrollTo.prototype,Effect.Base.prototype),{initialize:function(_2d19){
this.element=$(_2d19);
this.start(arguments[1]||{});
},setup:function(){
Position.prepare();
var _2d1a=Position.cumulativeOffset(this.element);
if(this.options.offset){
_2d1a[1]+=this.options.offset;
}
var max=window.innerHeight?window.height-window.innerHeight:document.body.scrollHeight-(document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight);
this.scrollStart=Position.deltaY;
this.delta=(_2d1a[1]>max?max:_2d1a[1])-this.scrollStart;
},update:function(_2d1c){
Position.prepare();
window.scrollTo(Position.deltaX,this.scrollStart+(_2d1c*this.delta));
}});
Effect.Fade=function(_2d1d){
_2d1d=$(_2d1d);
var _2d1e=_2d1d.getInlineOpacity();
var _2d1f=Object.extend({from:_2d1d.getOpacity()||1,to:0,afterFinishInternal:function(_2d20){
if(_2d20.options.to!=0){
return;
}
_2d20.element.hide().setStyle({opacity:_2d1e});
}},arguments[1]||{});
return new Effect.Opacity(_2d1d,_2d1f);
};
Effect.Appear=function(_2d21){
_2d21=$(_2d21);
var _2d22=Object.extend({from:(_2d21.getStyle("display")=="none"?0:_2d21.getOpacity()||0),to:1,afterFinishInternal:function(_2d23){
_2d23.element.forceRerendering();
},beforeSetup:function(_2d24){
_2d24.element.setOpacity(_2d24.options.from).show();
}},arguments[1]||{});
return new Effect.Opacity(_2d21,_2d22);
};
Effect.Puff=function(_2d25){
_2d25=$(_2d25);
var _2d26={opacity:_2d25.getInlineOpacity(),position:_2d25.getStyle("position"),top:_2d25.style.top,left:_2d25.style.left,width:_2d25.style.width,height:_2d25.style.height};
return new Effect.Parallel([new Effect.Scale(_2d25,200,{sync:true,scaleFromCenter:true,scaleContent:true,restoreAfterFinish:true}),new Effect.Opacity(_2d25,{sync:true,to:0})],Object.extend({duration:1,beforeSetupInternal:function(_2d27){
Position.absolutize(_2d27.effects[0].element);
},afterFinishInternal:function(_2d28){
_2d28.effects[0].element.hide().setStyle(_2d26);
}},arguments[1]||{}));
};
Effect.BlindUp=function(_2d29){
_2d29=$(_2d29);
_2d29.makeClipping();
return new Effect.Scale(_2d29,0,Object.extend({scaleContent:false,scaleX:false,restoreAfterFinish:true,afterFinishInternal:function(_2d2a){
_2d2a.element.hide().undoClipping();
}},arguments[1]||{}));
};
Effect.BlindDown=function(_2d2b){
_2d2b=$(_2d2b);
var _2d2c=_2d2b.getDimensions();
return new Effect.Scale(_2d2b,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:0,scaleMode:{originalHeight:_2d2c.height,originalWidth:_2d2c.width},restoreAfterFinish:true,afterSetup:function(_2d2d){
_2d2d.element.makeClipping().setStyle({height:"0px"}).show();
},afterFinishInternal:function(_2d2e){
_2d2e.element.undoClipping();
}},arguments[1]||{}));
};
Effect.SwitchOff=function(_2d2f){
_2d2f=$(_2d2f);
var _2d30=_2d2f.getInlineOpacity();
return new Effect.Appear(_2d2f,Object.extend({duration:0.4,from:0,transition:Effect.Transitions.flicker,afterFinishInternal:function(_2d31){
new Effect.Scale(_2d31.element,1,{duration:0.3,scaleFromCenter:true,scaleX:false,scaleContent:false,restoreAfterFinish:true,beforeSetup:function(_2d32){
_2d32.element.makePositioned().makeClipping();
},afterFinishInternal:function(_2d33){
_2d33.element.hide().undoClipping().undoPositioned().setStyle({opacity:_2d30});
}});
}},arguments[1]||{}));
};
Effect.DropOut=function(_2d34){
_2d34=$(_2d34);
var _2d35={top:_2d34.getStyle("top"),left:_2d34.getStyle("left"),opacity:_2d34.getInlineOpacity()};
return new Effect.Parallel([new Effect.Move(_2d34,{x:0,y:100,sync:true}),new Effect.Opacity(_2d34,{sync:true,to:0})],Object.extend({duration:0.5,beforeSetup:function(_2d36){
_2d36.effects[0].element.makePositioned();
},afterFinishInternal:function(_2d37){
_2d37.effects[0].element.hide().undoPositioned().setStyle(_2d35);
}},arguments[1]||{}));
};
Effect.Shake=function(_2d38){
_2d38=$(_2d38);
var _2d39={top:_2d38.getStyle("top"),left:_2d38.getStyle("left")};
return new Effect.Move(_2d38,{x:20,y:0,duration:0.05,afterFinishInternal:function(_2d3a){
new Effect.Move(_2d3a.element,{x:-40,y:0,duration:0.1,afterFinishInternal:function(_2d3b){
new Effect.Move(_2d3b.element,{x:40,y:0,duration:0.1,afterFinishInternal:function(_2d3c){
new Effect.Move(_2d3c.element,{x:-40,y:0,duration:0.1,afterFinishInternal:function(_2d3d){
new Effect.Move(_2d3d.element,{x:40,y:0,duration:0.1,afterFinishInternal:function(_2d3e){
new Effect.Move(_2d3e.element,{x:-20,y:0,duration:0.05,afterFinishInternal:function(_2d3f){
_2d3f.element.undoPositioned().setStyle(_2d39);
}});
}});
}});
}});
}});
}});
};
Effect.SlideDown=function(_2d40){
_2d40=$(_2d40).cleanWhitespace();
var _2d41=_2d40.down().getStyle("bottom");
var _2d42=_2d40.getDimensions();
return new Effect.Scale(_2d40,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:window.opera?0:1,scaleMode:{originalHeight:_2d42.height,originalWidth:_2d42.width},restoreAfterFinish:true,afterSetup:function(_2d43){
_2d43.element.makePositioned();
_2d43.element.down().makePositioned();
if(window.opera){
_2d43.element.setStyle({top:""});
}
_2d43.element.makeClipping().setStyle({height:"0px"}).show();
},afterUpdateInternal:function(_2d44){
_2d44.element.down().setStyle({bottom:(_2d44.dims[0]-_2d44.element.clientHeight)+"px"});
},afterFinishInternal:function(_2d45){
_2d45.element.undoClipping().undoPositioned();
_2d45.element.down().undoPositioned().setStyle({bottom:_2d41});
}},arguments[1]||{}));
};
Effect.SlideUp=function(_2d46){
_2d46=$(_2d46).cleanWhitespace();
var _2d47=_2d46.down().getStyle("bottom");
return new Effect.Scale(_2d46,window.opera?0:1,Object.extend({scaleContent:false,scaleX:false,scaleMode:"box",scaleFrom:100,restoreAfterFinish:true,beforeStartInternal:function(_2d48){
_2d48.element.makePositioned();
_2d48.element.down().makePositioned();
if(window.opera){
_2d48.element.setStyle({top:""});
}
_2d48.element.makeClipping().show();
},afterUpdateInternal:function(_2d49){
_2d49.element.down().setStyle({bottom:(_2d49.dims[0]-_2d49.element.clientHeight)+"px"});
},afterFinishInternal:function(_2d4a){
_2d4a.element.hide().undoClipping().undoPositioned().setStyle({bottom:_2d47});
_2d4a.element.down().undoPositioned();
}},arguments[1]||{}));
};
Effect.Squish=function(_2d4b){
return new Effect.Scale(_2d4b,window.opera?1:0,{restoreAfterFinish:true,beforeSetup:function(_2d4c){
_2d4c.element.makeClipping();
},afterFinishInternal:function(_2d4d){
_2d4d.element.hide().undoClipping();
}});
};
Effect.Grow=function(_2d4e){
_2d4e=$(_2d4e);
var _2d4f=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.full},arguments[1]||{});
var _2d50={top:_2d4e.style.top,left:_2d4e.style.left,height:_2d4e.style.height,width:_2d4e.style.width,opacity:_2d4e.getInlineOpacity()};
var dims=_2d4e.getDimensions();
var _2d52,initialMoveY;
var moveX,moveY;
switch(_2d4f.direction){
case "top-left":
_2d52=initialMoveY=moveX=moveY=0;
break;
case "top-right":
_2d52=dims.width;
initialMoveY=moveY=0;
moveX=-dims.width;
break;
case "bottom-left":
_2d52=moveX=0;
initialMoveY=dims.height;
moveY=-dims.height;
break;
case "bottom-right":
_2d52=dims.width;
initialMoveY=dims.height;
moveX=-dims.width;
moveY=-dims.height;
break;
case "center":
_2d52=dims.width/2;
initialMoveY=dims.height/2;
moveX=-dims.width/2;
moveY=-dims.height/2;
break;
}
return new Effect.Move(_2d4e,{x:_2d52,y:initialMoveY,duration:0.01,beforeSetup:function(_2d54){
_2d54.element.hide().makeClipping().makePositioned();
},afterFinishInternal:function(_2d55){
new Effect.Parallel([new Effect.Opacity(_2d55.element,{sync:true,to:1,from:0,transition:_2d4f.opacityTransition}),new Effect.Move(_2d55.element,{x:moveX,y:moveY,sync:true,transition:_2d4f.moveTransition}),new Effect.Scale(_2d55.element,100,{scaleMode:{originalHeight:dims.height,originalWidth:dims.width},sync:true,scaleFrom:window.opera?1:0,transition:_2d4f.scaleTransition,restoreAfterFinish:true})],Object.extend({beforeSetup:function(_2d56){
_2d56.effects[0].element.setStyle({height:"0px"}).show();
},afterFinishInternal:function(_2d57){
_2d57.effects[0].element.undoClipping().undoPositioned().setStyle(_2d50);
}},_2d4f));
}});
};
Effect.Shrink=function(_2d58){
_2d58=$(_2d58);
var _2d59=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.none},arguments[1]||{});
var _2d5a={top:_2d58.style.top,left:_2d58.style.left,height:_2d58.style.height,width:_2d58.style.width,opacity:_2d58.getInlineOpacity()};
var dims=_2d58.getDimensions();
var moveX,moveY;
switch(_2d59.direction){
case "top-left":
moveX=moveY=0;
break;
case "top-right":
moveX=dims.width;
moveY=0;
break;
case "bottom-left":
moveX=0;
moveY=dims.height;
break;
case "bottom-right":
moveX=dims.width;
moveY=dims.height;
break;
case "center":
moveX=dims.width/2;
moveY=dims.height/2;
break;
}
return new Effect.Parallel([new Effect.Opacity(_2d58,{sync:true,to:0,from:1,transition:_2d59.opacityTransition}),new Effect.Scale(_2d58,window.opera?1:0,{sync:true,transition:_2d59.scaleTransition,restoreAfterFinish:true}),new Effect.Move(_2d58,{x:moveX,y:moveY,sync:true,transition:_2d59.moveTransition})],Object.extend({beforeStartInternal:function(_2d5d){
_2d5d.effects[0].element.makePositioned().makeClipping();
},afterFinishInternal:function(_2d5e){
_2d5e.effects[0].element.hide().undoClipping().undoPositioned().setStyle(_2d5a);
}},_2d59));
};
Effect.Pulsate=function(_2d5f){
_2d5f=$(_2d5f);
var _2d60=arguments[1]||{};
var _2d61=_2d5f.getInlineOpacity();
var _2d62=_2d60.transition||Effect.Transitions.sinoidal;
var _2d63=function(pos){
return _2d62(1-Effect.Transitions.pulse(pos,_2d60.pulses));
};
_2d63.bind(_2d62);
return new Effect.Opacity(_2d5f,Object.extend(Object.extend({duration:2,from:0,afterFinishInternal:function(_2d65){
_2d65.element.setStyle({opacity:_2d61});
}},_2d60),{transition:_2d63}));
};
Effect.Fold=function(_2d66){
_2d66=$(_2d66);
var _2d67={top:_2d66.style.top,left:_2d66.style.left,width:_2d66.style.width,height:_2d66.style.height};
_2d66.makeClipping();
return new Effect.Scale(_2d66,5,Object.extend({scaleContent:false,scaleX:false,afterFinishInternal:function(_2d68){
new Effect.Scale(_2d66,1,{scaleContent:false,scaleY:false,afterFinishInternal:function(_2d69){
_2d69.element.hide().undoClipping().setStyle(_2d67);
}});
}},arguments[1]||{}));
};
Effect.Morph=Class.create();
Object.extend(Object.extend(Effect.Morph.prototype,Effect.Base.prototype),{initialize:function(_2d6a){
this.element=$(_2d6a);
if(!this.element){
throw (Effect._elementDoesNotExistError);
}
var _2d6b=Object.extend({style:{}},arguments[1]||{});
if(typeof _2d6b.style=="string"){
if(_2d6b.style.indexOf(":")==-1){
var _2d6c="",selector="."+_2d6b.style;
$A(document.styleSheets).reverse().each(function(_2d6d){
if(_2d6d.cssRules){
cssRules=_2d6d.cssRules;
}else{
if(_2d6d.rules){
cssRules=_2d6d.rules;
}
}
$A(cssRules).reverse().each(function(rule){
if(selector==rule.selectorText){
_2d6c=rule.style.cssText;
throw $break;
}
});
if(_2d6c){
throw $break;
}
});
this.style=_2d6c.parseStyle();
_2d6b.afterFinishInternal=function(_2d6f){
_2d6f.element.addClassName(_2d6f.options.style);
_2d6f.transforms.each(function(_2d70){
if(_2d70.style!="opacity"){
_2d6f.element.style[_2d70.style.camelize()]="";
}
});
};
}else{
this.style=_2d6b.style.parseStyle();
}
}else{
this.style=$H(_2d6b.style);
}
this.start(_2d6b);
},setup:function(){
function parseColor(color){
if(!color||["rgba(0, 0, 0, 0)","transparent"].include(color)){
color="#ffffff";
}
color=color.parseColor();
return $R(0,2).map(function(i){
return parseInt(color.slice(i*2+1,i*2+3),16);
});
}
this.transforms=this.style.map(function(pair){
var _2d74=pair[0].underscore().dasherize(),value=pair[1],unit=null;
if(value.parseColor("#zzzzzz")!="#zzzzzz"){
value=value.parseColor();
unit="color";
}else{
if(_2d74=="opacity"){
value=parseFloat(value);
if(/MSIE/.test(navigator.userAgent)&&!window.opera&&(!this.element.currentStyle.hasLayout)){
this.element.setStyle({zoom:1});
}
}else{
if(Element.CSS_LENGTH.test(value)){
var _2d75=value.match(/^([\+\-]?[0-9\.]+)(.*)$/),value=parseFloat(_2d75[1]),unit=(_2d75.length==3)?_2d75[2]:null;
}
}
}
var _2d76=this.element.getStyle(_2d74);
return $H({style:_2d74,originalValue:unit=="color"?parseColor(_2d76):parseFloat(_2d76||0),targetValue:unit=="color"?parseColor(value):value,unit:unit});
}.bind(this)).reject(function(_2d77){
return ((_2d77.originalValue==_2d77.targetValue)||(_2d77.unit!="color"&&(isNaN(_2d77.originalValue)||isNaN(_2d77.targetValue))));
});
},update:function(_2d78){
var style=$H(),value=null;
this.transforms.each(function(_2d7a){
value=_2d7a.unit=="color"?$R(0,2).inject("#",function(m,v,i){
return m+(Math.round(_2d7a.originalValue[i]+(_2d7a.targetValue[i]-_2d7a.originalValue[i])*_2d78)).toColorPart();
}):_2d7a.originalValue+Math.round(((_2d7a.targetValue-_2d7a.originalValue)*_2d78)*1000)/1000+_2d7a.unit;
style[_2d7a.style]=value;
});
this.element.setStyle(style);
}});
Effect.Transform=Class.create();
Object.extend(Effect.Transform.prototype,{initialize:function(_2d7e){
this.tracks=[];
this.options=arguments[1]||{};
this.addTracks(_2d7e);
},addTracks:function(_2d7f){
_2d7f.each(function(track){
var data=$H(track).values().first();
this.tracks.push($H({ids:$H(track).keys().first(),effect:Effect.Morph,options:{style:data}}));
}.bind(this));
return this;
},play:function(){
return new Effect.Parallel(this.tracks.map(function(track){
var _2d83=[$(track.ids)||$$(track.ids)].flatten();
return _2d83.map(function(e){
return new track.effect(e,Object.extend({sync:true},track.options));
});
}).flatten(),this.options);
}});
Element.CSS_PROPERTIES=$w("backgroundColor backgroundPosition borderBottomColor borderBottomStyle "+"borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth "+"borderRightColor borderRightStyle borderRightWidth borderSpacing "+"borderTopColor borderTopStyle borderTopWidth bottom clip color "+"fontSize fontWeight height left letterSpacing lineHeight "+"marginBottom marginLeft marginRight marginTop markerOffset maxHeight "+"maxWidth minHeight minWidth opacity outlineColor outlineOffset "+"outlineWidth paddingBottom paddingLeft paddingRight paddingTop "+"right textIndent top width wordSpacing zIndex");
Element.CSS_LENGTH=/^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;
String.prototype.parseStyle=function(){
var _2d85=Element.extend(document.createElement("div"));
_2d85.innerHTML="<div style=\""+this+"\"></div>";
var style=_2d85.down().style,styleRules=$H();
Element.CSS_PROPERTIES.each(function(_2d87){
if(style[_2d87]){
styleRules[_2d87]=style[_2d87];
}
});
if(/MSIE/.test(navigator.userAgent)&&!window.opera&&this.indexOf("opacity")>-1){
styleRules.opacity=this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1];
}
return styleRules;
};
Element.morph=function(_2d88,style){
new Effect.Morph(_2d88,Object.extend({style:style},arguments[2]||{}));
return _2d88;
};
["setOpacity","getOpacity","getInlineOpacity","forceRerendering","setContentZoom","collectTextNodes","collectTextNodesIgnoreClass","morph"].each(function(f){
Element.Methods[f]=Element[f];
});
Element.Methods.visualEffect=function(_2d8b,_2d8c,_2d8d){
s=_2d8c.gsub(/_/,"-").camelize();
effect_class=s.charAt(0).toUpperCase()+s.substring(1);
new Effect[effect_class](_2d8b,_2d8d);
return $(_2d8b);
};
Element.addMethods();
