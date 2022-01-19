
function modal(show, id) {
    $('#' + id).modal(show ? 'show' : 'hide');
}

function loading(value) {
    modal(value, 'loadingModal');
}

function serializeFormData(formId) {
    var formObj = {};
    var inputs = $('#'+ formId).serializeArray();
    $.each(inputs, function (i, input) {
        formObj[input.name] = input.value;
    });
    return formObj;
}

function getMessageErrors(error) {
    var msgString = "";
    msgString += '<div class="alert alert-danger" role="alert">'
    msgString +='<b class="alert-heading">Erro ao enviar formulário</b>'
    msgString +='<p>'+error.message+'</p><hr>'
    if (typeof error.errors !== 'undefined') {
        Object.values(error.errors).forEach(item => {
            msgString +='<p class="mb-0">'+item+'</p>'
        });
    }
    msgString +='</div>'
    return msgString;
}




/*
* REQUESTS 
*/

function getTestGroups(data,success,error,complete) {
         $.ajax({
             type: "GET",
             url: "api/testGroup/list",
             data: data,
             success: success,
             error: error,
             complete: complete
         });
}

function saveTestGroups(data,success,error,complete) {
    $.ajax({
        type: "POST",
        url: "api/testGroup",
        data: data,
        success: success,
        error: error,
        complete: complete
    });
}
