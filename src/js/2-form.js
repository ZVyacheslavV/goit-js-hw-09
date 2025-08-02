import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
};
const LOCAL_STORAGE_KEY = 'feedback-form-state';

//Retrieving data from local storage
const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? {};

refs.feedbackForm.elements.email.value = savedData.email ?? '';
refs.feedbackForm.elements.message.value = savedData.message ?? '';

let formData = {
  email: savedData.email ?? '',
  message: savedData.message ?? '',
};

//Collecting data from inputs (with destructuring of the target object - old)
refs.feedbackForm.addEventListener('input', e => {
  /*   const { name, value } = e.target;
  formData[name] = value.trim(); */
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
});

//Form-submit with resets and void check
refs.feedbackForm.addEventListener('submit', e => {
  e.preventDefault();

  if (!formData.email || !formData.message)
    return iziToast.info({
      message: 'Fill please all fields!',
      position: 'center',
      timeout: 1500,
    });
  console.log(formData);

  formData = { email: '', message: '' };
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  refs.feedbackForm.reset();
});

//Another variant (addition) from teacher:
/* document.addEventListener('DOMContentLoaded', () => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey)) ?? {};

  refs.feedbackForm.elements.email.value = savedData.email ?? '';
  refs.feedbackForm.elements.message.value = savedData.message ?? '';
});

function saveToLS(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    return JSON.parse(jsonData);
  } catch {
    defaultValue || jsonData;
  }
} */
