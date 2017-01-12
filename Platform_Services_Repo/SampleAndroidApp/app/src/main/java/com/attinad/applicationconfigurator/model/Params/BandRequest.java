package com.attinad.applicationconfigurator.model.Params;

import com.google.gson.annotations.SerializedName;

/**
 * Created by arjunsatish on 31/5/16.
 */
public class BandRequest {

    private String command;
    @SerializedName("data")
    private BandData data;

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public BandData getData() {
        return data;
    }

    public void setData(BandData data) {
        this.data = data;
    }
}
