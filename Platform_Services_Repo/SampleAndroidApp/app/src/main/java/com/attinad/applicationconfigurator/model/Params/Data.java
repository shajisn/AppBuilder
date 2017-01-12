package com.attinad.applicationconfigurator.model.Params;

/**
 * Created by arjunsatish on 31/5/16.
 */
public class Data {
    private boolean isMinimalConfig;
    private String projectId;
    private String ruleId;

    public boolean getIsMinimalConfig() {
        return isMinimalConfig;
    }

    public void setIsMinimalConfig(boolean isMinimalConfig) {
        this.isMinimalConfig = isMinimalConfig;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getRuleId() {
        return ruleId;
    }

    public void setRuleId(String ruleId) {
        this.ruleId = ruleId;
    }
}
