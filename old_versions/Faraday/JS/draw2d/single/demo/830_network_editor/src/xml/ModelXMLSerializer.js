draw2d.ModelXMLSerializer=function(){
alert("do not init this class. Use the static methods instead");
};
draw2d.ModelXMLSerializer.toXML=function(obj,_2da0,_2da1){
if(obj===undefined){
return "";
}
if(_2da0===undefined){
_2da0=obj.tag;
}
_2da1=_2da1?_2da1:"";
var _2da2=_2da1+"   ";
var t=draw2d.ModelXMLSerializer.getTypeName(obj);
var _2da4="";
var _2da5="";
var _2da6=false;
var _2da7=true;
switch(t){
case "int":
case "number":
case "boolean":
_2da4=obj;
_2da7=false;
break;
case "string":
_2da4=draw2d.ModelXMLSerializer.xmlEncode(obj);
_2da7=false;
break;
case "date":
_2da4=obj.toLocaleString();
_2da7=false;
break;
case "Array":
case "array":
_2da6=true;
_2da4="";
for(var i=0;i<obj.length;i++){
var _2da9=obj[i];
if(_2da9===undefined){
continue;
}
_2da4+=draw2d.ModelXMLSerializer.toXML(_2da9,_2da9.tag,_2da2);
_2da7=false;
}
_2da4+=_2da1;
break;
default:
if(obj!==null){
var _2daa=obj.getPersistentAttributes();
var _2dab=_2daa.attributes;
var _2dac=_2daa;
for(var name in _2dac){
if(name==="attributes"||name===undefined){
continue;
}
_2da7=false;
_2da4+=draw2d.ModelXMLSerializer.toXML(_2dac[name],name,_2da2);
}
_2da4+="\n"+_2da1;
for(var name in _2dab){
var _2dae=_2dab[name];
if(_2dae===undefined){
continue;
}
if(_2dae===null){
_2dae="";
}
_2da5=_2da5+" "+name+"="+"\""+draw2d.ModelXMLSerializer.xmlEncode(_2dae)+"\"";
}
if(_2da5.length>0){
_2da5+=" ";
}
}
break;
}
if(_2da6){
return _2da4;
}
var s="";
if(_2da7){
s="\n"+_2da1+"<"+_2da0+_2da5+"/>";
}else{
s="\n"+_2da1+"<"+_2da0+_2da5+">";
s+=_2da4;
s+="</"+_2da0+">";
}
return s;
};
draw2d.ModelXMLSerializer.isSimpleVar=function(t){
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
draw2d.ModelXMLSerializer.getTypeName=function(obj){
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
if(t==="number"){
return (parseInt(obj,10).toString()==obj)?"int":"number";
}
if(draw2d.ModelXMLSerializer.isSimpleVar(t)){
return t;
}
return obj.type;
};
draw2d.ModelXMLSerializer.xmlEncode=function(_2db3){
var t=typeof (_2db3);
if(t=="number"){
return ""+_2db3;
}
var _2db5=_2db3;
var amp=/&/gi;
var gt=/>/gi;
var lt=/</gi;
var quot=/"/gi;
var apos=/'/gi;
var _2dbb="&#62;";
var _2dbc="&#38;#60;";
var _2dbd="&#38;#38;";
var _2dbe="&#34;";
var _2dbf="&#39;";
_2db5=_2db5.replace(amp,_2dbd);
_2db5=_2db5.replace(quot,_2dbe);
_2db5=_2db5.replace(lt,_2dbc);
_2db5=_2db5.replace(gt,_2dbb);
_2db5=_2db5.replace(apos,_2dbf);
return _2db5;
};
