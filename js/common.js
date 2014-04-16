

$(function() {
  var point = 0;
  var item = $('.tags li');
  var item_select_count = 0; // max = 3
  
  item.on('click', function() {
    if($(this).hasClass('selected')) {
      point = point - $(this).text().length;
      item_select_count--;
      $(this).removeClass('selected');
    }
    else {
      point = point + $(this).text().length;
      item_select_count++;
      $(this).addClass('selected');
    }
    
    if(item_select_count === 3) {
      if(point < 5) {
        $('.modal').addClass('small');
      }
      else if(point < 10) {
        $('.modal').addClass('medium');
      }
      else {
        $('.modal').addClass('large');
      }
      $('body').addClass('modalOpen');
    }
    
  });
});