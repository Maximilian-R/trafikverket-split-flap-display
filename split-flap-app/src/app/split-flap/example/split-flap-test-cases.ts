import { ISplitFlapInput, ISplitFlapSize } from '../flaps/flap.interface';
import { Flap } from '../flaps/flaps';
import { TEMPLATE_EMPTY_GRID } from '../templates/empty-grid.template';
import { TEMPLATE_FLIGHT_DEPARTURE } from '../templates/flight-departure.template';

export interface ISplitFlapTestCase {
	data: ISplitFlapInput;
	size: ISplitFlapSize;
	initial(): ISplitFlapInput;
	next(): ISplitFlapInput;
}

export interface ISplitFlapTestCaseAnimation {
	animate(update: (data: ISplitFlapInput) => void, rate: number): void;
}

export class SplitFlapFlightTest implements ISplitFlapTestCase {
	public data: ISplitFlapInput;
	public size: ISplitFlapSize = [15, 67];

	public initial(): ISplitFlapInput {
		this.data = TEMPLATE_FLIGHT_DEPARTURE;
		return this.data;
	}

	public next(): ISplitFlapInput {
		this.data = this.roll();
		return this.data;
	}

	private roll(): ISplitFlapInput {
		const data = [...this.data];
		const first = data[1];
		for (let i = 1; i < this.data.length - 1; i++) {
			data[i] = data[i + 1];
		}
		data[this.data.length - 1] = first;
		return data;
	}
}

export class SplitFlapAnimationTest implements ISplitFlapTestCase, ISplitFlapTestCaseAnimation {
	public data: ISplitFlapInput;
	public size: ISplitFlapSize = [10, 40];
	private updateX: number = 0;

	public initial(): ISplitFlapInput {
		this.data = TEMPLATE_EMPTY_GRID(this.size[0], this.size[1]);
		return this.data;
	}

	public next(): ISplitFlapInput {
		this.data = this.roll();
		return this.data;
	}

	public animate(update: (data: ISplitFlapInput) => void, rate: number): void {
		setInterval(() => {
			this.next();
			update(this.data);
		}, rate);
	}

	private roll(): ISplitFlapInput {
		const data = JSON.parse(JSON.stringify(this.data));
		if (this.updateX < this.size[1]) {
			this.updateX++;
		}
		for (let y = 0; y < this.size[0]; y++) {
			for (let x = 0; x < this.updateX; x++) {
				data[y][x] = Flap.next(data[y][x]);
			}
		}
		return data;
	}
}
