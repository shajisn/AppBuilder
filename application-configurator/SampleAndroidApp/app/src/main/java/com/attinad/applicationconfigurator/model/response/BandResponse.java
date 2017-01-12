package com.attinad.applicationconfigurator.model.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class BandResponse {

    @SerializedName("count")
    @Expose
    private String count;
    @SerializedName("data")
    @Expose
    private String data;
    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("see_all_options")
    @Expose
    private String seeAllOptions;
    @SerializedName("sort")
    @Expose
    private String sort;
    @SerializedName("title")
    @Expose
    private String title;
    @SerializedName("template_id")
    @Expose
    private String templateId;
    @SerializedName("_value_id")
    @Expose
    private String valueId;
    @SerializedName("view")
    @Expose
    private String view;

    /**
     * @return The count
     */
    public String getCount() {
        return count;
    }

    /**
     * @param count The count
     */
    public void setCount(String count) {
        this.count = count;
    }

    /**
     * @return The data
     */
    public String getData() {
        return data;
    }

    /**
     * @param data The data
     */
    public void setData(String data) {
        this.data = data;
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
     * @return The seeAllOptions
     */
    public String getSeeAllOptions() {
        return seeAllOptions;
    }

    /**
     * @param seeAllOptions The see_all_options
     */
    public void setSeeAllOptions(String seeAllOptions) {
        this.seeAllOptions = seeAllOptions;
    }

    /**
     * @return The sort
     */
    public String getSort() {
        return sort;
    }

    /**
     * @param sort The sort
     */
    public void setSort(String sort) {
        this.sort = sort;
    }

    /**
     * @return The title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title The title
     */
    public void setTitle(String title) {
        this.title = title;
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
     * @return The view
     */
    public String getView() {
        return view;
    }

    /**
     * @param view The view
     */
    public void setView(String view) {
        this.view = view;
    }

}
