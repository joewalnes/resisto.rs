// Resistor calculator.
// -Joe Walnes
// See resistors-test.html


var resistors = {};

// These hex codes came from
// http://en.wikipedia.org/wiki/Electronic_color_code
resistors.digitsToColors = {
  '-2': {hex: '#c0c0c0', label: '#000', name: 'silver',              multiplier: '0.01'},
  '-1': {hex: '#cfb53b', label: '#000', name: 'gold'  ,              multiplier: '0.1'},
  '0' : {hex: '#000000', label: '#fff', name: 'black' , figure: '0'},
  '1' : {hex: '#964b00', label: '#fff', name: 'brown' , figure: '1', multiplier: '10'},
  '2' : {hex: '#ff0000', label: '#fff', name: 'red'   , figure: '2', multiplier: '100'},
  '3' : {hex: '#ffa500', label: '#000', name: 'orange', figure: '3', multiplier: '1K'},
  '4' : {hex: '#ffff00', label: '#000', name: 'yellow', figure: '4', multiplier: '10K'},
  '5' : {hex: '#9acd32', label: '#000', name: 'green' , figure: '5', multiplier: '100K'},
  '6' : {hex: '#6495ed', label: '#000', name: 'blue'  , figure: '6', multiplier: '1M'},
  '7' : {hex: '#ee82ee', label: '#000', name: 'purple', figure: '7', multiplier: '10M'},
  '8' : {hex: '#a0a0a0', label: '#000', name: 'gray'  , figure: '8', multiplier: '100M'},
  '9' : {hex: '#ffffff', label: '#000', name: 'white' , figure: '9', multiplier: '1000M'}
};

/**
 * Main conversion function.
 *
 * Given a string '4.7k ohms', will return:
 * {
 *   value: 4700,
 *   formatted: '4.7K',
 *   colors5: [
 *     {hex: '#ffff00', label: '#000', name: 'yellow'},
 *     {hex: '#ee82ee', label: '#000', name: 'purple'},
 *     {hex: '#000000', label: '#fff', name: 'black'},
 *     {hex: '#964b00', label: '#fff', name: 'brown'},
 *   ],
 *   colors4: [
 *     {hex: '#ffff00', label: '#000', name: 'yellow'},
 *     {hex: '#ee82ee', label: '#000', name: 'purple'},
 *     {hex: '#ff0000', label: '#fff', name: 'red'},
 *   ]
 * }
 */
resistors.query = function(input) {
  input = input.replace(/ +?/g, '')
               .replace(/ohm[s]?/, '')
               .replace(/\u2126/, '')
               .replace(/\.$/, '');
  var value = this.parseValue(input);
  if (value !== null) {
    value = this.roundToSignificantPlaces(value, 3);
    if ((value <= 99900000000 && value >= 1) || value === 0) {
      var colors5 = this.numberTo5ColorDigits(value);
      var colors4 = this.numberTo4ColorDigits(value);
      var self = this;
      return {
        value: value,
        formatted: this.formatValue(value),
        colors5: colors5.map(function(d) { return self.digitsToColors[d] }),
        colors4: colors4.map(function(d) { return self.digitsToColors[d] }),
      };
    }
  }
  return null;
};

/**
 * Given ohm rating as string (e.g. 3.2m or 3M2), return
 * integer value (e.g. 3200000).
 */
resistors.parseValue = function(input) {
  var multiplier = 1;
  var match;
  if (match = input.match(/^(\d+)(\.(\d+))?([km])?$/i)) {
    // e.g. 123, 1.23, 1M, 1.23M
    var unit = match[4];
    if (unit) {
      if (unit == 'k' || unit == 'K') {
        multiplier = 1000;
      }
      if (unit == 'm' || unit == 'M') {
        multiplier = 1000000;
      }
    }
    return (match[1] + '.' + (match[3] || 0)) * multiplier;
  } else if (match = input.match(/^(\d+)([km])(\d+)$/i)) {
    // e.g. 12K3
    var unit = match[2];
    if (unit) {
      if (unit == 'k' || unit == 'K') {
        multiplier = 1000;
      }
      if (unit == 'm' || unit == 'M') {
        multiplier = 1000000;
      }
    }
    return (match[1] + '.' + (match[3] || 0)) * multiplier;
  } else {
    return null;
  }
};

/**
 * Round a value to significant places.
 * e.g. (123456789, 3) -> 123000000)
 *     (0.0045678, 3) -> 0.00457)
 */
resistors.roundToSignificantPlaces = function(value, significant) {
  if (!value) {
    return 0;
  }
  var nearest = Math.pow(10, Math.floor(Math.log(Math.abs(value)) / Math.log(10)) - (significant - 1));
  return Math.round(value / nearest) * nearest;
};

/**
 * Given ohm rating as integer (e.g. 470000), return
 * array of color digits (e.g. 4, 7, 0, 3). See digitsTo_Colors.
 */
resistors.numberTo5ColorDigits = function(value) {
  if (!value) {
    return [0, 0, 0, 0]; // Special case
  }
  var precision = 5;
  var digits = (Math.floor(value * 100 * Math.pow(10, precision)) / Math.pow(10, precision)).toString();
  function getDigit(digits, i) {
    var d = parseInt(digits[i]);
    return isNaN(d) ? 0 : d;
  }
  return [
    getDigit(digits, 0),
    getDigit(digits, 1),
    getDigit(digits, 2),
    digits.length - 5];
};

/**
 * Given ohm rating as integer (e.g. 470000), return
 * array of color digits (e.g. 4, 7, 0, 3). See digitsTo_Colors.
 */
resistors.numberTo4ColorDigits = function(value) {
  if (!value) {
    return [0, 0, 0]; // Special case
  }
  var precision = 5;
  var digits = (Math.floor(value * 100 * Math.pow(10, precision)) / Math.pow(10, precision)).toString();
  function getDigit(digits, i) {
    var d = parseInt(digits[i]);
    return isNaN(d) ? 0 : d;
  }
  return [
    getDigit(digits, 0),
    getDigit(digits, 1),
    digits.length - 4];
};

/**
 * Given a numeric value, format it like '3.2M' etc.
 */
resistors.formatValue = function(value) {
  if (value >= 1000000) {
    return (value / 1000000) + 'M';
  } else if (value >= 1000) {
    return (value / 1000) + 'K';
  } else {
    return value.toString();
  }
};
