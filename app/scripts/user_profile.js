
var creditCard1 = {
  cCardType: 'Visa',
  cCardNumber: 'xxxx-1234',
}
var creditCard2 = {
  cCardType: 'Master Card',
  cCardNumber: 'xxxx-5678',
}

var createCardRow = function(cCardType, cCardNumber) {

  var template = 
        '<tr class = "credit-card-information" >'
      + ' <td class="col-md-3" >' + cCardType  + '</td>'
      + ' <td class="col-md-7">' + cCardNumber + '</td>'
      + ' <td class="col-md-2">' + '<i class="fa fa-minus-circle"></i>' + '</td>'
      + '</tr>'
      ;

  return $(template);
};

var displayCCardInfo = function(CCard){
    var $cCardList = $('.creditCard-list-table');
    console.log($cCardList.length)
    $cCardList.empty();

    for(var i = 0; i < CCard.length; i++){
      var cCardData = CCard[i];
      var $newCCRow = createCardRow(cCardData.cCardType, cCardData.cCardNumber);
      $cCardList.append($newCCRow);
    }
}

var showTab = function(containerName){
  $("."+ containerName).removeClass("hidden");
}
var hideTab = function(containerName){
  $("."+ containerName).addClass("hidden");
}

var CCard = [creditCard1, creditCard2];

if (document.URL.match(/\/user/)) {
  $(document).ready(function() {

     $(".your-account").click(function(event){
         showTab($(this).attr('data-tab-container'));
         hideTab($(".subscription").attr('data-tab-container'));
         $(this).parent().addClass("active");
         $(".subscription").parent().removeClass("active");
         event.preventDefault();
     });
     $(".subscription").click(function(event){
         showTab($(this).attr('data-tab-container'));
         hideTab($(".your-account").attr('data-tab-container'));
         $(this).parent().addClass("active");
         $(".your-account").parent().removeClass("active");
         displayCCardInfo(CCard);
         event.preventDefault();
     });
    showTab('container-personal-information');
    hideTab('container-subscription-page');
    $(".your-account").parent().addClass("active");
  });
}
