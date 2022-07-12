import { BaseModel } from '@models';

export class CategorieParametrage extends BaseModel{

	code: string;
	libelle: string;
	description: string;
	selectedObject: boolean;

    constructor( id?: number ) {
        super( id );
    }

    toString() { return JSON.stringify( this ); }


}