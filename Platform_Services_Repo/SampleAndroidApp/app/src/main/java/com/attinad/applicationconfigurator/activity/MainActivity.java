package com.attinad.applicationconfigurator.activity;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

import com.attinad.applicationconfigurator.R;
import com.attinad.applicationconfigurator.constants.Config;
import com.attinad.applicationconfigurator.model.Params.BandData;
import com.attinad.applicationconfigurator.model.Params.BandRequest;
import com.attinad.applicationconfigurator.model.Params.ConfigurationRequest;
import com.attinad.applicationconfigurator.model.Params.Data;
import com.attinad.applicationconfigurator.model.Params.FormData;
import com.attinad.applicationconfigurator.model.Params.FormRequest;
import com.attinad.applicationconfigurator.model.response.BandResponse;
import com.attinad.applicationconfigurator.model.response.Pages;
import com.attinad.applicationconfigurator.model.response.SignUpResponse;
import com.attinad.applicationconfigurator.network.RetrofitClient;
import com.attinad.applicationconfigurator.network.RetrofitResponseHandler;
import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import retrofit.Callback;
import retrofit.RetrofitError;
import retrofit.client.Response;

public class MainActivity extends AppCompatActivity {

    private static final String ERR_MSG_JSON_EXCEPTION = "Unable to generate JSON from server response: ";
    private static final String ERR_MSG_MISSING_RESPONSE = "Server error; missing response data";
    private static String TAG = MainActivity.class.getSimpleName();
    String endpoint = "http://192.168.3.124:9400/api/public";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

//        getApplicationConfiguration();

    }

    @Override
    protected void onResume() {
        super.onResume();
        getApplicationConfiguration();

    }

    // Just checking the api calls whether it is working

    private void getApplicationConfiguration() {
        ConfigurationRequest configurationRequest = new ConfigurationRequest();
        configurationRequest.setCommand("getProjectConfiguration");
        Data data = new Data();
        data.setIsMinimalConfig(true);
        data.setProjectId("02090433244256412110");
        data.setRuleId("71552511581262141201");
        configurationRequest.setData(data);
        RetrofitClient.getRestClient(endpoint).getProjectConfiguration("/execute", configurationRequest, new Callback<Response>() {
            @Override
            public void success(Response response, Response response2) {
                String message = null;
                Throwable cause = null;

                try {
                    RetrofitResponseHandler.handleResponse(response, new com.attinad.applicationconfigurator.network.Callback<JSONObject>() {
                        @Override
                        public void execute(JSONObject response) {

                            Gson gson = new Gson();
                            Pages pages = gson.fromJson(response.toString(), Pages.class);
                            Log.d(TAG, "on Success--" + pages);
                            getBandData();
                        }
                    });
                } catch (Exception exception) {
//                    message = ERR_MSG_JSON_EXCEPTION + exception.getMessage();
//                    cause = exception;
//                    handleFailure(facility, message, cause, onFailure);

                }
            }

            @Override
            public void failure(RetrofitError error) {
                Log.d(TAG, "On Failure--" + error.getUrl() + "--error" + error.getMessage());
            }
        });
    }

    private void getBandData() {

        BandRequest bandRequest = new BandRequest();
        bandRequest.setCommand("getBandData");
        BandData bandData = new BandData();
        bandData.setRuleId(Config.ruleId);
        bandData.setProjectId(Config.projectId);
        bandData.setBandId("rent_a_movie");
        bandRequest.setData(bandData);

        RetrofitClient.getRestClient(endpoint).getBandData("/execute", bandRequest, new Callback<Response>() {
            @Override
            public void success(Response response, Response response2) {
                String message = null;
                Throwable cause = null;

                try {
                    RetrofitResponseHandler.handleArrayResponse(response, new com.attinad.applicationconfigurator.network.Callback<JSONArray>() {
                        @Override
                        public void execute(JSONArray response) {
                            try {
                                JSONObject jsonObject = (JSONObject) response.get(0);
                                Gson gson = new Gson();
                                BandResponse bandResponse = gson.fromJson(jsonObject.toString(), BandResponse.class);
                                Log.d(TAG, "on Success--" + bandResponse);
                                getFormData();
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    });
                      /*  @Override
                        public void execute(ArrayList<JSONObject> response) {
                            for (JSONObject jsonObject : response){
                                Gson gson = new Gson();
                                BandResponse bandResponse = gson.fromJson(jsonObject.toString(), BandResponse.class);
                                Log.d(TAG,"on Success--"+bandResponse);
                            }
                        }
                    });*/
                     /*   @Override
                        public void execute(JSONObject response) {

                            Gson gson = new Gson();
                            BandResponse bandResponse = gson.fromJson(response.toString(), BandResponse.class);
                            Log.d(TAG,"on Success--"+bandResponse);
                        }
                    });*/
                } catch (Exception exception) {
//                    message = ERR_MSG_JSON_EXCEPTION + exception.getMessage();
//                    cause = exception;
//                    handleFailure(facility, message, cause, onFailure);

                }
            }

            @Override
            public void failure(RetrofitError error) {
                Log.d(TAG, "On Failure--" + error.getUrl() + "--error" + error.getMessage());
            }
        });

    }

    private void getFormData() {
        FormRequest formRequest = new FormRequest();
        formRequest.setCommand("getFormData");
        FormData formData = new FormData();
        formData.setProjectId(Config.projectId);
        formData.setRuleId(Config.ruleId);
        formData.setFormId("signup_form");
        formRequest.setData(formData);

        RetrofitClient.getRestClient(endpoint).getFormData("/execute", formRequest, new Callback<Response>() {
            @Override
            public void success(Response response, Response response2) {
                String message = null;
                Throwable cause = null;

                try {
                    RetrofitResponseHandler.handleArrayResponse(response, new com.attinad.applicationconfigurator.network.Callback<JSONArray>() {
                        @Override
                        public void execute(JSONArray response) {
                            try {
                                JSONObject jsonObject = (JSONObject) response.get(0);
                                Gson gson = new Gson();
                                SignUpResponse bandResponse = gson.fromJson(jsonObject.toString(), SignUpResponse.class);
                                Log.d(TAG, "on Success--" + bandResponse);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    });

                } catch (Exception exception) {
//                    message = ERR_MSG_JSON_EXCEPTION + exception.getMessage();
//                    cause = exception;
//                    handleFailure(facility, message, cause, onFailure);

                }
            }

            @Override
            public void failure(RetrofitError error) {
                Log.d(TAG, "On Failure--" + error.getUrl() + "--error" + error.getMessage());
            }
        });

    }


}
