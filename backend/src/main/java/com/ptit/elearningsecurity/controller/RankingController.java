package com.ptit.elearningsecurity.controller;

import com.ptit.elearningsecurity.data.dto.RankingScoreDTO;
import com.ptit.elearningsecurity.data.dto.RankingUserDTO;
import com.ptit.elearningsecurity.service.ranking.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ranking")
public class RankingController {
    private final RankingService rankingService;

    @GetMapping("/get-top-5-user")
    public ResponseEntity<List<RankingScoreDTO>> getTop5User() {
        return ResponseEntity.status(HttpStatus.OK).body(rankingService.findTop5User());
    }

    @GetMapping("/list-user")
    public ResponseEntity<List<RankingUserDTO>> getRankingUser() {
        return ResponseEntity.status(HttpStatus.OK).body(rankingService.findUserRanking());
    }
}
