import { Nutrient } from './nutrient';
 /**
 * Class used to get and save food data to db table (FOOD_PLAN)
 */
export class FoodDb {
    foodId?: number;
    foodName?: string;
    mealCatId: number;
    mealCatName?: string;
    measureIndex: number;
    measureName?: string;
    ndbno: string;
    servingAmount: number;
    timestamp: number;
    uId: number;
    nutrients: Nutrient[];
}
