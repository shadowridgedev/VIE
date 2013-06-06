module("vie.js - Sindice Service");

test("API", function() {
    var z = new VIE();
    z.use(new z.SindiceService);

    ok(z.service('sindice').init);
    equal(typeof z.service('sindice').init, "function");
    ok(z.service('sindice').load);
    equal(typeof z.service('sindice').load, "function");
});

test("Load a cached entity", function(){
    if (navigator.userAgent === 'Zombie') {
        return;
    }
    var entity = "<http://dbpedia.org/resource/Barack_Obama>";
    // var entity = "http://wordnet.rkbexplorer.com/data/word-Galway";

    var z = new VIE();
    z.use(new z.SindiceService);

    stop();
    z.load({entity: entity})
        .using('sindice').execute()
        .success(function(entities) {
            ok(entities);
            ok(entities.length > 0);
            ok(entities instanceof Array);
            var allEntities = true;
            for(var i=0; i<entities.length; i++){
                var entity = entities[i];
                if (! (entity instanceof Backbone.Model)){
                    allEntities = false;
                    ok(false, "VIE.js SindiceService - Load: Entity is not a Backbone model!");
                    console.error("VIE.js SindiceService - Load: ", entity, "is not a Backbone model!");
                }
            }
            ok(allEntities);
            ok(entities[0].get('dbprop:birthPlace').length > 0);
            start();
        })
        .fail(function(e){
            ok(false);
            start();
            console.error("VIE.js SindiceService - Load error", e);
        });
});

