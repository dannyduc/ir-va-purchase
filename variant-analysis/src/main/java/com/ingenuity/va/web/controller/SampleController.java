package com.ingenuity.va.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Controller
public class SampleController {

    public static String[] SKUS = {
            "exome/whole genome",
            "gene panel"
    };

    public static final List<Sample> SAMPLES;
    static {
        SAMPLES = new ArrayList<Sample>();
        for (int i = 0; i < 4; i++) {
            int id = i + 1;
            SAMPLES.add(new Sample(false, true, "ir" + id, id, SKUS[i % 2]));
        }
    }

    @RequestMapping(value="/samples")
    @ResponseBody
    public Collection<Sample> all() {
        return SAMPLES;
    }
}
