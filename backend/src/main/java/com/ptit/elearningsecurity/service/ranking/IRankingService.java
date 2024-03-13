package com.ptit.elearningsecurity.service.ranking;

import com.ptit.elearningsecurity.data.dto.RankingScoreDTO;
import com.ptit.elearningsecurity.data.dto.RankingUserDTO;

import java.util.List;

public interface IRankingService {
    List<RankingScoreDTO> findTop5User();
    List<RankingUserDTO> findUserRanking();
}
