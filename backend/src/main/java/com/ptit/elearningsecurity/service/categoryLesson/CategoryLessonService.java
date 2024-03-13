package com.ptit.elearningsecurity.service.categoryLesson;

import com.ptit.elearningsecurity.common.DataUtils;
import com.ptit.elearningsecurity.data.mapper.CategoryLessonMapper;
import com.ptit.elearningsecurity.data.request.CategoryLessonRequest;
import com.ptit.elearningsecurity.data.response.CategoryLessonResponse;
import com.ptit.elearningsecurity.entity.lecture.CategoryLesson;
import com.ptit.elearningsecurity.exception.CategoryLessonCustomException;
import com.ptit.elearningsecurity.repository.CategoryLessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryLessonService implements ICategoryLessonService {

    private final CategoryLessonRepository categoryLessonRepository;
    private final CategoryLessonMapper categoryLessonMapper;

    @Override
    public List<String> getAllCategoryLessonName() {
        return categoryLessonRepository.findAll()
                .stream()
                .map(CategoryLesson::getCategoryName)
                .collect(Collectors.toList());
    }

    @Override
    public List<CategoryLessonResponse> getAll() {
        return categoryLessonMapper.toListCategoryLessonResponse(categoryLessonRepository.findAll());
    }

    @Override
    public CategoryLessonResponse getSingleById(int categoryLessonID) throws CategoryLessonCustomException {
        Optional<CategoryLesson> categoryLessonOptional = categoryLessonRepository.findById(categoryLessonID);
        if (categoryLessonOptional.isEmpty()) {
            throw new CategoryLessonCustomException(
                    "Category Lesson Not Found",
                    DataUtils.ERROR_CATEGORY_LESSON_NOT_FOUND
            );
        }

        return categoryLessonMapper.toCategoryResponse(categoryLessonOptional.get());
    }

    @Override
    public CategoryLessonResponse create(CategoryLessonRequest categoryLessonRequest) {
        CategoryLesson categoryLesson = categoryLessonMapper.toPojo(categoryLessonRequest);
        CategoryLesson categoryLessonSaved = categoryLessonRepository.save(categoryLesson);
        return categoryLessonMapper.toCategoryResponse(categoryLessonSaved);
    }

    @Override
    public CategoryLessonResponse update(CategoryLessonRequest categoryLessonRequest, int categoryLessonID) throws CategoryLessonCustomException {
        Optional<CategoryLesson> categoryLessonOptional = categoryLessonRepository.findById(categoryLessonID);
        if (categoryLessonOptional.isEmpty()) {
            throw new CategoryLessonCustomException(
                    "Category Lesson Not Found",
                    DataUtils.ERROR_CATEGORY_LESSON_NOT_FOUND
            );
        }
        CategoryLesson categoryLesson = categoryLessonOptional.get();
        if (Objects.nonNull(categoryLessonRequest.getCategoryName()) && !"".equalsIgnoreCase(categoryLessonRequest.getCategoryName())) {
            categoryLesson.setCategoryName(categoryLessonRequest.getCategoryName());
        }
        if (Objects.nonNull(categoryLessonRequest.getDescription()) && !"".equalsIgnoreCase(categoryLessonRequest.getDescription())) {
            categoryLesson.setDescription(categoryLessonRequest.getDescription());
        }
        categoryLesson.setUpdatedAt(Instant.now());
        categoryLessonRepository.save(categoryLesson);
        return categoryLessonMapper.toCategoryResponse(categoryLesson);
    }

    @Override
    public void delete(int categoryLessonID) throws CategoryLessonCustomException {
        Optional<CategoryLesson> categoryLessonOptional = categoryLessonRepository.findById(categoryLessonID);
        if (categoryLessonOptional.isEmpty()) {
            throw new CategoryLessonCustomException(
                    "Category Lesson Not Found",
                    DataUtils.ERROR_CATEGORY_LESSON_NOT_FOUND
            );
        }
        categoryLessonRepository.delete(categoryLessonOptional.get());
    }
}
