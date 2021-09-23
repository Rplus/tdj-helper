export function clamp(num, min, max) {
	return num <= min
		? min
    : num >= max
  		? max
      : num
};

export function sum(numbers) {
  return numbers.reduce((all, i) => all + i, 0);
};
