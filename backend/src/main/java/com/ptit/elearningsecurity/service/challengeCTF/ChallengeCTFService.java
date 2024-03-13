package com.ptit.elearningsecurity.service.challengeCTF;

import com.ptit.elearningsecurity.common.DataUtils;
import com.ptit.elearningsecurity.data.dto.ChallengeCTFResponseDTO;
import com.ptit.elearningsecurity.data.mapper.ChallengeCTFMapper;
import com.ptit.elearningsecurity.data.request.ChallengeCTFRequest;
import com.ptit.elearningsecurity.data.response.ChallengeCTFResponse;
import com.ptit.elearningsecurity.entity.labCTF.ChallengeCTF;
import com.ptit.elearningsecurity.exception.ChallengeCTFCustomException;
import com.ptit.elearningsecurity.repository.ChallengeCTFRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
//import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChallengeCTFService implements IChallengeCTFService {
    private final ChallengeCTFRepository challengeCTFRepository;
    private final ChallengeCTFMapper challengeCTFMapper;
    private static final Path ROOT = Paths.get("uploads");

    @Override
    public List<ChallengeCTFResponseDTO> getAllChallengeCTFByUser(int userId) {
        return challengeCTFRepository.findAllChallengeCTFResponseDTOByUser(userId);
    }

    @Override
    public List<ChallengeCTFResponse> getAllChallengeCTF() {
        List<ChallengeCTF> challengeCTFList = challengeCTFRepository.findAll();
        return challengeCTFMapper.toListResponse(challengeCTFList);
    }

    @Override
    public List<ChallengeCTFResponse> getAllChallengeCTFResolveByUser(int userId) {
        List<ChallengeCTF> challengeCTFList = challengeCTFRepository.findAllChallengeCTFResolvedByUser(userId);
        return challengeCTFMapper.toListResponse(challengeCTFList);
    }

    @Override
    public List<ChallengeCTFResponse> getRandomChallengeCTF() {
        List<ChallengeCTF> lstChallengeCTF = challengeCTFRepository.findRandomChallengeCTF();
        return challengeCTFMapper.toListResponse(lstChallengeCTF);
    }

    @Override
    public ChallengeCTFResponse getChallengeCTFById(Integer challengeCTFId) throws ChallengeCTFCustomException {
        Optional<ChallengeCTF> challengeCTFOptional = challengeCTFRepository.findById(challengeCTFId);
        if (challengeCTFOptional.isEmpty()) {
            throw new ChallengeCTFCustomException("Challenge CTF Not Found",
                    DataUtils.ERROR_CHALLENGE_CTF_NOT_FOUND);
        }
        return challengeCTFMapper.toResponse(challengeCTFOptional.get());
    }

    @Override
    public String getFlagCTFById(Integer challengeCTFId) throws ChallengeCTFCustomException {
        Optional<ChallengeCTF> challengeCTFOptional = challengeCTFRepository.findById(challengeCTFId);
        if (challengeCTFOptional.isEmpty()) {
            throw new ChallengeCTFCustomException("Challenge CTF Not Found",
                    DataUtils.ERROR_CHALLENGE_CTF_NOT_FOUND);
        }
        return challengeCTFOptional.get().getFlag();
    }

    @Override
    public ChallengeCTFResponse createChallengeCTF(ChallengeCTFRequest challengeCTFRequest, MultipartFile file) throws IOException {
        ChallengeCTF challengeCTF = challengeCTFMapper.toPojo(challengeCTFRequest);
        challengeCTF.setTotalSolve(0);
        challengeCTF.setFlag("CTF_PTIT_FLAG{" + challengeCTFRequest.getFlag() + "}");
        if (Objects.nonNull(file)) {
            String filePath = uploadFile(file);
            challengeCTF.setUrlFile(filePath);
        }
        ChallengeCTF challengeCTFSaved = challengeCTFRepository.save(challengeCTF);
        return challengeCTFMapper.toResponse(challengeCTFSaved);
    }

    @Override
    public Resource load(String filename) {
        try {
            Path file = ROOT.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }


    private String uploadFile(MultipartFile file) throws IOException {
        if(!Files.exists(ROOT)) {
            Files.createDirectories(ROOT);
        }
        String filename = RandomStringUtils.randomAlphanumeric(8) + "-" + file.getOriginalFilename();
        Path filePath = ROOT.resolve(filename);
        try(OutputStream os = Files.newOutputStream(filePath)){
            os.write(file.getBytes());
        }
        return filename;
    }

    public void deleteFile(String filename) throws IOException {
        Path filePath = ROOT.resolve(filename);
        Files.deleteIfExists(filePath);
    }

    @Override
    public ChallengeCTFResponse updateChallengeCTF(
            Integer challengeCTFId,
            ChallengeCTFRequest challengeCTFRequest,
            MultipartFile file) throws ChallengeCTFCustomException, IOException {
        Optional<ChallengeCTF> challengeCTFOptional = challengeCTFRepository.findById(challengeCTFId);
        if (challengeCTFOptional.isEmpty()) {
            throw new ChallengeCTFCustomException("Challenge CTF Not Found",
                    DataUtils.ERROR_CHALLENGE_CTF_NOT_FOUND);
        }
        ChallengeCTF challengeCTF = challengeCTFOptional.get();
        if (Objects.nonNull(challengeCTFRequest.getTitle()) && !"".equalsIgnoreCase(challengeCTFRequest.getTitle())) {
            challengeCTF.setTitle(challengeCTFRequest.getTitle());
        }
        if (Objects.nonNull(challengeCTFRequest.getContent()) && !"".equalsIgnoreCase(challengeCTFRequest.getContent())) {
            challengeCTF.setContent(challengeCTFRequest.getContent());
        }
        if (Objects.nonNull(challengeCTFRequest.getLevel()) && !"".equalsIgnoreCase(challengeCTFRequest.getLevel())) {
            challengeCTF.setLevel(challengeCTFRequest.getLevel());
        }
        if (Objects.nonNull(challengeCTFRequest.getTag()) && !"".equalsIgnoreCase(challengeCTFRequest.getTag())) {
            challengeCTF.setTag(challengeCTFRequest.getTag());
        }
        if (Objects.nonNull(challengeCTFRequest.getHint()) && !"".equalsIgnoreCase(challengeCTFRequest.getHint())) {
            challengeCTF.setHint(challengeCTFRequest.getHint());
        }
        if (Objects.nonNull(challengeCTFRequest.getFlag()) && !"".equalsIgnoreCase(challengeCTFRequest.getFlag())) {
            challengeCTF.setFlag(challengeCTFRequest.getFlag());
        }
        if (Objects.nonNull(challengeCTFRequest.getPoint()) && challengeCTFRequest.getPoint() > 0) {
            challengeCTF.setPoint(challengeCTFRequest.getPoint());
        }
        if(Objects.nonNull(file)) {
            if(Objects.nonNull(challengeCTF.getUrlFile())) {
                deleteFile(challengeCTF.getUrlFile());
            }
            String filePath = uploadFile(file);
            challengeCTF.setUrlFile(filePath);
        }
        challengeCTF.setUpdatedAt(Instant.now());
        challengeCTFRepository.save(challengeCTF);
        return challengeCTFMapper.toResponse(challengeCTF);
    }

    @Override
    public ChallengeCTFResponse updateTotalSolveChallengeCTF(Integer challengeCTFId) throws ChallengeCTFCustomException {
        Optional<ChallengeCTF> challengeCTFOptional = challengeCTFRepository.findById(challengeCTFId);
        if (challengeCTFOptional.isEmpty()) {
            throw new ChallengeCTFCustomException("Challenge CTF Not Found",
                    DataUtils.ERROR_CHALLENGE_CTF_NOT_FOUND);
        }
        ChallengeCTF challengeCTF = challengeCTFOptional.get();
        challengeCTF.setTotalSolve(challengeCTF.getTotalSolve() + 1);
        challengeCTFRepository.save(challengeCTF);
        return challengeCTFMapper.toResponse(challengeCTF);
    }

    @Override
    public void deleteChallengeCTF(Integer challengeCTFId) throws ChallengeCTFCustomException, IOException {
        Optional<ChallengeCTF> challengeCTFOptional = challengeCTFRepository.findById(challengeCTFId);
        if (challengeCTFOptional.isEmpty()) {
            throw new ChallengeCTFCustomException("Challenge CTF Not Found",
                    DataUtils.ERROR_CHALLENGE_CTF_NOT_FOUND);
        }
        ChallengeCTF challengeCTF = challengeCTFOptional.get();
        if(Objects.nonNull(challengeCTF.getUrlFile())) {
            deleteFile(challengeCTFOptional.get().getUrlFile());
        }
        challengeCTFRepository.delete(challengeCTFOptional.get());
    }
}
