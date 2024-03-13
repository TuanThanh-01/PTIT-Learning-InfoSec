package com.ptit.elearningsecurity.service.lab;

import com.ptit.elearningsecurity.common.DataUtils;
import com.ptit.elearningsecurity.data.mapper.LabMapper;
import com.ptit.elearningsecurity.data.request.LabRequest;
import com.ptit.elearningsecurity.data.response.LabResponse;
import com.ptit.elearningsecurity.entity.lab.Lab;
import com.ptit.elearningsecurity.exception.LabCustomException;
import com.ptit.elearningsecurity.repository.LabRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LabService implements ILabService{
    private final LabRepository labRepository;
    private final LabMapper labMapper;

    @Override
    public List<LabResponse> getAllLab() {
        return labMapper.toLabResponse(labRepository.findAll());
    }

    public List<LabResponse> getAllLabByTag(String tag) {
        return labMapper.toLabResponse(labRepository.findTop3ByTag(tag));
    }

    @Override
    public LabResponse createLab(LabRequest labRequest) {
        Lab lab = labMapper.toPojo(labRequest);
        return labMapper.toResponse(labRepository.save(lab));
    }

    @Override
    public LabResponse updateLab(LabRequest labRequest, Integer labId) throws LabCustomException {
        Optional<Lab> optionalLab = labRepository.findById(labId);
        if(optionalLab.isEmpty()) {
            throw new LabCustomException("Lab Not Found", DataUtils.ERROR_LAB_NOT_FOUND);
        }
        Lab lab = optionalLab.get();
        if(Objects.nonNull(labRequest.getTitle()) && !"".equalsIgnoreCase(labRequest.getTitle())) {
            lab.setTitle(labRequest.getTitle());
        }
        if(Objects.nonNull(labRequest.getDescription()) && !"".equalsIgnoreCase(labRequest.getDescription())) {
            lab.setDescription(labRequest.getDescription());
        }
        if(Objects.nonNull(labRequest.getGuide()) && !"".equalsIgnoreCase(labRequest.getGuide())) {
            lab.setGuide(labRequest.getGuide());
        }
        if(Objects.nonNull(labRequest.getUrl()) && !"".equalsIgnoreCase(labRequest.getUrl())) {
            lab.setUrl(labRequest.getUrl());
        }
        if(Objects.nonNull(labRequest.getTag()) && !"".equalsIgnoreCase(labRequest.getTag())) {
            lab.setTag(labRequest.getTag());
        }
        lab.setUpdatedAt(Instant.now());
        return labMapper.toResponse(labRepository.save(lab));
    }

    @Override
    public void deleteLab(Integer labId) throws LabCustomException {
        Optional<Lab> optionalLab = labRepository.findById(labId);
        if(optionalLab.isEmpty()) {
            throw new LabCustomException("Lab Not Found", DataUtils.ERROR_LAB_NOT_FOUND);
        }
        labRepository.delete(optionalLab.get());
    }
}
