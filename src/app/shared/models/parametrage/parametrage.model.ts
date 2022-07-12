import { BaseModel, CategorieParametrage } from '@models';

export class Parametrage extends BaseModel{

	code: string;
	valeur: string;
	typeValeur:  any = 'TEXT';
	description: string;
	selectedObject: boolean;
	categorieRole: CategorieParametrage;

    constructor( id?: number ) {
        super( id );
    }

    toString() { return JSON.stringify( this ); }


}