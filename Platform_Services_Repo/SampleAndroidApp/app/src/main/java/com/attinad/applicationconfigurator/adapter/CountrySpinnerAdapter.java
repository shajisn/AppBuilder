package com.attinad.applicationconfigurator.adapter;

/**
 * Created by arjun on 29-03-2016.
 */

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.support.annotation.NonNull;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.attinad.applicationconfigurator.R;

import java.util.ArrayList;
import java.util.List;


public class CountrySpinnerAdapter extends ArrayAdapter {

    private ArrayList<String> objects;

    private LayoutInflater layoutInflater;

    private boolean opened = false;
    private int selectedPosition = 0;
    private Context mActivity;

    public CountrySpinnerAdapter(Context activity, ArrayList<String> objects) {
        super(activity, R.layout.spinner_dropdown_item);
        this.mActivity = activity;
        this.layoutInflater = LayoutInflater.from(mActivity);
        this.objects = objects;
    }

    public CountrySpinnerAdapter(Context context, int resource, List objects) {
        super(context, resource, objects);
    }

    public void setOpened(boolean opened) {
        this.opened = opened;
    }

    @Override
    public int getCount() {
        if (objects != null)
            return objects.size();
        else return 0;
    }

    @Override
    public String getItem(int position) {
        return objects.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getDropDownView(int position, View convertView, ViewGroup parent) {
        return getCustomView(position, convertView, parent, R.layout.spinner_dropdown_item);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        return getCustomView(position, convertView, parent, R.layout.spinner_item);
    }

    @NonNull
    private View getCustomView(int position, View convertView, ViewGroup parent, int resource) {
        if (convertView == null) {
            convertView = layoutInflater.inflate(resource, parent, false);
            ViewHolder viewHolder = new ViewHolder();
            viewHolder.item = (TextView) convertView.findViewById(R.id.item);
            viewHolder.container = convertView.findViewById(R.id.container);

            convertView.setTag(viewHolder);
        }
        initializeViews(position, (ViewHolder) convertView.getTag());
        return convertView;
    }

    private void initializeViews(int position, ViewHolder holder) {
        holder.item.setText(objects.get(position));

        if (holder.container != null) {
            holder.container.setBackgroundColor(mActivity.getResources().getColor(R.color.transparent));
               /* Drawable image = mActivity.getResources().getDrawable(R.drawable.arrow_down_blue);
                setDropdownSelector(holder, image);*/
        }
    }

    private void setDropdownSelector(ViewHolder holder, Drawable image) {
        if (image != null) {
            int h = image.getIntrinsicHeight();
            int w = image.getIntrinsicWidth();
            image.setBounds(0, 0, w, h);
            holder.item.setCompoundDrawables(null, null, image, null);
        }
    }

    public void setSelectedPosition(int selectedPosition) {
        this.selectedPosition = selectedPosition;
    }

    protected class ViewHolder {
        private TextView item;
        private View container;
    }
}