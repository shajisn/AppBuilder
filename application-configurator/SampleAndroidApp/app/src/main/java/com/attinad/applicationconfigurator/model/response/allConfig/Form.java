package com.attinad.applicationconfigurator.model.response.allConfig;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Form {

    @SerializedName("form_id")
    @Expose
    private String formId;

    /**
     * @return The formId
     */
    public String getFormId() {
        return formId;
    }

    /**
     * @param formId The form_id
     */
    public void setFormId(String formId) {
        this.formId = formId;
    }

}
