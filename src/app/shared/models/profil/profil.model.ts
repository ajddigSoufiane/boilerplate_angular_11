import { BaseModel, Role } from '@models';

export class Profil extends BaseModel{

	code: string;
	libelle: string;
	description: string;
	selectedObject: boolean;
	rolesList: Array<Role>;
	actif

    constructor( id?: number ) {
        super( id );
    }

    toString() { return JSON.stringify( this ); }


}