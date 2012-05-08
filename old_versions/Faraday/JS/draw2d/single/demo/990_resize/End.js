draw2d.End=function(){
this.inputPort1=null;
this.inputPort2=null;
draw2d.Node.call(this);
this.setDimension(50,50);
};
draw2d.End.prototype=new draw2d.Node;
draw2d.End.prototype.type="End";
draw2d.End.prototype.setWorkflow=function(_2793){
draw2d.Node.prototype.setWorkflow.call(this,_2793);
if(_2793!==null){
this.inputPort1=new draw2d.InputPort();
this.inputPort1.setWorkflow(_2793);
this.inputPort1.setBackgroundColor(new draw2d.Color(115,115,245));
this.addPort(this.inputPort1,0,this.height/3);
this.inputPort2=new draw2d.InputPort();
this.inputPort2.setWorkflow(_2793);
this.inputPort2.setBackgroundColor(new draw2d.Color(115,115,245));
this.addPort(this.inputPort2,0,this.height/3*2);
}
};
draw2d.End.prototype.setDimension=function(w,h){
draw2d.Node.prototype.setDimension.call(this,w,h);
if(this.inputPort1!==null){
this.inputPort1.setPosition(0,this.height/3);
this.inputPort2.setPosition(0,this.height/3*2);
}
};
