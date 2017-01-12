package com.attinad.applicationconfigurator.model.response.allConfig;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class Gateways implements Serializable {

    @SerializedName("auth_gateway")
    @Expose
    private String authGateway;
    @SerializedName("cms_gateway")
    @Expose
    private String cmsGateway;
    @SerializedName("image_resizer")
    @Expose
    private String imageResizer;
    @SerializedName("middleware_url")
    @Expose
    private String middlewareUrl;
    @SerializedName("payment_gateway_url")
    @Expose
    private String paymentGatewayUrl;
    @SerializedName("ovp_gateway")
    @Expose
    private String ovpGateway;

    /**
     * @return The authGateway
     */
    public String getAuthGateway() {
        return authGateway;
    }

    /**
     * @param authGateway The auth_gateway
     */
    public void setAuthGateway(String authGateway) {
        this.authGateway = authGateway;
    }

    /**
     * @return The cmsGateway
     */
    public String getCmsGateway() {
        return cmsGateway;
    }

    /**
     * @param cmsGateway The cms_gateway
     */
    public void setCmsGateway(String cmsGateway) {
        this.cmsGateway = cmsGateway;
    }

    /**
     * @return The imageResizer
     */
    public String getImageResizer() {
        return imageResizer;
    }

    /**
     * @param imageResizer The image_resizer
     */
    public void setImageResizer(String imageResizer) {
        this.imageResizer = imageResizer;
    }

    /**
     * @return The middlewareUrl
     */
    public String getMiddlewareUrl() {
        return middlewareUrl;
    }

    /**
     * @param middlewareUrl The middleware_url
     */
    public void setMiddlewareUrl(String middlewareUrl) {
        this.middlewareUrl = middlewareUrl;
    }

    /**
     * @return The paymentGatewayUrl
     */
    public String getPaymentGatewayUrl() {
        return paymentGatewayUrl;
    }

    /**
     * @param paymentGatewayUrl The payment_gateway_url
     */
    public void setPaymentGatewayUrl(String paymentGatewayUrl) {
        this.paymentGatewayUrl = paymentGatewayUrl;
    }

    /**
     * @return The ovpGateway
     */
    public String getOvpGateway() {
        return ovpGateway;
    }

    /**
     * @param ovpGateway The ovp_gateway
     */
    public void setOvpGateway(String ovpGateway) {
        this.ovpGateway = ovpGateway;
    }

}
