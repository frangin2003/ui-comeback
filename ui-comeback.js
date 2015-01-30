(function($) {
    "use strict";
    /*global document, window, jQuery, console */

    if (window.UiComeback !== undefined) {
        return;
    }

    function indexOf(value, array) {
        var i = 0, l = array.length;
        for (; i < l; i = i + 1) {
            if (equal(value, array[i])) return i;
        }
        return -1;
    };
    
        /**
     * Compares equality of a and b
     * @param a
     * @param b
     */
    function equal(a, b) {
        if (a === b) return true;
        if (a === undefined || b === undefined) return false;
        if (a === null || b === null) return false;
        // Check whether 'a' or 'b' is a string (primitive or object).
        // The concatenation of an empty string (+'') converts its argument to a string's primitive.
        if (a.constructor === String) return a+'' === b+''; // a+'' - in case 'a' is a String object
        if (b.constructor === String) return b+'' === a+''; // b+'' - in case 'b' is a String object
        return false;
    };

    window.UiComeback = {

        tXAndtYs : function(args) {
            args = $.extend(args, $.fn.uiComeback.defaults);
            var duration = args.duration, offset = args.element.offset().top - args.element.next().offset().top;
            args.element.velocity({
                p: {translateX: $(this).width() + "px", opacity: 0},
                o: { duration: duration, visibility: "hidden",
                    complete: args.complete } }).nextAll().each(function() {
                    $(this).velocity({
                        p: {translateY: offset + "px"},
                        o: { duration: duration }
                    });
            });
        },

        scaleAndtYs : function(args) {
            args = $.extend(args, $.fn.uiComeback.defaults);
            var duration = args.duration, offset = args.element.offset().top - args.element.next().offset().top;
            args.element.velocity({
                p: {scaleX: 0, scaleY: 0, opacity: 0},
                o: { duration: duration, visibility: "hidden",
                    complete: args.complete } }).nextAll().each(function() {
                    $(this).velocity({
                        p: {translateY: offset + "px"},
                        o: { duration: duration }
                    });
            });
        }
    };
    
    $.fn.uiComeback = function () {

        var args = Array.prototype.slice.call(arguments, 0),
            opts,
            method, value,
            allowedMethods = [
                "tXAndtYs", "scaleAndtYs"];
                
        args.element = $(this);

        this.each(function () {
            if (typeof(args[0]) === "string") {

                if (indexOf(args[0], allowedMethods) < 0) {
                    throw "Unknown method: " + args[0];
                }

                value = undefined;

                method=args[0];

                value = UiComeback[method].apply(UiComeback, args.slice(1));

                if (indexOf(args[0], valueMethods) >= 0
                    || (indexOf(args[0], propertyMethods) && args.length == 1)) {
                    return false; // abort the iteration, ready to return first matched value
                }
            } else {
                throw "Invalid arguments to ui-comeback plugin: " + args;
            }
        });
        return (value === undefined) ? this : value;
    };

    // plugin defaults, accessible to users
    $.fn.uiComeback.defaults = {
        duration: 1000
    };

    // exports
    /*
    window.UiComeback = {
        query: {
        }, util: {
        }, "class": {
        }
    };
    */
})(jQuery);
