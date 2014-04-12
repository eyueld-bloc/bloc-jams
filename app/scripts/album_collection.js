
var $defaultThumbnail = 
        '<div class="col-md-2">'
      + '  <div class="thumbnail">'
      + '     <div class="collection-album-image-container">'
      + '       <a href="/album"><img src="/images/album-placeholder.png"></a>'
      + '     </div>'
      + '     <div class="caption">'
      + '       <h4 class="album-name"><a href="//album">Album Name</a></h4>'
      + '       <h4 class="artist-name"><a href="//album">Artist Name</a></h4>'
      + '       <h5 class="album-meta-info">X Songs</h5>'
      + '     </div>'
      + '  </div>'
      + '</div>'

var buildAlbumOverlay = function(albumURL) {
  var template =
      '<div class="collection-album-image-overlay">'
    + '  <div class="collection-overlay-content">'
    + '    <a class="collection-overlay-button" href="' + albumURL + '">'
    + '      <i class="fa fa-play"></i>'
    + '    </a>'
    + '    &nbsp;'
    + '    <a class="collection-overlay-button" }">'
    + '      <i class="fa fa-plus"></i>'
    + '    </a>'
    + '  </div>'
    + '</div>'
    ;
  return $(template); // Generate the DOM element with jQuery
};

var updateCollectionView = function() {
  // ... Other code ...

  // Function that will be called whenever an album image is hovered over.
  var onHover = function(event) {
    // Add the overlay to image container.
    //  - 'this' is a reference to the object whose `hover` action was triggered for.
    //  - '$(this)' returns the jQuery wrapped object for the element that was hovered over.
    $(this).append(buildAlbumOverlay("/album"));
  }

  // Function that will be called whenever an album image is hovered over.
  var offHover = function(event) {
    // Remove the overlay from the album image container.
    $(this).find('.collection-album-image-overlay').remove();
  }

  for (var y = 0; y < 5; y++){
    for (var x = 0; x < 5; x++){
      $(".row").append($defaultThumbnail);
    }
  }
  $(".collection-album-image-container").hover(onHover, offHover);
/*
  // for loop that builds your thumbnails.
  for (...) {
    var $newThumbnail = // Code to build album thumbnail.;
    // Find the image container in the thumbnail and add a hover event handler with
    //  our event handlers for on/off hover.
    //  - The jQuery documentation: http://api.jquery.com/hover/
    $newThumbnail.find('.collection-album-image-container').hover(onHover, offHover);
    $collection.append($newThumbnail);
  }
  */
  
};

if (document.URL.match(/\/collection/)) {
  // Wait until the HTML is fully processed.
  $(document).ready(function() {
    updateCollectionView();

  });
}

