package com.attinad.applicationconfigurator.model.Params;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class CrudData {

    @SerializedName("crudId")
    @Expose
    private String crudId;
    @SerializedName("projectId")
    @Expose
    private String projectId;
    @SerializedName("ruleId")
    @Expose
    private String ruleId;

    /**
     * @return The crudId
     */
    public String getCrudId() {
        return crudId;
    }

    /**
     * @param crudId The crudId
     */
    public void setCrudId(String crudId) {
        this.crudId = crudId;
    }

    /**
     * @return The projectId
     */
    public String getProjectId() {
        return projectId;
    }

    /**
     * @param projectId The projectId
     */
    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    /**
     * @return The ruleId
     */
    public String getRuleId() {
        return ruleId;
    }

    /**
     * @param ruleId The ruleId
     */
    public void setRuleId(String ruleId) {
        this.ruleId = ruleId;
    }

}
