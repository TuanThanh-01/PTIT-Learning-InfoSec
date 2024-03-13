package com.ptit.elearningsecurity.service.historyPracticeLab;

import com.ptit.elearningsecurity.common.DataUtils;
import com.ptit.elearningsecurity.data.mapper.LabMapper;
import com.ptit.elearningsecurity.data.mapper.UserMapper;
import com.ptit.elearningsecurity.data.request.HistoryPracticeLabRequest;
import com.ptit.elearningsecurity.data.response.HistoryPracticeLabResponse;
import com.ptit.elearningsecurity.entity.User;
import com.ptit.elearningsecurity.entity.lab.HistoryPracticeLab;
import com.ptit.elearningsecurity.entity.lab.Lab;
import com.ptit.elearningsecurity.exception.LabCustomException;
import com.ptit.elearningsecurity.exception.UserCustomException;
import com.ptit.elearningsecurity.repository.HistoryLabRepository;
import com.ptit.elearningsecurity.repository.LabRepository;
import com.ptit.elearningsecurity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HistoryPracticeLabService implements IHistoryPracticeLabService {
    private final HistoryLabRepository historyLabRepository;
    private final UserRepository userRepository;
    private final LabRepository labRepository;
    private final UserMapper userMapper;
    private final LabMapper labMapper;


    @Override
    public List<HistoryPracticeLabResponse> getHistoryPracticeLab() {
        List<HistoryPracticeLab> historyPracticeLabs = historyLabRepository.findALLHistoryPractice();
        return historyPracticeLabs.stream()
                .map(historyPracticeLab -> {
                    HistoryPracticeLabResponse historyPracticeLabResponse =
                            new HistoryPracticeLabResponse();
                    historyPracticeLabResponse.setId(historyPracticeLab.getId())
                            .setCreatedAt(historyPracticeLab.getCreatedAt())
                            .setUserResponse(userMapper.toResponse(historyPracticeLab.getUser()))
                            .setLabResponse(labMapper.toResponse(historyPracticeLab.getLab()));
                    return historyPracticeLabResponse;
                }).collect(Collectors.toList());
    }

    @Override
    public List<HistoryPracticeLabResponse> getAllHistoryPracticeLabByUser(Integer userId) {
        List<HistoryPracticeLab> historyPracticeLabList = historyLabRepository.findAllByUser(userId);
        return historyPracticeLabList.stream()
                .map(historyPracticeLab -> {
                    HistoryPracticeLabResponse historyPracticeLabResponse =
                            new HistoryPracticeLabResponse();
                    historyPracticeLabResponse.setId(historyPracticeLab.getId())
                            .setCreatedAt(historyPracticeLab.getCreatedAt())
                            .setUserResponse(userMapper.toResponse(historyPracticeLab.getUser()))
                            .setLabResponse(labMapper.toResponse(historyPracticeLab.getLab()));
                    return historyPracticeLabResponse;
                }).collect(Collectors.toList());
    }

    @Override
    public void createHistoryPracticeLab(HistoryPracticeLabRequest historyPracticeLabRequest) throws UserCustomException, LabCustomException {
        Optional<User> userOptional = userRepository.findById(historyPracticeLabRequest.getUserId());
        if(userOptional.isEmpty()) {
            throw new UserCustomException("User Not Found", DataUtils.ERROR_USER_NOT_FOUND);
        }
        Optional<Lab> labOptional = labRepository.findById(historyPracticeLabRequest.getLabId());
        if (labOptional.isEmpty()) {
            throw new LabCustomException("Lab Not Found", DataUtils.ERROR_LAB_NOT_FOUND);
        }
        HistoryPracticeLab historyPracticeLab = new HistoryPracticeLab();
        historyPracticeLab.setUser(userOptional.get())
                .setLab(labOptional.get())
                .setCreatedAt(Instant.now());
        historyLabRepository.save(historyPracticeLab);
    }
}
