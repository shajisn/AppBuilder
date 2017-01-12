package com.attinad.applicationconfigurator.model.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Field implements Serializable {

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("display_name")
    @Expose
    private String displayName;
    @SerializedName("type")
    @Expose
    private String type;
    @SerializedName("options")
    @Expose
    private List<Option> options = new ArrayList<Option>();
    @SerializedName("url")
    @Expose
    private String url;
    @SerializedName("parent_field")
    @Expose
    private String parentField;
    @SerializedName("child_field")
    @Expose
    private String childField;
    @SerializedName("_value_id")
    @Expose
    private String valueId;
    private String valueOfField;

    public String getValueOfField() {
        return valueOfField;
    }

    public void setValueOfField(String valueOfField) {
        this.valueOfField = valueOfField;
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
     * @return The displayName
     */
    public String getDisplayName() {
        return displayName;
    }

    /**
     * @param displayName The display_name
     */
    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

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
     * @return The options
     */
    public List<Option> getOptions() {
        return options;
    }

    /**
     * @param options The options
     */
    public void setOptions(List<Option> options) {
        this.options = options;
    }

    /**
     * @return The url
     */
    public String getUrl() {
        return url;
    }

    /**
     * @param url The url
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * @return The parentField
     */
    public String getParentField() {
        return parentField;
    }

    /**
     * @param parentField The parent_field
     */
    public void setParentField(String parentField) {
        this.parentField = parentField;
    }

    /**
     * @return The childField
     */
    public String getChildField() {
        return childField;
    }

    /**
     * @param childField The child_field
     */
    public void setChildField(String childField) {
        this.childField = childField;
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

}
