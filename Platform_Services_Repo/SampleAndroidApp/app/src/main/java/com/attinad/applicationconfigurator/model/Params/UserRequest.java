package com.attinad.applicationconfigurator.model.Params;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class UserRequest {

    @SerializedName("command")
    @Expose
    private String command;
    @SerializedName("data")
    @Expose
    private UserData data;
    @SerializedName("method")
    @Expose
    private String method;
    @SerializedName("templateId")
    @Expose
    private String templateId;

    /**
     * @return The command
     */
    public String getCommand() {
        return command;
    }

    /**
     * @param command The command
     */
    public void setCommand(String command) {
        this.command = command;
    }

    /**
     * @return The data
     */
    public UserData getData() {
        return data;
    }

    /**
     * @param data The data
     */
    public void setData(UserData data) {
        this.data = data;
    }

    /**
     * @return The method
     */
    public String getMethod() {
        return method;
    }

    /**
     * @param method The method
     */
    public void setMethod(String method) {
        this.method = method;
    }

    /**
     * @return The templateId
     */
    public String getTemplateId() {
        return templateId;
    }

    /**
     * @param templateId The templateId
     */
    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

}
