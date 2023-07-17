$(document).ready(function () {
    $(document).keydown(function (e) {  
        return e.keyCode != 116;  
    }); 
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
            startTimeout();            
        });
        
        var time;
        var sec=60;
        
        //function for display the timer on screen
        function showTimer(){
            $('body').css('background-color','lightblue')
            if(sec==0){
                clearInterval(time) //clear the interval
                $('.container').fadeOut(1500);
                swal.fire({
                    title: "Times Up! Click ok to continue",
                    icon: 'warning',
                    button: "OK",
                    allowOutsideClick:false //user can't click outside the pop up
                  }).then( (val) =>{
                        if(val){
                            $('.container').fadeIn(1000);
                            sec=60;
                            startTimeout();
                        }
                  });
                }
                if(sec>=30 && sec <50)
                    $('body').css('background-color','oldlace')
                if(sec>10 && sec <30)
                    $('body').css('background-color','lightblue')
                if(sec>=60){
                    $('#timer').html(`<h3>TIME LEFT: 00:01:00</h3>`)
                }
                else if(sec<10){
                    $('#timer').html(`<h3>TIME LEFT: 00:00:0${sec}</h3>`)
                    $('body').css('background-color','#FFD898')
                }
                else{
                    $('#timer').html(`<h3>TIME LEFT: 00:00:${sec}</h3>`)    
                }
            }
         
    //function for start the timer
    function startTimeout(){
                time= setInterval(function(){
                    showTimer(); //calling this function every 1 sec
                    sec--;
                },1000)
    }
    