import { Component } from '@angular/core';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
	public isLoading$: Observable<boolean>;

	constructor(private loadingService: LoadingService) {
		this.isLoading$ = this.loadingService.isLoading();
	}
}
