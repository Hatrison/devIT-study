const modal = document.querySelector('.backdrop');

const toggleModal = () => {
  modal.classList.toggle('hidden');
};

modal.addEventListener('click', e => {
  if (
    e.target.classList.contains('backdrop') ||
    e.target.classList.contains('close') ||
    e.target.classList.contains('button')
  ) {
    toggleModal();
  }
});
