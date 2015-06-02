'use strict';

/**
 * Utility class for function parameter-related operations
 */
module.exports = function() {

  /**
   * Checks that the supplied parameter is defined and (optionally) matches the expected type.
   * If any assertion fails an Error is thrown.
   *
   * @param {string} name - Parameter name
   * @param {mixed} param - The parameter value to check
   * @param {string} [type] - The expected type (using typeof)
   */
  var required = function(name, param, type) {
    var error = false;
    if(param === undefined || param === null) {
      error = capitalize(name) + ' is a required parameter!';
    }
    else if(type && (typeof param).toLowerCase() !== (type).toLowerCase()) {
      error = capitalize(name) + ' is a required ' + capitalize(type) + ' parameter!';
    }
    if(error) {
      throw Error(error);
    }
    return this;
  };

  /**
   * Capitalizes the supplied string.
   *
   * @param {string} string
   */
  var capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Public API
  return {
    required: required
  }

}();