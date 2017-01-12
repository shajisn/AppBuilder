
package com.attinad.applicationconfigurator.model.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class DeleteResponse {

    @SerializedName("error")
    @Expose
    private Boolean error;

    /**
     * 
     * @return
     *     The error
     */
    public Boolean getError() {
        return error;
    }

    /**
     * 
     * @param error
     *     The error
     */
    public void setError(Boolean error) {
        this.error = error;
    }

}
