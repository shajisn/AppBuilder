package com.attinad.applicationconfigurator.model.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class SignupBaseResponse {

    @SerializedName("error")
    @Expose
    private Boolean error;
    @SerializedName("data")
    @Expose
    private List<SignUpResponse> data = new ArrayList<SignUpResponse>();

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
    public List<SignUpResponse> getData() {
        return data;
    }

    /**
     * @param data The data
     */
    public void setData(List<SignUpResponse> data) {
        this.data = data;
    }

}
