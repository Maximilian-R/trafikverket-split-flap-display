import { Component, Input } from '@angular/core';
import { TrafikverketApiService } from '../api/trafikverket-api.service';
import { TrainAnnouncement, TrainAnnouncements } from '../models/train-announcement.model';
import { ISplitFlapData } from 'src/app/split-flap/split-flap.component';
import { combineLatest, timer, Observable, Subject, merge, of } from 'rxjs';
import { switchMap, map, tap, startWith } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ITheme, THEMES } from 'src/app/core/theme-selector/theme-selector.component';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { ITrainStation } from '../interfaces/train-station.interface';
import { TEMPLATE_NO_DEPARTURE } from './templates/no-departures.template';

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
	public data: ISplitFlapData;
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
				this.data = this.createSplitFlapData(announcements);
			});
	}

	private createSplitFlapData(announcements: TrainAnnouncements): ISplitFlapData {
		//const header = 'AVGÅNGNY TIDTILL           SPÅRTÅG  OPERATÖR    '.split('');
		const rows = announcements.map((announcement) => {
			const time = this.datePipe.transform(announcement.advertisedDepartureTime, 'HH:mm');
			const newTime = announcement.hasNewDepartureTime ? this.datePipe.transform(announcement.estimatedDepartureTime, 'HH:mm') : '';
			const to = announcement.toLocation[0].toUpperCase();
			const track = announcement.track.toUpperCase();
			const train = announcement.trainNumber.toUpperCase();
			const operator = (announcement.productInformation[0] || '').toUpperCase();
			const remark = announcement.hasDeparted
				? 'HAR AVGÅTT'
				: announcement.hasNewDepartureTime
				? 'FÖRSENAD'
				: announcement.canceled
				? 'INSTÄLLT'
				: operator;
			const status = announcement.hasDeparted ? 'g' : announcement.hasNewDepartureTime ? 'y' : announcement.canceled ? 'r' : ' ';
			const row = [
				...Array.from(Array(5), (space, index) => time[index] || ' '),
				...Array.from(Array(15), (space, index) => to[index] || ' '),
				...Array.from(Array(5), (space, index) => newTime[index] || ' '),
				...Array.from(Array(3), (space, index) => track[index] || ' '),
				...Array.from(Array(5), (space, index) => train[index] || ' '),
				...Array.from(Array(12), (space, index) => remark[index] || ' '),
				...Array.from(Array(1), (space, index) => status),
			];
			return row;
		});

		if (rows.length === 0) {
			return TEMPLATE_NO_DEPARTURE;
		} else if (rows.length < 10) {
			return [...rows, ...Array(10 - rows.length).fill(Array(46).fill(' '))];
		} else {
			return [...rows];
		}
	}

	public setStation(station: ITrainStation) {
		this.trainStation = station;
	}

	public refresh() {
		this.refresh$.next();
	}
}
