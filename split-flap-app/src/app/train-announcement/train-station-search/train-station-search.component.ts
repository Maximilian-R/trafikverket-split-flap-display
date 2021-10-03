import { Component, Output, EventEmitter } from '@angular/core';
import { TrafikverketApiService } from '../api/trafikverket-api.service';
import { Subject, of, merge } from 'rxjs';
import { switchMap, map, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ITrainStation, ITrainStations } from '../interfaces/train-station.interface';

@Component({
	selector: 'app-train-station-search',
	templateUrl: './train-station-search.component.html',
	styleUrls: ['./train-station-search.component.scss'],
})
export class TrainStationSearchComponent {
	filter$ = new Subject<string>();
	selected$ = new Subject<ITrainStation>();

	search: string = '';

	lastTyped: string = '';

	hits: ITrainStations = [];

	dropdownOpen: boolean = false;

	selected: number | undefined;

	valid: boolean;

	lastSelected: ITrainStation;

	isSearching: boolean = false;

	@Output() selectedTrainStation: EventEmitter<ITrainStation> = new EventEmitter();

	// TODO: Test when there is a slow response from api service
	constructor(private trafikverketApiService: TrafikverketApiService) {
		merge(
			this.filter$.pipe(
				distinctUntilChanged(),
				tap(() => (this.isSearching = true)),
				debounceTime(300),
				switchMap((search) => {
					if (search) {
						this.isSearching = true;
						return this.trafikverketApiService.searchTrainStations(search).pipe(tap(() => (this.isSearching = false)));
					} else {
						return of<ITrainStations>([]);
					}
				})
			),
			this.selected$.pipe(
				map((station) => {
					if (station) {
						this.selected = 0;
						this.lastTyped = station.AdvertisedLocationName;
						return [station];
					}
					return [];
				})
			)
		).subscribe((hits) => (this.hits = hits));
	}

	public input(value: string) {
		this.valid = undefined;
		this.selected = undefined;
		this.lastTyped = value;
		this.search = value;
		this.filter$.next(value);
	}

	public preselect(index: number | undefined): void {
		this.selected = index;
		if (this.selected !== undefined) {
			this.search = this.hits[this.selected]?.AdvertisedLocationName;
		} else {
			this.search = this.lastTyped;
		}
	}

	public select(): void {
		if (this.hits.length > 0 && this.selected === undefined) {
			// select first
			this.preselect(0);
		}

		if (this.selected === undefined) {
			// nothing found, error?
			this.valid = this.search.length === 0 ? undefined : !this.search;
			return;
		}

		this.valid = true;
		const toSelect = this.hits[this.selected];

		if (this.lastSelected?.LocationSignature === toSelect?.LocationSignature) {
		} else {
			this.lastSelected = toSelect;
			this.selectedTrainStation.emit(toSelect);
			this.selected$.next(toSelect);
		}

		this.close();
		(document.activeElement as HTMLElement).blur();
	}

	public close(): void {
		this.dropdownOpen = false;
	}

	public focusin(): void {
		this.dropdownOpen = true;
	}

	public clear(): void {
		this.valid = undefined;
		this.search = '';
		this.selected = undefined;
		this.lastTyped = '';
		this.selected$.next();
	}

	public clickOutside(event: any): void {
		if (this.dropdownOpen) {
			this.select();
		}
	}
}
