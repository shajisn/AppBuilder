package com.attinad.applicationconfigurator.model.Params;

import com.google.gson.annotations.SerializedName;

/**
 * Created by arjunsatish on 31/5/16.
 */
public class OVPRequest {
    private String command;
    @SerializedName("data")
    private OVPData data;
    private String method;
    private String templateId;

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getTemplateId() {
        return templateId;
    }

    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public OVPData getData() {
        return data;
    }

    public void setData(OVPData data) {
        this.data = data;
    }
}
