const aduCalculator = document.getElementById('adu-calculator');
const inputRangeArr = aduCalculator.querySelectorAll('input[type=range]');
const output = aduCalculator.querySelector('.output input')
const persqft = aduCalculator.querySelector('.output h2')

const [sqft, ...rest] = inputRangeArr;

const calculateEstimate = () => {
	if (sqft.value > 500) {
  	//If sqft greater than 500 multiply by 300
		output.value = sqft.value * 300;
    persqft.innerText = '300'
	} else {
  	//If sqft less than 500 multiply by 250
  	output.value = sqft.value * 250;
    persqft.innerText = '250'
  }
}

sqft.addEventListener('change', calculateEstimate)

//Keep Range and number inputs synced
inputRangeArr.forEach( element => {
	//Set the number input field to match the range input field on load
	element.nextElementSibling.value = element.value
	//Set the number input field to match the range input field after each update
	element.addEventListener('change', event => {
  	element.nextElementSibling.value = element.value
  })
	//Set the range input field to match the number input field after each update and send update event
	element.nextElementSibling.addEventListener('change', event => {
  	element.value = event.target.value
    element.dispatchEvent(new Event('change'))
  })
})

calculateEstimate();