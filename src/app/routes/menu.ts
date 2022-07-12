

import { APP_URL } from '@shared/utility/url-enumeration';




const HeadingMain = {
  text: '',
  heading: true
};


//home
export const Home = {

  id: APP_URL.Main,
  text: 'Accueil',
  icon: 'home',
  link: '/boileplate',
  
  categories: ['BOILEPLATE'],
  level: 1,
  submenu: null

}

 
// menu de context tableau de bord
export const tableau_de_bord = {

  id: APP_URL.Main,
  noRole: true,
  text: 'Tableau de bord',
  img: "assets/enova-theme/img/acceuil/patients.png",
  icon: 'line-chart',
  link: '/home',
  
  categories: ['BOILEPLATE'],
  level: 1,
  submenu: null

}

 


export const Menu = {

  id: APP_URL.Main,
  text: 'Menu general',
  icon: 'unordered-list',
  link: '/home',
  
  categories: ['BOILEPLATE'],
  level: 1,
  submenu: [ 
    //put here the menu of element of menu 
  ]

}

 
  

//parti parametrage
export const Referentiel = {
  id: APP_URL.Main,
  text: "Référentiel",
  icon: "setting",
  link: "/home",
  
  categories: ["REFERENTIEL"],
  level: 1,
  submenu: [  
    {
      text: "menu.refDemoEntity.title",
      icon: "setting",
      link: "/referentiel/refDemoEntity/list",
      roles: ["ROLE_READ_UTILISATEUR"],
      level: 1,
    } 
 
    
  ],
};
export const Administration = {

  id: APP_URL.Main,
  text: 'Administration',
  icon: 'setting',
  link: '/home',
  
  categories: ['ADMINISTRATION'],
  level: 1,
  submenu: [
    {
      text: 'menu.utilisateur.title',
      icon: 'user',
      link: '/administration/utilisateur/list',
      roles: ['ROLE_READ_UTILISATEUR'],
      level: 1
    },
    {
      text: 'menu.profile.title',
      icon: 'solution',
      link: '/administration/profil/list',
      roles: ['ROLE_READ_PROFIL'],
      level: 1
    }
  ]

}


export const Menu_Parametrage = {

  id: APP_URL.Main,
  text: 'Parametrage general',
  icon: 'unordered-list',
  link: '/home',
  
  categories: ['BOILEPLATE'],
  level: 1,
  submenu: [
    Referentiel,
    //Administration 
  ]

}
export const menu = [
  HeadingMain,
  Home, 
  Referentiel,
  Administration 
];