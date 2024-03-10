import data from '$lib/data/strategy.min.json';

data.forEach((i) => {
	i.desc_html = i.desc.replace(
		/.+所有我方上陣角色物攻，物防，法攻，法防提高(\d+%)[。，](.+)?$/gm,
		`攻防+$1\n$2`,
	);
});

export const strategy_data = data;

export function find_strategy(prop, value) {
	return data.find((item) => item[prop] === value);
}
