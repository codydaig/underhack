'use strict';

var expect = require('chai').expect;
var path = require('path');

var _ = require(path.resolve('./underhack.js'));

describe('extend', function(){

  xit('can extend an object with the attributes of another', function(){
    // equal(_.extend({}, {a: 'b'}).a, 'b', 'can extend an object with the attributes of another');
  });

  xit('properties in source override destination', function(){
    // equal(_.extend({a: 'x'}, {a: 'b'}).a, 'b', 'properties in source override destination');
  });

  xit('properties not in source don\'t get overriden', function(){
    // equal(_.extend({x: 'x'}, {a: 'b'}).x, 'x', "properties not in source don't get overriden");
  });

  xit('can extend from multiple source objects', function(){
    // result = _.extend({x: 'x'}, {a: 'a'}, {b: 'b'});
    // deepEqual(result, {x: 'x', a: 'a', b: 'b'}, 'can extend from multiple source objects');
  });

  xit('extending from multiple source objects last property trumps', function(){
    // result = _.extend({x: 'x'}, {a: 'a', x: 2}, {a: 'b'});
    // deepEqual(result, {x: 2, a: 'b'}, 'extending from multiple source objects last property trumps');
  });

  xit('extend copies undefined values', function(){
    // result = _.extend({}, {a: void 0, b: null});
    // deepEqual(_.keys(result), ['a', 'b'], 'extend copies undefined values');
  });

  xit('extend copies all properties from source', function(){
    // var F = function() {};
    // F.prototype = {a: 'b'};
    // var subObj = new F();
    // subObj.c = 'd';
    // deepEqual(_.extend({}, subObj), {a: 'b', c: 'd'}, 'extend copies all properties from source');
  });

  xit('extend does not convert destination object\'s \'in\' properties to \'own\' properties', function(){
    // _.extend(subObj, {});
    // ok(!subObj.hasOwnProperty('a'), "extend does not convert destination object's 'in' properties to 'own' properties");
  });

  xit('', function(){
    // try {
    //   result = {};
    //   _.extend(result, null, void 0, {a: 1});
    // } catch(e) { /* ignored */ }
  });

  xit('should not error on `null` or `undefined` sources', function(){
    // equal(result.a, 1, 'should not error on `null` or `undefined` sources');
  });

  xit('extending null results in null', function(){
    // strictEqual(_.extend(null, {a: 1}), null, 'extending null results in null');
  });

  xit('extending undefined results in undefined', function(){
    // strictEqual(_.extend(void 0, {a: 1}), void 0, 'extending undefined results in undefined');
  });

});
