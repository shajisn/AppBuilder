package com.attinad.applicationconfigurator.model.response.allConfig;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class AppVersion {

    @SerializedName("enforce")
    @Expose
    private String enforce;
    @SerializedName("store_link")
    @Expose
    private String storeLink;
    @SerializedName("version_code")
    @Expose
    private String versionCode;
    @SerializedName("version_name")
    @Expose
    private String versionName;

    /**
     * @return The enforce
     */
    public String getEnforce() {
        return enforce;
    }

    /**
     * @param enforce The enforce
     */
    public void setEnforce(String enforce) {
        this.enforce = enforce;
    }

    /**
     * @return The storeLink
     */
    public String getStoreLink() {
        return storeLink;
    }

    /**
     * @param storeLink The store_link
     */
    public void setStoreLink(String storeLink) {
        this.storeLink = storeLink;
    }

    /**
     * @return The versionCode
     */
    public String getVersionCode() {
        return versionCode;
    }

    /**
     * @param versionCode The version_code
     */
    public void setVersionCode(String versionCode) {
        this.versionCode = versionCode;
    }

    /**
     * @return The versionName
     */
    public String getVersionName() {
        return versionName;
    }

    /**
     * @param versionName The version_name
     */
    public void setVersionName(String versionName) {
        this.versionName = versionName;
    }

}
