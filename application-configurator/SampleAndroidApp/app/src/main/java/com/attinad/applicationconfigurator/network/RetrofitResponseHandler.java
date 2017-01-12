package com.attinad.applicationconfigurator.network;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import retrofit.client.Response;
import retrofit.mime.TypedInput;

/**
 * Created by arjunsatish on 31/5/16.
 */
public class RetrofitResponseHandler {

    public static final String DATA_TYPE_JSON_ARRAY = "arrayData";
    public static final String DATA_TYPE_STRING = "stringData";
    private static final String PAGE_SIZE = "pageSize";
    private static final String PAGE_NUMBER = "pageNumber";
    private static final String TOTAL_COUNT = "totalCount";
    private static final String ENTRIES = "entries";
    public static boolean isModified;

    public static void handleResponse(Response response, Callback<JSONObject> onSuccess) {

        JSONObject json = convertToJSON(response);

        if (onSuccess != null) {
            if (json != null)
                onSuccess.execute(json);
            else
                onSuccess.execute(null);
        }
    }


    public static void handleArrayResponse(Response response, Callback<JSONArray> onSuccess) {
        JSONArray jsonObject = convertToJSONArray(response);
        if (jsonObject != null && jsonObject.length() > 0) {
            onSuccess.execute(jsonObject);
        } else {
            onSuccess.execute(null);
        }
    }

    /**
     * Convert Retrofit response to JSON Object
     *
     * @param response
     * @return
     */
    public static JSONObject convertToJSON(Response response) {
        TypedInput body = response.getBody();
        JSONObject jsonObject = null;
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(body.in()));
            StringBuilder out = new StringBuilder();
            String newLine = System.getProperty("line.separator");
            String line;
            while ((line = reader.readLine()) != null) {
                out.append(line);
                out.append(newLine);
            }

            // Prints the correct String representation of body.
            System.out.println(out.toString());
            try {
                Object jsonn = new JSONTokener(out.toString()).nextValue();
                if (jsonn instanceof JSONObject) {
                    return new JSONObject(out.toString());
                } else if (jsonn instanceof JSONArray) {
                    //if you have an array, wrap it as json object. -> this is done to support the previous implementations
                    JSONObject jobj = new JSONObject();
                    JSONArray jsonArray = new JSONArray(out.toString());
                    jobj.put(DATA_TYPE_JSON_ARRAY, jsonArray);
                    return jobj;
                } else if (jsonn instanceof String) {
                    final JSONObject responseObj = new JSONObject();
                    responseObj.putOpt(DATA_TYPE_STRING, response);
                    return responseObj;
                } else if (out.toString().equalsIgnoreCase("Success")) {
                    JSONObject jobj = new JSONObject();
                    jobj.put("status", "Success");
                    return jobj;
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return jsonObject;
    }

    public static JSONArray convertToJSONArray(Response response) {
        TypedInput body = response.getBody();
        JSONArray jsonObject = null;
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(body.in()));
            StringBuilder out = new StringBuilder();
            String newLine = System.getProperty("line.separator");
            String line;
            while ((line = reader.readLine()) != null) {
                out.append(line);
                out.append(newLine);
            }

            // Prints the correct String representation of body.
            System.out.println(out.toString());
            try {
                Object jsonn = new JSONTokener(out.toString()).nextValue();
                if (jsonn instanceof JSONArray) {
                    //if you have an array, wrap it as json object. -> this is done to support the previous implementations
                    JSONObject jobj = new JSONObject();
                    JSONArray jsonArray = new JSONArray(out.toString());
//                    jobj.put(DATA_TYPE_JSON_ARRAY, jsonArray);
                    return jsonArray;
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return jsonObject;
    }

    /**
     * Convert JSON Object to byte Array.
     *
     * @param response
     * @return
     */
    private static byte[] convertToBytes(JSONObject response) {
        byte[] raw = new byte[0];
        try {
            raw = response.toString().getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
        }
        return raw;
    }
}
