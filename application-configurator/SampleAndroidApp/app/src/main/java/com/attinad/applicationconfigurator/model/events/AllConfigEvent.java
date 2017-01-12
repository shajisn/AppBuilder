package com.attinad.applicationconfigurator.model.events;

import com.attinad.applicationconfigurator.model.response.allConfig.AllConfig;

/**
 * Created by arjunsatish on 2/6/16.
 */
public class AllConfigEvent {
    private AllConfig allConfig;

    public AllConfigEvent(AllConfig allConfig) {
        this.allConfig = allConfig;
    }

    public AllConfig getAllConfig() {
        return allConfig;
    }

    public void setAllConfig(AllConfig allConfig) {
        this.allConfig = allConfig;
    }

}
