import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoadingService {
	private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor() {}

	public start(): void {
		this.loading$.next(true);
	}

	public stop(): void {
		this.loading$.next(false);
	}

	public isLoading(): Observable<boolean> {
		return this.loading$.asObservable();
	}
}
