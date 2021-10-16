import { DatePipe } from '@angular/common';
import { ISplitFlapInput } from 'src/app/split-flap/flaps/flap.interface';
import { TrainAnnouncements } from '../../models/train-announcement.model';
import { TEMPLATE_NO_DEPARTURE } from './no-departures.template';

export const TEMPLATE_DEPARTURE = (announcements: TrainAnnouncements, datePipe: DatePipe): ISplitFlapInput => {
	//const header = 'AVGÅNGNY TIDTILL           SPÅRTÅG  OPERATÖR    '.split('');
	const rows = announcements.map((announcement) => {
		const time = datePipe.transform(announcement.advertisedDepartureTime, 'HH:mm');
		const newTime = announcement.hasNewDepartureTime ? datePipe.transform(announcement.estimatedDepartureTime, 'HH:mm') : '';
		const to = announcement.toLocation[0].toUpperCase();
		const track = announcement.track.toUpperCase();
		const train = announcement.trainNumber.toUpperCase();
		const operator = (announcement.productInformation[0] || '').toUpperCase();
		const remark = announcement.hasDeparted
			? 'HAR AVGÅTT'
			: announcement.hasNewDepartureTime
			? 'FÖRSENAD'
			: announcement.canceled
			? 'INSTÄLLT'
			: operator;
		const status = announcement.hasDeparted ? 'g' : announcement.hasNewDepartureTime ? 'y' : announcement.canceled ? 'r' : ' ';
		const row = [
			...Array.from(Array(5), (space, index) => time[index] || ' '),
			...Array.from(Array(15), (space, index) => to[index] || ' '),
			...Array.from(Array(5), (space, index) => newTime[index] || ' '),
			...Array.from(Array(3), (space, index) => track[index] || ' '),
			...Array.from(Array(5), (space, index) => train[index] || ' '),
			...Array.from(Array(12), (space, index) => remark[index] || ' '),
			...Array.from(Array(1), (space, index) => status),
		];
		return row;
	});

	if (rows.length === 0) {
		return TEMPLATE_NO_DEPARTURE;
	} else if (rows.length < 10) {
		return [...rows, ...Array(10 - rows.length).fill(Array(46).fill(' '))];
	} else {
		return [...rows];
	}
};
