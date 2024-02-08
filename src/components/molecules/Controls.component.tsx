import { BearState, useBearStore } from "../../stores/bearStore.store";

export function Controls() {
    const increasePopulation: () => void = useBearStore((state: BearState) => state.increment);
    return <button onClick={increasePopulation}>one up</button>;
}