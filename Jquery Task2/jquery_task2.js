$(document).ready(function () {
    $("#addRow").click(function () {
        $(this).css("background-color","lightblue");
        $("#formTable")  
            .append($('<tr>')   //appendig row in form table
                .append($('<td class="count">'))
                .append($('<td>').append($('<input class="form-control" placeholder="Enter Name">')))
                .append($('<td>').append($('<input class="form-control" placeholder="Enter Subject">')))
                .append($('<td>').append($('<input class="form-control" placeholder="Enter Marks">')))
                .append($('<td>').append($('<div><button class="accept">ACCEPT</button> <button class="reject">REJECT</button></div>')))
                .append($('<td>').append($('<button class="btn btn-outline-danger">REMOVE</button>')))
                );
    //clicking on remove btn
    $(".btn-outline-danger").click(function () {
        $(this).parents("tr").remove()
         });
    });
});
