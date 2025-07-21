const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
};
const localStorageKey = 'feedback-form-state';

const savedData = JSON.parse(localStorage.getItem(localStorageKey)) ?? {};

refs.feedbackForm.elements.email.value = savedData.email ?? '';
refs.feedbackForm.elements.message.value = savedData.message ?? '';

const formData = {
  email: savedData.email ?? '',
  message: savedData.message ?? '',
};

refs.feedbackForm.addEventListener('input', e => {
  const { name, value } = e.target;
  formData[name] = value.trim();
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
});

refs.feedbackForm.addEventListener('submit', e => {
  e.preventDefault();

  if (!formData.email || !formData.message)
    return alert('Fill please all fields');
  console.log(formData);

  formData.email = '';
  formData.message = '';
  localStorage.removeItem(localStorageKey);
  refs.feedbackForm.reset();
});
