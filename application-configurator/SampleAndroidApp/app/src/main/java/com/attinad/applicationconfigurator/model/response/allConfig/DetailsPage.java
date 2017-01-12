package com.attinad.applicationconfigurator.model.response.allConfig;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class DetailsPage {

    @SerializedName("details_page_type")
    @Expose
    private String detailsPageType;
    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("vmax_ads/_google_dfp_ads")
    @Expose
    private String vmaxAdsGoogleDfpAds;

    /**
     * @return The detailsPageType
     */
    public String getDetailsPageType() {
        return detailsPageType;
    }

    /**
     * @param detailsPageType The details_page_type
     */
    public void setDetailsPageType(String detailsPageType) {
        this.detailsPageType = detailsPageType;
    }

    /**
     * @return The id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id The id
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return The vmaxAdsGoogleDfpAds
     */
    public String getVmaxAdsGoogleDfpAds() {
        return vmaxAdsGoogleDfpAds;
    }

    /**
     * @param vmaxAdsGoogleDfpAds The vmax_ads/_google_dfp_ads
     */
    public void setVmaxAdsGoogleDfpAds(String vmaxAdsGoogleDfpAds) {
        this.vmaxAdsGoogleDfpAds = vmaxAdsGoogleDfpAds;
    }

}
