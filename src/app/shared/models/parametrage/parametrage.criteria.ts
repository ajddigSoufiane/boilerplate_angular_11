import { BaseCriteria } from '@models';
export class ParametrageCriteria extends BaseCriteria{


	code: string;
	codeLike: string;
	valeur: string;
	valeurLike: string;
	typeValeur: string;
	typeValeurIn: Array<string>;
	typeValeurNotIn: Array<string>;
	description: string;
	descriptionLike: string;
	categorieRoleId: number;
    
    constructor( order?: string, sortNameList?: Array<string> ) {
        super( order, sortNameList );
    }
    
}