package com.attinad.applicationconfigurator.model.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class Form implements Serializable {

    private static final long serialVersionUID = 1064895713044778281L;
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
