package com.attinad.applicationconfigurator.model.Params;

/**
 * Created by arjunsatish on 31/5/16.
 */
public class ConfigurationRequest {
    private String command;
    private Data data;

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }
}
