import { Component } from '@angular/core';
import { TrafikverketApiService } from '../api/trafikverket-api.service';
import { TrainAnnouncement } from '../models/train-announcement.model';

@Component({
	selector: 'app-train-announcement-example',
	templateUrl: './train-announcement-example.component.html',
	styleUrls: ['./train-announcement-example.component.scss'],
})
export class TrainAnnouncementExampleComponent {
	public announcements: TrainAnnouncement[];

	constructor(private trafikverketApiService: TrafikverketApiService) {
		this.announcements = [{} as TrainAnnouncement];

		this.trafikverketApiService.getTrainAnnouncements().subscribe((data) => {
			this.announcements = [{} as TrainAnnouncement, ...data];
		});
	}
}
