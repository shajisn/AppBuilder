package com.attinad.applicationconfigurator.model.response.allConfig;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class AdConfigList {

    @SerializedName("sizes")
    @Expose
    private List<Size> sizes = new ArrayList<Size>();
    @SerializedName("slot")
    @Expose
    private String slot;
    @SerializedName("slot_id")
    @Expose
    private String slotId;

    /**
     * @return The sizes
     */
    public List<Size> getSizes() {
        return sizes;
    }

    /**
     * @param sizes The sizes
     */
    public void setSizes(List<Size> sizes) {
        this.sizes = sizes;
    }

    /**
     * @return The slot
     */
    public String getSlot() {
        return slot;
    }

    /**
     * @param slot The slot
     */
    public void setSlot(String slot) {
        this.slot = slot;
    }

    /**
     * @return The slotId
     */
    public String getSlotId() {
        return slotId;
    }

    /**
     * @param slotId The slot_id
     */
    public void setSlotId(String slotId) {
        this.slotId = slotId;
    }

}
