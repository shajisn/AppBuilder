package com.attinad.applicationconfigurator.model.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class CreateUserResponseMessage {

    @SerializedName("responseCode")
    @Expose
    private String responseCode;
    @SerializedName("failureMessage")
    @Expose
    private FailureMessage failureMessage;

    /**
     * @return The responseCode
     */
    public String getResponseCode() {
        return responseCode;
    }

    /**
     * @param responseCode The responseCode
     */
    public void setResponseCode(String responseCode) {
        this.responseCode = responseCode;
    }

    /**
     * @return The failureMessage
     */
    public FailureMessage getFailureMessage() {
        return failureMessage;
    }

    /**
     * @param failureMessage The failureMessage
     */
    public void setFailureMessage(FailureMessage failureMessage) {
        this.failureMessage = failureMessage;
    }

}
