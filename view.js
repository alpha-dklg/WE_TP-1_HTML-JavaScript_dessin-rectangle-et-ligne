
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
Rectangle.prototype.paint = function(ctx) {
	ctx.save();
	ctx.lineWidth = this.getLineWidth();
	ctx.strokeStyle = this.getColour();
	ctx.beginPath();
	ctx.rect(this.getInitX(), this.getInitY(), this.getFinalX(), this.getFinalY());
	ctx.stroke();
	ctx.restore();
};

Line.prototype.paint = function(ctx) {
	ctx.save();
	ctx.lineWidth = this.getLineWidth();
	ctx.strokeStyle = this.getColour();
	ctx.beginPath();
	ctx.moveTo(this.getInitX(), this.getInitY());
	ctx.lineTo(this.getFinalX(), this.getFinalY());
	ctx.stroke();
	ctx.restore();
};

Drawing.prototype.paint = function(ctx, canvas) {
	ctx.fillStyle = '#F0F0F0';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	this.getForms().forEach(function(shape) { shape.paint(ctx); });
};

// Met à jour la liste des formes dans #shapeList et connecte les boutons de suppression
Drawing.prototype.updateShapeList = function() {
	var list = document.getElementById('shapeList');
	while (list.firstChild) { list.removeChild(list.firstChild); }
	var self = this;
	this.getForms().forEach(function(shape, index) {
		var li = document.createElement('li');
		var btn = document.createElement('button');
		btn.setAttribute('type', 'button');
		btn.setAttribute('class', 'btn btn-default');
		btn.innerHTML = '<span class="glyphicon glyphicon-remove-sign"></span>';
		btn.addEventListener('click', function() {
			self.removeFormAt(index);
			self.updateShapeList();
		});
		var label = document.createElement('span');
		if (shape instanceof Rectangle) {
			label.textContent = ' Rectangle(' + shape.getInitX() + ', ' + shape.getInitY() + ', ' + shape.getFinalX() + ', ' + shape.getFinalY() + ')';
		} else {
			label.textContent = ' Line(' + shape.getInitX() + ', ' + shape.getInitY() + ', ' + shape.getFinalX() + ', ' + shape.getFinalY() + ')';
		}
		li.appendChild(btn);
		li.appendChild(label);
		list.appendChild(li);
	});
};
