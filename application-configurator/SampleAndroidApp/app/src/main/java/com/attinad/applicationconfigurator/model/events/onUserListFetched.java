package com.attinad.applicationconfigurator.model.events;

import com.attinad.applicationconfigurator.model.response.SignUpResponse;
import com.attinad.applicationconfigurator.model.response.userModels.UserDataList;

/**
 * Created by arjunsatish on 16/6/16.
 */
public class onUserListFetched {
    private UserDataList userDataList;
    private SignUpResponse formData;

    public onUserListFetched(UserDataList userDataList, SignUpResponse formData) {
        this.userDataList = userDataList;
        this.formData = formData;
    }

    public SignUpResponse getFormData() {
        return formData;
    }

    public void setFormData(SignUpResponse formData) {
        this.formData = formData;
    }

    public UserDataList getUserDataList() {
        return userDataList;
    }

    public void setUserDataList(UserDataList userDataList) {
        this.userDataList = userDataList;
    }
}
