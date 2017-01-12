package com.attinad.applicationconfigurator.adapter;


import android.content.Context;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.attinad.applicationconfigurator.R;
import com.attinad.applicationconfigurator.customwidgets.CustomTextView;
import com.attinad.applicationconfigurator.model.featuredRailModels.DoubleDecker;
import com.attinad.applicationconfigurator.model.featuredRailModels.FeaturedItem;
import com.attinad.applicationconfigurator.model.response.dataModels.Item;
import com.bumptech.glide.Glide;

import java.util.ArrayList;


public class FeaturedListDataAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private final int FEATURED = 0;
    private final int DOUBLE_DECKER = 1;

    private ArrayList<Object> itemsList;
    private Context mContext;


    public FeaturedListDataAdapter(Context context, ArrayList<Object> itemsList) {
        this.itemsList = itemsList;
        this.mContext = context;
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        RecyclerView.ViewHolder viewHolder = null;
        LayoutInflater inflater = LayoutInflater.from(viewGroup.getContext());

        switch (viewType) {
            case FEATURED:
                View v1 = inflater.inflate(R.layout.featured_item_layout, viewGroup, false);
                viewHolder = new SingleItemRowHolder(v1);
                break;
            case DOUBLE_DECKER:
                View v2 = inflater.inflate(R.layout.featured_decker_layout, viewGroup, false);
                viewHolder = new DoubleDeckerViewHolder(v2);
                break;
            default:
                View v = inflater.inflate(android.R.layout.simple_list_item_1, viewGroup, false);
                viewHolder = new SingleItemRowHolder(v);
                break;
        }
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder viewHolder, int position) {
        switch (viewHolder.getItemViewType()) {
            case DOUBLE_DECKER:
                DoubleDeckerViewHolder vh1 = (DoubleDeckerViewHolder) viewHolder;
                configureDoubleDeckerViewHolder(vh1, position);
                break;
            case FEATURED:
                SingleItemRowHolder vh2 = (SingleItemRowHolder) viewHolder;
                configureFeaturedViewHolder(vh2, position);
                break;
            default:
                break;
        }
    }

    private void configureFeaturedViewHolder(SingleItemRowHolder holder, int position) {
        final FeaturedItem featuredItem = (FeaturedItem) itemsList.get(position);
        Item singleItem = featuredItem.getFeaturedItem();

        holder.tvTitle.setText(singleItem.getName());
        Glide.with(mContext)
                .load(singleItem.getThumbnailURL())
                .centerCrop()
                .placeholder(R.drawable.android)
                .crossFade()
                .into(holder.itemImage);
       /* holder.itemImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(mContext, "Item--"+featuredItem.getOrginalPositionInTheArray(), Toast.LENGTH_SHORT).show();
            }
        });*/
    }

    private void configureDoubleDeckerViewHolder(DoubleDeckerViewHolder holder, int position) {
        final DoubleDecker wrapper = (DoubleDecker) itemsList.get(position);
        Item firstItem = wrapper.getFirstItem().getItem();
        Item secondItem = wrapper.getSecondItem().getItem();


        if (firstItem != null ) {
            holder.tvTitle1.setText(firstItem.getName());
            Glide.with(mContext)
                    .load(firstItem.getThumbnailURL())
                    .centerCrop()
                    .placeholder(R.drawable.android)
                    .crossFade()
                    .into(holder.itemImage1);
        }else{
            holder.firstContainer.setVisibility(View.GONE);
        }
        if (secondItem != null) {
            holder.tvTitle2.setText(secondItem.getName());
            Glide.with(mContext)
                    .load(secondItem.getThumbnailURL())
                    .centerCrop()
                    .placeholder(R.drawable.android)
                    .crossFade()
                    .into(holder.itemImage2);
        }else holder.secondContainer.setVisibility(View.INVISIBLE);
       /* holder.itemImage1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(mContext, "Item-"+wrapper.getFirstItem().getPosition(), Toast.LENGTH_SHORT).show();
            }
        });

        holder.itemImage2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(mContext, "Item-"+wrapper.getSecondItem().getPosition(), Toast.LENGTH_SHORT).show();
            }
        });*/
    }

    @Override
    public int getItemCount() {
        return (null != itemsList ? itemsList.size() : 0);
    }


    @Override
    public int getItemViewType(int position) {
        if (itemsList.get(position) instanceof FeaturedItem) {
            return FEATURED;
        } else if (itemsList.get(position) instanceof DoubleDecker) {
            return DOUBLE_DECKER;
        }
        return -1;
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


    public class DoubleDeckerViewHolder extends RecyclerView.ViewHolder {

        protected CustomTextView tvTitle1, tvTitle2;

        protected ImageView itemImage1, itemImage2;
        protected CardView firstContainer,secondContainer;


        public DoubleDeckerViewHolder(View view) {
            super(view);

            this.tvTitle1 = (CustomTextView) view.findViewById(R.id.tvTitle1);
            this.tvTitle2 = (CustomTextView) view.findViewById(R.id.tvTitle2);
            this.itemImage1 = (ImageView) view.findViewById(R.id.itemImage1);
            this.itemImage2 = (ImageView) view.findViewById(R.id.itemImage2);
            firstContainer = (CardView) view.findViewById(R.id.firstContainer);
            secondContainer = (CardView) view.findViewById(R.id.secondContainer);


        }

    }


}