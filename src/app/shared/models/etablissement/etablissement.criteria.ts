import { BaseCriteria } from '@models';
export class EtablissementCriteria extends BaseCriteria{


	intitule: string;
	intituleLike: string;
	code: string;
	codeLike: string;
	intituleHtml: string;
	intituleHtmlLike: string;
	telephone: string;
	telephoneLike: string;
	adresse: string;
	adresseLike: string;
	description: string;
	descriptionLike: string;
	actif: string;
	actifLike: string;
	hl7: string;
	hl7Like: string;
	nomLike: string;
	laboratoireId: number;
	identificationFiscLike: string;
	employe_id:any;
	employeId:any;
    
    constructor( order?: string, sortNameList?: Array<string> ) {
        super( order, sortNameList );
    }
    
}