package com.attinad.applicationconfigurator.model.response.allConfig;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class SortingFilter {

    @SerializedName("filter_value")
    @Expose
    private String filterValue;
    @SerializedName("title")
    @Expose
    private String title;

    /**
     * @return The filterValue
     */
    public String getFilterValue() {
        return filterValue;
    }

    /**
     * @param filterValue The filter_value
     */
    public void setFilterValue(String filterValue) {
        this.filterValue = filterValue;
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

}
