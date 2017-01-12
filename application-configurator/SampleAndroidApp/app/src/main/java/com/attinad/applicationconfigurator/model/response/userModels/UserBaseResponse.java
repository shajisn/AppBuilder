package com.attinad.applicationconfigurator.model.response.userModels;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class UserBaseResponse {

    @SerializedName("error")
    @Expose
    private Boolean error;
    @SerializedName("data")
    @Expose
    private UserDataList data;

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
    public UserDataList getData() {
        return data;
    }

    /**
     * @param data The data
     */
    public void setData(UserDataList data) {
        this.data = data;
    }

}
