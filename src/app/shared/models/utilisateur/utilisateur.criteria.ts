import { BaseCriteria } from '@models';
export class UtilisateurCriteria extends BaseCriteria{


	nom: string;
	nomLike: string;
	prenom: string;
	prenomLike: string;
	cin: string;
	cinLike: string;
	adresse: string;
	adresseLike: string;
	email: string;
	emailLike: string;
	username: string;
	usernameLike: string;
	password: string;
	passwordLike: string;
	enabled: string = 'true';
	resetPassword: string;	
	oldPassword: string;
	oldPasswordLike: string;
	newPassword: string;
	newPasswordLike: string;
	profilId: number;
	employeId: number;
    
    constructor( order?: string, sortNameList?: Array<string> ) {
        super( order, sortNameList );
    }
    
}