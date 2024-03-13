package com.ptit.elearningsecurity.service.statistic;

import com.ptit.elearningsecurity.data.dto.HistoryReadingLessonDTO;
import com.ptit.elearningsecurity.data.dto.OverviewLessonDTO;
import com.ptit.elearningsecurity.data.dto.StatisticLessonDTO;
import com.ptit.elearningsecurity.data.dto.StatisticUserLessonDetailDTO;
import com.ptit.elearningsecurity.data.response.StatisticUserLessonDetailResponse;
import com.ptit.elearningsecurity.data.response.StatisticUserLessonResponse;
import com.ptit.elearningsecurity.entity.lecture.CategoryLesson;
import com.ptit.elearningsecurity.entity.lecture.HistoryReadingLesson;
import com.ptit.elearningsecurity.repository.CategoryLessonRepository;
import com.ptit.elearningsecurity.repository.HistoryReadingLessonRepository;
import com.ptit.elearningsecurity.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonStatisticService implements ILessonStatisticService {
    private final LessonRepository lessonRepository;
    private final CategoryLessonRepository categoryLessonRepository;
    private final HistoryReadingLessonRepository historyReadingLessonRepository;

    @Override
    public OverviewLessonDTO getOverviewLesson() {
        OverviewLessonDTO overviewLessonDTO = new OverviewLessonDTO();
        overviewLessonDTO.setTotalLesson(lessonRepository.count())
                .setTotalCategoryLesson(categoryLessonRepository.count())
                .setTotalReading(historyReadingLessonRepository.count());
        return overviewLessonDTO;
    }

    @Override
    public List<HistoryReadingLessonDTO> getHistoryReadingLesson() {
        List<HistoryReadingLesson> historyReadingLessonList = historyReadingLessonRepository.findAllHistoryLesson();
        List<HistoryReadingLessonDTO> results = new ArrayList<>();
        historyReadingLessonList.forEach(historyReadingLesson -> {
                    HistoryReadingLessonDTO historyReadingLessonDTO = new HistoryReadingLessonDTO();
                    historyReadingLessonDTO.setTitle(historyReadingLesson.getLesson().getTitle())
                            .setCategory(historyReadingLesson.getLesson().getCategoryLessons()
                                    .stream()
                                    .map(CategoryLesson::getCategoryName)
                                    .collect(Collectors.toList()))
                            .setUsername(historyReadingLesson.getUser().getLastname() + " " + historyReadingLesson.getUser().getFirstname())
                            .setStudentIdentity(historyReadingLesson.getUser().getStudentIdentity())
                            .setCreatedAt(historyReadingLesson.getCreatedAt());
                    results.add(historyReadingLessonDTO);
                }
        );
        return results;
    }

    @Override
    public List<StatisticLessonDTO> getAllStatisticLessonDTO() {
        return lessonRepository.findAllStatisticLesson();
    }

    @Override
    public List<StatisticUserLessonResponse> getAllStatisticUserLessonOverview() {
        List<StatisticUserLessonResponse> results = new ArrayList<>();
        for(Object[] object : historyReadingLessonRepository.findStatisticUserLesson()) {
            if(!Objects.equals(object[3], "B19DCAT179")) {
                StatisticUserLessonResponse statisticUserLessonResponse = new StatisticUserLessonResponse();
                statisticUserLessonResponse.setUserId((Integer) object[0])
                        .setUsername(object[2] + " " + object[1])
                        .setStudentIdentity((String) object[3])
                        .setTotalLessonLearn((BigInteger) object[4]);
                results.add(statisticUserLessonResponse);
            }
        }
        return results;
    }

    @Override
    public List<StatisticUserLessonDetailResponse> getAllStatisticUserLessonDetail(Integer userId) {
        List<StatisticUserLessonDetailDTO> lessonDetailDTOList =
                historyReadingLessonRepository.findStatisticUserLessonDetail(userId);
        List<StatisticUserLessonDetailResponse> results = new ArrayList<>();
        lessonDetailDTOList.forEach(statisticUserLessonDetailDTO -> {
            StatisticUserLessonDetailResponse statisticUserLessonDetailResponse =
                    new StatisticUserLessonDetailResponse();
            statisticUserLessonDetailResponse.setUsername(statisticUserLessonDetailDTO.getLastname() + " " + statisticUserLessonDetailDTO.getFirstname())
                    .setStudentIdentity(statisticUserLessonDetailDTO.getStudentIdentity())
                    .setTitle(statisticUserLessonDetailDTO.getTitle())
                    .setTotalView(statisticUserLessonDetailDTO.getTotalView());
            results.add(statisticUserLessonDetailResponse);
        });
        return results;
    }
}
