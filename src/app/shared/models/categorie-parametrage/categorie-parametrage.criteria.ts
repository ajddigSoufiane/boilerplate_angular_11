import { BaseCriteria } from '@models';
export class CategorieParametrageCriteria extends BaseCriteria{


	code: string;
	codeLike: string;
	libelle: string;
	libelleLike: string;
	description: string;
	descriptionLike: string;
    
    constructor( order?: string, sortNameList?: Array<string> ) {
        super( order, sortNameList );
    }
    
}