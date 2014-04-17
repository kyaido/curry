

// googlemap
function initialize(shopLat, shopLng, zoom) {
  var labLatlng = new google.maps.LatLng(35.705053, 139.756473);
  var shopLatlng = new google.maps.LatLng(shopLat, shopLng);
  var myOptions = {
    zoom: zoom,
    center: labLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById('gmap'), myOptions);
  
  //var image = 'img/lab_marker.png';
  var labMarker = new google.maps.Marker({
    position: labLatlng,
    //icon: image,
    map: map
  });
  var shopMarker = new google.maps.Marker({
    position: shopLatlng,
    //icon: image,
    map: map
  });
}


// google image search
function imageList(query) {
  var start = 0;
  var end = 64;
  var q = query;
  var googleApiUrl = 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=large&hl=ja&imgsz=medium';
  var addTarget = $('.modal .images');
  var addDom = $('<ul class="clearfix"></ul>');
  
  for(var i = start; i < end; i = i + 8 ) {
    $.ajax({
      type: 'GET',
      url: googleApiUrl,
      dataType: 'jsonp',
      data: {
        q: q,
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
}


$(function() {
  var point = 0;
  var item = $('.tags li');
  var item_select_count = 0; // max = 3
  var user_select;
  
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
      if(point === 5) {
        user_select = 'five';
      }
      else if(point < 5) {
        user_select = 'small';
      }
      else if(point < 10) {
        user_select = 'medium';
      }
      else {
        user_select = 'large';
      }
      
      // create curry shop data
      var data = CURRY_DATA[user_select];
      if(data) {
        $('.modal .introduction span').html(data.introduction);
        $('.modal .shop').html(data.shop);
        $('.modal .feature').html(data.feature);
        // create googlemap
        initialize(data.lat, data.lng, data.zoom);
        // create background image list
        imageList(data.query);
      }
      
      // modal open
      $('body').addClass('modalOpen');
    }
    
  });
});