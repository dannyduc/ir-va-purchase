package com.ingenuity.va.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller
public class AnalysisController {

    public static final Collection<Analysis> ANALYSES;
    static {
        ANALYSES = new ArrayList<Analysis>();
        ANALYSES.add(new Analysis(1, "DP_1", "unpaid", Arrays.asList(SampleController.SAMPLES.get(0), SampleController.SAMPLES.get(1))));
        ANALYSES.add(new Analysis(2, "DP_2", "unpaid", Arrays.asList(SampleController.SAMPLES.get(2))));
        ANALYSES.add(new Analysis(3, "DP_3", "unpaid", Arrays.asList(SampleController.SAMPLES.get(3))));
    }

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
    public Map<String, String> purhcase(@PathVariable("analysisId") int analysisId) {
        for (Analysis analysis : ANALYSES) {
            if (analysis.getAnalysisId() == analysisId) {
                analysis.setPaymentStatus("paid");
            }
        }

        Map<String, String> json = new HashMap<String, String>();
        json.put("purchased", "true");
        return json;
    }
}
