package com.attinad.applicationconfigurator.adapter;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.attinad.applicationconfigurator.R;
import com.attinad.applicationconfigurator.model.events.ItemCheckStateChanged;
import com.attinad.applicationconfigurator.model.response.Field;
import com.attinad.applicationconfigurator.model.response.SignUpResponse;
import com.attinad.applicationconfigurator.model.response.userModels.User;
import com.attinad.applicationconfigurator.utils.ComponentCreater;
import com.attinad.applicationconfigurator.utils.Util;
import com.bumptech.glide.Glide;
import com.bumptech.glide.signature.StringSignature;

import org.greenrobot.eventbus.EventBus;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by arjunsatish on 16/6/16.
 */
public class CrudRecyclerAdapter extends RecyclerView.Adapter<CrudRecyclerAdapter.ViewHolder> {

    private ArrayList<User> items = new ArrayList<>();
    private SignUpResponse mSignUpResponse;
    private Context mContext;
    private Set<User> selectedTasks = new HashSet<User>();
    private static final EventBus eventBus = EventBus.getDefault();


    public CrudRecyclerAdapter(ArrayList<User> items, SignUpResponse signUpResponse) {
        this.items = items;
        this.mSignUpResponse = signUpResponse;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        mContext = parent.getContext();
        LayoutInflater inflater = LayoutInflater.from(mContext);

        // Inflate the custom layout
        View contactView = inflater.inflate(R.layout.item_layout, parent, false);

        // Return a new holder instance
        ViewHolder viewHolder = new ViewHolder(contactView);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        User user = items.get(position);
        holder.setUser(user);
        holder.setChecked(selectedTasks.contains(user));
        for (Field field : mSignUpResponse.getFields()) {
            holder.container.addView(ComponentCreater.getTextViewWithALabelForListing(mContext, field, Util.identifyTheTypeOfFieldToExtractTheData(field, user)));
        }
        Glide.with(mContext)
                .load(user.getImage())
                .centerCrop()
                .signature(new StringSignature(String.valueOf(System.currentTimeMillis())))
               /*  .diskCacheStrategy(DiskCacheStrategy.NONE)
                .skipMemoryCache(true)*/
                .placeholder(R.drawable.android)
                .crossFade()
                .into(holder.imageView);
    }


    @Override
    public int getItemCount() {
        return items.size();
    }


    public ArrayList<User> getItems() {
        return items;
    }

    public void removeAtPosition(int position) {
        items.remove(position);
        notifyItemRemoved(position);
        notifyItemRangeChanged(position, items.size());

    }

    public void removeAtPosition(User user) {
        items.remove(user);
        notifyDataSetChanged();
       /* notifyItemRemoved(position);
        notifyItemRangeChanged(position, items.size());*/

    }

    public void addSelectedItem(User user) {
        selectedTasks.add(user);
    }

    public void removeSelectedItem(User user) {
        selectedTasks.remove(user);
    }


    public void deleteCheckedItems() {
        for (User user : selectedTasks) {
            this.notifyItemRemoved(items.indexOf(user));
            items.remove(user);
        }
        selectedTasks.clear();
    }

    public Set<User> getSelectedUsers() {
        return selectedTasks;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {

        private LinearLayout container;
        private ImageView imageView;
        private CheckBox checkBox;
        private User user;

        public ViewHolder(View itemView) {
            super(itemView);

            container = (LinearLayout) itemView.findViewById(R.id.rightContainer);
            imageView = (ImageView) itemView.findViewById(R.id.imageView);
            checkBox = (CheckBox) itemView.findViewById(R.id.checkbox);
            checkBox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
                @Override
                public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                    eventBus.post(new ItemCheckStateChanged(user, isChecked));
                }
            });

        }

        public void setUser(User user) {
            this.user = user;
        }

        public void setChecked(boolean checked) {
            checkBox.setChecked(checked);
        }
    }


}
