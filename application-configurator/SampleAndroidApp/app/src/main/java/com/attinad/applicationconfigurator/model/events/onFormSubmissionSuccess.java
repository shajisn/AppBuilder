package com.attinad.applicationconfigurator.model.events;

import com.attinad.applicationconfigurator.model.response.FormSubmitResponse;

/**
 * Created by arjunsatish on 15/6/16.
 */
public class onFormSubmissionSuccess {
    private FormSubmitResponse formSubmitResponse;

    public onFormSubmissionSuccess(FormSubmitResponse formSubmitResponse) {
        this.formSubmitResponse = formSubmitResponse;
    }

    public FormSubmitResponse getFormSubmitResponse() {
        return formSubmitResponse;
    }

    public void setFormSubmitResponse(FormSubmitResponse formSubmitResponse) {
        this.formSubmitResponse = formSubmitResponse;
    }
}
