
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

angular.module("Controllers").controller('Album.controller', ['$scope', 'Album' , function($scope, Album) {

  var albums = [new Album(albumPicasso), new Album(albumMarconi)];
  var currentAlbumIndex = 0;
  var options = ['default', 'play', 'pause'];
  var playing = [];

  $scope.rowIsSelected = function($index){

    return $scope.selections[$index] == "pause";
  }

  // Remember: All properties added to the '$scope' object can be accessed in the 
  $scope.album = albums[0];
  reinitializeSelections = function() {
    $scope.selections = [];
    for (var i = 0; i < $scope.album.songs.length; i++) {
      $scope.selections.push("default");
    }
  };

  reinitializeSelections();

  $scope.changeAlbum = function() {
    currentAlbumIndex = (currentAlbumIndex + 1) % albums.length;
    $scope.album = albums[currentAlbumIndex];
    reinitializeSelections();
  };

  $scope.showPlay = function($index){
    if ($scope.rowState($index) === "default") {
      $scope.selections[$index] = "play";
    }
  };
  $scope.showClickedPlay = function($index){
    if ($scope.rowState($index) === "pause") {
      $scope.selections[$index] = "play";
      playing = [];

    }
  };

  $scope.showTrackNumber = function($index){
    if ($scope.rowState($index) !== "pause"){
    $scope.selections[$index] = "default";
    }
  };
   $scope.showPause = function($index){
    $scope.selections[playing[0]] = "default";
    $scope.selections[$index] = "pause";
    playing = [$index];
  };
  $scope.rowState = function($index) {
    return $scope.selections[$index];
  };

}]);



