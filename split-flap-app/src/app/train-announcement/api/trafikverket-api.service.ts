import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, forkJoin, timer } from 'rxjs';
import { map, switchMap, tap, delay } from 'rxjs/operators';
import { TRAIN_ANNOUNCEMENT_QUERY } from './train-announcement.query';
import { TRAIN_STATION_QUERY } from './train-station.query';
import { TRAIN_STATION_SEARCH_QUERY } from './train-station-search.query';
import { TrainAnnouncements, TrainAnnouncementAdapter } from '../models/train-announcement.model';
import { ITrainAnnouncement, ITrainAnnouncements } from '../interfaces/train-announcement.interface';
import { ITrainStations } from '../interfaces/train-station.interface';
import { ITVQueryResponse } from '../interfaces/trafikverket.interface';
import { LoadingService } from 'src/app/core/loading/loading.service';

const DEBUG: boolean = false;

const API_KEY: string = '';
const POST_URL: string = 'https://api.trafikinfo.trafikverket.se/v2/data.json';

const MOCK_ANNOUNCEMENTS: TrainAnnouncements = JSON.parse(
	'[{"trainNumber":"2835","track":"3","advertisedDepartureTime":"2020-11-01T12:51:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Pendeltåg","43"],"toLocation":["Västerhaninge"],"viaLocation":["Älvsjö"]},{"trainNumber":"2083","track":"10","advertisedDepartureTime":"2020-11-01T12:52:00.000+01:00","service":[],"trainComposition":["Vagnsordning A-B-C-D-E, Café i vagn B"],"productInformation":["MTRX"],"toLocation":["Göteborg C"],"viaLocation":["Skövde C","Herrljunga","Alingsås"]},{"trainNumber":"2934","track":"1/2","advertisedDepartureTime":"2020-11-01T12:53:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Pendeltåg","41"],"toLocation":["Upplands Väsby"],"viaLocation":["Solna"]},{"trainNumber":"2235","track":"3/4","advertisedDepartureTime":"2020-11-01T12:54:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Pendeltåg","40"],"toLocation":["Södertälje centrum"],"viaLocation":["Älvsjö"]},{"trainNumber":"10941","track":"11","advertisedDepartureTime":"2020-11-01T12:54:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Mälartåg SJ"],"toLocation":["Arboga"],"viaLocation":["Södertälje Syd","Nykvarn","Strängnäs","Eskilstuna C"]},{"trainNumber":"2534","track":"1/2","advertisedDepartureTime":"2020-11-01T12:56:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Pendeltåg","43"],"toLocation":["Sundbyberg"],"viaLocation":[]},{"trainNumber":"10113","track":"14","advertisedDepartureTime":"2020-11-01T12:59:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Mälartåg SJ"],"toLocation":["Hallsberg"],"viaLocation":["Södertälje Syd","Gnesta","Flen","Katrineholm C"]},{"trainNumber":"12636","track":"1/2","advertisedDepartureTime":"2020-11-01T13:00:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Pendeltåg","42X"],"toLocation":["Märsta"],"viaLocation":["Solna"]},{"trainNumber":"12737","track":"3/4","advertisedDepartureTime":"2020-11-01T13:01:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Pendeltåg","41"],"toLocation":["Älvsjö"],"viaLocation":[]},{"trainNumber":"2537","track":"3/4","advertisedDepartureTime":"2020-11-01T13:06:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Pendeltåg","43"],"toLocation":["Västerhaninge"],"viaLocation":["Älvsjö"]}]'
);

@Injectable({
	providedIn: 'root',
})
export class TrafikverketApiService {
	constructor(
		private http: HttpClient,
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
		if (DEBUG) {
			return of(MOCK_ANNOUNCEMENTS).pipe(
				tap((v) => this.loadingService.start()),
				delay(2000),
				tap((v) => this.loadingService.stop())
			);
		}

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
				// tap((v) => console.log(JSON.stringify(v)))
			),
			timer(2000),
		]).pipe(
			map((value) => value[0]),
			tap((v) => this.loadingService.stop())
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
		const body = this.createRequest(query);
		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'text/xml',
			}),
		};
		return this.http.post<ITVQueryResponse>(POST_URL, body, options);
	}

	private createRequest(query: string): string {
		return `
            <REQUEST>
                <LOGIN authenticationkey="${API_KEY}" />
                ${query}
            </REQUEST>
            `;
	}
}
