package com.attinad.applicationconfigurator.model.response.allConfig;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class LanguageList {

    @SerializedName("language_id")
    @Expose
    private String languageId;
    @SerializedName("language_name")
    @Expose
    private String languageName;

    /**
     * @return The languageId
     */
    public String getLanguageId() {
        return languageId;
    }

    /**
     * @param languageId The language_id
     */
    public void setLanguageId(String languageId) {
        this.languageId = languageId;
    }

    /**
     * @return The languageName
     */
    public String getLanguageName() {
        return languageName;
    }

    /**
     * @param languageName The language_name
     */
    public void setLanguageName(String languageName) {
        this.languageName = languageName;
    }

}
