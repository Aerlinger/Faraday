draw2d.Start=function(){
this.outputPort=null;
draw2d.ImageFigure.call(this,this.type+".png");
this.setDimension(50,50);
};
draw2d.Start.prototype=new draw2d.ImageFigure();
draw2d.Start.prototype.type="Start";
draw2d.Start.prototype.setWorkflow=function(_2707){
draw2d.ImageFigure.prototype.setWorkflow.call(this,_2707);
if(_2707!==null&&this.outputPort===null){
this.outputPort=new draw2d.OutputPort();
this.outputPort.setMaxFanOut(5);
this.outputPort.setWorkflow(_2707);
this.outputPort.setBackgroundColor(new draw2d.Color(245,115,115));
this.addPort(this.outputPort,this.width,this.height/2);
}
};
