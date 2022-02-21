/**
 * Retrieves an item from local storage
 * @param {String} key - Key of item to retrieve from local storage
 */
function loadState(key) {
  const stringifiedData = localStorage.getItem(key);
  return JSON.parse(stringifiedData);
}

/**
 * Updates an existing data in local storage with new data
 * @param {String} key - The key of data to update
 * @param {*} data - The new data
 */
function updateState(key, data) {
  const stringifiedData = JSON.stringify(data);
  const savedData = localStorage.setItem(key, stringifiedData);
  return savedData;
}

/**
 * Removes an item from local storage
 * @param {String} key - the key of the item
 */
function removeState(key) {
  localStorage.removeItem(key)
}

/**
 * Clears the local storage
 */
function clearStorage() {
  localStorage.clear();
}

export default {
  clearStorage,
  updateState,
  loadState,
  removeState,
};
