package com.attinad.applicationconfigurator.model.Params;

import com.google.gson.annotations.SerializedName;

/**
 * Created by arjunsatish on 31/5/16.
 */
public class FormRequest {
    private String command;
    @SerializedName("data")
    private FormData data;

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public FormData getData() {
        return data;
    }

    public void setData(FormData data) {
        this.data = data;
    }
}
