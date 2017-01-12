package com.attinad.applicationconfigurator.model.response;


import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class PagesBaseResponse {

    @SerializedName("error")
    @Expose
    private Boolean error;
    @SerializedName("data")
    @Expose
    private Pages data;

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
    public Pages getData() {
        return data;
    }

    /**
     * @param data The data
     */
    public void setData(Pages data) {
        this.data = data;
    }

}
