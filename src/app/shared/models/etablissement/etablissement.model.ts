import { BaseModel } from '@models';

export class Etablissement extends BaseModel{

	ordre: number;
	numCompte: string;
	identificationFisc: string;
	fax: string;
	nom: string;
	intitule: string;
	code: string;
	intituleHtml: string;
	telephone: string;
	adresse: string;
	description: string;
	actif: string;
	hI7: string;
	selectedObject: boolean; 
	generation: boolean;
	cnss:string;
	cimr:string;
	rib:number;
	nomBanque:string;
	detailGeneration:string;
	site:string;
    constructor( id?: number ) {
        super( id );
    }

    toString() { return JSON.stringify( this ); }


}