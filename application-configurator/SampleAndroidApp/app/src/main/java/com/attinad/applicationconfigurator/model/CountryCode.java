package com.attinad.applicationconfigurator.model;


import com.google.gson.annotations.SerializedName;

public class CountryCode {

    @SerializedName("name")
    private String name;
    @SerializedName("code")
    private String code;
    @SerializedName("dial_code")
    private String dialCode;


    public String getDialCode() {
        return dialCode;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setDialCode(String dialCode) {
        this.dialCode = dialCode;
    }

}
