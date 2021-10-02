import { Component } from '@angular/core';
import { ITrainStation } from './train-announcement/interfaces/train-station.interface';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'split-flap-app';

	trainStation: ITrainStation;

	constructor() {}
}
