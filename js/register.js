var app=angular.module('registration', []);
app.controller('register', function($scope,$http) {
  $scope.test = {"email": "girish@gmail.com","password": "123","name": "girish","address": "IIT Madras", "telephone": "9444706609"};
    $scope.email = "girish@gmail.com";
    $scope.password="123";
    $scope.uname="girish";
    $scope.address="IITM";
    $scope.telephone="9444706609";
    $scope.add={"hno":"w","street":"w","area":"w","rcomp":"w","landmark":"w","city":"w","pin":"w",};
    $scope.uname={"first":"h","last":"h",};
    $scope.sal="Mr.";
    $scope.user = {"email": "gh","password": "","name": "","address": "", "telephone": "",};
   
    $scope.sendPost = function() {
        // var data = $.param({
            
        //         email:$scope.email,
        //         password:$scope.password,
        //         name: $scope.uname,
        //         address:$scope.address,
        //         telephone:$scope.telephone

            
        // });
         $scope.user.address=$scope.add.hno + ", " + $scope.add.street + ", " + $scope.add.area + ", " + $scope.add.rcomp + ", " + $scope.add.landmark + ", " + $scope.add.city + ", " + $scope.add.pin + ".";
         $scope.user.name=$scope.sal+$scope.uname.first + " " + $scope.uname.last;
        var req={
         method: 'POST',
         url: 'http://grokart.ueuo.com/newUser.php',
         headers: { 'Content-Type':'application/x-www-form-urlencoded' },
         data: $.param($scope.user),
        }
        
        //console.log(data);
        $http(req)
     .success(
      function(response){
        console.log(JSON.stringify(response));
            console.log("response :"+response.success);
      })
     .error(
      function(response){
        console.log("error:"+ response.error_message);
      });
    }        
});
//file:///C:/Users/Girish/Documents/GitHub/E-commerce/fonts/fontawesome/fontawesome-webfont.ttf?v=4.0.3
app.controller("myCtrl",function($scope,$rootScope)
  {
    $scope.visibility=true;
    $scope.onClick=function()
    {
       $("#wrapper").toggleClass("toggled");
       $rootScope.f = !$rootScope.f;    }
  });
app.controller("nav",function($scope,$rootScope)
  {$rootScope.f = 0;
   
     $("#wrapper").toggleClass("toggled");
  
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
  navOpacity+=0.9;
  
  
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
    if($rootScope.f==1){$("#wrapper").toggleClass("toggled");$rootScope.f=0;}
  } else {
    $('.navbar-inverse').css({"box-shadow": "none"});
    
  }
  
  
  
});
});
