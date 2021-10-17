import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [DatePipe],
})
export class SplitFlapDepartureComponent {
	@Input() set trainStation(trainStation: ITrainStation) {
		if (trainStation) {
			this.signature$.next(trainStation.LocationSignature);
		}
	}
	private signature$: Subject<string> = new Subject();
	private refresh$: Subject<void> = new Subject();

	public theme: ITheme = THEMES[4];
	public isLoading$: Observable<boolean>;
	public data$: Observable<{ all: TrainAnnouncements; data: ISplitFlapInput }>;

	constructor(
		private trafikverketApiService: TrafikverketApiService,
		private datePipe: DatePipe,
		private loadingService: LoadingService
	) {
		this.isLoading$ = this.loadingService.isLoading();
		this.data$ = this.signature$.pipe(
			switchMap((signature) => {
				return this.refresh$.pipe(
					startWith(0),
					switchMap(() => timer(0, 60000)),
					map(() => signature)
				);
			}),
			switchMap((signature) => {
				return this.trafikverketApiService.getTrainAnnouncements([signature]).pipe(
					map((announcements) => {
						return {
							all: announcements,
							data: TEMPLATE_DEPARTURE(announcements, this.datePipe),
						};
					})
				);
			}),
			startWith({ all: [], data: undefined })
		);
	}

	public refresh() {
		this.refresh$.next();
	}
}
