export function createDay(dayName) {
	return {
		name: 'day',
		type: 'object',
		title: 'Day',
		fields: [
			{
				name: 'dayOfWeek',
				type: 'string',
				title: 'Day Of The Week',
				initialValue: dayName,
				readOnly: true
			},
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
