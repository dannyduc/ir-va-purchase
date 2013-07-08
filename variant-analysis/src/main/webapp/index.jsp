<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Variant Analysis</title>
    <link rel="stylesheet" href="css/jquery-ui.css">
</head>
<body>

<p>Variant Analysis</p>

<div id="vaView" class="module"></div>
<script id="vaViewTemplate" type="text/template">
    <p>Analysis View</p>
    <ul>
        <li>Analysis ID: {{analysisId}}</li>
        <li>Data Package ID: {{dataPackageId}}</li>
        <li>Payment Status: {{paymentStatus}}</li>
        <li><a href="#activate/analysis/{{analysisId}}" class="activate">Activate</a></li>
    </ul>
</script>

<script src="js/jquery.js"></script>
<script src="js/jquery-ui.js"></script>
<script src="js/underscore.js"></script>
<script src="js/backbone.js"></script>
<script src="js/main.js"></script>
<script>
    new VA.Views.App;
    new VA.Router;
    Backbone.history.start();
</script>

</body>
</html>