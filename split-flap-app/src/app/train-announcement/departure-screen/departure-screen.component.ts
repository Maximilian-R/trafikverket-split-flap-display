import { Component, OnInit, Input, ElementRef, AfterViewInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { TrainAnnouncement } from '../models/train-announcement.model';

@Component({
	selector: 'app-departure-screen',
	templateUrl: './departure-screen.component.html',
	styleUrls: ['./departure-screen.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartureScreenComponent implements OnInit, AfterViewInit {
	@Input() announcement: TrainAnnouncement;

	@ViewChild('screenRef') screenRef: ElementRef;
	@ViewChild('passbyRef') passbyRef: ElementRef;
	@ViewChild('passbyRef') extraRef: ElementRef;

	public scrollPassby: boolean = false;
	public scrollExtra: boolean = false;

	constructor(private cdRef: ChangeDetectorRef) {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.scrollPassby = this.overflows(this.passbyRef.nativeElement, this.screenRef.nativeElement);
		this.scrollExtra = this.overflows(this.extraRef.nativeElement, this.screenRef.nativeElement);
		this.cdRef.detectChanges();
	}

	private overflows(child: HTMLElement, parent: HTMLElement) {
		return child.clientWidth > parent.clientWidth;
	}
}
