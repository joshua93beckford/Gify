
$(document).ready(function () {
    var topics = [
        {
            catName: "Animals",
            topicItems: ["Dog", "Cat", "Fish", "Frog", "Whale", "Shark", "Rhino", "Lion", "Bird", "Ferret"]
        }, {
            catName: "Cars",
            topicItems: ["BMW", "Mercedes Benz", "Audi", "Subaru", "Honda", "Lamborghini", "Bently", "Kia", "Jeep", "Chevorlet"]
        },
        {
            catName: "Coutniries",
            topicItems: ["Canada", "United States", "Cuba", "Russia", "China", "Mexico", "Brazil", "France", "Spain", "Germany"]
        },
        {
            catName: "Drinks",
            topicItems: ["Coca Cola", "Pepsi", "Root Beer", "Sprite", "Beer", "Wine", "Orange Juice", "Apple Juice", "Cream Soda"]
        },
        {
            catName: "Rappers",
            topicItems: ["Wiz Khalifa", "Meek Mill", "Lil Wayne", "Rick Ross", "Chevy Woods", "French Montana", "50 Cent", "Snoop Dogg", "Cardi B", "Eminem", "Tupac Shakur", "Biggie Smalls", "Gucci Maine"]
        },
        {
            catName: "TV Shows",
            topicItems: ["Rick And Morty", "Silicon Valley", "Stranger Things", "Impratical Jokers", "Family Guy", "American Dad", "South Park"]
        }
    ];

    var apiKey = "Ol4MVWEIY6xzBicUCeSYwdWGcpSaEz6W";
    var limit = 9;
    var tempARR = new Array();

    function initCAT() {


        $("#showCAT").empty();
        tempARR = new Array();
        for (var i = 0; i < topics.length; i++) {
            tempARR.push(topics[i].catName);
        }
        for (var i = 0; i < topics.length; i++) {
            var tempBTN = $("<button>" + topics[i].catName + "</button>");
            tempBTN.css("float", "left");
            tempBTN.attr("class", "cats btn btn-primary");
            tempBTN.attr("id", i);
            tempBTN.attr("category", topics[i].catName);
            tempBTN.appendTo('#showCAT');
        }
    }

    function init(val) {

        $("#showBTN").empty();
        currentV = topics[val].topicItems.sort();

        for (var i = 0; i < topics[val].topicItems.length; i++) {
            var tempBTN = $("<button>" + topics[val].topicItems[i] + "</button>");
            tempBTN.css("float", "left");
            tempBTN.attr("class", "gifs btn btn-success");
            tempBTN.attr("id", topics[val].topicItems[i]);
            tempBTN.attr("num", topics[val].topicItems[i]);
            tempBTN.appendTo('#showBTN');
        }
    }

    $("body").on("click", ".cats", function () {
        var cat = $(this).attr("category");
        $("#addGIF").attr("category", cat);
        var v = $(this).attr("id");
        init(v);
    });

    $("body").on("click", ".gifs", function () {

        $("#showGIF").empty();

        var whichTopic = $(this).attr("id");
        var queryURL = encodeURI("https://api.giphy.com/v1/gifs/search?q=" + whichTopic + "&api_key=" + apiKey + "&limit=" + limit);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (var i = 0; i < response.data.length; i++) {
               
                tempD = $('<div class="con"></div>')
                tempR = $("<h1>").text("Rating: " + response.data[i].rating);
                tempR.appendTo(tempD);
                tempIMG = $("<img>");
                tempIMG.attr("src", response.data[i].images.fixed_height_still.url);
                tempIMG.attr("class", "gif");
                tempIMG.attr("data-state", "still");
                tempIMG.attr("data-animate", response.data[i].images.fixed_height.url);
                tempIMG.attr("data-still", response.data[i].images.fixed_height_still.url);
                tempIMG.appendTo(tempD);
                tempD.appendTo("#showGIF");
            }
        });
    });
    $("body").on("click", ".gif", function () {

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
    $("#addGIF").on("click", function () {

        var n = tempARR.indexOf($(this).attr("category"));
        var tempVAL = $("#addIN").val().trim();

        if (tempVAL !== "" && $(this).attr("category") != null && $.inArray(tempVAL, topics[n].topicItems) == -1) {
            topics[n].topicItems.push(tempVAL);
            init(n);
        }
    });

    $("#addCATBTN").on("click", function () {

        var tempCAT = $("#addCAT").val().trim();
        var tempVAL = {
            catName: tempCAT,
            topicItems: []
        };

        if (tempCAT !== "" && $.inArray(tempCAT, topics) == -1) {
            topics.push(tempVAL);

            initCAT();
        }
    });
    initCAT();
});
