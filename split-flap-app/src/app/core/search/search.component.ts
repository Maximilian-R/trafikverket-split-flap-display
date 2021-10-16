import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';
import {
	IconDefinition,
	faTimesCircle,
	faExclamationCircle,
	faCheckCircle,
	faSpinner,
	faBackspace,
} from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnChanges {
	faTimesCircle = faTimesCircle;
	faCheckCircle = faCheckCircle;
	faCircle = faCircle;
	faBackSpace = faBackspace;

	rightIcon: IconDefinition;

	@Input() value: string;

	@Input() loading: boolean;

	@Input() error: boolean;

	@Input() placeholder: string = '';

	@Input() valid: boolean = undefined;

	@Output() inputChanged: EventEmitter<string> = new EventEmitter();
	@Output() cleared: EventEmitter<void> = new EventEmitter();
	@Output() submitted: EventEmitter<void> = new EventEmitter();

	@ViewChild('input') inputRef: ElementRef;

	constructor() {}

	ngOnChanges() {
		this.rightIcon = this.loading ? faSpinner : this.error ? faExclamationCircle : this.value ? faBackspace : undefined;
	}

	public clear(): void {
		this.cleared.emit();
		(this.inputRef.nativeElement as HTMLElement).focus();
	}

	public submit(): void {
		this.submitted.emit();
	}
}
