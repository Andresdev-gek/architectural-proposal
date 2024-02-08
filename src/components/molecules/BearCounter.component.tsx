import { BearState, useBearStore } from "../../stores/bearStore.store";

export function BearCounter() {
    //const state = useBearStore.getState()
    //console.log('aca el state', state)
    
    const bears: number = useBearStore((state: BearState) => state.bears);
    
    
    return <h1>{bears} 🐻 <br /> around here...</h1>;
}