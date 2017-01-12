package com.attinad.applicationconfigurator.model.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class CrudLayout implements Serializable {

    private static final long serialVersionUID = -1403650492104666298L;
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
