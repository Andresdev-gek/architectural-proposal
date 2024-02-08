import { create } from 'zustand'
import { persist } from 'zustand/middleware';
//import { IndexedDBService } from '../services/indexedDB.service';




export type BearState = {
  id: string,
  bears: number,
  namesOfTheBears: string[],
  increment: () => void,
  addBearName: (name: string) => void
}
/*
const idbService = new IndexedDBService()

setTimeout(() => {
  idbService.saveValue("Items", JSON.stringify(useBearStore.getState())).then(res => console.log('esto hice', res))
  idbService.saveValue("Items", JSON.stringify({ id: 'nuevaprueba', otherValue: 'otro valor' })).then(res => console.log('esto hice', res))
}, 800)

setTimeout(() => {
  idbService.getValue("nuevaprueba", "Items").then(res => console.log('aca la busqueda ->', res))
}, 1000)

setTimeout(() => {
  idbService.editValue("nuevaprueba", "Items", JSON.stringify({ id: 'nuevaprueba', otherValue: 'otro editadoo' })).then(res => console.log('aca el editado ->', res))
}, 4000)

setTimeout(() => {
  idbService.editValue("nuevaprueba", "Items", JSON.stringify({ id: 'nuevaprueba', otherValue: 'dimelo' })).then(res => console.log('aca el editado ->', res))
}, 4000)

*/


export const useBearStore = create<BearState>()(
  persist(
    (set) => ({
      id: 'bearStore',
      bears: 0,
      namesOfTheBears: ['osin', 'osote'],
      increment: () => set((state) => ({ bears: state.bears + 1 })),
      addBearName: (name: string) => set((state) => ({ bears: state.namesOfTheBears.push(name) })),
    }),
    {
      name: 'bearStore',

    }
  )
);


