import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireFunctionsModule, USE_EMULATOR, REGION } from '@angular/fire/compat/functions';

import { SplitFlapModule } from './split-flap/split-flap.module';
import { TrainAnnouncementModule } from './train-announcement/train-announcement.module';
import { CoreModule } from './core/core.module';
import { environment } from 'src/environments/environment';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		CommonModule,
		AppRoutingModule,
		TrainAnnouncementModule,
		SplitFlapModule,
		CoreModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireFunctionsModule,
	],
	providers: [
		{ provide: USE_EMULATOR, useValue: environment.production ? undefined : ['localhost', 5001] },
		{ provide: REGION, useValue: 'europe-west1' },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
