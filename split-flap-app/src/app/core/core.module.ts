import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LoadingComponent } from './loading/loading.component';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { DropdownListComponent } from './dropdown-list/dropdown-list.component';
import { ArrowSelectorDirective } from './directives/arrow-selector.directive';
import { StrongTextPipe } from './pipes/strong-text.pipe';

@NgModule({
	declarations: [
		LoadingComponent,
		ThemeSelectorComponent,
		HeaderComponent,
		SearchComponent,
		DropdownListComponent,
		ArrowSelectorDirective,
		StrongTextPipe,
	],
	imports: [CommonModule, FormsModule, BrowserModule, BrowserAnimationsModule, FontAwesomeModule],
	exports: [
		LoadingComponent,
		ThemeSelectorComponent,
		HeaderComponent,
		SearchComponent,
		DropdownListComponent,
		ArrowSelectorDirective,
		StrongTextPipe,
	],
})
export class CoreModule {}
