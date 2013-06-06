(function(){
// ## VIE.SindiceService(options)
// This is the constructor to instantiate a new service to collect
// properties of an entity from <a href="http://www.sindice.com/">Sindice</a>.
// **Parameters**:
// *{object}* **options** Optional set of fields, ```namespaces```, ```rules```, ```url```, or ```name```.
// **Throws**:
// *nothing*
// **Returns**:
// *{VIE.SindiceService}* : A **new** VIE.SindiceService instance.
// **Example usage**:
//
//     var sindiceService = new vie.SindiceService({<some-configuration>});
    VIE.prototype.SindiceService = function(options) {
        var defaults = {
            /* the default name of this service */
            name: 'sindice',
            url: "http://api.sindice.com/v2/",
            rules : [],
            namespaces : {
                semdeski : "http://www.semanticdesktop.org/ontologies/2007/01/19/nie#",
                semdeskf : "http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#",
                skos: "http://www.w3.org/2004/02/skos/core#",
                foaf: "http://xmlns.com/foaf/0.1/",
                opengis: "http://www.opengis.net/gml/",
                dbpedia: "http://dbpedia.org/ontology/",
                dbprop: "http://dbpedia.org/property/",
                owl : "http://www.w3.org/2002/07/owl#",
                geonames : "http://www.geonames.org/ontology#",
                enhancer : "http://fise.iks-project.eu/ontology/",
                entityhub: "http://www.iks-project.eu/ontology/rick/model/",
                entityhub2: "http://www.iks-project.eu/ontology/rick/query/",
                rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                rdfs: "http://www.w3.org/2000/01/rdf-schema#",
                dcterms  : 'http://purl.org/dc/terms/',
                schema: 'http://schema.org/',
                geo: 'http://www.w3.org/2003/01/geo/wgs84_pos#'
            }
        };
        this.options = jQuery.extend(true, defaults, options ? options : {});

        this.vie = null; /* will be set via VIE.use(); */
        /* overwrite options.name if you want to set another name */
        this.name = this.options.name;
    };

    VIE.prototype.SindiceService.prototype = {

// ### init()
// This internal method initializes certain properties of the service and is called
// via ```VIE.use()```.
// **Parameters**:
// *nothing*
// **Throws**:
// *nothing*
// **Returns**:
// *{VIE.SindiceService}* : The VIE.SindiceService instance itself.
        init: function(){

            for (var key in this.options.namespaces) {
                var val = this.options.namespaces[key];
                this.vie.namespaces.add(key, val);
            }
            jQuery.ajaxSetup({
                converters: {"text application/rdf+xml": function(s){return s;}}
            });
            this.rules = jQuery.extend([], VIE.Util.transformationRules(this));
            this.rules = jQuery.merge(this.rules, (this.options.rules) ? this.options.rules : []);
        },
// ### load(loadable)
// This method loads a linked data resource from the Sindice cache as a VIE
// entity. The entity uri has to be given as the entity property of the options hash.
// Since Sindice only supports application/rdf+xml as output, RdfQuery is a requirement for this method.
//
// **Parameters**:
// *{VIE.Loadable}* **lodable** The loadable.
// **Throws**:
// *{Error}* if an invalid VIE.Loadable is passed.
// **Returns**:
// *{VIE.SindiceService}* : The VIE.SindiceService instance itself.
// **Example usage**:
//     vie.load({
//         entity: "<http://...>"
//     })
//     .using(new vie.SindiceService({<some-configuration>}))
//     .execute()
//     .success(callback);
        load: function(loadable){
            var correct = loadable instanceof this.vie.Loadable;
            if (!correct) {throw "Invalid Loadable passed";}
            var service = this;

            var entityUri = loadable.options.entity.replace(/^<|>$/g, "");

            if (!entityUri){
                loadable.resolve([]);
            }
            var success = function (results) {
                _.defer(function(){
                    var entities = VIE.Util.rdf2Entities(service, results);
                    var loadedEntity = _(entities).detect(function(entity){
                        return entity.getSubjectUri() === entityUri;
                    });
                    service.vie.entities.addOrUpdate(loadedEntity);
                    loadable.resolve([loadedEntity]);
                });
            };
            var error = function (e) {
                loadable.reject(e);
            };

            var url = this.options.url + "cache";
            var xhr = jQuery.ajax(url, {
                accepts: {"application/rdf+xml": "application/rdf+xml"},
                data: {
                    // format: 'RDF',
                    url: entityUri
                },
                dataType: 'application/rdf+xml',
                success: success,
                error: error
            });
            //  xhr.setRequestHeader('Accepts', 'application/rdf+xml');
        }

    };
})();