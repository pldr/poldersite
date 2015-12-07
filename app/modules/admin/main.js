angular.module('poldersite.admin', [
    //submodules of admin modules
    'poldersite.user',
//    'poldersite.aanhef',
//    'poldersite.functie',
    'poldersite.regio',
//    'poldersite.titel',
//    'poldersite.groep',
//    'poldersite.kenmerk',
//    'poldersite.kenmkode',
//    'poldersite.mutreden',
//    'poldersite.categorie',
    'poldersite.soortlid',
//    'poldersite.soortbetaling',
    'poldersite.persoon',
    'poldersite.contriburieregels'
])
    //configure the parent state for this module here
    .constant('adminParentState', 'home')
    //configuration
  .config(function ($stateProvider, adminParentState) {
    $stateProvider

        .state('admin', {
            url: '/admin',
            parent: adminParentState,
            template: '<div ui-view=""></div>',
            abstract: true
        })
 ;
 });
