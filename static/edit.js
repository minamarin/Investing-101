


$(document).ready(function(){

    $(".btn-add").click(function(){

        // get current length
        let index = $(".author-group").children().length

        let newEntry = $("<div class=inline>")
        newEntry.attr("id", "author-div-" + index)

        let newInput = $("<input name=author>")
        newInput.attr("id","add-author-" + index)

        newEntry.append(newInput)
        $(".author-group").append(newEntry)
    })

    $("#dialog").dialog({
        autoOpen: false
    })

    $("#add-discard").click(function(event){

        event.preventDefault();
        // alert("Are you sure to discard the changes?")
        $("#dialog").dialog("open")

    })

    $("#discard-no").click(function(){

        $("#dialog").dialog("close")
    })


    $("#discard-yes").click(function(){

        let pathname = window.location.pathname
        // console.log(pathname)
        console.log(pathname.substring(6))
        let id = pathname.substring(6)
        window.location.replace("http://localhost:5000/view/" + pathname.substring(6));
    })

    $("#add-submit").click(function(event){

        // event.preventDefault();

        let pathname = window.location.pathname
        // console.log(pathname)
        // console.log(pathname.substring(6))
        let id = pathname.substring(6)
        // window.location.replace("http://localhost:5000/edit/" + pathname.substring(6));


        // console.log("On Click1.")

        let data = $('#edit-form').serializeArray()
        console.log(data)

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
                    event.preventDefault();
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
                    event.preventDefault();
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
                    event.preventDefault();
                    return 
                }

                publisher = value["value"].trim()
                
            } else if (value["name"] === "published-date") {
                // console.log(value["value"])

                let pos = $("#published-date-div")

                if(value["value"].trim() === ""){
                    addAlert(pos, "Published Date cannot be empty!")
                    $("#add-published-date").focus()
                    event.preventDefault();
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
                    event.preventDefault();
                    return 
                }

                image_link = value["value"].trim()

            } else if (value["name"] === "description") {
                // console.log(value["value"])
                let pos = $("#description-div")

                if(value["value"].trim() === ""){
                    addAlert(pos, "Description cannot be empty!")
                    $("#add-description").focus()
                    event.preventDefault();
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
                    event.preventDefault();
                    return 
                }

                if(isNaN(value["value"].trim())){
                    addAlert(pos, "ISBN Must Be a Number!")
                    $("#add-isbn-" + isbn_index).focus()
                    event.preventDefault();
                    return 
                }

                isbn.push(value["value"].trim())

            } else if (value["name"] === "length") {
                // console.log(value["value"])

                let pos = $("#length-div")

                if(value["value"].trim() === ""){
                    addAlert(pos, "Length cannot be empty!")
                    $("#add-length").focus()
                    event.preventDefault();
                    return 
                }

                
                if(isNaN(value["value"].trim())){
                    addAlert(pos, "Length Must Be a Number!")
                    $("#add-length").focus()
                    event.preventDefault();
                    return 
                }
                length = value["value"].trim()
            }

            
        }


        // clean all error
        $(".alert").remove()


        // redirect
        // window.location.href = "http://localhost:5000/add_item"


        // window.location.href = "http://localhost:5000/view/" + id


        // // send add request
        // let obj = {}
        // obj.volumeInfo = {}
        // obj.volumeInfo.title = title
        // obj.volumeInfo.authors = authors
        // obj.volumeInfo.publisher = publisher
        // obj.volumeInfo.publishedDate = published_date
        // obj.volumeInfo.description = description
        // obj.volumeInfo.industryIdentifiers = [
        //     {
        //         "type": "ISBN_10",
        //         "identifier": isbn[0]
        //     },
        //     {
        //         "type": "ISBN_13",
        //         "identifier": isbn[1]
        //     }
        // ]
        // obj.volumeInfo.pageCount = length
        // obj.volumeInfo.imageLinks = {
        //     "thumbnail": image_link
        // }


  

    })
})




function addAlert(pos, message) {


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