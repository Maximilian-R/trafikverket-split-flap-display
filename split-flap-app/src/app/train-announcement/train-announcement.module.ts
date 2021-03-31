import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DepartureScreenComponent } from './departure-screen/departure-screen.component';
import { TrainAnnouncementExampleComponent } from './example/train-announcement-example.component';
import { SplitFlapDepartureComponent } from './split-flap-departure/split-flap-departure.component';
import { SplitFlapModule } from '../split-flap/split-flap.module';
import { CoreModule } from '../core/core.module';
import { ClickOutsideModule } from 'ng-click-outside';
import { TrainStationSearchComponent } from './train-station-search/train-station-search.component';

@NgModule({
	declarations: [DepartureScreenComponent, TrainAnnouncementExampleComponent, SplitFlapDepartureComponent, TrainStationSearchComponent],
	imports: [CommonModule, HttpClientModule, SplitFlapModule, CoreModule, ClickOutsideModule],
	exports: [DepartureScreenComponent, TrainAnnouncementExampleComponent, SplitFlapDepartureComponent, TrainStationSearchComponent],
})
export class TrainAnnouncementModule {}
