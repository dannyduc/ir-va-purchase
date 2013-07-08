package com.ionreporter.web.controller;

import lombok.Data;

@Data
public class Analysis {

    private int analysisId = 0;
    private String dataPackageId = "DP_0";
    private String paymentStatus="unpaid";

    public Analysis(int analysisId, String dataPackageId, String paymentStatus) {
        this.analysisId = analysisId;
        this.dataPackageId = dataPackageId;
        this.paymentStatus = paymentStatus;
    }
}
