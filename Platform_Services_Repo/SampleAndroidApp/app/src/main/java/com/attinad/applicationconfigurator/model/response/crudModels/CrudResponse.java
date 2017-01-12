package com.attinad.applicationconfigurator.model.response.crudModels;

import com.attinad.applicationconfigurator.model.response.SignUpResponse;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class CrudResponse {

    @SerializedName("type")
    @Expose
    private String type;
    @SerializedName("template_id")
    @Expose
    private String templateId;
    @SerializedName("buttons")
    @Expose
    private List<CrudButton> buttons = new ArrayList<>();
    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("form_id")
    @Expose
    private String formId;
    @SerializedName("formData")
    @Expose
    private SignUpResponse formData;

    /**
     * @return The type
     */
    public String getType() {
        return type;
    }

    /**
     * @param type The type
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * @return The templateId
     */
    public String getTemplateId() {
        return templateId;
    }

    /**
     * @param templateId The template_id
     */
    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

    /**
     * @return The buttons
     */
    public List<CrudButton> getButtons() {
        return buttons;
    }

    /**
     * @param buttons The buttons
     */
    public void setButtons(List<CrudButton> buttons) {
        this.buttons = buttons;
    }

    /**
     * @return The id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id The id
     */
    public void setId(String id) {
        this.id = id;
    }

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

    /**
     * @return The formData
     */
    public SignUpResponse getFormData() {
        return formData;
    }

    /**
     * @param formData The formData
     */
    public void setFormData(SignUpResponse formData) {
        this.formData = formData;
    }

}
