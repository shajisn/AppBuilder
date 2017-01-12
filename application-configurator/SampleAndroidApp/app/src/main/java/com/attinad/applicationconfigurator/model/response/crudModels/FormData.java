package com.attinad.applicationconfigurator.model.response.crudModels;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class FormData implements Serializable {

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("fields")
    @Expose
    private List<Field> fields = new ArrayList<Field>();
    @SerializedName("template_id")
    @Expose
    private String templateId;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("buttons")
    @Expose
    private List<Button_> buttons = new ArrayList<Button_>();
    @SerializedName("_value_id")
    @Expose
    private String valueId;
    @SerializedName("field_wrapper_key")
    @Expose
    private String fieldWrapperKey;

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
     * @return The fields
     */
    public List<Field> getFields() {
        return fields;
    }

    /**
     * @param fields The fields
     */
    public void setFields(List<Field> fields) {
        this.fields = fields;
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
     * @return The name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name The name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return The buttons
     */
    public List<Button_> getButtons() {
        return buttons;
    }

    /**
     * @param buttons The buttons
     */
    public void setButtons(List<Button_> buttons) {
        this.buttons = buttons;
    }

    /**
     * @return The valueId
     */
    public String getValueId() {
        return valueId;
    }

    /**
     * @param valueId The _value_id
     */
    public void setValueId(String valueId) {
        this.valueId = valueId;
    }

    /**
     * @return The fieldWrapperKey
     */
    public String getFieldWrapperKey() {
        return fieldWrapperKey;
    }

    /**
     * @param fieldWrapperKey The field_wrapper_key
     */
    public void setFieldWrapperKey(String fieldWrapperKey) {
        this.fieldWrapperKey = fieldWrapperKey;
    }

}
