import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
// import { hitsEnterLeaveAnimation } from './dropdown-list.animation';

@Component({
	selector: 'app-dropdown-list',
	templateUrl: './dropdown-list.component.html',
	styleUrls: ['./dropdown-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	//animations: [hitsEnterLeaveAnimation],
})
export class DropdownListComponent {
	@Input() isOpen: boolean = true;

	@Input() index: number | undefined;

	constructor() {}
}
