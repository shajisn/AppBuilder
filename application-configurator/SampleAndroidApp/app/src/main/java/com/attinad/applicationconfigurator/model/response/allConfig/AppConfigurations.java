package com.attinad.applicationconfigurator.model.response.allConfig;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class AppConfigurations {

    @SerializedName("ad_config_list")
    @Expose
    private List<AdConfigList> adConfigList = new ArrayList<AdConfigList>();
    @SerializedName("advertise_with_us")
    @Expose
    private String advertiseWithUs;
    @SerializedName("app_version")
    @Expose
    private AppVersion appVersion;
    @SerializedName("appgrid_cache_time")
    @Expose
    private String appgridCacheTime;
    @SerializedName("language_filter_options")
    @Expose
    private List<LanguageFilterOption> languageFilterOptions = new ArrayList<LanguageFilterOption>();
    @SerializedName("ovp_cache_time")
    @Expose
    private String ovpCacheTime;
    @SerializedName("payment_options")
    @Expose
    private List<PaymentOption> paymentOptions = new ArrayList<PaymentOption>();
    @SerializedName("re-captcha_key")
    @Expose
    private String reCaptchaKey;
    @SerializedName("share_options")
    @Expose
    private List<ShareOption> shareOptions = new ArrayList<ShareOption>();
    @SerializedName("sms_sender")
    @Expose
    private String smsSender;
    @SerializedName("sorting_filter")
    @Expose
    private List<SortingFilter> sortingFilter = new ArrayList<SortingFilter>();

    /**
     * @return The adConfigList
     */
    public List<AdConfigList> getAdConfigList() {
        return adConfigList;
    }

    /**
     * @param adConfigList The ad_config_list
     */
    public void setAdConfigList(List<AdConfigList> adConfigList) {
        this.adConfigList = adConfigList;
    }

    /**
     * @return The advertiseWithUs
     */
    public String getAdvertiseWithUs() {
        return advertiseWithUs;
    }

    /**
     * @param advertiseWithUs The advertise_with_us
     */
    public void setAdvertiseWithUs(String advertiseWithUs) {
        this.advertiseWithUs = advertiseWithUs;
    }

    /**
     * @return The appVersion
     */
    public AppVersion getAppVersion() {
        return appVersion;
    }

    /**
     * @param appVersion The app_version
     */
    public void setAppVersion(AppVersion appVersion) {
        this.appVersion = appVersion;
    }

    /**
     * @return The appgridCacheTime
     */
    public String getAppgridCacheTime() {
        return appgridCacheTime;
    }

    /**
     * @param appgridCacheTime The appgrid_cache_time
     */
    public void setAppgridCacheTime(String appgridCacheTime) {
        this.appgridCacheTime = appgridCacheTime;
    }

    /**
     * @return The languageFilterOptions
     */
    public List<LanguageFilterOption> getLanguageFilterOptions() {
        return languageFilterOptions;
    }

    /**
     * @param languageFilterOptions The language_filter_options
     */
    public void setLanguageFilterOptions(List<LanguageFilterOption> languageFilterOptions) {
        this.languageFilterOptions = languageFilterOptions;
    }

    /**
     * @return The ovpCacheTime
     */
    public String getOvpCacheTime() {
        return ovpCacheTime;
    }

    /**
     * @param ovpCacheTime The ovp_cache_time
     */
    public void setOvpCacheTime(String ovpCacheTime) {
        this.ovpCacheTime = ovpCacheTime;
    }

    /**
     * @return The paymentOptions
     */
    public List<PaymentOption> getPaymentOptions() {
        return paymentOptions;
    }

    /**
     * @param paymentOptions The payment_options
     */
    public void setPaymentOptions(List<PaymentOption> paymentOptions) {
        this.paymentOptions = paymentOptions;
    }

    /**
     * @return The reCaptchaKey
     */
    public String getReCaptchaKey() {
        return reCaptchaKey;
    }

    /**
     * @param reCaptchaKey The re-captcha_key
     */
    public void setReCaptchaKey(String reCaptchaKey) {
        this.reCaptchaKey = reCaptchaKey;
    }

    /**
     * @return The shareOptions
     */
    public List<ShareOption> getShareOptions() {
        return shareOptions;
    }

    /**
     * @param shareOptions The share_options
     */
    public void setShareOptions(List<ShareOption> shareOptions) {
        this.shareOptions = shareOptions;
    }

    /**
     * @return The smsSender
     */
    public String getSmsSender() {
        return smsSender;
    }

    /**
     * @param smsSender The sms_sender
     */
    public void setSmsSender(String smsSender) {
        this.smsSender = smsSender;
    }

    /**
     * @return The sortingFilter
     */
    public List<SortingFilter> getSortingFilter() {
        return sortingFilter;
    }

    /**
     * @param sortingFilter The sorting_filter
     */
    public void setSortingFilter(List<SortingFilter> sortingFilter) {
        this.sortingFilter = sortingFilter;
    }

}
