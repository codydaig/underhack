'use strict';

var expect = require('chai').expect;
var path = require('path');

var _ = require(path.resolve('./underhack.js'));

describe('extend', function(){

  it('can extend an object with the attributes of another', function(){
    // equal(_.extend({}, {a: 'b'}).a, 'b', 'can extend an object with the attributes of another');
    expect(_.extend({}, {a: 'b'}).a).to.equal('b');
  });

  it('properties in source override destination', function(){
    // equal(_.extend({a: 'x'}, {a: 'b'}).a, 'b', 'properties in source override destination');
    expect(_.extend({a: 'x'}, {a: 'b'}).a).to.equal('b');
  });

  it('properties not in source don\'t get overriden', function(){
    // equal(_.extend({x: 'x'}, {a: 'b'}).x, 'x', "properties not in source don't get overriden");
    expect(_.extend({x: 'x'}, {a: 'b'}).x).to.equal('x');
  });

  it('can extend from multiple source objects', function(){
    var result = _.extend({x: 'x'}, {a: 'a'}, {b: 'b'});
    // deepEqual(result, {x: 'x', a: 'a', b: 'b'}, 'can extend from multiple source objects');
    expect(result).to.eql({x: 'x', a: 'a', b: 'b'});
  });

  it('extending from multiple source objects last property trumps', function(){
    var result = _.extend({x: 'x'}, {a: 'a', x: 2}, {a: 'b'});
    // deepEqual(result, {x: 2, a: 'b'}, 'extending from multiple source objects last property trumps');
    expect(result).to.eql({x: 2, a: 'b'});
  });

  it('extend copies undefined values', function(){
    var result = _.extend({}, {a: void 0, b: null});
    // deepEqual(_.keys(result), ['a', 'b'], 'extend copies undefined values');
    expect(_.keys(result)).to.eql(['a', 'b']);
  });

  it('extend copies all properties from source', function(){
    var F = function() {};
    F.prototype = {a: 'b'};
    var subObj = new F();
    subObj.c = 'd';
    // deepEqual(_.extend({}, subObj), {a: 'b', c: 'd'}, 'extend copies all properties from source');
    expect(_.extend({}, subObj)).to.eql({a: 'b', c: 'd'});
  });

  it('extend does not convert destination object\'s \'in\' properties to \'own\' properties', function(){
    var F = function() {};
    F.prototype = {a: 'b'};
    var subObj = new F();
    subObj.c = 'd';
    _.extend(subObj, {});
    // ok(!subObj.hasOwnProperty('a'), "extend does not convert destination object's 'in' properties to 'own' properties");
    expect(subObj.hasOwnProperty('a')).to.equal(false);
  });

  it('should not error on `null` or `undefined` sources', function(){
    var result = {};
    var testFunc = function(){
      _.extend(result, null, void 0, {a: 1});
    };
    expect(testFunc).to.not.throw();
    // equal(result.a, 1, 'should not error on `null` or `undefined` sources');
    expect(result.a).to.equal(1);
  });

  it('extending null results in null', function(){
    // strictEqual(_.extend(null, {a: 1}), null, 'extending null results in null');
    expect(_.extend(null, {a: 1})).to.equal(null);
  });

  it('extending undefined results in undefined', function(){
    // strictEqual(_.extend(void 0, {a: 1}), void 0, 'extending undefined results in undefined');
    expect(_.extend(void 0, {a: 1})).to.equal(void 0);
  });

});
