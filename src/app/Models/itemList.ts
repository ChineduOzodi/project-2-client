import { Item } from './item';

export class ItemList {
q: any; // String-based query parameter in the api link. look at data.service freesearch function
sr: string;
ds: string; // search filter: generic-info or brand-name items only? we do generic. "Standard Reference"
start: number; // location in which the api returns the info. index.
end: number; // last item shown to user.
group: string; // food group (fg) based upon item category. check dropdown for options. (number or string) (use number)
sort: string; // types of sort, ignore.
item?: Item[]; // array of Item.ts (aka food)

}