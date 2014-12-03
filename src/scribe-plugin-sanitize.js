define("scribe-plugin-sanitize", ["sanitize"], function(Sanitize) {
  return function(options) {
    options = options || {};
    var elements = options.elements || ['ul', 'ol', 'li', 'b', 'i', 'p', 'div', 'br', 'img', 'a'];
    var attributes = options.attributes || { img: ['src'], a: ['href'] };
    var transformers = options.transformers || [];

    transformers.push(function(options) {
      if (options.node_name == "em" && options.node.className == "scribe-marker") {
        return {whitelist: true, attr_whitelist: ["class"]};
      }
    });

    return function(scribe) {
      var sanitize = new Sanitize({ elements: elements, attributes: attributes, transformers: transformers });

      scribe.registerHTMLFormatter('sanitize', function(html) {
        var div = document.createElement("div");
        var divFragment = document.createElement('div');

        div.innerHTML = html;
        divFragment.appendChild(sanitize.clean_node(div));

        return divFragment.innerHTML;
      });
    };
  };
});
