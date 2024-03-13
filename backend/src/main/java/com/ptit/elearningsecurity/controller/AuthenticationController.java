package com.ptit.elearningsecurity.controller;

import com.ptit.elearningsecurity.data.request.AuthenticationRequest;
import com.ptit.elearningsecurity.data.request.UserRequest;
import com.ptit.elearningsecurity.data.response.AuthenticationResponse;
import com.ptit.elearningsecurity.exception.UserCustomException;
import com.ptit.elearningsecurity.service.security.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<String> register (@RequestBody UserRequest userRequest) throws UserCustomException {
        return ResponseEntity.status(HttpStatus.OK).body(authenticationService.register(userRequest));
    }

    @RequestMapping(value = "/confirm-account", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<String> confirmUserAccount(@RequestParam("token") String confirmToken) throws UserCustomException {
        return ResponseEntity.status(HttpStatus.OK).body(authenticationService.confirmEmail(confirmToken));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticateUser(@RequestBody AuthenticationRequest authenticationRequest) throws UserCustomException {
        return ResponseEntity.status(HttpStatus.OK).body(authenticationService.authenticate(authenticationRequest));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws UserCustomException, IOException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(authenticationService.refreshToken(request, response));
    }

}
