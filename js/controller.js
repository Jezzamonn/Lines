import { slurp, easeInOut } from './util'

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
		this.animAmt %= 1;
	}

	/**
	 * @param {CanvasRenderingContext2D} context 
	 */
	render(context) {
		context.globalCompositeOperation = 'multiply';

		const moveAnimAmt = this.animAmt;

		const size = 500;
		const numLines = 10;
		const lineGap = size / (numLines - 1);
		const halfThickness = 0.5 * lineGap / 3;
		const colors = ['black', 'black', 'black'];
		const numDirections = 3;
		for (let i = 0; i < numDirections; i ++) {
			let localAnimAmt = (this.animAmt + (i / numDirections)) % 1;
			localAnimAmt = easeInOut(localAnimAmt, 7);
			const color = colors[i];
			for (let l = 0; l < numLines; l ++) {
				const amt = l / (numLines - 1);

				const linePos = slurp(-size, size, amt) + 2 * lineGap * localAnimAmt;

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
