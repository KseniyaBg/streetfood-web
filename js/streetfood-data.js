$(document).ready(function () {
    $.getJSON("result_streetfood.json", function(foods) {
        $.each(foods, function(index, data) {
            var food = data[0];
            var element = $("" +
                "<div class='streetfood'>" +
                "   <a href='streetfood.html'>" +
                "       <img src='" + food['image']['source'] + "'>" +
                "       <div class='text1'>" + food['name'] + "</div>" +
                "   </a>" +
                "</div>");

            $("#streetfoods").append(element);
        });
    });
});