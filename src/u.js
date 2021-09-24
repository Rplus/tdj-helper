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

const STORAGE_KEY = 'TDJ-HELPER';
export function saveItem(data) {
  if (!data || !data.key) { return false;}
  let odata = getItem() || {};

  odata[data.key] = data.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(odata));
};

export function getItem(key) {
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) { return null; }
  data = JSON.parse(data);

  return key ? data[key] : data;
};

const TYPES = {
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
].map(p => {
  p.range = TYPES[p.type];
  return p;
});

export function getProp(label) {
  return PROPS.find(p => p.label === label);
}

export const BreakPoints = {
  '天': 164,
  '地': 143,
  '荒': 145,
};

export const RockTypes = [
  '荒蟄',
  '頭狼',
  '幽魎',
  '羅鬼',

  '妖術師',
  '朱焰魔火',
  '九環朱蝮',

  '赤練鬼',
  '剛破鬼',
  '凶骸兵',

  '冥葵',
  '屍魔術士',

  '咒石兵',
  '冰魔蠍',
  '死魘鬼卒',

  '鬼面花蛛',
  '百眼翼魔',
];
