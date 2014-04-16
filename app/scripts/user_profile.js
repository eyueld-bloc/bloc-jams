var yourAccount = function(event){
  $(".subscription").css('display','none');
}


if (document.URL.match(/\/user/)) {
  $(document).ready(function() {

     $(".your-account").mousedown(function(){
         $(".subscription").addClass("subscription-remove");
     });
  });
}
