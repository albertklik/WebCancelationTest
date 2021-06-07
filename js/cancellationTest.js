
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

    var testControl = new TestControl({
        resolution : {width : 600, height: 500},
        n_goals : 1,
        n_distractors : 3
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