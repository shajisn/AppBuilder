package com.attinad.applicationconfigurator.adapter;


import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.attinad.applicationconfigurator.R;
import com.attinad.applicationconfigurator.customwidgets.CustomTextView;
import com.attinad.applicationconfigurator.model.response.dataModels.Item;
import com.bumptech.glide.Glide;

import java.util.ArrayList;


public class SectionListDataAdapter extends RecyclerView.Adapter<SectionListDataAdapter.SingleItemRowHolder> {

    private static final int PORTRAIT = 0;
    private static final int LANDSCAPE = 1;
    private ArrayList<Item> itemsList;
    private Context mContext;
    private String mOrientation;


    public SectionListDataAdapter(Context context, ArrayList<Item> itemsList, String orientation) {
        this.itemsList = itemsList;
        this.mContext = context;
        this.mOrientation = orientation;
    }

    @Override
    public SingleItemRowHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = null;
        switch (viewType) {
            case PORTRAIT:
                v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_single_card, null);
                break;
            case LANDSCAPE:
                v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_single_card_landscape, null);
                break;
            default:
                break;
        }
        SingleItemRowHolder mh = new SingleItemRowHolder(v);
        return mh;
    }

    @Override
    public void onBindViewHolder(final SingleItemRowHolder holder, int i) {

        final Item singleItem = itemsList.get(i);

        holder.tvTitle.setText(singleItem.getName());


        holder.itemImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                DetailActivity.startDetailActivity(mContext,holder.itemImage,singleItem ,false);
            }
        });


        Glide.with(mContext)
                .load(singleItem.getThumbnailURL())
                .centerCrop()
                .placeholder(R.drawable.android)
                .crossFade()
                .into(holder.itemImage);
    }

    @Override
    public int getItemViewType(int position) {
        if (mOrientation.equalsIgnoreCase("normalRailPortrait")) {
            return PORTRAIT;
        } else {
            return LANDSCAPE;
        }
    }

    @Override
    public int getItemCount() {
        return (null != itemsList ? itemsList.size() : 0);
    }

    public class SingleItemRowHolder extends RecyclerView.ViewHolder {

        protected CustomTextView tvTitle;

        protected ImageView itemImage;


        public SingleItemRowHolder(View view) {
            super(view);

            this.tvTitle = (CustomTextView) view.findViewById(R.id.tvTitle);
            this.itemImage = (ImageView) view.findViewById(R.id.itemImage);

        }

    }

}