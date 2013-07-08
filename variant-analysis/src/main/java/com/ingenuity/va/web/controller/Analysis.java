package com.ingenuity.va.web.controller;

import lombok.Data;

import java.util.ArrayList;
import java.util.Collection;

@Data
public class Analysis {

    private int analysisId = 0;
    private String dataPackageId = "DP_0";
    private String paymentStatus="unpaid";
    private Collection<Sample> samples = new ArrayList<Sample>();

    public Analysis(int analysisId, String dataPackageId, String paymentStatus, Collection<Sample> samples) {
        this.analysisId = analysisId;
        this.dataPackageId = dataPackageId;
        this.paymentStatus = paymentStatus;
    }
}
