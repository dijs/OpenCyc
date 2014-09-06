'use strict';
/*global describe, it */

require('should');

var cyc = require(__dirname + '/index');

describe('OpenCyc', function() {
	it('should find concepts', function(done) {
		cyc.find('batman', function(err, concepts) {
			concepts.length.should.be.greaterThan(20);
			concepts.should.containEql({
				id: 'Mx4rvlbjDJwpEbGdrcN5Y29ycA',
				name: 'Batman',
				type: 'Individual'
			}).and.containEql({
				id: 'Mx4rwRRVd5wpEbGdrcN5Y29ycA',
				name: 'Batman-MovieSeries',
				type: 'Individual'
			});
			done();
		});
	});
	it('should obtain concept', function(done) {
		cyc.get('Mx4rwRRVd5wpEbGdrcN5Y29ycA', function(err, concept){
			concept.label.should.equal('the Batman movie series');
			concept.classes.should.containEql('movie series product');
			done();
		});
	});
});