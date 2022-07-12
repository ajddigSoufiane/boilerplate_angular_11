import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ColorsService {

    APP_COLORS = {
        'primary': '#5d9cec',
        'success': '#27c24c',
        'info': '#23b7e5',
        'warning': '#ff902b',
        'danger': '#f05050',
        'inverse': '#131e26',
        'green': '#37bc9b',
        'pink': '#f532e5',
        'purple': '#7266ba',
        'dark': '#3a3f51',
        'yellow': '#fad732',
        'gray-darker': '#232735',
        'gray-dark': '#3a3f51',
        'gray': '#dde6e9',
        'gray-light': '#e4eaec',
        'gray-lighter': '#edf1f2', 
        'eno-primaire': '#0A1217',

        /* Couleur texte secondaire */

        'eno-secondaire': '#828282',

        /* Couleur primaire principale */

        'eno-principale-color' :'#005792',

        /* Couleur secondaire */

        'eno-secondaire-color': '#F5FDFF',

        'eno-marron-color': '#903911',

        'eno-vert-color': '#2b8983',

        'eno-blanc-color': '#fff',

        'eno-rouge-color': '#a01b53',

        

        /* Arrière plan du menu vertical*/

        'eno-vertical' :'#FCFCFC',
        'eno-purple-primary-0': '#2E1E7D',
        'eno-purple-1': '#0F0832',
        'eno-purple-2': '#2E1E7D',
        'eno-purple-3': '#423B9E',
        'eno-purple-4': '#8184CB',
        'eno-purple-5': '#E9E7FC',
        // Cutoms GRAY colors for theme
        'eno-gray-primary-0': '$eno-vertical',
        'eno-gray-1': '#08080A',
        'eno-gray-2': '#19191D',
        'eno-gray-3': '#39393D',
        'eno-gray-4': '#57575C',
        'eno-gray-5': '#6A6A70',
        'eno-gray-6': '#939398',
        'eno-gray-7': '#B3B3B8',
        'eno-gray-8': '#D7D7DC',
        'eno-gray-9': '#E7E7ED',
        'eno-gray-10': '#F1F1F7',
        'eno-gray-11': '#FCFCFF',
        // Cutoms TAG BLUE colors for theme
        'eno-blue-primary-0': '#2A5A9D',
        'eno-blue-1': '#2A5A9D',
        'eno-blue-2': '#397BC1',
        'eno-blue-3': '#5498D4',
        'eno-blue-4': '#93C1E6',
        'eno-blue-5': '#BBD9F0',
        'eno-blue-6': '#E3F0F8',
        // Cutoms TAG purple light colors for theme
        'eno-purple-light-primary-0': '#5D1E7D',
        'eno-purple-light-1': '#42166C',
        'eno-purple-light-2': '#5D1E7D',
        'eno-purple-light-3': '#7E288F',
        'eno-purple-light-4': '#9B47A4',
        'eno-purple-light-5': '#C490C9',
        'eno-purple-light-6': '#F0E4F1',
        // Cutoms TAG purple lighter colors for theme
        'eno-purple-lighter-primary-0': '#7D1E6D',
        'eno-purple-lighter-1': '#7D1E6D',
        'eno-purple-lighter-2': '#BB2283',
        'eno-purple-lighter-3': '#E52192',
        'eno-purple-lighter-4': '#E469BB',
        'eno-purple-lighter-5': '#EFBEE1',
        'eno-purple-lighter-6': '#F8E5F3',
        // Cutoms TAG green colors for theme
        'eno-green-primary-0': '#83A431',
        'eno-green-1': '#83A431',
        'eno-green-2': '#8FBC3B',
        'eno-green-3': '#A6E54E',
        'eno-green-4': '#BEEE82',
        'eno-green-5': '#E2F7C9',
        'eno-green-6': '#F3FCE9',
        // Cutoms  green colors for feedback
        'eno-green-feedback-primary-0': '#00A04A',
        'eno-green-feedback-second-0': '#98d6a9',
        // Cutoms  yallow colors for feedback
        'eno-yallow-feedback-primary-0': '#FDDC0D',
        'eno-yallow-feedback-second-0': '#FBF269',
        // Cutoms  RED colors for feedback
        'eno-red-feedback-primary-0': '#e01f3d',
        'eno-red-feedback-second-0': '#ed717d',
        // Cutoms  blue colors for feedback
        'eno-blue-feedback-primary-0': '#204496',
        'eno-blue-feedback-second-0': '#4ea1ec',

    };

    constructor() { }

    byName(name) {
        // console.log(name +' -> ' + this.APP_COLORS[name])
        return (this.APP_COLORS[name] || '#fff');
    }

}
