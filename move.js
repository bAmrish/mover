$(function(){
  
  var currentCords = null;

  $('.moveable').mousedown(function(event){
    $(event.target).addClass('moving');
    currentCords = {l: event.pageX, t: event.pageY};
    log('Moving Started.')
  });

  $('.moveable').mousemove(function(event){
    var $moveable = $(event.target);
    
    if($moveable.hasClass('moving')){
      var l = event.pageX;
      var t = event.pageY;
      var dl = l - currentCords.l;
      var dt = t - currentCords.t;
      currentCords = {l: l, t: t};
      $moveable.css('top', $moveable.position().top + dt);
      $moveable.css('left',$moveable.position().left + dl);
      
      $destination = $('.destination');

      if($moveable !== $destination) {
        if(isOverlapping($moveable.get(), $destination.get())){
           $destination.addClass('overlapping'); 
        } else {
           $destination.removeClass('overlapping'); 
        }
      }

      logStatus(JSON.stringify($moveable.offset()));
      
    }    
  });

  $('.moveable').mouseup(function(event){
    log('Moving Ended.')
    $(event.target).removeClass('moving');
    currentCords = null;
  });
  
  $('.moveable').mouseout(function(event){
    var $moveable = $(event.target);
    if($moveable.hasClass('moving')){
      $moveable.removeClass('moving');
      currentCords = null;
    }
  });  
});

/**
 * This method determines if two div operlaps
**/
var isOverlapping = function(o1, o2){
  var $o1 = $(o1);
  var $o2 = $(o2);
  var box1 = $o1.offset();
  var box2 = $o2.offset();

  box1.width  = $o1.outerWidth();
  box1.height = $o1.outerHeight();
  box2.width  = $o2.outerWidth();
  box2.height = $o2.outerHeight();

  statusMessage = "box1: " + JSON.stringify(box1) + "<br>box2: " + JSON.stringify(box2)
  logStatus(statusMessage);

  if ( (box1.left + box1.width > box2.left) 
    && (box1.left < box2.left + box2.width)
    && (box1.top + box1.height > box2.top & box1.top < box2.top + box2.width)
    && (box1.top < box2.top + box2.height)
    ) {
    return true
  } 
}

var log = function(message) {
  $('#messages').append('<div class="log-message">' + message + '</div>');
};

var logStatus = function(message){
  $('#status-message').html('<div class="status-message">' + message + '</div>');
}