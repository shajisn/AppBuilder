package com.attinad.applicationconfigurator.model.events;

import com.attinad.applicationconfigurator.model.response.SignUpResponse;

/**
 * Created by arjunsatish on 20/6/16.
 */
public class onUpdateAndDelete {
    //delete or update
    private String operationToBeDone;
    private SignUpResponse signUpResponse;

    public String getTemplateID() {
        return templateID;
    }

    public void setTemplateID(String templateID) {
        this.templateID = templateID;
    }

    private String templateID;

    public onUpdateAndDelete(String operationToBeDone, SignUpResponse signUpResponse, String templateID) {
        this.operationToBeDone = operationToBeDone;
        this.signUpResponse = signUpResponse;
        this.templateID = templateID;
    }

    public SignUpResponse getSignUpResponse() {
        return signUpResponse;
    }

    public void setSignUpResponse(SignUpResponse signUpResponse) {
        this.signUpResponse = signUpResponse;
    }

    public String getOperationToBeDone() {
        return operationToBeDone;
    }

    public void setOperationToBeDone(String operationToBeDone) {
        this.operationToBeDone = operationToBeDone;
    }
}
