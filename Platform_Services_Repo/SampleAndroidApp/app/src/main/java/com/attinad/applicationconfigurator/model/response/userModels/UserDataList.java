package com.attinad.applicationconfigurator.model.response.userModels;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class UserDataList {

    @SerializedName("userData")
    @Expose
    private List<User> userData = new ArrayList<>();

    /**
     * @return The userData
     */
    public List<User> getUserData() {
        return userData;
    }

    /**
     * @param userData The userData
     */
    public void setUserData(List<User> userData) {
        this.userData = userData;
    }

}
