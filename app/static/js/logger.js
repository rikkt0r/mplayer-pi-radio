var logger = (function($){
    var $handler = $('h3.logger');

    function log(msg) {
        $handler.html(msg);
    }

    return {
        'log': log
    }
})(jQuery);