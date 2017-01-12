package com.attinad.applicationconfigurator.manager;

import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;

import com.attinad.applicationconfigurator.constants.Config;
import com.attinad.applicationconfigurator.model.ErrorResponse;
import com.attinad.applicationconfigurator.model.Params.BandData;
import com.attinad.applicationconfigurator.model.Params.BandRequest;
import com.attinad.applicationconfigurator.model.Params.OVPData;
import com.attinad.applicationconfigurator.model.Params.OVPRequest;
import com.attinad.applicationconfigurator.model.events.AllConfigEvent;
import com.attinad.applicationconfigurator.model.events.DeleteEvent;
import com.attinad.applicationconfigurator.model.events.PageEvent;
import com.attinad.applicationconfigurator.model.events.onApiFireEvent;
import com.attinad.applicationconfigurator.model.events.onCrudConfiguratonFetched;
import com.attinad.applicationconfigurator.model.events.onFormDetailFetch;
import com.attinad.applicationconfigurator.model.events.onFormSubmissionSuccess;
import com.attinad.applicationconfigurator.model.events.onRailDataFetched;
import com.attinad.applicationconfigurator.model.events.onUserListFetched;
import com.attinad.applicationconfigurator.model.response.Band;
import com.attinad.applicationconfigurator.model.response.BandBaseResponse;
import com.attinad.applicationconfigurator.model.response.BandResponse;
import com.attinad.applicationconfigurator.model.response.DeleteResponse;
import com.attinad.applicationconfigurator.model.response.FormSubmitResponse;
import com.attinad.applicationconfigurator.model.response.Page;
import com.attinad.applicationconfigurator.model.response.Pages;
import com.attinad.applicationconfigurator.model.response.SignUpResponse;
import com.attinad.applicationconfigurator.model.response.allConfig.AllConfig;
import com.attinad.applicationconfigurator.model.response.crudModels.CrudResponse;
import com.attinad.applicationconfigurator.model.response.dataModels.Items;
import com.attinad.applicationconfigurator.model.response.dataModels.ItemsBaseResponse;
import com.attinad.applicationconfigurator.model.response.userModels.UserDataList;
import com.attinad.applicationconfigurator.network.Callback;
import com.attinad.applicationconfigurator.network.RetrofitClient;
import com.attinad.applicationconfigurator.network.RetrofitResponseHandler;
import com.google.gson.Gson;

import org.greenrobot.eventbus.EventBus;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import retrofit.client.Response;
import retrofit.mime.TypedFile;

/**
 * Created by arjunsatish on 1/6/16.
 */
public class ConfigurationManager {
    private static String TAG = ConfigurationManager.class.getSimpleName();
    private static ConfigurationManager ourInstance;
    private Context mContext;
    private EventBus bus = EventBus.getDefault();

    private ConfigurationManager(Context context) {
        this.mContext = context;

    }

    public static ConfigurationManager getInstance(Context context) {
        if (ourInstance == null) {
            ourInstance = new ConfigurationManager(context);
        }
        return ourInstance;
    }

    public void fetchAllConfigurations() {

        NetWorkManager.getInstance().getAllConfig(new Callback<AllConfig>() {
            @Override
            public void execute(AllConfig response) {

                CacheManager.getInstance(mContext).setAllConfigurations(response);
                bus.post(new AllConfigEvent(response));
            }
        }, new Callback<ErrorResponse>() {
            @Override
            public void execute(ErrorResponse response) {
                Log.d(TAG, "All configuration call failed");
            }
        });
    }

    public void fetchBaseConfigurations() {

        NetWorkManager.getInstance().getBaseConfiguration(new Callback<Pages>() {
            @Override
            public void execute(Pages response) {

                CacheManager.getInstance(mContext).setConfiguration(response);
                bus.post(new PageEvent(response));
            }
        }, new Callback<ErrorResponse>() {
            @Override
            public void execute(ErrorResponse response) {
                Log.d(TAG, "Base configuration call failed");
            }
        });
    }

    public void fetchBandResponse(final List<Band>mBandList){

        final HashMap<String, BandResponse> mBandResponseMap = new HashMap<>();
        for (final Band singleBand : mBandList) {
            BandRequest bandRequest = new BandRequest();
            bandRequest.setCommand("getBandData");
            BandData bandData = new BandData();
            bandData.setRuleId(Config.ruleId);
            bandData.setProjectId(Config.projectId);
            bandData.setBandId(singleBand.getBandId());
            bandRequest.setData(bandData);

            NetWorkManager.getInstance().getBandData(singleBand.getBandId(), new Callback<BandResponse>() {
                @Override
                public void execute(BandResponse response) {
                    mBandResponseMap.put(singleBand.getBandId(),response);
                    if (mBandResponseMap.size() == mBandList.size()){
                        fetchOvpContentsForABand(mBandResponseMap);
                    }
                }
            }, new Callback<ErrorResponse>() {
                @Override
                public void execute(ErrorResponse response) {

                }
            });
        }

    }

    public void fetchOvpContentsForABand(final HashMap<String,BandResponse>mBandResponseMap) {

        final HashMap<String, Items> mItemHashMap = new HashMap<>();
        Iterator it = mBandResponseMap.entrySet().iterator();
        while (it.hasNext()) {
            final Map.Entry pair = (Map.Entry) it.next();
            BandResponse bandResponse = (BandResponse) pair.getValue();
            NetWorkManager.getInstance().getOvpDataForABand(bandResponse, new Callback<Items>() {
                @Override
                public void execute(Items response) {
                    Log.d(TAG, response.toString());
                    mItemHashMap.put(pair.getKey().toString(),response);
                    if (mItemHashMap.size() == mBandResponseMap.size()){
                        bus.post(new onRailDataFetched(mItemHashMap, mBandResponseMap));
                    }
                }
            }, new Callback<ErrorResponse>() {
                @Override
                public void execute(ErrorResponse response) {

                }
            });
        }
    }

    public void fetchConfigurationsForAPage(Page page) {
          fetchBandResponse(new ArrayList<>(page.getBands()));
//        new fetchingBandConfigurationSynchronously(new ArrayList<>(page.getBands())).execute();
    }

    public void fetchFormContents(Page page) {

        NetWorkManager.getInstance().getFormData(page.getForms().get(0), new Callback<SignUpResponse>() {
            @Override
            public void execute(SignUpResponse response) {
                Log.d(TAG, "On Success" + response.toString());
                bus.post(new onFormDetailFetch(response));
            }
        }, new Callback<ErrorResponse>() {
            @Override
            public void execute(ErrorResponse response) {
                Log.d(TAG, "Error Form Api failed");
            }
        });
    }

    public void fetchFormSubmitResponse(HashMap<String, Object> formSubmitRequest) {
        bus.post(new onApiFireEvent(true));
        NetWorkManager.getInstance().getFormSubmitResponse(formSubmitRequest, new Callback<FormSubmitResponse>() {
            @Override
            public void execute(FormSubmitResponse response) {
                Log.d(TAG, "On Success Form Submit --" + response.toString());
                bus.post(new onFormSubmissionSuccess(response));
            }
        }, new Callback<ErrorResponse>() {
            @Override
            public void execute(ErrorResponse response) {
                Log.d(TAG, "Error Form Submit Api failed");
            }
        });
    }

    public void fetchStaticFormSubmitResponse(HashMap<String, Object> formSubmitRequest, TypedFile typedFile) {
        bus.post(new onApiFireEvent(true));
        NetWorkManager.getInstance().getStaticFormSubmitResponse(formSubmitRequest, typedFile, new Callback<FormSubmitResponse>() {
            @Override
            public void execute(FormSubmitResponse response) {
                Log.d(TAG, "On Success Form Submit --" + response.toString());
                bus.post(new onFormSubmissionSuccess(response));
            }
        }, new Callback<ErrorResponse>() {
            @Override
            public void execute(ErrorResponse response) {
                Log.d(TAG, "Error Form Submit Api failed");
            }
        });
    }


    public void fetchCrudConfiguration() {
        NetWorkManager.getInstance().getCrudConfiguration(new Callback<CrudResponse>() {
            @Override
            public void execute(CrudResponse response) {
                Log.d(TAG, "on Success" + response.toString());
                bus.post(new onCrudConfiguratonFetched(response));
            }
        }, new Callback<ErrorResponse>() {
            @Override
            public void execute(ErrorResponse response) {
                Log.d(TAG, "on Failure" + response.toString());
            }
        });
    }


    public void fetchUserList(String templateID, final SignUpResponse formData) {

        NetWorkManager.getInstance().getUserData(templateID, new Callback<UserDataList>() {
            @Override
            public void execute(UserDataList response) {
                Log.d(TAG, "on Success" + response.toString());
                bus.post(new onUserListFetched(response, formData));
            }
        }, new Callback<ErrorResponse>() {
            @Override
            public void execute(ErrorResponse response) {

            }
        });
    }


    public void fetchDeleteResponse(String id ,String templateID){

        NetWorkManager.getInstance().getDeleteResponse(templateID, id, new Callback<DeleteResponse>() {
            @Override
            public void execute(DeleteResponse response) {
             bus.post(new DeleteEvent(response.getError()));
            }
        }, new Callback<ErrorResponse>() {
            @Override
            public void execute(ErrorResponse response) {
             bus.post(new DeleteEvent(true));
            }
        });
    }

    private class fetchingBandConfigurationSynchronously extends AsyncTask<String, String, HashMap<String, BandResponse>> {

        private ArrayList<Band> mBandList;
        private HashMap<String, BandResponse> mBandResponseMap;
        private int index = 0;

        public fetchingBandConfigurationSynchronously(ArrayList<Band> bandArrayList) {
            mBandResponseMap = new HashMap<>();
            this.mBandList = bandArrayList;
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
        }

        @Override
        protected HashMap<String, BandResponse> doInBackground(String... params) {

            for (Band singleBand : mBandList) {
                BandRequest bandRequest = new BandRequest();
                bandRequest.setCommand("getBandData");
                BandData bandData = new BandData();
                bandData.setRuleId(Config.ruleId);
                bandData.setProjectId(Config.projectId);
                bandData.setBandId(singleBand.getBandId());
                bandRequest.setData(bandData);
                BandBaseResponse bandBaseResponse = RetrofitClient.getRestClient(Config.endpoint).getBandDataSynchronlously("/execute", bandRequest);
                List<BandResponse> bandResponse = bandBaseResponse.getData();
                /*  Gson gson = new Gson();
               BandResponse bandResponse = gson.fromJson(jsonObject.toString(), BandResponse.class);*/
                mBandResponseMap.put(bandRequest.getData().getBandId(), bandResponse.get(0));
            }

            return mBandResponseMap;
        }

        @Override
        protected void onPostExecute(HashMap<String, BandResponse> s) {
            super.onPostExecute(s);
            Log.d(TAG, s.toString());
            new fetchingOVPDataSynchronously(s).execute();
        }
    }

    private class fetchingOVPDataSynchronously extends AsyncTask<String, String, HashMap<String, Items>> {

        private HashMap<String, BandResponse> mBandResponseMap;
        private int index = 0;
        private HashMap<String, Items> mItemHashMap;

        public fetchingOVPDataSynchronously(HashMap<String, BandResponse> bandMap) {
            this.mBandResponseMap = bandMap;
            mItemHashMap = new HashMap<>();
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
        }

        @Override
        protected HashMap<String, Items> doInBackground(String... params) {

            Iterator it = mBandResponseMap.entrySet().iterator();
            while (it.hasNext()) {
                Map.Entry pair = (Map.Entry) it.next();
                BandResponse bandResponse = (BandResponse) pair.getValue();
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
                Response itemsBaseResponse = RetrofitClient.getRestClient(Config.endpoint).getOVPDataSynchronously("/execute", ovpRequest);
                JSONObject jsonObject = RetrofitResponseHandler.convertToJSON(itemsBaseResponse);
                ItemsBaseResponse itemsBaseResponse1 = new Gson().fromJson(jsonObject.toString(), ItemsBaseResponse.class);
                mItemHashMap.put(pair.getKey().toString(), itemsBaseResponse1.getData());
            }

            return mItemHashMap;
        }

        @Override
        protected void onPostExecute(HashMap<String, Items> s) {
            super.onPostExecute(s);
            Log.d(TAG, s.toString());
            bus.post(new onRailDataFetched(s, mBandResponseMap));
        }


        /*    private void fetchSingleBandItem(final Band band) {
                NetWorkManager.getInstance().getBandData(band.getBandId(), new Callback<BandResponse>() {
                    @Override
                    public void execute(BandResponse response) {
                        mBandResponseMap.put(band.getBandId(), response);
                        if (index + 1 < mBandList.size()) {
                            index++;
                            fetchSingleBandItem(mBandList.get(index));
                        }
                    }
                }, new Callback<ErrorResponse>() {
                    @Override
                    public void execute(ErrorResponse response) {

                    }
                });
            }*/

    }

}
