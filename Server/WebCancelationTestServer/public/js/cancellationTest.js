
var testData = {};
var testControl = {};


$(function(){
    
    $("#nomeDataList").on("input", function(){
        var value = $('#nomeDataList').val();
        if (value.length == 0)
            return;
        searchStudentsNames(value,function(data) {
           updateDataOptionsName(data)
        });
    });

    testData.board = JSON.stringify(new Board(3,3,0,{id:1},{width : 1920, height: 1080},true).generateRandom());
    console.log(testData.board);

    showDiv('#formInsertName',true);

    $('#checkNameButton').on('click', function() {
        var value = $('#nomeDataList').val();
        if (value.length == 0)
            return;
        loading(true);
        findStudentByName(value,
            function(data) {
            if (data.exists) {
                testData.student = data.student;
                showSimbols();
                return;
            }
            showStudentForm(value); 
        }, function(data) {
            message(data);
        }, function() {
            loading(false);
        });    
    });

    $('#saveStudentButton').on('click',function() {
        loading(true);
        saveStudent({
            name : $('#studentName').val(),
            birth_date : $('#studentBirthDate').val()
        }, function() {
            showSimbols();
        }, function (data) {
            message(data);
        }, function () {
            loading(false);
        });
     });

     $('#startTest').on('click',function() {
        showTestPanel(true);
        startTest();
     });

    testControl = new TestControl({
        resolution : {width : 1920, height: 1080},
        n_goals : testData.testGroup.targets,
        n_distractors : testData.testGroup.distractors,
        aligned : testData.testGroup.aligned,
        goal_id : testData.testGroup.target_id,
        time_limit : testData.testGroup.time_limit,
        board : JSON.parse(testData.board),
        callbacks : {
            testFinished : function (result) {
              finishTest(result);
            },
            error : function (ex) {
                console.log(ex);
            }
        }
    },
    'testCanvas',
    true);
});

function setTestGroupData(data) {
    testData.testGroup = data
}

function searchStudentsNames(val,success,error,complete) {
    $.ajax({
        type: "POST",
        url: "api/student/search",
        data: { name : val },
        success: success,
        error: error,
        complete: complete,
    });
}

function findStudentByName(val, success, error, complete) {
    $.ajax({
        type: "POST",
        url: "api/student/exists",
        data: { name : val },
        success: success,
        error: error,
        complete: complete
    });
}

function saveStudent(data,success,error,complete) {
    $.ajax({
        type: "POST",
        url: "api/student",
        data: data,
        success: success,
        error: error,
        complete: complete
    });
}

function saveTest(data,success,error,complete) {
    $.ajax({
      type: "POST",
      url: "api/test",
      data: data,
      success: success,
      error: error,
      complete: complete
    });
}

function showStudentForm(name) {
    $('#studentName').val(name);
    $('#nameText').append(name.split(' ')[0]);
    showDiv('#formInsertName',false);
    showDiv('#formStudent',true);
}

function showSimbols() {
    showDiv('#formInsertName',false);
    showDiv('#formStudent',false);
    showDiv('#showFigures',true);
}

function showresultTest() {
    showDiv('#formInsertName',false);
    showDiv('#formStudent',false);
    showDiv('#showFigures',false);
    showDiv('#showResult',true);
}

function startTest() {
  testControl.startTest();
}

function finishTest(data) {
    showTestPanel(false);
    loading(true);
    alert();
    saveTest({
      result : JSON.stringify(data.result),
      seconds : data.seconds,
      hits : data.hits,
      misses : data.misses,
      student_id : testData.student.id,
      test_group_id : testData.testGroup.id
    }, function() {
      showresultTest();
    }, function(data) {
        message(data);
    }, function() {
      loading(false);
    });
}

function loading(state) {
    $(state ? '#loaderSpinner' : '#formContent').removeClass('d-none').addClass('d-block');
    $(!state ? '#loaderSpinner' : '#formContent').removeClass('d-block').addClass('d-none');
}

function showDiv(divId,state) {
    if (state){
        $(divId).hide().fadeIn("slow");
        $(divId).removeClass('d-none').addClass('d-block');
        return;
    }
    //$(divId).show().fadeOut("slow");
    $(divId).removeClass('d-block').addClass('d-none');
}

function showTestPanel(state) {
    showDiv('#formContent',!state);
    showDiv('#testCanvas',state);
}

function updateDataOptionsName(data) {
    $('#nomeListOptions').empty();
    $.each(data, function(key, value) {   
     $('#nomeListOptions')
         .append($("<option></option>")
                    .attr("value", value.name).attr("student-id",value.id));
     });
}

function message(msg) {
   console.log(msg);
}