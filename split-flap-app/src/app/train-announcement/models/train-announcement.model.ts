import { Injectable } from '@angular/core';
import { ITrainAnnouncement, ICodeDescription, ILocation } from '../interfaces/train-announcement.interface';
import { ITrainStation } from '../interfaces/train-station.interface';
import { Adapter } from 'src/app/core/adapter.interface';

export type TrainAnnouncements = TrainAnnouncement[];

export class TrainAnnouncement {
	trainNumber: string;
	track: string;
	advertisedDepartureTime: Date;
	estimatedDepartureTime: Date;
	timeAtLocation: Date;
	toLocation: string[];
	viaLocation: string[];
	service: string[];
	trainComposition: string[];
	productInformation: string[];
	canceled: boolean;

	constructor(opts: any) {
		this.trainNumber = opts.trainNumber;
		this.track = opts.track;
		this.advertisedDepartureTime = opts.advertisedDepartureTime;
		this.estimatedDepartureTime = opts.estimatedDepartureTime && new Date(opts.estimatedDepartureTime);
		this.timeAtLocation = opts.timeAtLocation && new Date(opts.timeAtLocation);
		this.toLocation = opts.toLocation;
		this.viaLocation = opts.viaLocation;
		this.service = opts.service;
		this.trainComposition = opts.trainComposition;
		this.productInformation = opts.productInformation;
		this.canceled = opts.canceled;
	}

	public get hasDeparted(): boolean {
		return this.timeAtLocation && this.timeAtLocation < new Date();
	}

	public get hasNewDepartureTime(): boolean {
		return this.estimatedDepartureTime && this.advertisedDepartureTime !== this.estimatedDepartureTime;
	}
}

@Injectable({
	providedIn: 'root',
})
export class TrainAnnouncementAdapter implements Adapter<[ITrainAnnouncement, ITrainStation[]], TrainAnnouncement> {
	public adapt([announcement, stations]: [ITrainAnnouncement, ITrainStation[]]): TrainAnnouncement {
		return new TrainAnnouncement({
			trainNumber: announcement.AdvertisedTrainIdent,
			track: announcement.TrackAtLocation,
			advertisedDepartureTime: announcement.AdvertisedTimeAtLocation && new Date(announcement.AdvertisedTimeAtLocation),
			estimatedDepartureTime: announcement.EstimatedTimeAtLocation && new Date(announcement.EstimatedTimeAtLocation),
			timeAtLocation: announcement.TimeAtLocation && new Date(announcement.TimeAtLocation),
			service: announcement.Service?.map(this.description) || [],
			trainComposition: announcement.TrainComposition?.map(this.description) || [],
			productInformation: announcement.ProductInformation?.map(this.description) || [],
			toLocation: this.location(announcement.ToLocation || [], stations),
			viaLocation: this.location(announcement.ViaToLocation || [], stations),
			canceled: announcement.Canceled,
		});
	}

	private location(locations: ILocation[], stations: ITrainStation[]) {
		if (locations.length === 0 || stations.length === 0) {
			return [];
		}
		return locations.map((location) => stations.find((s) => s.LocationSignature === location.LocationName).AdvertisedLocationName);
	}

	private description(value: ICodeDescription): string {
		return value.Description;
	}
}
