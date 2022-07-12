import { BaseModel, Profil } from '@models';

export class Utilisateur extends BaseModel{

	nom: string;
	prenom: string;
	cin: string;
	adresse: string;
	email: string;
	username: string;
	password?: string;	
	enabled: boolean;
	resetPassword: boolean;
	oldPassword: string;
	newPassword: string;
	selectedObject: boolean;
	nomComplet: string;
	profil: Profil;
	employe: any;
    changeDefaultPassword: boolean;

    constructor( id?: number ) {
        super( id );
    }

    toString() { return JSON.stringify( this ); }


}