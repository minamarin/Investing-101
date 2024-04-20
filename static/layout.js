


$(document).ready(function(){


    $(".form-inline").submit(function(event){
        event.preventDefault();

        console.log("search")
        
        // console.log(event)

        let keyword = $(".form-inline > input").val().trim()
        console.log(keyword)
        if(keyword.length == 0){
            $(".form-inline > input").val("")
            $(".form-inline > input").focus()
            return
        }


        // window.location.replace("http://www.google.com");
        window.location.replace("http://localhost:5000/search_results/" + keyword);
        // let data_to_send = {"keyword": keyword}

        // $.ajax({
        //     type: "POST",
        //     url: "http://localhost:5000/search_results",                
        //     dataType : "json",
        //     contentType: "application/json; charset=utf-8",
        //     data : JSON.stringify(data_to_send),
        //     success: function(result){
        //         // console.log(result["search_list"])

        //         // kw = result["keyword"]
        //         // console.log(kw)
        //         console.log("display template")
        //     },
        //     error: function(request, status, error){
        //         console.log("Error");
        //         console.log(request)
        //         console.log(status)
        //         console.log(error)
        //     }
        // });


    })


    $('.btn-default').hover(
        function(){
            console.log('enter')
            // $('#search').attr('background-color','#595218 !important')
            // $('#search').attr('color', 'white')
            $(this).removeClass('btn-leave')
            $(this).addClass('btn-over')
        },
        function(){
            console.log('leave')
            $(this).removeClass('btn-over')
            $(this).addClass('btn-leave')
        }
    )
})