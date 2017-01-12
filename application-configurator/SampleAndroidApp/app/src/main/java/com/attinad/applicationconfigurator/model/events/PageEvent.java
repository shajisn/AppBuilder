package com.attinad.applicationconfigurator.model.events;

import com.attinad.applicationconfigurator.model.response.Pages;

/**
 * Created by arjunsatish on 2/6/16.
 */
public class PageEvent {
    private Pages page;

    public PageEvent(Pages page) {
        this.page = page;
    }

    public Pages getPage() {
        return page;
    }

    public void setPage(Pages page) {
        this.page = page;
    }
}
