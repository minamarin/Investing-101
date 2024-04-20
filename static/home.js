

popular_items = [

    "1", "6","3"
]


function displayBooks(){

    console.log("display books")
    $.each(popular_items, function(index, value){

        // 
        let item = $("<div class=col-md-2 item>")
        item.addClass("item")
        let imga = $("<a>")
        imga.attr("href", "/view/" + value)
        let img = $("<img>")
        let title = $("<a class=big-title>")
        title.attr("href", "/view/" + value)

        let authordiv = $("<div>")
        // authordiv.attr('color','lightgrey')
        
        let data_to_send = {"id": value}

        $.ajax({
            type: "POST",
            url: "get_item",                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(data_to_send),
            success: function(result){
                // item.text(result["item"])
                img.attr("src", result["item"]["volumeInfo"]["imageLinks"]["thumbnail"])
                img.attr("alt", "book cover")
                title.text(result["item"]["volumeInfo"]["title"])
                authors = result["item"]["volumeInfo"]["authors"]

                $.each(authors, function(index, val){
                    let author = $("<a class=small-title>")
                    author.attr("href", "/view/" + value)
                    author.text(val)
                    authordiv.append(author)
                })

            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });

        // compose
        imga.append(img)
        item.append(imga)
        item.append(title)
        item.append(authordiv)

        $("#item-container").append(item)

    })

}

function search_result() {
    let keyword = $('#keyword').val(); // Assuming 'keyword' is the ID of your input field
    $.ajax({
        type: "GET",
        url: "/search_results/" + keyword,
        success: function(response) {
            // Assuming 'search.html' renders a list of items
            $('#item-container').html(response); // Display the response in an element with ID 'item-container'
        },
        error: function(request, status, error) {
            console.log("Error");
            console.log(request);
            console.log(status);
            console.log(error);
        }
    });
}

$(document).ready(function(){

    displayBooks()

})