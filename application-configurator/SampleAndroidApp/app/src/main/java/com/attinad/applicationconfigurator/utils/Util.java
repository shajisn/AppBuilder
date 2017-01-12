package com.attinad.applicationconfigurator.utils;

import android.content.Context;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.Spinner;

import com.attinad.applicationconfigurator.adapter.CountrySpinnerAdapter;
import com.attinad.applicationconfigurator.adapter.RegSpinnerAdapter;
import com.attinad.applicationconfigurator.constants.Constants;
import com.attinad.applicationconfigurator.customwidgets.CustomEditText;
import com.attinad.applicationconfigurator.manager.CacheManager;
import com.attinad.applicationconfigurator.manager.ComponentManager;
import com.attinad.applicationconfigurator.manager.ConfigurationManager;
import com.attinad.applicationconfigurator.model.CountryCode;
import com.attinad.applicationconfigurator.model.response.Button;
import com.attinad.applicationconfigurator.model.response.Field;
import com.attinad.applicationconfigurator.model.response.Nav;
import com.attinad.applicationconfigurator.model.response.Option;
import com.attinad.applicationconfigurator.model.response.userModels.User;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.json.JSONArray;
import org.json.JSONException;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.nio.charset.Charset;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import retrofit.mime.TypedFile;

/**
 * Created by arjunsatish on 10/6/16.
 */
public class Util {

    private static final String TAG = Util.class.getSimpleName();

    public static ArrayList<CountryCode> loadCountryList(Context context) {
        Gson gson = new Gson();
        byte[] countryCodesList = getDataFromAssets(context, "country_codes.json");
        Type collectionType = new TypeToken<Collection<CountryCode>>() {
        }.getType();
        return (ArrayList<CountryCode>) gson.fromJson(Util.convertRaw2JsonArray(countryCodesList).toString(), collectionType);
    }

    @Nullable
    public static JSONArray convertRaw2JsonArray(final byte[] rawData) {
        if (rawData == null || rawData.length < 1) {
            return null;
        }
        final String jsonStr = new String(rawData, Charset.forName("UTF-8"));
        try {
            return new JSONArray(jsonStr);
        } catch (JSONException e) {
            return null;
        }
    }

    public static byte[] getDataFromAssets(Context context, String filename) {
        byte[] buffer;
        try {
            InputStream is = context.getAssets().open(filename);
            int size = is.available();
            buffer = new byte[size];
            is.read(buffer);
            is.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return buffer;
    }

    public static void setCountrySpinner(ArrayList<CountryCode> array, Context mActivity, Spinner spinner, String country) {

        ArrayList<String> countriesArray = new ArrayList<String>();
        ArrayList<String> dailCodeArray = new ArrayList<String>();
        HashMap<String, String> countriesMap = new HashMap<String, String>();
        HashMap<String, String> codesMap = new HashMap<String, String>();
        HashMap<String, String> languageMap = new HashMap<String, String>();

        for (int i = 0; i < array.size(); i++) {
            countriesArray.add(array.get(i).getName());
            dailCodeArray.add(array.get(i).getDialCode());
            countriesMap.put(array.get(i).getName(), array.get(i).getDialCode());
            codesMap.put(array.get(i).getDialCode(), array.get(i).getName());
            languageMap.put(array.get(i).getCode(), array.get(i).getName());
        }
        CountrySpinnerAdapter spinnerAdapter = new CountrySpinnerAdapter(mActivity, countriesArray);
        spinner.setAdapter(spinnerAdapter);
    }


    public static void hideKeyboard(View view, Context mContext) {
        if (view != null) {
            InputMethodManager imm = (InputMethodManager) mContext.getSystemService(Context.INPUT_METHOD_SERVICE);
            imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
        }
    }

    public static boolean getTheValueOfAllTheFields(Context mContext, HashMap<String, View> listOfViews, String id, boolean isStatic) {
        HashMap<String, String> valuesOfAllTheFields = new HashMap<>();
        boolean isSuccess = true;
        Iterator it = listOfViews.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry) it.next();
            View tmpView = (View) pair.getValue();
            if (isStatic) {
                valuesOfAllTheFields.put("id", id);
            }
            if (tmpView instanceof CustomEditText) {
                if (!checkIfTheKeyIsDateOfBirth(pair.getKey().toString())) {
                    valuesOfAllTheFields.put(pair.getKey().toString(), ((CustomEditText) tmpView).getText().toString());
                }else{
                    long timeInMilliSec = getTheValueOfDateOfBirthInMilliSeconds(((CustomEditText) tmpView).getText().toString());
                    valuesOfAllTheFields.put(pair.getKey().toString(), String.valueOf(timeInMilliSec));
                }
                isSuccess = checkValue(tmpView);
            } else if (tmpView instanceof Spinner) {
                valuesOfAllTheFields.put(pair.getKey().toString(), ((Spinner) tmpView).getSelectedItem().toString());
            }
        }
        Log.d(TAG, "Size of values" + valuesOfAllTheFields.toString());
        ComponentManager.getInstance(mContext).setListOfValues(valuesOfAllTheFields);
        return isSuccess;
    }

    private static boolean checkIfTheKeyIsDateOfBirth(String key){
        boolean found = false;
        if (key.equalsIgnoreCase("dateOfBirth")){
            found = true;
        }
        return found;
    }
    // For sending the time in milli seconds for the server
    private static long getTheValueOfDateOfBirthInMilliSeconds(String value){
        long timeinMilliSeconds = 0;
        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
        try {
            Date date = format.parse(value);
            timeinMilliSeconds = date.getTime();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return timeinMilliSeconds;
    }

    private static boolean checkValue(View view) {
        String value = ((CustomEditText) view).getText().toString();
        if (value == null || value.isEmpty()) {
            ((CustomEditText) view).setError("Please fill the above field");
            return false;
        }
        return true;
    }

    public static void resetTheValues(Context mContext, HashMap<String, View> listOfViews) {
        Iterator it = listOfViews.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry) it.next();
            View tmpView = (View) pair.getValue();
            if (tmpView instanceof CustomEditText) {
                ((CustomEditText) tmpView).setText("");
            } else if (tmpView instanceof Spinner) {
                ((Spinner) tmpView).setSelection(0);
            }
        }
        ComponentManager.getInstance(mContext).clearValues();
    }

    public static void sendTheDataToTheClient(Context mContext,
                                              String templateID, String fieldWrapperKey, boolean isStatic, boolean isUpdate) {

        HashMap<String, Object> wrapperMap = new HashMap<>();
        wrapperMap.put(fieldWrapperKey, ComponentManager.getInstance(mContext).
                getListOfValues());

        HashMap<String, Object> requestMap = new HashMap<>();
//      requestMap.put("command","setData");
        requestMap.put("method", "post");
        requestMap.put("templateId", templateID);
        requestMap.put("data", wrapperMap);

        if (isStatic) {
            requestMap.put("fileKey", "image");
            requestMap.put("fieldWrapperKey", fieldWrapperKey);
//          requestMap.put("command","setDataFromForm");
            File file = null;
            TypedFile typedFile = null;
            if (CacheManager.getInstance(mContext).getChosenImage() != null) {
                file = new File(CacheManager.getInstance(mContext).getChosenImage().getOriginalPath());
                typedFile = new TypedFile("multipart/form-data", file);
            }
            if (!isUpdate) {
                ConfigurationManager.getInstance(mContext).fetchStaticFormSubmitResponse(requestMap, typedFile);
            } else {
                requestMap.put("method", "put");
                ConfigurationManager.getInstance(mContext).fetchStaticFormSubmitResponse(requestMap, typedFile);
            }
        } else {
            ConfigurationManager.getInstance(mContext).fetchFormSubmitResponse(requestMap);
        }
        Log.d(TAG, "Data --" + wrapperMap.toString());

    }

    //TODO This is not a good way of doing it , since we know the fields we can extract the value-- Derive a logic
    public static String identifyTheTypeOfFieldToExtractTheData(Field field, User user) {
        String returnValue = "";
        if (field.getId().equalsIgnoreCase("id")) {
            returnValue = user.getId();
        } else if (field.getId().equalsIgnoreCase("name")) {
            returnValue = user.getName();
        } else if (field.getId().equalsIgnoreCase("address")) {
            returnValue = user.getAddress();
        } else if (field.getId().equalsIgnoreCase("dateOfBirth")) {
            returnValue = user.getDateOfBirth();
        } else if (field.getId().equalsIgnoreCase("mobile")) {
            returnValue = user.getMobile();
        } else if (field.getId().equalsIgnoreCase("sex")) {
            returnValue = user.getSex();
        }
        return returnValue;
    }

    public static double getSizeInMb(double sizeInBytes) {
        double fileSizeInKb = sizeInBytes / 1024;
        double fileSizeInMb = fileSizeInKb / 1024;
        return round(fileSizeInMb, 2);
    }

    private static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        long factor = (long) Math.pow(10, places);
        value = value * factor;
        long tmp = Math.round(value);
        return (double) tmp / factor;
    }

    public static Nav createDummySideMenuForTestingPurpose() {

        Nav nav = new Nav();
        nav.setHasSubMenu("false");
        nav.setId("signup");
        nav.setShown(true);
        nav.setName("Signup");
        nav.setValueId("51431512401247138971");
        nav.setPageId("signup_page");
        nav.setParentNavMenuId(null);
        return nav;
    }

    //TODO This is not a good way of doing it , since we know the fields we can extract the value-- Derive a logic
    public static List<Field> parseFieldsToGetTheValueOfTheCorrespondingField(List<Field> listOfFields, User user) {
        for (Field field : listOfFields) {
            if (field.getId().equalsIgnoreCase(Constants.fieldTypeID)) {
                field.setValueOfField(user.getId());
            } else if (field.getId().equalsIgnoreCase(Constants.fieldTypeName)) {
                field.setValueOfField(user.getName());
            } else if (field.getId().equalsIgnoreCase(Constants.fieldTypeAddress)) {
                field.setValueOfField(user.getAddress());
            } else if (field.getId().equalsIgnoreCase(Constants.fieldTypeDOB)) {
                field.setValueOfField(user.getDateOfBirth());
            } else if (field.getId().equalsIgnoreCase(Constants.fieldTypeSex)) {
                field.setValueOfField(user.getSex());
            } else if (field.getId().equalsIgnoreCase(Constants.fieldTypeMobile)) {
                field.setValueOfField(user.getMobile());
            }
        }
        return listOfFields;

    }

    public static List<Button> parseButtonsToAttachUserAlongWithIt(List<Button> listOfButtons, User user) {
        for (Button button : listOfButtons) {
            button.setUser(user);
        }
        return listOfButtons;
    }

    public static void setValueForFieldIfAny(Field field, CustomEditText editText) {
        if (field.getValueOfField() != null && !field.getValueOfField().isEmpty()) {
            editText.setText(field.getValueOfField());
        }
    }

    public static void setValueForFieldIfAny(Field field, final Spinner spinner, List<Option> options, RegSpinnerAdapter adapter) {
        int indexOfTheValue = -1;
        if (field.getValueOfField() != null && !field.getValueOfField().isEmpty()) {
            for (int i = 0; i < options.size(); i++) {
                if (options.get(i).getValue().equalsIgnoreCase(field.getValueOfField())) {
                    indexOfTheValue = i;
                    break;
                }
            }
            final int finalIndexOfTheValue = indexOfTheValue;
            spinner.post(new Runnable() {
                @Override
                public void run() {
                    spinner.setSelection(finalIndexOfTheValue);
                }
            });
        }
    }

}
