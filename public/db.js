//indexedDB HERE
let db;
// let budgetVersion
// create a new db request for a "budget" database. its version 1 in our indexedDB
const request = window.indexedDB.open("budget", 1) // const request = window.indexedDB.open("budget", budgetVersion || 21);

request.onupgradeneeded = ({target}) => {
  // create object store inside of our indexed.DB

    db = target.result

    // This creates an object store alled 'BudgetStorage'
    db.createObjectStore("BudgetNew", 
    {keypath: "listID", auto_increment:true}); //keypath can be used to query on and we want auto_increment to be TRUE

};

request.onsuccess = (event) => {
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
  console.log("is anything going through? ", record);
  const transaction = db.transaction(["BudgetNew"], "readwrite");
  const BudgetStore = transaction.objectStore("BudgetNew");
  BudgetStore.add(record);
}

const checkDatabase = () => {
  // open a transaction on your pending db, access your pending object store and get all records from store and set to a variable
  const transaction = db.transaction(["BudgetNew"], "readwrite");
  const BudgetStore = transaction.objectStore("BudgetNew");
  const getAll = BudgetStore.getAll

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
        store.clear();
        });
        }
    };
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);