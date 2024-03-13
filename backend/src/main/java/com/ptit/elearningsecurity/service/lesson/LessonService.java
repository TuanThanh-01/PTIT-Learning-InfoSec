package com.ptit.elearningsecurity.service.lesson;

import com.ptit.elearningsecurity.common.DataUtils;
import com.ptit.elearningsecurity.data.mapper.LessonMapper;
import com.ptit.elearningsecurity.data.request.LessonRequest;
import com.ptit.elearningsecurity.data.response.LessonResponse;
import com.ptit.elearningsecurity.entity.lecture.CategoryLesson;
import com.ptit.elearningsecurity.entity.lecture.Lesson;
import com.ptit.elearningsecurity.exception.CategoryLessonCustomException;
import com.ptit.elearningsecurity.exception.ImageDataCustomException;
import com.ptit.elearningsecurity.exception.LessonCustomException;
import com.ptit.elearningsecurity.repository.CategoryLessonRepository;
import com.ptit.elearningsecurity.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonService implements ILessonService {

    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));
    private final LessonRepository lessonRepository;
    private final CategoryLessonRepository categoryLessonRepository;
    private final LessonMapper lessonMapper;

    @Override
    public List<LessonResponse> getAllLesson() {
        List<Lesson> lessons = lessonRepository.findAll();
        List<LessonResponse> lessonResponses = new ArrayList<>();
        lessons.forEach(lesson -> lessonResponses.add(mapImageDataToLessonResponse(lesson)));
        return lessonResponses;
    }

    @Override
    public List<LessonResponse> findLessonRandom(Integer lessonId) {
        List<Lesson> lessons = lessonRepository.findRandomLesson(lessonId);
        List<LessonResponse> lessonResponses = new ArrayList<>();
        lessons.forEach(lesson -> lessonResponses.add(mapImageDataToLessonResponse(lesson)));
        return lessonResponses;
    }

    @Override
    public LessonResponse findById(int lessonID) throws LessonCustomException {
        Optional<Lesson> lessonOptional = lessonRepository.findById(lessonID);
        if (lessonOptional.isEmpty()) {
            throw new LessonCustomException("Lesson Not Found", DataUtils.ERROR_LESSON_NOT_FOUND);
        }
        return mapImageDataToLessonResponse(lessonOptional.get());
    }

    @Override
    public LessonResponse findLessonByTitle(String title) throws LessonCustomException {
        Optional<Lesson> lessonOptional = lessonRepository.findByTitle(title);
        if (lessonOptional.isEmpty()) {
            throw new LessonCustomException("Lesson Not Found", DataUtils.ERROR_LESSON_NOT_FOUND);
        }
        return mapImageDataToLessonResponse(lessonOptional.get());
    }


    private LessonResponse mapImageDataToLessonResponse(Lesson lesson) {
        String coverImage = lesson.getCoverImage();
        LessonResponse lessonResponse = lessonMapper.toResponse(lesson);
        lessonResponse.setCoverImage(coverImage);
        lessonResponse.setLstCategoryLessonName(
                lesson.getCategoryLessons()
                        .stream()
                        .map(CategoryLesson::getCategoryName)
                        .collect(Collectors.toList())
        );
        lessonResponse.setLstCategoryLessonDescription(
                lesson.getCategoryLessons()
                        .stream()
                        .map(CategoryLesson::getDescription)
                        .collect(Collectors.toList())
        );
        return lessonResponse;
    }

    private String getAlphaNumericString() {
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz";
        StringBuilder sb = new StringBuilder(8);
        for (int i = 0; i < 8; i++) {
            int index = (int) (AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString.charAt(index));
        }
        return sb.toString();
    }

    private String uploadImage(MultipartFile image) throws IOException {
        Path staticPath = Paths.get("static");
        Path imagePath = Paths.get("images");
        Path commentPath = Paths.get("lesson");

        if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(commentPath))) {
            Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(commentPath));
        }
        String timeStamp = new SimpleDateFormat("ddMMyyyyHHmmss").format(new Date());
        String imageName = timeStamp.concat(getAlphaNumericString())
                .concat(".")
                .concat(Objects.requireNonNull(image.getOriginalFilename()).split("\\.")[1]);
        Path imageFilePath = CURRENT_FOLDER.resolve(staticPath)
                .resolve(imagePath).resolve(commentPath)
                .resolve(imageName);
        try (OutputStream os = Files.newOutputStream(imageFilePath)) {
            os.write(image.getBytes());
        }
        return "/images/lesson/" + imageName;
    }

    private void deleteImageResource(String imageUrl) throws IOException {
        Path staticPath = Paths.get("static");
        String imageUrlPath = CURRENT_FOLDER.resolve(staticPath) + imageUrl;
        FileUtils.delete(new File(imageUrlPath));
    }

    @Override
    public LessonResponse createLesson(LessonRequest lessonRequest) throws CategoryLessonCustomException, LessonCustomException, IOException {
        Lesson lesson = lessonMapper.toPojo(lessonRequest);
        List<CategoryLesson> categoryLessons = categoryLessonRepository
                .findByCategoryNameIn(lessonRequest.getLstCategoryLessonName());
        lesson.setCategoryLessons(categoryLessons);
        if (categoryLessons.size() < lessonRequest.getLstCategoryLessonName().size()) {
            List<String> foundIDs = categoryLessons.stream().map(CategoryLesson::getCategoryName).toList();
            List<String> notFoundIDs = new ArrayList<>(lessonRequest.getLstCategoryLessonName());
            notFoundIDs.removeAll(foundIDs);
            throw new CategoryLessonCustomException(
                    "Category Lesson Not Found: " + notFoundIDs.stream().map(String::valueOf)
                            .collect(Collectors.joining(", ")).trim(),
                    DataUtils.ERROR_TOPIC_NOT_FOUND
            );
        }
        if (lessonRepository.existsByTitle(lessonRequest.getTitle())) {
            throw new LessonCustomException(
                    "Lesson Exists By Title: " + lessonRequest.getTitle(),
                    DataUtils.ERROR_LESSON_EXISTS
            );
        }
        if (lessonRequest.getCoverImage() == null) {
            lesson.setCoverImage("/images/lesson/default.png");
        } else {
            String coverImage = uploadImage(lessonRequest.getCoverImage());
            lesson.setCoverImage(coverImage);
        }
        return mapImageDataToLessonResponse(lessonRepository.save(lesson));
    }

    @Override
    public LessonResponse updateLesson(LessonRequest lessonRequest, int lessonID) throws CategoryLessonCustomException, IOException, ImageDataCustomException, LessonCustomException {
        Optional<Lesson> lessonOptional = lessonRepository.findById(lessonID);
        if (lessonOptional.isEmpty()) {
            throw new LessonCustomException("Lesson Not Found", DataUtils.ERROR_LESSON_NOT_FOUND);
        }
        Lesson lesson = lessonOptional.get();
        if (Objects.nonNull(lessonRequest.getTitle()) && !"".equalsIgnoreCase(lessonRequest.getTitle())) {
            lesson.setTitle(lessonRequest.getTitle());
        }

        if (Objects.nonNull(lessonRequest.getDescription()) && !"".equalsIgnoreCase(lessonRequest.getDescription())) {
            lesson.setDescription(lessonRequest.getDescription());
        }

        if (Objects.nonNull(lessonRequest.getContent()) && !"".equalsIgnoreCase(lessonRequest.getContent())) {
            lesson.setContent(lessonRequest.getContent());
        }
        if (Objects.nonNull(lessonRequest.getCoverImage())) {
            deleteImageResource(lesson.getCoverImage());
            lesson.setCoverImage(uploadImage(lessonRequest.getCoverImage()));
        }
        if (Objects.nonNull(lessonRequest.getLstCategoryLessonName()) && lessonRequest.getLstCategoryLessonName().size() > 0) {
            List<CategoryLesson> categoryLessons = categoryLessonRepository
                    .findByCategoryNameIn(lessonRequest.getLstCategoryLessonName());
            lesson.setCategoryLessons(categoryLessons);
            if (categoryLessons.size() < lessonRequest.getLstCategoryLessonName().size()) {
                List<String> foundIDs = categoryLessons.stream().map(CategoryLesson::getCategoryName).toList();
                List<String> notFoundIDs = new ArrayList<>(lessonRequest.getLstCategoryLessonName());
                notFoundIDs.removeAll(foundIDs);
                throw new CategoryLessonCustomException(
                        "Category Lesson Not Found: " + notFoundIDs.stream().map(String::valueOf)
                                .collect(Collectors.joining(", ")).trim(),
                        DataUtils.ERROR_TOPIC_NOT_FOUND
                );
            }
        }
        lesson.setUpdatedAt(Instant.now());
        lessonRepository.save(lesson);
        return mapImageDataToLessonResponse(lesson);
    }

    @Override
    public void deleteLesson(int lessonID) throws LessonCustomException, IOException {
        Optional<Lesson> lessonOptional = lessonRepository.findById(lessonID);
        if (lessonOptional.isEmpty()) {
            throw new LessonCustomException("Lesson Not Found", DataUtils.ERROR_LESSON_NOT_FOUND);
        }
        Lesson lesson = lessonOptional.get();
        deleteImageResource(lesson.getCoverImage());
        lessonRepository.delete(lesson);
    }

    @Override
    public String uploadImageLesson(MultipartFile file) throws IOException {
        return uploadImage(file);
    }
}
