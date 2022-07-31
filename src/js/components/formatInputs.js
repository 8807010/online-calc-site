 import {priceFormatter, priceFormatterDecimals} from '../components/formatters.js';
 import noUiSlider from 'nouislider';
 import wNumb from 'wNumb';
 
 // инпуты
const inputCost = document.querySelector('#input-cost');
const inputDownPayment = document.querySelector('#input-downpayment');
const inputTerm = document.querySelector('#input-term');

const form = document.querySelector('#form');
const totalCost = document.querySelector('#total-cost');
const totalMonthPayment = document.querySelector('#total-month-payment');

//cleave опции форматирования
const cleavePriceSetting = {
  numeral: true,
  numeralThousandsGroupStyle: 'thousand',
  delimiter: ' ',
};

//запуск форматирования cleave
const cleaveCost = new Cleave(inputCost, cleavePriceSetting);
const cleaveDownPayment = new Cleave(inputDownPayment, cleavePriceSetting);
const cleaveTerm = new Cleave(inputTerm, cleavePriceSetting);

//сумма кредита
calcMortgage();

//отображение и рассчет суммы кредита
form.addEventListener('input', function () {
  //сумма кредита
  calcMortgage();
});

function calcMortgage() {
  //общая сумма кредита
  const totalAmount = +cleaveCost.getRawValue() - cleaveDownPayment.getRawValue();
  totalCost.innerText = priceFormatter.format(totalAmount);

  //ставка по кредиту
  const creditRate = +document.querySelector('input[name="program"]:checked').value;
  const monthRate = (creditRate * 100) / 12;

  //срок ипотеки
  const years = +cleaveTerm.getRawValue();
  const months = years * 12;

//рассчет ежемесячного платежа
const monthPayment = (totalAmount * monthRate) / (1 - (1 + monthRate) * (1 - months));

//отображение ежемесячного платежа
totalMonthPayment.innerText = priceFormatterDecimals.format(monthPayment);
};

const sliderCost = document.getElementById('slider-cost');

noUiSlider.create(sliderCost, {
    start: 12000000,
    connect: "lower",
    tooltips: true,
    step: 100000, 
    range: {
        'min': 0,
        '50%': [10000000, 1000000],
        'max': 100000000
    },
    format: wNumb({
      decimals: 0,
      thousand: ' ',
      suffix: '',
    }),
});