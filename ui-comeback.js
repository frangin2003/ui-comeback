$(function() {
  
  var comeback = function() {
      this.tXAndtYs = function(selector, duration, callback) {
    var $selector = $(selector);
    var offset = $selector.offset().top - $selector.next().offset().top;
    $selector.velocity({
      p: {translateX: $selector.width() + "px", opacity: 0},
      o: { duration: duration, visibility: "hidden",complete: callback } }).nextAll().each(function() {
      $(this).velocity({
        p: {translateY: offset + "px"},
        o: { duration: duration }
      });
    });
  };

    this.scaleAndtYs = function(selector, duration, callback) {
    var $selector = $(selector);
    var offset = $selector.offset().top - $selector.next().offset().top;
    $selector.velocity({
      p: {scaleX: 0, scaleY: 0},
      o: { duration: duration, visibility: "hidden",complete: callback } }).nextAll().each(function() {
      $(this).velocity({
        p: {translateY: offset + "px"},
        o: { duration: duration }
      });
    });
  };
  };
});
