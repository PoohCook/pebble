/**
 * Created by hunnytree on 3/26/17.
 */
$(document).on('ready', function() {




    $(".div2").click(function(){
        $.ajax({
            dataType: "json",
            type: "post",
            url: "AddUser",
            data: {name:"fool", profession:"me"},
            success: function (data) {
            }
        });
    });

    $(".div1").click(function(){
        $.ajax({
            dataType: "json",
            url: "ListUsers",
            data: null,
            success: function(data){
                var items = [];
                $.each( data, function( key, val ) {
                    items.push( "<li id='" + key + "'>" + val.name + "</li>" );
                });

                $( "<ul/>", {
                    "class": "my-new-list",
                    html: items.join( "" )
                }).appendTo( "body" );
            }
        });
    });

});
