import startCase from "lodash/startCase";
import { FF6Events } from "../types/ff6-types";

export interface ITrackedCheck {
    name: string;
    complete: boolean;
}

export class TrackedCheck {
    public readonly key: keyof FF6Events;
    public readonly name: string;
    public readonly complete: boolean;

    constructor(name: keyof FF6Events, completed: boolean) {
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
