package com.attinad.applicationconfigurator.model.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Pages implements Serializable {

    @SerializedName("pages")
    @Expose
    private List<Page> pages = new ArrayList<Page>();
    @SerializedName("nav")
    @Expose
    private List<Nav> nav = new ArrayList<Nav>();
    @SerializedName("gateways")
    @Expose
    private Gateways gateways;
    @SerializedName("footer")
    @Expose
    private List<Footer> footer = new ArrayList<Footer>();

    /**
     * @return The pages
     */
    public List<Page> getPages() {
        return pages;
    }

    /**
     * @param pages The pages
     */
    public void setPages(List<Page> pages) {
        this.pages = pages;
    }

    /**
     * @return The nav
     */
    public List<Nav> getNav() {
        return nav;
    }

    /**
     * @param nav The nav
     */
    public void setNav(List<Nav> nav) {
        this.nav = nav;
    }

    /**
     * @return The gateways
     */
    public Gateways getGateways() {
        return gateways;
    }

    /**
     * @param gateways The gateways
     */
    public void setGateways(Gateways gateways) {
        this.gateways = gateways;
    }

    /**
     * @return The footer
     */
    public List<Footer> getFooter() {
        return footer;
    }

    /**
     * @param footer The footer
     */
    public void setFooter(List<Footer> footer) {
        this.footer = footer;
    }

}
