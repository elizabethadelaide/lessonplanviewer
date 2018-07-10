//get json

var dayDict = {1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday"};
//var colDic = ["#FFAF76", "#E8E460", "#69FFB5", "#76A9FF", "#E460E8"];
var colDic = ["#2E112D", "#540032", "#820333", "#C9283E", "#F0433A"];

var app = angular.module('eduApp', ['angular.filter', 'angular.vertilize']);
app.controller('bodyCtl', function($scope, $filter){
    $scope.sheet = [];
    $.getJSON({
      url: "/jsonbody",
      success: function(data){
        $scope.sheet= data;
        $scope.$apply();
      }
    });
  
    $scope.details = [];
  
    $.getJSON({
        url: "/detailsJson",
        success: function(data){
          $scope.details= data;
          $scope.$apply();
          
        }
      });
  
    $.getJSON({
      url: "/homeworkJson",
      success: function(data){
          $scope.homework= data;
          $scope.$apply();
          
        }
    });
  
    $scope.min = function(arr) {
    return $filter('min')
      ($filter('map')(arr, 'ID'));
    }
    
    $scope.weekCollapse = [];
    for (var i = 0; i < 10; i++){
     $scope.weekCollapse[i] = false; 
    }
    $scope.showDay = function(week){
      var show;
      if ($scope.navLocation == 0 || $scope.navLocation == 3){
        show = $scope.weekCollapse[parseInt(week)];
      }
      else{
        show = true;
      }
      return show;
    }
    $scope.show = function(line){
      if ($scope.navLocation == 0){
     var week = parseInt(line.Week);
      return ($scope.weekCollapse[week]);
      }
      else if ($scope.navLocation == 1){
       return true; 
      }
      return false;
    }
    $scope.showCad = function(line){
     if (line.Subject == "AutoCAD" ||
         line.Subject == "3D modeling"){
      return true; 
     }
    return false;
    }
    $scope.showHWLine = function(line){
     if ($scope.getHomework(line.ID).Formulas==""){
       return false;
     }
    return true;
    }
    $scope.toggleWeek = function(week){
      $scope.weekCollapse[parseInt(week)] = !$scope.weekCollapse[parseInt(week)];
      
      console.log("Week clicked", week, $scope.weekCollapse[parseInt(week)]);
    }
    
    $scope.dayBar = function(line){
      if (line != undefined){
        var myDay = parseInt(line.Day);
        var col = colDic[myDay-1];
        var lineWidth = line.Time*6
        return {"border-left": lineWidth + "px solid " + col};
      }
    }
    
    
    $scope.dayStyle = function(day){
     if (day != undefined){
      day = parseInt(day);
      var col = colDic[day-1];
      return {"color": col};
     }
    }
    
    $scope.navLocation = 0;
    
    $scope.navStyle = function(id){
      if ($scope.navLocation == id){
       return {"background": "#A82916"};
      }
      else{
       return {"background": "grey"}; 
      }
    }
    
    $scope.getDetails = function(ID){
      var id = parseInt(ID);
      var details = $scope.details[id-1]; //not the best...
      return details;
    }
    
    $scope.getHomework = function(ID){
      var id = parseInt(ID);
      var details = $scope.homework[id-1];
      return details;
    }
    
    $scope.showDetail = function(detail, key){
      if (key == "Description"){
        return false;    
      }
      if ($scope.navLocation == 0){
        if (detail == ""){
         return false; 
        }
        return true;
      }
    }
    
    $scope.showHomework = function(detail, key){
      if (key=="A"|| key =="B" || key =="C" || key=="D"|| key=="E"){
        if (detail==""){
          return false;
        }
        else{
          return true;
        }
      }
      return false;
      
    }
    
    $scope.showSched = function(){
     return $scope.navLocation == 2; 
    }
    
    $scope.toggleNav = function(id){
     $scope.navLocation = id; 
    }
    
});

app.filter('weekFilter', function(){
  return function(input){
   if (input == ''){
    return("Unsorted week"); 
   }
  else{
     return(input); 
  }
  }
});

app.filter('detailFilter', function(){
  return function(input, k){
    if (k == 'Outcomes'){
      return "Goal: " + input; 
     }
    else if (k == 'Description'){
      return '';
    }
     else{
      return input; 
     }
  }
});



app.filter('dayFilter', function(){
  return function(input){
   if (input == ''){
      return("Unsorted week"); 
   }
   else{
    return dayDict[parseInt(input)];
   }
  }
});

app.filter('lessonHeader', function(){
  return function(input){
   var outStr = input.Subject + " | " + input.Topic + " | " + input.Time;
   if (input.Time == "1"){
    outStr = outStr +  " hr";
   }
   else{
    outStr = outStr + " hrs"; 
   }
    return outStr;
  }
});

app.filter('lessonBody', function(){
  return function(input){
   var outStr = "Instructors: " + input.Instructor + "\n";
   outStr = outStr + input.Type + ": " + input.Topic;
  return outStr;
  }
});

app.filter('schedFilter', function(){
  return function(input){
    var Lizhrs = 0;
    var Chrishrs = 0;
    var Alfrohrs = 0;
    var CNCTAhrs = 0;
    var lizName = "Elizabeth";
    var ChrisName = "Chistina";
    var AlfroName = "Alfrod";
    var CNCTAName = "CNC TA";
    for (var i = 0; i < input.length; i++){
      if (input[i].Instructor.contains(lizName)){
        Lizhrs = Lizhrs + parseInt(input[i].Time);
      }
    }
    return lizName + ": " + Lizhrs;
  }
});

app.directive("math", function() {
    return {
        restrict: "EA",
        controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
            $scope.$watch($attrs.math, function() {
              //console.log($element.get(0));     
              MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
              setTimeout(function(){console.log('resize'); $scope.$digest();}, 3000);
            });
        }]
    };
});

function MyCtrl($scope, $element) {
    $scope.expression = "\\frac{5}{4} \\div \\frac{1}{6}";
}


app.directive('myLengthBar', function() {
  function length(scope, element, attrs){
   var h = element.parent().outerWidth();
   console.log(h);
   element.css('height', h);
  }
  return {
      restrict: "A",
      link: length
  };
});

