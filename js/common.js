

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
            addDom.append('<li style="background-image:url(' + data[i].url + ');"></li>');
          }
        }
      }
    });
  }
  addTarget.append(addDom);
  
});


function initialize() {
  var latlng = new google.maps.LatLng(35.705053, 139.756473);
  var myOptions = {
    zoom: 15,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById('gmap'), myOptions);
  
  //var image = 'img/lab_marker.png';
  var labMarker = new google.maps.Marker({
    position: latlng,
    //icon: image,
    map: map
  });
}
initialize();