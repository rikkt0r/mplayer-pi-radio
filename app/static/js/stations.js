var Stations = (function($, window, logger, undefined){

    var active = "nothing...";

    function __stopButtonOnClick() {
        $.ajax({
            method: "POST",
            url: "/radio/stop/",
            data: {}
        }).done(function( data ) {
            logger.log("Now playing: nothing...")
            active = "nothing...";
        });
    }

    function __stationsDivOnClick(e) {
        // $(this).text()
        // $(this).attr('data-url')

        var _this = $(this);

        if(!_this.hasClass('active')) {

            $.ajax({
                method: "POST",
                url: "/radio/play/",
                data: { name: _this.text() }
            }).done(function( data ) {

                if (data.error !== undefined){
                    logger.log(data.error);
                } else {
                    logger.log('Now playing: ' + _this.text());
                    $('#stations').find('div').each(function(){
                        $(this).removeClass('active');
                    });
                    _this.addClass('active');
                    active = _this.text();
                }

            });
        }
        e.preventDefault();
    }


    function registerEvents() {
        $('#stations').find('div').click(__stationsDivOnClick);
        $('#btn-stop').click(__stopButtonOnClick);
    }

    function registerIntervals(){
        window.setInterval(function(){
            $.ajax({
                method: "GET",
                url: "/radio/active/",
                data: {}
            }).done(function( data ) {
                if(data.active != active) {
                    logger.log('Now playing: ' + data.active);
                }
            });
        }, 6000);

        window.setInterval(function() {
            $('h3.logger').toggleClass('anim');
        }, 1010);
    }

    return {
        registerEvents: registerEvents,
        registerIntervals: registerIntervals
    };

})(jQuery, window, logger, undefined);