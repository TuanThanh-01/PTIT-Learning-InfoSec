package com.ptit.elearningsecurity.controller;

import com.ptit.elearningsecurity.data.request.UserRequest;
import com.ptit.elearningsecurity.data.response.UserPageableResponse;
import com.ptit.elearningsecurity.data.response.UserResponse;
import com.ptit.elearningsecurity.exception.UserCustomException;
import com.ptit.elearningsecurity.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getAllUser() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findAll());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserByID(@PathVariable("id") int userID)
            throws UserCustomException {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findByID(userID));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<UserResponse> createUser(
            @RequestParam("firstname") String firstname,
            @RequestParam("lastname") String lastname,
            @RequestParam("studentIdentity") String studentIdentity,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam(value = "image", required = false) MultipartFile image) throws UserCustomException, IOException {
        UserRequest userRequest = new UserRequest();
        userRequest.setFirstname(firstname)
                .setLastname(lastname)
                .setStudentIdentity(studentIdentity)
                .setEmail(email)
                .setPassword(password);

        return ResponseEntity.status(HttpStatus.OK).body(userService.create(userRequest, image));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable("id") int userID,
            @RequestParam("firstname") String firstname,
            @RequestParam("lastname") String lastname,
            @RequestParam("studentIdentity") String studentIdentity,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam(value = "image", required = false) MultipartFile image) throws UserCustomException, IOException {
        UserRequest userRequest = new UserRequest();
        userRequest.setFirstname(firstname)
                .setLastname(lastname)
                .setStudentIdentity(studentIdentity)
                .setEmail(email)
                .setPassword(password);
        return ResponseEntity.status(HttpStatus.OK).body(userService.update(userID, userRequest, image));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update-password/{id}")
    public ResponseEntity<String> updatePassword(
            @PathVariable("id") int userID,
            @RequestParam("password") String password) throws UserCustomException {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateUserPassword(password, userID));
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PutMapping(value = "/upload-avatar/{id}", consumes = "multipart/form-data")
    public ResponseEntity<UserResponse> uploadAvatar(@PathVariable("id") int userID, @RequestParam("image") MultipartFile multipartFile)
            throws UserCustomException, IOException {
        return ResponseEntity.status(HttpStatus.OK).body(userService.uploadAvatar(userID, multipartFile));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") int userID) throws UserCustomException {
        userService.delete(userID);
        return ResponseEntity.status(HttpStatus.OK).body("Delete User Successfully");
    }
}
