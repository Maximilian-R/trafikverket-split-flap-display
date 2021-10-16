import { Component, Input } from '@angular/core';
import { TrafikverketApiService } from '../api/trafikverket-api.service';
import { TrainAnnouncements } from '../models/train-announcement.model';
import { timer, Observable, Subject } from 'rxjs';
import { switchMap, map, startWith } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ITheme, THEMES } from 'src/app/core/theme-selector/theme-selector.component';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { ITrainStation } from '../interfaces/train-station.interface';
import { ISplitFlapInput } from 'src/app/split-flap/flaps/flap.interface';
import { TEMPLATE_DEPARTURE } from './templates/departure.template';

@Component({
	selector: 'app-split-flap-departure',
	templateUrl: './split-flap-departure.component.html',
	styleUrls: ['./split-flap-departure.component.scss'],
	providers: [DatePipe],
})
export class SplitFlapDepartureComponent {
	@Input() set trainStation(trainStation: ITrainStation) {
		if (trainStation) {
			this.trainStation$.next(trainStation);
		}
	}
	private trainStation$: Subject<ITrainStation> = new Subject();
	private refresh$: Subject<void> = new Subject();

	public announcements: TrainAnnouncements = [];
	public data: ISplitFlapInput;
	public theme: ITheme = THEMES[4];
	public isLoading$: Observable<boolean>;

	constructor(
		private trafikverketApiService: TrafikverketApiService,
		private datePipe: DatePipe,
		private loadingService: LoadingService
	) {
		this.isLoading$ = this.loadingService.isLoading();
		const trigger$ = this.trainStation$.pipe(map((trainStation) => trainStation.LocationSignature));
		trigger$
			.pipe(
				switchMap((signature) => {
					return this.refresh$.pipe(
						startWith(0),
						switchMap(() => timer(0, 60000)),
						map(() => signature)
					);
				}),
				switchMap((signature) => {
					return this.trafikverketApiService.getTrainAnnouncements([signature]);
				})
			)
			.subscribe((announcements) => {
				this.announcements = announcements;
				this.data = TEMPLATE_DEPARTURE(announcements, this.datePipe);
			});
	}

	public setStation(station: ITrainStation) {
		this.trainStation = station;
	}

	public refresh() {
		this.refresh$.next();
	}
}
