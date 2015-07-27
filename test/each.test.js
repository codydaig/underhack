'use strict';

var expect = require('chai').expect;
var path = require('path');

var _ = require(path.resolve('./underhack.js'));

describe('each', function(){

  it('each iterators provide value and iteration count', function(){
    _.each([1, 2, 3], function(num, i) {
      expect(num).to.equal(i + 1);
    });
  });

  it('context object property accessed', function(){
    var answers = [];
    _.each([1, 2, 3], function(num){ answers.push(num * this.multiplier); }, {multiplier: 5});
    expect(answers).to.eql([5, 10, 15]);
  });

  it('aliased as "forEach"', function(){
    var answers = [];
    _.each([1, 2, 3], function(num){ answers.push(num); });
    expect(answers).to.eql([1, 2, 3]);
  });

  it('iterating over objects works, and ignores the object prototype.', function(){
    var answers = [];
    var obj = {one: 1, two: 2, three: 3};
    obj.constructor.prototype.four = 4;
    _.each(obj, function(value, key){ answers.push(key); });
    expect(answers).to.eql(['one', 'two', 'three']);
    delete obj.constructor.prototype.four;
  });

  it('the fun should be called only 3 times', function(){
    // ensure the each function is JITed
    //_(1000).times(function() { _.each([], function(){}); });
    var count = 0;
    var obj = {1: 'foo', 2: 'bar', 3: 'baz'};
    _.each(obj, function(){ count++; });
    expect(count).to.equal(3);
  });

  it('can reference the original collection from inside the iterator', function(){
    var answer = null;
    _.each([1, 2, 3], function(num, index, arr){ 
      if (_.include(arr, num)) answer = true; 
    });
    expect(answer).to.equal(true);
  });

  it('handles a null properly', function(){
    var answers = 0;
    _.each(null, function(){ ++answers; });
    expect(answers).to.equal(0);
  });

  it('should not throw an error', function(){
    var testFunc = function(){
      _.each(false, function(){});
    };
    expect(testFunc).to.not.throw();
  });

  it('should not change the input', function(){
    var a = [1, 2, 3];
    expect(_.each(a, function(){})).to.equal(a);
    expect(_.each(null, function(){})).to.equal(null);
  });

});