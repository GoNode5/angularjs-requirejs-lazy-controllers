/**
 * Created with IntelliJ IDEA.
 * User: Mateusz
 * Date: 15.11.12
 * Time: 22:38
 */

'use strict';

define([], function () {

    function FirstController($scope) {
        $scope.message = "I'm the 1st controller!";
        $scope.btn1 = "Text 1!";
        $scope.btn2 = "Text 2!";
    }
    
    return FirstController;
});