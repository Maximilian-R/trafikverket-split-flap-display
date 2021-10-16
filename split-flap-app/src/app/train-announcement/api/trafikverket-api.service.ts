import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, timer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { TRAIN_ANNOUNCEMENT_QUERY } from './train-announcement.query';
import { TRAIN_STATION_QUERY } from './train-station.query';
import { TRAIN_STATION_SEARCH_QUERY } from './train-station-search.query';
import { TrainAnnouncements, TrainAnnouncementAdapter } from '../models/train-announcement.model';
import { ITrainAnnouncement, ITrainAnnouncements } from '../interfaces/train-announcement.interface';
import { ITrainStations } from '../interfaces/train-station.interface';
import { ITVQueryResponse } from '../interfaces/trafikverket.interface';
import { LoadingService } from 'src/app/core/loading/loading.service';

@Injectable({
	providedIn: 'root',
})
export class TrafikverketApiService {
	private callable = this.functions.httpsCallable('trafikverket');

	constructor(
		private functions: AngularFireFunctions,
		private trainAnnouncementAdapter: TrainAnnouncementAdapter,
		private loadingService: LoadingService
	) {}

	private allLocationsFor(announcements: ITrainAnnouncements): string[] {
		return announcements.flatMap((announcement: ITrainAnnouncement) => {
			return [
				...(announcement.ToLocation?.map((location) => location.LocationName) || []),
				...(announcement.ViaToLocation?.map((location) => location.LocationName) || []),
			];
		});
	}

	public searchTrainStations(search: string): Observable<ITrainStations> {
		if (!search) {
			return of([]);
		}
		const query = TRAIN_STATION_SEARCH_QUERY(search, 10);
		return this.post(query).pipe(map((response) => response.RESPONSE.RESULT[0].TrainStation));
	}

	public getTrainAnnouncements(locationSignatures: string[] = ['Cst', 'Sci']): Observable<TrainAnnouncements> {
		const toModel = ([announcements, stations]: [ITrainAnnouncements, ITrainStations]): TrainAnnouncements => {
			return announcements.map((announcement) => this.trainAnnouncementAdapter.adapt([announcement, stations]));
		};

		this.loadingService.start();
		// use forkjoin with timer to wait at least x ms even if response was faster
		return forkJoin([
			this.queryTrainAnnouncements(locationSignatures).pipe(
				switchMap((announcements: ITrainAnnouncements) => {
					const locationSignatures = this.allLocationsFor(announcements);
					return this.queryTrainStations(locationSignatures).pipe(map((stations) => [announcements, stations]));
				}),
				map(toModel)
			),
			timer(2000),
		]).pipe(
			map((value) => value[0]),
			tap(() => this.loadingService.stop())
		);
	}

	private queryTrainAnnouncements(locationSignatures: string[]): Observable<ITrainAnnouncements> {
		if (locationSignatures.length === 0) {
			return of([]);
		}
		const query = TRAIN_ANNOUNCEMENT_QUERY(locationSignatures);
		return this.post(query).pipe(map((response) => response.RESPONSE.RESULT[0].TrainAnnouncement));
	}

	public queryTrainStations(locationSignatures: string[]): Observable<ITrainStations> {
		if (locationSignatures.length === 0) {
			return of([]);
		}
		const query = TRAIN_STATION_QUERY(locationSignatures);
		return this.post(query).pipe(map((response) => response.RESPONSE.RESULT[0].TrainStation));
	}

	private post(query: string): Observable<ITVQueryResponse> {
		return this.callable(query);
	}
}
