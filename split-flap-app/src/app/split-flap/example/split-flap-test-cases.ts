import { ISplitFlapData } from '../split-flap.component';
import { characterIds } from '../characters';

export interface ISplitFlapTestCase {
	data: ISplitFlapData;
	size: [number, number];
	initial(): ISplitFlapData;
	next(): ISplitFlapData;
}

export interface ISplitFlapTestCaseAnimation {
	animate(update: (data: ISplitFlapData) => void, rate: number): void;
}

export class SplitFlapFlightTest implements ISplitFlapTestCase {
	public data: ISplitFlapData;
	public size: [number, number] = [15, 67];

	public initial(): ISplitFlapData {
		this.data = this.createData();
		return this.data;
	}

	public next(): ISplitFlapData {
		this.data = this.roll();
		return this.data;
	}

	private createData(): ISplitFlapData {
		return this.rows().map((row) => row.split(''));
	}

	private rows(): string[] {
		return [
			'TIME   FLIGHT   DESTINATION   VIA         CHECK-IN  GATE  REMARK   ',
			'10:35  RE 1355  NEW YORK JFK  COPENHAGEN  9-12      34    GATE OPEN',
			'10:45  AG 6154  LONDON HEATH              3-8       18    GATE OPEN',
			'11:05  CX 4971  PARIS COG                 14-19     9     GATE OPEN',
			'11:15  BI 1138  STOCKHOLM                 2         17    BOARDING ',
			'11:30  FI 2097  HELSINKI                  21-27     21    ON TIME  ',
			'11:45  KL 4563  FRANKFURT                 3-6       34    ON TIME  ',
			'11:55  DF 7206  LISBON                    15        7     DELAYED  ',
			'12:10  IC 9014  AMSTERDAM                 16-18     5     EST 12:20',
			'12:25  EK 4626  TOKYO         SHANGHAI    28-31     15    ON TIME  ',
			'12:40  UD 1740  HONG KONG     ISTANBUL    4-10      18    CANCELLED',
			'12:55  ST 9544  LOS ANGELES               17-21     4     ON TIME  ',
			'13:10  KB 3309  SINGAPORE     BANGKOK     23-25     27    DELAYED  ',
			'13:25  LR 5762  BRUSSELS                  7-10      19    ON TIME  ',
			'13:40  VL 6239  MUNICH                    12-14     3     ON TIME  ',
		];
	}

	private roll(): ISplitFlapData {
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
	public data: ISplitFlapData;
	public size: [number, number] = [10, 40];
	private updateX: number = 0;

	public initial(): ISplitFlapData {
		this.data = Array.from({ length: this.size[0] }, (v, i) => Array.from(' '.repeat(this.size[1])));
		return this.data;
	}

	public next(): ISplitFlapData {
		this.data = this.roll();
		return this.data;
	}

	public animate(update: (data: ISplitFlapData) => void, rate: number): void {
		setInterval(() => {
			this.next();
			update(this.data);
		}, rate);
	}

	private roll(): ISplitFlapData {
		const data = JSON.parse(JSON.stringify(this.data));
		if (this.updateX < this.size[1]) {
			this.updateX++;
		}
		for (let y = 0; y < this.size[0]; y++) {
			for (let x = 0; x < this.updateX; x++) {
				data[y][x] = characterIds[characterIds.indexOf(data[y][x]) + 1] || ' ';
			}
		}
		return data;
	}
}
