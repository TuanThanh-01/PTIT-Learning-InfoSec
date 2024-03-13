package com.ptit.elearningsecurity.service.score;

import com.ptit.elearningsecurity.common.DataUtils;
import com.ptit.elearningsecurity.data.mapper.QuizMapper;
import com.ptit.elearningsecurity.data.mapper.ScoreMapper;
import com.ptit.elearningsecurity.data.mapper.UserMapper;
import com.ptit.elearningsecurity.data.request.ScoreRequest;
import com.ptit.elearningsecurity.data.response.QuestionResponse;
import com.ptit.elearningsecurity.data.response.ScoreResponse;
import com.ptit.elearningsecurity.entity.User;
import com.ptit.elearningsecurity.entity.quiz.Quiz;
import com.ptit.elearningsecurity.entity.quiz.Score;
import com.ptit.elearningsecurity.exception.QuizCustomException;
import com.ptit.elearningsecurity.exception.ScoreCustomException;
import com.ptit.elearningsecurity.exception.UserCustomException;
import com.ptit.elearningsecurity.repository.QuizRepository;
import com.ptit.elearningsecurity.repository.ScoreRepository;
import com.ptit.elearningsecurity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScoreService implements IScoreService{

    private final ScoreRepository scoreRepository;
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final ScoreMapper scoreMapper;
    private final UserMapper userMapper;
    private final QuizMapper quizMapper;

    @Override
    public List<ScoreResponse> getAllScore() {
        List<Score> scores = scoreRepository.findAll();
        List<ScoreResponse> scoreResponses = new ArrayList<>();
        scores.forEach(score -> {
            ScoreResponse scoreResponse = scoreMapper.toResponse(score);
            scoreResponse.setUserResponse(userMapper.toResponse(score.getUser()));
            scoreResponse.setQuizResponse(quizMapper.toResponse(score.getQuiz()));
            scoreResponses.add(scoreResponse);
        });
        return scoreResponses;
    }

    @Override
    public List<ScoreResponse> getAllScoreByQuiz(int quizId) throws QuizCustomException {
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);
        if(quizOptional.isEmpty()) {
            throw new QuizCustomException("Quiz Not Found", DataUtils.ERROR_QUIZ_NOT_FOUND);
        }
        List<Score> scores = scoreRepository.findAllByQuiz(quizOptional.get());
        List<ScoreResponse> scoreResponses = new ArrayList<>();
        scores.forEach(score -> {
            ScoreResponse scoreResponse = scoreMapper.toResponse(score);
            scoreResponse.setUserResponse(userMapper.toResponse(score.getUser()));
            scoreResponse.setQuizResponse(quizMapper.toResponse(score.getQuiz()));
            scoreResponses.add(scoreResponse);
        });
        return scoreResponses;
    }

    @Override
    public List<ScoreResponse> getAllScoreByUser(int userId) {
        List<Score> scores = scoreRepository.findAllByUser(userId);
        List<ScoreResponse> scoreResponses = new ArrayList<>();
        scores.forEach(score -> {
            ScoreResponse scoreResponse = scoreMapper.toResponse(score);
            scoreResponse.setUserResponse(userMapper.toResponse(score.getUser()));
            scoreResponse.setQuizResponse(quizMapper.toResponse(score.getQuiz()));
            scoreResponses.add(scoreResponse);
        });
        return scoreResponses;
    }

    @Override
    public ScoreResponse getScoreById(int scoreId) throws ScoreCustomException {
        Optional<Score> scoreOptional = scoreRepository.findById(scoreId);
        if(scoreOptional.isEmpty()) {
            throw new ScoreCustomException("Score Not Found", DataUtils.ERROR_SCORE_NOT_FOUND);
        }
        Score score = scoreOptional.get();
        ScoreResponse scoreResponse = scoreMapper.toResponse(score);
        scoreResponse.setUserResponse(userMapper.toResponse(score.getUser()));
        scoreResponse.setQuizResponse(quizMapper.toResponse(score.getQuiz()));
        return scoreResponse;
    }

    @Override
    public ScoreResponse createScore(ScoreRequest scoreRequest) throws QuizCustomException, UserCustomException {
        Optional<Quiz> quizOptional = quizRepository.findByName(scoreRequest.getQuizTitle());
        if(quizOptional.isEmpty()) {
            throw new QuizCustomException("Quiz Not Found", DataUtils.ERROR_QUIZ_NOT_FOUND);
        }
        Optional<User> userOptional = userRepository.findById(scoreRequest.getUserId());
        if(userOptional.isEmpty()) {
            throw new UserCustomException("User Not Found", DataUtils.ERROR_USER_NOT_FOUND);
        }
        Quiz quiz = quizOptional.get();
        User user = userOptional.get();
        Score score =  scoreMapper.toPojo(scoreRequest);
        score.setUser(user);
        score.setQuiz(quiz);
        return scoreMapper.toResponse(scoreRepository.save(score));
    }

    @Override
    public ScoreResponse updateScore(ScoreRequest scoreRequest, int scoreId) throws ScoreCustomException {
        Optional<Score> scoreOptional = scoreRepository.findById(scoreId);
        if(scoreOptional.isEmpty()) {
            throw new ScoreCustomException("Score Not Found", DataUtils.ERROR_SCORE_NOT_FOUND);
        }
        Score score = scoreOptional.get();
        if(Objects.nonNull(scoreRequest.getScore()) && scoreRequest.getScore() >= 0) {
            score.setScore(scoreRequest.getScore());
        }
        score.setUpdatedAt(Instant.now());
        return scoreMapper.toResponse(scoreRepository.save(score));
    }

    @Override
    public void deleteScore(int scoreId) throws ScoreCustomException {
        Optional<Score> scoreOptional = scoreRepository.findById(scoreId);
        if(scoreOptional.isEmpty()) {
            throw new ScoreCustomException("Score Not Found", DataUtils.ERROR_SCORE_NOT_FOUND);
        }
        scoreRepository.delete(scoreOptional.get());
    }
}
