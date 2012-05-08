function removeTextNodes(nodes){
var _2fcb=new draw2d.ArrayList();
for(var i=0;i<nodes.length;i++){
var child=nodes.item(i);
var _2fce=child.nodeName;
if(_2fce==="#text"){
continue;
}
_2fcb.add(child);
}
return _2fcb.asArray();
}
draw2d.ModelXMLDeserializer=function(){
alert("do not init this class. Use the static methods instead");
};
draw2d.ModelXMLDeserializer.fromXML=function(node,_2fd0,_2fd1){
var _2fd2=""+node.nodeName;
var value=node.nodeValue;
if(value===null){
if(node.nodeTypedValue){
value=node.nodeTypedValue;
}else{
value=node.textContent;
}
}
var obj=null;
var _2fd5=false;
switch(_2fd2.toLowerCase()){
case "vnetwork":
obj=new draw2d.VirtualNetworkCloudModel(node.getAttribute("id"));
_2fd1=obj;
break;
case "server":
if(_2fd0 instanceof draw2d.MountModel){
obj=new draw2d.ServerReferenceModel(node.getAttribute("reference"));
}else{
if(_2fd0 instanceof draw2d.NicModel){
obj=new draw2d.ServerReferenceModel(node.getAttribute("reference"));
}else{
obj=new draw2d.ServerModel(node.getAttribute("id"));
}
}
break;
case "storage":
if(_2fd0 instanceof draw2d.MountModel){
obj=new draw2d.StorageReferenceModel(node.getAttribute("reference"));
}else{
obj=new draw2d.StorageModel(node.getAttribute("id"));
}
break;
case "switch":
if(_2fd0 instanceof draw2d.NicModel){
obj=new draw2d.SwitchReferenceModel(node.getAttribute("reference"));
}else{
obj=new draw2d.SwitchModel(node.getAttribute("id"));
}
break;
case "representation":
obj=new draw2d.RepresentationModel();
break;
case "nics":
obj=new draw2d.NicsModel();
break;
case "nic":
if(_2fd0 instanceof draw2d.SwitchModel){
obj=new draw2d.NicReferenceModel(node.getAttribute("reference"));
}else{
obj=new draw2d.NicModel(node.getAttribute("id"));
_2fd0.addNicModel(obj);
_2fd5=true;
}
break;
case "images":
obj=new draw2d.ImagesModel();
break;
case "image":
obj=new draw2d.ImageModel(node.getAttribute("id"));
_2fd0.addImageModel(obj);
break;
case "mount":
var _2fd6=removeTextNodes(node.childNodes);
if(_2fd6[0].nodeName==="server"){
obj=new draw2d.MountModel(_2fd6[1].getAttribute("reference"),_2fd6[0].getAttribute("reference"),node.getAttribute("id"));
}else{
obj=new draw2d.MountModel(_2fd6[0].getAttribute("reference"),_2fd6[1].getAttribute("reference"),node.getAttribute("id"));
}
break;
default:
return value;
}
if(_2fd0!==undefined&&obj.setModelParent!==undefined){
obj.setModelParent(_2fd0);
}
var _2fd7=removeTextNodes(node.childNodes);
var _2fd8=0;
for(var i=0;i<_2fd7.length;i++){
var child=_2fd7[i];
var _2fdb=child.nodeName;
if(obj instanceof Array){
_2fdb=_2fd8;
}
var _2fdc=draw2d.ModelXMLDeserializer.fromXML(child,obj instanceof draw2d.AbstractObjectModel?obj:_2fd0,_2fd1);
if(_2fdc instanceof draw2d.AbstractCloudNodeModel&&obj instanceof draw2d.VirtualNetworkCloudModel){
obj.addCloudNodeModel(_2fdc);
}else{
if(_2fdc instanceof draw2d.AbstractConnectionModel){
_2fdc.getSourceModel().addConnectionModel(_2fdc);
}else{
obj[_2fdb]=_2fdc;
}
}
_2fd8++;
}
var _2fdd=node.attributes;
for(var ii=0;ii<_2fdd.length;ii++){
var _2fdf=_2fdd.item(ii);
obj[_2fdf.nodeName]=_2fdf.nodeValue;
}
if(_2fd5===true){
var _2fe0=obj.getSwitchReferenceModel();
var _2fe1=obj.getServerReferenceModel();
if(_2fe0!==null){
var sw=_2fd1.getCloudNodeModel(_2fe0.getReference());
if(sw===null){
_2fd1.addCloudNodeModel(new draw2d.SwitchModel(ref.getReference()));
}
if(_2fe1!==null){
var _2fe3=obj.getModelParent().getModelParent();
if(_2fe3 instanceof draw2d.ServerModel){
var con=new draw2d.NicConnectionModel(_2fe3.getId(),sw.getId());
con.nicModel=obj;
_2fe3.addConnectionModel(con);
}
}
}
}
return obj;
};
