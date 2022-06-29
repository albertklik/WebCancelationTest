
function modal(show, id) {
    $('#' + id).modal(show ? 'show' : 'hide');
}

function loading(value) {
   modal(value, 'loadingModal');
}

function back() {
    window.history.back();
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
    if (array[key] === undefined) return key;
    return array[key]
}

function getImgIconStr(id,urls) {
  var selected  = urls.find(e => e.id == id) || urls[0];
  return '<img style="width: 20px" src="' + selected.url + '" alt="Image"/>'
}

function getTestGroupItem(data, interfaceStr = [], iconImgsUrl = []) {
    var msgString = "";
    msgString += '<div class="card"><div class="card-header"> #' + data.id + ' <b>' + data.name + '</b>'
    msgString += '<div class="float-right"><button onclick="editTestGroup('+ data.id +');" class="btn btn-light btn-sm"> <i class="fas fa-edit"></i></button><button onclick="deleteTestGroup(\''+data.id+'\')" class="btn btn-danger btn-sm"> <i class="fas fa-trash"></i></button></div>'
    msgString += '</div>'
    msgString += '<div class="card-body"><small><table class="table table-borderless table-sm"><tbody>'
    msgString += '<tr><th scope="row">' + getLanguageStr(interfaceStr,'goals') + '</th><td>'+ data.targets + '</td></tr>'
    msgString += '<tr><th scope="row">' + getLanguageStr(interfaceStr,'distractors') + '</th><td>'+ ((data.distractors == null || data.distractors == 0) ? 'auto' : data.distractors) + '</td></tr>'
    msgString += '<tr><th scope="row">' + getLanguageStr(interfaceStr,'goalSymbol') + '</th><td>'+ getImgIconStr(data.target_id,iconImgsUrl) + '</td></tr>'
    msgString += '<tr><th scope="row">' + getLanguageStr(interfaceStr,'timeDesc') + '</th><td>'+ data.time_limit + '</td></tr>'
    msgString += '<tr><th scope="row">' + getLanguageStr(interfaceStr,'align') + '</th><td>'+ ((data.aligned != null && data.aligned == 1) ? getLanguageStr(interfaceStr,'aligned') : getLanguageStr(interfaceStr,'notAligned')) + '</td></tr>'
    msgString += '<tr><th scope="row">' + getLanguageStr(interfaceStr,'nTests') + '</th><td>'+ data.tests_count + '</td></tr>'
    msgString += '</tbody></table></small></div>'
    msgString += '<div class="card-footer"><button ' + (data.tests_count > 0 ? '' : 'disabled') +' onclick="listTests(' + data.id + ')" class="btn btn-primary btn-sm mr-1"> <i class="fas fa-list"></i> ' + getLanguageStr(interfaceStr,'btnListTests') + '</button>'
    msgString += '<button onclick="playTest(' + data.id + ')" class="btn btn-secondary btn-sm mr-1"> <i class="fas fa-play"></i> ' + getLanguageStr(interfaceStr,'btnDoTheTest') + '</button>'
    msgString += '<button onclick="shareLink(' + data.id + ')" class="btn btn-secondary btn-sm mr-1"> <i class="fas fa-share"></i> ' + getLanguageStr(interfaceStr,'btnShareLink') + '</button>'
    msgString += '<button ' + (data.board ? '' : 'disabled') +' onclick="showBoard(' + data.id + ')" class="btn btn-secondary btn-sm mr-1"> <i class="fas fa-table"></i> ' + getLanguageStr(interfaceStr,'btnShowBoard') + '</button>'
    msgString += '</div></div><br>'
    return msgString;
}

function getTestTable(interfaceStr = []) {

}

function getTestItem(data) {
    var msgString = "";
    msgString += '<tr><td>' + data.id + '</td><td>' + data.student.name + '</td><td>' + data.hits + '</td><td>' + data.misses + '</td><td>' + data.seconds + '</td><td>' + convertDatetime(data.updated_at) + '</td>'
    msgString += '<td>'
    msgString += '<button onclick="showResult('+ data.id +');" class="btn btn-primary btn-sm"> <i class="fas fa-poll"></i></button>'
    msgString += '<button onclick="deleteTest('+ data.id +');" class="btn btn-danger btn-sm"> <i class="fas fa-trash"></i></button>'
    msgString += '</td></tr>'
    return msgString;
}

function getResultDataRow(data, index, iconImgsUrl = []) {
    var msgString = "";
    msgString += '<tr><td>' + (index+1) + '</td><td>' + timestampToDatetime(data.time) + '</td><td> ' + data.item.board_id.substring(0,1) + '</td><td> ' + data.item.board_id + ' </td><td>' + getImgIconStr(data.item.id,iconImgsUrl) + '</td><td>' + data.item.name + '</td><td>' + (data.hit ? '<i style="color:green" class="fas fa-check"></i>' : '<i style="color:red" class="fas fa-close"></i>') + '</td></tr>'
    return msgString;
}

function getResearchItem(data, interfaceStr = [], resumed = false) {
    var msgString = "";
    msgString += '<div class="col-sm-4" style="margin-bottom: 1em"><div class="card"><div class="card-header" style="background-color: darkcyan"><div class="float-right">'
    if (!resumed) {
        msgString += '<button onclick="editResearch('+ data.id +')" class="btn btn-outline-light btn-sm mr-1"> <i class="fas fa-edit"></i></button>'
        msgString += '<button onclick="deleteResearch(' + data.id + ')" class="btn btn-outline-light btn-sm mr-1"> <i class="fas fa-trash"></i></button>'
    }
    msgString += '</div><div class="float-left" style="margin-bottom: -25px; margin-top: 25px"><div style="background-color: darkcyan; width:50px; height:50px; border-width:5px" alt="img" class="img-thumbnail rounded-circle text-center" ><h3 style="color:white; "><b>' + data.title.substring(0,1).toUpperCase() + '</b></h3></div></div></div><div class="card-body">'
    msgString += '<h5 id="researchTitle">' + data.title + '</h5>'
    msgString += data.instructor_name != null ? '<p><b>' + data.instructor_name + '</b></p>' : ''
    msgString += '<small>' + data.description + '</small>'
    msgString += data.keywords != null ? '<small><p><b>' + data.keywords + '</b></p></small>' : ''
    msgString += '</div><div class="card-footer">'
    msgString += '<button class="btn fluid btn-success btn-sm btn-block" onclick="listTestGroups('+ data.id +')" ><i class="fas fa-tasks"></i> ' + getLanguageStr(interfaceStr,'btnManageResearch') + '</a>'
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

function share(url,title,text) {
    if (typeof navigator.share === 'function') {
    let data = {
        url: url,
        title: title,
        text: text,
      }
    navigator.share(data)
    } else {
        console.log("Error: Browser dont support share action");
    }
}

function convertDatetime(dateTime) {
  var dateTimeSp = dateTime.split('T');
  var date = dateTimeSp[0].split('-');
  var time = dateTimeSp[1].split('.')[0].split(':')
  return date[2] + '/' + date[1] + '/' + date[0] + ' às ' + time[0] + 'h:' + time[1] + 'min'
}

function secondsToDescription(seconds, interfaceStr = []) {
  switch(seconds) {
   case 30: return getLanguageStr(interfaceStr,'thirtySeconds')
   case 60: return getLanguageStr(interfaceStr,'oneMinute')
   case 120: return getLanguageStr(interfaceStr,'twoMinutes')
   case 180: return getLanguageStr(interfaceStr,'threeMinutes')
   case 300: return getLanguageStr(interfaceStr,'fiveMinutes')
   case 600: return getLanguageStr(interfaceStr,'TenMinutes')
   case 1800: return getLanguageStr(interfaceStr,'thirtyMinutes')
   case 3600: return getLanguageStr(interfaceStr,'oneHour')
   default: return ""
  }
}

function timestampToDatetime(timestamp) {
    var dt = eval(timestamp);
    var myDate = new Date(dt);
    return myDate.toLocaleString();
}

function goToUrl(url) {
    window.location.href = url;
}


/*
* REQUESTS 
*/

var REQUEST_PARAM = []
REQUEST_PARAM["testGroup.index"] = {type: "GET",url: "api/testGroup"};
REQUEST_PARAM["testGroup.store"] = {type: "POST",url: "api/testGroup"};
REQUEST_PARAM["testGroup.list"] = {type: "GET",url: "api/testGroup/list"};
REQUEST_PARAM["testGroup.update"] = {type: "POST",url: "api/testGroup/update/"};
REQUEST_PARAM["testGroup.destroy"] = {type: "POST",url: "api/testGroup/delete/"};
REQUEST_PARAM["testGroup.show"] = {type: "GET",url: "api/testGroup/"};

REQUEST_PARAM["student.store"] = {type: "POST",url: "api/student"};
REQUEST_PARAM["student.index"] = {type: "GET",url: "api/student"};
REQUEST_PARAM["student.exists"] = {type: "POST",url: "api/student/exists"};
REQUEST_PARAM["student.search"] = {type: "POST",url: "api/student/search"};
REQUEST_PARAM["student.update"] = {type: "POST",url: "api/student/update/"};
REQUEST_PARAM["student.show"] = {type: "GET",url: "api/student/"};
REQUEST_PARAM["student.destroy"] = {type: "POST",url: "api/student/delete/"};

REQUEST_PARAM["research.store"] = {type: "POST",url: "api/research"};
REQUEST_PARAM["research.index"] = {type: "GET",url: "api/research"};
REQUEST_PARAM["research.list"] = {type: "GET",url: "api/research/list"};
REQUEST_PARAM["research.destroy"] = {type: "POST",url: "api/research/delete/"};
REQUEST_PARAM["research.show"] = {type: "GET",url: "api/research/"};
REQUEST_PARAM["research.update"] = {type: "POST",url: "api/research/update/"};

REQUEST_PARAM["test.index"] = {type: "GET",url: "api/test"};
REQUEST_PARAM["test.store"] = {type: "POST",url: "api/test"};
REQUEST_PARAM["test.destroy"] = {type: "POST",url: "api/test/delete/"};
REQUEST_PARAM["test.update"] = {type: "POST",url: "api/test/update/"};
REQUEST_PARAM["test.show"] = {type: "GET",url: "api/test/"};
REQUEST_PARAM["test.list"] = {type: "GET",url: "api/test/list"};

function executeAjaxRequest(requestName, urlParams, data, success, error, complete) {
    var username = "umbler";
    var password = "testehospedagem";
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
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
        },
        complete: complete
    });
}

function getTestGroups(data, success, error, complete) {
   executeAjaxRequest("testGroup.list", [], data, success, error, complete);
}

function saveTestGroups(data, success, error, complete) {
    executeAjaxRequest("testGroup.store", [], data, success, error, complete);
}

function updateTestGroups(urlParams, data, success, error, complete) {
    executeAjaxRequest("testGroup.update", urlParams, data, success, error, complete);
}

function deleteTestGroups(urlParams, success, error, complete) {
    executeAjaxRequest("testGroup.destroy",urlParams,{},success,error,complete);
}

function getTestGroup(urlParams, success, error, complete) {
    executeAjaxRequest("testGroup.show", urlParams, {}, success, error, complete);
}

function getTests(data, success, error, complete) {
    executeAjaxRequest("test.list", [], data ,success, error, complete);
}

function deleteTests(urlParams, success, error, complete) {
    executeAjaxRequest("test.destroy", urlParams, {}, success, error, complete);
}

function getTest(urlParams, success, error, complete) {
    executeAjaxRequest("test.show", urlParams, {}, success, error, complete);
}

function saveTest(data, success, error, complete) {
    executeAjaxRequest("test.store",[], data, success, error, complete);
}

function getResearches(data, success, error, complete) {
    executeAjaxRequest("research.list",[], data, success, error, complete);
 }
 
 function saveResearches(data, success, error, complete) {
     executeAjaxRequest("research.store",[], data, success, error, complete);
 }
 
 function updateResearches(urlParams, data, success, error, complete) {
     executeAjaxRequest("research.update", urlParams, data, success, error, complete);
 }
 
 function deleteResearches(urlParams, success, error, complete) {
     executeAjaxRequest("research.destroy",urlParams,{},success,error,complete);
 }
 
 function getResearch(urlParams, success, error, complete) {
     executeAjaxRequest("research.show", urlParams, {}, success, error, complete);
 }

 function saveStudent(data, success, error, complete) {
    executeAjaxRequest("student.store",[], data, success, error, complete);
 }

 function studentExist(data, success, error, complete) {
    executeAjaxRequest("student.exists",[], data, success, error, complete);
 }

 function searchStudents(data, success, error, complete) {
    executeAjaxRequest("student.search",[], data, success, error, complete);
}

function updateStudents(urlParams, data, success, error, complete) {
    executeAjaxRequest("student.update", urlParams, data, success, error, complete);
}

function deleteStudents(urlParams, success, error, complete) {
    executeAjaxRequest("student.destroy",urlParams,{},success,error,complete);
}

function getStudent(urlParams, success, error, complete) {
    executeAjaxRequest("student.show", urlParams, {}, success, error, complete);
}
