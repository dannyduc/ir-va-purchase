# Mock IR/VA payment workflow

## Overview
Sample application to show payment communication between Ion Reporter and Variant Analysis

1.  VA will use html5 window.postMessage to notify IR of a purchaseing event
2.  IR will listen for a onmessage event to render the purchase confirmation dialog
3.  If user confirms purchase, IR will make the following server to server calls:  IR -> VA, IR -> E1, IR -VA
4.  If sucessful, IR will use window.postMessage to notify VA to refresh UI view.
5.  VA will reload analysis with the latest payment status

## To run this example do the following:

### Edit /etc/hosts and add the following
* ionreporter.iontorrent.dev
* variants.ingenuity.dev

### urls
* http://ionreporter.iontorrent.dev:9090/index.jsp
* http://variants.ingenuity.dev:9091/va/index.jsp

### commands
* cd ion-reporter
* mvn tomcat6:run
* cd ../variant-analysis
* mvn tomcat6:run