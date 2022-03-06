
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

function showConfirmationModal(titleStr,messageStr,callback) {
    var title = $("#confirmationModal").find("#confirmationTitle"),
        message = $("#confirmationModal").find("#confirmationText"),
        confirmationBtn = $("#confirmationModal").find("#confirmationBtn");
    title.html(titleStr);
    message.html(messageStr);
    confirmationBtn.on("click",function () {
        callback();
        modal(false,"confirmationModal");
    });   
    modal(true,"confirmationModal");
}

function showMsg(type,title,content,id = "msg") {
    $('#' + id).html(getMsg(type,title,content));
}

function clearMsg(id = "msg") {
    $('#' + id).html('');
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
        returnString += '<li class="page-item '+ disabledStr + activeStr +'"><button onclick="goToPage(\''+page+'\');" class="page-link" href="#">'+ link.label +'</a></li>';
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

function getLanguageStr(array,key) {
    if (array[key] === undefined) return '';
    return array[key]
}

function getImgIconStr(id,urls) {
  var selected  = urls.find(e => e.id == id) || urls[0];
  return '<img style="width: 20px" src="'+selected.url+'" alt="Image"/>'
}

function getTestGroupItem(data, interfaceStr = [], iconImgsUrl = []) {
    var msgString = "";
    msgString += '<div class="card"><div class="card-header"> #' + data.id + ' <b>' + data.name + '</b>'
    msgString += '<div class="float-right"><button onclick="editTestGroup('+ data.id +');" class="btn btn-light btn-sm"> <i class="fas fa-edit"></i></button><button onclick="deleteTestGroup(\''+data.id+'\')" class="btn btn-danger btn-sm"> <i class="fas fa-trash"></i></button></div>'
    msgString += '</div>'
    msgString += '<div class="card-body"><small><table class="table table-borderless table-sm"><tbody>'
    msgString += '<tr><th scope="row">' + getLanguageStr(interfaceStr,'goals') + '</th><td>'+ data.targets + '</td></tr>'
    msgString += '<tr><th scope="row">' + getLanguageStr(interfaceStr,'distractors') + '</th><td>'+ (data.distractors == null ? 'auto' : data.distractors) + '</td></tr>'
    msgString += '<tr><th scope="row">' + getLanguageStr(interfaceStr,'goalSymbol') + '</th><td>'+ getImgIconStr(data.target_id,iconImgsUrl) + '</td></tr>'
    msgString += '<tr><th scope="row">' + getLanguageStr(interfaceStr,'timeDesc') + '</th><td>'+ data.time_limit + '</td></tr>'
    msgString += '<tr><th scope="row">' + getLanguageStr(interfaceStr,'align') + '</th><td>'+ ((data.aligned != null && data.aligned == 1) ? getLanguageStr(interfaceStr,'aligned') : getLanguageStr(interfaceStr,'notAligned')) + '</td></tr>'
    msgString += '</tbody></table></small></div>'
    msgString += '<div class="card-footer"><button onclick="listTests(' + data.id + ')" class="btn btn-primary btn-sm mr-1"> <i class="fas fa-list"></i> ' + getLanguageStr(interfaceStr,'btnListTests') + '</button>'
    msgString += '<button onclick="playTest(' + data.id + ')" class="btn btn-secondary btn-sm mr-1"> <i class="fas fa-play"></i> ' + getLanguageStr(interfaceStr,'btnDoTheTest') + '</button>'
    msgString += '<button onclick="shareLink(' + data.id + ')" class="btn btn-secondary btn-sm mr-1"> <i class="fas fa-share"></i> ' + getLanguageStr(interfaceStr,'btnShareLink') + '</button>'
    //msgString += '<button onclick="showBoard(' + data.id + ')" class="btn btn-secondary btn-sm mr-1"> <i class="fas fa-table"></i> ' + getLanguageStr(interfaceStr,'btnShowBoard') + '</button>'
    msgString += '</div></div><br>'
    return msgString;
}

function getTestItem(data) {
    var msgString = "";
    return msgString;
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

function copyToClipboard(element) {
    navigator.clipboard.writeText(element);
}


/*
* REQUESTS 
*/

var REQUEST_PARAM = []
REQUEST_PARAM["testGroup.index"] = {type: "GET",url: "api/testGroup"};
REQUEST_PARAM["testGroup.store"] = {type: "POST",url: "api/testGroup"};
REQUEST_PARAM["testGroup.list"] = {type: "GET",url: "api/testGroup/list"};
REQUEST_PARAM["testGroup.update"] = {type: "PUT",url: "api/testGroup/"};
REQUEST_PARAM["testGroup.destroy"] = {type: "DELETE",url: "api/testGroup/"};
REQUEST_PARAM["testGroup.show"] = {type: "GET",url: "api/testGroup/"};

REQUEST_PARAM["student.store"] = {type: "POST",url: "api/student"};
REQUEST_PARAM["student.index"] = {type: "GET",url: "api/student"};
REQUEST_PARAM["student.exists"] = {type: "POST",url: "api/student/exists"};
REQUEST_PARAM["student.search"] = {type: "POST",url: "api/student/search"};
REQUEST_PARAM["student.update"] = {type: "PUT",url: "api/student/"};
REQUEST_PARAM["student.show"] = {type: "GET",url: "api/student/"};
REQUEST_PARAM["student.destroy"] = {type: "DELETE",url: "api/student/"};

REQUEST_PARAM["test.index"] = {type: "GET",url: "api/test"};
REQUEST_PARAM["test.store"] = {type: "POST",url: "api/test"};
REQUEST_PARAM["test.destroy"] = {type: "DELETE",url: "api/test/"};
REQUEST_PARAM["test.update"] = {type: "PUT",url: "api/test/"};
REQUEST_PARAM["test.show"] = {type: "GET",url: "api/test/"};
REQUEST_PARAM["test.list"] = {type: "GET",url: "api/test/list"};

function executeAjaxRequest(requestName,urlParams,data,success,error,complete) {
    urlParamsStr = "";
    urlParams.forEach( (param,i) => {
      var isLastElement = i == urlParams.length -1;
      urlParamsStr += param
      if (!isLastElement) urlParamsStr += "/"
    });
    $.ajax({
        type: REQUEST_PARAM[requestName].type,
        url: REQUEST_PARAM[requestName].url + urlParamsStr,
        data: data,
        success: success,
        error: error,
        complete: complete
    });
}

function getTestGroups(data,success,error,complete) {
   executeAjaxRequest("testGroup.list",[],data,success,error,complete);
}

function saveTestGroups(data,success,error,complete) {
    executeAjaxRequest("testGroup.store",[],data,success,error,complete);
}

function updateTestGroups(urlParams,data,success,error,complete) {
    executeAjaxRequest("testGroup.update",urlParams,data,success,error,complete);
}

function deleteTestGroups(urlParams,success,error,complete) {
    executeAjaxRequest("testGroup.destroy",urlParams,{},success,error,complete);
}

function getTestGroup(urlParams,success,error,complete) {
    executeAjaxRequest("testGroup.show",urlParams,{},success,error,complete);
}


