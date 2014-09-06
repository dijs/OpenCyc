'use strict';

var request = require('request');
var _ = require('underscore');
var parseXmlToJson = require('xml2js').parseString;

var openCycServer = 'http://sw.opencyc.org';

var defaultFindOptions = {
	uriType: 'current',
	max: 75,
	includeMatchedText: true,
	isExactMatch: false,
	conceptDetails: 'typical'
};

var stripHtml = function(text) {
	return text.replace(/<(?:.|\n)*?>/gm, '');
};

module.exports.find = function(query, callback) {
	request({
		uri: openCycServer + '/webservices/concept/find',
		qs: _.extend({
			str: query
		}, defaultFindOptions)
	}, function(err, res, body) {
		if (err) {
			callback(err);
		} else {
			parseXmlToJson(body, function(err, data) {
				if (err) {
					callback(err);
				} else {
					callback(null, _.map(data.concepts.concept, function(concept) {
						return {
							id: concept.externalId[0],
							name: concept.cycl[0]._,
							type: concept.conceptType[0].$.type
						};
					}));
				}
			});
		}
	});
};

module.exports.get = function(id, callback) {
	request({
		uri: openCycServer + '/concept/' + id
	}, function(err, res, body) {
		if (err) {
			callback(err);
		} else {
			parseXmlToJson(body, {
				strict: false
			}, function(err, data) {
				if (err) {
					callback(err);
				} else {
					var rdf = data['RDF:RDF'];
					var classId = rdf['OWL:CLASS'][0]['$']['RDF:ABOUT'].toUpperCase();
					var thing = rdf['OWL:THING'];
					callback(null, {
						version: rdf['OWL:ONTOLOGY'][0]['OWL:VERSIONINFO'][0],
						thing: !thing ? null : {
							label: thing[0]['RDFS:LABEL'][0]._,
							comment: stripHtml(thing[0]['RDFS:COMMENT'][0]._)
						},
						subtypes: _.map(rdf['OWL:CLASS'], function(type) {
							return {
								id: type.$['RDF:ABOUT'].toUpperCase(),
								label: type['RDFS:LABEL'][0]._
							};
						}),
						instances: _.map(rdf[classId], function(instance) {
							return {
								id: instance.$['RDF:ABOUT'].toUpperCase(),
								label: instance['RDFS:LABEL'][0]._
							};
						})
					});
				}
			});
		}
	});
};