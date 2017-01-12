package com.attinad.applicationconfigurator.model.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class FormSubmitResponse {

    @SerializedName("error")
    @Expose
    private Boolean error;
    @SerializedName("data")
    @Expose
    private FormData formData;

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
    public FormData getFormData() {
        return formData;
    }

    /**
     * @param formData The data
     */
    public void setFormData(FormData formData) {
        this.formData = formData;
    }

}
