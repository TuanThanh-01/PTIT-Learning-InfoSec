package com.ptit.elearningsecurity.service.score;

import com.ptit.elearningsecurity.data.request.ScoreRequest;
import com.ptit.elearningsecurity.data.response.ScoreResponse;
import com.ptit.elearningsecurity.exception.QuizCustomException;
import com.ptit.elearningsecurity.exception.ScoreCustomException;
import com.ptit.elearningsecurity.exception.UserCustomException;

import java.util.List;

public interface IScoreService {
    List<ScoreResponse> getAllScore();
    List<ScoreResponse> getAllScoreByQuiz(int quizId) throws QuizCustomException;
    List<ScoreResponse> getAllScoreByUser(int userId);
    ScoreResponse getScoreById(int scoreId) throws ScoreCustomException;
    ScoreResponse createScore(ScoreRequest scoreRequest) throws QuizCustomException, UserCustomException;
    ScoreResponse updateScore(ScoreRequest scoreRequest, int scoreId) throws ScoreCustomException;
    void deleteScore(int scoreId) throws ScoreCustomException;
}
