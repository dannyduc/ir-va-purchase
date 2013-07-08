package com.ionreporter.web.controller;

import com.sun.jersey.api.client.Client;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller
public class AnalysisController {

    private static final Collection<Analysis> ANALYSES;
    static {
        ANALYSES = new ArrayList<Analysis>();
        for (int i = 0; i < 3; i++) {
            int analysisId = i + 1;
            String dataPacakgeId = String.format("DP_%d", analysisId);
            ANALYSES.add(new Analysis(analysisId, dataPacakgeId, "unpaid"));
        }
    }

    final Client client = Client.create();
    final ObjectMapper mapper = new ObjectMapper();

    @RequestMapping(value="/analyses")
    @ResponseBody
    public Collection<Analysis> all() {
        return ANALYSES;
    }

    @RequestMapping(value="/analyses/{analysisId}")
    @ResponseBody
    public Analysis fetch(@PathVariable("analysisId") int analysisId) {
        for (Analysis analysis : ANALYSES) {
            if (analysis.getAnalysisId() == analysisId) {
                return analysis;
            }
        }
        return null;
    }

    @RequestMapping(value="/purchase/{analysisId}")
    @ResponseBody
    public Map<String, String> purchase(@PathVariable("analysisId") int analysisId) {
        for (Analysis analysis : ANALYSES) {
            if (analysis.getAnalysisId() == analysisId) {
                analysis.setPaymentStatus("paid");
            }
        }

        String url = "http://variants.ingenuity.dev:9091/va/rest/purchase/" + analysisId;
        String r = client.resource(url).get(String.class);

        Map<String, String> json = new HashMap<String, String>();
        json.put("purchased", "true");
        return json;
    }
}
