import { BaseModel } from '@models';

export class Service extends BaseModel{

	nom: string;
	code: string;
	default: string;
	codeSIH: string;
	description: string;
	selectedObject: boolean;
	hopital:any // Hopital;

    constructor( id?: number ) {
        super( id );
    }

    toString() { return JSON.stringify( this ); }


}