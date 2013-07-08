<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Ion Reporter</title>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
</head>
<body>

<p>Ion Reporter</p>

<table id="allAnalyses" class="module" border="1">
    <thead>
    <tr>
        <td>Analysis ID</td>
        <td>Data Package ID</td>
        <td>Payment Status</td>
        <td>Launch in VA</td>
    </tr>
    </thead>
</table>
<script id="allAnalysesTemplate" type="text/template">
    <td>{{analysisId}}</td>
    <td>{{dataPackageId}}</td>
    <td>{{paymentStatus}}</td>
    <td><a href="#analysis/{{analysisId}}/view" class="view">View</a></td>
</script>


<div id="purchaseDialog" title="IR: Confirm Purchase">
    IR: Confirm your purchase
    <button id="confirmPurchase">Confirm</button>
</div>

<div id="vaView" class="module"></div>
<script id="vaViewTemplate" type="text/template">
    <p>VA IFRAME below:</p>
    <iframe name="{{name}}"
            src="http://variants.ingenuity.dev:9091/va/index.jsp#analysis/{{analysisId}}"
            width="500"
            height="300"
            frameborder="1"></iframe>
</script>

<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
<script src="js/underscore.js"></script>
<script src="js/backbone.js"></script>
<script src="js/main.js"></script>
<script>

    $("#purchaseDialog").dialog({ autoOpen: false });

    new IR.Router;
    Backbone.history.start();

    IR.analyses = new IR.Collections.Analyses;
    IR.analyses.fetch().then(function() {
        new IR.Views.App({ collection: IR.analyses });
    });
</script>
</body>
</html>