package com.ptit.elearningsecurity.controller;

import com.ptit.elearningsecurity.data.request.CategoryLessonRequest;
import com.ptit.elearningsecurity.data.response.CategoryLessonResponse;
import com.ptit.elearningsecurity.exception.CategoryLessonCustomException;
import com.ptit.elearningsecurity.service.categoryLesson.CategoryLessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/category-lesson")
public class CategoryLessonController {

    private final CategoryLessonService categoryLessonService;

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/all")
    public ResponseEntity<List<CategoryLessonResponse>> getAllCategoryLesson() {
        return ResponseEntity.status(HttpStatus.OK).body(categoryLessonService.getAll());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/get-all-category-lesson-name")
    public ResponseEntity<List<String>> getAllCategoryLessonName() {
        return ResponseEntity.status(HttpStatus.OK).body(categoryLessonService.getAllCategoryLessonName());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/{id}")
    public ResponseEntity<CategoryLessonResponse> findById(@PathVariable("id") int categoryLessonID) throws CategoryLessonCustomException {
        return ResponseEntity.status(HttpStatus.OK).body(categoryLessonService.getSingleById(categoryLessonID));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<CategoryLessonResponse> createCategoryLesson(@RequestBody CategoryLessonRequest categoryLessonRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(categoryLessonService.create(categoryLessonRequest));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<CategoryLessonResponse> updateById(@PathVariable("id") int categoryLessonID, @RequestBody CategoryLessonRequest categoryLessonRequest) throws CategoryLessonCustomException {
        return ResponseEntity.status(HttpStatus.OK).body(categoryLessonService.update(categoryLessonRequest, categoryLessonID));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable("id") int categoryLessonID) throws CategoryLessonCustomException {
        categoryLessonService.delete(categoryLessonID);
        return ResponseEntity.status(HttpStatus.OK).body("Delete category lesson with ID " + categoryLessonID + " successfully!");
    }

}
