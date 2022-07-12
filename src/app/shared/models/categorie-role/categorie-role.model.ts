import { BaseModel } from '@models';

export class CategorieRole extends BaseModel{

	code: string;
	libelle: string;
	actif: boolean;
	selectedObject: boolean;
	parent: CategorieRole;

    constructor( id?: number ) {
        super( id );
    }

    toString() { return JSON.stringify( this ); }


}