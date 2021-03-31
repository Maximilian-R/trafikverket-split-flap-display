import { ITrainAnnouncement } from './train-announcement.interface';
import { ITrainStation } from './train-station.interface';

export interface ITVQueryResponse {
	RESPONSE: ITVResponse;
}

export interface ITVResponse {
	RESULT: ITVResult[];
}

export interface ITVResult {
	TrainAnnouncement?: ITrainAnnouncement[];
	TrainStation?: ITrainStation[];
}
