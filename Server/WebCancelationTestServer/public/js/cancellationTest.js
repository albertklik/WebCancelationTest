
$(function(){
    
    $("#nomeDataList").on("input", function(){
        // search value on api
        var value = $('#nomeDataList').val();
        // do not proceed if the value is empty
        if (value.length == 0)
            return;
        searchStudentsNames(value,function(data) {
           console.log(data);
           $('#nomeListOptions').empty();
           $.each(data, function(key, value) {   
            $('#nomeListOptions')
                .append($("<option></option>")
                           .attr("value", value.name).attr("student-id",value.id));
            });
        });
    });

    showDiv('#formInsertName',true);

    $('#checkNameButton').on('click',function() {
        showDiv('#formInsertName',false);
        showDiv('#formStudent',true);
    });

    $('#saveStudentButton').on('click',function() {
        showDiv('#formStudent',false);
        showDiv('#showFigures',true);
        //showTestPanel(true);
     });

     $('#startTest').on('click',function() {
        showTestPanel(true);
     });

     

    var canvas = $('#testCanvas');
    var testControl = new TestControl({
        resolution : {width : 3840, height: 2160},
        n_goals : 2,
        n_distractors : 0
    },'testCanvas');
});

function searchStudentsNames(val,success) {
    $.ajax({
        type: "POST",
        url: "api/student/search",
        data: {
            name: val
        },
        error: function(request, error) {
            console.log(arguments);
        },
        success: success,
    });
}

function showStudentForm() {

}

function showSimbols() {

}

function startTest() {

}

function loading(state) {
    showDiv('#loaderSpinner',state);
}

function showDiv(divId,state) {
    if (state){
        $(divId).hide().fadeIn("slow");
        $(divId).removeClass('d-none').addClass('d-block');
        return;
    }
    $(divId).show().fadeOut("slow");
    $(divId).removeClass('d-block').addClass('d-none');
}

function showTestPanel(state) {
    showDiv('#formContent',!state);
    showDiv('#testCanvas',state);
}