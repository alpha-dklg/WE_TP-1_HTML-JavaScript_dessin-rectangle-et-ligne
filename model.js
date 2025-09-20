
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

// Classe de base Shape
function Shape(lineWidth, colour) {
	this.lineWidth = lineWidth || 1;
	this.colour = colour || '#000000';
}

Shape.prototype.getLineWidth = function() { return this.lineWidth; };
Shape.prototype.setLineWidth = function(w) { this.lineWidth = w; };
Shape.prototype.getColour = function() { return this.colour; };
Shape.prototype.setColour = function(c) { this.colour = c; };

// Rectangle: défini par un point (x,y) et une largeur/hauteur
function Rectangle(initX, initY, width, height, lineWidth, colour) {
	Shape.call(this, lineWidth, colour);
	this.initX = initX || 0;
	this.initY = initY || 0;
	this.width = width || 0;
	this.height = height || 0;
}
Rectangle.prototype = new Shape();

Rectangle.prototype.getInitX = function() { return this.initX; };
Rectangle.prototype.getInitY = function() { return this.initY; };
Rectangle.prototype.getFinalX = function() { return this.width; };
Rectangle.prototype.getFinalY = function() { return this.height; };
Rectangle.prototype.setInitX = function(v) { this.initX = v; };
Rectangle.prototype.setInitY = function(v) { this.initY = v; };
Rectangle.prototype.setFinalX = function(v) { this.width = v; };
Rectangle.prototype.setFinalY = function(v) { this.height = v; };
Rectangle.prototype.setWidth = function(v) { this.width = v; };
Rectangle.prototype.setHeight = function(v) { this.height = v; };

// Line: défini par deux points
function Line(initX, initY, finalX, finalY, lineWidth, colour) {
	Shape.call(this, lineWidth, colour);
	this.initX = initX || 0;
	this.initY = initY || 0;
	this.finalX = finalX || 0;
	this.finalY = finalY || 0;
}
Line.prototype = new Shape();

Line.prototype.getInitX = function() { return this.initX; };
Line.prototype.getInitY = function() { return this.initY; };
Line.prototype.getFinalX = function() { return this.finalX; };
Line.prototype.getFinalY = function() { return this.finalY; };
Line.prototype.setInitX = function(v) { this.initX = v; };
Line.prototype.setInitY = function(v) { this.initY = v; };
Line.prototype.setFinalX = function(v) { this.finalX = v; };
Line.prototype.setFinalY = function(v) { this.finalY = v; };

// Drawing: collection de formes
function Drawing() {
	this.forms = new Array();
}

Drawing.prototype.getForms = function() { return this.forms; };
Drawing.prototype.addForm = function(form) { this.forms.push(form); };
Drawing.prototype.removeFormAt = function(index) {
	if (index >= 0 && index < this.forms.length) {
		this.forms.splice(index, 1);
	}
};