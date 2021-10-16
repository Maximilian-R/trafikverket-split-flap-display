import { Component, OnInit, HostListener } from '@angular/core';
import { ISplitFlapInput } from '../flaps/flap.interface';
import { ISplitFlapTestCase, SplitFlapFlightTest, SplitFlapAnimationTest } from './split-flap-test-cases';

@Component({
	selector: 'app-split-flap-example',
	templateUrl: './split-flap-example.component.html',
	styleUrls: ['./split-flap-example.component.scss'],
})
export class SplitFlapExampleComponent implements OnInit {
	public data: ISplitFlapInput;
	public testCase: ISplitFlapTestCase = new SplitFlapAnimationTest();

	constructor() {}

	@HostListener('click', ['$event.target'])
	onClick() {
		if (this.testCase.data) {
			this.data = this.testCase.next();
		} else {
			this.data = this.testCase.initial();
			if (this.testCase instanceof SplitFlapAnimationTest) {
				this.testCase.animate((data: ISplitFlapInput) => {
					this.data = data;
				}, 60);
			}
		}
	}

	ngOnInit(): void {}
}
