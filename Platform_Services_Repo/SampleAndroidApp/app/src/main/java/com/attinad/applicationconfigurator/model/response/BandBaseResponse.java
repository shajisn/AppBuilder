package com.attinad.applicationconfigurator.model.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class BandBaseResponse {

    @SerializedName("error")
    @Expose
    private Boolean error;
    @SerializedName("data")
    @Expose
    private List<BandResponse> data = new ArrayList<>();

    /**
     * @return The error
     */
    public Boolean getError() {
        return error;
    }

    /**
     * @param error The error
     */
    public void setError(Boolean error) {
        this.error = error;
    }

    /**
     * @return The data
     */
    public List<BandResponse> getData() {
        return data;
    }

    /**
     * @param data The data
     */
    public void setData(List<BandResponse> data) {
        this.data = data;
    }

}
