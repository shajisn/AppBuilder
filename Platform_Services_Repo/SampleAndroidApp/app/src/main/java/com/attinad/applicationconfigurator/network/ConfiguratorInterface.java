package com.attinad.applicationconfigurator.network;

import com.attinad.applicationconfigurator.model.Params.BandRequest;
import com.attinad.applicationconfigurator.model.Params.ConfigurationRequest;
import com.attinad.applicationconfigurator.model.Params.CrudRequest;
import com.attinad.applicationconfigurator.model.Params.DeleteRequest;
import com.attinad.applicationconfigurator.model.Params.FormRequest;
import com.attinad.applicationconfigurator.model.Params.OVPRequest;
import com.attinad.applicationconfigurator.model.Params.UserRequest;
import com.attinad.applicationconfigurator.model.response.BandBaseResponse;

import java.util.HashMap;

import retrofit.Callback;
import retrofit.client.Response;
import retrofit.http.Body;
import retrofit.http.Multipart;
import retrofit.http.POST;
import retrofit.http.Part;
import retrofit.http.PartMap;
import retrofit.http.Path;
import retrofit.mime.TypedFile;

/**
 * Created by arjunsatish on 31/5/16.
 */
public interface ConfiguratorInterface {
    @POST("/{path}")
    void getProjectConfiguration(@Path(value = "path", encode = false) String path, @Body ConfigurationRequest requestModel, Callback<Response> onSuccess);

    @POST("/{path}")
    void getBandData(@Path(value = "path", encode = false) String path, @Body BandRequest requestModel, Callback<Response> onSuccess);

    @POST("/{path}")
    void getFormData(@Path(value = "path", encode = false) String path, @Body FormRequest requestModel, Callback<Response> onSuccess);

    @POST("/{path}")
    void getOVPData(@Path(value = "path", encode = false) String path, @Body OVPRequest requestModel, Callback<Response> onSuccess);

    @POST("/{path}")
    void getUserData(@Path(value = "path", encode = false) String path, @Body UserRequest requestModel, Callback<Response> onSuccess);

    @POST("/{path}")
    void getFormResponse(@Path(value = "path", encode = false) String path, @Body HashMap<String, Object> requestModel, Callback<Response> onSuccess);

    @Multipart
    @POST("/{path}")
    void getFormResponseWithImage(@Path(value = "path", encode = false) String path, @PartMap HashMap<String, Object> requestModel, @Part("image") TypedFile file, Callback<Response> onSuccess);

    @POST("/{path}")
    void getCrudData(@Path(value = "path", encode = false) String path, @Body CrudRequest requestModel, Callback<Response> onSuccess);

    @POST("/{path}")
    BandBaseResponse getBandDataSynchronlously(@Path(value = "path", encode = false) String path, @Body BandRequest requestModel);


    @POST("/{path}")
    Response getOVPDataSynchronously(@Path(value = "path", encode = false) String path, @Body OVPRequest requestModel);

    @POST("/{path}")
    void getDeleteResponse(@Path(value = "path", encode = false) String path, @Body DeleteRequest requestModel, Callback<Response> onSuccess);
}
