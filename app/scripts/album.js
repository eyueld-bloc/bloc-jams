
// Example Album 1
var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: '/images/album-placeholder.png',

  songs: [
      { name: 'Blue', length: '4:26' },
      { name: 'Green', length: '3:14' },
      { name: 'Red', length: '5:01' },
      { name: 'Pink', length: '3:21'},
      { name: 'Magenta', length: '2:15'}
    ]
};

// Example Album 2
var albumMarconi = {
  name: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: '/images/album-placeholder2.png',

  songs: [
      { name: 'Hello, Operator?', length: '1:01' },
      { name: 'Ring, ring, ring', length: '5:01' },
      { name: 'Fits in your pocket', length: '3:21'},
      { name: 'Can you hear me now?', length: '3:14' },
      { name: 'Wrong phone number', length: '2:15'}
    ]
};

var createSongRow = function(songRowNumber, songName, songLength) {

  var template = 
        '<tr class = "song" data-songBeingPlayed="0" data-song-number="'+ songRowNumber + '">'
      + ' <td class="col-md-1 songRowNumber " >' + songRowNumber  + '</td>'
      + ' <td class="col-md-9">' + songName + '</td>'
      + ' <td class="col-md-2">' + songLength + '</td>'
      + '</tr>'
      ;

  return $(template);
};


var currentPlayingSong = "";

var songHoverIn = function(event){
  $this = $(this);
  var $songRow = $this.find(".songRowNumber");
  var songRowNumber = $this.attr('data-song-number');
  var songBeingPlayed = $this.attr('data-songBeingPlayed');

  if (songBeingPlayed == 0){
      $songRow.html('<i class="fa fa-play"></i>');
    }
   else if (songBeingPlayed == 1){
    $songRow.html('<i class="fa fa-pause"></i>');
  }

  
  $songRow.click(function(event){
    
    if (songBeingPlayed == 0){
        if (currentPlayingSong == ""){
          $songRow.html('<i class="fa fa-pause"></i>');
          $this.attr('data-songBeingPlayed', 1);     
          currentPlayingSong = songRowNumber;

        }
        else if (currentPlayingSong != songRowNumber ){
          var $previousPlayingRow = $(".album-song-list-table tr").eq(currentPlayingSong - 1);
          console.log($previousPlayingRow.attr('data-song-number'));
          
          $previousPlayingRow.css("background-color", "");
          $previousPlayingRow.find(".songRowNumber").html(currentPlayingSong);
          $previousPlayingRow.attr('data-songBeingPlayed', 0);

          currentPlayingSong = songRowNumber;
          $songRow.html('<i class="fa fa-pause"></i>');
          $this.attr('data-songBeingPlayed', 1); 
          
        } 
    } 
    if ( songBeingPlayed == 1) {
        $songRow.html('<i class="fa fa-play"></i>');
        $this.attr('data-songBeingPlayed', 0); 
        currentPlayingSong = "";
    }
  });   
};
var songHoverOut = function(event){

    $this = $(this);
    var songRowNumber = $this.attr('data-song-number');
    var songBeingPlayed = $this.attr('data-songBeingPlayed');

    if (songBeingPlayed == 1){
      $this.css("background-color", "rgba(200, 54, 54, 0.5)");
    } else {
      $this.find(".songRowNumber").html(songRowNumber);
      $this.css("background-color", "");
    }
};


var changeAlbumView = function(album) {
  // Your code goes here
  var $albumTitle = $('.album-title');
  $albumTitle.text(album.name);

  // Update the album artist
  var $albumArtist = $('.album-artist');
  $albumArtist.text(album.artist);

  // Update the meta information
  var $albumMeta = $('.album-meta-info');
  $albumMeta.text(album.year + " on " + album.label);

  // Update the album image by changing the 'src' attribute.
  var $albumImage = $('.album-image img');
  $albumImage.attr('src', album.albumArtUrl);

  var $songList = $(".album-song-list-table");
  $songList.empty();
  var songs = album.songs;
  for (var i = 0; i < songs.length; i++) {
    var songData = songs[i];
    var $newRow = createSongRow(i + 1, songData.name, songData.length);
    $songList.append($newRow);
  }
};


// This 'if' condition is used to preven the jQuery modifications
// from happening on non-Album view pages.
//  - This line checks if the current url has "/album" in its path using a regex.
if (document.URL.match(/\/album/)) {
  // Wait until the HTML is fully processed.
  $(document).ready(function() {
    // Code to switch views goes here.
    var albums = [albumPicasso, albumMarconi];
    changeAlbumView(albumMarconi);

    var albumIndex = 0;
    var $albumImage = $('img.album-image');
    //console.log($albumImage);
    // Add a 'click' event handler. The function that we pass into the 'click' function
    //  will be called everytime $albumImage is clicked.
    // on('click', fn)
    $albumImage.click(function(event) {
      // This line toggles which image we'll be showing on next click.
      //   - The calculation '(imageUrlIndex + 1) % 2' will follow this pattern 1, 0, 1, 0, 1 because of the modulo opeator ('%').
      albumIndex = (albumIndex + 1) % albums.length;

      changeAlbumView(albums[albumIndex]);
      $(".song").hover(songHoverIn,songHoverOut);
    });

    $(".song").hover(songHoverIn,songHoverOut);

    

    
   
  });
}
