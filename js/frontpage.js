var app=angular.module("myApp",[]);
	app.controller("myCtrl",function($scope,$rootScope)
  {
    $scope.visibility=true;
    $scope.onClick=function()
    {
       $("#wrapper").toggleClass("toggled");
       $rootScope.f = !$rootScope.f;    }
  });
app.controller("nav",function($scope,$rootScope)
  {$rootScope.f = 1;
  $(document).ready(function () {

    $('#locmodal').modal('show');

});
});
  app.controller("login",function($scope,$http,$rootScope)
  {
  	$scope.user={"password":"","email":"",};
   $scope.userlogin=function()
	{console.log("loginnow");
		
		var req = 
		{  	 method: 'POST',
			 url: 'http://grokart.ueuo.com/login.php', 
			 headers: { 'Content-Type':'application/x-www-form-urlencoded' },
			 data: $.param($scope.user),
		 } 
		
		 $http(req)
		 .success(
		 	function(response){
		 		console.log(JSON.stringify(response));
            console.log("response :"+response.success);
            if(response.success=='true'){ 
           
               var d = new Date();
               d.setTime(d.getTime() + (30*24*60*60*1000));
               var expires = "expires="+d.toUTCString();
               document.cookie = "session" + "=" + response.session + "; " + expires;
               console.log("hello"+"session" + "=" + response.session + "; " + expires);
			//document.write("You will be redirected to main page in 10 sec.");
			setTimeout( function(){window.location.assign("./Account.html");}, 2000);
            }
		 	})
		 .error(
		 	function(response){
		 		console.log("error:"+ response.error_message);
		 	});
		
	}
  });
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
	
	app.controller("tiles",function($scope,$http)
	{
     $scope.cateshow;
     $scope.subc=[{subID:1,name:"Hello"},{subID:2,name:"Bye"},{subID:3,name:"See you"}];
     	$scope.cats=function(id)
     	{
     		console.log(id);
     		$scope.cateshow=true;
     	}
     	$scope.cath=function(id)
     	{
     		console.log(id);
     		$scope.cateshow=false;
     	}
		$scope.show=function(id)
		{
                $scope.disp=true;
                if($scope.name1.success=="true")
                {var n=$scope.name1.numCategories;
                 var list=$scope.name1.list;
                 for(var i=0;i<n;++i)
                 {
                 	if(list[i].ID==id){$scope.subc=list[i].subcategories;}
                 }

                }
		}
		$scope.hide=function()
		{
                $scope.disp=false;
		}
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
      $http.get("http://grokart.ueuo.com/listCategories.php")
        .success(function(response) {
            
            $scope.name1=response;
            
            console.log("response :"+JSON.stringify(response));
        })
        .error(function(response, status, headers, config){
          console.log("error:"+ response.error_message);
         });
		

});
$scope.check=true;
$scope.toggle=function(){
    $scope.check=($scope.check);
    $( document ).ready(function() {
    $("#locmodal").modal('show');
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
