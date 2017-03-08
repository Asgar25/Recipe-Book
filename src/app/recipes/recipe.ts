import {Ingredient} from "../ingredient";


export class Recipe {

    /**
     * constructor - Builds an instance of a Recipe object
     *
     * @param  {string} public name                 Short name for food
     * @param  {string} public description          Full description of recipe
     * @param  {string} public imageUrl             Full Url for image to display on page
     * @param  {Ingredient[]} public ingredients    Array of Ingredient objects.  Each containing name, amount, units.
     * @returns {Recipe}  Recipe object also containing an array of Ingredient objects
     */
    constructor(public name: string, public description: string, public imageUrl:string, public ingredients:Ingredient[]){

    }
}
