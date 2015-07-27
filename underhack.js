'use strict';

var _ = {};

/*************************************************************************
 * Constants
 */

/**
 * The Version of underhack
 */
_.VERSION = '0.0.1';

/**
 * Set the Maximum array size
 */
_.MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

/**
 * Shortcut to the native Object.keys
 */
_.nativeKeys = Object.keys;

/*************************************************************************
 * Functions
 */

_.property = function(key) {
  return function(obj) {
    return obj == null ? void 0 : obj[key];
  };
};

_.isArrayLike = function(collection) {
  var length = _.getLength(collection);
  return typeof length == 'number' && length >= 0 && length <= _.MAX_ARRAY_INDEX;
};

_.isObject = function(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
};

_.optimizeCb = function(func, context, argCount) {
  if (context === void 0) return func;
  switch (argCount == null ? 3 : argCount) {
    case 1: return function(value) {
      return func.call(context, value);
    };
    // The 2-parameter case has been omitted only because no current consumers
    // made use of it.
    case 3: return function(value, index, collection) {
      return func.call(context, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(context, accumulator, value, index, collection);
    };
  }
  return function() {
    return func.apply(context, arguments);
  };
};

_.each = function(obj, iteratee, context) {
  iteratee = _.optimizeCb(iteratee, context);
  var i, length;
  if (_.isArrayLike(obj)) {
    for (i = 0, length = obj.length; i < length; i++) {
      iteratee(obj[i], i, obj);
    }
  } else {
    var keys = _.keys(obj);
    for (i = 0, length = keys.length; i < length; i++) {
      iteratee(obj[keys[i]], keys[i], obj);
    }
  }
  return obj;
};

_.keys = function(obj) {
  if (!_.isObject(obj)) return [];
  if (_.nativeKeys) return _.nativeKeys(obj);
  var keys = [];
  for (var key in obj) if (_.has(obj, key)) keys.push(key);
  // Ahem, IE < 9.
  if (hasEnumBug) collectNonEnumProps(obj, keys);
  return keys;
};

_.allKeys = function(obj) {
  if (!_.isObject(obj)) return [];
  var keys = [];
  for (var key in obj) keys.push(key);
  // Ahem, IE < 9.
  if (_.hasEnumBug) collectNonEnumProps(obj, keys);
  return keys;
};

_.include = function(obj, item, fromIndex, guard) {
 if (!_.isArrayLike(obj)) obj = _.values(obj);
 if (typeof fromIndex != 'number' || guard) fromIndex = 0;
 return _.indexOf(obj, item, fromIndex) >= 0;
};

_.createIndexFinder = function(dir, predicateFind, sortedIndex) {
  return function(array, item, idx) {
    var i = 0, length = _.getLength(array);
    if (typeof idx == 'number') {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(idx + length, i);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    } else if (sortedIndex && idx && length) {
      idx = sortedIndex(array, item);
      return array[idx] === item ? idx : -1;
    }
    if (item !== item) {
      idx = predicateFind(slice.call(array, i, length), _.isNaN);
      return idx >= 0 ? idx + i : -1;
    }
    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item) return idx;
    }
    return -1;
  };
};

_.createPredicateIndexFinder = function(dir) {
  return function(array, predicate, context) {
    predicate = cb(predicate, context);
    var length = _.getLength(array);
    var index = dir > 0 ? 0 : length - 1;
    for (; index >= 0 && index < length; index += dir) {
      if (predicate(array[index], index, array)) return index;
    }
    return -1;
  };
};

_.createAssigner = function(keysFunc, undefinedOnly) {
  return function(obj) {
    var length = arguments.length;
    if (length < 2 || obj == null) return obj;
    for (var index = 1; index < length; index++) {
      var source = arguments[index],
          keys = keysFunc(source),
          l = keys.length;
      for (var i = 0; i < l; i++) {
        var key = keys[i];
        if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
      }
    }
    return obj;
  };
};

_.extend = _.createAssigner(_.allKeys);

_.findIndex = _.createPredicateIndexFinder(1);

_.getLength = _.property('length');

_.hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');

_.indexOf = _.createIndexFinder(1, _.findIndex, _.sortedIndex);

/*************************************************************************
 * Aliases
 */

/**
 * _.contains
 * @alias _.include
 */
_.contains = _.include;

/**
 * _.includes
 * @alias _.include
 */
_.includes = _.include;

/**
 * _.forEach
 * @alias _.each
 */
_.forEach = _.each;

/*************************************************************************
 * Export the _ object.
 */
module.exports = exports = _;