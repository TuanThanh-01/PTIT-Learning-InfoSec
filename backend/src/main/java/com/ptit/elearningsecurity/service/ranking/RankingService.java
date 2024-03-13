package com.ptit.elearningsecurity.service.ranking;

import com.ptit.elearningsecurity.data.dto.RankingScoreDTO;
import com.ptit.elearningsecurity.data.dto.RankingUserDTO;
import com.ptit.elearningsecurity.entity.User;
import com.ptit.elearningsecurity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RankingService implements IRankingService{

    private final UserRepository userRepository;

    @Override
    public List<RankingScoreDTO> findTop5User() {
        List<User> users = userRepository.findTop5ByOrderByScoredChallengeCTFDesc();
        List<RankingScoreDTO> results = new ArrayList<>();
        for(User user : users) {
            RankingScoreDTO rankingScoreDTO = new RankingScoreDTO();
            rankingScoreDTO.setStudentIdentity(user.getStudentIdentity())
                    .setScore(user.getScoredChallengeCTF());
            results.add(rankingScoreDTO);
        }
        return results;
    }

    @Override
    public List<RankingUserDTO> findUserRanking() {
        List<RankingUserDTO> results = new ArrayList<>();
        for (Object[] object : userRepository.findRankingUserChallengeCTF()) {
            RankingUserDTO rankingUserDTO = new RankingUserDTO();
            rankingUserDTO.setStudentIdentity((String) object[0]);
            rankingUserDTO.setScore((Integer) object[1]);
            rankingUserDTO.setUsername(object[3] + " " + object[2]);
            rankingUserDTO.setTotalTry((BigInteger) object[4]);
            rankingUserDTO.setTotalCorrect((BigDecimal) object[5]);
            rankingUserDTO.setTotalSubmit((BigInteger) object[6]);
            results.add(rankingUserDTO);
        }
        return results;
    }
}
