package com.attinad.applicationconfigurator.model.Params;

/**
 * Created by arjunsatish on 31/5/16.
 */
public class OVPData {
    private String page_number;
    private String page_size;
    private String search_query;
    private String sort_by;

    public String getPage_number() {
        return page_number;
    }

    public void setPage_number(String page_number) {
        this.page_number = page_number;
    }

    public String getPage_size() {
        return page_size;
    }

    public void setPage_size(String page_size) {
        this.page_size = page_size;
    }

    public String getSeacrh_query() {
        return search_query;
    }

    public void setSeacrh_query(String seacrh_query) {
        this.search_query = seacrh_query;
    }

    public String getSort_by() {
        return sort_by;
    }

    public void setSort_by(String sort_by) {
        this.sort_by = sort_by;
    }
}
