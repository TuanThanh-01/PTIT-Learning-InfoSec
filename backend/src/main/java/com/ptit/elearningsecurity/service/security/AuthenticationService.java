package com.ptit.elearningsecurity.service.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ptit.elearningsecurity.common.DataUtils;
import com.ptit.elearningsecurity.data.mapper.UserMapper;
import com.ptit.elearningsecurity.data.request.AuthenticationRequest;
import com.ptit.elearningsecurity.data.request.UserRequest;
import com.ptit.elearningsecurity.data.response.AuthenticationResponse;
import com.ptit.elearningsecurity.entity.Role;
import com.ptit.elearningsecurity.entity.User;
import com.ptit.elearningsecurity.entity.token.ConfirmationToken;
import com.ptit.elearningsecurity.entity.token.Token;
import com.ptit.elearningsecurity.entity.token.TokenType;
import com.ptit.elearningsecurity.exception.UserCustomException;
import com.ptit.elearningsecurity.repository.ConfirmationTokenRepository;
import com.ptit.elearningsecurity.repository.TokenRepository;
import com.ptit.elearningsecurity.repository.UserRepository;
import com.ptit.elearningsecurity.service.EmailSenderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailSenderService emailSenderService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    public String register(UserRequest userRequest) throws UserCustomException {
        User user = userMapper.toPojo(userRequest);
        if(userRepository.existsByEmail(userRequest.getEmail())) {
            throw new UserCustomException("User email exists", DataUtils.ERROR_USER_EXIST);
        }
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()))
                .setRole(Role.USER)
                .setEnabled(false);
        User savedUser = userRepository.save(user);
        ConfirmationToken confirmationToken = new ConfirmationToken(savedUser);
        confirmationTokenRepository.save(confirmationToken);
        String fullName = user.getFirstname() + " " + user.getLastname();
        emailSenderService.sendEmail(fullName, savedUser.getEmail(), confirmationToken.getToken());
        return "Verify email by the link sent on your email address";
    }

    public String confirmEmail(String confirmToken) throws UserCustomException {
        ConfirmationToken token = confirmationTokenRepository.findByToken(confirmToken);
        if(token != null) {
            Optional<User> userOptional = userRepository
                    .findByEmail(token.getUser().getEmail());
            if(userOptional.isEmpty()) {
                throw new UserCustomException("User Not Found",
                        DataUtils.ERROR_USER_NOT_FOUND);
            }
            User user = userOptional.get();
            user.setEnabled(true);
            emailSenderService.sendEmailSuccess(user.getEmail());
            userRepository.save(user);
            return "Email verified successfully!";
        }
        return "Couldn't verify email";
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) throws UserCustomException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getEmail(),
                        authenticationRequest.getPassword()
                )
        );
        Optional<User> userOptional = userRepository.findByEmail(authenticationRequest.getEmail());
        if(userOptional.isEmpty()) {
            throw new UserCustomException("User Not Found", DataUtils.ERROR_USER_NOT_FOUND);
        }
        User user = userOptional.get();
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserToken(user);
        saveUserToken(user, jwtToken);
        return new AuthenticationResponse()
                .setUserID(user.getId())
                .setFirstname(user.getFirstname())
                .setLastname(user.getLastname())
                .setEmail(user.getEmail())
                .setRole(user.getRole().name())
                .setStudentIdentity(user.getStudentIdentity())
                .setAccessToken(jwtToken)
                .setRefreshToken(refreshToken);
    }

    public AuthenticationResponse refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws UserCustomException, IOException {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        String refreshToken = authHeader.substring(7);
        String userEmail = jwtService.extractUsername(refreshToken);
        if(userEmail != null) {
            Optional<User> userOptional = userRepository.findByEmail(userEmail);
            if(userOptional.isEmpty()) {
                throw new UserCustomException("User Not Found", DataUtils.ERROR_USER_NOT_FOUND);
            }
            User user = userOptional.get();
            if(jwtService.isValidToken(refreshToken, user)) {
                String accessToken = jwtService.generateToken(user);
                revokeAllUserToken(user);
                saveUserToken(user, accessToken);
                return new AuthenticationResponse()
                        .setAccessToken(accessToken)
                        .setRefreshToken(refreshToken);
            }
        }
        new ObjectMapper()
                .writeValue(response.getOutputStream(),
                        "Refresh token expired, please log in again!");
        return null;
    }

    private void revokeAllUserToken(User user) {
        List<Token> validUserToken = tokenRepository.findAllValidTokenByUser(user.getId());
        if(validUserToken.isEmpty()) {
            return;
        }
        validUserToken.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
        });
        tokenRepository.saveAll(validUserToken);;
    }

    private void saveUserToken(User user, String jwtToken) {
        Token token = new Token();
        token.setUser(user)
                .setToken(jwtToken)
                .setTokenType(TokenType.BEARER)
                .setRevoked(false)
                .setExpired(false)
                .setCreatedAt(Instant.now());
        tokenRepository.save(token);
    }
}











