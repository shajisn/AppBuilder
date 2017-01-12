package com.attinad.applicationconfigurator.adapter;


import android.content.Context;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.attinad.applicationconfigurator.R;
import com.attinad.applicationconfigurator.constants.Constants;
import com.attinad.applicationconfigurator.customwidgets.CustomButton;
import com.attinad.applicationconfigurator.customwidgets.CustomTextView;
import com.attinad.applicationconfigurator.model.featuredRailModels.DoubleDecker;
import com.attinad.applicationconfigurator.model.featuredRailModels.FeaturedItem;
import com.attinad.applicationconfigurator.model.itemmodels.RailModel;
import com.attinad.applicationconfigurator.model.response.BandResponse;
import com.attinad.applicationconfigurator.model.response.dataModels.Item;

import java.util.ArrayList;

public class RecyclerViewDataAdapter extends RecyclerView.Adapter<RecyclerViewDataAdapter.ItemRowHolder> {

    private ArrayList<RailModel> dataList;
    private Context mContext;
    private static final int PORTRAIT = 0;
    private static final int LANDSCAPE = 1;
    private static final int FEATURED = 2;


    public RecyclerViewDataAdapter(Context context, ArrayList<RailModel> dataList) {
        this.dataList = dataList;
        this.mContext = context;
    }

    @Override
    public int getItemViewType(int pos) {

        if (dataList.get(pos).getBandResponse().getView().equalsIgnoreCase("normalRailPortrait")) {
            return PORTRAIT;
        } else  if (dataList.get(pos).getBandResponse().getView().equalsIgnoreCase("normalRailLandscape")){
           return LANDSCAPE;
        }else{
           return FEATURED;
        }
    }

    @Override
    public ItemRowHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = null;
        switch (viewType){
            case PORTRAIT:
                v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item, null);
                break;
            case LANDSCAPE:
                v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_landscape, null);
                break;
            case FEATURED:
                v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_landscape_featured, null);
                break;
            default:
                break;
        }
        ItemRowHolder mh = new ItemRowHolder(v);
        return mh;
    }


    @Override
    public void onBindViewHolder(ItemRowHolder itemRowHolder, final int i) {

        final String sectionName = dataList.get(i).getCategoryName();
        final BandResponse bandResponse = dataList.get(i).getBandResponse();

        ArrayList singleSectionItems = dataList.get(i).getListOfitems();

        itemRowHolder.itemTitle.setText(sectionName);

        String orientation = dataList.get(i).getBandResponse().getView();
        itemRowHolder.recycler_view_list.setHasFixedSize(true);
        itemRowHolder.recycler_view_list.setLayoutManager(new LinearLayoutManager(mContext, LinearLayoutManager.HORIZONTAL, false));

        if (orientation.equalsIgnoreCase(Constants.FEATURED_RAIL)) {
            FeaturedListDataAdapter featuredListDataAdapter = new FeaturedListDataAdapter(mContext, parseItemsToDifferentTypes(i));
            itemRowHolder.recycler_view_list.setAdapter(featuredListDataAdapter);
        } else {
            SectionListDataAdapter itemListDataAdapter = new SectionListDataAdapter(mContext, singleSectionItems, bandResponse.getView());
            itemRowHolder.recycler_view_list.setAdapter(itemListDataAdapter);
        }


        itemRowHolder.recycler_view_list.setNestedScrollingEnabled(false);

        if (bandResponse.getSeeAllOptions().equalsIgnoreCase("false")) {
            itemRowHolder.btnMore.setVisibility(View.GONE);
        } else {
            itemRowHolder.btnMore.setVisibility(View.VISIBLE);
        }

        itemRowHolder.btnMore.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                ListingActivity.startActivity(mContext, dataList.get(i).getListOfitems());

            }
        });

    }

    @Override
    public int getItemCount() {
        return (null != dataList ? dataList.size() : 0);
    }

    public class ItemRowHolder extends RecyclerView.ViewHolder {

        protected CustomTextView itemTitle;

        protected RecyclerView recycler_view_list;

        protected CustomButton btnMore;


        public ItemRowHolder(View view) {
            super(view);

            this.itemTitle = (CustomTextView) view.findViewById(R.id.itemTitle);
            this.recycler_view_list = (RecyclerView) view.findViewById(R.id.recycler_view_list);
            this.btnMore = (CustomButton) view.findViewById(R.id.btnMore);

        }

    }

    private ArrayList<Object> parseItemsToDifferentTypes(int position) {
        ArrayList<Item> singleSectionItems = dataList.get(position).getListOfitems();
        ArrayList<Object> resultantArrayList = new ArrayList<>();
        if (singleSectionItems.size() >= 1) {
            resultantArrayList.add(new FeaturedItem(singleSectionItems.get(0), 0));
        }
        for (int i = 1; i < singleSectionItems.size(); i += 2) {
            Item first = null;
            Item second = null;
            if (singleSectionItems.get(i)!=null)
            first = singleSectionItems.get(i);
            if ((i+1) < singleSectionItems.size())
            second = singleSectionItems.get(i + 1);
            resultantArrayList.add(new DoubleDecker(first, second, i));
        }
//       resultantArrayList.add(new DoubleDecker(singleSectionItems.get(1),singleSectionItems.get(2),1));
        return resultantArrayList;
    }
}