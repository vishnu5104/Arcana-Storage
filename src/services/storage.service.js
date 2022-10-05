// STORAGE-IMPORT : Import Arcana storage standalone

import { StorageProvider } from "@arcana/storage/dist/standalone/storage.umd";

function createStorageService() {
  let storage;

  async function init() {
    if (!storage) {
      // STORAGE-1: Create an instance of Arcana StorageProvider.
      storage = new StorageProvider({
        appId: [2338],
        provider: window.arcana.provider,
      });
    }
  }

  function getInstance() {
    return storage;
  }

  return {
    init,
    getInstance,
  };
}

const StorageService = Object.freeze(createStorageService());

export default StorageService;
