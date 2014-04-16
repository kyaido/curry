

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






$(function() {
  var start = 0;
  var end = 64;
  var query = 'ボンディ';
  var googleApiUrl = 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=large&hl=ja&imgsz=medium';
  var addTarget = $('.modal .images');
  var addDom = $('<ul class="clearfix"></ul>');
  
  for(var i = start; i < end; i = i + 8 ) {
    $.ajax({
      type: 'GET',
      url: googleApiUrl,
      dataType: 'jsonp',
      data: {
        q: query,
        start: i
      },
      success: function(json) {
        if (200 === json.responseStatus) {
          var data = json.responseData.results;
          for (var i in data) {
            var img = '<img src="' + data[i].url + '">';
            $(img).error(function() {
              img = '<img src="img/blank.gif">';
            })
            addDom.append('<li>' + img + '</li>');
          }
        }
      }
    });
  }
  addTarget.append(addDom);
  
});
