// Add a new factory to the 'Models' module (defined in app/scripts/models/index.js).
angular.module('Models').factory('Album', function() {
  // Want to return a function that we can use to create new objects.
  //  - For the factories, you can either explicitly list the arguments that
  //    you expect, or you take a dictionary that contains the arguments you need
  //    for the object. We use the dictionary approach for this model.
  return function(properties) {

    // Shortcut to copy all of the passed in properties into the current object.
    //  - 'this' refers to the object that will be created when 'new Album()' is called.
    angular.extend(this, properties);


    this. metaInfo = function(){
      return this.year + "on" + this.label;
    };


    this.url = function(){
      return "/album";
    };
  };
});
