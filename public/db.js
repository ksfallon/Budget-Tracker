//indexedDB HERE
let db;
let budgetVersion
// create a new db request for a "BudgetDB" database.
const request = window.indexedDB.open("BudgetDB", budgetVersion || 21);

request.onupgradeneeded = (event) {
  // create object store called "BudgetStore" and set autoIncrement to true
    const {oldVersion} = event;
    const newVersion = event.newVersion || db.version;

    console.log(`DB Updated from version ${oldVersion} to ${newVersion}`)

    db = event.target.result

    db.createObjectStore("BudgetStore", 
    {keypath: "listID", auto_increment:true});

};

request.onsuccess = function (event) {
db = event.target.result;

//need to make sure to have function called CHECK_DATABASE which will send data to backend once online
if (navigator.onLine) {
    checkDatabase();
    }
};

request.onerror = function (event) {
    console.log("You have an error", event);
};

const saveRecord = (record) => {
  // create a transaction on the pending db with readwrite access
  // access your pending object store
  // add record to your store with add method.
  const transaction = db.transaction(["BudgetStore"], "readwrite");
  const myBudegetStore = transaction.objectStore("BudgetStore");
  myBudegetStore.add(record);
}

const checkDatabase = () => {
  // open a transaction on your pending db
  // access your pending object store
  // get all records from store and set to a variable

    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
        })
        .then((response) => response.json())
        .then(() => {
          // if successful, open a transaction on your pending db
          // access your pending object store
          // clear all items in your store
          //transaction;
          //store;
        //   store.clear();
        });
        }
    };
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);