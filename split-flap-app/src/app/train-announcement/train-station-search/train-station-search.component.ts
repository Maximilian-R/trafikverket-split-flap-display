import { Component, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TrafikverketApiService } from '../api/trafikverket-api.service';
import { Subject, of, merge } from 'rxjs';
import { switchMap, map, debounceTime, distinctUntilChanged, tap, catchError } from 'rxjs/operators';
import { ITrainStation, ITrainStations } from '../interfaces/train-station.interface';

@Component({
	selector: 'app-train-station-search',
	templateUrl: './train-station-search.component.html',
	styleUrls: ['./train-station-search.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainStationSearchComponent {
	filter$ = new Subject<string>();
	selected$ = new Subject<ITrainStation>();

	search: string = '';

	lastTyped: string = '';

	hits: ITrainStations = [];

	dropdownOpen: boolean = false;

	selected: number | undefined;

	lastSelected: ITrainStation;

	isValid: boolean;

	isSearching: boolean;

	isError: boolean;

	@Output() selectedTrainStation: EventEmitter<ITrainStation> = new EventEmitter();

	constructor(private ref: ChangeDetectorRef, private trafikverketApiService: TrafikverketApiService) {
		merge(
			this.filter$.pipe(
				distinctUntilChanged(),
				tap(() => (this.isSearching = true)),
				debounceTime(300),
				switchMap((search) => {
					return this.trafikverketApiService.searchTrainStations(search);
				}),
				tap(() => {
					this.isSearching = false;
					this.isError = false;
				}),
				catchError(() => {
					this.isError = true;
					return of([]);
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
		).subscribe((hits) => {
			this.hits = hits;
			this.ref.detectChanges();
		});
	}

	public input(value: string) {
		this.isValid = undefined;
		this.selected = undefined;
		this.lastTyped = value;
		this.search = value;
		this.filter$.next(value);
	}

	public preselect(index: number | undefined): void {
		this.selected = index;
		if (this.selected === undefined) {
			this.search = this.lastTyped;
		} else {
			this.search = this.hits[this.selected]?.AdvertisedLocationName;
		}
	}

	public select(): void {
		if (this.hits.length > 0 && this.selected === undefined) {
			this.preselect(0);
		}

		if (this.selected === undefined) {
			this.isValid = this.search.length === 0 ? undefined : !this.search;
			return;
		} else {
			this.isValid = true;
		}

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
		this.isValid = undefined;
		this.selected = undefined;
		this.search = '';
		this.lastTyped = '';
		this.selected$.next();
	}

	public clickOutside(event: any): void {
		if (this.dropdownOpen) {
			this.select();
		}
	}
}
