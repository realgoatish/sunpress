export const mapTimes = (time) => {
	time = time.split(':'); // convert to array

	// fetch
	const hours = Number(time[0]);

	// calculate
	let timeValue;

	if (hours > 0 && hours <= 12) {
		timeValue = '' + hours;
	} else if (hours > 12) {
		timeValue = '' + (hours - 12);
	} else if (hours == 0) {
		timeValue = '12';
	}

	timeValue += hours >= 12 ? ' P.M.' : ' A.M.'; // get AM/PM

	return timeValue;
};
