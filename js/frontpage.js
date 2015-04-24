var app=angular.module("myApp",[]);
	app.controller("myCtrl",function($scope)
	{
		$scope.visibility=true;
		$scope.onClick=function()
		{
			$scope.visibility=!$scope.visibility;
		}
	});
	app.controller("nav",function($scope)
	{
		$(window).scroll(function() {
  var navbarColor = "121,147,59";//color attr for rgba
  //var navbarColor = "62,195,246";
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
  } else {
    $('.navbar-inverse').css({"box-shadow": "none"});
  }
  
  
  
});
	});
	app.controller("cities",function($scope)
	{
		/*$scope.city1="Chennai";
		$scope.city2="Mumbai";
		$scope.city3="Bangalore";*/
		$scope.sight1=true;
		$scope.sight2=true;
		$scope.sight3=true;
		
		$scope.onClick=function()
		{
			if($scope.places=='Chennai')
			{
				$scope.sight1=false; 
				$scope.sight2=true;
				$scope.sight3=true;
			}
			if($scope.places=='Mumbai')
			{
				$scope.sight1=true; 
				$scope.sight2=false;
				$scope.sight3=true;
			}
			if($scope.places=='Bangalore')
			{
				$scope.sight1=true; 
				$scope.sight2=true;
				$scope.sight3=false;
			}
			
			
		}
		
	});
	app.controller("navbar",function($scope)
	{
		$scope.visibilitydown1=true;$scope.visibilitydown2=true;$scope.visibilitydown3=true;$scope.visibilitydown4=true; $scope.visibilitydown5=true;
		//$scope.visibilityup1=false;
		$scope.visibilityup2=false;
		$scope.visibilityup3=false;
		$scope.visibilityup4=false;
		$scope.visibilityup5=false;
		$scope.vischicken=true;

		$scope.a=true;
		$scope.b=false;
		$scope.onHover1=function()
		{
			$scope.visibilitydown1=false;
			$scope.visibilityup1=true;
		}
		/*$scope.barEnter1=function()
		{
			$scope.b=true;
			$scope.*/
		$scope.onLeave1=function()
		{
			$scope.visibilitydown1=true;;
			$scope.visibilityup1=false;
		}
		$scope.onHover2=function()
		{
			$scope.visibilitydown2=false;
			$scope.visibilityup2=true;
		}
		$scope.onLeave2=function()
		{
			$scope.visibilitydown2=true;;
			$scope.visibilityup2=false;
		}
		$scope.onHover3=function()
		{
			$scope.visibilitydown3=false;
			$scope.visibilityup3=true;
		}
		$scope.onLeave3=function()
		{
			$scope.visibilitydown3=true;;
			$scope.visibilityup3=false;
		}
		$scope.onHover4=function()
		{
			$scope.visibilitydown4=false;
			$scope.visibilityup4=true;
		}
		$scope.onLeave4=function()
		{
			$scope.visibilitydown4=true;
			$scope.visibilityup4=false;
		}
		$scope.onHover5=function()
		{
			$scope.visibilitydown5=false;
			$scope.visibilityup5=true;
		}
		$scope.onLeave5=function()
		{
			$scope.visibilitydown5=true;
			$scope.visibilityup5=false;
		}

		$scope.chicken=function()
		{
			$scope.vischicken=false;
		}
		$scope.chickenLeave=function()
		{
			$scope.vischicken=true;
		}
	});
	
	app.controller("slideshow",function($scope)
	{
		$scope.visimg1=true;
		$scope.visimg2=false;$scope.visimg3=false;$scope.visimg4=false;
		$scope.onHover1=function()
		{
			$scope.visimg1=true;
			$scope.visimg2=false;
			$scope.visimg3=false;
			$scope.visimg4=false;
		}
		$scope.onHover2=function()
		{
			$scope.visimg1=false;
			$scope.visimg2=true;
			$scope.visimg3=false;
			$scope.visimg4=false;
		}
		$scope.onHover3=function()
		{
			$scope.visimg1=false;
			$scope.visimg2=false;
			$scope.visimg3=true;
			$scope.visimg4=false;
		}
		$scope.onHover4=function()
		{
			$scope.visimg1=false;
			$scope.visimg2=false;
			$scope.visimg3=false;
			$scope.visimg4=true;
		}
	});
	
	app.controller("tiles",function($scope)
	{
     $( document ).ready(function() {
    $(".tile").height($("#tile1").width());
    $(".carousel").height($("#tile1").width());
     $(".item").height($("#tile1").width());
     
    $(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
	this.resizeTO = setTimeout(function() {
		$(this).trigger('resizeEnd');
	}, 10);
    });
    
    $(window).bind('resizeEnd', function() {
    	$(".tile").height($("#tile1").width());
        $(".carousel").height($("#tile1").width());
        $(".item").height($("#tile1").width());
    });

});
$scope.check=true;
$scope.toggle=function(){
    $scope.check=(!$scope.check);
    $( document ).ready(function() {
    $(".tile").height($("#tile1").width());
    $(".carousel").height($("#tile1").width());
     $(".item").height($("#tile1").width());
     
    $(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 10);
    });
    
    $(window).bind('resizeEnd', function() {
        $(".tile").height($("#tile1").width());
        $(".carousel").height($("#tile1").width());
        $(".item").height($("#tile1").width());
    });

});
    //return $scope.check;
};
	});	
