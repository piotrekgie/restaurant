function removeWarnings(element) {
    if (element.tagName === 'FORM') {
        element.reset();
    } else {
        element.parentElement.style.border = 'none';
    }

    element.parentNode.querySelectorAll('.warning').forEach(elem => elem.remove());
}

export default removeWarnings;