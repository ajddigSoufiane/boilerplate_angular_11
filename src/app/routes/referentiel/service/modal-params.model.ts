import { BaseModel, Parametre, Service, Dossier } from '@models';

export class filterModel extends BaseModel {


	input: string


	constructor(id?: number) {
		super(id);
	}

	toString() { return JSON.stringify(this); }


}