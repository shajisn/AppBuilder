package com.attinad.applicationconfigurator.network;


public interface Callback<T> {

    /**
     * Execute the callback with response object.
     *
     * @param response Response object for the callback
     */
    void execute(final T response);
}