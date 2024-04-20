

$(document).ready(function(){

    $(".btn-add").click(function(){

        // get current length
        let index = $(".author-group").children().length

        //<input id="add-author" name="author"></input>
        let newEntry = $("<div class=inline>")
        newEntry.attr("id", "author-div-" + index)

        let newInput = $("<input name=author>")
        newInput.attr("id","add-author-" + index)

        newEntry.append(newInput)
        $(".author-group").append(newEntry)
    })

    $("#add-submit").click(function(event){

        event.preventDefault();

        // console.log("On Click1.")

        let data = $('#add-form').serializeArray()
        // console.log(data)

        let title
        let authors = []
        let publisher
        let published_date
        let image_link
        let description
        let isbn = []
        let length

        let isbn_index = 0
        // note: check validation
        for(let i = 0; i < data.length; i++){

            let index = i
            let value = data[i]

            if (value["name"] === "title") {
                // console.log("title value is: " + value["value"])

                let pos = $("#title-div")

                if(value["value"].trim() === ""){
                    addAlert(pos, "Title cannot be empty!")
                    $("#add-title").focus()
                    return 
                }

                // removeAlert(pos)
                title = value["value"].trim()

            } else if (value["name"] === "author") {
                
                // console.log("author value is: " + value["value"] + "index is: " + index)
                let pos = $("#author-div-" + index)

                if(value["value"].trim() === ""){
                    addAlert(pos, "Author cannot be empty!")
                    $("#add-author-" + index).focus()
                    return
                }

                // removeAlert(pos)
                authors.push(value["value"].trim())

            } else if (value["name"] === "publisher") {
                // console.log(value["value"])

                let pos = $("#publisher-div")

                if(value["value"].trim() === ""){
                    addAlert(pos, "Publisher cannot be empty!")
                    $("#add-publisher").focus()
                    return 
                }

                publisher = value["value"].trim()
                
            } else if (value["name"] === "published-date") {
                // console.log(value["value"])

                let pos = $("#published-date-div")

                if(value["value"].trim() === ""){
                    addAlert(pos, "Published Date cannot be empty!")
                    $("#add-published-date").focus()
                    return 
                }

                // todo: date must be valid

                published_date = value["value"].trim()

            } else if (value["name"] === "image-link") {
                // console.log(value["value"])
                let pos = $("#image-link-div")

                if(value["value"].trim() === ""){
                    addAlert(pos, "Image Link cannot be empty!")
                    $("#add-image-link").focus()
                    return 
                }

                image_link = value["value"].trim()

            } else if (value["name"] === "description") {
                // console.log(value["value"])
                let pos = $("#description-div")

                if(value["value"].trim() === ""){
                    addAlert(pos, "Description cannot be empty!")
                    $("#add-description").focus()
                    return 
                }

                description = value["value"].trim()

            } else if (value["name"] === "isbn") {
                console.log("isbn value is: " + value["value"])

                isbn_index++
                let pos = $("#isbn-div-" + isbn_index)

                if(value["value"].trim() === ""){
                    addAlert(pos, "ISBN number cannot be empty!")
                    $("#add-isbn-" + isbn_index).focus()
                    return 
                }

                if(isNaN(value["value"].trim())){
                    addAlert(pos, "ISBN Must Be a Number!")
                    $("#add-isbn-" + isbn_index).focus()
                    return 
                }

                isbn.push(value["value"].trim())

            } else if (value["name"] === "length") {
                // console.log(value["value"])

                let pos = $("#length-div")

                if(value["value"].trim() === ""){
                    addAlert(pos, "Length cannot be empty!")
                    $("#add-length").focus()
                    return 
                }

                
                if(isNaN(value["value"].trim())){
                    addAlert(pos, "Length Must Be a Number!")
                    $("#add-length").focus()
                    return 
                }
                length = value["value"].trim()
            }

            
        }
        // clean all error
        $(".alert").remove()

        // send add request
        let obj = {}
        obj.volumeInfo = {}
        obj.volumeInfo.title = title
        obj.volumeInfo.authors = authors
        obj.volumeInfo.publisher = publisher
        obj.volumeInfo.publishedDate = published_date
        obj.volumeInfo.description = description
        obj.volumeInfo.industryIdentifiers = [
            {
                "type": "ISBN_10",
                "identifier": isbn[0]
            },
            {
                "type": "ISBN_13",
                "identifier": isbn[1]
            }
        ]
        obj.volumeInfo.pageCount = length
        obj.volumeInfo.imageLinks = {
            "thumbnail": image_link
        }

        let data_to_send = {"new_book": obj}         
        $.ajax({
            type: "POST",
            url: "add_item",                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(data_to_send),
            success: function(result){
                // <div class="alert alert-success" role="alert">
                // A simple success alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
                // </div>
                let id = result["id"]

                console.log("add a item, id is " + id)
                
                let new_reminder = $("<div>")
                new_reminder.addClass("alert")
                new_reminder.addClass("alert-success")
                new_reminder.attr("role", "alert")
                new_reminder.append("New item successfully created.")
                
                let new_a = $("<a>")
                new_a.attr("href", "/view/" + id)
                new_a.text("See it here.")

                new_reminder.append(new_a)
                $("#reminder").append(new_reminder)
                // clear all the alert
                $("input").val("")
                $("textarea").val("")
                $("#add-title").focus()

                console.log("add finished")
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
  

    })
})


// function removeAlert(pos){

//     let l = $(pos).children().length
//     if(l === 1) {
//         // console.log("length = " + l + " don't add this time.");
//         return;
//     }

//     $(pos).children('div')[0].remove()
// }

function addAlert(pos, message) {

    // console.log($(pos))
    // todo: select the last element? 

    // clear all wrong status 
    $(".alert").remove()


    console.log("addAlert")

    let l = $(pos).children().length
    if(l > 1) {
        // console.log("length = " + l + " don't add this time.");
        return;
    }

    let alert = $("<div>")
    alert.addClass("alert")
    alert.addClass("alert-danger")
    alert.attr("role","alert")
    alert.text(message)
    $(pos).append(alert)

    
}