package com.ptit.elearningsecurity.service.historySubmitChallengeCTF;

import com.ptit.elearningsecurity.data.request.HistorySubmitChallengeCTFRequest;
import com.ptit.elearningsecurity.data.response.HistorySubmitChallengeCTFPageableResponse;
import com.ptit.elearningsecurity.data.response.HistorySubmitChallengeCTFResponse;
import com.ptit.elearningsecurity.exception.ChallengeCTFCustomException;
import com.ptit.elearningsecurity.exception.UserCustomException;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IHistorySubmitChallengeCTFService {
    List<HistorySubmitChallengeCTFResponse> getAllHistorySubmit();

    HistorySubmitChallengeCTFResponse createHistorySubmit(HistorySubmitChallengeCTFRequest historySubmitChallengeCTFRequest) throws UserCustomException, ChallengeCTFCustomException;

    List<HistorySubmitChallengeCTFResponse> getAllHistorySubmitByUser(Integer userId) throws UserCustomException;

    HistorySubmitChallengeCTFPageableResponse getAllHistorySubmitByChallengeCTF(Pageable pageable, Integer challengeCTFId) throws ChallengeCTFCustomException;


}
