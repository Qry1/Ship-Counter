const sea = [
  'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'X', 'X',
  'X', 'O', 'X', 'O', 'X', 'X', 'X', 'X', 'O', 'O', 'O', 'O',
  'X', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
  'X', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'X', 'O', 'X', 'O',
	'X', 'O', 'O', 'X', 'O', 'X', 'O', 'O', 'O', 'O', 'X', 'O',
	'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'O',
  'X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O', 'O', 'X', 'O',
  'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'O',
	'O', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O',
	'O', 'X', 'O', 'X', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O',
	'O', 'X', 'O', 'O', 'O', 'O', 'O', 'X', 'X', 'O', 'X', 'O',
	'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
  'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X',
  'O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'O', 'O', 'O',
	'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'X',
	'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
	'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
	'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
]; // width 12, I-deck: 8, II-deck: 6, III-deck: 2, IV-deck: 1, V-deck: 1, VI-deck: 2

function shipCounter(sea, lineSize) {

	const field = [...sea];
	const ship = 'X';
	const none = 'O';
	const width = lineSize;
	
	let length = field.length;
	let result = [];

	// Блок проверок

	// Проверка соседних верхних, правых, нижних клеток на отсутствие коллизий расстояновки кораблей

	function checkSiblingsTopRightBottom(field) {
		for (let i = 0; i < length; i++) {
			if (field[i] === ship) {
				if (field[i + 1] === ship && (i + 1) % width !== 0 && (field[i + width] === ship || field[i - width] === ship)) {
					return `Error`;
				};
			};
		};
	};

	// Проверка соседних верхних диагональных клеток на отсутствие коллизий расстояновки кораблей

	function checkSiblingDiagonalTop(field) {
		for (let i = 0; i < length; i++) {
			if (field[i] === ship) {
				if (field[i - width + 1] === ship && (i - width + 1) % width !== 0  || field[i - width - 1] === ship && (i - width) % width !== 0 ) {
					return `Error`;
				};
			};
		};
	};

	// Проверка соседних нижних диагональных клеток на отсутствие коллизий расстояновки кораблей

	function checkSiblingDiagonalBottom(field) {
		for (let i = 0; i < length; i++) {
			if (field[i] === ship) {
				if (field[i + width - 1] === ship && (i + width) % width !== 0 || field[i + width + 1] === ship && (i + width + 1) % width !== 0) {
					return `Error`;
				};
			};
		};
	};

	// Главная условие проверки правильного расположения кораблей с учетом вышенаписанных проверок

	if (checkSiblingsTopRightBottom(field) === 'Error' || checkSiblingDiagonalTop(field) === 'Error' || checkSiblingDiagonalBottom(field) === 'Error') {
		return 'Wrong position of ships'
	};

	// Функция записи типа кораблей в результирующий массив, значение элемента показывает количетво палуб, а количетво элементов - количество кораблей

	function shipWriter(number) {
		result.push(number);
	};

	// Цикл подсчета кораблей

	for (let i = 0; i <= length; i++) {

		// Подсчет кораблей по горизонтальным линиям

		if (field[i] === ship && field[i + width] !== ship) {
			for (let j = i + 1; j <= length; j++) {
				if (field[j] === none || j % width === 0 || field[j] === undefined) {
					shipWriter(j - i);
					break;
				};
				field[j] = none;
			};
			field[i] = none;
		};

		// Подсчет кораблей по вертикальным линиям

		if (field[i] === ship && field[i + width] === ship) {
			for (let j = i + 2 * width; j <= length; j += width) {
				if (field[j] === none || field[j] === undefined) {
					shipWriter((j - i) / width);
					break;
				};
				field[j] = none;
			};
			field[i + width] = none;
		}
	};

	// Функция выдачи ответа

	function answer(number) {
		return result.filter(item => item === number).length
	};
	
	// Функция адаптируется под любое количество палуб кораблей, нужно только добавить в ответ дополнительный текст

	return `I-deck: ${answer(1)}, II-deck: ${answer(2)}, III-deck: ${answer(3)}, IV-deck: ${answer(4)}, V-deck: ${answer(5)}, VI-deck: ${answer(6)} ...`;
};

console.log(shipCounter(sea, 12))



