const aduCalculator = document.getElementById('adu-calculator');
const inputRangeArr = aduCalculator.querySelectorAll('input[type=range]');
const output = aduCalculator.querySelector('.output h2')

const [master, kitchen, bathroom, ...rest] = inputRangeArr;

const sqftPrices = {
  'master': {
    0: 250,
    500: 300
  },
  'kitchen': {
    0: 275,
    500: 300
  },
  'bathroom': {
    0: 200,
    500: 275
  }
}

// Returns the value of the highest matching sqft cost
const getSqftPrice = (name, value) => {
  const keys = Object.keys( sqftPrices[name] ).sort();

  while (keys.length > 0) {
    let key = keys.pop();
    if (key <= value) return sqftPrices[name][key];
  }
}

const calculateEstimate = () => {
	const totals = Array.from(inputRangeArr).map( input => {
    const value = parseInt(input.value);
    const pricingKey = input.dataset.key;

    return value * getSqftPrice(pricingKey, value);
  })

  output.innerText = totals.reduce( (accum, item) => accum + item);
}

inputRangeArr.forEach( input => {
  input.value = 0;
  input.addEventListener('change', calculateEstimate);
} );

//Keep Range and number inputs synced
inputRangeArr.forEach( element => {
	//Set the number input field to match the range input field on load
	element.nextElementSibling.value = element.value;
	//Set the number input field to match the range input field after each update
	element.addEventListener('change', event => {
  	element.nextElementSibling.value = element.value;
  })
	//Set the range input field to match the number input field after each update and send update event
	element.nextElementSibling.addEventListener('change', event => {
  	element.value = event.target.value;
    element.dispatchEvent(new Event('change'));
  })
})