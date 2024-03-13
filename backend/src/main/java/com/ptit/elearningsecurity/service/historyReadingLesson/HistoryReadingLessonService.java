package com.ptit.elearningsecurity.service.historyReadingLesson;

import com.ptit.elearningsecurity.common.DataUtils;
import com.ptit.elearningsecurity.data.mapper.LessonMapper;
import com.ptit.elearningsecurity.data.mapper.UserMapper;
import com.ptit.elearningsecurity.data.request.HistoryReadingLessonRequest;
import com.ptit.elearningsecurity.data.response.HistoryReadingLessonResponse;
import com.ptit.elearningsecurity.data.response.LessonResponse;
import com.ptit.elearningsecurity.entity.User;
import com.ptit.elearningsecurity.entity.lecture.CategoryLesson;
import com.ptit.elearningsecurity.entity.lecture.HistoryReadingLesson;
import com.ptit.elearningsecurity.entity.lecture.Lesson;
import com.ptit.elearningsecurity.exception.LessonCustomException;
import com.ptit.elearningsecurity.exception.UserCustomException;
import com.ptit.elearningsecurity.repository.HistoryReadingLessonRepository;
import com.ptit.elearningsecurity.repository.LessonRepository;
import com.ptit.elearningsecurity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HistoryReadingLessonService implements IHistoryReadingLessonService {
    private final HistoryReadingLessonRepository historyReadingLessonRepository;
    private final UserRepository userRepository;
    private final LessonRepository lessonRepository;
    private final UserMapper userMapper;
    private final LessonMapper lessonMapper;

    @Override
    public List<HistoryReadingLessonResponse> getAllHistoryLesson() {
        List<HistoryReadingLesson> lstHistoryReadingLesson = historyReadingLessonRepository.findAll();
        return lstHistoryReadingLesson.stream()
                .map(this::getHistoryReadingLessonResponse)
                .collect(Collectors.toList());
    }

    private HistoryReadingLessonResponse getHistoryReadingLessonResponse(HistoryReadingLesson historyReadingLesson) {
        HistoryReadingLessonResponse historyReadingLessonResponse = new HistoryReadingLessonResponse();
        historyReadingLessonResponse.setId(historyReadingLesson.getId())
                .setCreatedAt(Instant.now())
                .setLessonResponse(mapImageDataToLessonResponse(historyReadingLesson.getLesson()))
                .setUserResponse(userMapper.toResponse(historyReadingLesson.getUser()));
        return historyReadingLessonResponse;
    }

    private LessonResponse mapImageDataToLessonResponse(Lesson lesson) {
        String coverImage = lesson.getCoverImage();
        LessonResponse lessonResponse = lessonMapper.toResponse(lesson);
        lessonResponse.setCoverImage(coverImage);
        lessonResponse.setLstCategoryLessonName(
                lesson.getCategoryLessons()
                        .stream()
                        .map(CategoryLesson::getCategoryName)
                        .collect(Collectors.toList())
        );
        return lessonResponse;
    }

    @Override
    public List<HistoryReadingLessonResponse> getAllHistoryLessonByUser(Integer userId) throws UserCustomException {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new UserCustomException("User not found", DataUtils.ERROR_USER_NOT_FOUND);
        }
        List<HistoryReadingLesson> lstHistoryReadingLesson =
                historyReadingLessonRepository.findAllByUser(userOptional.get());
        return lstHistoryReadingLesson.stream()
                .map(this::getHistoryReadingLessonResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<HistoryReadingLessonResponse> getAllHistoryLessonByLesson(Integer lessonId) throws LessonCustomException {
        Optional<Lesson> lessonOptional = lessonRepository.findById(lessonId);
        if (lessonOptional.isEmpty()) {
            throw new LessonCustomException("Lesson not found", DataUtils.ERROR_LESSON_NOT_FOUND);
        }
        List<HistoryReadingLesson> lstHistoryReadingLesson =
                historyReadingLessonRepository.findAllByLesson(lessonOptional.get());
        return lstHistoryReadingLesson.stream()
                .map(this::getHistoryReadingLessonResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<HistoryReadingLessonResponse> getAllHistoryLessonRecentByUser(Integer userId) {
        List<HistoryReadingLesson> lstHistoryReadingLesson =
                historyReadingLessonRepository.findHistoryReadingLessonRecentByUser(userId);
        return lstHistoryReadingLesson.stream()
                .map(this::getHistoryReadingLessonResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void createHistoryLesson(HistoryReadingLessonRequest historyReadingLessonRequest) throws LessonCustomException, UserCustomException {
        Optional<Lesson> lessonOptional = lessonRepository.findById(historyReadingLessonRequest.getLessonId());
        if (lessonOptional.isEmpty()) {
            throw new LessonCustomException("Lesson not found", DataUtils.ERROR_LESSON_NOT_FOUND);
        }
        Optional<User> userOptional = userRepository.findById(historyReadingLessonRequest.getUserId());
        if (userOptional.isEmpty()) {
            throw new UserCustomException("User not found", DataUtils.ERROR_USER_NOT_FOUND);
        }
        HistoryReadingLesson historyReadingLesson = new HistoryReadingLesson();
        historyReadingLesson.setUser(userOptional.get())
                .setLesson(lessonOptional.get())
                .setCreatedAt(Instant.now());
        historyReadingLessonRepository.save(historyReadingLesson);
    }
}
