package com.attinad.applicationconfigurator.model.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class Band implements Serializable {

    private static final long serialVersionUID = -3418096296893356278L;
    @SerializedName("band_id")
    @Expose
    private String bandId;
    @SerializedName("_value_id")
    @Expose
    private String valueId;

    /**
     * @return The bandId
     */
    public String getBandId() {
        return bandId;
    }

    /**
     * @param bandId The band_id
     */
    public void setBandId(String bandId) {
        this.bandId = bandId;
    }

    /**
     * @return The valueId
     */
    public String getValueId() {
        return valueId;
    }

    /**
     * @param valueId The _value_id
     */
    public void setValueId(String valueId) {
        this.valueId = valueId;
    }

}
