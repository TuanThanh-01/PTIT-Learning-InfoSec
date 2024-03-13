package com.ptit.elearningsecurity.controller;

import com.ptit.elearningsecurity.data.request.LabRequest;
import com.ptit.elearningsecurity.data.response.LabResponse;
import com.ptit.elearningsecurity.exception.LabCustomException;
import com.ptit.elearningsecurity.service.lab.LabService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/lab")
@RequiredArgsConstructor
public class LabController {
    private final LabService labService;

    @GetMapping("/all")
    public ResponseEntity<List<LabResponse>> getAllLab() {
        return ResponseEntity.status(HttpStatus.OK).body(labService.getAllLab());
    }

    @GetMapping("/get-by-tag")
    public ResponseEntity<List<LabResponse>> getAllByTag(@RequestParam("tag") String tag) {
        return ResponseEntity.status(HttpStatus.OK).body(labService.getAllLabByTag(tag));
    }

    @PostMapping("/create")
    public ResponseEntity<LabResponse> createLab(@RequestBody LabRequest labRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(labService.createLab(labRequest));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<LabResponse> updateLab(@RequestBody LabRequest labRequest, @PathVariable("id") Integer labId) throws LabCustomException {
        return ResponseEntity.status(HttpStatus.OK).body(labService.updateLab(labRequest, labId));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteLab(@PathVariable("id") Integer labId) throws LabCustomException {
        labService.deleteLab(labId);
        return ResponseEntity.status(HttpStatus.OK).body("Delete lab success!!");
    }
}
