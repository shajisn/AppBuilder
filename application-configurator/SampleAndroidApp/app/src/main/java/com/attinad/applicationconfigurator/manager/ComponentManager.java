package com.attinad.applicationconfigurator.manager;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.Gravity;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.LinearLayout.LayoutParams;
import android.widget.ScrollView;

import com.attinad.applicationconfigurator.constants.Constants;
import com.attinad.applicationconfigurator.customwidgets.CustomTextViewBold;
import com.attinad.applicationconfigurator.model.response.Button;
import com.attinad.applicationconfigurator.model.response.Field;
import com.attinad.applicationconfigurator.model.response.SignUpResponse;
import com.attinad.applicationconfigurator.model.response.crudModels.CrudButton;
import com.attinad.applicationconfigurator.utils.ComponentCreater;

import org.greenrobot.eventbus.EventBus;

import java.util.HashMap;
import java.util.List;


/**
 * Created by arjunsatish on 8/6/16.
 */
public class ComponentManager {

    private static ComponentManager ourInstance;
    private LinearLayout createdView;
    private ScrollView scrollView;
    private List<Field> listOfFields;
    private Context mContext;
    private HashMap<String, View> listOfViews = new HashMap<>();
    private HashMap<String, String> listOfValues = new HashMap<>();
    private EventBus eventBus = EventBus.getDefault();

    private ComponentManager(Context context) {
        this.createdView = new LinearLayout(context);
        this.mContext = context;
    }

    public static ComponentManager getInstance(Context context) {
        if (ourInstance == null) {
            ourInstance = new ComponentManager(context);
        }
        return ourInstance;
    }


    public ScrollView constructTheUiFromTheApi(Context creationContext, List<Field> listOfFields,
                                               List<Button> listOfButtons, String templateID,
                                               String fieldWrapperKey, boolean isStatic, boolean isUpdate) {

        createdView = new LinearLayout(creationContext);
        scrollView = new ScrollView(creationContext);
        listOfViews = new HashMap<>();
        listOfViews = new HashMap<>();
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
        params.setMargins(20, 10, 20, 10);

        LinearLayout.LayoutParams paramsWrap = new LinearLayout.LayoutParams(
                LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
        paramsWrap.setMargins(20, 10, 20, 10);

        createdView.setOrientation(LinearLayout.VERTICAL);
        createdView.setGravity(Gravity.CENTER);
        createdView.setLayoutParams(params);
        scrollView.setLayoutParams(params);

        LinearLayout.LayoutParams paramsForEveryViewCreated = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
        paramsForEveryViewCreated.bottomMargin = 15;
        paramsForEveryViewCreated.leftMargin = 15;
        paramsForEveryViewCreated.rightMargin = 15;

        for (Field field : listOfFields) {
            if (field.getType().equalsIgnoreCase(Constants.typeText)) {
                View typeTxtView = ComponentCreater.getEditText(creationContext, field);
                typeTxtView.setLayoutParams(paramsForEveryViewCreated);
                listOfViews.put(field.getId(), typeTxtView);
                createdView.addView(typeTxtView);
            } else if (field.getType().equalsIgnoreCase(Constants.typeTextArea)) {
                View typeTxtView = ComponentCreater.getEditTextArea(creationContext, field);
                typeTxtView.setLayoutParams(paramsForEveryViewCreated);
                listOfViews.put(field.getId(), typeTxtView);
                createdView.addView(typeTxtView);
            } else if (field.getType().equalsIgnoreCase(Constants.typePassword)) {
                View typeTxtView = ComponentCreater.getPassword(creationContext, field);
                typeTxtView.setLayoutParams(paramsForEveryViewCreated);
                listOfViews.put(field.getId(), typeTxtView);
                createdView.addView(typeTxtView);
            } else if (field.getType().equalsIgnoreCase(Constants.typeMobileNo)) {
                View typeTxtView = ComponentCreater.getTypeMobile(creationContext, field);
                typeTxtView.setLayoutParams(paramsForEveryViewCreated);
                listOfViews.put(field.getId(), typeTxtView);
                createdView.addView(typeTxtView);
            } else if (field.getType().equalsIgnoreCase(Constants.typeDate)) {
                View typeTxtView = ComponentCreater.getTypeData(creationContext, field);
                typeTxtView.setLayoutParams(paramsForEveryViewCreated);
                listOfViews.put(field.getId(), typeTxtView);
                createdView.addView(typeTxtView);
            } else if (field.getType().equalsIgnoreCase(Constants.typeDropdown)) {
                LinearLayout linearLayout = new LinearLayout(mContext);
                linearLayout.setLayoutParams(paramsWrap);
                CustomTextViewBold labelTxt = ComponentCreater.getTextViewBold(mContext, field);
                labelTxt.setLayoutParams(paramsForEveryViewCreated);
                linearLayout.addView(labelTxt);
                createdView.addView(linearLayout);

                View typeTxtView = ComponentCreater.getSpinner(creationContext, field);
                typeTxtView.setLayoutParams(paramsForEveryViewCreated);
                listOfViews.put(field.getId(), typeTxtView);
                createdView.addView(typeTxtView);
            } else if (field.getType().equalsIgnoreCase(Constants.typeDynamicDropdown)) {

                LinearLayout linearLayout = new LinearLayout(mContext);
                linearLayout.setLayoutParams(paramsWrap);
                CustomTextViewBold labelTxt = ComponentCreater.getTextViewBold(mContext, field);
                labelTxt.setLayoutParams(paramsForEveryViewCreated);
                linearLayout.addView(labelTxt);
                createdView.addView(linearLayout);

                View typeTxtView = ComponentCreater.getCountrySpinner(creationContext, field);
                typeTxtView.setLayoutParams(paramsForEveryViewCreated);
                listOfViews.put(field.getId(), typeTxtView);
                createdView.addView(typeTxtView);
            } else if (field.getType().equalsIgnoreCase(Constants.typeImage)) {

                View typeTxtView = ComponentCreater.getImagePickerButton(creationContext, eventBus);
                typeTxtView.setLayoutParams(paramsForEveryViewCreated);
                listOfViews.put(field.getId(), typeTxtView);
                createdView.addView(typeTxtView);
            }

        }
       /* LinearLayout buttonContainer = new LinearLayout(mContext);
        buttonContainer.setOrientation(LinearLayout.HORIZONTAL);
        buttonContainer.setLayoutParams(paramsWrap);*/

        for (Button button : listOfButtons) {
            View typeTxtView = ComponentCreater.getButton(creationContext, button, templateID, fieldWrapperKey, isStatic, isUpdate);
            typeTxtView.setLayoutParams(paramsForEveryViewCreated);
            createdView.addView(typeTxtView);
        }
//        createdView.addView(buttonContainer);

        scrollView.addView(createdView);
        return scrollView;
    }


    public ScrollView constructTheUiFromTheApi(Context creationContext,
                                               List<CrudButton> listOfButtons, RecyclerView recyclerView, SignUpResponse formData, String templateID) {

        createdView = new LinearLayout(creationContext);
        scrollView = new ScrollView(creationContext);
        listOfViews = new HashMap<>();
        listOfViews = new HashMap<>();
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
        params.setMargins(20, 10, 20, 10);

        LinearLayout.LayoutParams paramsWrap = new LinearLayout.LayoutParams(
                LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
        paramsWrap.setMargins(20, 10, 20, 10);

        createdView.setOrientation(LinearLayout.VERTICAL);
        createdView.setGravity(Gravity.CENTER);
        createdView.setLayoutParams(params);
        createdView.addView(recyclerView);
        scrollView.setLayoutParams(params);

        LinearLayout.LayoutParams paramsForEveryViewCreated = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
        paramsForEveryViewCreated.bottomMargin = 15;
        paramsForEveryViewCreated.leftMargin = 15;
        paramsForEveryViewCreated.rightMargin = 15;

        if (listOfButtons != null) {
            for (CrudButton button : listOfButtons) {
                View typeTxtView = ComponentCreater.getCrudButton(creationContext, button, formData,
                        templateID, eventBus);
                typeTxtView.setLayoutParams(paramsForEveryViewCreated);
                createdView.addView(typeTxtView);
            }
        }
//        createdView.addView(buttonContainer);

        scrollView.addView(createdView);

        return scrollView;
    }


    public HashMap<String, View> getListOfViews() {
        return listOfViews;
    }

    public void setListOfValues(HashMap<String, String> listOfValues) {
        this.listOfValues = listOfValues;
    }

    public HashMap<String, String> getListOfValues() {
        return listOfValues;
    }

    public void clearValues() {
        listOfValues.clear();
    }

}
