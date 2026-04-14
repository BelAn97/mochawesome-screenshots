var Handlebars = require("handlebars");
 Handlebars.registerPartial("_navMenu", Handlebars.template({"0":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = "";

  stack1 = ((helper = (helper = lookupProperty(helpers,"suites") || (depth0 != null ? lookupProperty(depth0,"suites") : depth0)) != null ? helper : container.hooks.helperMissing),(options={"name":"suites","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":2},"end":{"line":4,"column":13}}}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!lookupProperty(helpers,"suites")) { stack1 = container.hooks.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    "
    + ((stack1 = container.invokePartial(lookupProperty(partials,"_navMenu"),depth0,{"name":"_navMenu","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.hooks.blockHelperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = 
  "<li class=\"nav-menu-item\">\n    <a href=\"#"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"uuid") || (depth0 != null ? lookupProperty(depth0,"uuid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uuid","hash":{},"data":data,"loc":{"start":{"line":8,"column":14},"end":{"line":8,"column":22}}}) : helper)))
    + "\" class=\"nav-menu-item-link";
  stack1 = ((helper = (helper = lookupProperty(helpers,"hasTests") || (depth0 != null ? lookupProperty(depth0,"hasTests") : depth0)) != null ? helper : alias2),(options={"name":"hasTests","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":49},"end":{"line":8,"column":335}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasTests")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">"
    + ((stack1 = (lookupProperty(helpers,"isBlank")||(depth0 && lookupProperty(depth0,"isBlank"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"title") : depth0),{"name":"isBlank","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":8,"column":337},"end":{"line":8,"column":392}}})) != null ? stack1 : "")
    + "</a>\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"suites") || (depth0 != null ? lookupProperty(depth0,"suites") : depth0)) != null ? helper : alias2),(options={"name":"suites","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":4},"end":{"line":13,"column":15}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"suites")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.hooks.blockHelperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = "";

  stack1 = ((helper = (helper = lookupProperty(helpers,"hasFailures") || (depth0 != null ? lookupProperty(depth0,"hasFailures") : depth0)) != null ? helper : alias2),(options={"name":"hasFailures","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":62},"end":{"line":8,"column":107}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasFailures")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = lookupProperty(helpers,"hasFailures") || (depth0 != null ? lookupProperty(depth0,"hasFailures") : depth0)) != null ? helper : alias2),(options={"name":"hasFailures","hash":{},"fn":container.noop,"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":8,"column":107},"end":{"line":8,"column":322}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasFailures")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"4":function(container,depth0,helpers,partials,data) {
    return " has-failures";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.hooks.blockHelperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = "";

  stack1 = ((helper = (helper = lookupProperty(helpers,"hasPending") || (depth0 != null ? lookupProperty(depth0,"hasPending") : depth0)) != null ? helper : alias2),(options={"name":"hasPending","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":123},"end":{"line":8,"column":165}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasPending")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = lookupProperty(helpers,"hasPending") || (depth0 != null ? lookupProperty(depth0,"hasPending") : depth0)) != null ? helper : alias2),(options={"name":"hasPending","hash":{},"fn":container.noop,"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":8,"column":165},"end":{"line":8,"column":306}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasPending")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"6":function(container,depth0,helpers,partials,data) {
    return " has-pending";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.hooks.blockHelperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = "";

  stack1 = ((helper = (helper = lookupProperty(helpers,"hasSkipped") || (depth0 != null ? lookupProperty(depth0,"hasSkipped") : depth0)) != null ? helper : alias2),(options={"name":"hasSkipped","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":180},"end":{"line":8,"column":222}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasSkipped")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = lookupProperty(helpers,"hasSkipped") || (depth0 != null ? lookupProperty(depth0,"hasSkipped") : depth0)) != null ? helper : alias2),(options={"name":"hasSkipped","hash":{},"fn":container.noop,"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":8,"column":222},"end":{"line":8,"column":291}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasSkipped")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"8":function(container,depth0,helpers,partials,data) {
    return " has-skipped";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  stack1 = ((helper = (helper = lookupProperty(helpers,"hasPasses") || (depth0 != null ? lookupProperty(depth0,"hasPasses") : depth0)) != null ? helper : container.hooks.helperMissing),(options={"name":"hasPasses","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":237},"end":{"line":8,"column":276}}}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!lookupProperty(helpers,"hasPasses")) { stack1 = container.hooks.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { return stack1; }
  else { return ''; }
},"10":function(container,depth0,helpers,partials,data) {
    return " has-passes";
},"11":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"uuid") || (depth0 != null ? lookupProperty(depth0,"uuid") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"uuid","hash":{},"data":data,"loc":{"start":{"line":8,"column":355},"end":{"line":8,"column":363}}}) : helper)));
},"12":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data,"loc":{"start":{"line":8,"column":371},"end":{"line":8,"column":380}}}) : helper)));
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <ul class=\"list-unstyled sub-menu\">\n        "
    + ((stack1 = container.invokePartial(lookupProperty(partials,"_navMenu"),depth0,{"name":"_navMenu","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "      </ul>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.hooks.blockHelperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = "";

  stack1 = ((helper = (helper = lookupProperty(helpers,"rootEmpty") || (depth0 != null ? lookupProperty(depth0,"rootEmpty") : depth0)) != null ? helper : alias2),(options={"name":"rootEmpty","hash":{},"fn":container.program(0, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":5,"column":14}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"rootEmpty")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = lookupProperty(helpers,"rootEmpty") || (depth0 != null ? lookupProperty(depth0,"rootEmpty") : depth0)) != null ? helper : alias2),(options={"name":"rootEmpty","hash":{},"fn":container.noop,"inverse":container.program(2, data, 0),"data":data,"loc":{"start":{"line":6,"column":0},"end":{"line":15,"column":14}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"rootEmpty")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"usePartial":true,"useData":true}));
exports["mochawesome"] = Handlebars.template({"0":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<style>"
    + ((stack1 = (lookupProperty(helpers,"inlineAsset")||(depth0 && lookupProperty(depth0,"inlineAsset"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"styles",{"name":"inlineAsset","hash":{},"data":data,"loc":{"start":{"line":8,"column":28},"end":{"line":8,"column":54}}})) != null ? stack1 : "")
    + "</style>";
},"1":function(container,depth0,helpers,partials,data) {
    return "<link rel=\"stylesheet\" href=\"css/mochawesome.css\">";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"_quickSummary"),depth0,{"name":"_quickSummary","data":data,"indent":"              ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"_summary"),depth0,{"name":"_summary","data":data,"indent":"          ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.hooks.blockHelperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = "";

  stack1 = ((helper = (helper = lookupProperty(helpers,"hasOther") || (depth0 != null ? lookupProperty(depth0,"hasOther") : depth0)) != null ? helper : alias2),(options={"name":"hasOther","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":35},"end":{"line":39,"column":78}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasOther")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = lookupProperty(helpers,"hasSkipped") || (depth0 != null ? lookupProperty(depth0,"hasSkipped") : depth0)) != null ? helper : alias2),(options={"name":"hasSkipped","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":78},"end":{"line":39,"column":126}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasSkipped")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"5":function(container,depth0,helpers,partials,data) {
    return " has-failed-hooks";
},"6":function(container,depth0,helpers,partials,data) {
    return " has-skipped-tests";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"_statusbar"),depth0,{"name":"_statusbar","data":data,"indent":"          ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"_suite"),depth0,{"name":"_suite","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"_navMenu"),depth0,{"name":"_navMenu","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <script type=\"text/javascript\">"
    + ((stack1 = (lookupProperty(helpers,"inlineAsset")||(depth0 && lookupProperty(depth0,"inlineAsset"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"scripts",{"name":"inlineAsset","hash":{},"data":data,"loc":{"start":{"line":75,"column":35},"end":{"line":75,"column":62}}})) != null ? stack1 : "")
    + "</script>\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "    <script src=\"js/vendor.js\"></script>\n    <script src=\"js/mochawesome.js\"></script>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.hooks.blockHelperMissing, alias5=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = 
  "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <title>Mochawesome Report Card</title>\n    ";
  stack1 = ((helper = (helper = lookupProperty(helpers,"inlineAssets") || (depth0 != null ? lookupProperty(depth0,"inlineAssets") : depth0)) != null ? helper : alias2),(options={"name":"inlineAssets","hash":{},"fn":container.program(0, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":8,"column":79}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"inlineAssets")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = ((helper = (helper = lookupProperty(helpers,"inlineAssets") || (depth0 != null ? lookupProperty(depth0,"inlineAssets") : depth0)) != null ? helper : alias2),(options={"name":"inlineAssets","hash":{},"fn":container.noop,"inverse":container.program(1, data, 0),"data":data,"loc":{"start":{"line":9,"column":4},"end":{"line":9,"column":88}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"inlineAssets")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  </head>\n  <body>\n\n    <!-- NAVBAR -->\n    <div class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n      <div class=\"container\">\n        <div class=\"report-info-cnt\">\n          <h1 class=\"report-title\">"
    + alias5(((helper = (helper = lookupProperty(helpers,"reportTitle") || (depth0 != null ? lookupProperty(depth0,"reportTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reportTitle","hash":{},"data":data,"loc":{"start":{"line":17,"column":35},"end":{"line":17,"column":50}}}) : helper)))
    + "</h1>\n          <h3 class=\"report-date\">"
    + alias5((lookupProperty(helpers,"dateFormat")||(depth0 && lookupProperty(depth0,"dateFormat"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? lookupProperty(stack1,"end") : stack1),"dddd, MMMM D YYYY, hh:mma",{"name":"dateFormat","hash":{},"data":data,"loc":{"start":{"line":18,"column":34},"end":{"line":18,"column":86}}}))
    + "</h3>\n        </div>\n        <div class=\"nav-right\">\n          <div class=\"quick-summary-cnt\">\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"stats") || (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? helper : alias2),(options={"name":"stats","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":12},"end":{"line":24,"column":22}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"stats")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "          </div>\n          <button class=\"nav-menu-btn open-menu\"><i class=\"icon-menu\"></i></button>\n        </div>\n      </div>\n    </div>\n\n    <!-- Report Summary -->\n    <div class=\"summary\">\n      <div class=\"container\">\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"stats") || (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? helper : alias2),(options={"name":"stats","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":34,"column":8},"end":{"line":36,"column":18}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"stats")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "      </div>\n    </div>\n    <div class=\"statusbar";
  stack1 = ((helper = (helper = lookupProperty(helpers,"stats") || (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? helper : alias2),(options={"name":"stats","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":25},"end":{"line":39,"column":136}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"stats")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\n      <div class=\"container\">\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"stats") || (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? helper : alias2),(options={"name":"stats","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":41,"column":8},"end":{"line":43,"column":18}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"stats")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "      </div>\n    </div>\n\n    <!-- Suites -->\n    <div class=\"details container\">\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"suites") || (depth0 != null ? lookupProperty(depth0,"suites") : depth0)) != null ? helper : alias2),(options={"name":"suites","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":49,"column":6},"end":{"line":51,"column":17}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"suites")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n\n    <footer>\n      <div class=\"container\">\n        <p>Report generated by <a href=\"http://adamgruber.github.io/mochawesome/\" target=\"_blank\">mochawesome</a>.<br>Designed and built by <a href=\"https://github.com/adamgruber\" target=\"_blank\">adamgruber</a>. &copy;"
    + alias5(((helper = (helper = lookupProperty(helpers,"copyrightYear") || (depth0 != null ? lookupProperty(depth0,"copyrightYear") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"copyrightYear","hash":{},"data":data,"loc":{"start":{"line":56,"column":218},"end":{"line":56,"column":235}}}) : helper)))
    + ".</p>\n      </div>\n    </footer>\n\n    <!-- Nav Menu -->\n    <div class=\"nav-menu-wrap\">\n      <div class=\"menu-overlay close-menu\"></div>\n      <nav class=\"menu\">\n        <button class=\"nav-menu-btn close-menu\"><i class=\"icon-failed\"></i></button>\n        <ul class=\"list-unstyled main-menu\">\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"suites") || (depth0 != null ? lookupProperty(depth0,"suites") : depth0)) != null ? helper : alias2),(options={"name":"suites","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":66,"column":10},"end":{"line":68,"column":21}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"suites")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </ul>\n      </nav>\n    </div>\n\n    <!-- Scripts -->\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"inlineAssets") || (depth0 != null ? lookupProperty(depth0,"inlineAssets") : depth0)) != null ? helper : alias2),(options={"name":"inlineAssets","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":74,"column":4},"end":{"line":76,"column":21}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"inlineAssets")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = lookupProperty(helpers,"inlineAssets") || (depth0 != null ? lookupProperty(depth0,"inlineAssets") : depth0)) != null ? helper : alias2),(options={"name":"inlineAssets","hash":{},"fn":container.noop,"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":77,"column":4},"end":{"line":80,"column":21}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"inlineAssets")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </body>\n</html>\n";
},"usePartial":true,"useData":true});
/*global Handlebars, __dirname*/
var moment = require('moment');
var path = require('path');
var fs = require('fs');

function getDurationObj(durationInMilliseconds) {
  'use strict';
  var dur = moment.duration(durationInMilliseconds, 'ms');
  return {
    duration: dur,
    hrs: dur.get('h'),
    min: dur.get('m'),
    sec: dur.get('s'),
    ms: dur.get('ms')
  };
}

Handlebars.registerHelper('isBlank', function (context, options) {
  'use strict';
  return context === '' ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('getPlural', function (context) {
  'use strict';
  return context === 1 ? '' : 's';
});

Handlebars.registerHelper('formatSummaryDuration', function (context) {
  'use strict';
  var dur = getDurationObj(context);
  if (dur.hrs  < 1) {
    if (dur.min < 1) {
      if (dur.sec < 1) {
        return context;
      }
      return dur.sec + '.' + dur.ms;
    }
    return dur.min + ':' + (dur.sec < 10 ? ('0' + dur.sec) : dur.sec);
  }
  return dur.hrs + ':' + (dur.min < 10 ? ('0' + dur.min) : dur.min);
});

Handlebars.registerHelper('getSummaryDurationUnits', function (context) {
  'use strict';
  var dur = getDurationObj(context);
  if (dur.hrs  < 1) {
    if (dur.min < 1) {
      if (dur.sec < 1) {
        return 'MS';
      }
      return 'S';
    }
    return 'M';
  }
  return 'H';
});

Handlebars.registerHelper('formatDuration', function (context) {
  'use strict';
  var dur = getDurationObj(context);
  if (dur.hrs  < 1) {
    if (dur.min < 1) {
      if (dur.sec < 1) {
        return context + ' ms';
      }
      return dur.sec + '.' + dur.ms + ' s';
    }
    return dur.min + ':' + (dur.sec < 10 ? ('0' + dur.sec) : dur.sec) + '.' + dur.ms + ' m';
  }
  return dur.hrs + ':' + (dur.min < 10 ? ('0' + dur.min) : dur.min) + ':' + (dur.sec < 10 ? ('0' + dur.sec) : dur.sec) + '.' + dur.ms + ' h';
});

Handlebars.registerHelper('dateFormat', function(context, format) {
  'use strict';
  if (format === 'fromNow') {
    return moment(context).fromNow();
  } else {
    return moment(context).format(format);
  }
});

Handlebars.registerHelper('inlineAsset', function(context) {
  'use strict';
  var distDir = path.join(__dirname, '..', 'dist');
  switch (context) {
    case 'styles':
      return fs.readFileSync(path.join(distDir, 'css', 'mochawesome-64.css'));

    case 'scripts':
      var vendorScripts = fs.readFileSync(path.join(distDir, 'js', 'vendor.js'));
      var mochawesomeScript = fs.readFileSync(path.join(distDir, 'js', 'mochawesome.js'));
      return vendorScripts + '\n' + mochawesomeScript;
  }
});
Handlebars.registerPartial("_quickSummary", Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<ul class=\"list-unstyled quick-summary\">\n  <li class=\"qs-item summary-duration\" title=\"Duration\">"
    + alias3((lookupProperty(helpers,"formatSummaryDuration")||(depth0 && lookupProperty(depth0,"formatSummaryDuration"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"duration") : depth0),{"name":"formatSummaryDuration","hash":{},"data":data,"loc":{"start":{"line":2,"column":56},"end":{"line":2,"column":90}}}))
    + "<span>"
    + alias3((lookupProperty(helpers,"getSummaryDurationUnits")||(depth0 && lookupProperty(depth0,"getSummaryDurationUnits"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"duration") : depth0),{"name":"getSummaryDurationUnits","hash":{},"data":data,"loc":{"start":{"line":2,"column":96},"end":{"line":2,"column":132}}}))
    + "</span></li>\n  <li class=\"qs-item summary-suites\" title=\"Suites\">"
    + alias3(((helper = (helper = lookupProperty(helpers,"suites") || (depth0 != null ? lookupProperty(depth0,"suites") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"suites","hash":{},"data":data,"loc":{"start":{"line":3,"column":52},"end":{"line":3,"column":62}}}) : helper)))
    + "</li>\n  <li class=\"qs-item summary-tests\" title=\"Tests\">"
    + alias3(((helper = (helper = lookupProperty(helpers,"testsRegistered") || (depth0 != null ? lookupProperty(depth0,"testsRegistered") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"testsRegistered","hash":{},"data":data,"loc":{"start":{"line":4,"column":50},"end":{"line":4,"column":69}}}) : helper)))
    + "</li>\n  <li class=\"qs-item summary-passes\" title=\"Passed\" data-filter=\"passed\">"
    + alias3(((helper = (helper = lookupProperty(helpers,"passes") || (depth0 != null ? lookupProperty(depth0,"passes") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"passes","hash":{},"data":data,"loc":{"start":{"line":5,"column":73},"end":{"line":5,"column":83}}}) : helper)))
    + "</li>\n  <li class=\"qs-item summary-failures\" title=\"Failed\" data-filter=\"failed\">"
    + alias3(((helper = (helper = lookupProperty(helpers,"failures") || (depth0 != null ? lookupProperty(depth0,"failures") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"failures","hash":{},"data":data,"loc":{"start":{"line":6,"column":75},"end":{"line":6,"column":87}}}) : helper)))
    + "</li>\n  <li class=\"qs-item summary-pending\" title=\"Pending\" data-filter=\"pending\">"
    + alias3(((helper = (helper = lookupProperty(helpers,"pending") || (depth0 != null ? lookupProperty(depth0,"pending") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"pending","hash":{},"data":data,"loc":{"start":{"line":7,"column":76},"end":{"line":7,"column":87}}}) : helper)))
    + "</li>\n</ul>";
},"useData":true}));
Handlebars.registerPartial("_statusbar", Handlebars.template({"0":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"status-item status-item-hooks danger\">"
    + alias3(((helper = (helper = lookupProperty(helpers,"other") || (depth0 != null ? lookupProperty(depth0,"other") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"other","hash":{},"data":data,"loc":{"start":{"line":3,"column":52},"end":{"line":3,"column":61}}}) : helper)))
    + " Failed Hook"
    + alias3((lookupProperty(helpers,"getPlural")||(depth0 && lookupProperty(depth0,"getPlural"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"other") : depth0),{"name":"getPlural","hash":{},"data":data,"loc":{"start":{"line":3,"column":73},"end":{"line":3,"column":92}}}))
    + "</div>\n";
},"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"status-item status-item-skipped danger\">"
    + alias3(((helper = (helper = lookupProperty(helpers,"skipped") || (depth0 != null ? lookupProperty(depth0,"skipped") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"skipped","hash":{},"data":data,"loc":{"start":{"line":6,"column":54},"end":{"line":6,"column":65}}}) : helper)))
    + " Skipped Test"
    + alias3((lookupProperty(helpers,"getPlural")||(depth0 && lookupProperty(depth0,"getPlural"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"skipped") : depth0),{"name":"getPlural","hash":{},"data":data,"loc":{"start":{"line":6,"column":78},"end":{"line":6,"column":99}}}))
    + "</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.hooks.blockHelperMissing, alias5=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = 
  "<div class=\"row\">\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"hasOther") || (depth0 != null ? lookupProperty(depth0,"hasOther") : depth0)) != null ? helper : alias2),(options={"name":"hasOther","hash":{},"fn":container.program(0, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":2},"end":{"line":4,"column":15}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasOther")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = lookupProperty(helpers,"hasSkipped") || (depth0 != null ? lookupProperty(depth0,"hasSkipped") : depth0)) != null ? helper : alias2),(options={"name":"hasSkipped","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":2},"end":{"line":7,"column":17}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasSkipped")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  <div class=\"status-item status-item-pending-pct\">"
    + alias5(((helper = (helper = lookupProperty(helpers,"pendingPercent") || (depth0 != null ? lookupProperty(depth0,"pendingPercent") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pendingPercent","hash":{},"data":data,"loc":{"start":{"line":8,"column":51},"end":{"line":8,"column":69}}}) : helper)))
    + "% Pending</div>\n  <div class=\"status-item status-item-passing-pct "
    + alias5(((helper = (helper = lookupProperty(helpers,"passPercentClass") || (depth0 != null ? lookupProperty(depth0,"passPercentClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"passPercentClass","hash":{},"data":data,"loc":{"start":{"line":9,"column":50},"end":{"line":9,"column":70}}}) : helper)))
    + "\">"
    + alias5(((helper = (helper = lookupProperty(helpers,"passPercent") || (depth0 != null ? lookupProperty(depth0,"passPercent") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"passPercent","hash":{},"data":data,"loc":{"start":{"line":9,"column":72},"end":{"line":9,"column":87}}}) : helper)))
    + "% Passing</div>\n</div>";
},"useData":true}));
Handlebars.registerPartial("_suite", Handlebars.template({"0":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = "";

  stack1 = ((helper = (helper = lookupProperty(helpers,"suites") || (depth0 != null ? lookupProperty(depth0,"suites") : depth0)) != null ? helper : container.hooks.helperMissing),(options={"name":"suites","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":2},"end":{"line":4,"column":13}}}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!lookupProperty(helpers,"suites")) { stack1 = container.hooks.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    "
    + ((stack1 = container.invokePartial(lookupProperty(partials,"_suite"),depth0,{"name":"_suite","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.hooks.blockHelperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = 
  "<section class=\"suite-wrap\">\n  <div id=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"uuid") || (depth0 != null ? lookupProperty(depth0,"uuid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uuid","hash":{},"data":data,"loc":{"start":{"line":8,"column":11},"end":{"line":8,"column":19}}}) : helper)))
    + "\" class=\"suite";
  stack1 = ((helper = (helper = lookupProperty(helpers,"root") || (depth0 != null ? lookupProperty(depth0,"root") : depth0)) != null ? helper : alias2),(options={"name":"root","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":33},"end":{"line":8,"column":62}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"root")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = lookupProperty(helpers,"hasSuites") || (depth0 != null ? lookupProperty(depth0,"hasSuites") : depth0)) != null ? helper : alias2),(options={"name":"hasSuites","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":62},"end":{"line":8,"column":101}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasSuites")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = lookupProperty(helpers,"hasTests") || (depth0 != null ? lookupProperty(depth0,"hasTests") : depth0)) != null ? helper : alias2),(options={"name":"hasTests","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":101},"end":{"line":8,"column":137}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasTests")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = lookupProperty(helpers,"hasPasses") || (depth0 != null ? lookupProperty(depth0,"hasPasses") : depth0)) != null ? helper : alias2),(options={"name":"hasPasses","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":137},"end":{"line":8,"column":176}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasPasses")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = lookupProperty(helpers,"hasFailures") || (depth0 != null ? lookupProperty(depth0,"hasFailures") : depth0)) != null ? helper : alias2),(options={"name":"hasFailures","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":176},"end":{"line":8,"column":219}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasFailures")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = lookupProperty(helpers,"hasPending") || (depth0 != null ? lookupProperty(depth0,"hasPending") : depth0)) != null ? helper : alias2),(options={"name":"hasPending","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":219},"end":{"line":8,"column":261}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasPending")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = lookupProperty(helpers,"hasSkipped") || (depth0 != null ? lookupProperty(depth0,"hasSkipped") : depth0)) != null ? helper : alias2),(options={"name":"hasSkipped","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":261},"end":{"line":8,"column":303}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasSkipped")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\n    <h3 class=\"suite-title\">"
    + ((stack1 = (lookupProperty(helpers,"isBlank")||(depth0 && lookupProperty(depth0,"isBlank"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"title") : depth0),{"name":"isBlank","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":9,"column":28},"end":{"line":9,"column":81}}})) != null ? stack1 : "")
    + "</h3>\n    <h5 class=\"suite-filename\">"
    + ((stack1 = (lookupProperty(helpers,"isBlank")||(depth0 && lookupProperty(depth0,"isBlank"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"file") : depth0),{"name":"isBlank","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":10,"column":31},"end":{"line":10,"column":82}}})) != null ? stack1 : "")
    + "</h5>\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"hasTests") || (depth0 != null ? lookupProperty(depth0,"hasTests") : depth0)) != null ? helper : alias2),(options={"name":"hasTests","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":4},"end":{"line":37,"column":17}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"hasTests")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"suites") || (depth0 != null ? lookupProperty(depth0,"suites") : depth0)) != null ? helper : alias2),(options={"name":"suites","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":4},"end":{"line":41,"column":15}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"suites")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n  </div>\n</section>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return " root-suite";
},"4":function(container,depth0,helpers,partials,data) {
    return " has-suites";
},"5":function(container,depth0,helpers,partials,data) {
    return " has-tests";
},"6":function(container,depth0,helpers,partials,data) {
    return " has-passed";
},"7":function(container,depth0,helpers,partials,data) {
    return " has-failed";
},"8":function(container,depth0,helpers,partials,data) {
    return " has-pending";
},"9":function(container,depth0,helpers,partials,data) {
    return " has-skipped";
},"10":function(container,depth0,helpers,partials,data) {
    return "&nbsp;";
},"11":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data,"loc":{"start":{"line":9,"column":60},"end":{"line":9,"column":69}}}) : helper)));
},"12":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"file") || (depth0 != null ? lookupProperty(depth0,"file") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"file","hash":{},"data":data,"loc":{"start":{"line":10,"column":62},"end":{"line":10,"column":70}}}) : helper)));
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = 
  "    <!-- Suite Chart -->\n    <div class=\"suite-chart-wrap\">\n      <canvas id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"uuid") || (depth0 != null ? lookupProperty(depth0,"uuid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uuid","hash":{},"data":data,"loc":{"start":{"line":14,"column":18},"end":{"line":14,"column":26}}}) : helper)))
    + "\" class=\"suite-chart\" width=\"50\" height=\"50\" data-total-passes=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"totalPasses") || (depth0 != null ? lookupProperty(depth0,"totalPasses") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalPasses","hash":{},"data":data,"loc":{"start":{"line":14,"column":90},"end":{"line":14,"column":105}}}) : helper)))
    + "\" data-total-failures=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"totalFailures") || (depth0 != null ? lookupProperty(depth0,"totalFailures") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalFailures","hash":{},"data":data,"loc":{"start":{"line":14,"column":128},"end":{"line":14,"column":145}}}) : helper)))
    + "\" data-total-pending=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"totalPending") || (depth0 != null ? lookupProperty(depth0,"totalPending") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalPending","hash":{},"data":data,"loc":{"start":{"line":14,"column":167},"end":{"line":14,"column":183}}}) : helper)))
    + "\" data-total-skipped=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"totalSkipped") || (depth0 != null ? lookupProperty(depth0,"totalSkipped") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalSkipped","hash":{},"data":data,"loc":{"start":{"line":14,"column":205},"end":{"line":14,"column":221}}}) : helper)))
    + "\"></canvas>\n    </div>\n    <div class=\"suite-data-wrap\">\n      <!-- Suite Summary -->\n      <ul class=\"suite-summary list-unstyled\">\n        <li class=\"suite-summary-item duration\">"
    + alias4((lookupProperty(helpers,"formatDuration")||(depth0 && lookupProperty(depth0,"formatDuration"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"duration") : depth0),{"name":"formatDuration","hash":{},"data":data,"loc":{"start":{"line":19,"column":48},"end":{"line":19,"column":75}}}))
    + "</li>\n        <li class=\"suite-summary-item tests\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"totalTests") || (depth0 != null ? lookupProperty(depth0,"totalTests") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalTests","hash":{},"data":data,"loc":{"start":{"line":20,"column":45},"end":{"line":20,"column":59}}}) : helper)))
    + "</li>\n        <li class=\"suite-summary-item passed\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"totalPasses") || (depth0 != null ? lookupProperty(depth0,"totalPasses") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalPasses","hash":{},"data":data,"loc":{"start":{"line":21,"column":46},"end":{"line":21,"column":61}}}) : helper)))
    + "</li>\n        <li class=\"suite-summary-item failed\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"totalFailures") || (depth0 != null ? lookupProperty(depth0,"totalFailures") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalFailures","hash":{},"data":data,"loc":{"start":{"line":22,"column":46},"end":{"line":22,"column":63}}}) : helper)))
    + "</li>\n        <li class=\"suite-summary-item pending\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"totalPending") || (depth0 != null ? lookupProperty(depth0,"totalPending") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalPending","hash":{},"data":data,"loc":{"start":{"line":23,"column":47},"end":{"line":23,"column":63}}}) : helper)))
    + "</li>\n      </ul>\n      <!-- Test Info -->\n      <div class=\"suite-test-wrap\">\n        <div class=\"suite-test-header\" data-toggle=\"collapse\" data-target=\"#"
    + alias4(((helper = (helper = lookupProperty(helpers,"uuid") || (depth0 != null ? lookupProperty(depth0,"uuid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uuid","hash":{},"data":data,"loc":{"start":{"line":27,"column":76},"end":{"line":27,"column":84}}}) : helper)))
    + "-test-list\">\n          <h4 class=\"suite-test-header-title\">Tests</h4>\n        </div>\n        <div id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"uuid") || (depth0 != null ? lookupProperty(depth0,"uuid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uuid","hash":{},"data":data,"loc":{"start":{"line":30,"column":17},"end":{"line":30,"column":25}}}) : helper)))
    + "-test-list\" class=\"list-group test-list collapse in\">\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"tests") || (depth0 != null ? lookupProperty(depth0,"tests") : depth0)) != null ? helper : alias2),(options={"name":"tests","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":10},"end":{"line":33,"column":20}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"tests")) { stack1 = container.hooks.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </div>\n      </div>\n    </div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            "
    + ((stack1 = container.invokePartial(lookupProperty(partials,"_test"),depth0,{"name":"_test","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      "
    + ((stack1 = container.invokePartial(lookupProperty(partials,"_suite"),depth0,{"name":"_suite","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.hooks.blockHelperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = "";

  stack1 = ((helper = (helper = lookupProperty(helpers,"rootEmpty") || (depth0 != null ? lookupProperty(depth0,"rootEmpty") : depth0)) != null ? helper : alias2),(options={"name":"rootEmpty","hash":{},"fn":container.program(0, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":5,"column":14}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"rootEmpty")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = lookupProperty(helpers,"rootEmpty") || (depth0 != null ? lookupProperty(depth0,"rootEmpty") : depth0)) != null ? helper : alias2),(options={"name":"rootEmpty","hash":{},"fn":container.noop,"inverse":container.program(2, data, 0),"data":data,"loc":{"start":{"line":6,"column":0},"end":{"line":45,"column":14}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"rootEmpty")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"usePartial":true,"useData":true}));
Handlebars.registerPartial("_summary", Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"row\">\n  <div class=\"summary-col summary-duration\">\n    <h1 class=\"summary-count\">"
    + alias3((lookupProperty(helpers,"formatSummaryDuration")||(depth0 && lookupProperty(depth0,"formatSummaryDuration"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"duration") : depth0),{"name":"formatSummaryDuration","hash":{},"data":data,"loc":{"start":{"line":3,"column":30},"end":{"line":3,"column":64}}}))
    + "<span>"
    + alias3((lookupProperty(helpers,"getSummaryDurationUnits")||(depth0 && lookupProperty(depth0,"getSummaryDurationUnits"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"duration") : depth0),{"name":"getSummaryDurationUnits","hash":{},"data":data,"loc":{"start":{"line":3,"column":70},"end":{"line":3,"column":106}}}))
    + "</span></h1>\n    <h4 class=\"summary-label\">"
    + alias3((lookupProperty(helpers,"getSummaryDurationUnits")||(depth0 && lookupProperty(depth0,"getSummaryDurationUnits"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"duration") : depth0),{"name":"getSummaryDurationUnits","hash":{},"data":data,"loc":{"start":{"line":4,"column":30},"end":{"line":4,"column":66}}}))
    + "</h4>\n  </div>\n  <div class=\"summary-col summary-suites\" title=\"Suites\">\n    <h1 class=\"summary-count\">"
    + alias3(((helper = (helper = lookupProperty(helpers,"suites") || (depth0 != null ? lookupProperty(depth0,"suites") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"suites","hash":{},"data":data,"loc":{"start":{"line":7,"column":30},"end":{"line":7,"column":40}}}) : helper)))
    + "</h1>\n    <h4 class=\"summary-label\">Suite"
    + alias3((lookupProperty(helpers,"getPlural")||(depth0 && lookupProperty(depth0,"getPlural"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"suites") : depth0),{"name":"getPlural","hash":{},"data":data,"loc":{"start":{"line":8,"column":35},"end":{"line":8,"column":55}}}))
    + "</h4>\n  </div>\n  <div class=\"summary-col summary-tests\" title=\"Tests\">\n    <h1 class=\"summary-count\">"
    + alias3(((helper = (helper = lookupProperty(helpers,"testsRegistered") || (depth0 != null ? lookupProperty(depth0,"testsRegistered") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"testsRegistered","hash":{},"data":data,"loc":{"start":{"line":11,"column":30},"end":{"line":11,"column":49}}}) : helper)))
    + "</h1>\n    <h4 class=\"summary-label\">Test"
    + alias3((lookupProperty(helpers,"getPlural")||(depth0 && lookupProperty(depth0,"getPlural"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"testsRegistered") : depth0),{"name":"getPlural","hash":{},"data":data,"loc":{"start":{"line":12,"column":34},"end":{"line":12,"column":63}}}))
    + "</h4>\n  </div>\n  <div class=\"summary-col summary-passes\" data-filter=\"passed\" title=\"Passed\">\n    <h1 class=\"summary-count\">"
    + alias3(((helper = (helper = lookupProperty(helpers,"passes") || (depth0 != null ? lookupProperty(depth0,"passes") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"passes","hash":{},"data":data,"loc":{"start":{"line":15,"column":30},"end":{"line":15,"column":40}}}) : helper)))
    + "</h1>\n    <h4 class=\"summary-label\">Passed</h4>\n  </div>\n  <div class=\"summary-col summary-failures\" data-filter=\"failed\" title=\"Failed\">\n    <h1 class=\"summary-count\">"
    + alias3(((helper = (helper = lookupProperty(helpers,"failures") || (depth0 != null ? lookupProperty(depth0,"failures") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"failures","hash":{},"data":data,"loc":{"start":{"line":19,"column":30},"end":{"line":19,"column":42}}}) : helper)))
    + "</h1>\n    <h4 class=\"summary-label\">Failed</h4>\n  </div>\n  <div class=\"summary-col summary-pending\" data-filter=\"pending\" title=\"Pending\">\n    <h1 class=\"summary-count\">"
    + alias3(((helper = (helper = lookupProperty(helpers,"pending") || (depth0 != null ? lookupProperty(depth0,"pending") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"pending","hash":{},"data":data,"loc":{"start":{"line":23,"column":30},"end":{"line":23,"column":41}}}) : helper)))
    + "</h1>\n    <h4 class=\"summary-label\">Pending</h4>\n  </div>\n</div>";
},"useData":true}));
Handlebars.registerPartial("_test", Handlebars.template({"0":function(container,depth0,helpers,partials,data) {
    return " passed";
},"1":function(container,depth0,helpers,partials,data) {
    return " failed";
},"2":function(container,depth0,helpers,partials,data) {
    return " pending";
},"3":function(container,depth0,helpers,partials,data) {
    return " skipped";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.hooks.blockHelperMissing, alias5=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = 
  "    <div class=\"pull-right\">\r\n      ";
  stack1 = ((helper = (helper = lookupProperty(helpers,"scr") || (depth0 != null ? lookupProperty(depth0,"scr") : depth0)) != null ? helper : alias2),(options={"name":"scr","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":6},"end":{"line":10,"column":240}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"scr")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n      ";
  stack1 = ((helper = (helper = lookupProperty(helpers,"code") || (depth0 != null ? lookupProperty(depth0,"code") : depth0)) != null ? helper : alias2),(options={"name":"code","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":6},"end":{"line":11,"column":238}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"code")) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n      <span class=\"test-duration "
    + alias5(((helper = (helper = lookupProperty(helpers,"speed") || (depth0 != null ? lookupProperty(depth0,"speed") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"speed","hash":{},"data":data,"loc":{"start":{"line":12,"column":33},"end":{"line":12,"column":42}}}) : helper)))
    + "\">"
    + alias5((lookupProperty(helpers,"formatDuration")||(depth0 && lookupProperty(depth0,"formatDuration"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"duration") : depth0),{"name":"formatDuration","hash":{},"data":data,"loc":{"start":{"line":12,"column":44},"end":{"line":12,"column":71}}}))
    + "</span>\r\n    </div>\r\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button type=\"button\" class=\"btn btn-link btn-sm toggle-btn toggle-scr collapsed\" data-toggle=\"collapse\" data-target=\"#"
    + container.escapeExpression(container.lambda((depths[1] != null ? lookupProperty(depths[1],"uuid") : depths[1]), depth0))
    + " .test-scr\" aria-expanded=\"false\"><span class=\"btn-text\">Show Screenshot</span></button>";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button type=\"button\" class=\"btn btn-link btn-sm toggle-btn toggle-code collapsed\" data-toggle=\"collapse\" data-target=\"#"
    + container.escapeExpression(container.lambda((depths[1] != null ? lookupProperty(depths[1],"uuid") : depths[1]), depth0))
    + " .test-code\" aria-expanded=\"false\"><span class=\"btn-text\">Show Code</span></button>";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <p class=\"test-error-message\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":18,"column":34},"end":{"line":18,"column":42}}}) : helper)))
    + ": "
    + alias4(((helper = (helper = lookupProperty(helpers,"message") || (depth0 != null ? lookupProperty(depth0,"message") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data,"loc":{"start":{"line":18,"column":44},"end":{"line":18,"column":55}}}) : helper)))
    + "\r\n      <button type=\"button\" class=\"btn btn-link btn-sm toggle-btn toggle-stack collapsed\" data-toggle=\"collapse\" data-target=\"#"
    + alias4(container.lambda((depths[1] != null ? lookupProperty(depths[1],"uuid") : depths[1]), depth0))
    + " .test-error-stack\" aria-expanded=\"false\"><span class=\"btn-text\">Show Stack</span></button>\r\n    </p>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "  <div class=\"test-code collapse\">\r\n    <pre><code class=\"hljs javascript small\">"
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "</code></pre>\r\n  </div>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"test-error-stack collapse\">\r\n    <pre><code class=\"hljs small\">"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"stack") || (depth0 != null ? lookupProperty(depth0,"stack") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"stack","hash":{},"data":data,"loc":{"start":{"line":31,"column":34},"end":{"line":31,"column":45}}}) : helper))) != null ? stack1 : "")
    + "</code></pre>\r\n  </div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "  <div class=\"test-scr collapse\">\r\n    <div class=\"test-scr-wrap\">\r\n      "
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "\r\n    </div>\r\n  </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.hooks.blockHelperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = 
  "<div id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"uuid") || (depth0 != null ? lookupProperty(depth0,"uuid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uuid","hash":{},"data":data,"loc":{"start":{"line":1,"column":9},"end":{"line":1,"column":17}}}) : helper)))
    + "\" class=\"list-group-item test";
  stack1 = ((helper = (helper = lookupProperty(helpers,"pass") || (depth0 != null ? lookupProperty(depth0,"pass") : depth0)) != null ? helper : alias2),(options={"name":"pass","hash":{},"fn":container.program(0, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":46},"end":{"line":1,"column":71}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"pass")) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = lookupProperty(helpers,"fail") || (depth0 != null ? lookupProperty(depth0,"fail") : depth0)) != null ? helper : alias2),(options={"name":"fail","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":71},"end":{"line":1,"column":96}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"fail")) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = lookupProperty(helpers,"pending") || (depth0 != null ? lookupProperty(depth0,"pending") : depth0)) != null ? helper : alias2),(options={"name":"pending","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":96},"end":{"line":1,"column":128}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"pending")) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = lookupProperty(helpers,"skipped") || (depth0 != null ? lookupProperty(depth0,"skipped") : depth0)) != null ? helper : alias2),(options={"name":"skipped","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":128},"end":{"line":1,"column":160}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"skipped")) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n  <!-- Test Heading -->\r\n  <div class=\"test-heading\">\r\n    <h4 class=\"test-title\">\r\n      <span class=\"text-muted hidden\"> it </span>\r\n      "
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":6,"column":6},"end":{"line":6,"column":15}}}) : helper)))
    + "\r\n    </h4>\r\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"pending") || (depth0 != null ? lookupProperty(depth0,"pending") : depth0)) != null ? helper : alias2),(options={"name":"pending","hash":{},"fn":container.noop,"inverse":container.program(4, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":14,"column":16}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"pending")) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "  </div>\r\n  <!-- Test Errors -->\r\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"err") || (depth0 != null ? lookupProperty(depth0,"err") : depth0)) != null ? helper : alias2),(options={"name":"err","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":2},"end":{"line":21,"column":10}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"err")) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "  <!-- Test Code -->\r\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"code") || (depth0 != null ? lookupProperty(depth0,"code") : depth0)) != null ? helper : alias2),(options={"name":"code","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":2},"end":{"line":27,"column":11}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"code")) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "  <!-- Test Error Stack -->\r\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"err") || (depth0 != null ? lookupProperty(depth0,"err") : depth0)) != null ? helper : alias2),(options={"name":"err","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":2},"end":{"line":33,"column":10}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"err")) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "  <!-- Screenshot -->\r\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"scr") || (depth0 != null ? lookupProperty(depth0,"scr") : depth0)) != null ? helper : alias2),(options={"name":"scr","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":2},"end":{"line":41,"column":10}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"scr")) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>";
},"useData":true,"useDepths":true}));