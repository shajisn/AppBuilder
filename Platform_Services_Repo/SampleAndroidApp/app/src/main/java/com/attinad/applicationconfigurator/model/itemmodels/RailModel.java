package com.attinad.applicationconfigurator.model.itemmodels;

import com.attinad.applicationconfigurator.model.response.BandResponse;
import com.attinad.applicationconfigurator.model.response.dataModels.Item;

import java.util.ArrayList;

/**
 * Created by arjunsatish on 19/4/16.
 */
public class RailModel {
    private String categoryName;
    private BandResponse bandResponse;
    private String category_id;
    private ArrayList<Item> listOfitems;

    public BandResponse getBandResponse() {
        return bandResponse;
    }

    public void setBandResponse(BandResponse bandResponse) {
        this.bandResponse = bandResponse;
    }

    public ArrayList<Item> getListOfitems() {
        return listOfitems;
    }

    public void setListOfitems(ArrayList<Item> listOfitems) {
        this.listOfitems = listOfitems;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
