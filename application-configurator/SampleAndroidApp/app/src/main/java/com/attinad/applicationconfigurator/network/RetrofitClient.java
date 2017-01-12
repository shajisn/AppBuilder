package com.attinad.applicationconfigurator.network;

import android.util.Log;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.squareup.okhttp.Interceptor;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import cz.msebera.android.httpclient.HttpStatus;
import retrofit.RestAdapter;
import retrofit.client.OkClient;
import retrofit.converter.GsonConverter;

/**
 * Created by arjunsatish on 31/5/16.
 */
public class RetrofitClient {

    private static final int CONNECTION_TIMEOUT = 25000;
    private static final int READ_TIMEOUT = 25000;
    private static final int MAX_RETRY_COUNT = 2;
    private static ConfiguratorInterface REST_CLIENT;
    private static String ROOT = "";
    private static String APPGRID = "Appgrid";
    private static ConfiguratorEndpoint configuratorEndpoint = null;

    public static void setROOT(String ROOT, String name) {
        RetrofitClient.ROOT = ROOT;
        configuratorEndpoint = new ConfiguratorEndpoint();
        configuratorEndpoint.setUrl(ROOT);
        configuratorEndpoint.setName(name);
    }

    public static ConfiguratorInterface getRestClient(String url) {
        setROOT(url, APPGRID);
        return setupRestClient();
    }

    private static ConfiguratorInterface setupRestClient() {

        Gson gson = new GsonBuilder()
                .registerTypeAdapterFactory(new ItemTypeAdapterFactory())
                .disableHtmlEscaping()
                .setDateFormat("yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'SSS'Z'")
                .create();
        RestAdapter restAdapter = new RestAdapter.Builder()
                .setLogLevel(RestAdapter.LogLevel.FULL)
                .setEndpoint(configuratorEndpoint)
                .setConverter(new GsonConverter(gson))
                .setClient(new OkClient(getOKHttpClient()))
                .build();

        REST_CLIENT = restAdapter.create(ConfiguratorInterface.class);
        return REST_CLIENT;
    }

    private static OkHttpClient getOKHttpClient() {
        OkHttpClient client = new OkHttpClient();
        client.setConnectTimeout(CONNECTION_TIMEOUT, TimeUnit.MILLISECONDS);
        client.setReadTimeout(READ_TIMEOUT, TimeUnit.MILLISECONDS);
        client.setRetryOnConnectionFailure(true);
        client.interceptors().add(new Interceptor() {
            @Override
            public Response intercept(Chain chain) throws IOException {
                Request request = chain.request();
                // try the request
                Response response = chain.proceed(request);
                int tryCount = 0;
                while (!response.isSuccessful() && (response.code() == HttpStatus.SC_GATEWAY_TIMEOUT || response.code() == HttpStatus.SC_REQUEST_TIMEOUT)
                        && tryCount < MAX_RETRY_COUNT) {
                    Log.d("intercept", "Request is not successful - " + tryCount);
                    tryCount++;
                    // retry the request
                    response = chain.proceed(request);
                }
                // otherwise just pass the original response on
                return response;
            }
        });
        return client;
    }
}
