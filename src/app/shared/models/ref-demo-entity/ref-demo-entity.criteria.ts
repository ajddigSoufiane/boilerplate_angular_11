import { BaseCriteria } from '@models';
export class RefDemoEntityCriteria extends BaseCriteria{


	libelle: string;
	libelleLike: string;
	code: string;
	codeLike: string;
	actif: string;	
	etablissementId: number;
  datebetweenFrom: string;
 
  conventionId: any;
  convention: any;
  dateBetweenFrom: any;
  dateBetweenTo: string;
  dateBetween: any;
  parametres: any;
    constructor( order?: string, sortNameList?: Array<string> ) {
        super( order, sortNameList );
    }
    
}