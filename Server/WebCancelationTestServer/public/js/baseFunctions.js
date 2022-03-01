
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

function getPaginatorItem(data) {
    var returnString = "";
    returnString += '<nav aria-label="Page navigation example"><ul class="pagination">'
    data.links.forEach( link => {
        disabledStr = link.url === null ? 'disabled' : '';
        activeStr = link.active ? 'active' : '';
        page = link.url != null ? getUrlParameter(link.url,'page') : ''
        returnString += '<li class="page-item '+ disabledStr + activeStr +'"><button onclick="loadTestGroups(\''+page+'\');" class="page-link" href="#">'+ link.label +'</a></li>';
    });
    return returnString
}

function getUrlParameter(sPageURL,sParam) {
        var sURLVariables = sPageURL.split('?')[1].split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
}

function getTestGroupItem(data) {
    var msgString = "";
    msgString += '<div class="card"><div class="card-header"> #' + data.id + ' ' + data.name 
    msgString += '<div class="float-right"><button onclick="editTestGroup(\''+data.id+'\');" class="btn btn-light btn-sm"> <i class="fas fa-edit"></i></button><button onclick="deleteTestGroup(\''+data.id+'\')" class="btn btn-danger btn-sm"> <i class="fas fa-trash"></i></button></div></div><div class="card-body">'
    //msgString += '<div class="card-title"><b>'+data.name+'</b></div>'
    msgString += '</div></div><br>'
    return msgString;
    
    /**
     *  <div class="card">
                    <div class="card-header">
                      #ADF34GT
                      <div class="float-right">
                        <a href="#" class="btn btn-light btn-sm"> <i class="fas fa-edit"></i></a>
                        <a href="#" class="btn btn-danger btn-sm"> <i class="fas fa-trash"></i></a>
                      </div>
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">Titulo do grupo de teste</h5>
                      <p class="card-text">Descrição do grupo de teste</p>
                      <table class="table table-borderless table-sm">
                          <tbody>
                            <tr>
                                <th scope="row">{{__("interface.goals")}}</th>
                                <td>3</td>
                            </tr>
                            <tr>
                                <th scope="row">{{__("interface.distractors")}}</th>
                                <td>5</td>
                            </tr>
                            <tr>
                                <th scope="row">{{__("interface.goalSymbol")}}</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <th scope="row">{{__("interface.timeDesc")}}</th>
                                <td>60</td>
                            </tr>
                            <tr>
                                <th scope="row">{{__("interface.align")}}</th>
                                <td>Desativado</td>
                            </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
     */
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

function copyToClipboard(element) {
    // var $temp = $("<input>");
    // $("body").append($temp);
    // $temp.val($(element).html()).select();
    // document.execCommand("copy");
    // $temp.remove();
    navigator.clipboard.writeText(element);
   }
