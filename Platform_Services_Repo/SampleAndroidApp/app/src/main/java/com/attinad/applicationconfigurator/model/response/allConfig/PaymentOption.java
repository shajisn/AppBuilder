package com.attinad.applicationconfigurator.model.response.allConfig;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class PaymentOption {

    @SerializedName("display_title_key")
    @Expose
    private String displayTitleKey;
    @SerializedName("payment_option_value")
    @Expose
    private String paymentOptionValue;
    @SerializedName("payment_restriction_value")
    @Expose
    private String paymentRestrictionValue;

    /**
     * @return The displayTitleKey
     */
    public String getDisplayTitleKey() {
        return displayTitleKey;
    }

    /**
     * @param displayTitleKey The display_title_key
     */
    public void setDisplayTitleKey(String displayTitleKey) {
        this.displayTitleKey = displayTitleKey;
    }

    /**
     * @return The paymentOptionValue
     */
    public String getPaymentOptionValue() {
        return paymentOptionValue;
    }

    /**
     * @param paymentOptionValue The payment_option_value
     */
    public void setPaymentOptionValue(String paymentOptionValue) {
        this.paymentOptionValue = paymentOptionValue;
    }

    /**
     * @return The paymentRestrictionValue
     */
    public String getPaymentRestrictionValue() {
        return paymentRestrictionValue;
    }

    /**
     * @param paymentRestrictionValue The payment_restriction_value
     */
    public void setPaymentRestrictionValue(String paymentRestrictionValue) {
        this.paymentRestrictionValue = paymentRestrictionValue;
    }

}
