import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = form.querySelector('input[name="delay"]');
  const stateInputs = form.querySelectorAll('input[name="state"]');
  const selectedState = Array.from(stateInputs).find(input => input.checked);

  if (!selectedState) {
    return;
  }

  const delay = parseInt(delayInput.value, 10);

  const promise = new Promise((resolve, reject) => {
    if (selectedState.value === 'fulfilled') {
      setTimeout(() => resolve(delay), delay);
    } else {
      setTimeout(() => reject(delay), delay);
    }
  });

  promise.then(
    value => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${value}ms`,
        position: 'topCenter',
      });
    },
    value => {
      iziToast.error({
        message: `❌ Rejected promise in ${value}ms`,
        position: 'topCenter',
      });
    }
  );
  delayInput.value = '';
});
