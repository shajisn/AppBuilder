package com.attinad.applicationconfigurator.model.response.allConfig;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class MidddlewareAnd3rdPartyKeys {

    @SerializedName("facebook_app_id")
    @Expose
    private String facebookAppId;
    @SerializedName("google_app_id")
    @Expose
    private String googleAppId;
    @SerializedName("partner_info")
    @Expose
    private PartnerInfo partnerInfo;

    /**
     * @return The facebookAppId
     */
    public String getFacebookAppId() {
        return facebookAppId;
    }

    /**
     * @param facebookAppId The facebook_app_id
     */
    public void setFacebookAppId(String facebookAppId) {
        this.facebookAppId = facebookAppId;
    }

    /**
     * @return The googleAppId
     */
    public String getGoogleAppId() {
        return googleAppId;
    }

    /**
     * @param googleAppId The google_app_id
     */
    public void setGoogleAppId(String googleAppId) {
        this.googleAppId = googleAppId;
    }

    /**
     * @return The partnerInfo
     */
    public PartnerInfo getPartnerInfo() {
        return partnerInfo;
    }

    /**
     * @param partnerInfo The partner_info
     */
    public void setPartnerInfo(PartnerInfo partnerInfo) {
        this.partnerInfo = partnerInfo;
    }

}
