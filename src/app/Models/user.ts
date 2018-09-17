export class User {
    u_id?: number;
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    height?: number;
    weight?: number;
    age?: number;
    sex?: number;
    setProtien?: number;
    setCarbs?: number;
    setFats?: number;
    setFiber?: number;
}

export class UserCompare {
    nutrientId?: number;
    minAge?: number;
    maxAge: number;
    sex: number;
    proteinGrams: number;
    proteinMinPercent: number;
    proteinMaxPercent: number;
    carbGrams: number;
    carbMinPercen: number;
    carbMaxPercen: number;
    fiberGrams: number;
    sugarsMaxPercen: number;
    fatMinPercent: number;
    fatMaxPercent: number;
    satFatMaxPercent: number;
}
