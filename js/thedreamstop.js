
var app=angular.module('thedreamstop', ['ionic.utils']);

//custom-factory for local-storage in the web browser

angular.module('ionic.utils', []).factory('$localstorage', ['$window', function($window) {
  
  return {
            set: function(key, value) 
            {
              $window.localStorage[key] = value;
            },
            get: function(key) 
            {
              return $window.localStorage[key];
            },
            clear:function(key)
            {
    	         delete $window.localStorage[key];
            },
          }
}]);

app.factory('UserService', function() {
    var userService = {};

    userService.session ="abc";
    
    userService.putsession= function (value) {

       userService.session = value;
    };
 
    return userService;
});

//search controller

app.controller('search',['$scope','$http','$localstorage', function($scope,$http,$localstorage) {

$scope.search=[{brand:'Sorry.No matches found.',name:'',q:'-1',price:'',}];

$scope.searchdata="";
$scope.open=function(){setTimeout( function(){document.getElementById("searchdiv").className="dropdown open";}, 20);}
$scope.val=1;
$scope.searchlist=function(){
  
  $scope.session=$localstorage.get('session');

  // $scope.search=[
  //               {id:0,qty:1,brand:'Test',name:'Tomatoes',q:0.5,q1:0.5,q2:1,price:80,image:'images/nature.jpg'},
  //               {id:1,qty:1,brand:'Test',name:'Onions',q:0.5,q1:0.5,q2:1,price:50,image:'images/nature.jpg'},
  //               {id:2,qty:1,brand:'Test',name:'Potatoes',q:0.5,q1:0.5,q2:1,price:100,image:'images/nature.jpg'},
  //               {id:3,qty:1,brand:'Test',name:'Potatoes',q:0.5,q1:0.5,q2:1,price:100,image:'images/nature.jpg'},
  //               {id:4,qty:1,brand:'Test',name:'Potatoes',q:0.5,q1:0.5,q2:1,price:100,image:'images/nature.jpg'},
  //               {id:5,qty:1,brand:'Test',name:'Potatoes',q:0.5,q1:0.5,q2:1,price:100,image:'images/nature.jpg'},
  //               {id:6,qty:1,brand:'Test',name:'Spinach',q:0.5,q1:0.5,q2:1,price:200,image:'images/nature.jpg'}
  //             ];

  $scope.data={"session":$scope.session,"q":$scope.searchdata,};
  console.log(JSON.stringify($scope.data));
  
    
    var req = 
    {    method: 'POST',
       url: 'http://thedreamstop.com/api/search.php', 
       headers: { 'Content-Type':'application/x-www-form-urlencoded' },
       data: $.param($scope.data),
     } 
    
     $http(req)
     .success(
     function(response)
     {
        console.log(JSON.stringify(response));
        console.log("response :"+response.success);
        if(response.success=='true')
        { 
           //$scope.search=response.items;
          //console.log(JSON.stringify(response));
          if(response.numResults!=0)$scope.search=response.results;
        }
      })
     .error(
      function(response)
      {
        console.log("error:"+ response.error_message);
      });


};
}]);

//toggles diplay of right-end of nav-bar as user logs in and out

app.controller("log_in_out",['$scope','$localstorage','$http',function($scope,$localstorage,$http){

$scope.loggedin=function()
{
  var t=$localstorage.get('loggedin');
  if(t=='true')
  return true;
  else 
  return false;
}

$scope.logout=function()
{
  
  $localstorage.set('loggedin','false');
  $localstorage.set('username','Guest');
  $localstorage.set('cart','[]');
  $localstorage.set('tprice',0);

  var session=$localstorage.get('session');
  $scope.data={'session':session};
  var req = 
    {    method: 'POST',
       url: 'http://thedreamstop.com/api/logout.php', 
       headers: { 'Content-Type':'application/x-www-form-urlencoded' },
       data: $.param($scope.data),
     } 
    
     $http(req)
     .success(
     function(response)
     {
        console.log(JSON.stringify(response));
        console.log("response :"+response.success);
        $localstorage.set('session','');
        location.reload();
        setTimeout(function(){},1000);
      })
     .error(
      function(response)
      {
        console.log("error:"+ response.error_message);
        alert('Problem while logging out.Please try again.')
      });

}

$scope.username=$localstorage.get('username');
if($scope.username=="Guest")$localstorage.set('loggedin','false');
else $localstorage.set('loggedin','true');

}]);

//display of username of slide-drawer

app.controller("drawer",['$scope','$localstorage',function($scope,$localstorage)
{
	$scope.username=$localstorage.get('username');
}]);

//View cart diplay observed during scroll-down in items page

app.controller("navcart",function($scope)
  {
    $(window).scroll(function() {
  var navbarColor = "121,147,59";

  if($(window).scrollTop() ==0) $('#cartnav').css({"opacity": 0});
  else $('#cartnav').css({"opacity": 1});

  var smallLogoHeight = 30;
  var bigLogoHeight = 90;
  var navbarHeight = $('#cartnav').height(); 
  
  var smallLogoEndPos = 0;
  var smallSpeed = (smallLogoHeight / bigLogoHeight);
  
  var ySmall = ($(window).scrollTop() * smallSpeed); 
  
  var smallPadding = navbarHeight - ySmall;
  if (smallPadding > navbarHeight) { smallPadding = navbarHeight; }
  if (smallPadding < smallLogoEndPos) { smallPadding = smallLogoEndPos; }
  if (smallPadding < 0) { smallPadding = 0; }
  
  var navOpacity = ySmall / smallLogoHeight;
  $('#cartnav').css({ "height":50});
  
  navOpacity/=10;
  navOpacity+=0.9;
  
  
  if(navOpacity!=0) 
 { if  (navOpacity > 1) { navOpacity = 1; }
  if (navOpacity < 0 ) { navOpacity = 0; }
  var navBackColor = 'rgba(' + navbarColor + ',' + navOpacity + ')';
  $('#cartnav').css({"background": navBackColor});}
  else
  {
    $('#cartnav').css({"background":"rgba(121,147,59,0.8)"});
  }
  
  var shadowOpacity = navOpacity * 0.4;
  if ( ySmall > 1) {
    $('#cartnav').css({"box-shadow": "0 2px 3px rgba(0,0,0," + shadowOpacity + ")"});
  } else {
    $('#cartnav').css({"box-shadow": "none"});
  }
  
  
  
});
});


//display of items

app.controller('itemdisplay', ['$scope','$localstorage','$http',function($scope,$localstorage,$http){

  $( document ).ready(function() 
  {
     
     //$("#wrapper").toggleClass("toggled");
     function getsession(cname) {
    console.log("inside "+cname)
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
    {
        var c = ca[i];
        
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) 
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }
  
  $scope.session=getsession('session');
     
  $scope.data={"session":$scope.session,"ID":2,};
   
  
    
    var req = 
    {    method: 'POST',
       url: 'http://thedreamstop.com/api/catProds.php', 
       headers: { 'Content-Type':'application/x-www-form-urlencoded' },
       data: $.param($scope.data),
     } 
    
     $http(req)
     .success(
     function(response)
     {
        console.log(JSON.stringify(response));
        console.log("response :"+response.success);
        if(response.success=='true')
        { 
           $scope.items=response.items;
          console.log(JSON.stringify($scope.items));
        }
      })
     .error(
      function(response)
      {
        console.log("error:"+ response.error_message);
      });
    
  
            

  });

  $scope.names1 = [
        {id:0,qty:1,brand:'Test',name:'Tomatoes',q:0.5,q1:0.5,q2:1,price:80,image:'images/nature.jpg'},
        {id:1,qty:1,brand:'Test',name:'Onions',q:0.5,q1:0.5,q2:1,price:50,image:'images/nature.jpg'},
        {id:2,qty:1,brand:'Test',name:'Potatoes',q:0.5,q1:0.5,q2:1,price:100,image:'images/nature.jpg'},
        {id:3,qty:1,brand:'Test',name:'Potatoes',q:0.5,q1:0.5,q2:1,price:100,image:'images/nature.jpg'},
        {id:4,qty:1,brand:'Test',name:'Potatoes',q:0.5,q1:0.5,q2:1,price:100,image:'images/nature.jpg'},
        {id:5,qty:1,brand:'Test',name:'Potatoes',q:0.5,q1:0.5,q2:1,price:100,image:'images/nature.jpg'},
        {id:6,qty:1,brand:'Test',name:'Spinach',q:0.5,q1:0.5,q2:1,price:200,image:'images/nature.jpg'}
        
    ];
    
    $scope.$watchGroup(['check1','check2','check3','check4','check5'], function() 
    {
       changep();
    });
    $scope.$watchGroup(['check6','check7','check8','check9','check10'], function() 
    {
       changeq();
    });
    $scope.info=
    {
      w: 0.5,
      qty: 1
    };
  
    $scope.maxq=new Array(0,0,0,0,0);
    $scope.minq=new Array(20000,20000,20000,20000,20000);
    function changeq()
    {
      
    $scope.t=false;
     for(i=0;i<5;i++)
     {
      $scope.maxq[i]=0;
      $scope.minq[i]=0;
     }
    if($scope.check6==true)
    {$scope.maxq[0]=0.499;
     $scope.minq[0]=0; 
    
    }
    if($scope.check7==true)
    {
      $scope.maxq[1]=0.999;
      $scope.minq[1]=0.5;
    
    }
    if($scope.check8==true)
    {
     $scope.maxq[2]=1.999;
      $scope.minq[2]=1;
    
    }
    if($scope.check9==true)
    {
      $scope.maxq[3]=2.999;
    $scope.minq[3]=2;
   
    }
    if($scope.check10==true)
    {
      $scope.maxq[4]=20000;
      $scope.minq[4]=3;
   
    }
    }
     $scope.max=new Array(0,0,0,0,0);
     $scope.min=new Array(20000,20000,20000,20000,20000);
    function changep()
    {
     for(i=0;i<5;i++)
     {
      $scope.max[i]=0;
      $scope.min[i]=0;
     }
    $scope.t=false;
    if($scope.check1==true)
    {$scope.max[0]=20;
    $scope.min[0]=0; 
    
    }
    if($scope.check2==true)
    {
      $scope.max[1]=50;
      $scope.min[1]=21;
   
    }
    if($scope.check3==true)
    {
      $scope.max[2]=100;
      $scope.min[2]=51;
    
    }
    if($scope.check4==true)
    {
      $scope.max[3]=200;
      $scope.min[3]=101;
   
    }
    if($scope.check5==true)
    {
      $scope.max[4]=20000;
      $scope.min[4]=201;
    
    }
    }
    
$scope.values = [
    {
      id: 1,
      label: 'Price-High to Low',
      sub: 'price',
      rev:true
  
    }, 
    {
      id: 2,
      label: 'Price-Low to High',
      sub: 'price',
      rev:false
  
    },
    {
      id: 3,
      label: 'Alphabetical',
      sub: 'name',
      rev:false
  
    }];

$scope.addeditems=[
    { 
      id:-1,
      qty:0 ,
      nam:'-',
      w:0 ,
      price:0 ,

    }];

$scope.i=-1;
$scope.titems=0;
$scope.tprice=0;

//$scope.addeditems.length=0;
if($localstorage.get('cart')==null)
{$localstorage.set('cart',JSON.stringify($scope.addeditems));$localstorage.set('tprice',$scope.tprice);}
else
{

  var obj=JSON.parse($localstorage.get('cart'));$scope.addeditems.splice(0,1);
  for(var i=0;i<obj.length;i++)
  {
    if(obj[i].nam=='-')$scope.addeditems.splice(0,1);
    $scope.addeditems.push(obj[i]);
  }
  $scope.tprice=$localstorage.get('tprice');
}
$scope.add=function(id,qty,name,w,price)
{

var j=0,f=0;
//if($scope.i==-1)$scope.addeditems.splice(0,1);
if($scope.addeditems.length!=0)
if($scope.addeditems[0].id==-1)$scope.addeditems.splice(0,1);
for(j=0;j<$scope.addeditems.length;j++)
  if($scope.addeditems[j].id==id)
      {$scope.addeditems[j].qty+=qty;$scope.addeditems[j].price+=price;f=1;$scope.titems=$scope.titems+qty;break;}

if(!f)
  {
  $scope.addeditems.push({ id:$scope.i+1,qty: qty,nam:name ,w: w,price: price});
  $scope.i++;$scope.titems=$scope.titems+qty;}
  $scope.tprice=$scope.tprice+price;
  $localstorage.set('cart',JSON.stringify($scope.addeditems));
  $localstorage.set('tprice',$scope.tprice);

  };

$scope.remove=function(y)
{ var p=0;var value;
    for(p=0;p<$scope.addeditems.length;p++)
    {
      if($scope.addeditems[p].id==y)
       { $scope.titems=$scope.titems-$scope.addeditems[p].qty;value=$scope.addeditems.splice(p,1)[0];}
    }
    
    $scope.i--;
    
    if($scope.i==-1)
    {
      //$scope.addeditems.push({ id:0,qty: 0,nam:'-' ,w: 0,price: 0});
      $scope.tprice=0;
    }
    else{
    $scope.tprice=$scope.tprice-value.price;}
    $localstorage.set('cart',JSON.stringify($scope.addeditems));
    $localstorage.set('tprice',$scope.tprice);
}

$scope.check=function(x)
{
  if((((x.price)<=$scope.max[0] && (x.price)>=$scope.min[0]) || ((x.price)<=$scope.max[1] && (x.price)>=$scope.min[1]) || ((x.price)<=$scope.max[2] && (x.price)>=$scope.min[2]) || ((x.price)<=$scope.max[3] && (x.price)>=$scope.min[3]) || ((x.price)<=$scope.max[4] && (x.price)>=$scope.min[4])) 
    && (((x.q)<=$scope.maxq[0] && (x.q)>=$scope.minq[0]) || ((x.q)<=$scope.maxq[1] && (x.q)>=$scope.minq[1]) || ((x.q)<=$scope.maxq[2] && (x.q)>=$scope.minq[2]) || ((x.q)<=$scope.maxq[3] && (x.q)>=$scope.minq[3]) || ((x.q)<=$scope.maxq[4] && (x.q)>=$scope.minq[4])))
    return true;
  else return false;
}

$scope.selected =$scope.values[0];
$scope.s='price';
   
if($scope.selected.label=='Price')
  $scope.s='price';
else 
  $scope.s='name';
}]);

//cart controller

app.controller("cart",['$localstorage','$scope','$http',function($localstorage,$scope,$http)
  {

    $scope.addeditems=[
    { 
      id:0,
      qty:0 ,
      nam:'-',
      w:0 ,
      price:0 ,

    }];
    $scope.tprice=$localstorage.get('tprice');$scope.titems=0;
    if($localstorage.get('cart')==null)
      $localstorage.set('cart',JSON.stringify($scope.addeditems));
    else
    {
      var obj=JSON.parse($localstorage.get('cart'));$scope.addeditems.splice(0,1);
      for(var i=0;i<obj.length;i++)
      {
        if(obj[i].nam=='-')$scope.addeditems.splice(0,1);
        $scope.addeditems.push(obj[i]);
        $scope.titems+=obj[i].qty;
      }
    }

  }]);

//controls the tiles used for display of categories in index.html

app.controller("tiles",['$localstorage','$scope','$http',function($localstorage,$scope,$http)
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
          {
            var n=$scope.name1.numCategories;
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
    $( document ).ready(function() 
    {
      $(".tile").height($("#tile1").width());
      $(".carousel").height($("#tile1").width());
      $(".item").height($("#tile1").width());
     
    $(window).resize(function() 
    {
      if(this.resizeTO) clearTimeout(this.resizeTO);
      this.resizeTO = setTimeout(function() {
      $(this).trigger('resizeEnd');
    });
    });
    
    $(window).bind('resizeEnd', function() 
    {
      $(".tile").height($("#tile1").width());
      $(".carousel").height($("#tile1").width());
      $(".item").height($("#tile1").width());
    });
    $http.get("http://thedreamstop.com/api/listCategories.php")
        .success(function(response) {
            
          $scope.name1=response;
          console.log("response :"+JSON.stringify(response));
        })
        .error(function(response, status, headers, config){
          console.log("error:"+ response.error_message);
         });
    

    });

    $scope.check=true;
    $scope.toggle=function()
    {
      $scope.check=($scope.check);
      $( document ).ready(function() {
      $("#locmodal").modal('show');
      $(".tile").height($("#tile1").width());
      $(".carousel").height($("#tile1").width());
       $(".item").height($("#tile1").width());
       
      $(window).resize(function() 
      {
      if(this.resizeTO) clearTimeout(this.resizeTO);
      this.resizeTO = setTimeout(function() 
      {
          $(this).trigger('resizeEnd');
      });
      });
      
      $(window).bind('resizeEnd', function() 
      {
          $(".tile").height($("#tile1").width());
          $(".carousel").height($("#tile1").width());
          $(".item").height($("#tile1").width());
      });

      });
    
    }
  }]);

//login modal

app.controller("login",['$scope','$http','$localstorage','UserService',function($scope,$http,$localstorage,$rootScope,UserService) {
  
  $scope.user={"password":"","email":"",};
  $scope.userlogin=function()
	{
    console.log("loginnow");
    $scope.wuser=0;
		var req = 
		{  	 method: 'POST',
			 url: 'http://thedreamstop.com/api/login.php', 
			 headers: { 'Content-Type':'application/x-www-form-urlencoded' },
			 data: $.param($scope.user),
		 } 
		 
		 $http(req)
		 .success(
		 	function(response)
      {
		 		console.log(JSON.stringify(response));
        console.log("response :"+response.success);
        if(response.success=='true')
        { 
          
          var d = new Date();
          session=response.session;
          d.setTime(d.getTime() + (30*24*60*60*1000));
          var expires = "expires="+d.toUTCString();
          document.cookie = "session" + "=" + response.session + "; " + expires;
          console.log("hello"+"session" + "=" + response.session + "; " + expires);
          $localstorage.set('session',response.session);
          //UserService.putsession(response.session);
          var req1 = 
          {  method: 'POST',
              url: 'http://thedreamstop.com/api/userInfo.php', 
              headers: { 'Content-Type':'application/x-www-form-urlencoded' },
              data: $.param({"session":response.session,}),
          } 
          //console.log(session);
          $http(req1)
          .success(
          function(response)
          {
            console.log(JSON.stringify(response));
            console.log("response :"+response.name);
            if(response.success=='true')
          { 
            $scope.wuser=0; 
            $localstorage.set('loggedin','true');  
            $localstorage.set('username',response.name);
            location.reload();
          }
            else {$scope.wuser=1;console.log($scope.wuser);$scope.user.password="";$scope.user.email="";}
          })
          .error(
          function(response)
          { 
            console.log("error:"+ response.error_message);
          });
  			  //document.write("You will be redirected to main page in 10 sec.");
  			  //setTimeout( function(){window.location.assign("./Account.html");}, 2000);
        }
        else
        {
          $scope.wuser=1;$scope.user.password="";$scope.user.email="";
        }
		 	})
		 .error(
		 	function(response)
      {
		 		console.log("error:"+ response.error_message);
		 	});
		
    //console.log(session);
   
	}
  }]);

// main for account.html
app.controller('myaccount',['$scope','$http','$localstorage', function($scope,$http,$localstorage) {
function getsession(cname) 
{
  console.log("inside "+cname)
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) == 0) 
    {
      return c.substring(name.length, c.length);
    }
  }
    return "";
}
  
$scope.session=getsession('session');

var req = 
{ method: 'POST',
  url: 'http://thedreamstop.com/api/userInfo.php', 
  headers: { 'Content-Type':'application/x-www-form-urlencoded' },
  data: $.param({"session":$scope.session,}),
} 
    
$scope.user={"success":"","ID":"","email":"","name":"","address":"","telephone":""};
$http(req)
.success(
function(response){
console.log(JSON.stringify(response));
console.log("response :"+response.success);
if(response.success=='true')
{ 
  $scope.user=response;
  if(typeof(Storage) !== "undefined") 
  {
  $localstorage.set('username',$scope.user.name);
  }
       			
} 
else 
{
  console.log("Sorry, your browser does not support web storage...");
}
})
.error(
function(response){
console.log("error:"+ response.error_message);
});

$scope.useredit=function()
{
  var newuser={"session":$scope.session,"email":$scope.user.email,"name":$scope.user.name,"password":"123","address":$scope.user.address,"telephone":$scope.user.telephone,};
  var req = 
  { method: 'POST',
    url: 'http://thedreamstop.com/api/editInfo.php', 
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    data: $.param(newuser),
  } 
  console.log(newuser);
  $http(req)
  .success(
  function(response){
  console.log(JSON.stringify(response));
  console.log("response :"+response.success);
  if(response.success=='true'){ }
  })
  .error(
  function(response){
  console.log("error:"+ response.error_message);
  });
}
}]);

// main controller for register.html

app.controller('register', function($scope,$http) {

$scope.test = {"email": "girish@gmail.com","password": "123","name": "girish","address": "IIT Madras", "telephone": "9444706609"};
$scope.email = "girish@gmail.com";
$scope.password="123";
$scope.uname="girish";
$scope.address="IITM";
$scope.telephone="9444706609";
$scope.add={"hno":"","street":"","area":"","rcomp":"","landmark":"","city":"","pin":"",};
$scope.uname={"first":"","last":"",};
$scope.sal="Mr.";
$scope.user = {"email": "","password": "","name": "","address": "", "telephone": "","mobile":"",};
$scope.vismob=false;
$scope.vistel=false;
$scope.vispin=false;
$scope.sendPost = function() 
{
  $scope.user.address=$scope.add.hno + ", " + $scope.add.street + ", " + $scope.add.area + ", " + $scope.add.rcomp + ", " + $scope.add.landmark + ", " + $scope.add.city + ", " + $scope.add.pin + ".";
  $scope.user.name=$scope.sal+$scope.uname.first + " " + $scope.uname.last;

  var req=
  { method: 'POST',
    url: 'http://thedreamstop.com/api/newUser.php',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    data: $.param($scope.user),
  }
        
  $http(req)
  .success(
  function(response)
  {
    console.log(JSON.stringify(response));
    console.log("response :"+response.success);
    if(response.success=='true')
      {
        alert('You have successfully registered with us.Welcome.'+'\n'+'You will now be redirected to your account.');
        setTimeout( function(){window.location.assign("./Account.html");}, 1000);
      }

    else
        {
          if(response.error=='emailExists')
            {alert('Sorry.Such an email already exists.Please try again.');$scope.user.email="";}
          else
            {alert('Some error has occured.Please try again.');}
        }
  })
  .error(
  function(response)
  {
    console.log("error:"+ response.error_message);
    alert('Some error has occured.Please try again.');
  });
    }     
    $scope.validation=function()
    {
      //checking for mobile phone  
        if($scope.user.mobile.length==0)
          {
            $scope.vismob=false;
          }
          else
          {
            if(isNaN($scope.user.mobile))
        {
           $scope.vismob=true;
        }
          }
      // checking for telephone
      if($scope.user.telephone.length==0)
          {
            $scope.vistel=false;
          }
          else
          {
            if(isNaN($scope.user.telephone))
        {
           $scope.vistel=true;
        }
          }   
          //checking for pin   
       if($scope.add.pin.length==0)
          {
            $scope.vispin=false;
          }
          else
          {
            if(isNaN($scope.add.pin))
        {
           $scope.vispin=true;
        }
          }
    }   
});

// my orders display

app.controller('orderdisplay', function($scope) {

$scope.orders = 
[
  {ono:123456,s:"IIT-M",desc:"It was vegetables.",dod: "14/4/2015",aod:"Plot no.42,Annai Indira Nagar,Okkiam Thuraipakkam,OMR,Chennai-600096.",p:2000},
  {ono:123456,s:"IIT-B",desc:"It was vegetables.",dod: "14/4/2015",aod:"Plot no.42,Annai Indira Nagar,Okkiam Thuraipakkam,OMR,Chennai-600096.",p:1000},
  {ono:123456,s:"IIT-K",desc:"It was vegetables.",dod: "14/4/2015",aod:"Plot no.42,Annai Indira Nagar,Okkiam Thuraipakkam,OMR,Chennai-600096.",p:5000},
  {ono:123456,s:"IIT-D",desc:"It was vegetables.",dod: "14/4/2015",aod:"Plot no.42,Annai Indira Nagar,Okkiam Thuraipakkam,OMR,Chennai-600096.",p:8000},
  {ono:123456,s:"IIT-K",desc:"It was vegetables.",dod: "14/4/2015",aod:"Plot no.42,Annai Indira Nagar,Okkiam Thuraipakkam,OMR,Chennai-600096.",p:3000},
  {ono:123456,s:"IIT-M",desc:"It was vegetables.",dod: "14/4/2015",aod:"Plot no.42,Annai Indira Nagar,Okkiam Thuraipakkam,OMR,Chennai-600096.",p:4000}
];
    
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
  
},
{
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

// slide drawer

app.controller("myCtrl",function($scope,$rootScope)
{
  $scope.visibility=true;
  $scope.onClick=function()
  {
    $("#wrapper").toggleClass("toggled");
    $rootScope.f = !$rootScope.f;    
  }
});

//navigation bar

app.controller("nav",function($scope,$rootScope){

$rootScope.f = 0; var e=0;

document.getElementById("wrapper").className="toggled";
$('.navbar').css({"cursor":"pointer"});
$(window).scroll(function() {
  document.getElementById("wrapper").className="toggled";

  console.log(document.getElementById("wrapper").className);
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
  { 
    if  (navOpacity > 1) { navOpacity = 1; }
    if (navOpacity < 0 ) { navOpacity = 0; }
    var navBackColor = 'rgba(' + navbarColor + ',' + navOpacity + ')';
    $('.navbar-inverse').css({"background": navBackColor});
  }
  else
  {
    $('.navbar-inverse').css({"background":"rgba(121,147,59,0.8)"});
  }
  
  var shadowOpacity = navOpacity * 0.4;
  if ( ySmall > 1) 
  {
    $('.navbar-inverse').css({"box-shadow": "0 2px 3px rgba(0,0,0," + shadowOpacity + ")"});
    //if($rootScope.f==1 || e==1){$("#wrapper").toggleClass("toggled");$rootScope.f=0;e=0;}
    // else{$("#wrapper").toggleClass("toggled");$rootScope.f=0;}
    console.log($rootScope.f)
    //if($("wrapper").className!="toggled")$("#wrapper").toggleClass("toggled");
  } 
  else 
  {
    $('.navbar-inverse').css({"box-shadow": "none"});
  }
  
});
});