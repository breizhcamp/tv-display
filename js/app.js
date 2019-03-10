'use strict';

var breizhcampRoom = angular.module('BreizhcampRoom', []);


breizhcampRoom.controller('ScheduleController', function ($scope, $http, $timeout, $filter, $location) {

    $scope.roomByTrack = {
    	'Amphi A': 'Amphi A',
    	'Amphi B': 'Amphi B',
    	'Amphi C': 'Amphi C',
    	'Amphi D': 'Amphi D',
    	'Lab': 'Esp. Lab.',
    	'Hall': 'Hall'
    };
    
    $scope.days = [ '2019-03-20', '2019-03-21', '2019-03-22' ];
    
    $scope.day = $scope.days[$location.search()['day']];

    $scope.updateTime = function() {
		var now = new Date(2019, 2, 21, 11, 20, 0, 0);
		
		//select right day if not defined
		if (!$scope.day) {
			$scope.day = $filter('date')(now, "yyyy-MM-dd");
		}

        $scope.time = $filter('date')(now, "dd/MM - H:mm");
        $scope.timeInSeconds = now.getHours() * 60 + now.getMinutes();

		$scope.onAirTalks = [];
        $scope.talksByRoom = {};
        $scope.nextTalks = [];
        $scope.nextTalksByRoom = {};

        angular.forEach($scope.talks, function(talk) {
        
        	if (!talk.event_start.startsWith($scope.day)) {
        		return;
        	}
        
            if ($scope.isOnAir(talk)) {
                $scope.onAirTalks.push(talk);
                $scope.talksByRoom[$scope.roomByTrack[talk.venue]] = talk;
            }

            if ($scope.isAfter(talk)) {
                $scope.nextTalksByRoom[$scope.roomByTrack[talk.venue]] = talk;
            }
            
        });

        angular.forEach($scope.nextTalksByRoom, function(talk) {
            $scope.nextTalks.push(talk);
        });


        $timeout($scope.updateTime, 60000);
    };

    $scope.isOnAir = function(talk) {
        var startInSeconds = $scope.getTimeInSeconds(talk.event_start);
        var endInSeconds = $scope.getTimeInSeconds(talk.event_end);
        return startInSeconds <= $scope.timeInSeconds && endInSeconds > $scope.timeInSeconds;
    };

    $scope.isAfter = function(talk) {
        var room = $scope.roomByTrack[talk.venue];
        var startInSeconds = $scope.getTimeInSeconds(talk.event_start);
        var afterTime = $scope.timeInSeconds;
        var currentTalk = $scope.talksByRoom[room];
        if (currentTalk) {
            afterTime =  $scope.getTimeInSeconds(currentTalk.event_end);
        }
        var beforeTime = $scope.getTimeInSeconds("T23:59");
        var nextTalk = $scope.nextTalksByRoom[room];
        if (nextTalk) {
            beforeTime = $scope.getTimeInSeconds(nextTalk.event_start);
        }
        return afterTime < startInSeconds && startInSeconds < beforeTime;
    };

    $scope.getTimeInSeconds = function(date) {
        var splits = date.split('T')[1].split(':');
        return parseInt(splits[0]) * 60 + parseInt(splits[1]);
    };

    window.getSchedule = function(schedule) {
        $scope.schedule = schedule;
        $scope.updateTime();
    };

    $http.get("./json/schedule.json").success(function(data) {
        $scope.talks = data;
        $scope.updateTime();
    });

});
