$(document).ready(function () {
    let tableData = []
    let temparr = []
    let rowData = {}
    $("#addRow").click(function () {
        $(this).css("background-color", "lightblue");
        $("#formTable")
            .append($('<tr>')   //appendig row in form table
                .append($('<td class="count">'))
                .append($('<td>').append($('<input type="text" class="form-control stuname" placeholder="Enter Name"><span></span>')))
                .append($('<td>').append($('<input  type="text" class="form-control subject" placeholder="Enter Subject"><span></span>')))
                .append($('<td>').append($('<input  type="number" class="form-control marks" placeholder="Enter Marks" onkeypress="onlyDigit(event)"><span></span>')))
                .append($('<td>').append($('<div><button class="accept" type="button">ACCEPT</button> <button class="reject" type="button">REJECT</button></div>')))
                .append($('<td>').append($('<button class="btn btn-outline-danger remove" type="button">REMOVE</button>')))
            );

        //clicking on remove btn
        $(".remove").click(function () {
            if(confirm("Are you sure to delete the row")){
                $(this).parents('tr').remove()
            }
        });
    });

    //saving the record
    $("#saveRecord").click(function (e) {
        e.preventDefault();
        validateData();
    
    });

   
    
    function tableGeneration(){
        $('#resultTable tbody').html('')
        $('#resultArea').css('display','block')
        tableData = [];
        $("tbody").find("tr").each(function () {  //getting tr 
            temparr = []; //empty ar for each row
            if($(this).hasClass('acceptRow'))
            {
                $(this).find("input").each(function () { //in each tr get the input element
                    temparr.push($(this).val())  //push the value of input into the array
                })
                //creating object
                rowData.name = temparr[0].toUpperCase();
                rowData.subject = temparr[1].toUpperCase();
                rowData.marks = temparr[2].toUpperCase();
                tableData.push(rowData) //push the object into the array(tableData)
                rowData = {}

            }
        });

        //creating result table
        for (i = 0; i < tableData.length; i++) {
            $('#resultTable tbody').append($('<tr>')
                                        .append(`<td>${i + 1}`)
                                        .append(`<td>${tableData[i].name}`)
                                        .append(`<td>${tableData[i].subject}`)
                                        .append(`<td class='marks'>${tableData[i].marks}`))
        }
        //if marks less than 33 the color the row with red color
        $('#resultTable tbody td.marks').each( function() {
            if(Number.parseInt($(this).text()) < 33){
                $(this).parent().css({'background-color':'#F08080','font-weight':'bold'})
            }
        })
    }

    function validateData(){
        let isDataValid=true;
        let onlyAlpha=/^[A-Za-z\s]+$/; //name and subject must start with and end with alphabets
        let onlyDigit=/^[0-9]+$/; 
        $('#formTable input[type="text"]').each( function(){
            if($(this).val()==''){
                $(this).siblings().html('*Please Enter This Field').css('color','red')
                isDataValid=false
            }
            else if(!($(this).val().match(onlyAlpha))){
                $(this).siblings().html('*Only Alphabets Allowed').css('color','red')
                isDataValid=false
            }
            else{
                $(this).next().html("")
            }
        })
        
        $('#formTable input[type="number"]').each(function(){
            if($(this).val()==''){
                $(this).siblings().html('*Please Enter This Field').css('color','red')
                isDataValid=false
            }
            else if(!($(this).val().match(onlyDigit))){
                $(this).siblings().html('*Only Digits Allowed').css('color','red')
                isDataValid=false
            }
            else if(($(this).val() < 0 || $(this).val() >100)){
                $(this).siblings().html('*Marks Should Be Between 0 to 100').css('color','red')
                isDataValid=false
            }
            else{
                $(this).next().html("")
            }
        })
        if(isDataValid){
            tableGeneration();
            getPercentage();
        }
    }

    function getPercentage(){
        $('#percentageTable tbody').html('')
        let nameArray=[];
        let subjectArray=[];
        let marksArray=[];
        let newMarksArray=[]
        let sum=0
        let percentage=[]

        $('.stuname').each(function() { nameArray.push($(this).val().toUpperCase());})
        $('.subject').each(function() { subjectArray.push($(this).val().toUpperCase());})
        $('.marks').each(function() { marksArray.push($(this).val().toUpperCase());})

        let duplicateName = nameArray.filter((value, index) =>{
            return nameArray.lastIndexOf(value)== index && nameArray.indexOf(value)!= index;
        })
        //stores the values that are not duplicate
        let nonduplicate =nameArray.filter( (v,i) =>{
            return nameArray.indexOf(v) ==i && nameArray.lastIndexOf(v)==i
        })
        
        //get all the student name and marks that are not duplicate
        for(i in nonduplicate){
            for(j in nameArray){
                if(nonduplicate[i]===nameArray[j]){
                    newMarksArray.push(marksArray[j]) //store the marks in newMarksArray
                }
            }
        }

        countTimes=0
        for(let i in duplicateName){    //iterate over each item of the duplicateName
             for(let j in nameArray){     //iterate over each item of the nameArray
                if(duplicateName[i] === nameArray[j]){    //checking if duplicateName is in the nameArray then return the index
                    countTimes++
                    sum += Number.parseInt(marksArray[j])
                }
        }
        percentage.push(sum/countTimes) //finding percentage of student whoes name occur more than 1 time
        sum=0
        countTimes=0
        }
    
        //creating percentage table
        //appending all the duplicate values
        for(i=0; i < duplicateName.length;i++){
            $('#percentageTable tbody').append($('<tr>')
                                        .append(`<td>${i + 1}`)
                                        .append(`<td>${duplicateName[i]}`)
                                        .append(`<td class="per">${Number.parseInt(percentage[i]).toFixed(2)}%`))
        }
        //appending all the non duplicate values
        for(i=0; i < nonduplicate.length;i++){
            $('#percentageTable tbody').append($('<tr>')
                                        .append(`<td>${i + 1}`)
                                        .append(`<td>${nonduplicate[i]}`)
                                        .append(`<td class="per">${Number.parseInt(newMarksArray[i]).toFixed(2)}%`))
        }
        //if percentage less than 33 then color the row to red
        $('#percentageTable tbody td.per').each( function() {
            if(Number.parseInt($(this).text()) < 33){
                $(this).parent().css({'background-color':'#F08080','font-weight':'bold'})
            }
        })
    }

    //searching data
    $("#searchText").on("keyup", function() {
        var value = $(this).val().toLowerCase().trim();
        $("#resultTable tbody tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });

    //sort the table by name
    $('#sortByName').click(function(){
        let ar =tableData.sort(function(a, b){
            var a1= a.name.toLowerCase(), b1= b.name.toLowerCase();
            if(a1== b1) return 0;
            return a1> b1? 1: -1;
        });
        
        $('#resultTable tbody').html('')
        for (i = 0; i < ar.length; i++) {
            $('#resultTable tbody').append($('<tr>')
                                        .append(`<td>${i + 1}`)
                                        .append(`<td>${ar[i].name}`)
                                        .append(`<td>${ar[i].subject}`)
                                        .append(`<td class='marks'>${ar[i].marks}`))
        }
    })
    
    //sort the table by subject
    $('#sortBySubject').click(function(){
        $('#resultTable tbody').html('')
        let ar =tableData.sort(function(a, b){
            var a1= a.subject.toLowerCase(), b1= b.subject.toLowerCase();
            if(a1== b1) return 0;
            return a1> b1? 1: -1;
        });
    
        for (i = 0; i < ar.length; i++) {
            $('#resultTable tbody').append($('<tr>')
                                        .append(`<td>${i + 1}`)
                                        .append(`<td>${ar[i].name}`)
                                        .append(`<td>${ar[i].subject}`)
                                        .append(`<td class='marks'>${ar[i].marks}`))
        }
    })
});

//clicking on accept button
$("#formTable tbody ").on('click','.accept', function(){
    $(this).parents("tr").addClass('acceptRow')
    $(this).css('background-color','green')
    $(this).siblings().css('background-color','peru')
})

//clicking on reject button
$("#formTable tbody").on('click','.reject', function(){
    if($(this).parents('tr').hasClass('acceptRow')){
        $(this).parents('tr').removeClass('acceptRow')
    }
    $(this).css('background-color','red')
    $(this).siblings().css('background-color',' #F5B041')
})
function onlyDigit(event){
    let key= event.key
    if(key === 'e' || key === '-' || key === '+' || key === '.' || key === 'E'){
        event.preventDefault()
    }
    if(key.ctrlKey){
        event.preventDefault();
    }
}