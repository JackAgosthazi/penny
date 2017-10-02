'use strict';

penny.controller('StatsCtrl', function MainCtrl($scope, $rootScope, $location, $firebaseArray) {
	
	var eventsUrl = `https://penny-for-your-thought.firebaseio.com/users/${currentUid}/events`;
	var eventsRef = new Firebase(eventsUrl);
	var eventsArray = $firebaseArray(eventsRef);

	eventsArray.$loaded()
		.then(function (data) {
			init(data);
		});
	
	function init(events){
		var stats = {},
			now = moment(),
			thisYear = now.year(),
			thisMonth = now.month(),
			thisWeek = now.week(),
			today = now.day();
		
		// total
		stats.totalPositive = _.filter(events, { 'type': 'positive'}).length;
		stats.totalNegative = _.filter(events, { 'type': 'negative'}).length;
		
		// this month
		let thisMonthEvents = _.filter(events, function(event){
			if(moment(event.time).year() == thisYear
				&& moment(event.time).month() == thisMonth){
				return true;
			}
		});
		stats.thisMonthPositive = _.filter(thisMonthEvents, { 'type': 'positive'}).length;
		stats.thisMonthNegative = _.filter(thisMonthEvents, { 'type': 'negative'}).length;
		
		// this week
		let thisWeekEvents = _.filter(events, function(event){
			if(moment(event.time).year() == thisYear
				&& moment(event.time).week() == thisWeek){
				return true;
			}
		});
		stats.thisWeekPositive = _.filter(thisWeekEvents, { 'type': 'positive'}).length;
		stats.thisWeekNegative = _.filter(thisWeekEvents, { 'type': 'negative'}).length;
		
		// today
		let todayEvents = _.filter(events, function(event){
			if(moment(event.time).year() == thisYear
				&& moment(event.time).week() == thisWeek
				&& moment(event.time).day() == today){
				return true;
			}
		});
		stats.todayPositive = _.filter(todayEvents, { 'type': 'positive'}).length;
		stats.todayNegative = _.filter(todayEvents, { 'type': 'negative'}).length;
		
		// by categories
		stats.totalMap = getCategoryData(_.filter(events, {'type': 'negative'}));
		stats.thisMonthMap = getCategoryData(_.filter(thisMonthEvents, {'type': 'negative'}));
		stats.thisWeekMap = getCategoryData(_.filter(thisWeekEvents, {'type': 'negative'}));
		stats.todayMap = getCategoryData(_.filter(todayEvents, {'type': 'negative'}));
		console.log('stats.todayMap: ', stats.todayMap)
		$scope.stats = stats;
	}
	
	function getCategoryData(events){
		const categoryMap = _.reduce(events, (result, item) => {
			if (result[item.name]) {
				result[item.name]++;
			} else {
				result[item.name] = 1;
			}
			return result;
		}, {});

		const caregoryArr = _.map(categoryMap, (count, name) => {return {count, name}});
		
		return _.orderBy(caregoryArr, 'count', 'desc');
	}
});
