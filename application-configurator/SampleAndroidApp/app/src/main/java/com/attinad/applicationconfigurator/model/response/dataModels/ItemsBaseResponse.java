package com.attinad.applicationconfigurator.model.response.dataModels;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class ItemsBaseResponse {

    @SerializedName("error")
    @Expose
    private Boolean error;
    @SerializedName("data")
    @Expose
    private Items data;

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
    public Items getData() {
        return data;
    }

    /**
     * @param data The data
     */
    public void setData(Items data) {
        this.data = data;
    }


}
