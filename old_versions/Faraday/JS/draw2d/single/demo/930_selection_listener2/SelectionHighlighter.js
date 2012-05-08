draw2d.SelectionHighlighter=function(_241f){
this.workflow=_241f;
this.counter=0;
this.black=new draw2d.Color(0,0,0);
this.gray=new draw2d.Color(200,200,200);
};
draw2d.SelectionHighlighter.prototype.type="SelectionHighlighter";
draw2d.SelectionHighlighter.prototype.onSelectionChanged=function(_2420){
this.counter++;
debugLabel.setText("Count:"+this.counter);
var alpha=(_2420===null)?1:0.2;
var color=(_2420===null)?this.black:this.gray;
var doc=this.workflow.getDocument();
var _2424=doc.getFigures();
for(var i=0;i<_2424.getSize();i++){
_2424.get(i).setAlpha(alpha);
}
var lines=doc.getLines();
for(var i=0;i<lines.getSize();i++){
lines.get(i).setColor(color);
}
if(_2420!==null){
_2420.setAlpha(1);
if(_2420 instanceof draw2d.Node){
var ports=_2420.getPorts();
for(var i=0;i<ports.getSize();i++){
var port=ports.get(i);
var _2429=port.getConnections();
for(var j=0;j<_2429.getSize();j++){
_2429.get(j).setColor(this.black);
}
}
}
}
};
