
const rates = {};
const elementID_USD = document.querySelector('[data-value="USD"]');
const elementID_EUR = document.querySelector('[data-value="EUR"]');
const input = document.querySelector('#input');
const select = document.querySelector('#select');
const result = document.querySelector('#result');

    async function Current() {

        const temp = await fetch('https://www.cbr-xml-daily.ru/daily_json.js'); //получение данных
        const data_js = await temp.json(); //преобразование данных в формат json и запись в переменную
        const result = await data_js; //присвоение данных в формате json переменной для конечного результата

        rates.USD = result.Valute.USD;
        rates.EUR = result.Valute.EUR;

        //Запись получены   х значений в соответстующие поля на странице
        elementID_USD.textContent = rates.USD.Value.toFixed(2);
        elementID_EUR.textContent = rates.EUR.Value.toFixed(2);

        //Функция для подсветки числового значения курса при его изменении
        function Color() {

            //Для доллара
            //если изменяется в большую сторону, то цвет зелёный
            if (rates.USD.Value > rates.USD.Previous) {
                elementID_USD.classList.add('bottom');
            }//если изменяется в меньшу сторону, то цвет красный
            else if (rates.USD.Value < rates.USD.Previous) {
                elementID_USD.classList.add('top');
            }//если курс равен вчерашнему, то цвет не меняется
            else {
                elementID_USD.classList.add('none');
            }

            //Для евро
            //если изменяется в большую сторону, то цвет зелёный
            if (rates.EUR.Value > rates.EUR.Previous) {
                elementID_EUR.classList.add('bottom');
            }//если изменяется в меньшу сторону, то цвет красный
            else if (rates.EUR.Value < rates.EUR.Previous) {
                elementID_EUR.classList.add('top');
            }//если курс равен вчерашнему, то цвет не меняется
            else {
                elementID_EUR.classList.add('none');
            }
        }

        //Вызов функции подсветки изменений
        Color();
    }

    //Вызов функции
    Current();

    //Функция считающая курс, исходя из того какое значение введено в поле input
    input.oninput = function () {
        result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
    }

    //Функция считающая курс, исходя из того какое значение выбрано в поле select
    select.oninput = function () {
        result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
    }
