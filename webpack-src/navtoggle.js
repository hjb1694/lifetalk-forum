const topicsLink = document.querySelector('.topics-link');
const topicsPane = document.querySelector('.topics-pane');

topicsLink.addEventListener('click', () => {
    topicsPane.classList.toggle('show');
});