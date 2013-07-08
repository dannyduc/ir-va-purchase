_.templateSettings = {
    interpolate : /{{(.+?)}}/g
};

(function (window, undefined) {

    window.VA = {
        Models: {},
        Collections: {},
        Views: {},
        Router: {},
        vent: _.extend({}, Backbone.Events),
        template: function(id) {
            return _.template($('#' + id).html());
        }
    };

    VA.Models.Analysis = Backbone.Model.extend({
        defaults: {
            analysisId: 0,
            dataPackageId: "DP_0",
            paymentStatus: "unpaid"
        },

        idAttribute: "analysisId",

        urlRoot: '/va/rest/analyses/'
    });

    VA.Views.App = Backbone.View.extend({
        initialize: function() {
            VA.vent.on('analysis:load', this.load, this);
        },

        load: function(analysisId) {
            var analysis = new VA.Models.Analysis({
                analysisId: analysisId
            });
            analysis.fetch();
            var showAnalysisView = new VA.Views.ShowAnalysis({ model: analysis });
            $('#vaView').html(showAnalysisView.render().el);
        }
    });

    VA.Views.ShowAnalysis = Backbone.View.extend({
        initialize: function() {
            VA.vent.on('analysis:activate', this.activate, this);
            VA.vent.on('analysis:refresh', this.refresh, this);

            this.model.on('change', this.render, this);
        },

        events: {
            'click a.activate': 'activate'
        },

        template: VA.template('vaViewTemplate'),

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        refresh: function(analysisId) {
            this.model.fetch();
        },

        activate: function() {
            window.parent.postMessage({eventType: "activate", analysis: this.model.toJSON()}, "http://ionreporter.iontorrent.dev:9090");
        }
    });

    VA.Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'analysis/:analsyisId': 'analysis',
            'activate/analysis/:analysisId': 'activateAnalysis'
        },

        index: function() {
//            console.log('the index page');
        },

        analysis: function(analysisId) {
            VA.vent.trigger('analysis:load', analysisId);
        },

        activateAnalysis: function(analysisId) {
            VA.vent.trigger('analysis:activate', analysisId);
        }
    });

    VA.receiver = function(event) {
        if (event.origin !== "http://ionreporter.iontorrent.dev:9090") {
            return;
        }

        var analysisId = event.data.analysis.analysisId;
        VA.vent.trigger('analysis:refresh', analysisId);
    };

    if (window.addEventListener) {
        window.addEventListener("message", VA.receiver, false);
    } else {
        window.attachEvent("onmessage", VA.receiver);
    }
})(window);




