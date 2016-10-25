/**
 * @param {string} html HTML representing a single element
 * @returns {element}
 */
function htmlToElement(html) {
  var template = document.createElement('template');
  template.insertAdjacentHTML('beforeend', html);
  return template.firstChild;
}

/**
 * @param {string} src
 * @returns {void}
 */
function loadDOMResource(src) {
  var ajax = new XMLHttpRequest();

  ajax.onload = function() {
    var element = htmlToElement(ajax.responseText);
    element.style.cssText = 'height: 0; width: 0; position: absolute; overflow: hidden;';
    document.body.insertBefore(element, document.body.firstChild);
  };

  ajax.onerror = function(error) {
    throw new Error(`The resource ${error.target.src} is not accessible.`);
  };

  ajax.open('GET', src, true);
  ajax.send();
}

module.exports = {
  loadDOMResource: loadDOMResource
};