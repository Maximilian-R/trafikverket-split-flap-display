export type ITrainStations = ITrainStation[];

export interface ITrainStation {
	Advertised: boolean;
	AdvertisedLocationName: string;
	AdvertisedShortLocationName: string;
	CountryCode: string;
	CountyNo: number[];
	Deleted: boolean;
	LocationInformationText: string;
	LocationSignature: string;
	ModifiedTime: Date;
	PlatformLine: string[];
	Prognosticated: boolean;
}
