export class IndexedDBService {

    db: IDBDatabase | null
    dbName: string
    principalStore: IDBObjectStore | undefined

    constructor() {
        this.db = null
        this.dbName = 'Items-db'
        this.principalStore = undefined
        this.createConexion()
    }

    private async createConexion(): Promise<void> {
        const indexedDB: IDBFactory = window.indexedDB
        const conexion: IDBOpenDBRequest = indexedDB.open(this.dbName)


        conexion.onsuccess = () => {
            this.db = conexion.result;
            console.log('IndexedDB Opened', this.db)
        };

        conexion.addEventListener('upgradeneeded', this.createTable)

        conexion.addEventListener('onerror', (error) => console.log('Error in IndexedDB: ', error))

    }

    private async createTable(e: IDBVersionChangeEvent): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.db = this.db ? this.db : (e as any).target.result
        this.principalStore = this.db?.createObjectStore('Items', { keyPath: "id" })
        this.principalStore?.createIndex("store", "id", { unique: true })
        return Promise.resolve()
    }

    async saveValue(storeName: string, value: string): Promise<void> {
        if (!this.db) {
            throw new Error('IndexedDB not opened')
        }

        const transaction = this.db?.transaction([storeName], 'readwrite')
        const table = transaction?.objectStore(storeName)

        const storeValueObj = JSON.parse(value)
        table?.add({
            ...storeValueObj
        })
    }

    async getValue(id: string, storeName?: string): Promise<IDBRequest | undefined> {
        if (!this.db) {
            throw new Error('IndexedDB not opened')
        }

        const transaction = this.db.transaction([storeName ? storeName : 'Items'], 'readonly')
        const table = transaction.objectStore(storeName ? storeName : 'Items')

        return new Promise((resolve, reject) => {
            const request = table.get(id)
            request.onsuccess = () => {
                resolve(request.result)
            }
            request.onerror = () => reject(new Error('Error al obtener el valor'))
        })
    }

    async editValue(id: string, storeName: string, updatedValue: string): Promise<void> {
        if (!this.db) {
            throw new Error('IndexedDB not opened');
        }

        const transaction = this.db.transaction([storeName], 'readwrite');
        const table = transaction.objectStore(storeName);

        return new Promise((resolve, reject) => {
            const getRequest = table.get(id);

            getRequest.onsuccess = () => {
                const existingValue = getRequest.result;
                if (existingValue) {
                    const updatedValueObj = JSON.parse(updatedValue);

                    // Actualizar las propiedades del elemento existente con las del objeto actualizado
                    Object.assign(existingValue, updatedValueObj);

                    // Almacenar el elemento actualizado en la tienda
                    const updateRequest = table.put(existingValue);

                    updateRequest.onsuccess = () => {
                        resolve();
                    };

                    updateRequest.onerror = () => {
                        reject(new Error('Error al editar el valor'));
                    };
                } else {
                    reject(new Error('Elemento no encontrado'));
                }
            };

            getRequest.onerror = () => {
                reject(new Error('Error al obtener el valor existente'));
            };
        });
    }



    async deleteValue(id: string, storeName?: string): Promise<void> {
        if (!this.db) {
            throw new Error('IndexedDB not opened');
        }

        const transaction = this.db.transaction([storeName ? storeName : 'Items'], 'readwrite');
        const table = transaction.objectStore(storeName ? storeName : 'Items');

        return new Promise((resolve, reject) => {
            const request = table.delete(id);
            request.onsuccess = () => {
                resolve();
            };
            request.onerror = () => reject(new Error('Error al eliminar el valor'));
        });
    }
}
