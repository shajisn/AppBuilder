package com.attinad.applicationconfigurator.activity;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.attinad.applicationconfigurator.R;
import com.attinad.applicationconfigurator.constants.Constants;
import com.attinad.applicationconfigurator.manager.ConfigurationManager;
import com.attinad.applicationconfigurator.model.events.AllConfigEvent;
import com.attinad.applicationconfigurator.model.events.PageEvent;
import com.attinad.applicationconfigurator.model.response.Page;
import com.attinad.applicationconfigurator.model.response.Pages;
import com.attinad.applicationconfigurator.utils.NavUtils;
import com.attinad.applicationconfigurator.utils.NetworkUtils;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;

/**
 * Created by arjunsatish on 2/6/16.
 */
public class SplashActivity extends AppCompatActivity {

    private static String TAG = SplashActivity.class.getSimpleName();
    private Context mContext;
    private EventBus eventBus = EventBus.getDefault();
    private ProgressBar mProgressbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        setContentView(R.layout.activity_splash);

        mContext = this;
//        mProgressbar = (ProgressBar) findViewById(R.id.progressBar);

    }

    @Override
    protected void onResume() {
        super.onResume();
        eventBus.register(this);
        if (NetworkUtils.isNetworkAvailable(mContext)) {
            fetchTheRequiredConfigurations();
        } else {
            Toast.makeText(SplashActivity.this, "Check your internet connection", Toast.LENGTH_SHORT).show();
           /* new Handler().postDelayed(new Runnable() {
                public void run() {
                  finish();
                }
            }, 2000);*/
        }
//        fetchAllConfigs();
    }

    @Override
    protected void onPause() {
        super.onPause();
        eventBus.unregister(this);
    }

    // If isMinimal is true , response will be received here
    @Subscribe
    public void onBaseConfigurationFetched(PageEvent pageEvent) {
        Log.d(TAG, pageEvent.getPage().toString());
        Page firstPage = identifyTheFirstPageToBeLoaded(pageEvent.getPage());
        if (firstPage == null) {
            Toast.makeText(SplashActivity.this, "Could not identify the frist page", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(SplashActivity.this, "First Page is " + firstPage.getName(), Toast.LENGTH_SHORT).show();
        }
        //TODO ---- Change the
        if (Constants.isTesting) {
            Page formPage = identifyTheFormPage(pageEvent.getPage());
            NavUtils.routeToCrudPage(mContext, formPage);
        } else {
            NavUtils.identifyThePageAndRoute(firstPage, mContext);
        }
        //------------------------------
//        NavUtils.identifyThePageAndRoute(firstPage, mContext);
//        mProgressbar.setVisibility(View.GONE);
    }

    //If isMinimal is false , response will be received here
    @Subscribe
    public void onAllConfigurationsFetched(AllConfigEvent allConfigEvent) {
        Log.d(TAG, allConfigEvent.getAllConfig().toString());
    }


    private void fetchTheRequiredConfigurations() {
        ConfigurationManager.getInstance(mContext).fetchBaseConfigurations();
    }

    private void fetchAllConfigs() {
        ConfigurationManager.getInstance(mContext).fetchAllConfigurations();
    }

    private Page identifyTheFirstPageToBeLoaded(Pages pages) {
        for (Page tmpPage : pages.getPages()) {
            if (tmpPage.getIsFirstPage().equalsIgnoreCase("true")) {
                return tmpPage;
            }
        }
        return null;
    }

    private Page identifyTheFormPage(Pages pages) {
        for (Page tmpPage : pages.getPages()) {
            if (tmpPage.getType().equalsIgnoreCase("form")) {
                return tmpPage;
            }
        }
        return null;
    }


}
