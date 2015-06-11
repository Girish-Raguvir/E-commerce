
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

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});

app.factory('UserService', function() {
    var userService = {};

    userService.session ="abc";
    
    userService.putsession= function (value) {

       userService.session = value;
    };
 
    return userService;
});

app.factory('category', function() {
 var id=0;
 function set(catid) {
   sessionStorage.catid=catid;
 }
 function get() {
  catid=sessionStorage.catid;  
  return catid;
 }

return {
  set:set,
  get:get
}

});

//search controller

app.controller('search',['$scope','$http','$localstorage', function($scope,$http,$localstorage) {

$scope.search=[{name:'Sorry.No matches found.',q:'-1',price:'',}];

// $("#txtSearch").keyup(function (event) 
// {
//    if (event.keyCode == 13) 
//    {
//       $("#btnsearch").click();
//     }
// });
$scope.addeditems=[   
    {     
      id:-1,    
      qty:0 ,   
      nam:'-',    
      q:0 ,   
      unit:'gm',    
      price:0 ,   
    }];   
$scope.i=-1;    
$scope.titems=0;    
$scope.tprice=0;    
if(sessionStorage.cart==null || sessionStorage.tprice==null)    
  {sessionStorage.cart='[]';sessionStorage.tprice=0;}   
  else    
  {   
    var obj=JSON.parse(sessionStorage.cart);    
    //$scope.addeditems.splice(0,1);    
    for(var i=0;i<obj.length;i++)   
    {   
      if(obj[i].nam=='-')$scope.addeditems.splice(0,1);   
      $scope.addeditems.push(obj[i]);   
    }   
    $scope.tprice=parseInt(sessionStorage.tprice);    
  }   
$scope.loggedout=function()   
{   
  if($localstorage.loggedin=='false')return true;   
  else return false;    
};    
$scope.add=function(id,qty,name,w,price,u)    
{   
      
  var j=0,f=0;    
  if($scope.addeditems.length!=0)   
  if($scope.addeditems[0].id==-1)$scope.addeditems.splice(0,1);   
  for(j=0;j<$scope.addeditems.length;j++)   
    if($scope.addeditems[j].id==id)   
      {   
        $scope.addeditems[j].qty+=qty;$scope.addeditems[j].price+=price;f=1;$scope.titems=$scope.titems+qty;break;    
      }   
  if(!f)    
    {   
      $scope.addeditems.push({ id:id,qty: qty,nam:name ,q: w,unit: u,price: price});    
      $scope.i++;$scope.titems=$scope.titems+qty;   
    }   
    $scope.tprice=$scope.tprice+price;    
    sessionStorage.cart=JSON.stringify($scope.addeditems);    
    sessionStorage.tprice=$scope.tprice;    
      
};
$scope.searchdata="";
$scope.open=function(){setTimeout( function(){document.getElementById("searchdiv").className="dropdown open";}, 20);}
$scope.val=1;
$scope.searchlistent=function()
{
  document.getElementById("searchdiv").className="dropdown open";
  $scope.searchlist();
}
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
  //console.log(JSON.stringify($scope.data));
  
    
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
        //console.log("response :"+response.success);
        if(response.success=='true')
        { 
           //$scope.search=response.items;
          //console.log(JSON.stringify(response));
          if(response.numResults!=0){$scope.search=response.items;console.log('yes');}
          //console.log(JSON.stringify($scope.search));
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

$scope.c='kkkss';
$scope.ctr=0;
//console.log($scope.ctr);
console.log(sessionStorage.length);
$(document).ready(function()
{
  $('#bindElement').popover({title:"Change Location?",content:function()
    { 
      return $(".content").html();},placement:"auto",html: true
    }).parent().on('click','#continue',function()
    {
      sessionStorage.clear('location');
      window.location.href='index.html';
      //console.log('hello @ refresh');
    });
    
});
  
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
  sessionStorage.cart='[]';
  sessionStorage.tprice=0;

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
        $localstorage.clear('session');
        
      })
     .error(
      function(response)
      {
        console.log("error:"+ response.error_message);
        alert('Problem while logging out.Please try again.')
      });
     window.location.assign("index.html");
     setTimeout(function(){},1000);
     $localstorage.set('session','Guest');
     }

  $scope.username=$localstorage.get('username');
  if($scope.username=="Guest")$localstorage.set('loggedin','false');
  else $localstorage.set('loggedin','true');
  
}]);

//display of username of slide-drawer

app.controller("drawer",['$scope','$localstorage',function($scope,$localstorage)
{
  $scope.username=$localstorage.get('username');
  $scope.account=function()
  {
    if($localstorage.get('loggedin')=='true')window.location.assign("./Account.html");
    else alert('Sorry! You must be logged in to view your account.')

  }
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

app.controller('itemdisplay', ['$scope','$localstorage','$http','category',function($scope,$localstorage,$http,category){

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
  console.log(category.get());
  $scope.data={"session":$scope.session,"ID":category.get(),};
  console.log('chchch'+JSON.stringify($scope.data));
  
    
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
    $scope.eggs= [
    {id:0,qty:1,brand:'Britannia',name:'Country Duck eggs',price:66,image:'images/nature.jpg' },
    {id:1,qty:1,brand:'Britannia',name:'Double Yolk eggs',price:40,image:'images/nature.jpg' }
    ];
    $scope.bakery= [
    {id:0,qty:1,brand:'Britannia',name:'Sandwich Bread',q:0.4,q1:0.4,price:28,image:'images/nature.jpg' },
    {id:1,qty:1,brand:'Britannia',name:'Chocolate Muffins',q:0.15,q1:0.15,price:40,image:'images/nature.jpg' }
    ];
    $scope.dairy= [
    {id:0,qty:1,brand:'Amul',name:'Butter',q:0.1,q1:0.1,price:37,image:'images/nature.jpg' },
    {id:1,qty:1,brand:'Britannia',name:'Pizza Cheese',q:0.2,q1:0.2,price:86,image:'images/nature.jpg' }
    ];
     $scope.energy_drink= [
    {id:0,qty:1,brand:'Red Bull',name:'Drinking Can',q:0.25,q1:0.25,price:95,image:'images/nature.jpg' },
    {id:1,qty:1,brand:'Gatorade',name:'Sports Drink-Lemon',q:0.5,q1:0.5,price:40,image:'images/nature.jpg' }
    ];
    $scope.soft_drink= [
    {id:0,qty:1,brand:'Coke',name:'Tin',q:0.35,q1:0.35,price:30,image:'images/nature.jpg' },
    {id:1,qty:1,brand:'Sprite',name:'Pet Bottle',q:0.6,q1:0.6,price:34,image:'images/nature.jpg' },
    {id:2,qty:1,brand:'Pepsi',name:'Diet Can',q:0.25,q1:0.25,price:25,image:'images/nature.jpg' }
    ];
    $scope.biscuits= [
    {id:0,qty:1,brand:'Britannia',name:'50-50',q:0.1,q1:0.1,price:10,image:'images/nature.jpg' },
    {id:1,qty:1,brand:'Britannia',name:'Bourbon',q:0.075,q1:0.075,price:10,image:'images/nature.jpg' }
    ];
    $scope.oils= [
    {id:0,qty:1,brand:'Sundrop',name:'Gold Lite',q:0.1,q1:0.1,price:125,image:'images/nature.jpg' },
    {id:1,qty:1,brand:'Saffola',name:'Gold Oil',q:0.2,q1:0.2,price:392,image:'images/nature.jpg' }
    ];
    $scope.pulses= [
    {id:0,qty:1,brand:'',name:'Moong Dal',q:0.1,q1:0.1,price:125,image:'images/nature.jpg' },
    {id:1,qty:1,brand:'',name:'Urad Dal',q:0.1,q1:0.1,price:119,image:'images/nature.jpg' },
    {id:2,qty:1,brand:'',name:'Channa Dal',q:0.1,q1:0.1,price:70,image:'images/nature.jpg' }
    ];
    $scope.kitchen_dining= [
    {id:0,qty:1,brand:'Arcada',name:'Pizza Cutter',q:0.0,q1:0.0,price:190,image:'images/nature.jpg' },
    {id:1,qty:1,brand:'Nirsota',name:'Vegetable Knife',q:0.0,q1:0.0,price:60,image:'images/nature.jpg' }
    ];
    $scope.detergents= [
    {id:0,qty:1,brand:'Comfort',name:'Fabric Conditioner',q:0.8,q1:0.8,price:170,image:'images/nature.jpg' },
    {id:1,qty:1,brand:'Surf Excel',name:'Blue Washing Powder',q:1.0,q1:1.0,price:185,image:'images/nature.jpg' }
    ];
    $scope.plasticware= [
    {id:0,qty:1,brand:'Hanbao',name:'Dustbin',q:0.0,q1:0.0,price:270,image:'images/nature.jpg' },
    {id:1,qty:1,brand:'Prince Ware',name:'Laundry Basket',q:0.0,q1:0.0,price:600,image:'images/nature.jpg' }
    ];
    $scope.impsnacks= [
    {id:0,qty:1,brand:'Royal Dansk',name:'Choco Chip Cookies',q:0.4,q1:0.4,price:150,image:'images/nature.jpg' },
    {id:1,qty:1,brand:'Mister',name:'Potato Rice Crisps',q:0.13,q1:0.13,price:30,image:'images/nature.jpg' },
    {id:2,qty:1,brand:'Unknown',name:'Tortilla Chipps',q:0.04,q1:0.04,price:270,image:'images/nature.jpg' }
    ];
    $scope.impbeverages= [
    {id:0,qty:1,brand:'Valentino',name:'Cock Tail Fruit',q:0.75,q1:0.75,price:270,image:'images/nature.jpg' },
    {id:1,qty:1,brand:'Carl Jung Selection',name:'Red De-Alcoholised Wine',q:0.75,q1:0.75,price:475,image:'images/nature.jpg' }
    ];
    $scope.choc_confec= [
    {id:0,qty:1,brand:'Simkins',name:'Travel Sweets',q:0.2,q1:0.2,price:225,image:'images/nature.jpg' },
    {id:1,qty:1,brand:'Sapphire',name:'Almonds',q:0.175,q1:0.175,price:325,image:'images/nature.jpg' },
    {id:2,qty:1,brand:'Heart Beat',name:'Love Candy',q:0.15,q1:0.15,price:40,image:'images/nature.jpg' }
    ];
    $scope.babyproducts= [
    {id:0,qty:1,brand:'Cerelac',name:'Apple and Wheat',q:0.3,q1:0.3,price:150,image:'images/nature.jpg' },
    {id:1,qty:1,brand:'Cerelac',name:'Multigrain',q:0.350,q1:0.350,price:182,image:'images/nature.jpg' },
    {id:2,qty:1,brand:'Huggies',name:'Large Diapers',q:0.15,q1:0.15,price:28,image:'images/nature.jpg' },
    {id:3,qty:1,brand:'Johnson and Johnson',name:'Baby Soap',q:0.025,q1:0.025,price:10,image:'images/nature.jpg' }
    ];
    $scope.deos_perfumes= [
    {id:0,qty:1,brand:'axe',name:'Body Spray',q:0.15,q1:0.15,price:170,image:'images/nature.jpg' }
    ];



  var bdefirst=sessionStorage.getItem('bdefirst');
  var bdesecond=sessionStorage.getItem('bdesecond');
  var bdethird=sessionStorage.getItem('bdethird'); 
  var beveragesfirst=sessionStorage.getItem('beveragesfirst');
  var beveragessecond=sessionStorage.getItem('beveragessecond');
  var brandedfirst=sessionStorage.getItem('brandedfirst');
  var groceryfirst=sessionStorage.getItem('groceryfirst');
  var grocerysecond=sessionStorage.getItem('grocerysecond');
  var householdfirst=sessionStorage.getItem('householdfirst');
  var householdsecond=sessionStorage.getItem('householdsecond');
  var householdthird=sessionStorage.getItem('householdthird');
  var gourfirst=sessionStorage.getItem('gourfirst');
  var goursecond=sessionStorage.getItem('goursecond');
  var gourthird=sessionStorage.getItem('gourthird');
  var pcfirst=sessionStorage.getItem('pcfirst');
  var pcsecond=sessionStorage.getItem('pcsecond');
  //console.log(bdefirstchild,typeof bdefirstchild);
  //var visibility;
  if(!bdefirst.localeCompare('true')) { $scope.visibility='bakery';}
  if(!bdesecond.localeCompare('true')) { $scope.visibility='eggs';}
  if(!bdethird.localeCompare('true')) { $scope.visibility='dairy';}
  if(!beveragesfirst.localeCompare('true')) { $scope.visibility='energy_drink';}
  if(!beveragessecond.localeCompare('true')) { $scope.visibility='soft_drink';}
  if(!brandedfirst.localeCompare('true')) { $scope.visibility='biscuits';}
  if(!groceryfirst.localeCompare('true')) { $scope.visibility='oils';}
  if(!grocerysecond.localeCompare('true')) { $scope.visibility='pulses';}
  if(!householdfirst.localeCompare('true')) { $scope.visibility='kitchen_dining';}
  if(!householdsecond.localeCompare('true')) { $scope.visibility='detergents';}
  if(!householdthird.localeCompare('true')) { $scope.visibility='plasticware';}
  if(!gourfirst.localeCompare('true')) { $scope.visibility='impsnacks';}
  if(!goursecond.localeCompare('true')) { $scope.visibility='impbeverages';}
  if(!gourthird.localeCompare('true')) { $scope.visibility='choc_confec';}
  if(!pcfirst.localeCompare('true')) { $scope.visibility='babyproducts';}
  if(!pcsecond.localeCompare('true')) { $scope.visibility='deos_perfumes';}


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
    {$scope.maxq[0]=499;
     $scope.minq[0]=0; 
    
    }
    if($scope.check7==true)
    {
      $scope.maxq[1]=999;
      $scope.minq[1]=500;
    
    }
    if($scope.check8==true)
    {
     $scope.maxq[2]=1999;
      $scope.minq[2]=1000;
    
    }
    if($scope.check9==true)
    {
      $scope.maxq[3]=2999;
    $scope.minq[3]=2000;
   
    }
    if($scope.check10==true)
    {
      $scope.maxq[4]=20000;
      $scope.minq[4]=3000;
   
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
      q:0 ,
      unit:'gm',
      price:0 ,

    }];

$scope.i=-1;
$scope.titems=0;
$scope.tprice=0;

if($localstorage.get('loggedin')=='true')$scope.chkdis=0;
else $scope.chkdis=1;
$scope.checkout=function()
{

  if($localstorage.get('loggedin')=='true')$("#cartmodal").modal("show");
  else alert('Sorry! You must be logged in for checking out the cart.');
}
//$scope.addeditems.length=0;
if(sessionStorage.cart==null || sessionStorage.tprice==null)
{sessionStorage.cart='[]';sessionStorage.tprice=0;}
else
{

  var obj=JSON.parse(sessionStorage.cart);$scope.addeditems.splice(0,1);
  for(var i=0;i<obj.length;i++)
  {
    if(obj[i].nam=='-')$scope.addeditems.splice(0,1);
    $scope.addeditems.push(obj[i]);
  }
  $scope.tprice=parseInt(sessionStorage.tprice);
}
$scope.add=function(id,qty,name,w,price,u)
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
  $scope.addeditems.push({ id:id,qty: qty,nam:name ,q: w,unit: u,price: price});
  $scope.i++;$scope.titems=$scope.titems+qty;}
  $scope.tprice=$scope.tprice+price;
  //$localstorage.set('cart',JSON.stringify($scope.addeditems));
  sessionStorage.cart=JSON.stringify($scope.addeditems);
  sessionStorage.tprice=$scope.tprice;
  //$localstorage.set('tprice',$scope.tprice);

  };

$scope.remove=function(y)
{ var p=0;var value;
    for(p=0;p<$scope.addeditems.length;p++)
    {
      if($scope.addeditems[p].id==y)
       { 
        $scope.titems=$scope.titems-1;
        $scope.addeditems[p].qty--;
        var g=$scope.addeditems[p].price/($scope.addeditems[p].qty+1);
        $scope.addeditems[p].price-=g;
        $scope.tprice-=g;
        if($scope.addeditems[p].qty==0){value=$scope.addeditems.splice(p,1)[0];$scope.i--;}}
    }
    
    
    //$scope.tprice=$scope.tprice-(value.price/(value.qty+1));}
    // $localstorage.set('cart',JSON.stringify($scope.addeditems));
    // $localstorage.set('tprice',$scope.tprice);
    sessionStorage.cart=JSON.stringify($scope.addeditems);
    sessionStorage.tprice=$scope.tprice;
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

app.controller("cart",['$localstorage','$scope','$http','$filter',function($localstorage,$scope,$http,$filter)
  {
    
    $scope.addeditems=[
    { 
      id:0,
      qty:0 ,
      nam:'-',
      w:0 ,
      price:0 ,

    }];
    $scope.tprice=parseInt(sessionStorage.tprice);$scope.titems=0;
    console.log('enter cart');
    if(sessionStorage.cart==null)
      {
        sessionStorage.cart='[]';
        console.log('enter cart if');
        
      }
    else if(sessionStorage.cart!=null)
    {
      var obj=JSON.parse(sessionStorage.cart);$scope.addeditems.splice(0,1);
      for(var i=0;i<obj.length;i++)
      {
        if(obj[i].nam=='-')$scope.addeditems.splice(0,1);
        $scope.addeditems.push(obj[i]);
        $scope.titems+=obj[i].qty;
        
      }
      console.log('enter cart else');
      
    }
    $scope.shipdata={'name':'','phno':'','address':'','date':''};
    var session=$localstorage.get('session');
    var date= $filter('date')(new Date(),'dd-MM-yyyy');
    //console.log('hello'+$scope.date);
    $scope.addorder=function()
    {
     var prodArray=JSON.stringify({'tprice':$scope.tprice,'titems':$scope.titems,'name':$scope.shipdata.name,'phno':$scope.shipdata.phno,'address':$scope.shipdata.address,'date':date}); 
     var itemArray=JSON.stringify($scope.addeditems);
     $scope.data={'session':session,'prodArray':prodArray,'itemArray':itemArray};
     console.log(JSON.stringify($scope.data));
      var req = 
        { method: 'POST',
          url: 'http://thedreamstop.com/api/addOrder.php', 
          headers: { 'Content-Type':'application/x-www-form-urlencoded' },
          data: $.param($scope.data),
        } 
      

      $http(req)
      .success(
      function(response){
      console.log(JSON.stringify(response));
      console.log("response :"+response.success);
      if(response.success=='true')
      { 
       $('#paymodal').modal('show');
                  
      } 
      else 
      {
        alert('Some error has occured.Please try again.')
      }
      })
      .error(
      function(response){
      console.log("error:"+ response.error_message);
      });
    }  
 }]);

//controls the tiles used for display of categories in index.html

app.controller("tiles",['$localstorage','$scope','$http','category',function($localstorage,$scope,$http,category)
  {
    $scope.cateshow;
    
    $scope.subc=[{subID:1,name:"Hello"},{subID:2,name:"Bye"},{subID:3,name:"See you"}];
    

    $scope.cats=function(id)
      {
        //console.log(id);
        $scope.cateshow=true;
      }
      $scope.cath=function(id)
      {
        //console.log(id);
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
      var cityVal=$('#City').val();
      var area=$('#area').val();
      if(cityVal==null || area==null || cityVal=="" || area=="" )
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
  /*$scope.colbread=false;
  $scope.colbev=false;
  $scope.colbrand=false;
  $scope.colgrocery=false;
  $scope.colhousehold=false;
  $scope.colgour=false;
  $scope.colpc=false;
  
  $scope.visbread=function(){category.set(5);console.log('entering visbread');$scope.colbread=true;$scope.colbev=false;$scope.colbrand=false;$scope.colgrocery=false;$scope.colhousehold=false;$scope.colgour=false;$scope.colpc=false;}
  $scope.visbev=function(){category.set(4);console.log('here2');$scope.colbread=false;$scope.colbev=true;$scope.colbrand=false;$scope.colgrocery=false;$scope.colhousehold=false;$scope.colgour=false;$scope.colpc=false;}
  $scope.visbrand=function(){category.set(2);$scope.colbread=false;$scope.colbev=false;$scope.colbrand=true;$scope.colgrocery=false;$scope.colhousehold=false;$scope.colgour=false;$scope.colpc=false;}
  $scope.visgrocery=function(){category.set(3);$scope.colbread=false;$scope.colbev=false;$scope.colbrand=false;$scope.colgrocery=true;$scope.colhousehold=false;$scope.colgour=false;$scope.colpc=false;}
  $scope.vishousehold=function(){category.set(1);$scope.colbread=false;$scope.colbev=false;$scope.colbrand=false;$scope.colgrocery=false;$scope.colhousehold=true;$scope.colgour=false;$scope.colpc=false;}
  $scope.visgour=function(){category.set(6);$scope.colbread=false;$scope.colbev=false;$scope.colbrand=false;$scope.colgrocery=false;$scope.colhousehold=false;$scope.colgour=true;$scope.colpc=false;}
  $scope.vispc=function(){category.set(7);$scope.colbread=false;$scope.colbev=false;$scope.colbrand=false;$scope.colgrocery=false;$scope.colhousehold=false;$scope.colgour=false;$scope.colpc=true;}
  */
  
  
  }]);

//login modal

app.controller("login",['$scope','$http','$localstorage','UserService',function($scope,$http,$localstorage,$rootScope,UserService) {
  
  $scope.user={"password":"","email":"",};
  $scope.userlogin=function()
  {
    console.log("loginnow");
    $scope.wuser=0;
    var req = 
    {    method: 'POST',
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
          
          var d = new Date();var longi=80.2179,lat=13.0846;
          session=response.session;
          d.setTime(d.getTime() + (30*24*60*60*1000));
          var expires = "expires="+d.toUTCString();
          document.cookie = "session" + "=" + response.session + "; " + expires;
          console.log("hello"+"session" + "=" + response.session + "; " + expires);
          $localstorage.set('session',response.session);

          var geocoder;
          var loc=JSON.parse(sessionStorage.location);
          geocoder = new google.maps.Geocoder();
          var address = loc.city+', '+loc.area;
          geocoder.geocode( { 'address': address}, function(results, status) 
          {
            if (status == google.maps.GeocoderStatus.OK) 
            {
              var location = results[0].geometry.location;
              lat=location.lat()*3.14/180;longi=location.lng()*3.14/180;
              console.log(lat);console.log(longi);
            } 
            else 
            {
              alert('Some error has occured.Please try again.');
            }
          });
          
          //UserService.putsession(response.session);
          var req1 = 
          {  method: 'POST',
              url: 'http://thedreamstop.com/api/userInfo.php', 
              headers: { 'Content-Type':'application/x-www-form-urlencoded' },
              data: $.param({"session":response.session,}),
          } 
          var req2 = 
          {  method: 'POST',
              url: 'http://thedreamstop.com/api/latlong.php', 
              headers: { 'Content-Type':'application/x-www-form-urlencoded' },
              data: $.param({"latitude":lat,"longitude":longi,"session":response.session,}),
          } 
          //console.log(session);
          $http(req2)
          .success(
          function(response)
          {
            console.log(JSON.stringify(response));
            console.log("response :"+response.name);
            if(response.success=='true')
          { 
           
          }
            
          })
          .error(
          function(response)
          { 
            console.log("error:"+ response.error_message);
          });
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
            //location.reload();
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
$scope.edit=0;

//$scope.session=getsession('session');
$scope.session=$localstorage.get('session');
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
  $scope.edit=0;
  var newuser={"session":$scope.session,"email":$scope.user.email,"name":$scope.user.name,"password":"123","address":$scope.user.address,"telephone":$scope.user.telephone,};
  var req = 
  { method: 'POST',
    url: 'http://thedreamstop.com/api/editInfo.php', 
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    data: $.param(newuser),
  } 
  console.log(JSON.stringify(newuser));
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

//disables mouse scroll within input type number

$('form').on('focus', 'input[type=number]', function (e) {
  $(this).on('mousewheel.disableScroll', function (e) {
    e.preventDefault()
  })
})

$('form').on('blur', 'input[type=number]', function (e) {
  $(this).off('mousewheel.disableScroll')
})

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
        $localstorage.set('session',response.session);
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

app.controller('orderdisplay', ['$scope','$http','$localstorage', function($scope,$http,$localstorage) {

$scope.orders = 
[
  {'tprice':0,'titems':0,'name':'','phno':'','address':'','date':' ','TID':''},
  
];
var op=0;
$scope.open=function(id)
{
  console.log(id);
  $('#'+id).toggleClass("in");op++;
  if(op%2==1)
  {
    var req1=
    { method: 'POST',
      url: 'http://thedreamstop.com/api/viewTransaction.php',
      headers: { 'Content-Type':'application/x-www-form-urlencoded' },
      data: $.param({'session':$localstorage.get('session'),'TID':id}),
    }
      
    $http(req1)
    .success(
    function(response)
    {
      console.log(JSON.stringify(response));
      console.log("response :"+response.success);
      if(response.success=='true')
        {
         $scope.items=response.transaction;
         $scope.status=response.status;
         console.log(JSON.stringify($scope.items));
        }

      else
          {
            alert('Some error has occured.Please try again.');
          }
    })
    .error(
    function(response)
    {
      console.log("error:"+ response.error_message);
      alert('Some error has occured.Please try again.');
    });
  }
}
var req=
  { method: 'POST',
    url: 'http://thedreamstop.com/api/orderHistory.php',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    data: $.param({'session':$localstorage.get('session')}),
  }
        
  $http(req)
  .success(
  function(response)
  {
    console.log(JSON.stringify(response));
    console.log("response :"+response.success);
    if(response.success=='true')
      {
       $scope.orders=response.history;
       console.log(JSON.stringify($scope.orders));
      }

    else
        {
          alert('Some error has occured.Please try again.');
        }
  })
  .error(
  function(response)
  {
    console.log("error:"+ response.error_message);
    alert('Some error has occured.Please try again.');
  });

$scope.values = [
{
  id: 1,
  label: 'Total bill amount-Lower to Higher',
  sub: 'tprice',
  rev:false
}, 
{
  id: 2,
  label: 'Total bill amount-Higher to Lower',
  sub: 'tprice',
  rev:true
  
},
];

$scope.i=-1;
$scope.selected =$scope.values[0];
$scope.s='tprice';
    
if($scope.selected.label=='Price')
  $scope.s='tprice';
else 
  $scope.s='s';

}]);

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

if(sessionStorage.location==null)
    sessionStorage.location=JSON.stringify({'city':' ','area':' '});

$(window).load(function() 
  {
    $(".loader").fadeOut("slow");
    
  });
  
$(document).ready(function()
  { 
    
      $('#area1').show();
       $('#area2').hide();
        $('#area3').hide();
      $("#City").change(function()
     {  var cityVal=$('#City option:selected').text();
     /*console.log(cityVal);
     console.log(cityVal.localeCompare('Chennai'));
     console.log($scope.visarea);*/
        if(!cityVal.localeCompare('Chennai'))
        {
            $('#area1').show();
            $('#area2').hide();
            $('#area3').hide();
        }
        else if(!cityVal.localeCompare('Bangalore')) 
        {
            $('#area1').hide();
            $('#area2').show();
            $('#area3').hide();
        }
        else if(!cityVal.localeCompare('Mumbai')) 
        {
            $('#area1').hide();
            $('#area2').hide();
            $('#area3').show();
        }
     });
    function displayVals()
      { 
        var cityVal=$('#City').val();
        var area1=$('#a').val();
        var area2=$('#b').val();
        var area3=$('#c').val();
       
          if(!cityVal.localeCompare('Chennai'))
        {
          $('#bindElement').html("<b> City:&nbsp;</b> " + cityVal +"&nbsp;&nbsp;&nbsp;"+ "<b> Area:&nbsp;</b> " + area1);
           sessionStorage.location=JSON.stringify({'city':cityVal,'area':area1}); 
           console.log('enters chennai');
           console.log(area1);
        }
       else if(!cityVal.localeCompare('Bangalore')) 
        {
          $('#bindElement').html("<b> City:&nbsp;</b> " + cityVal +"&nbsp;&nbsp;&nbsp;"+ "<b> Area:&nbsp;</b> " + area2);
           sessionStorage.location=JSON.stringify({'city':cityVal,'area':area2}); 
           console.log('enters Bangalore');
           console.log(area2);
        }
      else if(!cityVal.localeCompare('Mumbai')) 
        {
          $('#bindElement').html("<b> City:&nbsp;</b> " + cityVal +"&nbsp;&nbsp;&nbsp;"+ "<b> Area:&nbsp;</b> " + area3);
           sessionStorage.location=JSON.stringify({'city':cityVal,'area':area3}); 
           console.log('enters Mumbai');
           console.log(area3);
        }
        
        //console.log('here');
      }
     $("#locsub").click(displayVals);
     
    var loc=JSON.parse(sessionStorage.location);
    
    
    if(loc.city==' ' || loc.area==' ')
      $("#locmodal").modal("show");
    else
      {
         $('#bindElement').html("<b> City:&nbsp;</b> " + loc.city +"&nbsp;&nbsp;&nbsp;"+ "<b> Area:&nbsp;</b> " + loc.area);
      }
  });
document.getElementById("wrapper").className="toggled";
$('.navbar').css({"cursor":"pointer"});
$(window).scroll(function() {
  document.getElementById("wrapper").className="toggled";

  //console.log(document.getElementById("wrapper").className);
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
    //console.log($rootScope.f)
    //if($("wrapper").className!="toggled")$("#wrapper").toggleClass("toggled");
  } 
  else 
  {
    $('.navbar-inverse').css({"box-shadow": "none"});
  }
  
});
});
/*app.controller("sub",function($scope)
{
  $scope.colbread=false;
  $scope.colbev=false;
  $scope.colbrand=false;
  $scope.colgrocery=false;
  $scope.colhousehold=false;
  $scope.colgour=false;
  $scope.colpc=false;
  $scope.visbread=function(){$scope.colbread=true;$scope.colbev=false;$scope.colbrand=false;$scope.colgrocery=false;$scope.colhousehold=false;$scope.colgour=false;$scope.colpc=false;}
  $scope.visbev=function(){console.log('here2');$scope.colbread=false;$scope.colbev=true;$scope.colbrand=false;$scope.colgrocery=false;$scope.colhousehold=false;$scope.colgour=false;$scope.colpc=false;}
  $scope.visbrand=function(){$scope.colbread=false;$scope.colbev=false;$scope.colbrand=true;$scope.colgrocery=false;$scope.colhousehold=false;$scope.colgour=false;$scope.colpc=false;}
  $scope.visgrocery=function(){$scope.colbread=false;$scope.colbev=false;$scope.colbrand=false;$scope.colgrocery=true;$scope.colhousehold=false;$scope.colgour=false;$scope.colpc=false;}
  $scope.vishousehold=function(){$scope.colbread=false;$scope.colbev=false;$scope.colbrand=false;$scope.colgrocery=false;$scope.colhousehold=true;$scope.colgour=false;$scope.colpc=false;}
  $scope.visgour=function(){$scope.colbread=false;$scope.colbev=false;$scope.colbrand=false;$scope.colgrocery=false;$scope.colhousehold=false;$scope.colgour=true;$scope.colpc=false;}
  $scope.vispc=function(){$scope.colbread=false;$scope.colbev=false;$scope.colbrand=false;$scope.colgrocery=false;$scope.colhousehold=false;$scope.colgour=false;$scope.colpc=true;}
  
console.log('here');


});*/