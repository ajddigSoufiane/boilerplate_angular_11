import { BaseCriteria } from '@models';
export class ServiceCriteria extends BaseCriteria{


	nom: string;
	nomLike: string;
	code: string;
	codeLike: string;
	description: string;
	descriptionLike: string;
	hopitalId: number;
    
    constructor( order?: string, sortNameList?: Array<string> ) {
        super( order, sortNameList );
    }
    
}