import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { TrainAnnouncements } from '../models/train-announcement.model';
import { LoadingService } from 'src/app/core/loading/loading.service';

const MOCK_ANNOUNCEMENTS: TrainAnnouncements = JSON.parse(
	'[{"trainNumber":"2835","track":"3","advertisedDepartureTime":"2020-11-01T12:51:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Pendeltåg","43"],"toLocation":["Västerhaninge"],"viaLocation":["Älvsjö"]},{"trainNumber":"2083","track":"10","advertisedDepartureTime":"2020-11-01T12:52:00.000+01:00","service":[],"trainComposition":["Vagnsordning A-B-C-D-E, Café i vagn B"],"productInformation":["MTRX"],"toLocation":["Göteborg C"],"viaLocation":["Skövde C","Herrljunga","Alingsås"]},{"trainNumber":"2934","track":"1/2","advertisedDepartureTime":"2020-11-01T12:53:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Pendeltåg","41"],"toLocation":["Upplands Väsby"],"viaLocation":["Solna"]},{"trainNumber":"2235","track":"3/4","advertisedDepartureTime":"2020-11-01T12:54:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Pendeltåg","40"],"toLocation":["Södertälje centrum"],"viaLocation":["Älvsjö"]},{"trainNumber":"10941","track":"11","advertisedDepartureTime":"2020-11-01T12:54:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Mälartåg SJ"],"toLocation":["Arboga"],"viaLocation":["Södertälje Syd","Nykvarn","Strängnäs","Eskilstuna C"]},{"trainNumber":"2534","track":"1/2","advertisedDepartureTime":"2020-11-01T12:56:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Pendeltåg","43"],"toLocation":["Sundbyberg"],"viaLocation":[]},{"trainNumber":"10113","track":"14","advertisedDepartureTime":"2020-11-01T12:59:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Mälartåg SJ"],"toLocation":["Hallsberg"],"viaLocation":["Södertälje Syd","Gnesta","Flen","Katrineholm C"]},{"trainNumber":"12636","track":"1/2","advertisedDepartureTime":"2020-11-01T13:00:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Pendeltåg","42X"],"toLocation":["Märsta"],"viaLocation":["Solna"]},{"trainNumber":"12737","track":"3/4","advertisedDepartureTime":"2020-11-01T13:01:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Pendeltåg","41"],"toLocation":["Älvsjö"],"viaLocation":[]},{"trainNumber":"2537","track":"3/4","advertisedDepartureTime":"2020-11-01T13:06:00.000+01:00","service":[],"trainComposition":[],"productInformation":["Pendeltåg","43"],"toLocation":["Västerhaninge"],"viaLocation":["Älvsjö"]}]'
);

@Injectable({
	providedIn: 'root',
})
export class TrafikverketApiMockService {
	constructor(private loadingService: LoadingService) {}

	public getTrainAnnouncements(locationSignatures: string[]): Observable<TrainAnnouncements> {
		return of(MOCK_ANNOUNCEMENTS).pipe(
			tap(() => this.loadingService.start()),
			delay(2000),
			tap(() => this.loadingService.stop())
		);
	}
}
