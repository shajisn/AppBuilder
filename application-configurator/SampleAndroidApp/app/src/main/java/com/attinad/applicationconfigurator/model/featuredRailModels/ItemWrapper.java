package com.attinad.applicationconfigurator.model.featuredRailModels;

import com.attinad.applicationconfigurator.model.response.dataModels.Item;

/**
 * Created by arjunsatish on 15/6/16.
 */
public class ItemWrapper {
    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    private Item item;
    private int position;

    public ItemWrapper(Item item, int position) {
        this.item = item;
        this.position = position;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }
}
