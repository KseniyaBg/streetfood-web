$(document).ready(function () {
    $.getJSON("result_streetfood.json", function(data) {
        $.each(data.foods, function(index, food) {
            var element = $("" +
                "<div class='streetfood'>" +
                "   <a href='streetfood.html?food=" + food['name'] + "'>" +
                "       <img src='" + food['image']['source'] + "' class='img'>" +
                "       <div class='text1'>" + decodeURIComponent(food['name']) + "</div>" +
                "   </a>" +
                "</div>");

            $("#streetfoods").append(element);
        });
    });
});