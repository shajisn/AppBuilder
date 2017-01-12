package com.attinad.applicationconfigurator.utils;

import android.util.Log;

import com.attinad.applicationconfigurator.BuildConfig;


/**
 * @author Sánta Péter <peter.santa@accedo.tv>, Pásztor Tibor Viktor <pasztor.tibor.viktor@gmail.com>
 */
public abstract class L {

    // version 1.3.0

    private static final String LOG_FORMAT = "%1$s\n%2$s";
    private static String LOG_TAG = "Accedo";
    private static LogListener logListener;

    private L() {
    }

    public static void setLogListener(LogListener logListener) {
        L.logListener = logListener;
    }

    public static void setDefaultTag(String tag) {
        LOG_TAG = tag;
    }

    // Default tags
    //-----------------------------------------------------------------
    public static void d(String message, Object... args) {
        log(null, Log.DEBUG, null, message, args);
    }

    public static void i(String message, Object... args) {
        log(null, Log.INFO, null, message, args);
    }

    public static void w(String message, Object... args) {
        log(null, Log.WARN, null, message, args);
    }

    public static void w(Throwable ex) {
        log(null, Log.WARN, ex, null);
    }

    public static void e(String message, Object... args) {
        log(null, Log.ERROR, null, message, args);
    }

    public static void e(Throwable ex) {
        log(null, Log.ERROR, ex, null);
    }

    public static void e(Throwable ex, String message, Object... args) {
        log(null, Log.ERROR, ex, message, args);
    }

    // Custom tags
    //-----------------------------------------------------------------
    public static void d(String TAG, String message, Object... args) {
        log(TAG, Log.DEBUG, null, message, args);
    }

    public static void i(String TAG, String message, Object... args) {
        log(TAG, Log.INFO, null, message, args);
    }

    public static void w(String TAG, String message, Object... args) {
        log(TAG, Log.WARN, null, message, args);
    }

    public static void w(String TAG, Throwable ex) {
        log(TAG, Log.WARN, ex, null);
    }

    public static void e(String TAG, String message, Object... args) {
        log(TAG, Log.ERROR, null, message, args);
    }

    public static void e(String TAG, Throwable ex) {
        log(TAG, Log.ERROR, ex, null);
    }

    public static void e(String TAG, Throwable ex, String message, Object... args) {
        log(TAG, Log.ERROR, ex, message, args);
    }

    // General call
    //-----------------------------------------------------------------
    private static void log(String TAG, int priority, Throwable ex, String message, Object... args) {
        if (BuildConfig.DEBUG) {
            if (TAG == null) {
                TAG = LOG_TAG;
            }

            if (args != null && args.length > 0) {
                message = String.format(message, args);
            }

            String log;
            if (ex == null) {
                log = message;
            } else {
                String logMessage = message == null ? ex.getMessage() : message;
                String logBody = Log.getStackTraceString(ex);
                log = String.format(LOG_FORMAT, logMessage, logBody);
            }
            Log.println(priority, TAG, log);
            if (logListener != null)
                logListener.onLog(log);
        }
    }

    public static interface LogListener {
        public void onLog(String message);
    }
}
