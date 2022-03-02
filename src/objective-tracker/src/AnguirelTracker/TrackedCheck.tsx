import startCase from "lodash/startCase";
import { FF6Event } from "../types/ff6-types";

export interface ITrackedCheck {
    name: string;
    complete: boolean;
}

export class TrackedCheck {
    public readonly key: FF6Event;
    public readonly name: string;
    public readonly complete: boolean;

    constructor(name: FF6Event, completed: boolean) {
        this.key = name;
        this.name = startCase(name);
        this.complete = completed;
    }

    public toJson(): ITrackedCheck {
        return {
            name: this.key,
            complete: this.complete,
        };
    }
}
