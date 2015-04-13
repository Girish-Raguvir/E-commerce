
angular.module('orders', []).controller('orderdisplay', function($scope) {
    $scope.orders = [
        {ono:123456,s:"IIT-M",desc:"It was vegetables.",dod: "14/4/2015",aod:"Plot no.42,Annai Indira Nagar,Okkiam Thuraipakkam,OMR,Chennai-600096.",p:2000},
         {ono:123456,s:"IIT-B",desc:"It was vegetables.",dod: "14/4/2015",aod:"Plot no.42,Annai Indira Nagar,Okkiam Thuraipakkam,OMR,Chennai-600096.",p:1000},
          {ono:123456,s:"IIT-K",desc:"It was vegetables.",dod: "14/4/2015",aod:"Plot no.42,Annai Indira Nagar,Okkiam Thuraipakkam,OMR,Chennai-600096.",p:5000},
           {ono:123456,s:"IIT-D",desc:"It was vegetables.",dod: "14/4/2015",aod:"Plot no.42,Annai Indira Nagar,Okkiam Thuraipakkam,OMR,Chennai-600096.",p:8000},
            {ono:123456,s:"IIT-K",desc:"It was vegetables.",dod: "14/4/2015",aod:"Plot no.42,Annai Indira Nagar,Okkiam Thuraipakkam,OMR,Chennai-600096.",p:3000},
             {ono:123456,s:"IIT-M",desc:"It was vegetables.",dod: "14/4/2015",aod:"Plot no.42,Annai Indira Nagar,Okkiam Thuraipakkam,OMR,Chennai-600096.",p:4000}
        
    ];
    $(window).scroll(function() {
  var navbarColor = "121,147,59";//color attr for rgba

  var smallLogoHeight = 30;
  var bigLogoHeight = 90;
  var navbarHeight = $('.navbar-inverse').height(); 
  
  var smallLogoEndPos = 0;
  var smallSpeed = (smallLogoHeight / bigLogoHeight);
  
  var ySmall = ($(window).scrollTop() * smallSpeed); 
  
  var smallPadding = navbarHeight - ySmall;
  if (smallPadding > navbarHeight) { smallPadding = navbarHeight; }
  if (smallPadding < smallLogoEndPos) { smallPadding = smallLogoEndPos; }
  if (smallPadding < 0) { smallPadding = 0; }
  
  
  
  var navOpacity = ySmall / smallLogoHeight;
  $('.navbar').css({ "height": 100*(1-navOpacity/8)});
  navOpacity/=10;
  navOpacity+=0.8;
  
  
  if(navOpacity!=0) 
 { if  (navOpacity > 1) { navOpacity = 1; }
  if (navOpacity < 0 ) { navOpacity = 0; }
  var navBackColor = 'rgba(' + navbarColor + ',' + navOpacity + ')';
  $('.navbar-inverse').css({"background": navBackColor});}
  else
  {
    $('.navbar-inverse').css({"background":"rgba(121,147,59,0.8)"});
  }
  
  var shadowOpacity = navOpacity * 0.4;
  if ( ySmall > 1) {
    $('.navbar-inverse').css({"box-shadow": "0 2px 3px rgba(0,0,0," + shadowOpacity + ")"});
  } else {
    $('.navbar-inverse').css({"box-shadow": "none"});
  }
  
  
  
});
   
    $scope.values = [
    {
  id: 1,
  label: 'Price-Lower to Higher',
  sub: 'p',
  rev:false
  
}, 
{
  id: 2,
  label: 'Price-Higher to Lower',
  sub: 'p',
  rev:true
  
},{
  id: 3,
  label: 'Seller-Alphabetical',
  sub: 's',
  rev:false
  
}
];
$scope.i=-1;



$scope.selected =$scope.values[0];
$scope.s='p';
    
    if($scope.selected.label=='Price')
    $scope.s='p';
    else 
    $scope.s='s';
});