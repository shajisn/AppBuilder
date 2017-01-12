package com.attinad.applicationconfigurator.model.response.allConfig;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class CrudLayout {

    @SerializedName("layout_id")
    @Expose
    private String layoutId;

    /**
     * @return The layoutId
     */
    public String getLayoutId() {
        return layoutId;
    }

    /**
     * @param layoutId The layout_id
     */
    public void setLayoutId(String layoutId) {
        this.layoutId = layoutId;
    }

}
