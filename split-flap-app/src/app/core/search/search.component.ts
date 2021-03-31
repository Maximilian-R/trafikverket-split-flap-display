import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { faTimesCircle, faCheckCircle, faCircle, faSearch, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
	faTimesCircle = faTimesCircle;
	faCheckCircle = faCheckCircle;
	faCircle = faCircle;
	faSearch = faSearch;
	faTimes = faTimes;
	faSpinner = faSpinner;

	@Input() value: string;

	@Input() loading: boolean;

	@Input() placeholder: string = '';

	@Input() valid: boolean = undefined;

	@Output() inputChanged: EventEmitter<string> = new EventEmitter();
	@Output() cleared: EventEmitter<void> = new EventEmitter();
	@Output() submitted: EventEmitter<void> = new EventEmitter();

	@ViewChild('input') inputRef: ElementRef;

	constructor() {}

	public clear(): void {
		this.cleared.emit();
		(this.inputRef.nativeElement as HTMLElement).focus();
	}

	public submit(): void {
		this.submitted.emit();
	}
}
