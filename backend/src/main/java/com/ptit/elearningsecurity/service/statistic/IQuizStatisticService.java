package com.ptit.elearningsecurity.service.statistic;

import com.ptit.elearningsecurity.data.dto.*;
import com.ptit.elearningsecurity.data.response.QuizTimeCompletionResponse;
import com.ptit.elearningsecurity.data.response.StatisticUserQuizResponse;

import java.util.List;

public interface IQuizStatisticService {
    StatisticQuizDTO findStatisticQuizOverView();
    List<QuizScoreDTO> findQuizScoreAvg();
    List<QuizTimeCompletionResponse> findQuizTimeCompletionAvg();
    List<QuizCorrectWrongDTO> findQuizCorrectWrong();
    List<StatisticUserQuizResponse> findStatisticUserQuiz();
}
