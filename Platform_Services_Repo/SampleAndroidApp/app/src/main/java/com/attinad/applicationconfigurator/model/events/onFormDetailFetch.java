package com.attinad.applicationconfigurator.model.events;

import com.attinad.applicationconfigurator.model.response.SignUpResponse;

/**
 * Created by arjunsatish on 9/6/16.
 */
public class onFormDetailFetch {
    private SignUpResponse signUpResponse;

    public onFormDetailFetch(SignUpResponse signUpResponse) {
        this.signUpResponse = signUpResponse;
    }

    public SignUpResponse getSignUpResponse() {
        return signUpResponse;
    }

    public void setSignUpResponse(SignUpResponse signUpResponse) {
        this.signUpResponse = signUpResponse;
    }
}
