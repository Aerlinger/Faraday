draw2d.End=function(){
draw2d.ImageFigure.call(this,this.type+".png");
this.inputPort=null;
this.setDimension(50,50);
};
draw2d.End.prototype=new draw2d.ImageFigure();
draw2d.End.prototype.type="End";
draw2d.End.prototype.setWorkflow=function(_24a3){
draw2d.ImageFigure.prototype.setWorkflow.call(this,_24a3);
if(_24a3!==null&&this.inputPort===null){
this.inputPort=new draw2d.MyInputPort();
this.inputPort.setWorkflow(_24a3);
this.inputPort.setBackgroundColor(new draw2d.Color(115,115,245));
this.addPort(this.inputPort,0,this.height/2);
}
};
