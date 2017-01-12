package com.attinad.applicationconfigurator.utils;

import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.util.DisplayMetrics;

import com.attinad.applicationconfigurator.activity.HomeActivity;
import com.attinad.applicationconfigurator.constants.Constants;
import com.attinad.applicationconfigurator.constants.IntentKeys;
import com.attinad.applicationconfigurator.model.response.Page;
import com.attinad.applicationconfigurator.model.response.SignUpResponse;
import com.attinad.applicationconfigurator.model.response.userModels.User;

/**
 * Created by arjunsatish on 3/6/16.
 */
public class NavUtils {

    public static void identifyThePageAndRoute(Page page, Context context) {

        if (page != null) {
            if (page.getType().equalsIgnoreCase("band")) {
                routeToMediaPage(context, page);
            } else if (page.getType().equalsIgnoreCase("form")) {
                routeToFormPage(context, page);
            } else if (page.getType().equalsIgnoreCase("crud")) {
                routeToCrudPage(context, page);
            }
        }
    }

    private static void routeToMediaPage(Context context, Page page) {
        Intent intent = new Intent(context, HomeActivity.class);
        intent.putExtra(IntentKeys.PAGE_TO_OPEN, page);
        intent.putExtra(IntentKeys.PAGE_TYPE, Constants.bandType);
        context.startActivity(intent);
    }

    private static void routeToFormPage(Context context, Page page) {
        Intent intent = new Intent(context, HomeActivity.class);
        intent.putExtra(IntentKeys.PAGE_TO_OPEN, page);
        intent.putExtra(IntentKeys.PAGE_TYPE, Constants.formType);
        context.startActivity(intent);
    }

    public static void routeToCrudPage(Context context, Page page) {
        Intent intent = new Intent(context, HomeActivity.class);
        intent.putExtra(IntentKeys.PAGE_TO_OPEN, page);
        //TODO-----Change to crud type
        intent.putExtra(IntentKeys.PAGE_TYPE, Constants.crudType);
        //--------------
        context.startActivity(intent);
    }

    public static void routeToFormPageWithoutMakingAnyApiCalls(Context context, SignUpResponse formData, String templateID) {
        Intent intent = new Intent(context, HomeActivity.class);
        intent.putExtra(IntentKeys.PAGE_TYPE, Constants.formType);
        intent.putExtra(IntentKeys.FORM_CONTENTS, formData);
        intent.putExtra(IntentKeys.TEMPLATE_ID, templateID);
        context.startActivity(intent);
    }

    public static void routeToFormPageAndOpenInUpdateMode(Context context, SignUpResponse formData, String templateID, User user) {
        Intent intent = new Intent(context, HomeActivity.class);
        intent.putExtra(IntentKeys.PAGE_TYPE, Constants.formType);
        intent.putExtra(IntentKeys.FORM_CONTENTS, formData);
        intent.putExtra(IntentKeys.TEMPLATE_ID, templateID);
        intent.putExtra(IntentKeys.UPDATE_MODE, true);
        intent.putExtra(IntentKeys.USER_OBJECT, user);
        context.startActivity(intent);
    }

    public static int convertPixelsToDp(float px, Context context) {
        Resources resources = context.getResources();
        DisplayMetrics metrics = resources.getDisplayMetrics();
        int dp = (int) (px / (metrics.densityDpi / 160f));
        return dp;
    }

}
