package com.attinad.applicationconfigurator.model.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Response {

    @SerializedName("CreateUserResponseMessage")
    @Expose
    private CreateUserResponseMessage createUserResponseMessage;

    /**
     * @return The createUserResponseMessage
     */
    public CreateUserResponseMessage getCreateUserResponseMessage() {
        return createUserResponseMessage;
    }

    /**
     * @param createUserResponseMessage The CreateUserResponseMessage
     */
    public void setCreateUserResponseMessage(CreateUserResponseMessage createUserResponseMessage) {
        this.createUserResponseMessage = createUserResponseMessage;
    }

}
