import { Pipe, PipeTransform } from "@angular/core";
import { Utilisateur } from "@app/shared/models";

@Pipe({
    name: 'UtilisateurFormAddTableFilter'
})
export class UtilisateurFormAddTableFilterPipe implements PipeTransform {

    transform(utilisateurList: Array<Utilisateur>, libelleFilter: string, codeFilter: string, nomFilter: string, prenomFilter: string, cinFilter: string, adresseFilter: string, emailFilter: string): Array<Utilisateur> {

        if (nomFilter || prenomFilter || cinFilter || adresseFilter || emailFilter) {
            return utilisateurList.filter((utilisateur) => {
                //add every attrib you need to find 
                return (nomFilter && !this.isBlank(nomFilter) && utilisateur.nom.toLowerCase().includes(nomFilter.toLowerCase())
                    || (prenomFilter && !this.isBlank(prenomFilter) && utilisateur.prenom.toLowerCase().includes(prenomFilter.toLowerCase()))
                    || (cinFilter && !this.isBlank(cinFilter) && utilisateur.cin.toLowerCase().includes(cinFilter.toLowerCase()))
                    || (adresseFilter && !this.isBlank(adresseFilter) && utilisateur.adresse.toLowerCase().includes(adresseFilter.toLowerCase()))
                    || (emailFilter && !this.isBlank(emailFilter) && utilisateur.email.toLowerCase().includes(emailFilter.toLowerCase()))
                )

            });
        }

        return utilisateurList;
    }
    isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }
}

