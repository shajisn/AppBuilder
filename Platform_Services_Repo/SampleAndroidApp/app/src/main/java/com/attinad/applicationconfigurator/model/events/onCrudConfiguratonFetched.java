package com.attinad.applicationconfigurator.model.events;

import com.attinad.applicationconfigurator.model.response.crudModels.CrudResponse;

/**
 * Created by arjunsatish on 16/6/16.
 */
public class onCrudConfiguratonFetched {
    private CrudResponse crudResponse;

    public onCrudConfiguratonFetched(CrudResponse crudResponse) {
        this.crudResponse = crudResponse;
    }

    public CrudResponse getCrudResponse() {
        return crudResponse;
    }

    public void setCrudResponse(CrudResponse crudResponse) {
        this.crudResponse = crudResponse;
    }
}
