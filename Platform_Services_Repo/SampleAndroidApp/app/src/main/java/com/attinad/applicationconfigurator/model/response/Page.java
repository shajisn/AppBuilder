package com.attinad.applicationconfigurator.model.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Page implements Serializable {

    private static final long serialVersionUID = 2626232728173210001L;
    @SerializedName("bands")
    @Expose
    private List<Band> bands = new ArrayList<Band>();
    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("forms")
    @Expose
    private List<Form> forms = new ArrayList<Form>();
    @SerializedName("crud_layouts")
    @Expose
    private List<CrudLayout> crudLayouts = new ArrayList<CrudLayout>();
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("type")
    @Expose
    private String type;
    @SerializedName("is_first_page")
    @Expose
    private String isFirstPage;
    @SerializedName("_value_id")
    @Expose
    private String valueId;

    /**
     * @return The bands
     */
    public List<Band> getBands() {
        return bands;
    }

    /**
     * @param bands The bands
     */
    public void setBands(List<Band> bands) {
        this.bands = bands;
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
     * @return The forms
     */
    public List<Form> getForms() {
        return forms;
    }

    /**
     * @param forms The forms
     */
    public void setForms(List<Form> forms) {
        this.forms = forms;
    }

    /**
     * @return The crudLayouts
     */
    public List<CrudLayout> getCrudLayouts() {
        return crudLayouts;
    }

    /**
     * @param crudLayouts The crud_layouts
     */
    public void setCrudLayouts(List<CrudLayout> crudLayouts) {
        this.crudLayouts = crudLayouts;
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
     * @return The isFirstPage
     */
    public String getIsFirstPage() {
        return isFirstPage;
    }

    /**
     * @param isFirstPage The is_first_page
     */
    public void setIsFirstPage(String isFirstPage) {
        this.isFirstPage = isFirstPage;
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
