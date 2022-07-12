import { Pipe, PipeTransform } from "@angular/core"; 
import { Profil } from "@app/shared/models";

@Pipe({
    name: 'ProfilSelectListTableFilter'
})
export class ProfilSelectListTableFilterPipe implements PipeTransform {
    
    transform(profilList: Array<Profil>, libelleFilter: string, codeFilter: string): Array<Profil> {

        if (libelleFilter || codeFilter) {
            return profilList.filter( (profil) => {
                //add every attrib you need to find 
                
                
            });
        }
        
        return profilList;
    }
    isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }
}

