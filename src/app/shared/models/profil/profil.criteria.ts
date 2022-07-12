import { BaseCriteria } from '@models';
export class ProfilCriteria extends BaseCriteria{


	code: string;
	codeLike: string;
	libelle: string;
	libelleLike: string;
	description: string;
	descriptionLike: string;
	rolesSelected: Array<number>;
    
    constructor( order?: string, sortNameList?: Array<string> ) {
        super( order, sortNameList );
    }
    
}