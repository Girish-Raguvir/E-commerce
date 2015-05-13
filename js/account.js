var app=angular.module('account', []);
app.controller('myaccount', function($scope,$http) {
  function getsession(cname) {
    console.log("inside "+cname)
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
  
  $scope.session=getsession('session');
 var req = 
    {    method: 'POST',
       url: 'http://grokart.ueuo.com/userInfo.php', 
       headers: { 'Content-Type':'application/x-www-form-urlencoded' },
       data: $.param({"session":$scope.session,}),
     } 
    $scope.user={"success":"","ID":"","email":"","name":"","address":"","telephone":""};
     $http(req)
     .success(
      function(response){
        console.log(JSON.stringify(response));
            console.log("response :"+response.success);
            if(response.success=='true'){ 
           
               $scope.user=response;}
      })
     .error(
      function(response){
        console.log("error:"+ response.error_message);
      });
$scope.useredit=function()
  {
    var newuser={"session":$scope.session,"email":$scope.user.email,"name":$scope.user.name,"password":"123","address":$scope.user.address,"telephone":$scope.user.telephone,};
    var req = 
    {    method: 'POST',
       url: 'http://grokart.ueuo.com/editInfo.php', 
       headers: { 'Content-Type':'application/x-www-form-urlencoded' },
       data: $.param(newuser),
     } 
     console.log(newuser);
     $http(req)
     .success(
      function(response){
        console.log(JSON.stringify(response));
            console.log("response :"+response.success);
            if(response.success=='true'){ 

            }
      })
     .error(
      function(response){
        console.log("error:"+ response.error_message);
      });
    
  }
 

 
});
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