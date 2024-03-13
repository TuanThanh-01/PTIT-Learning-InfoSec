package com.ptit.elearningsecurity.common;

public class EmailUtils {

    public static String getVerificationUrl(String host, String token) {
        return host + "/api/v1/auth/confirm-account?token=" + token;
    }
}
