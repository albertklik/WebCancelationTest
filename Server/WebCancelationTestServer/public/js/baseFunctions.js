
function modal(show, id) {
    $('#' + id).modal(show ? 'show' : 'hide');
}

function loading(value) {
   modal(value, 'loadingModal');
}

function loadingModal(value,id) {
    if (value) {
        $('#' + id).find('.loadingModal').show();
        $('#' + id).find('.modalContent').hide();
        $('#' + id).find('.modal-footer').hide();
    } else {
        $('#' + id).find('.loadingModal').hide();
        $('#' + id).find('.modalContent').show();
        $('#' + id).find('.modal-footer').show();
    }
}

function getMsg(type,title,content) {
    var msgString = "";
    msgString += '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">'
    if (typeof title !== 'undefined') {
        msgString +='<b class="alert-heading">'+title+'</b>'
    }
    if (typeof content !== 'undefined') {
        msgString +='<p><small>'+content+'</small></p>'
    }
    msgString +='<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
    return msgString;
}

function getTestGroupItem(data) {
    var msgString = "";
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
    msgString +='<b class="alert-heading">Erro</b>'
    msgString +='<p><small>'+error.message+'</small></p><hr>'
    if (typeof error.errors !== 'undefined') {
        Object.values(error.errors).forEach(item => {
            msgString +='<small><p class="mb-0">'+item+'</p></small>'
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
