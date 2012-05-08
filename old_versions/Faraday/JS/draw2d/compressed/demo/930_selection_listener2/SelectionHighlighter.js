/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.SelectionHighlighter=function(_736){this.workflow=_736;this.counter=0;this.black=new draw2d.Color(0,0,0);this.gray=new draw2d.Color(200,200,200);};draw2d.SelectionHighlighter.prototype.type="SelectionHighlighter";draw2d.SelectionHighlighter.prototype.onSelectionChanged=function(_737){this.counter++;debugLabel.setText("Count:"+this.counter);var _738=(_737===null)?1:0.2;var _739=(_737===null)?this.black:this.gray;var doc=this.workflow.getDocument();var _73b=doc.getFigures();for(var i=0;i<_73b.getSize();i++){_73b.get(i).setAlpha(_738);}var _73d=doc.getLines();for(var i=0;i<_73d.getSize();i++){_73d.get(i).setColor(_739);}if(_737!==null){_737.setAlpha(1);if(_737 instanceof draw2d.Node){var _73e=_737.getPorts();for(var i=0;i<_73e.getSize();i++){var port=_73e.get(i);var _740=port.getConnections();for(var j=0;j<_740.getSize();j++){_740.get(j).setColor(this.black);}}}}};