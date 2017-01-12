package com.attinad.applicationconfigurator.model.events;

/**
 * Created by arjunsatish on 21/6/16.
 */

public class DeleteEvent {
    private boolean isFailure;

    public DeleteEvent(boolean isFailure) {
        this.isFailure = isFailure;
    }

    public boolean isFailure() {
        return isFailure;
    }

    public void setFailure(boolean failure) {
        isFailure = failure;
    }
}
