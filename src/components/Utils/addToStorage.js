export default function addToStorage(key, data) {
    let storageData = localStorage.getItem(key);
    let storageValues = [];

    if (storageData) {
        storageValues = JSON.parse(storageData);
    }

    storageValues.push(data);

    localStorage.setItem(key, JSON.stringify(storageValues));
}