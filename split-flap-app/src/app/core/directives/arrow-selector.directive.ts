import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

/**
 * Use arrow up and down to step between numbers, including undefined acting like an 'unset' state.
 */
@Directive({
	selector: '[appArrowSelector]',
})
export class ArrowSelectorDirective {
	/**
	 * Current value
	 */
	@Input() counter: number | undefined;

	/**
	 * Loop will change the behavior to cycle from undefined -> min -> max -> undefined
	 * and reverse.
	 */
	@Input() loop = false;

	/**
	 * Minimum counter value.
	 */
	@Input() min: number | undefined;

	/**
	 * Maximum counter value.
	 */
	@Input() max: number | undefined;

	/**
	 * By default arrow up increment, arrow down decrement.
	 */
	@Input() inverted: boolean = false;

	/**
	 * Selected value
	 */
	@Output() selected = new EventEmitter<number | undefined>();

	constructor() {}

	@HostListener('keydown.arrowup', ['$event'])
	onArrowUp(event: KeyboardEvent) {
		this.inverted ? this.decrement() : this.increment();
	}

	@HostListener('keydown.arrowdown', ['$event'])
	onArrowDown(event: KeyboardEvent) {
		this.inverted ? this.increment() : this.decrement();
	}

	increment() {
		if (this.counter !== undefined) {
			if (this.max !== undefined) {
				if (this.counter < this.max) {
					this.counter++;
				} else if (this.loop) {
					this.counter = undefined;
				}
			} else {
				this.counter++;
			}
		} else {
			this.counter = this.min || 0;
		}

		this.selected.emit(this.counter);
	}

	decrement() {
		if (this.counter !== undefined) {
			if (this.min !== undefined) {
				if (this.counter > this.min) {
					this.counter--;
				} else if (this.loop) {
					this.counter = undefined;
				}
			} else {
				this.counter--;
			}
		} else {
			this.counter = this.max || 0;
		}

		this.selected.emit(this.counter);
	}
}
