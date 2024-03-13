package com.ptit.elearningsecurity.service.user;

import com.ptit.elearningsecurity.data.request.UserRequest;
import com.ptit.elearningsecurity.data.response.UserPageableResponse;
import com.ptit.elearningsecurity.data.response.UserResponse;
import com.ptit.elearningsecurity.exception.UserCustomException;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IUserService {
    List<UserResponse> findAll();
    UserResponse findByID(int userID) throws UserCustomException;
    UserResponse create(UserRequest userRequest, MultipartFile image) throws UserCustomException, IOException;
    UserResponse update(int userID, UserRequest userRequest, MultipartFile image) throws UserCustomException, IOException;
    UserResponse uploadAvatar(int userID, MultipartFile multipartFile) throws UserCustomException, IOException;
    void delete(int userID) throws UserCustomException;
    String updateUserPassword(String password, int userId) throws UserCustomException;
}
