import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface ITheme {
	color: string;
	colorTint: string;
	name: string;
}

const THEMES: ITheme[] = [
	{
		color: '#171717',
		colorTint: '#2d2d2d',
		name: 'grey',
	},
	{
		color: '#ffffff',
		colorTint: '#d4d4d4',
		name: 'white',
	},
	{
		color: '#fe0100',
		colorTint: '#c00000',
		name: 'red',
	},
	{
		color: '#01cc34',
		colorTint: '#019443',
		name: 'green',
	},
	{
		color: '#00aec5',
		colorTint: '#007f88',
		name: 'blue',
	},
	{
		color: '#ffde24',
		colorTint: '#b49a05',
		name: 'yellow',
	},
];

@Component({
	selector: 'app-theme-selector',
	templateUrl: './theme-selector.component.html',
	styleUrls: ['./theme-selector.component.scss'],
})
export class ThemeSelectorComponent {
	@Input() themes: ITheme[] = THEMES;

	@Output() selected: EventEmitter<ITheme> = new EventEmitter();

	constructor() {}

	public select(theme: ITheme): void {
		this.selected.emit(theme);
	}
}
