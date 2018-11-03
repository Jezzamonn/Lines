import { slurp } from './util'

export default class Controller {

	constructor() {
		this.animAmt = 0;
		this.period = 20;
	}

	/**
	 * @param {Number} dt Time in seconds since last update
	 */
	update(dt) {
		this.animAmt += dt / this.period;
		this.animAmt %= 1;
	}

	/**
	 * @param {CanvasRenderingContext2D} context 
	 */
	render(context) {
		context.globalCompositeOperation = 'multiply';
		context.rotate(2 * Math.PI * this.animAmt);

		const moveAnimAmt = (4 * this.animAmt) % 1;

		const size = 500;
		const numLines = 10;
		const lineGap = size / (numLines - 1);
		const halfThickness = lineGap / 3;
		const colors = ['#FF0', '#0FF', '#F0F'];
		const numDirections = 3;
		for (let i = 0; i < numDirections; i ++) {
			const color = colors[i];
			for (let l = 0; l < numLines; l ++) {
				const amt = l / (numLines - 1);

				const linePos = slurp(-size, size, amt) + 2 * lineGap * moveAnimAmt;

				context.beginPath();
				context.fillStyle = color;
				context.moveTo(-size, linePos - halfThickness);
				context.lineTo(-size, linePos + halfThickness);
				context.lineTo( size, linePos + halfThickness);
				context.lineTo( size, linePos - halfThickness);
				context.closePath();
				context.fill();
			}

			context.rotate(2 * Math.PI / numDirections);
		}
	}

}
