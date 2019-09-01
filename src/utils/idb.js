export const idbCreate = (dbName, scheme, createCallback) => {
  return new Promise((resolve, reject) => {
    const open = window.indexedDB.open(dbName, 1);

    open.onupgradeneeded = function(event) {
      let db = event.target.result;

      scheme.map(table => {
        const objectStore = db.createObjectStore(table.name, {
          keyPath: table.keyPath,
          autoIncrement: table.autoIncrement
        });

        table.fields.forEach(field => {
          objectStore.createIndex(field.name, field.name, {
            unique: field.unique
          });
        });
      });
    };

    open.onsuccess = function(event) {
      event.target.result.close();
      resolve();
    };

    open.onerror = function(event) {
      reject("Could not open database");
    };
  });
};

export const idbAdd = (dbName, table, data) => {
  return new Promise((resolve, reject) => {
    const open = window.indexedDB.open(dbName, 1);

    open.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction([table], "readwrite");

      transaction.onerror = function(event) {
        console.error("Database error: " + event.target.errorCode);
      };
      const objectStore = transaction.objectStore(table);
      const operation = objectStore.add(data);

      operation.onsuccess = function(event) {
        db.close();
        resolve();
      };
      operation.onerror = function(event) {
        reject("Could not add to database.");
      };
    };
  });
};

export const idbRemove = (dbName, table, index) => {
  return new Promise((resolve, reject) => {
    const open = window.indexedDB.open(dbName, 1);

    open.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction([table], "readwrite");

      transaction.onerror = function(event) {
        console.error("Database error: " + event.target.errorCode);
      };

      const objectStore = transaction.objectStore(table);
      const operation = objectStore.delete(index);

      operation.onsuccess = function(event) {
        db.close();
        resolve();
      };
      operation.onerror = function(event) {
        reject("Could not remove from database.");
      };
    };
  });
};

export const idbRead = (dbName, table, rowId) => {
  return new Promise((resolve, reject) => {
    const open = window.indexedDB.open(dbName, 1);

    open.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction([table]);

      const objectStore = transaction.objectStore(table);
      const operation = objectStore.get(rowId);

      operation.onsuccess = function(event) {
        db.close();
        resolve(event.target.result);
      };

      operation.onerror = function(event) {
        reject("Could not read from database.");
      };
    };
  });
};

export const idbReadAll = (dbName, table) => {
  return new Promise((resolve, reject) => {
    const open = window.indexedDB.open(dbName, 1);

    open.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction([table]);
      const objectStore = transaction.objectStore(table);
      const operation = objectStore.getAll();

      operation.onsuccess = function(event) {
        db.close();
        resolve(event.target.result);
      };

      operation.onerror = function(event) {
        reject("Could not read from database.");
      };
    };
  });
};

export const idbUpdate = (dbName, table, rowId, newData) => {
  return new Promise((resolve, reject) => {
    const open = window.indexedDB.open(dbName, 1);

    open.onsuccess = function(event) {
      const db = event.target.result;
      const objectStore = db.transaction([table], "readwrite").objectStore(table);
      const request = objectStore.get(rowId);

      request.onerror = function(event) {
        console.error("Database error: " + event.target.errorCode);
      };

      request.onsuccess = function(event) {
        const data = event.target.result;

        Object.keys(newData).forEach(function(key, index) {
          data[key] = newData[key];
        });

        const operation = objectStore.put(data);

        operation.onsuccess = function(event) {
          db.close();
          resolve(event.target.result);
        };

        operation.onerror = function(event) {
          reject("Could not update database.");
        };
      };
    };
  });
};
