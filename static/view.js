

$(document).ready(function(){


    $("#btn-edit").click(function(){
        let pathname = window.location.pathname;
        let id = pathname.substring(6);
        window.location.href = "/edit/" + id;
    });

    // $("#btn-edit").click(function(){
        
    //     let pathname = window.location.pathname
    //     // console.log(pathname)
    //     // console.log(pathname.substring(6))
    //     let id = pathname.substring(6)
    //     // window.location.replace("http://localhost:5000/edit/" + pathname.substring(6));
        
    //     let data_to_send = {"id": id}

    //     $.ajax({
    //         type: "POST",
    //         url: "http://localhost:5000/edit/" + id,                
    //         dataType : "json",
    //         contentType: "application/json; charset=utf-8",
    //         data : JSON.stringify(data_to_send),
    //         success: function(){

    //         },
    //         error: function(request, status, error){
    //             console.log("Error");
    //             console.log(request)
    //             console.log(status)
    //             console.log(error)
    //         }
    //     });
    // })


    $('.third-search').click(function(){


        console.log("author clicked.")
        
        
        console.log($(this).text())

        $('#keyword').val($(this).text())

        $('#search').trigger('click')
    })


    $('.third-search').hover(
        function(){
            $(this).addClass('pointer')
        },
        function(){
            $(this).removeClass('pointer')
        }
    )
})