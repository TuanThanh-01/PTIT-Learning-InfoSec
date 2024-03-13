package com.ptit.elearningsecurity.common;

import java.util.Base64;

public class DataUtils {

    public static final String ERROR_LESSON_NOT_FOUND = "LESSON_NOT_FOUND";
    public static final String ERROR_CATEGORY_LESSON_NOT_FOUND = "CATEGORY_LESSON_NOT_FOUND";
    public static final String ERROR_IMAGE_DATA_NOT_FOUND = "ERROR_IMAGE_DATA_NOT_FOUND";
    public static final String ERROR_LESSON_EXISTS = "ERROR_LESSON_EXISTS";
    public static final String ERROR_TOPIC_NOT_FOUND = "ERROR_TOPIC_NOT_FOUND";
    public static final String ERROR_USER_NOT_FOUND = "ERROR_USER_NOT_FOUND";
    public static final String ERROR_USER_EXIST = "ERROR_USER_EXIST";
    public static final String ERROR_POST_NOT_FOUND = "ERROR_POST_NOT_FOUND";
    public static final String ERROR_COMMENT_NOT_FOUND = "ERROR_COMMENT_NOT_FOUND";
    public static final String ERROR_QUIZ_NOT_FOUND = "ERROR_QUIZ_NOT_FOUND";
    public static final String ERROR_QUESTION_NOT_FOUND = "ERROR_QUESTION_NOT_FOUND";
    public static final String ERROR_SCORE_NOT_FOUND = "ERROR_SCORE_NOT_FOUND";
    public static final String ERROR_CHALLENGE_CTF_NOT_FOUND = "ERROR_CHALLENGE_CTF_NOT_FOUND";
    public static final String ERROR_LAB_NOT_FOUND = "ERROR_LAB_NOT_FOUND";

    public static String encodeBase64(String message) {
        return Base64.getEncoder().encodeToString(message.getBytes());
    }

}
