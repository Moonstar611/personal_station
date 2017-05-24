/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    
    $("#randombutton").on("click", function () {
        
        $("#frame").attr("src", "https://en.wikipedia.org/wiki/Special:Random");
    });
    $("#fullpagebutton").on("click", function () {
        
        var url = $("#frame").attr("src");
        window.open(url);
    });
    $("#searchbutton").on("click", function () {
        if(document.getElementById("keywords").value===""){
            window.alert("Please specify kerwords for search");
        }else{
            search();
        }
    });
    $("#clearbutton").on("click", function () {
        document.getElementById("keywords").value = "";
    });

});


function effect() {
    $("#item1").animate({
        opacity: 0.8
    }, 250, function () {
        $("#item2").animate({
            opacity: 0.8
        }, 250, function () {
            $("#item3").animate({
                opacity: 0.8
            }, 250, function () {
                $("#item4").animate({
                    opacity: 0.8
                }, 250, function () {
                    $("#item5").animate({
                        opacity: 0.8
                    }, 250, function () {
                        $("#item6").animate({
                            opacity: 0.8
                        }, 250, function () {
                            $("#item7").animate({
                                opacity: 0.8
                            }, 250, function () {
                                $("#item8").animate({
                                    opacity: 0.8
                                }, 250, function () {
                                    $("#item9").animate({
                                        opacity: 0.8
                                    }, 250, function () {
                                        $("#item10").animate({
                                            opacity: 0.8
                                        }, 250);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
function setAnchors() {
        $("#a1").on("click", function () {
            var url = $("#a1").attr("href");
            $("#frame").attr("src", url);
        });
        $("#a2").on("click", function () {
            var url = $("#a2").attr("href");
            $("#frame").attr("src", url);
        });
        $("#a3").on("click", function () {
            var url = $("#a3").attr("href");
            $("#frame").attr("src", url);
        });
        $("#a4").on("click", function () {
            var url = $("#a4").attr("href");
            $("#frame").attr("src", url);
        });
        $("#a5").on("click", function () {
            var url = $("#a5").attr("href");
            $("#frame").attr("src", url);
        });
        $("#a6").on("click", function () {
            var url = $("#a6").attr("href");
            $("#frame").attr("src", url);
        });
        $("#a7").on("click", function () {
            var url = $("#a7").attr("href");
            $("#frame").attr("src", url);
        });
        $("#a8").on("click", function () {
            var url = $("#a8").attr("href");
            $("#frame").attr("src", url);
        });
        $("#a9").on("click", function () {
            var url = $("#a9").attr("href");
            $("#frame").attr("src", url);
        });
        $("#a10").on("click", function () {
            var url = $("#a10").attr("href");
            $("#frame").attr("src", url);
        });
    }
function search() {
    var anchorNum = 1;
    var keywords = document.getElementById("keywords").value;
    var api = "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrnamespace=0&gsrsearch=";
    var cb = "&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&format=json&callback=?";
    var page = "https://en.wikipedia.org/?curid=";
    var apiurl = api + keywords + cb;
    var str = "";
   
    $.ajax({
        cache: false,
        type: "GET",
        async: false,
        dataType: "json",
        //url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=5&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=remediation",
        //url:"https://en.wikipedia.org/w/api.php?action=opensearch&search=remediation&format=json&callback=?",
        //url:"https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrnamespace=0&gsrsearch=remediation&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&format=json&callback=?",
        url: apiurl,
        success: function (response) {
            var results = Object.values(response.query.pages);
            //window.alert("results");
            results.forEach(function (v) {
                var title = v.title;
                var body = v.extract;
                var address = page + v.pageid;
                str = str + "<a class='anchor' href='" + address + "' target='screen' id='a" + anchorNum + "'><div class='item' id='item" + anchorNum + "'><h5 class='itemtitle' id='title" + anchorNum + "'>" + title + "</h5><p class='itembody' id='body" + anchorNum + "'>" + body + "</p></div></a>";

                anchorNum++;
                if (anchorNum >= 11) {
                    $("#list").html(str);
                    effect();
                    setAnchors();
                }
            });

        }


    });
}



