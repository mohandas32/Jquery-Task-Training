$(document).ready( function(){
    $('#loadApiDataBtn').click( function(){
       $('#loading').show(); //display loading
       //we can also use getJSON() method to fetch the API data, it will get the data in JSON format
       $.getJSON("https://api.publicapis.org/entries", function(apiData){  

           $('#displayArea, #heading').show()      
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

       }).done( function(){

                $('#loading').hide() //hide loading
                 swal.fire({
                       title: "API Data Fetched Successfully...",
                       icon: 'success',
                       button: "OK",
                       allowOutsideClick:false //user can't click outside the pop up
                           })

       }).fail( function(){
                 $('#loading').hide();
              swal.fire({
                    title: `Error While Fetching Data...`,
                    icon: 'error',
                    button: "OK",
                    allowOutsideClick:false //user can't click outside the pop up
                      })
       })
    })
})
