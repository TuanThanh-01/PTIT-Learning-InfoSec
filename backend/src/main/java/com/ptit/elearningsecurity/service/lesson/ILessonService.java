package com.ptit.elearningsecurity.service.lesson;

import com.ptit.elearningsecurity.data.request.LessonRequest;
import com.ptit.elearningsecurity.data.response.LessonResponse;
import com.ptit.elearningsecurity.exception.CategoryLessonCustomException;
import com.ptit.elearningsecurity.exception.ImageDataCustomException;
import com.ptit.elearningsecurity.exception.LessonCustomException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ILessonService {
    List<LessonResponse> getAllLesson();
    List<LessonResponse> findLessonRandom(Integer lessonId);
    LessonResponse findById(int lessonID) throws LessonCustomException;
    LessonResponse findLessonByTitle(String title) throws LessonCustomException;
    LessonResponse createLesson(LessonRequest lessonRequest) throws CategoryLessonCustomException, IOException, LessonCustomException;
    LessonResponse updateLesson(LessonRequest lessonRequest, int lessonID) throws CategoryLessonCustomException, IOException, ImageDataCustomException, LessonCustomException;
    void deleteLesson(int lessonID) throws LessonCustomException, IOException;
    String uploadImageLesson(MultipartFile file) throws IOException;
}
