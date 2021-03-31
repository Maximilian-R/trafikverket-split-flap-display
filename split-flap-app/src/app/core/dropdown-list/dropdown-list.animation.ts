import { trigger, style, animate, transition, query, stagger, group } from '@angular/animations';

export const hitsEnterLeaveAnimation = trigger('stagger', [
	transition('* => *', [
		group([
			query('li:enter', [style({ left: '-100%' }), stagger(50, [animate('200ms ease-in-out', style({ left: 0 }))])], {
				optional: true,
			}),
			query(
				'li:leave',
				[
					style({ opacity: 1, height: '*' }),
					animate('200ms ease-in-out', style({ opacity: 0 })),
					animate('200ms ease-in-out', style({ height: 0, padding: 0 })),
				],
				{ optional: true }
			),
		]),
	]),
]);
