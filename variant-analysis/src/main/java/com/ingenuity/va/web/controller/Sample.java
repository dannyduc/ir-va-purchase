package com.ingenuity.va.web.controller;


import lombok.Data;

@Data
public class Sample {
    private boolean fromIr = true;
    private int sampleId;
    private String irBarcode;
    private String sku;
    private boolean active = false;

    public Sample(boolean active, boolean fromIr, String irBarcode, int sampleId, String sku) {
        this.active = active;
        this.fromIr = fromIr;
        this.irBarcode = irBarcode;
        this.sampleId = sampleId;
        this.sku = sku;
    }
}
