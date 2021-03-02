$(function () {


	let selectSize,
		selectPrice,
		selectCover = 0,
		endPaper = 0,
		sum = 0,
		qty = 1,
		money = {
			'g': [1, "грн"],
			'd': [28, "$"],
		},
		pageSizes = {

			"20x20": {47: "Digital Paper Type DP II", 53: "Digital Pearl Paper"},
			"19x25": {53: "Digital Paper Type DP II", 57: "Digital Pearl Paper"},
			"20x30": {57: "Digital Paper Type DP II", 65: "Digital Pearl Paper"},
			"25x25": {63: "Digital Paper Type DP II", 69: "Digital Pearl Paper"},
			"30x30": {76: "Digital Paper Type DP II", 85: "Digital Pearl Paper"},
			"35x35": {105: "Digital Paper Type DP II", 117: "Digital Pearl Paper"},
			"30x40": {105: "Digital Paper Type DP II", 117: "Digital Pearl Paper"},
			"40x40": {212: "Digital Paper Type DP II", 238: "Digital Pearl Paper"},

		},

		covers = {

			"20x20": {53: "Обрезная обложка", 204: "Фото обложка", 355: "Обложка кож.зам.", 587: "Обложка холст"},
			"19x25": {57: "Обрезная фото обложка", 228: "Фото обложка", 373: "обложка кож. зам.", 667: "Обложка холст"},
			"20x30": {
				65: "Обрезная фото обложка", 254: "Фото обложка", 506: "Обложка кож. зам.", 712: "Обложка холст",
				1288: "Обложка пластификация"
			},
			"25x25": {
				69: "Обрезанная фото обложка", 305: "Фото обложка", 525: "Обложка кож. зам.", 800: "Обложка холст",
				1288: "Обложка пластификация"
			},
			"30x30": {
				85: "Обрезная фото обложка",
				424: "Фото обложка",
				727: "Обложка кож. зам.",
				992: "Обложка холст",
				1473: "Обложка пластификация"
			},
			"35x35": {
				525: "Фото обложка",
				1051: "Обложка кож. зам.",
				1126: "Обложка холст",
				1682: "Обложка пластификация"
			},
			"30x40": {
				525: "Фото обложка",
				1051: "Обложка кож. зам.",
				1126: "Обложка холст",
				1682: "Обложка пластификация"
			},
			"40x40": {
				847: "Фото обложка",
				1660: "Обложка кож. зам.",
				1320: "Обложка холст",
				2080: "Обложка пластификация"
			},


		},
		endPapers = {

			"20x20": 43,
			"19x25": 53,
			"20x30": 57,
			"25x25": 63,
			"30x30": 94,
			"35x35": 124,
			"30x40": 124,
			"40x40": 169,

		};


	function insertPageSizes() {

		let html = '',
			size,
			price;
		for (size in pageSizes) {
			for (price in pageSizes[size]) {
				html += '<option data-size="' + size + '" data-price="' + price + '">' +
					' ' + size + ' - ' + pageSizes[size][price] + ' ' + price + ' ' + money.g[1] + '</option>';

			}

		}

		$('#page-size').append(html);
	}

	function changeSize() {

		sum = selectCover = 0;
		qty = 1;
		$('#qty').val('1');
		selectSize = $('#calc option').filter(':selected').data('size');//извлекает данные из атрибута селектора option
		selectPrice = $('#calc option').filter(':selected').data('price');//извлекает данные из атрибута селектора option

		//console.log(selectSize, selectPrice);

		insertCover();
		recalc();

	}

	function insertCover() {
		let html = '<option selected>Вид обложки</option>',
			price;
		for (price in covers[selectSize]) {
			html += '<option data-price =" ' + price + '">' + covers[selectSize][price] + ' ' + price + ' ' + money.g[1] +'</option>';

		}
		$('#cover').html(html);

	}
	console.log(money.d[0], money.g[0]);

	function changeQty() {

		qty = $('#qty').val();

		if (qty < 1) {
			qty = 1;
			$('#qty').val(1);
		}
		recalc();

	}

	function changeCover() {
		selectCover = $('#cover option').filter(':selected').data('price');
		recalc();
	}

	// isNumeric проверяет поступающее значение на число и возвращает true || false
	function isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);

	}

	// пересчитывает значения в таблице
	function recalc() {
		selectPrice = isNumeric(selectPrice) ? selectPrice : 0;
		qty = isNumeric(qty) ? qty : 1;
		selectCover = isNumeric(selectCover) ? selectCover : 0;
		endPaper = isNumeric(endPapers[selectSize]) ? (endPapers[selectSize]) : 0;
		sum = selectPrice * qty + selectCover + endPaper;
		changeTable();
	}

	function changeTable() {
		$('.page-size').text(selectPrice + money.g[1]);
		$('.qty').text(qty);
		$('.cover').text(selectCover +  money.g[1]);
		$('.endpaper').text(endPaper +  money.g[1]);
		$('.sum').text(sum + money.g[1]);

	}

	insertPageSizes()

	$('#page-size').change(function () {
		changeSize();
	});

	$('#qty').change(function () {
		changeQty();
	});
	$('#cover').change(function () {
		changeCover();
	});


});
