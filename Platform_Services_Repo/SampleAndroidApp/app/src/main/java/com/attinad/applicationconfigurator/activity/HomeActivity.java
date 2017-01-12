package com.attinad.applicationconfigurator.activity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ExpandableListView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.attinad.applicationconfigurator.R;
import com.attinad.applicationconfigurator.adapter.CrudGridRecyclerAdapter;
import com.attinad.applicationconfigurator.adapter.CrudRecyclerAdapter;
import com.attinad.applicationconfigurator.adapter.ExpandableListAdapter;
import com.attinad.applicationconfigurator.adapter.RecyclerViewDataAdapter;
import com.attinad.applicationconfigurator.constants.Constants;
import com.attinad.applicationconfigurator.constants.IntentKeys;
import com.attinad.applicationconfigurator.manager.CacheManager;
import com.attinad.applicationconfigurator.manager.ComponentManager;
import com.attinad.applicationconfigurator.manager.ConfigurationManager;
import com.attinad.applicationconfigurator.model.events.DeleteEvent;
import com.attinad.applicationconfigurator.model.events.ItemCheckStateChanged;
import com.attinad.applicationconfigurator.model.events.imagePickerEvent;
import com.attinad.applicationconfigurator.model.events.onApiFireEvent;
import com.attinad.applicationconfigurator.model.events.onCrudConfiguratonFetched;
import com.attinad.applicationconfigurator.model.events.onFormDetailFetch;
import com.attinad.applicationconfigurator.model.events.onFormSubmissionSuccess;
import com.attinad.applicationconfigurator.model.events.onRailDataFetched;
import com.attinad.applicationconfigurator.model.events.onUpdateAndDelete;
import com.attinad.applicationconfigurator.model.events.onUserListFetched;
import com.attinad.applicationconfigurator.model.itemmodels.RailModel;
import com.attinad.applicationconfigurator.model.response.BandResponse;
import com.attinad.applicationconfigurator.model.response.Button;
import com.attinad.applicationconfigurator.model.response.Field;
import com.attinad.applicationconfigurator.model.response.Nav;
import com.attinad.applicationconfigurator.model.response.Page;
import com.attinad.applicationconfigurator.model.response.Pages;
import com.attinad.applicationconfigurator.model.response.SignUpResponse;
import com.attinad.applicationconfigurator.model.response.crudModels.CrudButton;
import com.attinad.applicationconfigurator.model.response.crudModels.CrudResponse;
import com.attinad.applicationconfigurator.model.response.dataModels.Items;
import com.attinad.applicationconfigurator.model.response.userModels.User;
import com.attinad.applicationconfigurator.utils.ComponentCreater;
import com.attinad.applicationconfigurator.utils.NavUtils;
import com.attinad.applicationconfigurator.utils.Util;
import com.attinad.applicationconfigurator.utils.VerticalSpaceItemDecoration;
import com.kbeanie.multipicker.api.ImagePicker;
import com.kbeanie.multipicker.api.Picker;
import com.kbeanie.multipicker.api.callbacks.ImagePickerCallback;
import com.kbeanie.multipicker.api.entity.ChosenImage;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by arjunsatish on 3/6/16.
 */
public class HomeActivity extends BaseActivity {

    private static final String TAG = HomeActivity.class.getSimpleName();
    private String typeOfLayout;
    private Page pageToOpen;
    private SignUpResponse formData;
    private Context mContext;
    private EventBus eventBus = EventBus.getDefault();
    private ArrayList<RailModel> listOfRails = new ArrayList<>();
    private RecyclerViewDataAdapter adapter;
    private Toolbar toolbar;
    private DrawerLayout mDrawerLayout;
    private ProgressBar mProgressbar;
    private RelativeLayout mHomeContainer;
    private ExpandableListView mExpandableListView;
    private Pages mPages;
    private ArrayList<Nav> listOfGroupMenu = new ArrayList<>();
    private HashMap<String, ArrayList<Nav>> mapOfSubMenus = new HashMap<>();

    //--- For Crud --
    private RecyclerView recyclerView;
    private String templateID;
    private CrudResponse mCrudResponse;
    private boolean isStatic = false;  // To show a static page
    private CrudRecyclerAdapter crudRecyclerAdapter;
    private CrudGridRecyclerAdapter crudGridRecyclerAdapter;
    private boolean isUpdateMode = false;  // To check if the form should be opned in update mode
    private User userDataToBeUpdated;
    private static final int VERTICAL_ITEM_SPACE = 10;

    //----- Image Picker
    private ImagePicker imagePicker;
    private ImagePickerCallback imagePickerCallback;
    private int deleteCounter = 0;

    private List<CrudButton>listOfCrudButtons = new ArrayList<>();
    private HashMap<String,CrudButton>mapOfButtons = new HashMap<>();
    private CrudResponse crudResponse;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mContext = this;
        typeOfLayout = getIntent().getStringExtra(IntentKeys.PAGE_TYPE);
        pageToOpen = (Page) getIntent().getSerializableExtra(IntentKeys.PAGE_TO_OPEN);
        formData = (SignUpResponse) getIntent().getSerializableExtra(IntentKeys.FORM_CONTENTS);
        templateID = (String) getIntent().getSerializableExtra(IntentKeys.TEMPLATE_ID);
        isUpdateMode = getIntent().getBooleanExtra(IntentKeys.UPDATE_MODE, false);
        userDataToBeUpdated = (User) getIntent().getSerializableExtra(IntentKeys.USER_OBJECT);

        setContentView(R.layout.activity_base);
        initializeToolbar();
        initializeViews();
        populatingSideMenu();
        settingNavigationDrawers();
        intializeContent();
    }


    @Override
    protected void onResume() {
        super.onResume();
        eventBus.register(this);
        if (typeOfLayout.equalsIgnoreCase(Constants.crudType)) {
            if (recyclerView != null) {
                ConfigurationManager.getInstance(mContext).fetchUserList(templateID, mCrudResponse.getFormData());
            }
        }
    }


    @Override
    protected void onPause() {
        super.onPause();
        eventBus.unregister(this);

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        int i = 0;
        for (CrudButton crudButton : listOfCrudButtons) {
            menu.add(i, i, 0, crudButton.getName().split(" ",2)[0]).setShowAsAction(MenuItem.SHOW_AS_ACTION_ALWAYS | MenuItem.SHOW_AS_ACTION_WITH_TEXT);;
            mapOfButtons.put(String.valueOf(i), crudButton);
            i++;
        }
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        CrudButton btnSelcted = mapOfButtons.get(String.valueOf(item.getItemId()));
        if (btnSelcted.getType().equalsIgnoreCase(Constants.crudTypeCreate)) {
            NavUtils.routeToFormPageWithoutMakingAnyApiCalls(mContext, crudResponse.getFormData(), crudResponse.getTemplateId());
        } else if (btnSelcted.getType().equalsIgnoreCase(Constants.crudTypeUpdate)) {
            //open the particular form in edit mode
            onUpdateOrDeleteEvent(new onUpdateAndDelete(Constants.crudTypeUpdate, crudResponse.getFormData(), crudResponse.getTemplateId()));
        } else if (btnSelcted.getType().equalsIgnoreCase(Constants.crudTypeDelete)) {
            //delete the particular item
            onUpdateOrDeleteEvent(new onUpdateAndDelete(Constants.crudTypeDelete, crudResponse.getFormData(), crudResponse.getTemplateId()));
        }
        return super.onOptionsItemSelected(item);
    }

    private void initializeToolbar() {
        setToolbar();
//        setTitle(pageToOpen.getValueId());
        setToolbar();
        toolbar = getToolBar();
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayShowTitleEnabled(false);
        setNavIcon(R.drawable.hamburger_menu);
    }


    private void initializeViews() {
        mHomeContainer = (RelativeLayout) findViewById(R.id.homeContainer);
        mDrawerLayout = (DrawerLayout) findViewById(R.id.drawer_layout);
        mExpandableListView = (ExpandableListView) findViewById(R.id.navigationmenu);
        mProgressbar = (ProgressBar) findViewById(R.id.progressBar);

    }

    private void populatingSideMenu() {
        mPages = CacheManager.getInstance(mContext).getConfiguration();
        ArrayList<Nav> listOfMenus = (ArrayList<Nav>) mPages.getNav();
        iterateNavMenuToExtractGroupsAndSubMenus(listOfMenus);
    }

    private void intializeContent() {
        if (formData != null && typeOfLayout.equalsIgnoreCase(Constants.formType)) {
            //If a static form is to be populated
            isStatic = true;
            mProgressbar.setVisibility(View.GONE);
            initializeImagePickers();
            if (!isUpdateMode) {
                populateFormContents(formData.getFields(), formData.getButtons(), templateID, formData.getField_wrapper_key(), true);
            } else {
                openTheFormInUpdateMode(formData.getFields(), formData.getButtons(), templateID, formData.getField_wrapper_key(), true);
            }
        } else {
            //If the content needs to be fetched from the cloud
            identifyTheTypeOfPage();
        }
    }


    private void iterateNavMenuToExtractGroupsAndSubMenus(ArrayList<Nav> navArrayList) {
        ArrayList<Nav> tmpListOfSubMenus = new ArrayList<>();
        for (Nav nav : navArrayList) {
            if (nav.getShown() == true) {
                if (nav.getParentNavMenuId() != null && !nav.getParentNavMenuId().isEmpty()) {
                    // Its parent
                    tmpListOfSubMenus.add(nav);
                } else {
                    listOfGroupMenu.add(nav);
                }
            }
        }
        //TODO testing purpose
        //------------------------
        if (Constants.isTesting)
            listOfGroupMenu.add(Util.createDummySideMenuForTestingPurpose());
        //-------------------------
        iterateToAddSubMenus(tmpListOfSubMenus);
    }

    private void iterateToAddSubMenus(ArrayList<Nav> subMenuList) {
        for (Nav nav : listOfGroupMenu) {
            ArrayList tmpSubMenusForSpecificParent = new ArrayList();
            for (int i = 0; i < subMenuList.size(); i++) {
                Nav subMenu = subMenuList.get(i);
                if (subMenu.getParentNavMenuId().equalsIgnoreCase(nav.getId())) {
                    tmpSubMenusForSpecificParent.add(subMenu);
                }
            }
            mapOfSubMenus.put(nav.getId(), tmpSubMenusForSpecificParent);
        }
        populateTheSideMenuWithTheExtractedData();
    }

    private void populateTheSideMenuWithTheExtractedData() {
        ExpandableListAdapter expandableListAdapter = new ExpandableListAdapter(mContext, listOfGroupMenu, mapOfSubMenus);
        mExpandableListView.setAdapter(expandableListAdapter);
        expandableListClickListeners();
    }

    private void initializeImagePickers() {
        imagePicker = new ImagePicker(HomeActivity.this);
        imagePickerCallback = new ImagePickerCallback() {
            @Override
            public void onImagesChosen(List<ChosenImage> list) {

                Log.d(TAG, "" + list.toString());
                ChosenImage chosenImage = list.get(0);
                double size = chosenImage.getSize();
                if (Util.getSizeInMb(size) < 3) {
                    Toast.makeText(mContext, "Image Successfully Picked", Toast.LENGTH_SHORT).show();
                    CacheManager.getInstance(mContext).setChosenImage(chosenImage);
                } else
                    Toast.makeText(HomeActivity.this, "Please select an image less than 3mb ", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onError(String s) {
                Toast.makeText(HomeActivity.this, "Could not fetch the photo", Toast.LENGTH_SHORT).show();
            }
        };
        imagePicker.setImagePickerCallback(imagePickerCallback);
    }


    public void closeSideDrawer() {
        if (mDrawerLayout != null) {
            mDrawerLayout.closeDrawer(GravityCompat.START);
        }
    }


    private void expandableListClickListeners() {
        mExpandableListView.setOnGroupClickListener(new ExpandableListView.OnGroupClickListener() {
            @Override
            public boolean onGroupClick(ExpandableListView parent, View v, int groupPosition, long id) {

//                closeSideDrawer();
                if (listOfGroupMenu != null && listOfGroupMenu.get(groupPosition).getPageId() != null) {
                    if (mapOfSubMenus.get(listOfGroupMenu.get(groupPosition).getId()).size() == 0) {
                        String idOfPageToBeOpened = listOfGroupMenu.get(groupPosition).getPageId();
                        Page pageToOpen = CacheManager.getInstance(mContext).getHashmapOfPages().get(idOfPageToBeOpened);
                        NavUtils.identifyThePageAndRoute(pageToOpen, mContext);
                        String name = listOfGroupMenu.get(groupPosition).getName();
//                        Toast.makeText(HomeActivity.this, "Group Name is :--" + name, Toast.LENGTH_SHORT).show();
                    }
                }
                return false;
            }
        });

        mExpandableListView.setOnChildClickListener(new ExpandableListView.OnChildClickListener() {
            @Override
            public boolean onChildClick(ExpandableListView parent, View v, int groupPosition, int childPosition, long id) {
                String name = mapOfSubMenus.get(listOfGroupMenu.get(groupPosition).getId()).get(childPosition).getName();
                String idOfPageToBeOpened = mapOfSubMenus.get(listOfGroupMenu.get(groupPosition).getId()).get(childPosition).getPageId();
                Page pageToOpen = CacheManager.getInstance(mContext).getHashmapOfPages().get(idOfPageToBeOpened);
                NavUtils.identifyThePageAndRoute(pageToOpen, mContext);
//                Toast.makeText(HomeActivity.this, "Child clicked is--" + name, Toast.LENGTH_SHORT).show();
                closeSideDrawer();
                return false;
            }
        });
    }

    // When all the contents to populate the rails , a callback is received here
    @Subscribe
    public void onDataFetched(onRailDataFetched railDataFetched) {
        mProgressbar.setVisibility(View.GONE);
        HashMap<String, Items> itemsHashMap = railDataFetched.getItemsHashMap();
        HashMap<String, BandResponse> bandHashMap = railDataFetched.getBandHashMap();
        Iterator it = itemsHashMap.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry) it.next();
            RailModel railModel = new RailModel();
            Items items = (Items) pair.getValue();
            BandResponse bandResponse = bandHashMap.get(pair.getKey());
            railModel.setCategoryName(bandResponse.getTitle());
            railModel.setListOfitems(new ArrayList<>(items.getItems()));
            railModel.setBandResponse(bandResponse);
            listOfRails.add(railModel);
        }
        Log.d(TAG, listOfRails.toString());
        adapter.notifyDataSetChanged();
    }

    @Subscribe
    public void onFormDetailsFetched(onFormDetailFetch formDataEvent) {
        mProgressbar.setVisibility(View.GONE);
        populateFormContents(formDataEvent.getSignUpResponse().getFields(),
                formDataEvent.getSignUpResponse().getButtons(), formDataEvent.getSignUpResponse().
                        getTemplateId(), formDataEvent.getSignUpResponse().getField_wrapper_key(), false);
    }

    @Subscribe
    public void onFormSubmissionSucces(onFormSubmissionSuccess event) {
        mProgressbar.setVisibility(View.GONE);
        finish();
        Toast.makeText(HomeActivity.this, "User Registered", Toast.LENGTH_SHORT).show();
    }

    @Subscribe
    public void onApiFired(onApiFireEvent event) {
        mProgressbar.setVisibility(View.VISIBLE);
    }

    @Subscribe
    public void onCrudConfigurationFetched(onCrudConfiguratonFetched event) {
        populateCrudContents(event.getCrudResponse(), event.getCrudResponse().getTemplateId());
        templateID = event.getCrudResponse().getTemplateId();
        mCrudResponse = event.getCrudResponse();
        invalidateOptionsMenu();
        listOfCrudButtons = event.getCrudResponse().getButtons();
        crudResponse = event.getCrudResponse();
        ConfigurationManager.getInstance(mContext).fetchUserList(event.getCrudResponse().getTemplateId(), event.getCrudResponse().getFormData());
    }

    @Subscribe
    public void onUserListFetched(onUserListFetched event) {

        if (recyclerView != null && crudResponse.getType().equalsIgnoreCase(Constants.GRIDVIEW_WITH_CHECKBOX)) {
            crudGridRecyclerAdapter = new CrudGridRecyclerAdapter(new ArrayList<>(event.getUserDataList().getUserData()), event.getFormData());
            recyclerView.setAdapter(crudGridRecyclerAdapter);
        } else if (recyclerView != null && crudResponse.getType().equalsIgnoreCase(Constants.LISTVIEW_WITH_CHECKBOX)) {
            crudRecyclerAdapter = new CrudRecyclerAdapter(new ArrayList<>(event.getUserDataList().getUserData()), event.getFormData());
            recyclerView.setAdapter(crudRecyclerAdapter);
        }
    }

    @Subscribe
    public void onImagePickerEvent(imagePickerEvent event) {
        imagePicker.pickImage();
    }

    @Subscribe
    public void onUpdateOrDeleteEvent(onUpdateAndDelete event) {

        Set<User>selectedUsers = null;
        if (crudRecyclerAdapter != null && crudGridRecyclerAdapter == null){
            selectedUsers = crudRecyclerAdapter.getSelectedUsers();
        }else if (crudGridRecyclerAdapter != null){
            selectedUsers = crudGridRecyclerAdapter.getSelectedUsers();
        }
        if (event.getOperationToBeDone().equalsIgnoreCase(Constants.crudTypeDelete)) {
            for (User user : selectedUsers) {
//                Toast.makeText(mContext, "User Selected--" + user.getName(), Toast.LENGTH_SHORT).show();
                ConfigurationManager.getInstance(mContext).fetchDeleteResponse(user.getId(), event.getTemplateID());
            }
//            crudRecyclerAdapter.deleteCheckedItems();
        } else if (event.getOperationToBeDone().equalsIgnoreCase(Constants.crudTypeUpdate)) {
            if (selectedUsers.size() == 1) {
                NavUtils.routeToFormPageAndOpenInUpdateMode(mContext, event.getSignUpResponse(), event.getTemplateID(), selectedUsers.iterator().next());
            } else if (crudRecyclerAdapter.getSelectedUsers().size() >= 1) {
                Toast.makeText(mContext, "Please select one to update", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(mContext, "Please select atleast one item", Toast.LENGTH_SHORT).show();
            }
        }

    }

    @Subscribe
    public void onItemCheckStateChanged(ItemCheckStateChanged event) {

        if (event.isChecked) {
            if (crudRecyclerAdapter != null && crudGridRecyclerAdapter == null){
                crudRecyclerAdapter.addSelectedItem(event.user);
            }else if (crudGridRecyclerAdapter != null){
                crudGridRecyclerAdapter.addSelectedItem(event.user);
            }

        } else {
            if (crudRecyclerAdapter != null && crudGridRecyclerAdapter == null){
                crudRecyclerAdapter.removeSelectedItem(event.user);
            }else if (crudGridRecyclerAdapter != null){
                crudGridRecyclerAdapter.removeSelectedItem(event.user);
            }

        }
    }

    @Subscribe
    public void onDeleteEvent(DeleteEvent event){

        Set<User>selectedUsers = null;
        if (crudRecyclerAdapter != null && crudGridRecyclerAdapter == null){
            selectedUsers = crudRecyclerAdapter.getSelectedUsers();
        }else if (crudGridRecyclerAdapter != null){
            selectedUsers = crudGridRecyclerAdapter.getSelectedUsers();
        }

        if (event.isFailure() == false){
            deleteCounter ++;
            if (deleteCounter >=selectedUsers.size()){
                Toast.makeText(mContext, "Delete successfull", Toast.LENGTH_SHORT).show();

                if (crudRecyclerAdapter != null && crudGridRecyclerAdapter == null){
                    crudRecyclerAdapter.deleteCheckedItems();
                }else if (crudGridRecyclerAdapter != null){
                   crudGridRecyclerAdapter.deleteCheckedItems();
                }


            }
        }

    }

    private void identifyTheTypeOfPage() {
        if (typeOfLayout.equalsIgnoreCase(Constants.bandType)) {
            View view = getLayoutInflater().inflate(R.layout.activity_recycler, null);
            mHomeContainer.addView(view);
            ConfigurationManager.getInstance(mContext).fetchConfigurationsForAPage(pageToOpen);
            populateMediaContents(view);
        } else if (typeOfLayout.equalsIgnoreCase(Constants.formType)) {
            initializeImagePickers();
            ConfigurationManager.getInstance(mContext).fetchFormContents(pageToOpen);
        } else if (typeOfLayout.equalsIgnoreCase(Constants.crudType)) {
            ConfigurationManager.getInstance(mContext).fetchCrudConfiguration();
            mProgressbar.setVisibility(View.GONE);
        }
    }

    private void populateFormContents(List<Field> listOfFields, List<Button> listOfButtons, String templateID, String fieldWrapperKey, boolean isStatic) {
        mHomeContainer.removeAllViews();
        mHomeContainer.addView(ComponentManager.getInstance(mContext).constructTheUiFromTheApi(mContext, listOfFields, listOfButtons, templateID, fieldWrapperKey, isStatic, false));
    }

    private void openTheFormInUpdateMode(List<Field> listOfFields, List<Button> listOfButtons, String templateID, String fieldWrapperKey, boolean isStatic) {
        mHomeContainer.removeAllViews();
        mHomeContainer.addView(ComponentManager.getInstance(mContext).constructTheUiFromTheApi(mContext, Util.parseFieldsToGetTheValueOfTheCorrespondingField(listOfFields, userDataToBeUpdated), Util.parseButtonsToAttachUserAlongWithIt(listOfButtons, userDataToBeUpdated), templateID, fieldWrapperKey, isStatic, true));
    }

    private void populateMediaContents(View view) {

        RecyclerView my_recycler_view = (RecyclerView) findViewById(R.id.my_recycler_view);
        my_recycler_view.setHasFixedSize(true);
        my_recycler_view.setNestedScrollingEnabled(false);
        adapter = new RecyclerViewDataAdapter(this, listOfRails);
        my_recycler_view.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));
        my_recycler_view.setAdapter(adapter);

    }

    private void populateCrudContents(CrudResponse crudResponse, String templateID) {
        mHomeContainer.removeAllViews();
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        recyclerView = new RecyclerView(mContext);
        recyclerView.setHasFixedSize(false);
        recyclerView.setNestedScrollingEnabled(false);
        recyclerView.addItemDecoration(new VerticalSpaceItemDecoration(VERTICAL_ITEM_SPACE));
        recyclerView.setLayoutParams(params);
        ArrayList<String> items = new ArrayList<>();
      /*  items.add("Arjun");
        items.add("Fragments");
        items.add("Activity");
        CrudRecyclerAdapter crudRecyclerAdapter = new CrudRecyclerAdapter(items);*/
        attachTheAppropriateLayoutManager(crudResponse, recyclerView);
        mHomeContainer.addView(ComponentManager.getInstance(mContext).
                constructTheUiFromTheApi(mContext, null, recyclerView, crudResponse.getFormData(), templateID));
//                constructTheUiFromTheApi(mContext, crudResponse.getButtons(), recyclerView, crudResponse.getFormData(), templateID));
    }

    private void attachTheAppropriateLayoutManager(CrudResponse crudResponse, RecyclerView recyclerView) {

//        recyclerView.setLayoutManager(ComponentCreater.getLinearLayoutManager(mContext));
       if (crudResponse.getType().equalsIgnoreCase(Constants.LISTVIEW_WITH_CHECKBOX)){
           recyclerView.setLayoutManager(ComponentCreater.getLinearLayoutManager(mContext));
       }else  if (crudResponse.getType().equalsIgnoreCase(Constants.GRIDVIEW_WITH_CHECKBOX)){
           recyclerView.setLayoutManager(ComponentCreater.getGridLayoutManager(mContext,2));
       }
    }

    private void settingNavigationDrawers() {


        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, mDrawerLayout, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close) {


            /** Called when a drawer has settled in a completely closed state. */
            public void onDrawerClosed(View view) {
                super.onDrawerClosed(view);
                // Do whatever you want here
            }

            /** Called when a drawer has settled in a completely open state. */
            public void onDrawerOpened(View drawerView) {
                super.onDrawerOpened(drawerView);
                Util.hideKeyboard(drawerView, mContext);

            }
        };

        mDrawerLayout.setDrawerListener(toggle);
        toggle.syncState();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        switch (requestCode) {
            case Picker.PICK_IMAGE_DEVICE:
                if (resultCode == RESULT_OK) {
                    if (imagePicker == null) {
                        imagePicker = new ImagePicker(HomeActivity.this);
                        imagePicker.setImagePickerCallback(imagePickerCallback);
                    }
                    imagePicker.submit(data);
                }
                break;
        }
    }
}
