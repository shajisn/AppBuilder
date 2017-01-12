package com.attinad.applicationconfigurator.model.Params;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class CrudRequest {

    @SerializedName("command")
    @Expose
    private String command;
    @SerializedName("data")
    @Expose
    private CrudData data;

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
    public CrudData getData() {
        return data;
    }

    /**
     * @param data The data
     */
    public void setData(CrudData data) {
        this.data = data;
    }

}
