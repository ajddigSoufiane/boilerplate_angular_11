import { Pipe, PipeTransform } from "@angular/core"; 
import { Utilisateur } from "@app/shared/models";

@Pipe({
    name: 'UtilisateurSelectListTableFilter'
})
export class UtilisateurSelectListTableFilterPipe implements PipeTransform {
    
    transform(utilisateurList: Array<Utilisateur>, libelleFilter: string, codeFilter: string): Array<Utilisateur> {

        if (libelleFilter || codeFilter) {
            return utilisateurList.filter( (utilisateur) => {
               return true
            });
        }
        
        return utilisateurList;
    }
    isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }
}

