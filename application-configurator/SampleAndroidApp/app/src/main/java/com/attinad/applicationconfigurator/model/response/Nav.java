package com.attinad.applicationconfigurator.model.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class Nav implements Serializable {

    private static final long serialVersionUID = -6172660643133112051L;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("image")
    @Expose
    private String image;
    @SerializedName("shown")
    @Expose
    private Boolean shown;
    @SerializedName("page_id")
    @Expose
    private String pageId;
    @SerializedName("parent_nav_menu_id")
    @Expose
    private String parentNavMenuId;
    @SerializedName("has_sub_menu")
    @Expose
    private String hasSubMenu;
    @SerializedName("_value_id")
    @Expose
    private String valueId;

    /**
     * @return The name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name The name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return The id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id The id
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return The image
     */
    public String getImage() {
        return image;
    }

    /**
     * @param image The image
     */
    public void setImage(String image) {
        this.image = image;
    }

    /**
     * @return The shown
     */
    public Boolean getShown() {
        return shown;
    }

    /**
     * @param shown The shown
     */
    public void setShown(Boolean shown) {
        this.shown = shown;
    }

    /**
     * @return The pageId
     */
    public String getPageId() {
        return pageId;
    }

    /**
     * @param pageId The page_id
     */
    public void setPageId(String pageId) {
        this.pageId = pageId;
    }

    /**
     * @return The parentNavMenuId
     */
    public String getParentNavMenuId() {
        return parentNavMenuId;
    }

    /**
     * @param parentNavMenuId The parent_nav_menu_id
     */
    public void setParentNavMenuId(String parentNavMenuId) {
        this.parentNavMenuId = parentNavMenuId;
    }

    /**
     * @return The hasSubMenu
     */
    public String getHasSubMenu() {
        return hasSubMenu;
    }

    /**
     * @param hasSubMenu The has_sub_menu
     */
    public void setHasSubMenu(String hasSubMenu) {
        this.hasSubMenu = hasSubMenu;
    }

    /**
     * @return The valueId
     */
    public String getValueId() {
        return valueId;
    }

    /**
     * @param valueId The _value_id
     */
    public void setValueId(String valueId) {
        this.valueId = valueId;
    }

}
