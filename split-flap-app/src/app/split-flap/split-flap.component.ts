import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Flap } from './flaps/flaps';
import { SplitFlapAudioService } from './split-flap-audio.service';
import { ITheme } from '../core/theme-selector/theme-selector.component';
import { IFlap, ISplitFlapGrid, ISplitFlapInput } from './flaps/flap.interface';
import { TEMPLATE_EMPTY_GRID } from './templates/empty-grid.template';

@Component({
	selector: 'app-split-flap',
	templateUrl: './split-flap.component.html',
	styleUrls: ['./split-flap.component.scss'],
})
export class SplitFlapComponent implements OnInit, OnChanges {
	@Input() data: ISplitFlapInput;
	@Input() rows: number;
	@Input() columns: number;
	@Input() dividers: number[] = [undefined];
	@Input() hoverTheme: ITheme;

	public flapFaces = Flap.FLAP_FACES;

	public grid: ISplitFlapGrid;

	private flaps: IFlap[];

	private instantiatedData: boolean = false;
	private isRunning: boolean = false;
	private timeout1: any;
	private timeout2: any;
	private flipTime: number = 30;

	constructor(private SplitFlapAudioService: SplitFlapAudioService) {}

	ngOnInit(): void {}

	ngOnChanges(changes: SimpleChanges): void {
		// Setup temporary flippers while waiting for data
		if (changes.data && !changes.data.currentValue) {
			this.instantiatedData = false;
			const grid = TEMPLATE_EMPTY_GRID(this.rows, this.columns);
			this.grid = this.createGrid(grid);
		}

		if (changes.data && JSON.stringify(changes.data.previousValue) !== JSON.stringify(changes.data.currentValue)) {
			if (this.instantiatedData) {
				this.updateGrid(this.data);
			} else {
				this.grid = this.createGrid(this.data);
				this.instantiatedData = true;
			}
			this.updateFlaps(this.grid);

			if (!this.isRunning) {
				this.run();
			}
		}
	}

	private run(): void {
		this.isRunning = true;
		this.SplitFlapAudioService.start();
		this.flipper();
	}

	private stop(): void {
		this.isRunning = false;
		this.SplitFlapAudioService.stop();
	}

	private updateGrid(data: ISplitFlapInput): void {
		this.grid.forEach((row, x) =>
			row.forEach((col, y) => {
				col.target = Flap.validate(data[x][y]);
			})
		);
	}

	private updateFlaps(data: ISplitFlapGrid) {
		this.flaps = data
			.flatMap((col) => col)
			.filter((flap) => {
				return flap.target !== flap.current;
			});
	}

	private createGrid(data: ISplitFlapInput): ISplitFlapGrid {
		return data.map((row) => row.map((col) => Flap.create(col)));
	}

	private flipper() {
		this.flaps = this.flaps.filter((flap) => {
			return flap.target !== flap.current;
		});

		if (this.flaps.length === 0) {
			this.stop();
		} else {
			this.timeout1 = setTimeout(() => {
				this.timeout1 = undefined;
				this.flaps.forEach((flap) => {
					flap.next = Flap.next(flap.current);
				});
			}, this.flipTime);
			this.timeout2 = setTimeout(() => {
				this.timeout2 = undefined;
				this.flaps.forEach((flap) => {
					flap.current = flap.next;
				});
				this.flipper();
			}, this.flipTime * 2);
		}
	}

	public trackByMethod(index: number): number {
		return index;
	}

	private cancelFlipper(): void {
		this.timeout1 && clearTimeout(this.timeout1);
		this.timeout2 && clearTimeout(this.timeout2);
	}
}
