import { TrackedCheck } from "./TrackedCheck";

export interface ITrackedCharacter {
    name: string;
    available: boolean;
}

export class TrackedCharacter {
    public readonly name: string;
    public readonly checks: Array<TrackedCheck>;
    public readonly available: boolean;

    constructor(name: string, checks: Array<TrackedCheck>, available: boolean) {
        this.name = name;
        this.checks = checks;
        this.available = available;
    }

    public toJson(): ITrackedCharacter {
        return {
            name: this.name,
            available: this.available,
        };
    }
}
