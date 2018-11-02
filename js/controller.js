export default class Controller {

	constructor() {
		this.animAmt = 0;
		this.period = 5;
	}

	/**
	 * @param {Number} dt Time in seconds since last update
	 */
	update(dt) {
		this.animAmt += dt / this.period;
	}

	/**
	 * @param {CanvasRenderingContext2D} context 
	 */
	render(context) {
		context.globalCompositeOperation = 'multiply';

		const size = 500;
		const thickenss = 20;
		const colors = ['#FF0', '#0FF', '#F0F'];
		const numDirections = 3;
		for (let i = 0; i < numDirections; i ++) {
			const color = colors[i];
			const numLines = 1;
			for (let l = 0; l < numLines; l ++) {
				const amt = l / numLines;

				context.beginPath();
				context.fillStyle = color;
				context.moveTo(-size, -thickenss / 2);
				context.lineTo(-size,  thickenss / 2);
				context.lineTo( size,  thickenss / 2);
				context.lineTo( size, -thickenss / 2);
				context.closePath();
				context.fill();
			}

			context.rotate(2 * Math.PI / numDirections);
		}
	}

}
