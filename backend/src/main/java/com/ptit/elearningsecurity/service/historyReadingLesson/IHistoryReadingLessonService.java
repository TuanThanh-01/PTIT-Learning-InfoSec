package com.ptit.elearningsecurity.service.historyReadingLesson;

import com.ptit.elearningsecurity.data.request.HistoryReadingLessonRequest;
import com.ptit.elearningsecurity.data.response.HistoryReadingLessonResponse;
import com.ptit.elearningsecurity.entity.lecture.HistoryReadingLesson;
import com.ptit.elearningsecurity.exception.LessonCustomException;
import com.ptit.elearningsecurity.exception.UserCustomException;

import java.util.List;

public interface IHistoryReadingLessonService {

    List<HistoryReadingLessonResponse> getAllHistoryLesson();
    List<HistoryReadingLessonResponse> getAllHistoryLessonByUser(Integer userId) throws UserCustomException;
    List<HistoryReadingLessonResponse> getAllHistoryLessonByLesson(Integer lessonId) throws LessonCustomException;
    List<HistoryReadingLessonResponse> getAllHistoryLessonRecentByUser(Integer userId);
    void createHistoryLesson(HistoryReadingLessonRequest historyReadingLessonRequest) throws LessonCustomException, UserCustomException;
}
