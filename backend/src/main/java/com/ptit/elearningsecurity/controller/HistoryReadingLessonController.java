package com.ptit.elearningsecurity.controller;

import com.ptit.elearningsecurity.data.request.HistoryReadingLessonRequest;
import com.ptit.elearningsecurity.data.response.HistoryReadingLessonResponse;
import com.ptit.elearningsecurity.exception.LessonCustomException;
import com.ptit.elearningsecurity.exception.UserCustomException;
import com.ptit.elearningsecurity.service.historyReadingLesson.HistoryReadingLessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/history-reading-lesson")
public class HistoryReadingLessonController {
    private final HistoryReadingLessonService historyReadingLessonService;

    @GetMapping("/all")
    public ResponseEntity<List<HistoryReadingLessonResponse>> getAllHistoryReadingLesson() {
        return ResponseEntity.status(HttpStatus.OK).body(historyReadingLessonService.getAllHistoryLesson());
    }

    @GetMapping("/all-by-user")
    public ResponseEntity<List<HistoryReadingLessonResponse>> getAllHistoryReadingLessonByUser(@RequestParam("userId") Integer userId) throws UserCustomException {
        return ResponseEntity.status(HttpStatus.OK).body(historyReadingLessonService.getAllHistoryLessonByUser(userId));
    }

    @GetMapping("/all-by-lesson")
    public ResponseEntity<List<HistoryReadingLessonResponse>> getAllHistoryReadingLessonByLesson(@RequestParam("lessonId") Integer lessonId) throws LessonCustomException {
        return ResponseEntity.status(HttpStatus.OK).body(historyReadingLessonService.getAllHistoryLessonByLesson(lessonId));
    }

    @GetMapping("/recent-lesson-by-user")
    public ResponseEntity<List<HistoryReadingLessonResponse>> getAllHistoryReadingLessonRecentByUser(@RequestParam("userId") Integer userId) {
        return ResponseEntity.status(HttpStatus.OK).body(historyReadingLessonService.getAllHistoryLessonRecentByUser(userId));
    }

    @PostMapping("/create")
    public ResponseEntity<String> createHistoryReadingLesson(@RequestBody HistoryReadingLessonRequest historyReadingLessonRequest) throws LessonCustomException, UserCustomException {
        historyReadingLessonService.createHistoryLesson(historyReadingLessonRequest);
        return ResponseEntity.status(HttpStatus.OK).body("Create Success");
    }
}
