document.addEventListener('click', function (event) {
    if (event.target.classList.contains('card-back')) {
        event.target.parentNode.children[0].checked = false;
    }
});
