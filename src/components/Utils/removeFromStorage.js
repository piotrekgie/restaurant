export default function removeFromStorage(key, data) {
    let storageData = localStorage.getItem(key);
    let storageValues = JSON.parse(storageData);

    // storageValues.forEach((element, index) => {
    //     if (element.id === data.id) {
    //         storageValues.splice(index, 1);
    //         break;
    //     }
    // });

    const findAndRemove = (elem, index) => {
        if (elem.id === data.id) {
            storageValues.splice(index, 1);
        }
    }

    storageValues.some(findAndRemove);
    localStorage.setItem(key, JSON.stringify(storageValues));
}