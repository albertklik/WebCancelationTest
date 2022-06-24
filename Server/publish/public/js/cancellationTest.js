
var testData = {};
var testControl = {};


$(function() {
    
    $("#nomeDataList").on("input", function(){
        var value = $('#nomeDataList').val();
        if (value.length == 0)
            return;
        searchStudents(
            { name : value },
            function(data) {
           updateDataOptionsName(data)
        }, function(data) {
            message(data);
        }, function() {});
    });

    showDiv('#formInsertName',true);

    $('#checkNameButton').on('click', function() {
        var value = $('#nomeDataList').val();
        loading(true);
        studentExist(
            { name : value },
            function(data) {
            if (data.exists) {
                console.log(data);
                testData.student = data.student;
                showTargetAndTime();
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
            showTargetAndTime();
        }, function (data) {
            message(data);
        }, function () {
            loading(false);
        });
     });

     $('#showDistractors').on('click',function() {
        showSimbols()
     });

     $('#startTest').on('click',function() {
        showTestPanel(true);
        setupTest();
        startTest();
     });

     $('#cancelTest').on('click',function() {
        reloadTest();
     });

     $('#finishTest').on('click',function() {
        testControl.finishTest();
     });


     var selected  = testData.imgs_url.find(e => e.id == testData.testGroup.target_id) || testData.imgs_url[0];
     $('#targetImg').attr("src",selected.url)
     $('#TestTimeSpan').html(secondsToDescription(testData.testGroup.time_limit,testData.interfaceStr).toLowerCase())
});

function setTestGroupData(data) {
    testData.testGroup = data
    //setupTest();
}

function setupTest() {
    console.log(testData.testGroup);
    var data = {
        resolution : {width : 1920, height: 1080},
        n_goals : testData.testGroup.targets,
        n_distractors : (testData.testGroup.distractors != null ? testData.testGroup.distractors : 0),
        aligned : (testData.testGroup.aligned == 1),
        goal_id : testData.testGroup.target_id,
        time_limit : testData.testGroup.time_limit,
        board : JSON.parse(testData.testGroup.board),
        callbacks : {
            testFinished : function (result) {
              finishTest(result);
            },
            error : function (ex) {
                console.log(ex);
            }
        }
    };
    console.log(data.board);
    testControl = new TestControl(data,'testCanvas',true);
}

function showStudentForm(name) {
    $('#studentName').val(name);
    $('#nameText').append(name.split(' ')[0]);
    showDiv('#formInsertName',false);
    showDiv('#showTargetAndTime',false);
    showDiv('#formStudent',true);
}

function showSimbols() {
    showDiv('#formInsertName',false);
    showDiv('#formStudent',false);
    showDiv('#showTargetAndTime',false);
    showDiv('#showFigures',true);
}

function showTargetAndTime() {
    showDiv('#formInsertName',false);
    showDiv('#formStudent',false);
    showDiv('#showTargetAndTime',true);
    showDiv('#showFigures',false);
}

function showresultTest() {
    showDiv('#formInsertName',false);
    showDiv('#formStudent',false);
    showDiv('#showFigures',false);
    showDiv('#showTargetAndTime',false);
    showDiv('#showResult',true);
}

function reloadTest() {
    showTestPanel(false);
    showDiv('#formInsertName',true);
    showDiv('#formStudent',false);
    showDiv('#showFigures',false);
    showDiv('#showTargetAndTime',false);
    showDiv('#showResult',false);
    $("#nomeDataList").val("");
}

function startTest() {
  testControl.renderBoard();
  testControl.startTest();
}

function finishTest(data) {
    showTestPanel(false);
    loading(true);
    saveTest({
      result: JSON.stringify(data.result),
      seconds: data.seconds,
      hits: data.hits,
      misses: data.misses,
      student_id: testData.student.id,
      test_group_id: testData.testGroup.id,
      board: JSON.stringify(data.board)
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
    showDiv('#logo',!state)
    showDiv('#formContent',!state);
    showDiv('#testCanvas',state);
    showDiv('#testButtons',state)
}

function updateDataOptionsName(data) {
    $('#nomeListOptions').empty();
    $.each(data, function(key, value) {   
     $('#nomeListOptions')
         .append($("<option></option>")
                    .attr("value", value.name).attr("student-id",value.id));
     });
}

function showMessage(type,message) {
    $('#messages').empty();
    $('#messages').append($("div").addClass("alert " + type).attr("role","alert").text(message));
}

function message(msg) {
   console.log(msg);
}