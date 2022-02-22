import startCase from "lodash/startCase";
import { FF6Events } from "../types/ff6-types";
import { TrackedCharacter } from "./TrackedCharacter";
import { TrackedCheck } from "./TrackedCheck";

export interface ITrackerRow {
    name: string;
    complete: boolean;
}

export class TrackerRow {
    public readonly char1: TrackedCharacter;
    public readonly char2: TrackedCharacter;
    public readonly between: Array<TrackedCheck>;

    constructor(
        char1: TrackedCharacter,
        char2: TrackedCharacter,
        between: Array<TrackedCheck> = []
    ) {
        this.char1 = char1;
        this.char2 = char2;
        this.between = between;
    }

    public getCells() {
        return true;
    }
}
