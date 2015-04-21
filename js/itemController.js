
angular.module('items', []).controller('itemdisplay', function($scope) {
    $scope.names1 = [
        {id:0,qty:1,brand:'Test',name:'Tomatoes',q:0.5,q1:0.5,q2:1,price:80,image:'images/nature.jpg'},
        {id:1,qty:1,brand:'Test',name:'Onions',q:0.5,q1:0.5,q2:1,price:50,image:'images/nature.jpg'},
        {id:2,qty:1,brand:'Test',name:'Potatoes',q:0.5,q1:0.5,q2:1,price:100,image:'images/nature.jpg'},
        {id:3,qty:1,brand:'Test',name:'Potatoes',q:0.5,q1:0.5,q2:1,price:100,image:'images/nature.jpg'},
        {id:4,qty:1,brand:'Test',name:'Potatoes',q:0.5,q1:0.5,q2:1,price:100,image:'images/nature.jpg'},
        {id:5,qty:1,brand:'Test',name:'Potatoes',q:0.5,q1:0.5,q2:1,price:100,image:'images/nature.jpg'},
        {id:6,qty:1,brand:'Test',name:'Spinach',q:0.5,q1:0.5,q2:1,price:200,image:'images/nature.jpg'}
        
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
    $scope.$watchGroup(['check1','check2','check3','check4','check5'], function() {
       changep();
   });
    $scope.$watchGroup(['check6','check7','check8','check9','check10'], function() {
       changeq();
   });
    $scope.info={
      w: 0.5,
      qty: 1
    };
    // var maxq=new Array(0,0,0,0,0);
    // var minq=new Array(20000,20000,20000,20000,20000);
    //  var max=new Array(0,0,0,0,0);
    // var min=new Array(20000,20000,20000,20000,20000);
    function changeq()
    {
      maxq=new Array(0,0,0,0,0);
      minq=new Array(20000,20000,20000,20000,20000);
    $scope.t=false;
    if($scope.check6==true)
    {maxq[0]=0.499;
     minq[0]=0; 
    //if($scope.t==false){$scope.min=0;$scope.t=true;}
    }
    if($scope.check7==true)
    {
      maxq[1]=0.999;
      minq[1]=0.5;
    //if($scope.t==false){$scope.min=21;$scope.t=true;}
    }
    if($scope.check8==true)
    {
     maxq[2]=1.999;
      minq[2]=1;
    //if($scope.t==false){$scope.min=51;$scope.t=true;}
    }
    if($scope.check9==true)
    {
      maxq[3]=2.999;
    minq[3]=2;
   //if($scope.t==false){$scope.min=101;$scope.t=true;}
    }
    if($scope.check10==true)
    {
      maxq[4]=20000;
      minq[4]=3;
    //if($scope.t==false){$scope.min=201;$scope.t=true;}
    }
    }
    function changep()
    {
      max=new Array(0,0,0,0,0);
      min=new Array(20000,20000,20000,20000,20000);
    $scope.t=false;
    if($scope.check1==true)
    {max[0]=20;
    min[0]=0; 
    //if($scope.t==false){$scope.min=0;$scope.t=true;}
    }
    if($scope.check2==true)
    {
      max[1]=50;
      min[1]=21;
    //if($scope.t==false){$scope.min=21;$scope.t=true;}
    }
    if($scope.check3==true)
    {
      max[2]=100;
      min[2]=51;
    //if($scope.t==false){$scope.min=51;$scope.t=true;}
    }
    if($scope.check4==true)
    {
      max[3]=200;
      min[3]=101;
   //if($scope.t==false){$scope.min=101;$scope.t=true;}
    }
    if($scope.check5==true)
    {
      max[4]=20000;
      min[4]=201;
    //if($scope.t==false){$scope.min=201;$scope.t=true;}
    }
    }
    /*function changeq()
    {
    $scope.maxq=20000;
    $scope.minq=0;
    $scope.tq=false;
    if($scope.check6==true)
    {$scope.maxq=0.499;
    if($scope.tq==false){$scope.minq=0;$scope.tq=true;}
    }
    if($scope.check7==true)
    {
      $scope.maxq=.999;
    if($scope.tq==false){$scope.minq=0.5;$scope.tq=true;}
    }
    if($scope.check8==true)
    {
      $scope.maxq=2;
    if($scope.tq==false){$scope.minq=1;$scope.tq=true;}
    }
    if($scope.check9==true)
    {
      $scope.maxq=3;
   if($scope.tq==false){$scope.minq=2;$scope.tq=true;}
    }
    if($scope.checkq0==true)
    {
      $scope.maxq=20000;
    if($scope.tq==false){$scope.minq=3;$scope.tq=true;}
    }
    }*/
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
  
},{
  id: 3,
  label: 'Alphabetical',
  sub: 'name',
  rev:false
  
}
];
$scope.addeditems=[
{ id:0,
  qty:0 ,
  nam:'-',
  w:0 ,
  price:0 ,

}];
$scope.i=-1;
$scope.titems=0;
$scope.add=function(id,qty,name,w,price){
//$scope.itemd=$scope.names1[1];
var j=0,f=0;
if($scope.i==-1)$scope.addeditems.splice(0,1);
for(j=0;j<$scope.addeditems.length;j++)
  if($scope.addeditems[j].id==id)
    {$scope.addeditems[j].qty+=qty;$scope.addeditems[j].price+=price;f=1;$scope.titems=$scope.titems+qty;break;}
  if(!f)
{
$scope.addeditems.push({ id:$scope.i+1,qty: qty,nam:name ,w: w,price: price});
$scope.i++;$scope.titems=$scope.titems+qty;}
$scope.tprice=$scope.tprice+price;
};
$scope.remove=function(y)
{ var p=0;var value;
  for(p=0;p<$scope.addeditems.length;p++)
  {
    if($scope.addeditems[p].id==y)
     { $scope.titems=$scope.titems-$scope.addeditems[p].qty;value=$scope.addeditems.splice(p,1)[0];}
  }
  
  $scope.i--;
  
  if($scope.i==-1){$scope.addeditems.push({ id:0,qty: 0,nam:'-' ,w: 0,price: 0});$scope.tprice=0;}
  else{
  $scope.tprice=$scope.tprice-value.price;}
}
$scope.check=function(x){
  if((((x.price)<=max[0] && (x.price)>=min[0]) || ((x.price)<=max[1] && (x.price)>=min[1]) || ((x.price)<=max[2] && (x.price)>=min[2]) || ((x.price)<=max[3] && (x.price)>=min[3]) || ((x.price)<=max[4] && (x.price)>=min[4])) 
    && (((x.q)<=maxq[0] && (x.q)>=minq[0]) || ((x.q)<=maxq[1] && (x.q)>=minq[1]) || ((x.q)<=maxq[2] && (x.q)>=minq[2]) || ((x.q)<=maxq[3] && (x.q)>=minq[3]) || ((x.q)<=maxq[4] && (x.q)>=minq[4])))
    return true;
  else return false;
}
$scope.tprice=0;
/*$scope.qtyval=[
{id:1,label:'0.5 kg',val:0.5},
{id=2,label:'1 kg',val:1}
];
$scope.q=0.5;
$scope.qty=$scope.qtyval[0];
if($scope.qty.label=='0.5 kg')
$scope.q=0.5;
else if($scope.qty.label=='1 kg')
$scope.q=1; */

$scope.selected =$scope.values[0];
$scope.s='price';
    //var e = document.getElementById("cat");
    //var strUser = e.options[e.selectedIndex].text;
   // if($scope.selected1.label=='Price')
    if($scope.selected.label=='Price')
    $scope.s='price';
    else 
    $scope.s='name';
});