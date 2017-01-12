package com.attinad.applicationconfigurator.model.response.allConfig;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class CrudLayout_ {

    @SerializedName("type")
    @Expose
    private String type;
    @SerializedName("template_id")
    @Expose
    private String templateId;
    @SerializedName("buttons")
    @Expose
    private List<Button_> buttons = new ArrayList<Button_>();
    @SerializedName("id")
    @Expose
    private String id;

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

}
