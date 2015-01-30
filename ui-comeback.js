(function($) {
    "use strict";
    /*global document, window, jQuery, console */

    if (window.UiComeback !== undefined) {
        return;
    }

    var uiComeback = {

        tXAndtYs : function(args) {
            args = $.extend(args, $.fn.uiComeback.defaults);
            var duration = args.duration, offset = $(this).offset().top - $(this).next().offset().top;
            $(this).velocity({
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
            var duration = args.duration, offset = $(this).offset().top - $(this).next().offset().top;
            $(this).velocity({
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
            uiComeback, method, value,
            allowedMethods = [
                "val", "destroy", "opened", "open", "close", "focus", 
                "isFocused", "container", "dropdown", "onSortStart", "onSortEnd", 
                "enable", "disable", "readonly", "positionDropdown", 
                "data", "search"];

        this.each(function () {
            if (typeof(args[0]) === "string") {

                if (indexOf(args[0], allowedMethods) < 0) {
                    throw "Unknown method: " + args[0];
                }

                value = undefined;

                method=args[0];

                value = uiComeback[method].apply(uiComeback, args.slice(1));

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
