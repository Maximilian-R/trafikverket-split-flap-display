import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SplitFlapModule } from './split-flap/split-flap.module';
import { TrainAnnouncementModule } from './train-announcement/train-announcement.module';
import { CoreModule } from './core/core.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, CommonModule, AppRoutingModule, TrainAnnouncementModule, SplitFlapModule, CoreModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
