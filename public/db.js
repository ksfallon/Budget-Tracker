const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
​
let db;
const request = indexedDB.open('budget', 1);
​
request.onupgradeneeded = ({ target }) => {
  const db = target.result;
  db.createObjectStore('pending', { autoIncrement: true });
};
​
request.onsuccess = ({ target }) => {
  db = target.result;
​
  // check if app is online before reading from db
  if (navigator.onLine) {
    checkDatabase();
  }
};
​
request.onerror = ({target}) => {
  console.log(`Woops! ${target.errorCode}`);
};
​
const saveRecord = (record) => {
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");
​
  store.add(record);
}
​
const checkDatabase = () => {
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");
  const getAll = store.getAll(); // to grab 
​
  getAll.onsuccess = () => {
    if (getAll.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(() => {
          // delete records if successful
          const transaction = db.transaction(["pending"], "readwrite");
          const store = transaction.objectStore("pending");
          store.clear();
          console.log("If i appear, offline data was moved to Mongo Atlas DB")
        })
        .catch((err) => {console.error("Error when grabbing offline data when back online", err)});
    }
  };
}
​
// listen for app coming back online
window.addEventListener('online', checkDatabase);

//ADDED BACK (8/15/2021 @ 2:30)
// - keyPath: "listID" on line 13
// - line 25: changed to es6 function, event became {target}
// - line 26: event.target became target
// - line 29 - made es6 function
// - line 30 - changed single quotes to double
// - line 31 - changed single quotes to double
// - line 36 - made an es6 function 
// - line 37 - changed single quotes to double
// - line 38 - changed single quotes to double
// - line 51 - reduced all the extra brackets
// - line 54 - changed single quotes to double
// - line 55 - changed single quotes to double
// - line 58 - added ".catch((err) => console.error("Error while deleting", err));"

