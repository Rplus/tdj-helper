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
export const PROPS = [
  { label: '--',  score: 0, type: 'atk', },
  { label: '攻擊',  score: 11, type: 'atk', },
  { label: '傷害',  score: 10, type: 'atk', },
  { label: '穿透',  score: 6, type: 'atk', },
  { label: '暴擊',  score: 3, type: 'atk', },
  { label: '反擊',  score: 0, type: 'atk', },

  { label: '氣血',  score: 7, type: 'def', },
  { label: '免傷',  score: 5, type: 'def', },
  { label: '防禦',  score: 1, type: 'def', },
  { label: '抗暴',  score: 0, type: 'def', },
];

export const TYPES = {
  atk: {
    '天': [10, 4],
    '地': [5, 2],
    '荒': [7, 3],
  },
  def: {
    '天': [5, 2],
    '地': [10, 4],
    '荒': [7, 3],
  }
};
