export class Ingredient {
    /**
     * constructor - Constructs an Ingredient instance containing a name, amount, and units of measure. These are nested within a Recipe object.
     *
     * @param  {string} public name     Ingredient name
     * @param  {number} public amount   Ingredient amount
     * @param  {string} public units    Units of measure
     * @returns {Ingredient}
     */
    constructor(public name:string, public amount:number, public units:string){}
}
