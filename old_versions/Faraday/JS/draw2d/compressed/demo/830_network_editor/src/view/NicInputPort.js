/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.NicInputPort=function(){draw2d.Port.call(this,new draw2d.ImageFigure(""+draw2d.Configuration.IMAGEPATH+"nic_port.png"));this.setDimension(16,16);this.setBackgroundColor(null);this.setName("input");};draw2d.NicInputPort.prototype=new draw2d.InputPort();draw2d.NicInputPort.prototype.type="draw2d.NicInputPort";draw2d.NicInputPort.prototype.createCommand=function(_1cce){if(_1cce.getPolicy()===draw2d.EditPolicy.CONNECT){if(_1cce.source.parentNode.id==_1cce.target.parentNode.id){return null;}if(_1cce.source instanceof draw2d.NicOutputPort){var _1ccf=_1cce.source.getParent().getModel();var _1cd0=_1cce.target.getParent().getModel();return new draw2d.CommandConnectNic(_1ccf,_1cd0);}return null;}return draw2d.InputPort.prototype.createCommand.call(this,_1cce);};