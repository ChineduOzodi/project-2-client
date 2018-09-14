import { Measures } from './measures';

export class Nutrient {
nutrient_id: number;
name: string;
group: string;
unit: any;
value: number;
derivation: any;
sourcecode: any;
dp: any;
se: any;
measures: Measures[];

}
