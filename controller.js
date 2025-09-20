
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
	var self = this;
	var widthInput = document.getElementById('spinnerWidth');
	if (widthInput) {
		widthInput.addEventListener('change', function() {
			self.currLineWidth = parseInt(widthInput.value, 10) || 1;
		});
	}
	var colourInput = document.getElementById('colour');
	if (colourInput) {
		colourInput.addEventListener('change', function() {
			self.currColour = colourInput.value;
		});
	}
	var butRect = document.getElementById('butRect');
	var butLine = document.getElementById('butLine');
	if (butRect) {
		butRect.addEventListener('change', function() {
			self.currEditingMode = editingMode.rect;
		});
	}
	if (butLine) {
		butLine.addEventListener('change', function() {
			self.currEditingMode = editingMode.line;
		});
	}

	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
	this.onInteractionStart = function(dnd) {
		if (this.currEditingMode === editingMode.rect) {
			this.currentShape = new Rectangle(dnd.initialX, dnd.initialY, 0, 0, this.currLineWidth, this.currColour);
		} else {
			this.currentShape = new Line(dnd.initialX, dnd.initialY, dnd.finalX, dnd.finalY, this.currLineWidth, this.currColour);
		}
		drawing.paint(ctx, canvas);
		this.currentShape.paint(ctx);
	}.bind(this);

	this.onInteractionUpdate = function(dnd) {
		if (!this.currentShape) { return; }
		if (this.currentShape instanceof Rectangle) {
			this.currentShape.setWidth(dnd.finalX - dnd.initialX);
			this.currentShape.setHeight(dnd.finalY - dnd.initialY);
		} else if (this.currentShape instanceof Line) {
			this.currentShape.setFinalX(dnd.finalX);
			this.currentShape.setFinalY(dnd.finalY);
		}
		drawing.paint(ctx, canvas);
		this.currentShape.paint(ctx);
	}.bind(this);

	this.onInteractionEnd = function(dnd) {
		this.onInteractionUpdate(dnd);
		drawing.addForm(this.currentShape);
		this.currentShape = 0;
		drawing.paint(ctx, canvas);
		drawing.updateShapeList();
	}.bind(this);
};


