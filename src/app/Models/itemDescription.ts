import { Nutrient } from './nutrient';

export class ItemDescription {


        desc?: {
            ndbno?: string;
            name?: string;
            sd?: string;
            fg?: string;
            sn?: any;
            cn?: any;
            manu?: any;
            nf?: number;
            cf?: number;
            ff?: number;
            pf?: number;
            r?: string;
            rd?: any;
            ds?: string;
            ru?: string;
        };
        footnotes?: any[];
        langual?: any[];
        nutrients?: Nutrient[];
        sources?: any[];
        sr?: string;
        type?: string;
}
