let strRez = ""; // Шаблонная строка сказки
let dVar = new Map(); // Словарь полей для замены

// Парсинг и формирование полей ввода
const parsdata = data => {
	for (var i = 0; i < data.text.length; i++) {
		strRez += data.text[i]; // Формирование исходной строки сказки
	}
	let regex = /\{(\w*)\}/g; // Регулярное выражение для поиска шаблонных подстрок
	let found = strRez.match(regex); // Массив с повторением найденных шаблоннх подстрок
	for (var i = 0; i < found.length; i++) {
		dVar.set(found[i], ""); // Формирование словаря с уникальными шаблоными подстроками в качестве ключей и пустрой строкой в качестве значения
	}
	const my_div = document.getElementById("btn");
	regex = /\w+/g; // Реглуряное выражения для выделения значения между {}
	dVar.forEach(function(value, key) { 
		var input = document.createElement('INPUT');
		input.type = 'text';
		input.setAttribute("id", key.match(regex));
		input.name = key;
		input.placeholder = key.match(regex);
		input.class = key;
		document.querySelector('form').insertBefore(input, my_div); // Вставка полей перед кнопкой
	})
	const $result = $(".result");
	$result.html(strRez); // Вывод исходного текста в сказки 
}

// Загрузка и парсинг текста
$.getJSON(
	'https://api.myjson.com/bins/jcmhn',
	function(data) {
		parsdata(data)
	}
)

$(document).ready(function() {
 $(".btn").click(function() {
	let strTmpRez = strRez; // Создание рабочей строки из шаблона сказки
	regex = /\w+/g;
	dVar.forEach(function(value, key) { 
	    const inputValue = $('#'+key.match(regex)).val(); // Получение значения поля по ключу
	    strTmpRez = strTmpRez.replace(new RegExp(key,'g'),inputValue) // Замена шаблонной подстроки на значение поля
	})
	const $result = $(".result");
	$result.html(strTmpRez);
 });
});

