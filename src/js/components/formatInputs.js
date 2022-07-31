 // инпуты
const inputCost = document.querySelector('#input-cost');
const inputDownPayment = document.querySelector('#input-downpayment');
const inputTerm = document.querySelector('#input-term');

//cleave опции форматирования
const cleavePriceSettings = {
  numeral: true,
  numeralThousandsGroupStyle: 'thousand',
  delimiter: ' ',
};

//запуск форматирования cleave
const cleaveCost = new Cleave(inputCost, cleavePriceSettings);
const cleaveDownPayment = new Cleave(inputDownPayment, cleavePriceSettings);