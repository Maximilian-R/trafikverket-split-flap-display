export interface ICodeDescription {
	Code: string;
	Description: string;
}

export interface ILocation {
	LocationName: string;
	Order: number;
	Priority: number;
}

export type ITrainAnnouncements = ITrainAnnouncement[];

export interface ITrainAnnouncement {
	ActivityId: string;
	ActivityType: string;
	Advertised: boolean;
	AdvertisedTimeAtLocation: Date;
	AdvertisedTrainIdent: string;
	Booking: ICodeDescription[];
	Canceled: boolean;
	Deleted: boolean;
	Deviation: ICodeDescription[];
	EstimatedTimeAtLocation: Date;
	EstimatedTimeIsPreliminary: boolean;
	FromLocation: ILocation[];
	InformationOwner: string;
	locationSignature: string;
	ModifiedTime: Date;
	NewEquipment: number;
	Operator: string;
	OtherInformation: ICodeDescription[];
	PlannedEstimatedTimeAtLocation: Date;
	PlannedEstimatedTimeAtLocationIsValid: boolean;
	ProductInformation: ICodeDescription[];
	ScheduledDepartureDateTime: Date;
	Service: ICodeDescription[];
	TechnicalDateTime: Date;
	TechnicalTrainIdent: string;
	TimeAtLocation: Date;
	TimeAtLocationWithSeconds: Date;
	ToLocation: ILocation[];
	TrackAtLocation: string;
	TrainComposition: ICodeDescription[];
	TrainOwner: string;
	TypeOfTraffic: ICodeDescription[];
	ViaFromLocation: ILocation[];
	ViaToLocation: ILocation[];
}
