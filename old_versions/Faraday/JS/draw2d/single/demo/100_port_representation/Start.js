draw2d.Start=function(){
draw2d.ImageFigure.call(this,this.type+".png");
this.outputPort1=null;
this.outputPort2=null;
this.setDimension(50,60);
};
draw2d.Start.prototype=new draw2d.ImageFigure();
draw2d.Start.prototype.type="Start";
draw2d.Start.prototype.setWorkflow=function(_1e13){
draw2d.ImageFigure.prototype.setWorkflow.call(this,_1e13);
if(_1e13!==null&&this.outputPort1===null){
this.outputPort1=new draw2d.OutputPort(new draw2d.ImageFigure("port1.png"));
this.outputPort1.setMaxFanOut(1);
this.outputPort1.setWorkflow(_1e13);
this.outputPort1.setDimension(10,10);
this.addPort(this.outputPort1,this.width,this.height/4);
this.outputPort2=new draw2d.OutputPort(new draw2d.ImageFigure("port2.png"));
this.outputPort2.setMaxFanOut(1);
this.outputPort2.setDimension(10,10);
this.outputPort2.setWorkflow(_1e13);
this.addPort(this.outputPort2,this.width,this.height/4*3);
}
};
