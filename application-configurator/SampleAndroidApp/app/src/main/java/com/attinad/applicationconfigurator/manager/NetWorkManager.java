package com.attinad.applicationconfigurator.manager;

import android.util.Log;

import com.attinad.applicationconfigurator.constants.Config;
import com.attinad.applicationconfigurator.model.ErrorResponse;
import com.attinad.applicationconfigurator.model.Params.BandData;
import com.attinad.applicationconfigurator.model.Params.BandRequest;
import com.attinad.applicationconfigurator.model.Params.ConfigurationRequest;
import com.attinad.applicationconfigurator.model.Params.CrudData;
import com.attinad.applicationconfigurator.model.Params.CrudRequest;
import com.attinad.applicationconfigurator.model.Params.Data;
import com.attinad.applicationconfigurator.model.Params.DeleteData;
import com.attinad.applicationconfigurator.model.Params.DeleteRequest;
import com.attinad.applicationconfigurator.model.Params.FormData;
import com.attinad.applicationconfigurator.model.Params.FormRequest;
import com.attinad.applicationconfigurator.model.Params.OVPData;
import com.attinad.applicationconfigurator.model.Params.OVPRequest;
import com.attinad.applicationconfigurator.model.Params.UserData;
import com.attinad.applicationconfigurator.model.Params.UserRequest;
import com.attinad.applicationconfigurator.model.response.BandBaseResponse;
import com.attinad.applicationconfigurator.model.response.BandResponse;
import com.attinad.applicationconfigurator.model.response.DeleteResponse;
import com.attinad.applicationconfigurator.model.response.Form;
import com.attinad.applicationconfigurator.model.response.FormSubmitResponse;
import com.attinad.applicationconfigurator.model.response.Pages;
import com.attinad.applicationconfigurator.model.response.PagesBaseResponse;
import com.attinad.applicationconfigurator.model.response.SignUpResponse;
import com.attinad.applicationconfigurator.model.response.SignupBaseResponse;
import com.attinad.applicationconfigurator.model.response.allConfig.AllConfig;
import com.attinad.applicationconfigurator.model.response.crudModels.CrudBaseReponse;
import com.attinad.applicationconfigurator.model.response.crudModels.CrudResponse;
import com.attinad.applicationconfigurator.model.response.dataModels.Items;
import com.attinad.applicationconfigurator.model.response.dataModels.ItemsBaseResponse;
import com.attinad.applicationconfigurator.model.response.userModels.UserBaseResponse;
import com.attinad.applicationconfigurator.model.response.userModels.UserDataList;
import com.attinad.applicationconfigurator.network.Callback;
import com.attinad.applicationconfigurator.network.RestCallback;
import com.attinad.applicationconfigurator.network.RestError;
import com.attinad.applicationconfigurator.network.RetrofitClient;
import com.attinad.applicationconfigurator.network.RetrofitResponseHandler;
import com.google.gson.Gson;

import org.json.JSONObject;

import java.util.HashMap;

import retrofit.RetrofitError;
import retrofit.client.Response;
import retrofit.mime.TypedFile;

/**
 * Created by arjunsatish on 1/6/16.
 */
public class NetWorkManager {

    private static final String TAG = NetWorkManager.class.getSimpleName();
    private static NetWorkManager ourInstance;
    private static String endpoint = "http://192.168.3.124:9400/api/public";

    private NetWorkManager() {
    }

    public static NetWorkManager getInstance() {
        if (ourInstance == null) {
            ourInstance = new NetWorkManager();
        }
        return ourInstance;
    }


    public void getAllConfig(final Callback<AllConfig> onSuccess, final Callback<ErrorResponse> onFailure) {

        ConfigurationRequest configurationRequest = new ConfigurationRequest();
        configurationRequest.setCommand("getProjectConfiguration");
        Data data = new Data();
        data.setIsMinimalConfig(false);
        data.setProjectId(Config.projectId);
        data.setRuleId(Config.ruleId);
        configurationRequest.setData(data);

        RetrofitClient.getRestClient(endpoint).getProjectConfiguration("/execute", configurationRequest, new retrofit.Callback<Response>() {
            @Override
            public void success(Response response, Response response2) {
                String message = null;
                Throwable cause = null;

                try {
                    RetrofitResponseHandler.handleResponse(response, new Callback<JSONObject>() {
                        @Override
                        public void execute(JSONObject response) {

                            Gson gson = new Gson();
                            AllConfig allConfig = gson.fromJson(response.toString(), AllConfig.class);
                            Log.d(TAG, "on Success--" + allConfig);
                            onSuccess.execute(allConfig);
                        }
                    });
                } catch (Exception exception) {
                    Log.d(TAG, "On Failure--" + exception.toString());
                    onFailure.execute(new ErrorResponse("Error in Parsing Data"));
                }
            }

            @Override
            public void failure(RetrofitError error) {
                Log.d(TAG, "On Failure--" + error.getUrl() + "--error" + error.getMessage());
                onFailure.execute(new ErrorResponse(error.getMessage()));
            }
        });
    }


    public void getBaseConfiguration(final Callback<Pages> onSuccess, final Callback<ErrorResponse> onFailure) {

        ConfigurationRequest configurationRequest = new ConfigurationRequest();
        configurationRequest.setCommand("getProjectConfiguration");
        Data data = new Data();
        data.setIsMinimalConfig(true);
        data.setProjectId(Config.projectId);
        data.setRuleId(Config.ruleId);
        configurationRequest.setData(data);

        RetrofitClient.getRestClient(endpoint).getProjectConfiguration("/execute", configurationRequest, new retrofit.Callback<Response>() {
            @Override
            public void success(Response response, Response response2) {
                String message = null;
                Throwable cause = null;

                try {
                    RetrofitResponseHandler.handleResponse(response, new Callback<JSONObject>() {
                        @Override
                        public void execute(JSONObject response) {

                            Gson gson = new Gson();
                            PagesBaseResponse pages = gson.fromJson(response.toString(), PagesBaseResponse.class);
                            Log.d(TAG, "on Success--" + pages);
                            onSuccess.execute(pages.getData());
                        }
                    });
                } catch (Exception exception) {
                    Log.d(TAG, "On Failure--" + exception.toString());
                    onFailure.execute(new ErrorResponse("Error in Parsing Data"));
                }
            }

            @Override
            public void failure(RetrofitError error) {
                Log.d(TAG, "On Failure--" + error.getUrl() + "--error" + error.getMessage());
                onFailure.execute(new ErrorResponse(error.getMessage()));
            }
        });
    }

    public void getBandData(final String bandId, final Callback<BandResponse> onSuccess, final Callback<ErrorResponse> onFailure) {
        BandRequest bandRequest = new BandRequest();
        bandRequest.setCommand("getBandData");
        BandData bandData = new BandData();
        bandData.setRuleId(Config.ruleId);
        bandData.setProjectId(Config.projectId);
        bandData.setBandId(bandId);
//        bandData.setBandId("rent_a_movie");
        bandRequest.setData(bandData);

        RetrofitClient.getRestClient(endpoint).getBandData("/execute", bandRequest, new retrofit.Callback<Response>() {
            @Override
            public void success(Response response, Response response2) {
                String message = null;
                Throwable cause = null;

                try {
                    RetrofitResponseHandler.handleResponse(response, new Callback<JSONObject>() {
                        @Override
                        public void execute(JSONObject response) {
                            try {
                                Gson gson = new Gson();
                                BandBaseResponse bandResponse = gson.fromJson(response.toString(), BandBaseResponse.class);
                                Log.d(TAG, "on Success--" + bandResponse);
                                onSuccess.execute(bandResponse.getData().get(0));
                            } catch (Exception exception) {
                                onFailure.execute(new ErrorResponse("Error in Parsing Data"));
                            }
                        }
                    });
                } catch (Exception exception) {
                    onFailure.execute(new ErrorResponse("Error in Parsing Data"));

                }
            }

            @Override
            public void failure(RetrofitError error) {
                Log.d(TAG, "On Failure--" + error.getUrl() + "--error" + error.getMessage());
                onFailure.execute(new ErrorResponse(error.getMessage()));
            }
        });
    }


    public void getOvpDataForABand(BandResponse bandResponse,final Callback<Items> onSuccess, final Callback<ErrorResponse> onFailure) {
        OVPRequest ovpRequest = new OVPRequest();
        ovpRequest.setCommand("getData");
        OVPData ovpData = new OVPData();
        ovpData.setPage_number("0");
        ovpData.setPage_size(bandResponse.getCount());
        ovpData.setSort_by(bandResponse.getSort());
        ovpData.setSeacrh_query(bandResponse.getData());
        ovpRequest.setTemplateId(bandResponse.getTemplateId());
        ovpRequest.setMethod("get");
        ovpRequest.setData(ovpData);

        RetrofitClient.getRestClient(endpoint).getOVPData("/execute", ovpRequest, new RestCallback<Response>() {
            @Override
            public void failure(RestError restError) {

            }

            @Override
            public void success(Response response, Response response2) {

                try {
                    RetrofitResponseHandler.handleResponse(response, new Callback<JSONObject>() {
                        @Override
                        public void execute(JSONObject response) {

                            Gson gson = new Gson();
                            ItemsBaseResponse items = gson.fromJson(response.toString(), ItemsBaseResponse.class);
                            Log.d(TAG, "on Success--" + items);
                            onSuccess.execute(items.getData());
                        }
                    });
                } catch (Exception exception) {
                    Log.d(TAG, "On Failure--" + exception.toString());
                    onFailure.execute(new ErrorResponse("Error in Parsing Data"));
                }
            }
        });

    }

    public void getFormData(Form form, final Callback<SignUpResponse> onSuccess, final Callback<ErrorResponse> onFailure) {
        FormRequest formRequest = new FormRequest();
        formRequest.setCommand("getFormData");
        FormData formData = new FormData();
        formData.setProjectId(Config.projectId);
        formData.setRuleId(Config.ruleId);
        formData.setFormId(form.getFormId());
        formRequest.setData(formData);

        RetrofitClient.getRestClient(endpoint).getFormData("/execute", formRequest, new retrofit.Callback<Response>() {
            @Override
            public void success(Response response, Response response2) {
                String message = null;
                Throwable cause = null;

                try {

                    RetrofitResponseHandler.handleResponse(response, new Callback<JSONObject>() {
                        @Override
                        public void execute(JSONObject response) {
                            Gson gson = new Gson();
                            SignupBaseResponse signUpBaseResponse = gson.fromJson(response.toString(), SignupBaseResponse.class);
                            Log.d(TAG, "on Success--" + signUpBaseResponse);
                            onSuccess.execute(signUpBaseResponse.getData().get(0));
                        }
                    });

                } catch (Exception exception) {
//                    message = ERR_MSG_JSON_EXCEPTION + exception.getMessage();
//                    cause = exception;
//                    handleFailure(facility, message, cause, onFailure);
                    onFailure.execute(new ErrorResponse(exception.toString()));
                }
            }

            @Override
            public void failure(RetrofitError error) {
                Log.d(TAG, "On Failure--" + error.getUrl() + "--error" + error.getMessage());
            }
        });
    }

    public void getFormSubmitResponse(HashMap<String, Object> formSubmitRequest, final Callback<FormSubmitResponse> onSuccess, final Callback<ErrorResponse> onFailure) {

        RetrofitClient.getRestClient(endpoint).getFormResponse("/execute", formSubmitRequest, new retrofit.Callback<Response>() {
            @Override
            public void success(Response response, Response response2) {
                String message = null;
                Throwable cause = null;

                try {

                    RetrofitResponseHandler.handleResponse(response, new Callback<JSONObject>() {
                        @Override
                        public void execute(JSONObject response) {
                            Gson gson = new Gson();
                            FormSubmitResponse formSubmitResponse = gson.fromJson(response.toString(), FormSubmitResponse.class);
                            Log.d(TAG, "on Success--" + formSubmitResponse);
                            onSuccess.execute(formSubmitResponse);
                        }
                    });

                } catch (Exception exception) {
//                    message = ERR_MSG_JSON_EXCEPTION + exception.getMessage();
//                    cause = exception;
//                    handleFailure(facility, message, cause, onFailure);
                    onFailure.execute(new ErrorResponse(exception.toString()));
                }
            }

            @Override
            public void failure(RetrofitError error) {
                Log.d(TAG, "On Failure--" + error.getUrl() + "--error" + error.getMessage());
            }
        });
    }


    public void getStaticFormSubmitResponse(HashMap<String, Object> formSubmitRequest, TypedFile typedFile, final Callback<FormSubmitResponse> onSuccess, final Callback<ErrorResponse> onFailure) {

        RetrofitClient.getRestClient(endpoint).getFormResponseWithImage("/execute", formSubmitRequest, typedFile, new retrofit.Callback<Response>() {
            @Override
            public void success(Response response, Response response2) {
                String message = null;
                Throwable cause = null;

                try {

                    RetrofitResponseHandler.handleResponse(response, new Callback<JSONObject>() {
                        @Override
                        public void execute(JSONObject response) {
                            Gson gson = new Gson();
                            FormSubmitResponse formSubmitResponse = gson.fromJson(response.toString(), FormSubmitResponse.class);
                            Log.d(TAG, "on Success--" + formSubmitResponse);
                            onSuccess.execute(formSubmitResponse);
                        }
                    });

                } catch (Exception exception) {
//                    message = ERR_MSG_JSON_EXCEPTION + exception.getMessage();
//                    cause = exception;
//                    handleFailure(facility, message, cause, onFailure);
                    onFailure.execute(new ErrorResponse(exception.toString()));
                }
            }

            @Override
            public void failure(RetrofitError error) {
                Log.d(TAG, "On Failure--" + error.getUrl() + "--error" + error.getMessage());
            }
        });
    }

    public void getCrudConfiguration(final Callback<CrudResponse> onSuccess, final Callback<ErrorResponse> onFailure) {

        CrudRequest crudRequest = new CrudRequest();
        crudRequest.setCommand("getCRUDData");
        CrudData data = new CrudData();
        data.setCrudId("user_crud");
        data.setProjectId(Config.projectId);
        data.setRuleId(Config.ruleId);
        crudRequest.setData(data);

        RetrofitClient.getRestClient(endpoint).getCrudData("/execute", crudRequest, new retrofit.Callback<Response>() {
            @Override
            public void success(Response response, Response response2) {
                String message = null;
                Throwable cause = null;

                try {
                    RetrofitResponseHandler.handleResponse(response, new Callback<JSONObject>() {
                        @Override
                        public void execute(JSONObject response) {

                            Gson gson = new Gson();
                            CrudBaseReponse crudBaseReponse = gson.fromJson(response.toString(), CrudBaseReponse.class);
                            Log.d(TAG, "on Success--" + crudBaseReponse);
                            onSuccess.execute(crudBaseReponse.getData());
                        }
                    });
                } catch (Exception exception) {
                    Log.d(TAG, "On Failure--" + exception.toString());
                    onFailure.execute(new ErrorResponse("Error in Parsing Data"));
                }
            }

            @Override
            public void failure(RetrofitError error) {
                Log.d(TAG, "On Failure--" + error.getUrl() + "--error" + error.getMessage());
                onFailure.execute(new ErrorResponse(error.getMessage()));
            }
        });
    }

    public void getUserData(String templateId, final Callback<UserDataList> onSuccess, final Callback<ErrorResponse> onFailure) {
        UserRequest userRequest = new UserRequest();
        userRequest.setCommand("getData");
        UserData userData = new UserData();
        userRequest.setTemplateId(templateId);
        userRequest.setMethod("get");
        userRequest.setData(userData);

        RetrofitClient.getRestClient(endpoint).getUserData("/execute", userRequest, new RestCallback<Response>() {
            @Override
            public void failure(RestError restError) {

            }

            @Override
            public void success(Response response, Response response2) {

                try {
                    RetrofitResponseHandler.handleResponse(response, new Callback<JSONObject>() {
                        @Override
                        public void execute(JSONObject response) {

                            Gson gson = new Gson();
                            UserBaseResponse userBaseResponse = gson.fromJson(response.toString(), UserBaseResponse.class);
                            Log.d(TAG, "on Success--" + userBaseResponse);
                            onSuccess.execute(userBaseResponse.getData());
                        }
                    });
                } catch (Exception exception) {
                    Log.d(TAG, "On Failure--" + exception.toString());
                    onFailure.execute(new ErrorResponse("Error in Parsing Data"));
                }
            }
        });

    }



    public void getDeleteResponse(String templateId, String id, final Callback<DeleteResponse> onSuccess, final Callback<ErrorResponse> onFailure) {
        DeleteRequest deleteRequest = new DeleteRequest();
        deleteRequest.setCommand("deleteData");
        DeleteData deleteData = new DeleteData();
        deleteData.setId(id);
        deleteRequest.setTemplateId(templateId);
        deleteRequest.setData(deleteData);

        RetrofitClient.getRestClient(endpoint).getDeleteResponse("/execute", deleteRequest, new RestCallback<Response>() {
            @Override
            public void failure(RestError restError) {

            }

            @Override
            public void success(Response response, Response response2) {

                try {
                    RetrofitResponseHandler.handleResponse(response, new Callback<JSONObject>() {
                        @Override
                        public void execute(JSONObject response) {

                            Gson gson = new Gson();
                            DeleteResponse deleteResponse = gson.fromJson(response.toString(), DeleteResponse.class);
                            Log.d(TAG, "on Success--" + deleteResponse);
                            onSuccess.execute(deleteResponse);
                        }
                    });
                } catch (Exception exception) {
                    Log.d(TAG, "On Failure--" + exception.toString());
                    onFailure.execute(new ErrorResponse("Error in Parsing Data"));
                }
            }
        });

    }

}
