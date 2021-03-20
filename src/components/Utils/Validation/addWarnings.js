function addWarnings(elementsArray) {
    elementsArray.map((elem) => {
        if (!elem.parentNode.querySelector('.warning')) {
            let warningSpan = document.createElement("span");
            warningSpan.innerHTML = 'This is a required field.';
            warningSpan.className = "warning";

            return elem.parentNode.insertBefore(warningSpan, elem.previousSibling);
        }

        return null;
    });
}

export default addWarnings;