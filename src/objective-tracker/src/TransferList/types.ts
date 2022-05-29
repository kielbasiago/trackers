import { NameBit } from "../ForceChecks/NameBit";

export type TransferListGroup = Record<string, NameBit[]>;

export type TransferListPreset = {
    name: string;
    description: string;
    value: NameBit[];
};
