package com.attinad.applicationconfigurator.model.response.allConfig;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class PartnerInfo {

    @SerializedName("evergent_partner_info")
    @Expose
    private String evergentPartnerInfo;

    /**
     * @return The evergentPartnerInfo
     */
    public String getEvergentPartnerInfo() {
        return evergentPartnerInfo;
    }

    /**
     * @param evergentPartnerInfo The evergent_partner_info
     */
    public void setEvergentPartnerInfo(String evergentPartnerInfo) {
        this.evergentPartnerInfo = evergentPartnerInfo;
    }

}
