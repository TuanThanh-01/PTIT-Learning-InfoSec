package com.ptit.elearningsecurity.service.historyPracticeLab;

import com.ptit.elearningsecurity.data.request.HistoryPracticeLabRequest;
import com.ptit.elearningsecurity.data.response.HistoryPracticeLabResponse;
import com.ptit.elearningsecurity.exception.LabCustomException;
import com.ptit.elearningsecurity.exception.UserCustomException;

import java.util.List;

public interface IHistoryPracticeLabService {
    List<HistoryPracticeLabResponse> getHistoryPracticeLab();
    List<HistoryPracticeLabResponse> getAllHistoryPracticeLabByUser(Integer userId);
    void createHistoryPracticeLab(HistoryPracticeLabRequest historyPracticeLabRequest) throws UserCustomException, LabCustomException;
}
