package com.ptit.elearningsecurity.controller;

import com.ptit.elearningsecurity.data.request.ScoreRequest;
import com.ptit.elearningsecurity.data.response.ScoreResponse;
import com.ptit.elearningsecurity.exception.QuizCustomException;
import com.ptit.elearningsecurity.exception.ScoreCustomException;
import com.ptit.elearningsecurity.exception.UserCustomException;
import com.ptit.elearningsecurity.service.score.ScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/score")
public class QuizScoreController {

    private final ScoreService scoreService;

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<ScoreResponse>> getAllScore() {
        return ResponseEntity.status(HttpStatus.OK).body(scoreService.getAllScore());
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/get-all-score-by-quiz/{quizId}")
    public ResponseEntity<List<ScoreResponse>> getAllScoreByQuiz(@PathVariable("quizId") int quizId) throws QuizCustomException {
        return ResponseEntity.status(HttpStatus.OK).body(scoreService.getAllScoreByQuiz(quizId));
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/get-all-score-by-user/{userId}")
    public ResponseEntity<List<ScoreResponse>> getAllScoreByUser(@PathVariable("userId") int userId) {
        return ResponseEntity.status(HttpStatus.OK).body(scoreService.getAllScoreByUser(userId));
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<ScoreResponse> getScoreById(@PathVariable("id") int scoreId) throws ScoreCustomException {
        return ResponseEntity.status(HttpStatus.OK).body(scoreService.getScoreById(scoreId));
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<ScoreResponse> createScore(@RequestBody ScoreRequest scoreRequest) throws QuizCustomException, UserCustomException {
        return ResponseEntity.status(HttpStatus.OK).body(scoreService.createScore(scoreRequest));
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<ScoreResponse> updateScore(@RequestBody ScoreRequest scoreRequest, @PathVariable("id") int scoreId) throws ScoreCustomException {
        return ResponseEntity.status(HttpStatus.OK).body(scoreService.updateScore(scoreRequest, scoreId));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteScore(@PathVariable("id") int scoreId) throws ScoreCustomException {
        scoreService.deleteScore(scoreId);
        return ResponseEntity.status(HttpStatus.OK).body("Delete Score Successfully");
    }
}
