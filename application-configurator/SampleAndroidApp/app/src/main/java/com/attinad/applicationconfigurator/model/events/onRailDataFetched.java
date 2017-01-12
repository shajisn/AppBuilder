package com.attinad.applicationconfigurator.model.events;

import com.attinad.applicationconfigurator.model.response.BandResponse;
import com.attinad.applicationconfigurator.model.response.dataModels.Items;

import java.util.HashMap;

/**
 * Created by arjunsatish on 6/6/16.
 */
public class onRailDataFetched {
    private HashMap<String, Items> itemsHashMap;
    private HashMap<String, BandResponse> bandHashMap;

    public onRailDataFetched(HashMap<String, Items> itemsHashMap, HashMap<String, BandResponse> bandHashMap) {
        this.itemsHashMap = itemsHashMap;
        this.bandHashMap = bandHashMap;
    }

    public HashMap<String, BandResponse> getBandHashMap() {
        return bandHashMap;
    }

    public void setBandHashMap(HashMap<String, BandResponse> bandHashMap) {
        this.bandHashMap = bandHashMap;
    }

    public HashMap<String, Items> getItemsHashMap() {
        return itemsHashMap;
    }

    public void setItemsHashMap(HashMap<String, Items> itemsHashMap) {
        this.itemsHashMap = itemsHashMap;
    }
}
