$(document).ready(function () {
    let tableData=[]
    let temparr=[]
    let rowData={}
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

    //saving the record
    $("#saveRecord").click( function(){
        tableData=[];
        $("tbody").find("tr").each( function() {  //getting tr 
            temparr=[]; //empty ar for each row
            $(this).find("input").each( function() { //in each tr get the input element
                temparr.push($(this).val())  //push the value of input into the array
            })
            //creating object
            rowData.name=temparr[0]
            rowData.subject=temparr[1]
            rowData.marks=temparr[2]
            tableData.push(rowData) //push the object into the array(tableData)
            rowData={}
        });
        console.log(tableData)
    });  
});
