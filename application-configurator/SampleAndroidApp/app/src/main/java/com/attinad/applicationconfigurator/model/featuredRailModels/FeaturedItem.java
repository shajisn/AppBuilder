package com.attinad.applicationconfigurator.model.featuredRailModels;

import com.attinad.applicationconfigurator.model.response.dataModels.Item;

/**
 * Created by arjunsatish on 15/6/16.
 */
public class FeaturedItem {
    public Item getFeaturedItem() {
        return featuredItem;
    }

    public void setFeaturedItem(Item featuredItem) {
        this.featuredItem = featuredItem;
    }

    public int getOrginalPositionInTheArray() {
        return orginalPositionInTheArray;
    }

    public void setOrginalPositionInTheArray(int orginalPositionInTheArray) {
        this.orginalPositionInTheArray = orginalPositionInTheArray;
    }

    private Item featuredItem;
    private int orginalPositionInTheArray;

    public FeaturedItem(Item featuredItem, int position) {
        this.featuredItem = featuredItem;
        this.orginalPositionInTheArray = position;
    }
}
