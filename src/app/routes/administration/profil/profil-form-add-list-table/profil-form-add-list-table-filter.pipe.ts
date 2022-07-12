import { Pipe, PipeTransform } from "@angular/core"; 
import { Profil } from "@app/shared/models";

@Pipe({
    name: 'ProfilFormAddTableFilter'
})
export class ProfilFormAddTableFilterPipe implements PipeTransform {
    
    transform(profilList: Array<Profil>, libelleFilter: string, codeFilter: string , activeSihFilter: string ,activeValabFilter: string ,specialiteFilter: string): Array<Profil> {

        if (libelleFilter || codeFilter) {
            return profilList.filter( (profil) => { 
                 return true;
            });
        }
        
        return profilList;
    }
    isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }
}

