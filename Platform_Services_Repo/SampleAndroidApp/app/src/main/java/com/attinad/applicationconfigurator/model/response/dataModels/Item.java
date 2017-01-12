package com.attinad.applicationconfigurator.model.response.dataModels;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class Item {

    @SerializedName("id")
    @Expose
    private Long id;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("shortDescription")
    @Expose
    private String shortDescription;
    @SerializedName("videoStillURL")
    @Expose
    private String videoStillURL;
    @SerializedName("thumbnailURL")
    @Expose
    private String thumbnailURL;
    @SerializedName("playsTotal")
    @Expose
    private Integer playsTotal;
    @SerializedName("genre")
    @Expose
    private String genre;
    @SerializedName("type")
    @Expose
    private String type;
    @SerializedName("metatags")
    @Expose
    private String metatags;
    @SerializedName("metadescription")
    @Expose
    private String metadescription;
    @SerializedName("geoFilteredCountries")
    @Expose
    private List<Object> geoFilteredCountries = new ArrayList<Object>();
    @SerializedName("cuePoints")
    @Expose
    private List<Object> cuePoints = new ArrayList<Object>();
    @SerializedName("cast")
    @Expose
    private String cast;
    @SerializedName("baseviews")
    @Expose
    private String baseviews;

    /**
     * @return The id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id The id
     */
    public void setId(Long id) {
        this.id = id;
    }

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
     * @return The shortDescription
     */
    public String getShortDescription() {
        return shortDescription;
    }

    /**
     * @param shortDescription The shortDescription
     */
    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    /**
     * @return The videoStillURL
     */
    public String getVideoStillURL() {
        return videoStillURL;
    }

    /**
     * @param videoStillURL The videoStillURL
     */
    public void setVideoStillURL(String videoStillURL) {
        this.videoStillURL = videoStillURL;
    }

    /**
     * @return The thumbnailURL
     */
    public String getThumbnailURL() {
        return thumbnailURL;
    }

    /**
     * @param thumbnailURL The thumbnailURL
     */
    public void setThumbnailURL(String thumbnailURL) {
        this.thumbnailURL = thumbnailURL;
    }

    /**
     * @return The playsTotal
     */
    public Integer getPlaysTotal() {
        return playsTotal;
    }

    /**
     * @param playsTotal The playsTotal
     */
    public void setPlaysTotal(Integer playsTotal) {
        this.playsTotal = playsTotal;
    }

    /**
     * @return The genre
     */
    public String getGenre() {
        return genre;
    }

    /**
     * @param genre The genre
     */
    public void setGenre(String genre) {
        this.genre = genre;
    }

    /**
     * @return The type
     */
    public String getType() {
        return type;
    }

    /**
     * @param type The type
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * @return The metatags
     */
    public String getMetatags() {
        return metatags;
    }

    /**
     * @param metatags The metatags
     */
    public void setMetatags(String metatags) {
        this.metatags = metatags;
    }

    /**
     * @return The metadescription
     */
    public String getMetadescription() {
        return metadescription;
    }

    /**
     * @param metadescription The metadescription
     */
    public void setMetadescription(String metadescription) {
        this.metadescription = metadescription;
    }

    /**
     * @return The geoFilteredCountries
     */
    public List<Object> getGeoFilteredCountries() {
        return geoFilteredCountries;
    }

    /**
     * @param geoFilteredCountries The geoFilteredCountries
     */
    public void setGeoFilteredCountries(List<Object> geoFilteredCountries) {
        this.geoFilteredCountries = geoFilteredCountries;
    }

    /**
     * @return The cuePoints
     */
    public List<Object> getCuePoints() {
        return cuePoints;
    }

    /**
     * @param cuePoints The cuePoints
     */
    public void setCuePoints(List<Object> cuePoints) {
        this.cuePoints = cuePoints;
    }

    /**
     * @return The cast
     */
    public String getCast() {
        return cast;
    }

    /**
     * @param cast The cast
     */
    public void setCast(String cast) {
        this.cast = cast;
    }

    /**
     * @return The baseviews
     */
    public String getBaseviews() {
        return baseviews;
    }

    /**
     * @param baseviews The baseviews
     */
    public void setBaseviews(String baseviews) {
        this.baseviews = baseviews;
    }

}
