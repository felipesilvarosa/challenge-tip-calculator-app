const billInput = document.querySelector('[data-bill]');
const tipBtn = document.querySelectorAll('.tip--btn');
const people = document.querySelector('[data-people]');
const tipCustom = document.querySelector('.tip--custom');
const totalTipPerson = document.querySelector('[data-total-person]');
const totalValue = document.querySelector('[data-total-value]');
const buttonReset = document.querySelector('[data-reset]');

const getBill = () => {
	return Number(billInput.value);
};

const getTip = () => {
	const marcador = document.querySelector('.active');
	let tip = 0;
	if (marcador) {
		tip = Number(marcador.value);
	} else {
		tip = Number(tipCustom.value);
	}
	return tip / 100;
};

const getPeople = () => {
	const peopleCount = Number(people.value);
	if (isNaN(peopleCount) || peopleCount == 0) return 1;
	return peopleCount;
};

const resetSelection = () => {
	tipBtn.forEach(tip => tip.classList.remove('active'));
};

const calculate = () => {
	const bill = getBill();
	const tip = getTip();
	const people = getPeople();

	const tipAmount = (bill * tip) / people;
	const total = bill / people + tipAmount;

	totalTipPerson.textContent = `$${tipAmount.toFixed(2)}`;
	totalValue.textContent = `$${total.toFixed(2)}`;
};

people.addEventListener('keyup', () => {
	buttonReset.classList.remove('disabled');
	calculate();
});

tipCustom.addEventListener('keyup', () => {
	buttonReset.classList.remove('disabled');
	resetSelection();
	calculate();
});

tipBtn.forEach(tip => {
	tip.addEventListener('click', () => {
		buttonReset.classList.remove('disabled');
		resetSelection();
		tipCustom.value = '';
		tip.classList.add('active');
		calculate();
	});
});

buttonReset.addEventListener('click', () => {
	resetSelection();
	billInput.innerText = 0;
	totalValue.innerText = '$0.00';
	totalTipPerson.innerText = '$0.00';
	buttonReset.classList.add('disabled');
});
