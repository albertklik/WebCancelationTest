
function modal(show, id) {
    $('#' + id).modal(show ? 'show' : 'hide');
}

function loading(value) {
    modal(value, 'loadingModal');
}

function lang_img(lang) {
    switch (lang) {
        case  'en' :
         return '';
        case  'pt' :
         return '';
        case 'fr' :
         return '';     
    }
}