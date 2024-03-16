export const options = {
	types: [
		{
			type: 'pick',
			title: '選取 ↑',
		},
		{
			type: 'put',
			title: '放置 ↓',
		},
	],
	shapes: [
		{
			shape: 'diamond',
			title: '菱形',
		},
		{
			shape: 'square',
			title: '方形',
		},
	],
};

export function gen_cells(option, grid) {
	let { type, shape } = option;
	let cells = [];
	let limit = shape === 'square' ? get_factor(grid) : grid;

	for (let y = grid; y >= -grid; y--) {
		for (let x = -grid; x <= grid; x++) {
			let out = Math.abs(x) + Math.abs(y) > limit;
			cells.push({ x, y, out });
		}
	}

	let picked_cells = cells.filter((i) => !i.out).sort(sort_by_order(type, grid));

	let center_order = ~~(picked_cells.length / 2);
	let order_map = {};

	picked_cells.forEach((cell, order) => {
		let { x, y } = cell;
		if (!order_map[x]) {
			order_map[x] = {};
		}
		if (!order_map[x][y]) {
			order_map[x][y] = {};
		}

		if (option.type === 'pick') {
			if (order === 0) {
				order = center_order;
			} else if (x === 0 && y === 0) {
				order = 0;
			}
		}
		order_map[x][y] = order;
	});

	cells.forEach((cell, index) => {
		if (!cell.out) {
			cell.order = order_map[cell.x]?.[cell.y];
		}
		if (cell.x === 0 && cell.y === 0) {
			cell.center = true;
		}
	});

	return cells;
}

function calc_pick_order(cell, factor = 1000) {
	return cell.x * -factor - cell.y;
}
function calc_put_order(cell, grid, factor = 0.01) {
	let { x, y } = cell;
	let distance = grid * grid - Math.sqrt(x * x + y * y) * 10000;
	let _suffix = (y * grid * -2 - x) * factor;
	return distance + _suffix;
}
function sort_by_order(type, grid) {
	return type === 'pick' ? sort_by_pick_order(grid) : sort_by_put_order(grid);
}
function sort_by_pick_order(grid = 2) {
	const factor = get_factor(2);
	return (a, b) => {
		return calc_pick_order(b, factor) - calc_pick_order(a, factor);
	};
}
function sort_by_put_order(grid = 2) {
	const factor = Math.min(Math.pow(10, -1 - ~~Math.log10((grid * 2 + 1) * (grid * 2 + 1))), 0.01);
	return (a, b) => {
		return calc_put_order(b, grid, factor) - calc_put_order(a, grid, factor);
	};
}
function get_factor(grid = 2) {
	return Math.pow(10, Math.ceil(Math.log10(Math.pow(grid * 2 + 1, 3))));
}
