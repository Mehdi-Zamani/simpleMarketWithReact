const IDB = () => {
  if (!("indexedDB" in window)) {
    return null;
  }
  const dbVersion = 1;
  let db = null;
  let objectStore = null;

  const DBOpenReq = indexedDB.open("shop", dbVersion);

  //Error occurred while trying to open DB
  DBOpenReq.addEventListener("error", (e) => {
    console.error(e.target.error);
  });
  //DB has been opened... after upgradeneeded
  DBOpenReq.addEventListener("success", (e) => {
    //this event occur every time that page reload after idb created successfuly
    db = e.target.result; //refrence to DataBase
  });
  /* first time opening this DB
    OR a new version was passed into open() */
  DBOpenReq.addEventListener("upgradeneeded", (e) => {
    db = e.target.result; //refrence to DataBase

    /*  let oldVersion = e.oldVersion;
    let newVersion = e.newVersion || db.version;
    console.log("DB updated from version", oldVersion, "to", newVersion);
    */

    if (db.objectStoreNames.contains("products")) {
      db.deleteObjectStore("products");
    }
    //create the ObjectStore
    objectStore = db.createObjectStore("products", { keyPath: "id" });

    //add the indexes
    objectStore.createIndex("nameIDX", "name", { unique: false });
    objectStore.createIndex("priceIDX", "price", { unique: false });
    /*objectStore.createIndex("ageIDX", "age", { unique: false });
    objectStore.createIndex("editIDX", "lastEdit", { unique: false }); */
  });
  return DBOpenReq;
};
export default IDB;

//=== uid =======================
export const uid = () => {
  let timmy = Date.now().toString(36).toLocaleUpperCase();
  let randy = parseInt(Math.random() * Number.MAX_SAFE_INTEGER);
  randy = randy.toString(36).slice(0, 12).padStart(12, "0").toLocaleUpperCase();
  return "".concat(timmy, "-", randy);
};

//== make Tx ==========================
export const makeTx = (storeName, mode) => {
  return new Promise((resolve, reject) => {
    const DBOpen = IDB();
    DBOpen.addEventListener("error", (err) => {
      console.error(err);
    });
    DBOpen.addEventListener("success", (e) => {
      const db = e.target.result;
      let tx = db.transaction(storeName, mode);
      tx.onerror = (err) => {
        console.error(err);
      };
      resolve(tx);
    });
  });
};
//=== add =======================
export const addIDB = async (
  storeName,
  data = { name: "test5", price: "11", id: uid() } //data must have uniqe id
) => {
  let tx = await makeTx(storeName, "readwrite");
  tx.oncomplete = (ev) => {
    console.log("transAction was complete");
  };
  let store = tx.objectStore(storeName);
  let request = store.add(data); //request an insert/add

  request.onsuccess = (ev) => {
    console.log("successfully added an object");
    //move on to the next request in the transaction or
    //commit the transaction
  };
  request.onerror = (err) => {
    console.error(err.target.error);
  };
};
//add("products", { name: "test14", price: 66, id: uid() });
//=== delete ===============================
export const deleteIDB = async (storeName, id) => {
  let tx = await makeTx(storeName, "readwrite");
  tx.oncomplete = (ev) => {
    console.log("transAction was complete");
  };
  let store = tx.objectStore(storeName);
  let request = store.delete(id); //request delete field

  request.onsuccess = (ev) => {
    console.log("successfully deleted an object");
    //move on to the next request in the transaction or
    //commit the transaction
  };
  request.onerror = (err) => {
    console.error(err.target.error);
  };
};
//deleteIDB("products", "KS3IXW94-00EQLRSYCEDRsa");
// == update ===================================
export const updateIDB = async (storeName, data) => {
  let tx = await makeTx(storeName, "readwrite");
  tx.oncomplete = (ev) => {
    console.log("transAction was complete");
  };
  let store = tx.objectStore(storeName);
  let request = store.put(data); //request update the field

  request.onsuccess = (ev) => {
    console.log("successfully deleted an object");
    //move on to the next request in the transaction or
    //commit the transaction
  };
  request.onerror = (err) => {
    console.error(err.target.error);
  };
};
//updateIDB("products", { id: "1", price: "333" });
// == get ===========================================
export const getIDB = async (storeName, id, reqSuccessCallBack) => {
  let tx = await makeTx(storeName, "readonly");
  tx.oncomplete = tx.oncomplete = (ev) => {
    console.log("transAction was complete");
  };

  let store = tx.objectStore(storeName);
  let request = store.get(id); //request get the field

  request.onsuccess = (ev) => {
    reqSuccessCallBack(ev);
  };
  /*
    request.onsuccess= (ev) => {
      console.log("successfully get an object");
      //move on to the next request in the transaction or
      //commit the transaction
    };
     */
  request.onerror = (err) => {
    console.error(err.target.error);
  };
};

/* getIDB("products", "1", (ev) => {
    console.log(ev.target.result);
  }); */

//=== getAll =============================================
export const getAllIDB = async (storeName, reqSuccessCallBack) => {
  let tx = await makeTx(storeName, "readonly");
  tx.oncomplete = tx.oncomplete = (ev) => {
    console.log("transAction was complete");
  };

  let store = tx.objectStore(storeName);
  let request = store.getAll(); //request get all field

  request.onsuccess = (ev) => {
    reqSuccessCallBack(ev);
  };
  /*
    request.onsuccess= (ev) => {
      console.log("successfully get all field");
      //move on to the next request in the transaction or
      //commit the transaction
    };
     */
  request.onerror = (err) => {
    console.error(err.target.error);
  };
};
/* getAllIDB("products", (ev) => {
  console.log(ev.target.result);
});
 */
//=== cursore ==================
export const cursor = async (storeName) => {
  let tx = await makeTx(storeName, "readonly");

  let range = IDBKeyRange.bound(20, 40);
  let store = tx.objectStore(storeName);
  let ind = store.index("priceIDX");
  let request = ind.openCursor(range, "prevunique");

  request.onsuccess = (ev) => {
    let cursor = ev.target.result;
    if (cursor) {
      console.log(cursor.value.price);
      cursor.continue(); //call onsuccess
    } else {
      console.log("end of cursor");
    }
  };
};
