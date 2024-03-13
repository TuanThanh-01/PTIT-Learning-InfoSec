package com.ptit.elearningsecurity.service.statistic;


import com.ptit.elearningsecurity.data.response.UserStatisticChallengeCTFResponse;
import com.ptit.elearningsecurity.exception.UserCustomException;

public interface IUserStatisticChallengeCTFService {
    UserStatisticChallengeCTFResponse getStatisticChallengeCTFByUser(Integer userId) throws UserCustomException;
}
