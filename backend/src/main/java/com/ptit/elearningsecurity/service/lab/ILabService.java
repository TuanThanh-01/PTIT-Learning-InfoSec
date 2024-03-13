package com.ptit.elearningsecurity.service.lab;

import com.ptit.elearningsecurity.data.request.LabRequest;
import com.ptit.elearningsecurity.data.response.LabResponse;
import com.ptit.elearningsecurity.exception.LabCustomException;

import java.util.List;

public interface ILabService {
    List<LabResponse> getAllLab();
    LabResponse createLab(LabRequest labRequest);
    LabResponse updateLab(LabRequest labRequest, Integer labId) throws LabCustomException;
    void deleteLab(Integer labId) throws LabCustomException;
}
