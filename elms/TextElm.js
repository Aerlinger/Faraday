TextElm.prototype = new CircuitElement();
TextElm.prototype.constructor = TextElm;

function TextElm( xa, ya, xb, yb, f, st ) {
    CircuitElement.call(this, xa, ya, xb, yb, f);

};

