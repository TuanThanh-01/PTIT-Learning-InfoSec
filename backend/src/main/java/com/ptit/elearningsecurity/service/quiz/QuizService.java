package com.ptit.elearningsecurity.service.quiz;

import com.ptit.elearningsecurity.common.DataUtils;
import com.ptit.elearningsecurity.data.mapper.QuizMapper;
import com.ptit.elearningsecurity.data.request.QuizRequest;
import com.ptit.elearningsecurity.data.response.QuizPageableResponse;
import com.ptit.elearningsecurity.data.response.QuizResponse;
import com.ptit.elearningsecurity.entity.quiz.Quiz;
import com.ptit.elearningsecurity.exception.QuizCustomException;
import com.ptit.elearningsecurity.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService implements IQuizService{

    private final QuizRepository quizRepository;
    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));
    private final QuizMapper quizMapper;

    @Override
    public List<String> findAllQuizName() {
        List<Quiz> quizzes = quizRepository.findAll();
        return quizzes.stream().map(Quiz::getName).collect(Collectors.toList());
    }

    @Override
    public List<QuizResponse> findAllQuiz() {
        List<Quiz> quizzes = quizRepository.findAll();
        return quizMapper.toQuizResponses(quizzes);
    }

    @Override
    public QuizResponse findQuizById(int id) throws QuizCustomException {
        Optional<Quiz> quizOptional = quizRepository.findById(id);
        if(quizOptional.isEmpty()) {
            throw new QuizCustomException("Quiz Not Found", DataUtils.ERROR_QUIZ_NOT_FOUND);
        }
        return quizMapper.toResponse(quizOptional.get());
    }

    @Override
    public QuizResponse findQuizByName(String name) throws QuizCustomException {
        Optional<Quiz> quizOptional = quizRepository.findByName(name);
        if(quizOptional.isEmpty()) {
            throw new QuizCustomException("Quiz Not Found", DataUtils.ERROR_QUIZ_NOT_FOUND);
        }
        return quizMapper.toResponse(quizOptional.get());
    }

    @Override
    public QuizResponse createQuiz(QuizRequest quizRequest) throws IOException {
        Quiz quiz = quizMapper.toPojo(quizRequest);
        if(quizRequest.getImage() != null) {
            quiz.setImageCover(uploadImage(quizRequest.getImage()));
        }
        return quizMapper.toResponse(quizRepository.save(quiz));
    }

    private String uploadImage(MultipartFile image) throws IOException {
        Path staticPath = Paths.get("static");
        Path imagePath = Paths.get("images");
        Path commentPath = Paths.get("quiz");

        if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(commentPath))) {
            Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(commentPath));
        }

        String timeStamp = new SimpleDateFormat("ddMMyyyyHHmmss").format(new Date());
        String imageName = timeStamp.concat(Objects.requireNonNull(image.getOriginalFilename()));
        Path imageFilePath = CURRENT_FOLDER.resolve(staticPath)
                .resolve(imagePath).resolve(commentPath)
                .resolve(imageName);
        try(OutputStream os = Files.newOutputStream(imageFilePath)){
            os.write(image.getBytes());
        }
        return "/images/quiz/" + imageName;
    }

    private void deleteImageResource(String imageUrl) throws IOException {
        Path staticPath = Paths.get("static");
        String imageUrlPath = CURRENT_FOLDER.resolve(staticPath) + imageUrl;
        FileUtils.delete(new File(imageUrlPath));
    }

    @Override
    public QuizResponse updateQuiz(QuizRequest quizRequest, int quizId) throws QuizCustomException, IOException {
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);
        if(quizOptional.isEmpty()) {
            throw new QuizCustomException("Quiz Not Found", DataUtils.ERROR_QUIZ_NOT_FOUND);
        }
        Quiz quiz = quizOptional.get();
        if(Objects.nonNull(quizRequest.getName()) && !"".equalsIgnoreCase(quizRequest.getName())) {
            quiz.setName(quizRequest.getName());
        }
        if(Objects.nonNull(quizRequest.getDescription()) && !"".equalsIgnoreCase(quizRequest.getDescription())) {
            quiz.setDescription(quizRequest.getDescription());
        }
        if(Objects.nonNull(quizRequest.getImage())) {
            if(!quiz.getImageCover().equalsIgnoreCase("/images/quiz/default.png")) {
                deleteImageResource(quiz.getImageCover());
            }
            quiz.setImageCover(uploadImage(quizRequest.getImage()));
        }
        quiz.setUpdatedAt(Instant.now());
        return quizMapper.toResponse(quizRepository.save(quiz));
    }

    @Override
    public void deleteQuiz(int id) throws QuizCustomException, IOException {
        Optional<Quiz> quizOptional = quizRepository.findById(id);
        if(quizOptional.isEmpty()) {
            throw new QuizCustomException("Quiz Not Found", DataUtils.ERROR_QUIZ_NOT_FOUND);
        }
        Quiz quiz = quizOptional.get();
        if(!quiz.getImageCover().equalsIgnoreCase("/images/quiz/default.png")) {
            deleteImageResource(quiz.getImageCover());
        }
        quizRepository.delete(quiz);
    }
}
