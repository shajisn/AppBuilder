package com.attinad.applicationconfigurator.utils;

import android.app.Activity;
import android.content.Context;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

/**
 * @author Pásztor Tibor Viktor <tibor.pasztor@accedo.tv>
 */
public class ObjectToFile {

    /**
     * Serializes an object into a file, stored in the application's private
     * file storage.
     *
     * @param context  Needed for opening the application's private file storage.
     * @param object   The object to serialize.
     * @param filename The filename to write into.
     */
    public static boolean write(Context context, Object object, String filename) {
        if (object == null)
            return false;

        boolean success = false;
        ObjectOutputStream oos = null;
        FileOutputStream fos = null;

        try {
            fos = context.getApplicationContext().openFileOutput(filename, Activity.MODE_PRIVATE);
            oos = new ObjectOutputStream(fos);
            oos.writeObject(object);
            fos.getFD().sync();
            success = true;

        } catch (Exception e) {
            L.e(e);
            delete(context, filename);
        } finally {
            if (oos != null) {
                try {
                    oos.close();
                } catch (IOException e) {
                }
            }

            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                }
            }
        }

        return success;
    }

    /**
     * Deserializes and returns an object from a given file, stored in the
     * application's private file storage.
     *
     * @param context  Needed for opening the application's private file storage.
     * @param filename The filename to read from.
     * @return The deserialized object, or null if unsuccessful.
     */
    public static Object read(Context context, String filename) {
        ObjectInputStream ois = null;
        FileInputStream fis = null;
        Object result = null;

        try {
            fis = context.getApplicationContext().openFileInput(filename);
            ois = new ObjectInputStream(fis);
            result = ois.readObject();
        } catch (FileNotFoundException e) {
            L.i("ObjectToFile: File not found: " + filename);
        } catch (Exception e) {
            L.e(e);
            delete(context, filename);
        } finally {
            if (ois != null) {
                try {
                    ois.close();
                } catch (IOException e) {
                }
            }

            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                }
            }
        }

        return result;
    }

    /**
     * Deletes a file, stored in the application's private file storage, and
     * returns if the deletion was successful or no.
     *
     * @param context  Needed for opening the application's private file storage.
     * @param filename The filename to delete.
     * @return Boolean telling if the deletion was successful or no.
     */
    public static boolean delete(Context context, String filename) {
        return context.getApplicationContext().deleteFile(filename);
    }

    /**
     * Checks if a file already exists or no.
     *
     * @param context  Needed for opening the application's private file storage.
     * @param filename The filename to check.
     * @return boolean telling if the file already exists or no.
     */
    public static boolean exists(Context context, String filename) {
        try {
            context.getApplicationContext().openFileInput(filename).close();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public static String[] listFiles(Context context) {
        return context.getApplicationContext().getFilesDir().list();
    }
}