import { mapTimes } from './mapTimes';

export const mapHoursOfOperation = (input) => {
	// we want to reduce our input array into a (probably smaller) array
	let aggregated = input.reduce((acc, cv) => {
		// grab the last element in our range -- we'll use this to compare against
		let prev = acc[acc.length - 1];

		// if there isn't a previous (this is the first), then we just add it
		if (!prev) {
			acc.push({
				day: cv.day,
				opens: cv.opens,
				closes: cv.closes
			});
		} else if (cv.opens === prev.opens && cv.closes === prev.closes) {
			// update the previous one to include this range (by weekday name), do not modify array
			prev.untilWeekday = cv.day;
		} else {
			// it's a new range, add it.
			acc.push({
				day: cv.day,
				opens: cv.opens,
				closes: cv.closes
			});
		}

		return acc;
	}, []);

	// we now have an array that resembles our input, except aggregated days appear as a start (weekday prop) and end (untilWeekday prop). So we need to map these to strings accordingly:
	return aggregated.map((obj) => {
		let day = obj.day;

		// if this object represents an aggregate of days, we add the untilWeekday prop to the end abbreviated
		if (obj.untilWeekday) {
			day += ` to ${obj.untilWeekday}`;
		}

		if (obj.opens === '00:00' && obj.closes === '00:00') {
			return {
				days: day,
				times: 'Closed'
			};
		}

		return {
			days: day,
			times: `${mapTimes(obj.opens)} to ${mapTimes(obj.closes)}`
		};
	});
};
