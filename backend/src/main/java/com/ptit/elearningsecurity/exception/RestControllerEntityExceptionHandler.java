package com.ptit.elearningsecurity.exception;

import com.ptit.elearningsecurity.entity.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestControllerEntityExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(CategoryLessonCustomException.class)
    public ResponseEntity<ErrorResponse> handleCategoryLessonException(CategoryLessonCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(LessonCustomException.class)
    public ResponseEntity<ErrorResponse> handleLessonException(LessonCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ImageDataCustomException.class)
    public ResponseEntity<ErrorResponse> handleImageDataException(ImageDataCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TopicCustomException.class)
    public ResponseEntity<ErrorResponse> handleTopicException(TopicCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserCustomException.class)
    public ResponseEntity<ErrorResponse> handleUserException(UserCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PostCustomException.class)
    public ResponseEntity<ErrorResponse> handlePostException(PostCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CommentCustomException.class)
    public ResponseEntity<ErrorResponse> handleCommentException(CommentCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(QuizCustomException.class)
    public ResponseEntity<ErrorResponse> handleQuizException(QuizCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(QuestionCustomException.class)
    public ResponseEntity<ErrorResponse> handleQuestionException(QuestionCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ScoreCustomException.class)
    public ResponseEntity<ErrorResponse> handleScoreException(ScoreCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ProgessCustomException.class)
    public ResponseEntity<ErrorResponse> handleProgressException(ProgessCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TokenCustomException.class)
    public ResponseEntity<ErrorResponse> handleTokenException(TokenCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConfirmationTokenCustomException.class)
    public ResponseEntity<ErrorResponse> handleConfirmationTokenException(ConfirmationTokenCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CategoryChallengeCustomException.class)
    public ResponseEntity<ErrorResponse> handleCategoryChallengeException(CategoryChallengeCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ChallengeCTFCustomException.class)
    public ResponseEntity<ErrorResponse> handleChallengeCTFException(ChallengeCTFCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HistorySubmitChallengeCTFCustomException.class)
    public ResponseEntity<ErrorResponse> handleHistorySubmitChallengeCTFExceptionException(HistorySubmitChallengeCTFCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(JwtTokenCustomException.class)
    public ResponseEntity<ErrorResponse> handleJwtTokenCustomException(JwtTokenCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(LabCustomException.class)
    public ResponseEntity<ErrorResponse> handleLabCustomException(LabCustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse()
                .setErrorCode(exception.getErrorCode())
                .setErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
