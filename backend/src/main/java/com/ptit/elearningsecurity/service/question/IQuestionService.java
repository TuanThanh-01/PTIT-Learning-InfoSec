package com.ptit.elearningsecurity.service.question;

import com.ptit.elearningsecurity.data.request.QuestionRequest;
import com.ptit.elearningsecurity.data.response.QuestionResponse;
import com.ptit.elearningsecurity.exception.QuestionCustomException;
import com.ptit.elearningsecurity.exception.QuizCustomException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IQuestionService {
    List<QuestionResponse> getAllQuestion();
    List<QuestionResponse> getAllQuestionByQuizTitle(String quizTitle) throws QuizCustomException;
    QuestionResponse getQuestionById(int questionId) throws QuestionCustomException;
    QuestionResponse createQuestion(QuestionRequest questionRequest) throws QuizCustomException;
    QuestionResponse updateQuestion(QuestionRequest questionRequest, int questionId) throws QuestionCustomException, QuizCustomException;
    void deleteQuestion(int questionId) throws QuestionCustomException;
    List<QuestionResponse> saveAllQuestionByExcel(MultipartFile file, String quizTitle) throws QuizCustomException, IOException;
}
