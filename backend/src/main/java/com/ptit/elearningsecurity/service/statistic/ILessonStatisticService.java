package com.ptit.elearningsecurity.service.statistic;

import com.ptit.elearningsecurity.data.dto.HistoryReadingLessonDTO;
import com.ptit.elearningsecurity.data.dto.OverviewLessonDTO;
import com.ptit.elearningsecurity.data.dto.StatisticLessonDTO;
import com.ptit.elearningsecurity.data.response.StatisticUserLessonDetailResponse;
import com.ptit.elearningsecurity.data.response.StatisticUserLessonResponse;

import java.util.List;

public interface ILessonStatisticService {
    OverviewLessonDTO getOverviewLesson();
    List<HistoryReadingLessonDTO> getHistoryReadingLesson();
    List<StatisticLessonDTO> getAllStatisticLessonDTO();
    List<StatisticUserLessonResponse> getAllStatisticUserLessonOverview();
    List<StatisticUserLessonDetailResponse> getAllStatisticUserLessonDetail(Integer userId);
}
