import { splitRows } from './utilites';

export const TEMPLATE_FLIGHT_DEPARTURE = splitRows([
	'TIME   FLIGHT   DESTINATION   VIA         CHECK-IN  GATE  REMARK   ',
	'10:35  RE 1355  NEW YORK JFK  COPENHAGEN  9-12      34    GATE OPEN',
	'10:45  AG 6154  LONDON HEATH              3-8       18    GATE OPEN',
	'11:05  CX 4971  PARIS COG                 14-19     9     GATE OPEN',
	'11:15  BI 1138  STOCKHOLM                 2         17    BOARDING ',
	'11:30  FI 2097  HELSINKI                  21-27     21    ON TIME  ',
	'11:45  KL 4563  FRANKFURT                 3-6       34    ON TIME  ',
	'11:55  DF 7206  LISBON                    15        7     DELAYED  ',
	'12:10  IC 9014  AMSTERDAM                 16-18     5     EST 12:20',
	'12:25  EK 4626  TOKYO         SHANGHAI    28-31     15    ON TIME  ',
	'12:40  UD 1740  HONG KONG     ISTANBUL    4-10      18    CANCELLED',
	'12:55  ST 9544  LOS ANGELES               17-21     4     ON TIME  ',
	'13:10  KB 3309  SINGAPORE     BANGKOK     23-25     27    DELAYED  ',
	'13:25  LR 5762  BRUSSELS                  7-10      19    ON TIME  ',
	'13:40  VL 6239  MUNICH                    12-14     3     ON TIME  ',
]);
