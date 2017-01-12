
package com.attinad.applicationconfigurator.model.Params;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class DeleteData {

    @SerializedName("id")
    @Expose
    private String id;

    /**
     * 
     * @return
     *     The id
     */
    public String getId() {
        return id;
    }

    /**
     * 
     * @param id
     *     The id
     */
    public void setId(String id) {
        this.id = id;
    }

}
