draw2d.XMLSerializer_01=function(){
};
draw2d.XMLSerializer_01.prototype.type="XMLSerializer_01";
draw2d.XMLSerializer_01.prototype.toXML=function(_3018){
var xml="<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n";
xml=xml+"<form>\n";
var _301a=_3018.getFigures();
for(var i=0;i<_301a.getSize();i++){
var _301c=_301a.get(i);
xml=xml+"<"+_301c.type+" x=\""+_301c.getX()+"\" y=\""+_301c.getY()+"\" id=\""+_301c.getId()+"\">\n";
xml=xml+this.getPropertyXML(_301c,"   ");
if(_301c instanceof draw2d.CompartmentFigure){
xml=xml+this.getChildXML(_301c,"   ");
}
xml=xml+"</"+_301c.type+">\n";
}
xml=xml+"</form>\n";
return xml;
};
draw2d.XMLSerializer_01.prototype.getChildXML=function(_301d,_301e){
var xml="";
var _3020=_301d.getChildren();
for(var i=0;i<_3020.getSize();i++){
var _3022=_3020.get(i);
xml=xml+_301e+"<"+_3022.type+" x=\""+_3022.getX()+"\" y=\""+_3022.getY()+"\" id=\""+_3022.getId()+"\">\n";
xml=xml+this.getPropertyXML(_3022,"   "+_301e);
if(_3022 instanceof draw2d.CompartmentFigure){
xml=xml+this.getChildXML(_3022,"   "+_301e);
}
xml=xml+_301e+"</"+_3022.type+">\n";
}
return xml;
};
draw2d.XMLSerializer_01.prototype.getPropertyXML=function(_3023,_3024){
var xml="";
var _3026=_3023.getProperties();
for(key in _3026){
var value=_3026[key];
if(value!==null){
xml=xml+_3024+"<property name=\""+key+"\" value=\""+value+"\">\n";
}
}
return xml;
};
