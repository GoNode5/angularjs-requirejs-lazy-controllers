angularjs-requirejs-lazy-controllers
====================================

Work in progress. This does not work as expected.

Angular with RequiredJs and Lazy Loading Controllers. Extension of matys84pl / angularjs-requirejs-lazy-controllers but without requiring ng-view on index.html.
https://github.com/matys84pl/angularjs-requirejs-lazy-controllers

I'm trying to set a controller on a dom object at runtime:

Using matys84pl version, it looks like the entire app gets the controller based on route path. It also seems like an ng-view is required somewhere on the DOM. I need to break up the application into sections each controlled by different controllers. Any suggestions on how to get that to work.

I've read that it's frowned upon to mod the dom in the controller so I'm looking for best practice - maybe specify the dom element in routes.js or slight modification to matys84pl's route-config.js to specify the DOM element's ID as in:

routeConfig.config('../partials/view1.html', 'controllers/first', '#someDomElementID')

<pre><code>&lt;div id="ctrl1"&gt;
    &lt;p&gt;{{message}}&lt;/p&gt;
    &lt;a href="#/view1" class="btn"&gt;{{btn1}}&lt;/a&gt;
    &lt;a href="#/view2" class="btn"&gt;{{btn2}}&lt;/a&gt;
&lt;/div&gt;

&lt;div id="ctrl2"&gt;
    &lt;p&gt;{{message}}&lt;/p&gt;
    &lt;a href="#/view1" class="btn"&gt;{{btn1}}&lt;/a&gt;
    &lt;a href="#/view2" class="btn"&gt;{{btn2}}&lt;/a&gt;
&lt;/div&gt;
</code></pre>

<pre><code>// CONTROLLER 1 (first.js)
define([], function () {

    function FirstController($scope) {
        $scope.message = "I'm the 1st controller!";
        $scope.btn1 = "Ctrl1 Btn 1";
        $scope.btn2 = "Ctrl1 Btn 2";
    }

    // One option:
    // Get a reference to div#ctrl1 and apply this controller to it.
    return FirstController;});
</code></pre>

<pre><code>// CONTROLLER 2 (second.js)
define([], function () {

    function SecondController($scope) {
        $scope.message = "I'm the 2nd controller!";
        $scope.btn1 = "Ctrl2 Btn 1";
        $scope.btn2 = "Ctrl2 Btn 2";
    }
     // One option:
     // Get a reference to div#ctrl2 and apply this controller to it.
    return SecondController;});
</code></pre>

<pre><code>// ROUTER (routes.js)
// Option 2 (prefered) is to add the id of the DOM element in the routeConfig. This will require modification of matys84pl's route-config.js
define(['app', 'utils/route-config'], function (app, routeConfig) {

    return app.config(function ($routeProvider) {
        $routeProvider.when('/view1', routeConfig.config('../partials/view1.html', 'controllers/first', 'ctrl1')); //Currently, specifying 'ctrl1' is not supported.
        $routeProvider.when('/view2', routeConfig.config('../partials/view2.html', 'controllers/second', 'ctrl2', ['directives/version'])); //Currently, specifying 'ctrl2' is not supported.

        $routeProvider.otherwise({redirectTo:'/view1'});
    });

    return app;});
</code></pre>

<pre><code>&lt;!-- Expected Output --&gt;
&lt;div id="ctrl1" ng-controller='FirstController'&gt;
    &lt;p&gt;I'm the 1st controller!&lt;/p&gt;
    &lt;a href="#/view1" class="btn"&gt;Ctrl1 Btn 1&lt;/a&gt;
    &lt;a href="#/view2" class="btn"&gt;Ctrl1 Btn 2&lt;/a&gt;
&lt;/div&gt;

&lt;div id="ctrl2" ng-controller='FirstController'&gt;
    &lt;p&gt;I'm the 2nd controller!&lt;/p&gt;
    &lt;a href="#/view1" class="btn"&gt;Ctrl2 Btn 1&lt;/a&gt;
    &lt;a href="#/view2" class="btn"&gt;Ctrl2 Btn 2&lt;/a&gt;
&lt;/div&gt;
</code></pre>
