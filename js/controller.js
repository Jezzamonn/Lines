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
	render(context, width = 500, height = 500) {
		const size = (width + height) / 2;
		const lineGap = 100;

		const halfThickness = (lineGap / 3) / 4;
		const colors = ['black', 'black', 'black'];
		const numDirections = 3;

		for (let i = 0; i < numDirections; i ++) {
			let localAnimAmt = (this.animAmt + (i / numDirections)) % 1;
			localAnimAmt = easeInOut(localAnimAmt, 7);
			const color = colors[i];
			for (let l = 0; l * lineGap < size; l ++) {

				const baseLinePos = l * lineGap;
				
				for (let dir of [-1, 1]) {
					const linePos = dir * baseLinePos + lineGap * localAnimAmt;
					context.beginPath();
					context.fillStyle = color;
					context.moveTo(-size, linePos - halfThickness);
					context.lineTo(-size, linePos + halfThickness);
					context.lineTo( size, linePos + halfThickness);
					context.lineTo( size, linePos - halfThickness);
					context.closePath();
					context.fill();

					if (l == 0) {
						break;
					}
				}
			}

			context.rotate(2 * Math.PI / numDirections);
		}
	}

}
