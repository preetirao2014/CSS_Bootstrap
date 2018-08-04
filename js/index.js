var response;
var linkorderdata;
var change = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

$(window).load(function() {
    $("#up1").mouseover(function() {
        var arrow = $(this);
        arrow.attr("src", "images/up_hover.png");
    });
    $("#up1").mouseout(function() {
        var arrow = $(this);
        arrow.attr("src", "images/up.png");
    });
    $("#down1").mouseover(function() {
        var arrow = $(this);
        arrow.attr("src", "images/down_hover.png");
    });
    $("#down1").mouseout(function() {
        var arrow = $(this);
        arrow.attr("src", "images/down.png");
    });
    $("#up2").mouseover(function() {
        var arrow = $(this);
        arrow.attr("src", "images/up_hover.png");
    });
    $("#up2").mouseout(function() {
        var arrow = $(this);
        arrow.attr("src", "images/up.png");
    });
    $("#down2").mouseover(function() {
        var arrow = $(this);
        arrow.attr("src", "images/down_hover.png");
    });
    $("#down2").mouseout(function() {
        var arrow = $(this);
        arrow.attr("src", "images/down.png");
    });
    $("#up3").mouseover(function() {
        var arrow = $(this);
        arrow.attr("src", "images/up_hover.png");
    });
    $("#up3").mouseout(function() {
        var arrow = $(this);
        arrow.attr("src", "images/up.png");
    });
    $("#down3").mouseover(function() {
        var arrow = $(this);
        arrow.attr("src", "images/down_hover.png");
    });
    $("#down3").mouseout(function() {
        var arrow = $(this);
        arrow.attr("src", "images/down.png");
    });
    $("#up4").mouseover(function() {
        var arrow = $(this);
        arrow.attr("src", "images/up_hover.png");
    });
    $("#up4").mouseout(function() {
        var arrow = $(this);
        arrow.attr("src", "images/up.png");
    });
    $("#down4").mouseover(function() {
        var arrow = $(this);
        arrow.attr("src", "images/down_hover.png");
    });
    $("#down4").mouseout(function() {
        var arrow = $(this);
        arrow.attr("src", "images/down.png");
    });
    $("#up5").mouseover(function() {
        var arrow = $(this);
        arrow.attr("src", "images/up_hover.png");
    });
    $("#up5").mouseout(function() {
        var arrow = $(this);
        arrow.attr("src", "images/up.png");
    });
    $("#down5").mouseover(function() {
        var arrow = $(this);
        arrow.attr("src", "images/down_hover.png");
    });
    $("#down5").mouseout(function() {
        var arrow = $(this);
        arrow.attr("src", "images/down.png");
    });
    $('#organizations_img').hide();
    $("#organizations ul li:nth-child(1) span").mouseover(function() {
        $("#organizations_img").attr("src", "images/1.png");
        $('#organizations_img').fadeIn(1000);
    });

    $("#organizations ul li:nth-child(2) span").mouseover(function() {
        $("#organizations_img").attr("src", "images/2.jpg");
        $('#organizations_img').fadeIn(1000);
    });

    $("#organizations ul li:nth-child(3) span").mouseover(function() {
        $("#organizations_img").attr("src", "images/3.png");
        $('#organizations_img').fadeIn(1000);
    });

    $("#organizations ul li:nth-child(4) span").mouseover(function() {
        $("#organizations_img").attr("src", "images/4.png");
        $('#organizations_img').fadeIn(1000);
    });

    $("#organizations ul li:nth-child(5) span").mouseover(function() {
        $("#organizations_img").attr("src", "images/5.jpg");
        $('#organizations_img').fadeIn(1000);
    });

    $("#organizations ul li:nth-child(6) span").mouseover(function() {
        $("#organizations_img").attr("src", "images/6.png");
        $('#organizations_img').fadeIn(1000);
    });

    $("#organizations span").mouseout(function() {
        $("#organizations_img").attr("src", "");
        $('#organizations_img').hide();
    });

    $("#settings_icon").mouseover(function() {
        $("#settings_icon").attr("src", "images/gear_h.png");
    });

    $("#settings_icon").mouseout(function() {
        $("#settings_icon").attr("src", "images/gear.png");
    });

    $("#the_list").sortable({
        items: "tr",
        helper: fixWidthHelper,
        update: function() {
            change = [];
            linkorderdata = '&' + $("#the_list").sortable('serialize');
            $.each(linkorderdata.split("&t[]="), function(index, value) {
                change.push(parseInt(value));
            });
        }
    });
    $('#page1').hide();
    $("#done").click(function() {
        update(response);
        $("#page1").fadeIn(1000);
        $("#page2").hide();
    });
    $("#settings_icon").click(function() {
        $("#page1").hide();
        $("#page2").fadeIn(1000);
    });
});

$(document).ready(function() {
    $.ajax({
        url: 'js/tiles2.json',
        dataType: 'json',
        success: update,
        error: function(error) {
            console.log("NO");
        }
    });
    console.log("LOADED");
});

function update(data) {
    response = data;
    var new2 = data.Tiles.sort(function(a, b) {
        return a.DisplayOrder - b.DisplayOrder;
    });
    var out = "";
    var pagetwolist = "";
    $.each(change, function(index1, value1) {
        $.each(response.Tiles, function(index, value) {
            if (value.DisplayOrder == value1) {
                var order = value.DisplayOrder;
                if (value.TileProperties.HomeTileStatus == true) {
                    out += "<div  style='padding:0' class='col-sm-3 col-xs-6'><img class='img-responsive center-block' src='" +
                        value.TileProperties.HomeURL +
                        "'><p class='table_p'>" +
                        value.Caption +
                        "</p></div>";
                    pagetwolist += "<tr class='the_list_tr' id='t_" + order + "'> <td class='check' onClick='choose(" + order + ")'> <td class='content'>" + value.Caption + "</td><td class='drag'></td></tr>";
                } else {
                    pagetwolist += "<tr class='the_list_tr' id='t_" + order + "'> <td class='empty' onClick='choose(" + order + ")'> <td class='content'>" + value.Caption + "</td><td class='drag'></td></tr>";
                };
            };
        });
    });

    document.getElementById("img_table").innerHTML = out;
    document.getElementById("the_list").innerHTML = pagetwolist;
}

function choose(id) {
    var selector = "#t_" + id + " td:first-child";
    var className = $(selector).attr('class');
    if (className == "check") {
        $(selector).addClass("empty").removeClass("check");
        $.each(response.Tiles, function(index, value) {
            if (value.DisplayOrder == id) {
                value.TileProperties.HomeTileStatus = false;
            }
        });
    } else if (className == "empty") {
        $(selector).addClass("check").removeClass("empty");
        $.each(response.Tiles, function(index, value) {
            if (value.DisplayOrder == id) {
                value.TileProperties.HomeTileStatus = true;
            }
        });
    }

}

function fixWidthHelper(e, ui) {
    ui.children().each(function() {
        $(this).width($(this).width());
        $(this).height($(this).height());
    });
    return ui;
}
