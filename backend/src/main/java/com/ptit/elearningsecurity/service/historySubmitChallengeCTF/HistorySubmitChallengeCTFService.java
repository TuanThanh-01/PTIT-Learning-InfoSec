package com.ptit.elearningsecurity.service.historySubmitChallengeCTF;

import com.ptit.elearningsecurity.common.DataUtils;
import com.ptit.elearningsecurity.data.mapper.HistorySubmitChallengeCTFMapper;
import com.ptit.elearningsecurity.data.request.HistorySubmitChallengeCTFRequest;
import com.ptit.elearningsecurity.data.response.HistorySubmitChallengeCTFPageableResponse;
import com.ptit.elearningsecurity.data.response.HistorySubmitChallengeCTFResponse;
import com.ptit.elearningsecurity.entity.User;
import com.ptit.elearningsecurity.entity.labCTF.ChallengeCTF;
import com.ptit.elearningsecurity.entity.labCTF.ChallengeCTFResult;
import com.ptit.elearningsecurity.entity.labCTF.HistorySubmitChallengeCTF;
import com.ptit.elearningsecurity.exception.ChallengeCTFCustomException;
import com.ptit.elearningsecurity.exception.UserCustomException;
import com.ptit.elearningsecurity.repository.ChallengeCTFRepository;
import com.ptit.elearningsecurity.repository.ChallengeCTFResultRepository;
import com.ptit.elearningsecurity.repository.HistorySubmitChallengeRepository;
import com.ptit.elearningsecurity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HistorySubmitChallengeCTFService implements IHistorySubmitChallengeCTFService {

    private final HistorySubmitChallengeRepository historySubmitChallengeRepository;
    private final ChallengeCTFResultRepository challengeCTFResultRepository;
    private final HistorySubmitChallengeCTFMapper historySubmitChallengeCTFMapper;
    private final UserRepository userRepository;
    private final ChallengeCTFRepository challengeCTFRepository;

    @Override
    public List<HistorySubmitChallengeCTFResponse> getAllHistorySubmit() {
        List<HistorySubmitChallengeCTF> historySubmitChallengeCTFList = historySubmitChallengeRepository.findAllByOrderByCreatedAtDesc();
        List<HistorySubmitChallengeCTFResponse> historySubmitChallengeCTFResponses = new ArrayList<>();
        historySubmitChallengeCTFList.forEach(historySubmitChallengeCTF -> {
            HistorySubmitChallengeCTFResponse response = getHistorySubmitChallengeCTFResponse(historySubmitChallengeCTF);
            historySubmitChallengeCTFResponses.add(response);
        });
        return historySubmitChallengeCTFResponses;
    }

    private HistorySubmitChallengeCTFResponse getHistorySubmitChallengeCTFResponse(HistorySubmitChallengeCTF historySubmitChallengeCTF) {
        HistorySubmitChallengeCTFResponse response = historySubmitChallengeCTFMapper.toResponse(historySubmitChallengeCTF);
        response.setChallengeCTFTitle(historySubmitChallengeCTF.getChallengeCTF().getTitle());
        response.setUserIdentity(historySubmitChallengeCTF.getUser().getStudentIdentity());
        return response;
    }

    @Override
    public HistorySubmitChallengeCTFResponse createHistorySubmit(HistorySubmitChallengeCTFRequest historySubmitChallengeCTFRequest) throws UserCustomException, ChallengeCTFCustomException {
        Optional<User> userOptional = userRepository.findById(historySubmitChallengeCTFRequest.getUserId());
        if (userOptional.isEmpty()) {
            throw new UserCustomException("User Not Found", DataUtils.ERROR_USER_NOT_FOUND);
        }
        Optional<ChallengeCTF> challengeCTFOptional =
                challengeCTFRepository.findById(historySubmitChallengeCTFRequest.getChallengeCTFId());
        if (challengeCTFOptional.isEmpty()) {
            throw new ChallengeCTFCustomException("Challenge CTF Not Found", DataUtils.ERROR_CHALLENGE_CTF_NOT_FOUND);
        }
        ChallengeCTF challengeCTF = challengeCTFOptional.get();
        User user = userOptional.get();
        HistorySubmitChallengeCTF historySubmitChallengeCTF = historySubmitChallengeCTFMapper.toPojo(historySubmitChallengeCTFRequest);
        historySubmitChallengeCTF.setUser(user);
        historySubmitChallengeCTF.setChallengeCTF(challengeCTF);
        HistorySubmitChallengeCTF historySubmitChallengeCTFSaved = historySubmitChallengeRepository.save(historySubmitChallengeCTF);

        if(challengeCTFResultRepository.existsByChallengeCTFAndUser(challengeCTF, user)){
            Optional<ChallengeCTFResult> challengeCTFResultOptional =
                    challengeCTFResultRepository.findByChallengeCTFAndUser(challengeCTF, user);
            ChallengeCTFResult challengeCTFResult = challengeCTFResultOptional.get();
            if(!challengeCTFResult.isCompleted() && historySubmitChallengeCTF.getStatus().equals("accept")) {
                user.setScoredChallengeCTF(user.getScoredChallengeCTF() + challengeCTF.getPoint());
                challengeCTFResult.setCompleted(true);
                challengeCTF.setTotalSolve(challengeCTF.getTotalSolve() + 1);
                challengeCTFRepository.save(challengeCTF);
                userRepository.save(user);
                challengeCTFResultRepository.save(challengeCTFResult);
            }
        }
        else {
            if(historySubmitChallengeCTFSaved.getStatus().equals("accept")) {
                user.setScoredChallengeCTF(user.getScoredChallengeCTF() + challengeCTF.getPoint());
                challengeCTF.setTotalSolve(challengeCTF.getTotalSolve() + 1);
                challengeCTFRepository.save(challengeCTF);
                userRepository.save(user);
            }
            ChallengeCTFResult challengeCTFResult = new ChallengeCTFResult();
            challengeCTFResult.setUser(historySubmitChallengeCTFSaved.getUser())
                    .setChallengeCTF(historySubmitChallengeCTFSaved.getChallengeCTF())
                    .setCompleted(historySubmitChallengeCTFSaved.getStatus().equals("accept"))
                    .setCreatedAt(Instant.now());
            challengeCTFResultRepository.save(challengeCTFResult);
        }
        return getHistorySubmitChallengeCTFResponse(historySubmitChallengeCTFSaved);
    }

    @Override
    public List<HistorySubmitChallengeCTFResponse> getAllHistorySubmitByUser(Integer userId) throws UserCustomException {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new UserCustomException("User Not Found", DataUtils.ERROR_USER_NOT_FOUND);
        }
        List<HistorySubmitChallengeCTF> listHistorySubmitChallengeCTF =
                historySubmitChallengeRepository.findAllByUserOrderByCreatedAtDesc(userOptional.get());
        List<HistorySubmitChallengeCTFResponse> historySubmitChallengeCTFResponses = new ArrayList<>();
        listHistorySubmitChallengeCTF.forEach(historySubmitChallengeCTF -> {
            HistorySubmitChallengeCTFResponse response = getHistorySubmitChallengeCTFResponse(historySubmitChallengeCTF);
            historySubmitChallengeCTFResponses.add(response);
        });
        return historySubmitChallengeCTFResponses;
    }

    @Override
    public HistorySubmitChallengeCTFPageableResponse getAllHistorySubmitByChallengeCTF(Pageable pageable, Integer challengeCTFId) throws ChallengeCTFCustomException {
        Optional<ChallengeCTF> challengeCTFOptional =
                challengeCTFRepository.findById(challengeCTFId);
        if (challengeCTFOptional.isEmpty()) {
            throw new ChallengeCTFCustomException("Challenge CTF Not Found", DataUtils.ERROR_CHALLENGE_CTF_NOT_FOUND);
        }
        Page<HistorySubmitChallengeCTF> historySubmitChallengeCTFPage =
                historySubmitChallengeRepository.findAllByChallengeCTF(challengeCTFOptional.get(), pageable);
        List<HistorySubmitChallengeCTF> historySubmitChallengeCTFList = historySubmitChallengeCTFPage.getContent();
        List<HistorySubmitChallengeCTFResponse> historySubmitChallengeCTFsResponses = new ArrayList<>();
        historySubmitChallengeCTFList.forEach(historySubmitChallengeCTF -> {
            HistorySubmitChallengeCTFResponse response = getHistorySubmitChallengeCTFResponse(historySubmitChallengeCTF);
            historySubmitChallengeCTFsResponses.add(response);
        });
        HistorySubmitChallengeCTFPageableResponse historySubmitChallengeCTFPageableResponse
                = new HistorySubmitChallengeCTFPageableResponse();
        historySubmitChallengeCTFPageableResponse.setData(historySubmitChallengeCTFsResponses)
                .setTotalItems(historySubmitChallengeCTFPage.getTotalElements())
                .setCurrentPage(historySubmitChallengeCTFPage.getNumber())
                .setTotalPages(historySubmitChallengeCTFPage.getTotalPages());
        return historySubmitChallengeCTFPageableResponse;
    }
}
