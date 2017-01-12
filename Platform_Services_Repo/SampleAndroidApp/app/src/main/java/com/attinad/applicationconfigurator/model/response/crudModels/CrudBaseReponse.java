package com.attinad.applicationconfigurator.model.response.crudModels;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class CrudBaseReponse {

    @SerializedName("error")
    @Expose
    private Boolean error;
    @SerializedName("data")
    @Expose
    private CrudResponse data;

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
    public CrudResponse getData() {
        return data;
    }

    /**
     * @param data The data
     */
    public void setData(CrudResponse data) {
        this.data = data;
    }

}
