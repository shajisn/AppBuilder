package com.attinad.applicationconfigurator.utils;

import android.app.DatePickerDialog;
import android.content.Context;
import android.graphics.Typeface;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.text.Editable;
import android.text.InputType;
import android.text.TextWatcher;
import android.text.method.PasswordTransformationMethod;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.DatePicker;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.Toast;

import com.attinad.applicationconfigurator.adapter.RegSpinnerAdapter;
import com.attinad.applicationconfigurator.constants.Constants;
import com.attinad.applicationconfigurator.customwidgets.CustomButton;
import com.attinad.applicationconfigurator.customwidgets.CustomEditText;
import com.attinad.applicationconfigurator.customwidgets.CustomTextView;
import com.attinad.applicationconfigurator.customwidgets.CustomTextViewBold;
import com.attinad.applicationconfigurator.manager.ComponentManager;
import com.attinad.applicationconfigurator.model.CountryCode;
import com.attinad.applicationconfigurator.model.events.imagePickerEvent;
import com.attinad.applicationconfigurator.model.events.onUpdateAndDelete;
import com.attinad.applicationconfigurator.model.response.Button;
import com.attinad.applicationconfigurator.model.response.Field;
import com.attinad.applicationconfigurator.model.response.SignUpResponse;
import com.attinad.applicationconfigurator.model.response.crudModels.CrudButton;

import org.greenrobot.eventbus.EventBus;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Locale;

/**
 * Created by arjunsatish on 8/6/16.
 */
public class ComponentCreater {

    private static final String TAG = ComponentCreater.class.getSimpleName();

    public static CustomTextView getTextView(Context mContext, Field field) {
        CustomTextView textView = new CustomTextView(mContext);
        textView.setText(field.getDisplayName());
        return textView;
    }

    public static CustomTextViewBold getTextViewBold(Context mContext, Field field) {
        CustomTextViewBold textView = new CustomTextViewBold(mContext);
        textView.setText(field.getDisplayName());
        return textView;
    }

    public static LinearLayout getTextViewWithALabelForListing(Context mContext, Field field, String value) {

        LinearLayout linearLayout = new LinearLayout(mContext);
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        params.setMargins(5, 5, 15, 4);
        linearLayout.setOrientation(LinearLayout.HORIZONTAL);

        CustomTextView textViewLabel = new CustomTextView(mContext);
        textViewLabel.setText(field.getDisplayName() + ":");
        textViewLabel.setTypeface(Typeface.DEFAULT_BOLD);
        textViewLabel.setLayoutParams(params);

        CustomTextView textView = new CustomTextView(mContext);
        textView.setText(value);
        textView.setLayoutParams(params);

        linearLayout.addView(textViewLabel);
        linearLayout.addView(textView);

        return linearLayout;
    }


    public static CustomEditText getEditText(Context mContext, Field field) {
        CustomEditText editText = new CustomEditText(mContext);
        editText.setHint(field.getDisplayName() != null ? field.getDisplayName() : "");
        editText.setSingleLine();
        Util.setValueForFieldIfAny(field, editText);
        editText.addTextChangedListener(new onTextChangeListenener(editText));
        return editText;
    }

    public static CustomEditText getEditTextArea(Context mContext, Field field) {
        CustomEditText editText = new CustomEditText(mContext);
        editText.setHint(field.getDisplayName() != null ? field.getDisplayName() : "");
        editText.setInputType(InputType.TYPE_TEXT_FLAG_MULTI_LINE);
        Util.setValueForFieldIfAny(field, editText);
        editText.addTextChangedListener(new onTextChangeListenener(editText));
        return editText;
    }

    public static CustomEditText getPassword(Context mContext, Field field) {
        CustomEditText editText = new CustomEditText(mContext);
        editText.setHint(field.getDisplayName() != null ? field.getDisplayName() : "");
        editText.setSingleLine();
        editText.setTransformationMethod(PasswordTransformationMethod.getInstance());
        Util.setValueForFieldIfAny(field, editText);
        editText.addTextChangedListener(new onTextChangeListenener(editText));
        return editText;
    }

    public static CustomEditText getTypeMobile(Context mContext, Field field) {
        CustomEditText editText = new CustomEditText(mContext);
        editText.setHint(field.getDisplayName() != null ? field.getDisplayName() : "");
        editText.setSingleLine();
        editText.setInputType(InputType.TYPE_CLASS_NUMBER);
        Util.setValueForFieldIfAny(field, editText);
        editText.addTextChangedListener(new onTextChangeListenener(editText));
        return editText;
    }

    public static CustomEditText getTypeData(final Context mContext, Field field) {
        final CustomEditText editText = new CustomEditText(mContext);
        editText.setFocusable(false);
        editText.setClickable(true);
        editText.setSingleLine();
        Util.setValueForFieldIfAny(field, editText);
        editText.setHint(field.getDisplayName() != null ? field.getDisplayName() : "");
        editText.addTextChangedListener(new onTextChangeListenener(editText));
        editText.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Calendar newCalendar = Calendar.getInstance();
                final SimpleDateFormat dateFormatter = new SimpleDateFormat("dd-MM-yyyy", Locale.US);
                DatePickerDialog dialog = new DatePickerDialog(mContext, new DatePickerDialog.OnDateSetListener() {

                    public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
                        Calendar newDate = Calendar.getInstance();
                        newDate.set(year, monthOfYear, dayOfMonth);
                        editText.setText(dateFormatter.format(newDate.getTime()));
                    }

                }, newCalendar.get(Calendar.YEAR), newCalendar.get(Calendar.MONTH), newCalendar.get(Calendar.DAY_OF_MONTH));
                dialog.getDatePicker().setMaxDate(newCalendar.getTimeInMillis());
                dialog.show();
            }
        });
        return editText;
    }

    public static Spinner getSpinner(final Context mContext, Field field) {

        Spinner spinner = new Spinner(mContext);
        RegSpinnerAdapter spinnerAdapter = new RegSpinnerAdapter(mContext, field.getOptions());
        Util.setValueForFieldIfAny(field, spinner, field.getOptions(), spinnerAdapter);
        spinner.setAdapter(spinnerAdapter);
        return spinner;
    }

    public static Spinner getCountrySpinner(final Context mContext, Field field) {
        Spinner spinner = new Spinner(mContext);
        final String selectedCountry = "";
        final ArrayList<CountryCode> countryList = Util.loadCountryList(mContext);
        Util.setCountrySpinner(countryList, mContext, spinner, null);
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        return spinner;
    }

    public static CustomButton getButton(final Context mContext, final Button button,
                                         final String templateID, final String fieldWrapperKey,
                                         final boolean isStatic, final boolean isUpdate) {
        CustomButton customButton = new CustomButton(mContext);
        customButton.setText(button.getName());
        customButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (button.getAction().equalsIgnoreCase(Constants.submitAction)) {
                    boolean isSuccess = Util.getTheValueOfAllTheFields(mContext,
                            ComponentManager.getInstance(mContext).getListOfViews(), button.getUser() != null ? button.getUser().getId() : null, isStatic);

                    if (!isSuccess) {
                        Toast.makeText(mContext, "Please fill all the fields", Toast.LENGTH_SHORT).show();
                    } else {
                        Util.sendTheDataToTheClient(mContext, templateID, fieldWrapperKey, isStatic, isUpdate);
                    }
                } else if (button.getAction().equalsIgnoreCase(Constants.resetAction)) {
                    Util.resetTheValues(mContext, ComponentManager.getInstance(mContext).getListOfViews());
                }
            }
        });
        return customButton;
    }

    public static CustomButton getImagePickerButton(final Context mContext,
                                                    final EventBus bus) {
        CustomButton customButton = new CustomButton(mContext);
        customButton.setText("Select Image");
        customButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                bus.post(new imagePickerEvent(true));
            }
        });
        return customButton;
    }


    public static CustomButton getCrudButton(final Context mContext, final CrudButton button,
                                             final SignUpResponse formData, final String templateID,
                                             final EventBus eventBus) {
        CustomButton customButton = new CustomButton(mContext);
        customButton.setText(button.getName());
        customButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (button.getType().equalsIgnoreCase(Constants.crudTypeCreate)) {
                    //Open a form
                    NavUtils.routeToFormPageWithoutMakingAnyApiCalls(mContext, formData, templateID);
                } else if (button.getType().equalsIgnoreCase(Constants.crudTypeUpdate)) {
                    //open the particular form in edit mode
                    eventBus.post(new onUpdateAndDelete(Constants.crudTypeUpdate, formData, templateID));
                } else if (button.getType().equalsIgnoreCase(Constants.crudTypeDelete)) {
                    //delete the particular item
                    eventBus.post(new onUpdateAndDelete(Constants.crudTypeDelete, formData, templateID));
                }

            }
        });
        return customButton;
    }

    public static RecyclerView.LayoutManager getLinearLayoutManager(Context mContext) {
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(mContext, LinearLayoutManager.VERTICAL, false);
        return linearLayoutManager;
    }

    public static RecyclerView.LayoutManager getGridLayoutManager(Context mContext, int gridCount) {
        GridLayoutManager gridLayoutManager = new GridLayoutManager(mContext, gridCount);
        return gridLayoutManager;
    }

    public static RecyclerView.LayoutManager getStaggerdManager(Context mContext) {
        StaggeredGridLayoutManager staggeredGridLayoutManager = new
                StaggeredGridLayoutManager(2, StaggeredGridLayoutManager.VERTICAL);
        return staggeredGridLayoutManager;
    }


    private static class onTextChangeListenener implements TextWatcher {

        CustomEditText editText;

        public onTextChangeListenener(CustomEditText editText) {
            this.editText = editText;
        }

        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {

        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {
            editText.setError(null);
        }

        @Override
        public void afterTextChanged(Editable s) {

        }
    }


}
