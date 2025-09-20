
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
	this.canvas = canvas;
	this.interactor = interactor;
	this.initialX = 0;
	this.initialY = 0;
	this.finalX = 0;
	this.finalY = 0;
	this.isDragging = false;

	// Developper les 3 fonctions gérant les événements
	this.onMouseDown = function(evt) {
		var pos = getMousePosition(this.canvas, evt);
		this.isDragging = true;
		this.initialX = pos.x;
		this.initialY = pos.y;
		this.finalX = pos.x;
		this.finalY = pos.y;
		console.log('mousedown', this.initialX, this.initialY);
		if (this.interactor && typeof this.interactor.onInteractionStart === 'function') {
			this.interactor.onInteractionStart(this);
		}
	}.bind(this);

	this.onMouseMove = function(evt) {
		if (!this.isDragging) { return; }
		var pos = getMousePosition(this.canvas, evt);
		this.finalX = pos.x;
		this.finalY = pos.y;
		console.log('mousemove', this.finalX, this.finalY);
		if (this.interactor && typeof this.interactor.onInteractionUpdate === 'function') {
			this.interactor.onInteractionUpdate(this);
		}
	}.bind(this);

	this.onMouseUp = function(evt) {
		if (!this.isDragging) { return; }
		var pos = getMousePosition(this.canvas, evt);
		this.finalX = pos.x;
		this.finalY = pos.y;
		this.isDragging = false;
		console.log('mouseup', this.finalX, this.finalY);
		if (this.interactor && typeof this.interactor.onInteractionEnd === 'function') {
			this.interactor.onInteractionEnd(this);
		}
	}.bind(this);

	// Associer les fonctions précédentes aux évènements du canvas.
	canvas.addEventListener('mousedown', this.onMouseDown, false);
	canvas.addEventListener('mousemove', this.onMouseMove, false);
	canvas.addEventListener('mouseup', this.onMouseUp, false);
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



