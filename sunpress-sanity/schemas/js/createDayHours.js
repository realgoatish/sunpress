import { createDay } from './createDay';

export function createDayHours(day) {
	return {
		name: `${day.toLowerCase()}`,
		type: 'object',
		title: `${day} Hours`,
		fields: [
			createDay(day),
			{
				name: 'opens',
				type: 'militaryTime'
			},
			{
				name: 'closes',
				type: 'militaryTime'
			}
		]
	};
}
