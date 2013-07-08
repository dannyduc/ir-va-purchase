_.templateSettings = {
    interpolate : /{{(.+?)}}/g
};

(function (window, undefined) {

    window.IR = {
        Models: {},
        Collections: {},
        Views: {},
        Router: {},
        vent: _.extend({}, Backbone.Events),
        template: function(id) {
            return _.template($('#' + id).html());
        }
    };

    window.IR.receiver = function(event) {
        if (event.origin !== "http://variants.ingenuity.dev:9091") {
            return;
        }

        var pd = $("#purchaseDialog");
        $('#confirmPurchase').on('click', function() {
            $.get('/rest/purchase/' + event.data.analysis.analysisId, function(data) {
                if (data.purchased) {
                    event.source.postMessage({eventType: "refresh", analysis: event.data.analysis}, event.origin);
                    IR.vent.trigger('analysis:paid', event.data.analysis.analysisId);
                    pd.dialog("close");
                }
            });
        });

        pd.dialog("open");
    };

    if (window.addEventListener) {
        window.addEventListener("message", window.IR.receiver, false);
    } else {
        window.attachEvent("onmessage", window.IR.receiver);
    }

    IR.Models.Analysis = Backbone.Model.extend({
        defaults: {
            analysisId: 0,
            dataPackageId: "DP_0",
            paymentStatus: "unpaid"
        },

        idAttribute: "analysisId",

        urlRoot: '/rest/analyses'
    });

    IR.Collections.Analyses = Backbone.Collection.extend({
        model: IR.Models.Analysis,
        url: '/rest/analyses'
    });

    IR.Views.App = Backbone.View.extend({
        initialize: function() {

            IR.vent.on('analysis:viewInVA', this.viewInVA, this);

            var allAnalysesView = new IR.Views.Analyses({ collection: IR.analyses }).render();
            $('#allAnalyses').append(allAnalysesView.el);
        },

        viewInVA: function(analysis) {
            var vaView = new IR.Views.VA({ model: analysis });
            $('#vaView').html(vaView.render().el);
        }
    });

    IR.Views.Analyses = Backbone.View.extend({
        tagName: 'tbody',

        initialize: function() {
            IR.vent.on('analysis:paid', this.refreshAnalysis, this);

            this.collection.on('add', this.addOne, this);
        },

        refreshAnalysis: function(analysisId) {
            var analysis = this.collection.get(analysisId);
            analysis.fetch();
        },

        render: function() {
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function(analysis) {
            var analysisView = new IR.Views.Analysis({ model: analysis });
            this.$el.append(analysisView.render().el);
        }
    });

    IR.Views.Analysis = Backbone.View.extend({
        tagName: 'tr',

        template: IR.template("allAnalysesTemplate"),

        initialize: function() {
            this.model.on('change', this.render, this);
        },

        events: {
            'click a.view': 'renderAnalysisInVA'
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        renderAnalysisInVA: function() {
            IR.vent.trigger('analysis:viewInVA', this.model);
        }
    });

    IR.Views.VA = Backbone.View.extend({
        tagName: 'div',

        template: IR.template("vaViewTemplate"),

        pid: 100,

        render: function() {
            var pid = "PID" + this.pid++;
            var data = {
                analysisId: this.model.get('analysisId'),
                name: pid
            };
            this.$el.html(this.template(data));
            return this;
        }
    });

    IR.Router = Backbone.Router.extend({
        routes: {
            '': 'index'
        },

        index: function() {
        }
    });
})(window);




