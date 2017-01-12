package com.attinad.applicationconfigurator.network;

import retrofit.Endpoint;


public class ConfiguratorEndpoint implements Endpoint {

    private String url;
    private String name;

    @Override
    public String getUrl() {
        if (url == null) throw new IllegalStateException("Endpoint not set.");
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
