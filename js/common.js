

// bgswitcher
$(function() {
  /*!
    *Photo Credit
    https://www.flickr.com/photos/35034346243@N01/2284519526
    https://www.flickr.com/photos/potaufeu/11003842036/
    https://www.flickr.com/photos/grilledahi/414523045/
    https://www.flickr.com/photos/hyougushi/277097856/
  */
   $.backstretch([
    "img/curry01.jpg",
    "img/curry02.jpg",
    "img/curry03.jpg",
    "img/curry04.jpg"
    ], {duration: 4000, fade: 1500});
});


// googlemap
function initialize(shopLat, shopLng, zoom) {
  var labLatlng = new google.maps.LatLng(35.705053, 139.756473);
  var shopLatlng = new google.maps.LatLng(shopLat, shopLng);
  var centerLatlng = new google.maps.LatLng(35.702474, 139.753579);
  var myOptions = {
    zoom: zoom,
    center: centerLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById('gmap'), myOptions);
  
  var labMarker = new google.maps.Marker({
    position: labLatlng,
    icon: 'img/marker_lab.png',
    map: map
  });
  var shopMarker = new google.maps.Marker({
    position: shopLatlng,
    icon: 'img/marker_curry.png',
    map: map
  });
}


// google image search
function imageList(query) {
  var start = 0;
  var end = 16;
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
  addTarget.html(addDom);
}


$(function() {
  var point = 0; // max = 28
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
      else if(point <= 4) {
        user_select = 'minimum';
      }
      else if(point <= 7) {
        user_select = 'exsmall';
      }
      else if(point <= 11) {
        user_select = 'small';
      }
      else if(point <= 15) {
        user_select = 'medium';
      }
      else if(point <= 19) {
        user_select = 'large';
      }
      else if(point <= 22) {
        user_select = 'exlarge';
      }
      else if(point <= 26) {
        user_select = 'huge';
      }
      else {
        user_select = 'maximum';
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
    
    $('.again').on('click', function(e) {
      e.preventDefault();
      point = 0;
      item_select_count = 0;
      item.removeClass('selected');
      $('body').removeClass('modalOpen');
      $('.modal .inner').scrollTop(0);
    });
    
  });
});