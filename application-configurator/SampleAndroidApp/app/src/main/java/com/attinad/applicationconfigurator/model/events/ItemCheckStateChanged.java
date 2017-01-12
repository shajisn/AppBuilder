package com.attinad.applicationconfigurator.model.events;

import com.attinad.applicationconfigurator.model.response.userModels.User;

/**
 * Created by arjunsatish on 20/6/16.
 */

public class ItemCheckStateChanged {
    public boolean isChecked;
    public User user;

    public ItemCheckStateChanged(User user, boolean isChecked) {
        this.user = user;
        this.isChecked = isChecked;
    }
}
