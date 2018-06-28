
$(document).ready(function(){
    var topics = ["Wiz Khalifa", "Meek Mill", "Lil Wayne", "Rick Ross", "Chevy Woods", "French Montana"];
    var apiKey = "Ol4MVWEIY6xzBicUCeSYwdWGcpSaEz6W";
    var limit = 9;

    $("#showBTN").empty();
    for (var i = 0; i < topics.length; i++) {
        var tempBTN = $("<button>" + topics[i] + "</button>");
        tempBTN.css("float", "left");
        tempBTN.attr("class", "gifs btn btn-success");
        tempBTN.attr("id", topics[i])
        tempBTN.appendTo('#showBTN');
    }

$("body").on("click", ".gifs", function (e) {
    console.log(1);
    // e.stopPropagation();
    $("#showGIF").empty();

    var whichTopic = $(this).attr("id");
    var queryURL = encodeURI("http://api.giphy.com/v1/gifs/search?q=" + whichTopic + "&api_key=" + apiKey + "&limit=" + limit);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        for (var i = 0; i < response.data.length; i++) {
            tempIMG = $("<img>");
            tempIMG.attr("src", response.data[i].images.fixed_height_still.url);
            tempIMG.attr("class", "gif");
            tempIMG.attr("data-state", "still");
            tempIMG.attr("data-animate", response.data[i].images.fixed_height.url);
            tempIMG.attr("data-still", response.data[i].images.fixed_height_still.url);
            tempIMG.appendTo("#showGIF");
        }
        $(".gif").on("click", function () {

            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });

});
$("#addGIF").on("click", function () {

    var tempVAL = $("#addIN").val();
    topics.push(tempVAL);
    
    $("#showBTN").empty();
    for (var i = 0; i < topics.length; i++) {
        var tempBTN = $("<button>" + topics[i] + "</button>");
        tempBTN.css("float", "left");
        tempBTN.attr("class", "gifs btn btn-success");
        tempBTN.attr("id", topics[i])
        tempBTN.appendTo('#showBTN');
    }

});


// init();
// function init() {
    // console.log("1");

// }
});
