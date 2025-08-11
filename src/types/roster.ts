export interface Skills {
    awr: number;
    pas: number;
    run: number;
    skl: number;
    spd: number;
}

export interface Player {
    id: number;
    dateCreated: number;
    dateModified: number;
    firstName: string;
    middleName: string;
    lastName: string;
    skills: Skills;
    [key: string]: any; // Allow for other properties we want to preserve
}

export interface Roster {
    id: number;
    dateCreated: number;
    dateModified: number;
    version: number;
    userEntryId: number;
    players: Player[];
}
