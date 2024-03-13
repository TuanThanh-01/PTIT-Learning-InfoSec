package com.ptit.elearningsecurity.controller;

import com.ptit.elearningsecurity.data.dto.*;
import com.ptit.elearningsecurity.data.response.*;
import com.ptit.elearningsecurity.exception.UserCustomException;
import com.ptit.elearningsecurity.service.statistic.LessonStatisticService;
import com.ptit.elearningsecurity.service.statistic.QuizStatisticService;
import com.ptit.elearningsecurity.service.statistic.StatisticChallengeCTFService;
import com.ptit.elearningsecurity.service.statistic.UserStatisticChallengeCTFService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/statistic")
@RequiredArgsConstructor
public class StatisticController {
    private final UserStatisticChallengeCTFService userStatisticChallengeCTFService;
    private final QuizStatisticService quizStatisticService;
    private final StatisticChallengeCTFService statisticChallengeCTFService;
    private final LessonStatisticService lessonStatisticService;

    @GetMapping("/challenge-ctf-user")
    public ResponseEntity<UserStatisticChallengeCTFResponse> statisticChallengeCTFByUser(@RequestParam("userId") Integer userId)
            throws UserCustomException {
        return ResponseEntity.status(HttpStatus.OK).body(
                userStatisticChallengeCTFService.getStatisticChallengeCTFByUser(userId));
    }

    @GetMapping("/quiz-overview")
    public ResponseEntity<StatisticQuizDTO> getStatisticQuizOverView() {
        return ResponseEntity.status(HttpStatus.OK).body(quizStatisticService.findStatisticQuizOverView());
    }

    @GetMapping("/quiz-score-avg")
    public ResponseEntity<List<QuizScoreDTO>> getQuizScoreAvg() {
        return ResponseEntity.status(HttpStatus.OK).body(quizStatisticService.findQuizScoreAvg());
    }

    @GetMapping("/quiz-time-completion-avg")
    public ResponseEntity<List<QuizTimeCompletionResponse>> getQuizTimeCompletionAvg() {
        return ResponseEntity.status(HttpStatus.OK).body(quizStatisticService.findQuizTimeCompletionAvg());
    }

    @GetMapping("/quiz-correct-wrong")
    public ResponseEntity<List<QuizCorrectWrongDTO>> getQuizCorrectWrong() {
        return ResponseEntity.status(HttpStatus.OK).body(quizStatisticService.findQuizCorrectWrong());
    }

    @GetMapping("/user-quiz")
    public ResponseEntity<List<StatisticUserQuizResponse>> getUserQuiz() {
        return ResponseEntity.status(HttpStatus.OK).body(quizStatisticService.findStatisticUserQuiz());
    }

    @GetMapping("/challenge-ctf-overview")
    public ResponseEntity<StatisticChallengeCTFOverviewDTO> getStatisticChallengeCTFOverview() {
        return ResponseEntity.status(HttpStatus.OK).body(statisticChallengeCTFService.getStatisticChallengeCTFOverview());
    }

    @GetMapping("/tag-total-complete")
    public ResponseEntity<List<TagTotalCompleteChallengeCTFDTO>> getTagTotalCompleteChallengeCTF() {
        return ResponseEntity.status(HttpStatus.OK).body(statisticChallengeCTFService.getTagTotalCompleteChallengeCTF());
    }

    @GetMapping("/tag-total-un-complete")
    public ResponseEntity<List<TagTotalUnCompleteChallengeCTFDTO>> getTagTotalUnCompleteChallengeCTF() {
        return ResponseEntity.status(HttpStatus.OK).body(statisticChallengeCTFService.getTagTotalUnCompleteChallengeCTF());
    }

    @GetMapping("/tag-total-submit")
    public ResponseEntity<List<TagTotalSubmitChallengeCTFDTO>> getTagTotalSubmitChallengeCTF() {
        return ResponseEntity.status(HttpStatus.OK).body(statisticChallengeCTFService.getTagTotalSubmitChallengeCTF());
    }

    @GetMapping("/tag-total-challenge")
    public ResponseEntity<List<TagTotalChallengeCTFDTO>> getTagTotalChallengeCTF() {
        return ResponseEntity.status(HttpStatus.OK).body(statisticChallengeCTFService.getTagTotalChallengeCTF());
    }

    @GetMapping("/user-challenge-ctf")
    public ResponseEntity<List<StatisticUserChallengeCTFDTO>> getUserChallengeCTF() {
        return ResponseEntity.status(HttpStatus.OK).body(statisticChallengeCTFService.getStatisticUserChallengeCTF());
    }

    @GetMapping("/user-challenge-ctf-detail")
    public ResponseEntity<List<UserChallengeCTFDetailDTO>> getUserChallengeCTF(@RequestParam("userId") Integer userId) {
        return ResponseEntity.status(HttpStatus.OK).body(statisticChallengeCTFService.getUserChallengeCTFDetail(userId));
    }

    @GetMapping("/challenge-ctf")
    public ResponseEntity<List<StatisticChallengeCTFDTO>> getStatisticChallengeCTF() {
        return ResponseEntity.status(HttpStatus.OK).body(statisticChallengeCTFService.getStatisticChallengeCTF());
    }

    @GetMapping("/challenge-ctf-detail")
    public ResponseEntity<List<ChallengeCTFDetailResponse>> getStatisticChallengeCTFDetail(@RequestParam("challengeCTFId") Integer challengeCTFId) {
        return ResponseEntity.status(HttpStatus.OK).body(statisticChallengeCTFService.getChallengeCTFDetail(challengeCTFId));
    }

    @GetMapping("/overview-lesson")
    public ResponseEntity<OverviewLessonDTO> getOverViewLesson() {
        return ResponseEntity.status(HttpStatus.OK).body(lessonStatisticService.getOverviewLesson());
    }

    @GetMapping("/history-lesson")
    public ResponseEntity<List<HistoryReadingLessonDTO>> getHistoryLesson() {
        return ResponseEntity.status(HttpStatus.OK).body(lessonStatisticService.getHistoryReadingLesson());
    }

    @GetMapping("/lesson-view")
    public ResponseEntity<List<StatisticLessonDTO>> getStatisticLessonView() {
        return ResponseEntity.status(HttpStatus.OK).body(lessonStatisticService.getAllStatisticLessonDTO());
    }

    @GetMapping("/user-lesson-overview")
    public ResponseEntity<List<StatisticUserLessonResponse>> getAllStatisticUserLessonOverview() {
        return ResponseEntity.status(HttpStatus.OK).body(lessonStatisticService.getAllStatisticUserLessonOverview());
    }

    @GetMapping("/user-lesson-detail")
    public ResponseEntity<List<StatisticUserLessonDetailResponse>> getAllStatisticUserLessonDetail(@RequestParam("userId") Integer userId) {
        return ResponseEntity.status(HttpStatus.OK).body(lessonStatisticService.getAllStatisticUserLessonDetail(userId));
    }
}
