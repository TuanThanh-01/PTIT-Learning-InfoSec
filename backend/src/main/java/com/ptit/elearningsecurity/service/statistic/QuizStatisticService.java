package com.ptit.elearningsecurity.service.statistic;

import com.ptit.elearningsecurity.data.dto.*;
import com.ptit.elearningsecurity.data.response.QuizTimeCompletionResponse;
import com.ptit.elearningsecurity.data.response.StatisticUserQuizResponse;
import com.ptit.elearningsecurity.repository.QuestionRepository;
import com.ptit.elearningsecurity.repository.QuizRepository;
import com.ptit.elearningsecurity.repository.ScoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizStatisticService implements IQuizStatisticService{
    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;
    private final ScoreRepository scoreRepository;

    @Override
    public StatisticQuizDTO findStatisticQuizOverView() {
        return new StatisticQuizDTO()
                .setTotalQuiz(quizRepository.count())
                .setTotalQuestion(questionRepository.count())
                .setTotalSolve(scoreRepository.count());
    }

    @Override
    public List<QuizScoreDTO> findQuizScoreAvg() {
        return scoreRepository.findQuizAndAverageScore();
    }

    @Override
    public List<QuizTimeCompletionResponse> findQuizTimeCompletionAvg() {
        List<QuizTimeCompletionDTO> quizTimeCompletionDTOList =
                scoreRepository.findQuizAndAverageTimeCompletion();
        List<QuizTimeCompletionResponse> result = new ArrayList<>();
        quizTimeCompletionDTOList.forEach(quizTimeCompletionDTO -> {
            QuizTimeCompletionResponse quizTimeCompletionResponse = new QuizTimeCompletionResponse();
            quizTimeCompletionResponse.setQuizTitle(quizTimeCompletionDTO.getQuizTitle());
            quizTimeCompletionResponse.setTimeAvg(convertToSecond(quizTimeCompletionDTO.getTimeAvg()));
            result.add(quizTimeCompletionResponse);
        });
        return result;
    }

    private Integer convertToSecond(String time) {
        String [] parts = time.split(":");
        return Integer.parseInt(parts[0]) * 60 + Integer.parseInt(parts[1]);
    }

    @Override
    public List<QuizCorrectWrongDTO> findQuizCorrectWrong() {
        List<QuizCorrectWrongDTO> quizCorrectWrongDTOList = scoreRepository.findQuizAndCorrectWrongAnswer();
        List<QuizCorrectWrongDTO> result = new ArrayList<>();
        quizCorrectWrongDTOList.forEach(quizCorrectWrongDTO -> {
            QuizCorrectWrongDTO quizCorrectWrongDTOTemp = new QuizCorrectWrongDTO();
            quizCorrectWrongDTOTemp.setQuizTitle(quizCorrectWrongDTO.getQuizTitle());
            long total = quizCorrectWrongDTO.getTotalCorrect() + quizCorrectWrongDTO.getTotalWrong();
            long percentageCorrect = quizCorrectWrongDTO.getTotalCorrect() * 100 / total;
            long percentageWrong = 100 - percentageCorrect;
            quizCorrectWrongDTOTemp.setTotalCorrect(percentageCorrect);
            quizCorrectWrongDTOTemp.setTotalWrong(percentageWrong);
            result.add(quizCorrectWrongDTOTemp);
        });
        return result;
    }

    @Override
    public List<StatisticUserQuizResponse> findStatisticUserQuiz() {
        List<StatisticUserQuizDTO> statisticUserQuizDTOList = scoreRepository.findAllStatisticUserQuiz();
        List<StatisticUserQuizResponse> statisticUserQuizResponseList = new ArrayList<>();
        statisticUserQuizDTOList.forEach(statisticUserQuizDTO -> {
            StatisticUserQuizResponse statisticUserQuizResponse = new StatisticUserQuizResponse();
            statisticUserQuizResponse.setUsername(statisticUserQuizDTO.getLastname() + " " + statisticUserQuizDTO.getFirstname())
                    .setStudentIdentity(statisticUserQuizDTO.getStudentIdentity())
                    .setQuizTitle(statisticUserQuizDTO.getQuizTitle())
                    .setAvgScore(statisticUserQuizDTO.getAvgScore())
                    .setAvgTotalCorrectAnswer(statisticUserQuizDTO.getAvgTotalCorrectAnswer())
                    .setAvgTotalWrongAnswer(statisticUserQuizDTO.getAvgTotalWrongAnswer())
                    .setTotalTry(statisticUserQuizDTO.getTotalTry())
                    .setTimeAvg(statisticUserQuizDTO.getTimeAvg().substring(0, 5));
            statisticUserQuizResponseList.add(statisticUserQuizResponse);
        });
        return statisticUserQuizResponseList;
    }
}
