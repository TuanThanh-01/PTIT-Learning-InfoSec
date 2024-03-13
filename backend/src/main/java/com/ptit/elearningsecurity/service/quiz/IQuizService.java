package com.ptit.elearningsecurity.service.quiz;

import com.ptit.elearningsecurity.data.request.QuizRequest;
import com.ptit.elearningsecurity.data.response.QuizPageableResponse;
import com.ptit.elearningsecurity.data.response.QuizResponse;
import com.ptit.elearningsecurity.exception.QuizCustomException;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;


public interface IQuizService {
    List<String> findAllQuizName();
    List<QuizResponse> findAllQuiz();
    QuizResponse findQuizById(int id) throws QuizCustomException;
    QuizResponse findQuizByName(String name) throws QuizCustomException;
    QuizResponse createQuiz(QuizRequest quizRequest) throws IOException;
    QuizResponse updateQuiz(QuizRequest quizRequest, int quizId) throws QuizCustomException, IOException;
    void deleteQuiz(int id) throws QuizCustomException, IOException;
}
