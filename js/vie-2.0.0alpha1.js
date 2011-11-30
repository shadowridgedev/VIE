(function(){var a=this,d=a.jQuery,e=a.Backbone,b=a._;var c=a.VIE=function(f){this.config=(f)?f:{};this.services={};this.entities=new this.Collection();this.Entity.prototype.entities=this.entities;this.entities.vie=this;this.Entity.prototype.entityCollection=this.Collection;this.Entity.prototype.vie=this;this.defaultProxyUrl=(this.config.defaultProxyUrl)?this.config.defaultProxyUrl:"../utils/proxy/proxy.php";this.Namespaces.prototype.vie=this;this.namespaces=new this.Namespaces((this.config.defaultNamespace)?this.config.defaultNamespace:"http://ontology.vie.js/");this.Type.prototype.vie=this;this.Types.prototype.vie=this;this.Attribute.prototype.vie=this;this.Attributes.prototype.vie=this;this.types=new this.Types();this.types.add("Thing");if(this.config.classic!==false){this.RDFa=new this.ClassicRDFa(this);this.RDFaEntities=new this.ClassicRDFaEntities(this);this.EntityManager=new this.ClassicEntityManager(this);this.cleanup=function(){this.entities.reset()}}};c.prototype.use=function(f,g){if(!g){g=f.name}f.vie=this;f.name=g;if(f.init){f.init()}this.services[g]=f};c.prototype.service=function(f){if(!this.services[f]){throw"Undefined service "+f}return this.services[f]};c.prototype.getServicesArray=function(){var f=[];b.each(this.services,function(g,h){f.push(g)});return f};c.prototype.load=function(f){if(!f){f={}}f.vie=this;return new this.Loadable(f)};c.prototype.save=function(f){if(!f){f={}}f.vie=this;return new this.Savable(f)};c.prototype.remove=function(f){if(!f){f={}}f.vie=this;return new this.Removable(f)};c.prototype.analyze=function(f){if(!f){f={}}f.vie=this;return new this.Analyzable(f)};c.prototype.find=function(f){if(!f){f={}}f.vie=this;return new this.Findable(f)};c.prototype.loadSchema=function(f){if(!f){}else{}};if(typeof exports==="object"){exports.VIE=c;if(!d){d=require("jquery")}if(!e){e=require("backbone")}if(!b){b=require("underscore")._}}c.prototype.Able=function(){};c.prototype.Able.prototype={using:function(g){var f=this;if(g instanceof Array){b(g).each(function(i){f._using(i)})}else{var h=g;f._using(h)}return this},_using:function(f){var g=typeof f==="string"?this.vie.service(f):f;this.services.push(g);return this},init:function(g,f){this.methodName=f;this.options=g;this.services=g.from||g.using||g.to||[];this.vie=g.vie;this.deferred=d.Deferred();this.resolve=this.deferred.resolve;this.resolveWith=this.deferred.resolveWith;this.reject=this.deferred.reject;this.rejectWith=this.deferred.rejectWith;this.success=this.done=this.deferred.done;this.fail=this.deferred.fail;this.then=this.deferred.then;this.always=this.deferred.always;this.from=this.using;this.to=this.using},execute:function(){var f=this;b(this.services).each(function(g){g[f.methodName](f)});return this}};c.prototype.Loadable=function(f){this.init(f,"load")};c.prototype.Loadable.prototype=new c.prototype.Able();c.prototype.Savable=function(f){this.init(f,"save")};c.prototype.Savable.prototype=new c.prototype.Able();c.prototype.Removable=function(f){this.init(f,"remove")};c.prototype.Removable.prototype=new c.prototype.Able();c.prototype.Analyzable=function(f){this.init(f,"analyze")};c.prototype.Analyzable.prototype=new c.prototype.Able();c.prototype.Findable=function(f){this.init(f,"find")};c.prototype.Findable.prototype=new c.prototype.Able();d.fn.compare=function(j){if(this.length!==j.length){return false}var g=this.sort(),f=j.sort();for(var h=0;j[h];h++){if(g[h]!==f[h]){return false}}return true};if(!Array.prototype.remove){Array.prototype.remove=function(){var h=this.remove.arguments;var j;if(h[0]&&h[0] instanceof Array){var f=h[0];for(j=0;j<f.length;j++){this.remove(f[j])}}else{for(j=0;j<h.length;j++){while(true){var g=this.indexOf(h[j]);if(g!==-1){this.splice(g,1)}else{break}}}}return this}}if(!Array.prototype.unduplicate){Array.prototype.unduplicate=function(){var f=this.sort();var h=[];for(var g=0;g<f.length;g++){if(g===f.length-1||f[g]!==f[g+1]){h.push(f[g])}}return h}}c.Util={toCurie:function(g,j,i){if(c.Util.isCurie(g,i)){return g}var l=":";for(var f in i.toObj()){if(g.indexOf(i.get(f))===1){var h=new RegExp("^<"+i.get(f));if(f===""){l=""}return((j)?"[":"")+g.replace(h,f+l).replace(/>$/,"")+((j)?"]":"")}}throw new Error("No prefix found for URI '"+g+"'!")},isCurie:function(f,g){try{c.Util.toUri(f,g);return true}catch(h){return false}},toUri:function(g,i){var j=":";for(var f in i.toObj()){if(f!==""&&(g.indexOf(f)===0||g.indexOf(f)===1)){var h=new RegExp("^\\[{0,1}"+f+j);return"<"+g.replace(h,i.get(f)).replace(/\]{0,1}$/,"")+">"}}if(g.indexOf(j)===-1&&i.base()){return"<"+i.base()+g+">"}throw new Error("No prefix found for CURIE '"+g+"'!")},isUri:function(f){return(typeof f==="string"&&f.search(/^<.+:.+>$/)===0)},_blankNodeSeed:new Date().getTime()%1000,blankNodeID:function(){this._blankNodeSeed+=1;return"_:bnode"+this._blankNodeSeed.toString(16)},rdf2Entities:function(g,k){if(typeof d.rdf!=="function"){return c.Util.rdf2EntitiesNoRdfQuery(g,k)}var j=d.rdf().load(k,{});if(g.rules){var n=d.rdf.ruleset();for(var l in g.namespaces.toObj()){if(l!==""){n.prefix(l,g.namespaces.get(l))}}for(var h=0;h<g.rules.length;h++){n.add(g.rules[h]["left"],g.rules[h]["right"])}j=j.reason(n,10)}var m={};j.where("?subject ?property ?object").each(function(){var o=this.subject.toString();if(!m[o]){m[o]={"@subject":o,"@context":g.namespaces.toObj(),"@type":[]}}var q=this.property.toString();var r;q=q.substring(1,q.length-1);try{property=d.createCurie(q,{namespaces:g.namespaces.toObj()})}catch(p){property=q;console.warn(q+" doesn't have a namespace definition in '",g.namespaces.toObj())}m[o][property]=m[o][property]||[];function i(s){if(typeof s.value==="string"){if(s.lang){return s.toString()}else{return s.value}return s.value.toString()}else{if(s.type==="uri"){return s.toString()}else{return s.value}}}m[o][property].push(i(this.object))});b(m).each(function(i){i["@type"]=i["@type"].concat(i["rdf:type"]);delete i["rdf:type"];b(i).each(function(p,o){if(p.length===1){i[o]=p[0]}})});var f=[];d.each(m,function(){var i=new g.vie.Entity(this);i=g.vie.entities.addOrUpdate(i);f.push(i)});return f},rdf2EntitiesNoRdfQuery:function(f,g){jsonLD=[];b.forEach(g,function(j,i){var h={};h["@subject"]="<"+i+">";b.forEach(j,function(l,k){k="<"+k+">";b.forEach(l,function(m){if(m.type==="uri"){m.value="<"+m.value+">"}if(h[k]&&!b.isArray(h[k])){h[k]=[h[k]]}if(b.isArray(h[k])){h[k].push(m.value);return}h[k]=m.value})});jsonLD.push(h)});return jsonLD}};c.prototype.Entity=function(h,i){var g=this;var f=function(k,m){var l=k;if(m.isUri(k)||k.indexOf("@")===0){}else{if(m.isCurie(k)){l=m.uri(k)}else{if(!m.isUri(k)){if(k.indexOf(":")===-1){l="<"+m.base()+k+">"}else{l="<"+k+">"}}}}return l};if(h["@type"]!==undefined){h["@type"]=(b.isArray(h["@type"]))?h["@type"]:[h["@type"]];h["@type"]=b.map(h["@type"],function(k){if(!g.vie.types.get(k)){g.vie.types.add(k).inherit("Thing")}return g.vie.types.get(k).id});h["@type"]=(h["@type"].length===1)?h["@type"][0]:h["@type"]}else{h["@type"]=g.vie.types.get("Thing").id}h=(h)?h:{};b.each(h,function(l,k){var m=f(k,this.namespaces);if(k!==m){delete h[k];h[m]=l}},g.vie);var j=e.Model.extend({idAttribute:"@subject",initialize:function(k,l){if(k["@subject"]){this.id=this["@subject"]=this.toReference(k["@subject"])}return this},get:function(k){k=f(k,g.vie.namespaces);var l=e.Model.prototype.get.call(this,k);l=(b.isArray(l))?l:[l];l=b.map(l,function(m){if(m!==undefined&&k==="@type"&&g.vie.types.get(m)){return g.vie.types.get(m)}else{if(m!==undefined&&g.vie.entities.get(m)){return g.vie.entities.get(m)}else{return m}}},this);l=(l.length===1)?l[0]:l;return l},has:function(k){k=f(k,g.vie.namespaces);return e.Model.prototype.has.call(this,k)},set:function(l,k){if(!l){return this}if(l.attributes){l=l.attributes}b.each(l,function(n,m){var o=f(m,g.vie.namespaces);if(m!==o){delete l[m];l[o]=n}},this);b.each(l,function(n,m){if(m.indexOf("@")===-1){if(typeof n==="object"&&!d.isArray(n)&&!n.isCollection){var o=new g.vie.Entity(n,k);g.vie.entities.addOrUpdate(o);l[m]=o.getSubject()}else{if(n.isCollection){n.each(function(p){g.vie.entities.addOrUpdate(p)})}}}},this);return e.Model.prototype.set.call(this,l,k)},unset:function(k,l){k=f(k,g.vie.namespaces);return e.Model.prototype.unset.call(this,k,l)},getSubject:function(){if(typeof this.id==="undefined"){this.id=this.attributes[this.idAttribute]}if(typeof this.id==="string"){if(this.id.substr(0,7)==="http://"||this.id.substr(0,4)==="urn:"){return this.toReference(this.id)}return this.id}return this.cid.replace("c","_:bnode")},getSubjectUri:function(){return this.fromReference(this.getSubject())},isReference:function(k){var l=new RegExp("^\\<([^\\>]*)\\>$");if(l.exec(k)){return true}return false},toReference:function(k){if(typeof k!=="string"){return k}if(this.isReference(k)){return k}return"<"+k+">"},fromReference:function(k){if(typeof k!=="string"){return k}if(!this.isReference(k)){return k}return k.substring(1,k.length-1)},as:function(k){if(k==="JSON"){return this.toJSON()}if(k==="JSONLD"){return this.toJSONLD()}throw new Error("Unknown encoding "+k)},toJSONLD:function(){var l={};var k=this;b.each(k.attributes,function(o,n){var m=o;if(o instanceof k.vie.Collection){m=o.map(function(p){return p.getSubject()})}l[n]=m});l["@subject"]=k.getSubject();return l},setOrAdd:function(m,l){var k=this;if(typeof m==="string"&&l){k._setOrAddOne(m,l)}else{if(typeof m==="object"){b(m).each(function(o,n){k._setOrAddOne(n,o)})}}return this},_setOrAddOne:function(k,n){var o;k=f(k,g.vie.namespaces);var p=e.Model.prototype.get.call(this,k);if(!p){o={};o[k]=n;this.set(o)}else{if(!(p instanceof Array)){p=[p]}var m=false;for(var l=0;l<p.length;l++){if(typeof p[l]==="string"){m|=p[l]==n}else{m|=p[l].id==n}}if(!m){p.push(n);o={};o[k]=p;this.set(o)}}},hasType:function(k){k=g.vie.types.get(k);return this.hasPropertyValue("@type",k)},hasPropertyValue:function(m,l){var k=this.get(m);if(!(l instanceof Object)){l=g.vie.entities.get(l)}if(k instanceof Array){return k.indexOf(l)!==-1}else{return k===l}},isof:function(m){var l=this.get("@type");if(l===undefined){return false}l=(b.isArray(l))?l:[l];m=(g.vie.types.get(m))?g.vie.types.get(m):new g.vie.Type(m);for(var k=0;k<l.length;k++){if(g.vie.types.get(l[k])){if(g.vie.types.get(l[k]).isof(m)){return true}}else{var n=new g.vie.Type(l[k]);if(n.id===m.id){return true}}}return false},addTo:function(l,m){var k=this;if(l instanceof k.vie.Collection){if(m){l.addOrUpdate(k)}else{l.add(k)}return this}throw new Error("Please provide a proper collection of type VIE.Collection as argument!")},isEntity:true,vie:g.vie});return new j(h,i)};c.prototype.Collection=e.Collection.extend({model:c.prototype.Entity,get:function(f){if(f===null){return null}f=(f.getSubject)?f.getSubject():f;if(typeof f==="string"&&f.indexOf("_:")===0){if(f.indexOf("bnode")===2){f=f.replace("_:bnode","c");return this._byCid[f]}else{return this._byId["<"+f+">"]}}else{f=this.toReference(f);return this._byId[f]}},addOrUpdate:function(f){var j=this;var h;if(b.isArray(f)){var i=[];b.each(f,function(k){i.push(j.addOrUpdate(k))});return i}if(!f.isEntity){f=new this.model(f)}if(f.id&&this.get(f.id)){h=this.get(f.id)}if(this.getByCid(f.cid)){var h=this.getByCid(f.cid)}if(h){var g={};b.each(f.attributes,function(m,l){if(!h.has(l)){g[l]=m;return true}else{if(h.get(l)===m){return true}else{var n=h.attributes[l];var k=m;if(n instanceof j.vie.Collection){return true}if(l==="@context"){g[l]=d.extend(true,{},n,k)}else{n=(d.isArray(n))?n:[n];k=(d.isArray(k))?k:[k];g[l]=n.concat(k).unduplicate();g[l]=(g[l].length===1)?g[l][0]:g[l]}}}});if(!b.isEmpty(g)){h.set(g)}return h}this.add(f);return f},isReference:function(f){var g=new RegExp("^\\<([^\\>]*)\\>$");if(g.exec(f)){return true}return false},toReference:function(f){if(this.isReference(f)){return f}return"<"+f+">"},fromReference:function(f){if(!this.isReference(f)){return f}return f.substring(1,f.length-1)},isCollection:true});if(c.prototype.Type){throw new Error("ERROR: VIE.Type is already defined. Please check your installation!")}if(c.prototype.Types){throw new Error("ERROR: VIE.Types is already defined. Please check your installation!")}c.prototype.Type=function(g,f){if(g===undefined||typeof g!=="string"){throw"The type constructor needs an 'id' of type string! E.g., 'Person'"}this.id=this.vie.namespaces.isUri(g)?g:this.vie.namespaces.uri(g);if(this.vie.types.get(this.id)){throw new Error("The type "+this.id+" is already defined!")}this.supertypes=new this.vie.Types();this.subtypes=new this.vie.Types();this.attributes=new this.vie.Attributes(this,(f)?f:[]);this.isof=function(h){h=this.vie.types.get(h);if(h){return h.subsumes(this.id)}else{throw new Error("No valid type given")}};this.subsumes=function(h){h=this.vie.types.get(h);if(h){if(this.id===h.id){return true}var i=this.subtypes.list();for(var k=0;k<i.length;k++){var j=i[k];if(j){if(j.id===h.id||j.subsumes(h)){return true}}}return false}else{throw new Error("No valid type given")}};this.inherit=function(h){if(typeof h==="string"){this.inherit(this.vie.types.get(h))}else{if(h instanceof this.vie.Type){h.subtypes.addOrOverwrite(this);this.supertypes.addOrOverwrite(h);try{this.attributes.list()}catch(k){h.subtypes.remove(this);this.supertypes.remove(h);throw k}}else{if(d.isArray(h)){for(var j=0;j<h.length;j++){this.inherit(h[j])}}else{throw new Error("Wrong argument in VIE.Type.inherit()")}}}return this};this.hierarchy=function(){var i={id:this.id,subtypes:[]};var h=this.subtypes.list();for(var k=0;k<h.length;k++){var j=this.vie.types.get(h[k]);i.subtypes.push(j.hierarchy())}return i};this.instance=function(i,j){i=(i)?i:{};j=(j)?j:{};if(j.typeChecking!==false){for(var h in i){if(h.indexOf("@")!==0&&!this.attributes.get(h)){throw new Error("Cannot create an instance of "+this.id+" as the type does not allow an attribute '"+h+"'!")}}}if(i["@type"]){i["@type"].push(this.id)}else{i["@type"]=this.id}return new this.vie.Entity(i,j)};this.toString=function(){return this.id}};c.prototype.Types=function(){this._types={};this.add=function(h,f){if(this.get(h)){throw"Type '"+h+"' already registered."}else{if(typeof h==="string"){var g=new this.vie.Type(h,f);this._types[g.id]=g;return g}else{if(h instanceof this.vie.Type){this._types[h.id]=h;return h}else{throw new Error("Wrong argument to VIE.Types.add()!")}}}};this.addOrOverwrite=function(g,f){if(this.get(g)){this.remove(g)}return this.add(g,f)};this.get=function(g){if(!g){return undefined}if(typeof g==="string"){var f=this.vie.namespaces.isUri(g)?g:this.vie.namespaces.uri(g);return this._types[f]}else{if(g instanceof this.vie.Type){return this.get(g.id)}}return undefined};this.remove=function(j){var f=this.get(j);if(!f){return this}delete this._types[f.id];var g=f.subtypes.list();for(var i=0;i<g.length;i++){var h=g[i];if(h.supertypes.list().length===1){this.remove(h)}else{h.supertypes.remove(f.id)}}return f};this.toArray=this.list=function(){var f=[];for(var g in this._types){f.push(this._types[g])}return f};this.sort=function(h,g){var n=this;var f=$.merge([],($.isArray(h))?h:[h]);g=(g)?true:false;for(var l=0;l<f.length;l++){var k=f.shift();var m=0;for(var j=0;j<f.length;j++){var i=n.vie.types.get(f[j]);if(i.subsumes(k)){m=j}}f.splice(m+1,0,k)}if(!g){f.reverse()}return f}};if(c.prototype.Attribute){throw new Error("ERROR: VIE.Attribute is already defined. Please check your installation!")}if(c.prototype.Attributes){throw new Error("ERROR: VIE.Attributes is already defined. Please check your installation!")}c.prototype.Attribute=function(h,f,g){if(h===undefined||typeof h!=="string"){throw new Error("The attribute constructor needs an 'id' of type string! E.g., 'Person'")}if(f===undefined){throw new Error("The attribute constructor needs 'range'.")}if(g===undefined){throw new Error("The attribute constructor needs a 'domain'.")}this._domain=g;this.range=(d.isArray(f))?f:[f];this.id=this.vie.namespaces.isUri(h)?h:this.vie.namespaces.uri(h);this.applies=function(j){if(this.vie.types.get(j)){j=this.vie.types.get(j)}for(var k=0;k<this.range.length;k++){var i=this.vie.types.get(this.range[k]);if(i===undefined&&typeof j==="string"){if(j===this.range[k]){return true}}else{if(j.isof(this.range[k])){return true}}}return false}};c.prototype.Attributes=function(h,g){this.domain=h;this._local={};this._attributes={};this.add=function(k,j){if(this.get(k)){throw new Error("Attribute '"+k+"' already registered for domain "+this.domain.id+"!")}else{if(typeof k==="string"){var i=new this.vie.Attribute(k,j,this.domain);this._local[i.id]=i;return i}else{if(k instanceof this.vie.Type){k.domain=this.domain;k.vie=this.vie;this._local[k.id]=k;return k}else{throw new Error("Wrong argument to VIE.Types.add()!")}}}};this.remove=function(j){var i=this.get(j);if(i.id in this._local){delete this._local[i.id];return i}throw new Error("The attribute "+j+" is inherited and cannot be removed from the domain "+this.domain.id+"!")};this.get=function(j){if(typeof j==="string"){var i=this.vie.namespaces.isUri(j)?j:this.vie.namespaces.uri(j);return this._inherit()._attributes[i]}else{if(j instanceof this.vie.Attribute){return this.get(j.id)}else{throw new Error("Wrong argument in VIE.Attributes.get()")}}};this._inherit=function(){var n=d.extend(true,{},this._local);var o=b.map(this.domain.supertypes.list(),function(p){return p.attributes});var y={};var s={};for(var t=0;t<o.length;t++){var w=o[t].list();for(var u=0;u<w.length;u++){var l=w[u].id;if(!(l in n)){if(!(l in y)&&!(l in s)){y[l]=w[u]}else{if(!s[l]){s[l]=[]}if(l in y){s[l]=d.merge(s[l],y[l].range);delete y[l]}s[l]=d.merge(s[l],w[u].range);s[l]=s[l].unduplicate()}}}}d.extend(n,y);for(var l in s){var v=s[l];var j=[];for(var i=0;i<v.length;i++){var k=this.vie.types.get(v[i]);var m=false;if(k){for(var u=0;u<v.length;u++){if(u===i){continue}var q=this.vie.types.get(v[u]);if(q&&q.isof(k)){m=true;break}}}if(!m){j.push(v[i])}}n[l]=new this.vie.Attribute(l,j,this)}this._attributes=n;return this};this.toArray=this.list=function(k){var l=[];var j=this._inherit()._attributes;for(var i in j){if(!k||j[i].applies(k)){l.push(j[i])}}return l};if(!d.isArray(g)){g=[g]}for(var f=0;f<g.length;f++){this.add(g[f].id,g[f].range)}};if(c.prototype.Namespaces){throw new Error("ERROR: VIE.Namespaces is already defined. Please check your installation!")}c.prototype.Namespaces=function(g,f){if(!g){throw new Error("Please provide a base namespace!")}this._base=g;this.base=function(h){if(!h){return this._base}else{if(typeof h==="string"){this._base=h}else{throw new Error("Please provide a valid namespace!")}}return this};this._namespaces=(f)?f:{};this.add=function(i,h){if(typeof i==="object"){for(var j in i){this.add(j,i[j])}return this}if(i===""){this.base(h)}else{if(this.containsPrefix(i)&&h!==this._namespaces[i]){throw new Error("ERROR: Trying to register namespace prefix mapping ("+i+","+h+")!There is already a mapping existing: '("+i+","+this.get(i)+")'!")}else{d.each(this._namespaces,function(l,k){if(k===h&&l!==i){throw new Error("ERROR: Trying to register namespace prefix mapping ("+i+","+h+")!There is already a mapping existing: '("+l+","+h+")'!")}})}}this._namespaces[i]=h;return this};this.addOrReplace=function(j,i){if(typeof j==="object"){for(var l in j){this.addOrReplace(l,j[l])}return this}var h=this;if(this.containsPrefix(j)&&i!==this._namespaces[j]){this.remove(j)}else{d.each(this._namespaces,function(m,k){if(k===i&&m!==j){h.remove(m)}})}return this.add(j,i)};this.get=function(h){if(h===""){return this.base()}return this._namespaces[h]};this.getPrefix=function(h){d.each(this._namespaces,function(j,i){if(i===h){return j}});return undefined};this.containsPrefix=function(h){return(h in this._namespaces)};this.containsNamespace=function(h){return this.getPrefix(h)!==undefined};this.update=function(h,i){this._namespaces[h]=i;return this};this.remove=function(h){delete this._namespaces[h];return this};this.toObj=function(){return d.extend({"":this._base},this._namespaces)};this.curie=function(h,i){return c.Util.toCurie(h,i,this)};this.isCurie=function(h){return c.Util.isCurie(h,this)};this.uri=function(h){return c.Util.toUri(h,this)};this.isUri=c.Util.isUri};c.prototype.ClassicRDFa=function(f){this.vie=f};c.prototype.ClassicRDFa.prototype={readEntities:function(f){var g=[];var h=this.vie.RDFaEntities.getInstances(f);b.each(h,function(i){g.push(i.toJSONLD())});return g},findPredicateElements:function(h,g,f){return this.vie.services.rdfa._findPredicateElements(h,g,f)},getPredicate:function(f){return this.vie.services.rdfa.getElementPredicate(f)},getSubject:function(f){return this.vie.services.rdfa.getElementSubject(f)}};c.prototype.ClassicRDFaEntities=function(f){this.vie=f};c.prototype.ClassicRDFaEntities.prototype={getInstances:function(f){if(!this.vie.services.rdfa){this.vie.use(new this.vie.RdfaService())}var g=null;var h=false;this.vie.load({element:f}).from("rdfa").execute().done(function(i){g=i;h=true});while(!h){}return g},getInstance:function(f){var g=this.getInstances(f);if(g&&g.length){return g.pop()}return null}};c.prototype.ClassicEntityManager=function(f){this.vie=f;this.entities=this.vie.entities};c.prototype.ClassicEntityManager.prototype={getBySubject:function(f){return this.vie.entities.get(f)},getByJSONLD:function(f){if(typeof f==="string"){try{f=d.parseJSON(f)}catch(g){return null}}return this.vie.entities.addOrUpdate(f)},initializeCollection:function(){return}};(function(){c.prototype.DBPediaService=function(g){var h={name:"dbpedia",namespaces:{owl:"http://www.w3.org/2002/07/owl#",yago:"http://dbpedia.org/class/yago/",foaf:"http://xmlns.com/foaf/0.1/",georss:"http://www.georss.org/georss/",geo:"http://www.w3.org/2003/01/geo/wgs84_pos#",rdfschema:"http://www.w3.org/2000/01/rdf-schema#",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",dbpedia:"http://dbpedia.org/ontology/",dbprop:"http://dbpedia.org/property/",purlt:"http://purl.org/dc/terms/subject",purle:"http://purl.org/dc/elements/1.1/description"}};this.options=d.extend(true,h,g?g:{});this.vie=null;this.name=this.options.name;this.connector=new f(this.options);d.ajaxSetup({converters:{"text application/rdf+json":function(i){return JSON.parse(i)}}})};c.prototype.DBPediaService.prototype={init:function(){for(var g in this.options.namespaces){try{var i=this.options.namespaces[g];this.vie.namespaces.add(g,i)}catch(h){}}this.namespaces=this.vie.namespaces;this.rules=[{left:["?subject a dbpedia:Person"],right:function(j){return function(){return[d.rdf.triple(this.subject.toString(),"a","<"+j.base()+"Person>",{namespaces:j.toObj()})]}}(this.namespaces)}]},load:function(l){var g=this;var j=l instanceof this.vie.Loadable;if(!j){throw new Error("Invalid Loadable passed")}var h=l.options.entity;if(!h){l.reject([])}else{h=(typeof h==="string")?h:h.id;var k=function(m){m=(typeof m==="string")?JSON.parse(m):m;var n=c.Util.rdf2Entities(g,m);l.resolve(n)};var i=function(m){l.reject(m)};this.connector.load(h,k,i)}var k=function(n){var p=h.replace(/^</,"").replace(/>$/,"");if(n[p]){var o=g.vie.entities.get(h);if(!o){var m={"@subject":h,"@type":n[p]["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"]["uri"]};delete n[p]["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"];d.extend(m,n[p]);g.vie.entities.add(m);o=g.vie.entities.get(h)}l.resolve([o])}else{l.reject(undefined)}};var i=function(m){l.reject(m)};this.connector.load(h,k,i)}};var f=function(g){this.options=g};f.prototype={load:function(j,l,i,h){if(!h){h={}}var g=j.replace(/^</,"").replace(/>$/,"").replace("resource","data")+".jrdf";var k=h.format||"application/rdf+json";if(typeof exports!=="undefined"&&typeof process!=="undefined"){return this.loadNode(g,l,i,h,k)}d.ajax({success:function(m){l(m)},error:i,type:"GET",url:g,accepts:{"application/rdf+json":"application/rdf+json"}})},loadNode:function(k,m,h,g,l){var j=require("request");var i=j({method:"GET",uri:k,headers:{Accept:l}},function(p,o,n){m(JSON.parse(n))});i.end()}}})();c.prototype.RdfaRdfQueryService=function(f){if(!f){f={}}this.vie=null;this.name="rdfardfquery"};c.prototype.RdfaRdfQueryService.prototype={analyze:function(f){f.reject("Not yet implemented")},load:function(f){f.reject("Not yet implemented")},save:function(h){var g=h instanceof this.vie.Savable;if(!g){h.reject("Invalid Savable passed")}if(!h.options.element){h.reject("Unable to write entity to RDFa, no element given")}if(!h.options.entity){h.reject("Unable to write to RDFa, no entity given")}if(!d.rdf){h.reject("No rdfQuery found.")}var f=h.options.entity;var i=[];i.push(f.getSubject()+" a "+f.get("@type"));d(h.options.element).rdfa(i);h.resolve()}};c.prototype.RdfaService=function(f){if(!f){f={}}this.vie=null;this.name="rdfa";this.subjectSelector=f.subjectSelector?f.subjectSelector:"[about],[typeof],[src],html";this.predicateSelector=f.predicateSelector?f.predicateSelector:"[property],[rel]";this.attributeExistenceComparator=f.attributeExistenceComparator;this.views=[]};c.prototype.RdfaService.prototype={analyze:function(h){var f=this;var g=h instanceof this.vie.Analyzable;if(!g){throw"Invalid Analyzable passed"}return this.load(new this.vie.Loadable({element:h.options.element}))},load:function(l){var f=this;var g=l instanceof this.vie.Loadable;if(!g){throw"Invalid Loadable passed"}var h;if(!l.options.element){if(typeof document==="undefined"){return l.resolve([])}h=d(document)}else{h=l.options.element}var i=this.xmlns(h);for(var j in i){this.vie.namespaces.addOrReplace(j,i[j])}var k=[];d(this.subjectSelector,h).add(d(h).filter(this.subjectSelector)).each(function(){var m=f._readEntity(d(this));if(m){k.push(m)}});l.resolve(k)},save:function(g){var f=g instanceof this.vie.Savable;if(!f){throw"Invalid Savable passed"}if(!g.options.element){throw"Unable to write entity to RDFa, no element given"}if(!g.options.entity){throw"Unable to write to RDFa, no entity given"}this._writeEntity(g.options.entity,g.options.element);g.resolve()},_readEntity:function(i){var k=this.getElementSubject(i);var j=this._getElementType(i);var n,m,f;var h=this._readEntityPredicates(k,i,false);var l=this.vie;for(n in h){m=h[n];if(!b.isArray(m)){continue}f=new this.vie.Collection();b.each(m,function(o){var p=l.entities.addOrUpdate({"@subject":o});f.addOrUpdate(p)});h[n]=f}h["@subject"]=k;if(j){h["@type"]=j}var g=new this.vie.Entity(h);g=this.vie.entities.addOrUpdate(g);this._registerEntityView(g,i);return g},_writeEntity:function(g,h){var f=this;this._findPredicateElements(this.getElementSubject(h),h,true).each(function(){var j=d(this);var i=f.getElementPredicate(j);if(!g.has(i)){return true}var k=g.get(i);if(k.isCollection){return true}if(k===f.readElementValue(i,j)){return true}f.writeElementValue(i,j,k)});return true},_getViewForElement:function(h,f){var g;d.each(this.views,function(){if(this.el.get(0)===h.get(0)){if(f&&!this.template){return true}g=this;return false}});return g},_registerEntityView:function(h,i){if(!i.length){return}var f=this;var g=this._getViewForElement(i);if(g){return g}g=new this.vie.view.Entity({model:h,el:i,tagName:i.get(0).nodeName,vie:this.vie,service:this.name});this.views.push(g);b.each(h.attributes,function(l,j){var k=h.fromReference(h.get(j));if(k instanceof f.vie.Collection){d.each(f.getElementByPredicate(j,i),function(){f._registerCollectionView(k,d(this))})}});return g},_registerCollectionView:function(i,g){var f=this._getViewForElement(g,true);if(f){return f}var h=g.children(":first-child");f=new this.vie.view.Collection({collection:i,model:i.model,el:g,template:h,service:this,tagName:g.get(0).nodeName});this.views.push(f);return f},_getElementType:function(f){var g;if(d(f).attr("typeof")){g=d(f).attr("typeof");if(g.indexOf("://")!==-1){return"<"+g+">"}else{return g}}return null},getElementSubject:function(h){var f=this;if(typeof document!=="undefined"){if(h===document){return document.baseURI}}var g=undefined;d(h).closest(this.subjectSelector).each(function(){if(d(this).attr("about")!==f.attributeExistenceComparator){g=d(this).attr("about");return true}if(d(this).attr("src")!==f.attributeExistenceComparator){g=d(this).attr("src");return true}if(d(this).attr("typeof")!==f.attributeExistenceComparator){g=c.Util.blankNodeID();return true}if(d(this).get(0).nodeName==="HTML"){d("base",this).each(function(){g=d(this).attr("href")})}});if(!g){return undefined}if(typeof g==="object"){return g}return(g.indexOf("_:")===0)?g:"<"+g+">"},setElementSubject:function(g,f){if(d(f).attr("src")){return d(f).attr("src",g)}return d(f).attr("about",g)},getElementPredicate:function(g){var f;f=g.attr("property");if(!f){f=g.attr("rel")}return f},getElementBySubject:function(h,g){var f=this;return d(g).find(this.subjectSelector).add(d(g).filter(this.subjectSelector)).filter(function(){if(f.getElementSubject(d(this))!==h){return false}return true})},getElementByPredicate:function(g,i){var f=this;var h=this.getElementSubject(i);return d(i).find(this.predicateSelector).add(d(i).filter(this.predicateSelector)).filter(function(){var j=f.getElementPredicate(d(this));if(f.vie.namespaces.curie(j)!==f.vie.namespaces.curie(g)){return false}if(f.getElementSubject(d(this))!==h){return false}return true})},_readEntityPredicates:function(h,g,j){var f=this;var i={};this._findPredicateElements(h,g,true).each(function(){var l=d(this);var k=f.getElementPredicate(l);var m=f.readElementValue(k,l);if(m===null&&!j){return}i[k]=m});if(d(g).get(0).tagName!=="HTML"){d(g).parent("[rev]").each(function(){i[d(this).attr("rev")]=f.getElementSubject(this)})}return i},_findPredicateElements:function(i,h,g){var f=this;return d(h).find(this.predicateSelector).add(d(h).filter(this.predicateSelector)).filter(function(){if(f.getElementSubject(this)!==i){return false}if(!g){if(!d(this).parents("[property]").length){return true}return false}return true})},readElementValue:function(g,i){var j=i.attr("content");if(j){return j}var l=i.attr("resource");if(l){return["<"+l+">"]}var h=i.attr("href");if(h&&i.attr("rel")===g){return["<"+h+">"]}if(i.attr("rel")){var k=[];var f=this;d(i).children(this.subjectSelector).each(function(){k.push(f.getElementSubject(this))});return k}return i.html()},writeElementValue:function(f,g,j){if(j instanceof Array&&j.length>0){j=j[0]}var h=g.attr("content");if(h){g.attr("content",j);return}var i=g.attr("resource");if(i){g.attr("resource",j)}g.html(j)},xmlns:function(g){var f;if(!g){if(typeof document==="undefined"){return{}}f=d(document)}else{f=d(g)}var h={};f.each(function(k,n){if(n.attributes&&n.attributes.getNamedItemNS){for(k=0;k<n.attributes.length;k+=1){var j=n.attributes[k];if(/^xmlns(:(.+))?$/.test(j.nodeName)){var m=/^xmlns(:(.+))?$/.exec(j.nodeName)[2]||"";var l=j.nodeValue;if(m===""||l!==""){h[m]=j.nodeValue}}}}});return h}};(function(){c.prototype.StanbolService=function(g){var h={name:"stanbol",url:"http://dev.iks-project.eu:8080/",defaultProxyUrl:"../utils/proxy/proxy.php",namespaces:{semdeski:"http://www.semanticdesktop.org/ontologies/2007/01/19/nie#",semdeskf:"http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#",skos:"http://www.w3.org/2004/02/skos/core#",foaf:"http://xmlns.com/foaf/0.1/",opengis:"http://www.opengis.net/gml/",dbpedia:"http://dbpedia.org/ontology/",owl:"http://www.w3.org/2002/07/owl#",geonames:"http://www.geonames.org/ontology#",enhancer:"http://fise.iks-project.eu/ontology/",entityhub:"http://www.iks-project.eu/ontology/rick/model/",entityhub2:"http://www.iks-project.eu/ontology/rick/query/",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",rdfschema:"http://www.w3.org/2000/01/rdf-schema#",dc:"http://purl.org/dc/terms/",foaf:"http://xmlns.com/foaf/0.1/",schema:"http://schema.org/",geo:"http://www.w3.org/2003/01/geo/wgs84_pos#",skos:"http://www.w3.org/2004/02/skos/core"}};this.options=d.extend(true,h,g?g:{});this.vie=null;this.name=this.options.name;this.connector=new f(this.options);d.ajaxSetup({converters:{"text application/rdf+json":function(i){return JSON.parse(i)}}})};c.prototype.StanbolService.prototype={init:function(){for(var g in this.options.namespaces){try{var i=this.options.namespaces[g];this.vie.namespaces.add(g,i)}catch(h){}}this.namespaces=this.vie.namespaces;this.rules=[{left:["?subject a <http://fise.iks-project.eu/ontology/EntityAnnotation>","?subject enhancer:entity-type ?type","?subject enhancer:confidence ?confidence","?subject enhancer:entity-reference ?entity","?subject dc:relation ?relation","?relation a <http://fise.iks-project.eu/ontology/TextAnnotation>","?relation enhancer:selected-text ?selected-text","?relation enhancer:selection-context ?selection-context","?relation enhancer:start ?start","?relation enhancer:end ?end"],right:["?entity a ?type","?entity enhancer:hasTextAnnotation ?relation","?entity enhancer:hasEntityAnnotation ?subject"]},{left:["?subject a dbpedia:Person","?subject rdfschema:label ?label"],right:function(j){return function(){return[d.rdf.triple(this.subject.toString(),"a","<"+j.base()+"Person>",{namespaces:j.toObj()}),d.rdf.triple(this.subject.toString(),"<"+j.base()+"name>",this.label,{namespaces:j.toObj()})]}}(this.namespaces)},{left:["?subject a foaf:Person","?subject rdfschema:label ?label"],right:function(j){return function(){return[d.rdf.triple(this.subject.toString(),"a","<"+j.base()+"Person>",{namespaces:j.toObj()}),d.rdf.triple(this.subject.toString(),"<"+j.base()+"name>",this.label,{namespaces:j.toObj()})]}}(this.namespaces)},{left:["?subject a dbpedia:Place","?subject rdfschema:label ?label"],right:function(j){return function(){return[d.rdf.triple(this.subject.toString(),"a","<"+j.base()+"Place>",{namespaces:j.toObj()}),d.rdf.triple(this.subject.toString(),"<"+j.base()+"name>",this.label.toString(),{namespaces:j.toObj()})]}}(this.namespaces)},];this.vie.types.addOrOverwrite("enhancer:EntityAnnotation",[]).inherit("Thing");this.vie.types.addOrOverwrite("enhancer:TextAnnotation",[]).inherit("Thing");this.vie.types.addOrOverwrite("enhancer:Enhancement",[]).inherit("Thing")},analyze:function(m){var g=this;var i=m instanceof this.vie.Analyzable;if(!i){throw"Invalid Analyzable passed"}var j=m.options.element?m.options.element:d("body");var l=g._extractText(j);if(l.length>0){var k=function(n){b.defer(function(){var o=c.Util.rdf2Entities(g,n);m.resolve(o)})};var h=function(n){m.reject(n)};this.connector.analyze(l,k,h)}else{console.warn("No text found in element.");m.resolve([])}},find:function(l){var j=l instanceof this.vie.Findable;if(!j){throw"Invalid Findable passed"}var g=this;var k=escape(l.options.term);if(!k){console.warn("StanbolConnector: No term to look for!");l.resolve([])}var h=(typeof l.options.limit==="undefined")?20:l.options.limit;var n=(typeof l.options.offset==="undefined")?0:l.options.offset;var m=function(o){b.defer(function(){var p=c.Util.rdf2Entities(g,o);l.resolve(p)})};var i=function(o){l.reject(o)};this.connector.find(k,h,n,m,i)},load:function(l){var j=l instanceof this.vie.Loadable;if(!j){throw"Invalid Loadable passed"}var g=this;var h=l.options.entity;if(!h){console.warn("StanbolConnector: No entity to look for!");l.resolve([])}var k=function(m){b.defer(function(){var n=c.Util.rdf2Entities(g,m);l.resolve(n)})};var i=function(m){l.reject(m)};this.connector.load(h,k,i)},_extractText:function(h){if(h.get(0)&&h.get(0).tagName&&(h.get(0).tagName=="TEXTAREA"||h.get(0).tagName=="INPUT"&&h.attr("type","text"))){return h.get(0).val()}else{var g=h.text().replace(/\s+/g," ").replace(/\0\b\n\r\f\t/g,"");return d.trim(g)}}};var f=function(g){this.options=g;this.baseUrl=g.url.replace(/\/$/,"");this.enhancerUrlPrefix="/engines";this.entityhubUrlPrefix="/entityhub"};f.prototype={analyze:function(l,k,i,h){if(!h){h={}}var g=this.baseUrl+this.enhancerUrlPrefix;var m=this._proxyUrl();var j=h.format||"application/rdf+json";if(typeof exports!=="undefined"&&typeof process!=="undefined"){return this.analyzeNode(g,l,k,i,h,j)}d.ajax({success:function(n){k(n)},error:i,type:"POST",url:m||g,data:(m)?{proxy_url:g,content:l,verb:"POST",format:j}:l,dataType:j,contentType:m?undefined:"text/plain",accepts:{"application/rdf+json":"application/rdf+json"}})},analyzeNode:function(i,n,m,h,g,l){var k=require("request");var j=k({method:"POST",uri:i,body:n,headers:{Accept:l}},function(q,p,o){m({results:JSON.parse(o)})});j.end()},load:function(j,l,i,h){if(!h){h={}}j=j.replace(/^</,"").replace(/>$/,"");var g=this.baseUrl+this.entityhubUrlPrefix+"/sites/entity?id="+escape(j);var m=this._proxyUrl();var k=h.format||"application/rdf+json";d.ajax({success:function(n){l(n)},error:i,type:(m)?"POST":"GET",url:m||g,data:(m)?{proxy_url:g,content:"",verb:"GET",format:k}:null,dataType:k,contentType:m?undefined:"text/plain",accepts:{"application/rdf+json":"application/rdf+json"}})},find:function(h,i,j,n,k,o){if(!o){o={}}if(j==null){j=0}if(i==null){i=10}var g=this.baseUrl+this.entityhubUrlPrefix+"/sites/find";var m=this._proxyUrl();var l=o.format||"application/rdf+json";d.ajax({success:function(p){n(p)},error:k,type:"POST",url:m||g,data:(m)?{proxy_url:g,content:{name:h,limit:i,offset:j},verb:"POST",format:l,type:"text/plain"}:"name="+h+"&limit="+i+"&offset="+j,dataType:l,accepts:{"application/rdf+json":"application/rdf+json"}})},_proxyUrl:function(){this.proxyUrl="";if(this.baseUrl.indexOf(":")!==-1&&!this.options.proxyDisabled){return this.options.proxyUrl||this.options.defaultProxyUrl}else{return""}}}})();if(!c.prototype.view){c.prototype.view={}}c.prototype.view.Collection=e.View.extend({initialize:function(){this.template=this.options.template;this.service=this.options.service;if(!this.service){throw"No RDFa service provided to the Collection View"}this.entityViews={};b.bindAll(this,"addItem","removeItem","refreshItems");this.collection.bind("add",this.addItem);this.collection.bind("remove",this.removeItem);var f=this;this.collection.forEach(function(g){f.registerItem(g,f.collection)})},addItem:function(h,j){if(j!==this.collection){return}if(!this.template||this.template.length===0){return}var g=this.service._registerEntityView(h,this.cloneElement(this.template));var i=g.render().el;if(h.id){this.service.setElementSubject(h.getSubjectUri(),i)}this.el.append(i);var f=this.service;d(i).parent("[rev]").each(function(){var k=d(this).attr("rev");var l={};l[k]=new f.vie.Collection();l[k].addOrUpdate(f.vie.entities.get(f.getElementSubject(this)));h.set(l)});this.trigger("add",g);this.entityViews[h.cid]=g;i.show()},registerItem:function(g,i){var h=this.service.getElementBySubject(g.id,this.el);if(!h){return}var f=this.service._registerEntityView(g,h);this.entityViews[g.cid]=f},removeItem:function(f){if(!this.entityViews[f.cid]){return}this.trigger("remove",this.entityViews[f.cid]);this.entityViews[f.cid].el.remove();delete (this.entityViews[f.cid])},refreshItems:function(g){var f=this;d(this.el).empty();g.forEach(function(h){f.addItem(h,g)})},cloneElement:function(h){var i=d(h).clone(false);var f=this.service;if(typeof i.attr("about")!=="undefined"){i.attr("about","")}i.find("[about]").attr("about","");var g=this.service.getElementSubject(i);f._findPredicateElements(g,i,false).each(function(){f.writeElementValue(null,d(this),"")});return i}});if(!c.prototype.view){c.prototype.view={}}c.prototype.view.Entity=e.View.extend({initialize:function(f){this.service=f.service?f.service:"rdfa";this.vie=f.vie;b.bindAll(this,"render");this.model.bind("change",this.render)},render:function(){this.vie.save({element:this.el,entity:this.model}).to(this.service).execute();return this}})})();