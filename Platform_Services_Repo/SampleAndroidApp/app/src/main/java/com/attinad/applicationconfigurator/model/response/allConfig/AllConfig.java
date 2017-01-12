package com.attinad.applicationconfigurator.model.response.allConfig;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class AllConfig {

    @SerializedName("default_language")
    @Expose
    private String defaultLanguage;
    @SerializedName("language_list")
    @Expose
    private List<LanguageList> languageList = new ArrayList<LanguageList>();
    @SerializedName("bands")
    @Expose
    private List<Band> bands = new ArrayList<Band>();
    @SerializedName("pages")
    @Expose
    private List<Page> pages = new ArrayList<Page>();
    @SerializedName("app_configurations")
    @Expose
    private AppConfigurations appConfigurations;
    @SerializedName("details_page")
    @Expose
    private List<DetailsPage> detailsPage = new ArrayList<DetailsPage>();
    @SerializedName("gateways")
    @Expose
    private Gateways gateways;
    @SerializedName("midddleware_and_3rd_party_keys")
    @Expose
    private MidddlewareAnd3rdPartyKeys midddlewareAnd3rdPartyKeys;
    @SerializedName("footer")
    @Expose
    private List<Footer> footer = new ArrayList<Footer>();
    @SerializedName("nav")
    @Expose
    private List<Nav> nav = new ArrayList<Nav>();
    @SerializedName("forms")
    @Expose
    private List<Form_> forms = new ArrayList<Form_>();
    @SerializedName("crud_layouts")
    @Expose
    private List<CrudLayout_> crudLayouts = new ArrayList<CrudLayout_>();

    /**
     * @return The defaultLanguage
     */
    public String getDefaultLanguage() {
        return defaultLanguage;
    }

    /**
     * @param defaultLanguage The default_language
     */
    public void setDefaultLanguage(String defaultLanguage) {
        this.defaultLanguage = defaultLanguage;
    }

    /**
     * @return The languageList
     */
    public List<LanguageList> getLanguageList() {
        return languageList;
    }

    /**
     * @param languageList The language_list
     */
    public void setLanguageList(List<LanguageList> languageList) {
        this.languageList = languageList;
    }

    /**
     * @return The bands
     */
    public List<Band> getBands() {
        return bands;
    }

    /**
     * @param bands The bands
     */
    public void setBands(List<Band> bands) {
        this.bands = bands;
    }

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
     * @return The appConfigurations
     */
    public AppConfigurations getAppConfigurations() {
        return appConfigurations;
    }

    /**
     * @param appConfigurations The app_configurations
     */
    public void setAppConfigurations(AppConfigurations appConfigurations) {
        this.appConfigurations = appConfigurations;
    }

    /**
     * @return The detailsPage
     */
    public List<DetailsPage> getDetailsPage() {
        return detailsPage;
    }

    /**
     * @param detailsPage The details_page
     */
    public void setDetailsPage(List<DetailsPage> detailsPage) {
        this.detailsPage = detailsPage;
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
     * @return The midddlewareAnd3rdPartyKeys
     */
    public MidddlewareAnd3rdPartyKeys getMidddlewareAnd3rdPartyKeys() {
        return midddlewareAnd3rdPartyKeys;
    }

    /**
     * @param midddlewareAnd3rdPartyKeys The midddleware_and_3rd_party_keys
     */
    public void setMidddlewareAnd3rdPartyKeys(MidddlewareAnd3rdPartyKeys midddlewareAnd3rdPartyKeys) {
        this.midddlewareAnd3rdPartyKeys = midddlewareAnd3rdPartyKeys;
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
     * @return The forms
     */
    public List<Form_> getForms() {
        return forms;
    }

    /**
     * @param forms The forms
     */
    public void setForms(List<Form_> forms) {
        this.forms = forms;
    }

    /**
     * @return The crudLayouts
     */
    public List<CrudLayout_> getCrudLayouts() {
        return crudLayouts;
    }

    /**
     * @param crudLayouts The crud_layouts
     */
    public void setCrudLayouts(List<CrudLayout_> crudLayouts) {
        this.crudLayouts = crudLayouts;
    }

}
