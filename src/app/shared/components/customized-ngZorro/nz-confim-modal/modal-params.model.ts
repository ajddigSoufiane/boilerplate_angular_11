
export class ModalParams  {
	title?:string = '<b> Confirmation !</b>';
	message?:string= '<div>Êtes-vous sûr de desactiver ces enregistrements ?</div>';
	nzCancelText?:string
	nzOkText?:string
	constructor() { 
	}

	toString() { return JSON.stringify(this); }


}