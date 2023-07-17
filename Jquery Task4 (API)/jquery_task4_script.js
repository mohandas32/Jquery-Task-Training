$(document).ready( function(){
    $('#loadApiDataBtn').click( function(){
       $('#loading').show(); //display loading
       $.ajax(
            {
            type:'GET',
            url: "https://api.publicapis.org/entries",
            //if the data fetched successfully
             success: function(apiData){
                $('#displayArea, #heading').show()  //hide loading          
                $("#recordTable tbody").html('')
                    for(let i=0;i<apiData.entries.length;i++){        
                        $("#recordTable tbody").append($('<tr>')
                                                .append($('<td>').text(i+1))
                                                .append($('<td>').text(`${apiData.entries[i]['API']}`))
                                                .append($('<td>').text(`${apiData.entries[i]['Description']}`))
                                                .append($('<td>').text(`${apiData.entries[i]['Auth']}`))
                                                .append($('<td>').text(`${apiData.entries[i]['Cors']}`))
                                                .append($('<td>').html(`<a href="${apiData.entries[i]['Link']}" target="_blank" title="Go To Link">${apiData.entries[i]['Link']}</a>`))
                                                .append($('<td>').text(`${apiData.entries[i]['Category']}`)) )
                    }
                $('#loading').hide() //hide loading
                    swal.fire({
                        title: "API Data Fetched Successfully...",
                        icon: 'success',
                        button: "OK",
                        allowOutsideClick:false //user can't click outside the pop up
                            })
            },
            //if any error occur then this code run
             error:function(){
                $('#loading').hide();
                swal.fire({
                    title: `Error While Fetching Data...`,
                    icon: 'error',
                    button: "OK",
                    allowOutsideClick:false //user can't click outside the pop up
                  })
             },
    });
    })
})
