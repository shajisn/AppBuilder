package com.attinad.applicationconfigurator.model.featuredRailModels;

import com.attinad.applicationconfigurator.model.response.dataModels.Item;

/**
 * Created by arjunsatish on 15/6/16.
 */
public class DoubleDecker {
    public ItemWrapper getFirstItem() {
        return firstItem;
    }

    public void setFirstItem(ItemWrapper firstItem) {
        this.firstItem = firstItem;
    }

    public ItemWrapper getSecondItem() {
        return secondItem;
    }

    public void setSecondItem(ItemWrapper secondItem) {
        this.secondItem = secondItem;
    }

    private ItemWrapper firstItem;
    private ItemWrapper secondItem;

    public DoubleDecker(Item firstItem, Item secondItem, int initialPosition) {
        this.firstItem = new ItemWrapper(firstItem, initialPosition);
        this.secondItem = new ItemWrapper(secondItem, initialPosition + 1);
    }
}
