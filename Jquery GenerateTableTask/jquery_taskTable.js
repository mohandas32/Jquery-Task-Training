$(document).ready( function(){
    $('input').keypress(function(key) { //only allow the number keys to be pressed in input
        if(key.keyCode < 48 || key.keyCode > 57) return false;
    });
   
    $('#generateTable').click(function(){
        $('#createTable').html('')
        let noOfRows=$('#row').val()
        let noOfCols=$('#col').val()
        if(noOfCols=="" || noOfRows==""){
            swal.fire({
                title:'Please Enter Field',
                icon:'error'
            })
        }
        else if(noOfCols>200 || noOfRows>200){
            swal.fire({
                title:'You can only generate table of 200 rows and columns',
                icon:'warning'
            })

        }
        else{

            $('#createTable').append($('<table>').addClass('table'))
            for(i=0;i<noOfRows;i++){
                $('table').append('<tr>')
            }
            for(j=0;j<noOfCols;j++){
                $('tr').append($('<td>').text(`Col ${j+1}`))
            }
        }

    })
})

