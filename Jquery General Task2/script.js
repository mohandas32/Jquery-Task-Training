let table = new DataTable('#recordTable');
$('#area').hide()
$(document).ready(function(){
    
    $('#addRecord').click( async function(){

        const { value: formValues } = await Swal.fire({
            title: 'ENTER DETAIL',
            html:
              '<input id="userName" type="text" class="swal2-input" placeholder="Enter Name">'+
              '<input id="userAge" type="number" onkeypress="restrict(event)" class="swal2-input" placeholder="Enter Age">'+
              '<input id="userDesignation" type="text" class="swal2-input" placeholder="Enter Designation">',
            focusConfirm: false,
            allowOutsideClick:false,
            confirmButtonText: 'SAVE',
            preConfirm: () => {
              return [
                document.getElementById('userName').value.trim(),
                document.getElementById('userAge').value.trim(),
                document.getElementById('userDesignation').value.trim()
            ]
            }
          })
          if (formValues) {
            //passing the value for validating inputs
            validateData(formValues)
           
        }
    })
})

function restrict(e){
    //if key are other than digit the block that key
    if(e.keyCode<48 || e.keyCode>57 )
        e.preventDefault();

}
//function to add the record in table
function addRecord(inputValues){
    table.row.add([inputValues[0],inputValues[1],inputValues[2]]).draw(false);
    $('#area').show()

}

//function to validate the data
function validateData(inputData){
    let isDataValid=true;
   
if(inputData[0]=="" || inputData[1]=="" || inputData[2]==""){
    swal.fire({
        text:"Field Should not be empty",
        icon:'warning',
        confirmButtonText:'Try Again'
    })
    isDataValid=false;
}
else if(!(inputData[0].match(/^[A-Za-z\s]+$/)) || !(inputData[2].match(/^[A-Za-z\s]+$/))){
    swal.fire({

        text:"Only Alphabets Allowed In Name And Designation",
        icon:'warning',
        confirmButtonText:'Try Again'

    })  
    isDataValid=false;
}
else if(Number.parseInt(inputData[1]) <20 || Number.parseInt(inputData[1]) >100){
    swal.fire({
        text:"Age should be between 20 to 100",
        icon:'warning',
        confirmButtonText:'Try Again'
    })
    isDataValid=false;
}

if(isDataValid){
    //if the data is validated then
    //passing the data to print the record in table
    addRecord(inputData)
}

}
