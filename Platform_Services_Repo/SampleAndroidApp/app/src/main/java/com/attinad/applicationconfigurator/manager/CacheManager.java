package com.attinad.applicationconfigurator.manager;

import android.content.Context;

import com.attinad.applicationconfigurator.model.response.BandResponse;
import com.attinad.applicationconfigurator.model.response.Page;
import com.attinad.applicationconfigurator.model.response.Pages;
import com.attinad.applicationconfigurator.model.response.allConfig.AllConfig;
import com.attinad.applicationconfigurator.utils.Hash;
import com.attinad.applicationconfigurator.utils.ObjectToFile;
import com.kbeanie.multipicker.api.entity.ChosenImage;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by arjunsatish on 1/6/16.
 */
public class CacheManager {
    private static CacheManager ourInstance;
    private Context mContext;

    private String configurationFileName = "";
    private String allConfigFileName = "";
    private String bandFileName = "";
    private String mPagesFileName = "";


    private Pages mPages = null;
    private AllConfig mAllConfig = null;
    private ArrayList<BandResponse> mBandResponse = null;
    private HashMap<String, Page> hashmapOfPages = new HashMap<>();
    private ChosenImage chosenImage = null;


    private CacheManager(Context context) {
        this.mContext = context;
        configurationFileName = Hash.md5Hash("configuration");
        allConfigFileName = Hash.md5Hash("allconfig");
        bandFileName = Hash.md5Hash("bandConfiguration");
        mPagesFileName = Hash.md5Hash("mapOfPages");

        mPages = (Pages) ObjectToFile.read(mContext, configurationFileName);
        mAllConfig = (AllConfig) ObjectToFile.read(mContext, allConfigFileName);
        mBandResponse = (ArrayList<BandResponse>) ObjectToFile.read(mContext, bandFileName);
        hashmapOfPages = (HashMap<String, Page>) ObjectToFile.read(mContext, mPagesFileName);
    }

    public static CacheManager getInstance(Context context) {
        if (ourInstance == null) {
            ourInstance = new CacheManager(context);
        }
        return ourInstance;
    }

    public Pages getConfiguration() {
        return mPages;
    }

    public void setConfiguration(Pages pages) {

        mPages = pages;
        setTheListOfPages();
        ObjectToFile.write(mContext, pages, configurationFileName);
    }

    public ArrayList<BandResponse> getBandConfiguration() {
        return mBandResponse;
    }

    public void setBandConfiguration(ArrayList<BandResponse> bandConfigurations) {
        mBandResponse = bandConfigurations;
        ObjectToFile.write(mContext, mBandResponse, bandFileName);
    }

    public void setAllConfigurations(AllConfig allConfigurations) {
        mAllConfig = allConfigurations;
        ObjectToFile.write(mContext, mAllConfig, allConfigFileName);
    }

    public AllConfig getmAllConfig() {
        return mAllConfig;
    }

    public void setTheListOfPages() {
        hashmapOfPages = new HashMap<>();
        ArrayList<Page> listOfPages = (ArrayList<Page>) mPages.getPages();
        for (Page tmpPage : listOfPages) {
            hashmapOfPages.put(tmpPage.getId(), tmpPage);
        }
        ObjectToFile.write(mContext, hashmapOfPages, mPagesFileName);
    }

    public HashMap<String, Page> getHashmapOfPages() {
        return hashmapOfPages;
    }

    public void setChosenImage(ChosenImage chosenImage) {
        this.chosenImage = chosenImage;
    }

    public ChosenImage getChosenImage() {
        return chosenImage;
    }

}

