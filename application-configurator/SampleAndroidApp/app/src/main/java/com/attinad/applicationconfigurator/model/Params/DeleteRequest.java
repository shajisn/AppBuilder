
package com.attinad.applicationconfigurator.model.Params;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class DeleteRequest {

    @SerializedName("command")
    @Expose
    private String command;
    @SerializedName("templateId")
    @Expose
    private String templateId;
    @SerializedName("data")
    @Expose
    private DeleteData data;

    /**
     * 
     * @return
     *     The command
     */
    public String getCommand() {
        return command;
    }

    /**
     * 
     * @param command
     *     The command
     */
    public void setCommand(String command) {
        this.command = command;
    }

    /**
     * 
     * @return
     *     The templateId
     */
    public String getTemplateId() {
        return templateId;
    }

    /**
     * 
     * @param templateId
     *     The templateId
     */
    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

    /**
     * 
     * @return
     *     The data
     */
    public DeleteData getData() {
        return data;
    }

    /**
     * 
     * @param data
     *     The data
     */
    public void setData(DeleteData data) {
        this.data = data;
    }

}
