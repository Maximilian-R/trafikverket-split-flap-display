import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { characters, characterIds, validate } from './characters';
import { SplitFlapAudioService } from './split-flap-audio.service';
import { ITheme } from '../core/theme-selector/theme-selector.component';

interface ILetter {
	character: string;
	next: string;
	current: string;
	color?: string;
}

export type ISplitFlapData = string[][];
type ISplitFlapTable = ILetter[][];

@Component({
	selector: 'app-split-flap',
	templateUrl: './split-flap.component.html',
	styleUrls: ['./split-flap.component.scss'],
})
export class SplitFlapComponent implements OnInit, OnChanges {
	@Input() data: ISplitFlapData;
	@Input() rows: number;
	@Input() columns: number;
	@Input() dividers: number[] = [undefined];
	@Input() hoverTheme: ITheme;

	public flaps = characters;

	// Holds the full table of letters.
	public table: ISplitFlapTable;
	// Holds the letters that should should flip.
	private letters: ILetter[];

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
			const grid = Array.from(Array(this.rows), (row) => Array.from(Array(this.columns), (col) => ' '));
			this.table = this.createTable(grid);
		}

		if (changes.data && JSON.stringify(changes.data.previousValue) !== JSON.stringify(changes.data.currentValue)) {
			if (this.instantiatedData) {
				this.updateTable(this.data);
			} else {
				this.table = this.createTable(this.data);
				this.instantiatedData = true;
			}
			this.updateLetters(this.table);

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

	private updateTable(data: ISplitFlapData): void {
		this.table.forEach((row, x) =>
			row.forEach((col, y) => {
				col.character = validate(data[x][y]);
			})
		);
	}

	private updateLetters(data: ISplitFlapTable) {
		this.letters = data
			.flatMap((col) => col)
			.filter((letter) => {
				return letter.character !== letter.current;
			});
	}

	private createTable(data: ISplitFlapData): ISplitFlapTable {
		return data.map((row) => row.map((col) => this.createLetter(col)));
	}

	private createLetter(character: string, color?: string): ILetter {
		return {
			character: validate(character),
			next: characterIds[0],
			current: characterIds[0],
			color: color,
		};
	}

	private flipper() {
		this.letters = this.letters.filter((letter) => {
			return letter.character !== letter.current;
		});

		if (this.letters.length === 0) {
			this.stop();
		} else {
			this.timeout1 = setTimeout(() => {
				this.timeout1 = undefined;
				this.letters.forEach((letter) => {
					letter.next = characterIds[characterIds.indexOf(letter.current) + 1] || ' ';
				});
			}, this.flipTime);
			this.timeout2 = setTimeout(() => {
				this.timeout2 = undefined;
				this.letters.forEach((letter) => {
					letter.current = letter.next;
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
