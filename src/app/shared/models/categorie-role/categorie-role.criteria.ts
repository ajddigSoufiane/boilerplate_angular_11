import { BaseCriteria } from '@models';
export class CategorieRoleCriteria extends BaseCriteria{


	code: string;
	codeLike: string;
	libelle: string;
	libelleLike: string;
	actif: string;	
	parentId: number;
    
    constructor( order?: string, sortNameList?: Array<string> ) {
        super( order, sortNameList );
    }
    
}