package com.ptit.elearningsecurity.service.question;

import com.ptit.elearningsecurity.common.DataUtils;
import com.ptit.elearningsecurity.data.mapper.QuestionMapper;
import com.ptit.elearningsecurity.data.request.QuestionRequest;
import com.ptit.elearningsecurity.data.response.QuestionResponse;
import com.ptit.elearningsecurity.entity.quiz.Question;
import com.ptit.elearningsecurity.entity.quiz.Quiz;
import com.ptit.elearningsecurity.exception.QuestionCustomException;
import com.ptit.elearningsecurity.exception.QuizCustomException;
import com.ptit.elearningsecurity.repository.QuestionRepository;
import com.ptit.elearningsecurity.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.util.*;

@Service
@RequiredArgsConstructor
public class QuestionService implements IQuestionService{
    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;
    private final QuestionMapper questionMapper;
    private static final int COLUMN_INDEX_TITLE_QUESTION = 0;
    private static final int COLUMN_INDEX_OPTION1 = 1;
    private static final int COLUMN_INDEX_OPTION2 = 2;
    private static final int COLUMN_INDEX_OPTION3 = 3;
    private static final int COLUMN_INDEX_OPTION4 = 4;
    private static final int COLUMN_INDEX_CORRECT_ANSWER = 5;

    @Override
    public List<QuestionResponse> getAllQuestion() {
        List<Question> questionList = questionRepository.findAll();
        List<QuestionResponse> questionResponses = new ArrayList<>();
        questionList.forEach(question -> {
            QuestionResponse questionResponse = questionMapper.toResponse(question);
            questionResponse.setQuizTitle(question.getQuiz().getName());
            questionResponses.add(questionResponse);
        });
        return questionResponses;
    }

    @Override
    public List<QuestionResponse> getAllQuestionByQuizTitle(String quizTitle) throws QuizCustomException {
        Optional<Quiz> quizOptional = quizRepository.findByName(quizTitle);
        if(quizOptional.isEmpty()) {
            throw new QuizCustomException("Quiz Not Found", DataUtils.ERROR_QUIZ_NOT_FOUND);
        }
        List<QuestionResponse> questionResponses = questionMapper.toQuestionResponses(
                questionRepository.findAllByQuiz(quizOptional.get()));
        questionResponses.forEach(questionResponse -> questionResponse.setQuizTitle(quizTitle));
        return questionResponses;
    }

    @Override
    public QuestionResponse getQuestionById(int questionId) throws QuestionCustomException {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        if(questionOptional.isEmpty()) {
            throw new QuestionCustomException("Question Not Found", DataUtils.ERROR_QUESTION_NOT_FOUND);
        }
        Question question = questionOptional.get();
        QuestionResponse questionResponse = questionMapper.toResponse(question);
        questionResponse.setQuizTitle(question.getQuiz().getName());
        return questionResponse;
    }

    @Override
    public QuestionResponse createQuestion(QuestionRequest questionRequest) throws QuizCustomException {
        Question question = questionMapper.toPojo(questionRequest);
        Optional<Quiz> quizOptional = quizRepository.findByName(questionRequest.getQuizTitle());
        if(quizOptional.isEmpty()) {
            throw new QuizCustomException("Quiz Not Found", DataUtils.ERROR_QUIZ_NOT_FOUND);
        }
        question.setQuiz(quizOptional.get());
        QuestionResponse questionResponse = questionMapper.toResponse(questionRepository.save(question));
        questionResponse.setQuizTitle(questionRequest.getQuizTitle());
        return questionMapper.toResponse(questionRepository.save(question));
    }

    @Override
    public QuestionResponse updateQuestion(QuestionRequest questionRequest, int questionId) throws QuestionCustomException, QuizCustomException {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        if(questionOptional.isEmpty()) {
            throw new QuestionCustomException("Question Not Found", DataUtils.ERROR_QUESTION_NOT_FOUND);
        }
        Question question = questionOptional.get();
        if(Objects.nonNull(questionRequest.getQuestionTitle()) && !"".equalsIgnoreCase(questionRequest.getQuestionTitle())) {
            question.setQuestionTitle(questionRequest.getQuestionTitle());
        }
        if(Objects.nonNull(questionRequest.getOption1()) && !"".equalsIgnoreCase(questionRequest.getOption1())) {
            question.setOption1(questionRequest.getOption1());
        }
        if(Objects.nonNull(questionRequest.getOption2()) && !"".equalsIgnoreCase(questionRequest.getOption2())) {
            question.setOption2(questionRequest.getOption2());
        }
        if(Objects.nonNull(questionRequest.getOption3()) && !"".equalsIgnoreCase(questionRequest.getOption3())) {
            question.setOption3(questionRequest.getOption3());
        }
        if(Objects.nonNull(questionRequest.getOption4()) && !"".equalsIgnoreCase(questionRequest.getOption4())) {
            question.setOption4(questionRequest.getOption4());
        }
        if(Objects.nonNull(questionRequest.getCorrectAnswer()) && !"".equalsIgnoreCase(questionRequest.getCorrectAnswer())) {
            question.setCorrectAnswer(questionRequest.getCorrectAnswer());
        }
        if(Objects.nonNull(questionRequest.getQuizTitle()) && !"".equalsIgnoreCase(questionRequest.getQuizTitle())) {
            Optional<Quiz> quizOptional = quizRepository.findByName(questionRequest.getQuizTitle());
            if(quizOptional.isEmpty()) {
                throw new QuizCustomException("Quiz Not Found", DataUtils.ERROR_QUIZ_NOT_FOUND);
            }
            question.setQuiz(quizOptional.get());
        }
        question.setUpdatedAt(Instant.now());
        QuestionResponse questionResponse = questionMapper.toResponse(questionRepository.save(question));
        questionResponse.setQuizTitle(question.getQuiz().getName());
        return questionResponse;
    }

    @Override
    public void deleteQuestion(int questionId) throws QuestionCustomException {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        if(questionOptional.isEmpty()) {
            throw new QuestionCustomException("Question Not Found", DataUtils.ERROR_QUESTION_NOT_FOUND);
        }
        questionRepository.delete(questionOptional.get());
    }

    @Override
    public List<QuestionResponse> saveAllQuestionByExcel(MultipartFile file, String quizTitle) throws QuizCustomException, IOException {
        Optional<Quiz> quizOptional = quizRepository.findByName(quizTitle);
        if(quizOptional.isEmpty()) {
            throw new QuizCustomException("Quiz Not Found", DataUtils.ERROR_QUIZ_NOT_FOUND);
        }
        List<Question> questions = new ArrayList<>();
        Workbook workbook = getWorkbook(file.getInputStream(), Objects.requireNonNull(file.getOriginalFilename()));
        Sheet sheet = workbook.getSheetAt(0);

        Iterator<Row> iterator = sheet.iterator();
        while (iterator.hasNext()) {
            Row nextRow = iterator.next();
            if (nextRow.getRowNum() == 0) {
                continue;
            }
            // Get all cells
            Iterator<Cell> cellIterator = nextRow.cellIterator();
            // Read cells and set value for book object
            Question question = new Question();
            while (cellIterator.hasNext()) {
                //Read cell
                Cell cell = cellIterator.next();
                Object cellValue = getCellValue(cell);
                if (cellValue == null || cellValue.toString().isEmpty()) {
                    continue;
                }
                // Set value for book object
                int columnIndex = cell.getColumnIndex();
                switch (columnIndex) {
                    case COLUMN_INDEX_TITLE_QUESTION:
                        question.setQuestionTitle((String) getCellValue(cell));
                        break;
                    case COLUMN_INDEX_OPTION1:
                        question.setOption1((String) getCellValue(cell));
                        break;
                    case COLUMN_INDEX_OPTION2:
                        question.setOption2((String) getCellValue(cell));
                        break;
                    case COLUMN_INDEX_OPTION3:
                        question.setOption3((String) getCellValue(cell));
                        break;
                    case COLUMN_INDEX_OPTION4:
                        question.setOption4((String) getCellValue(cell));
                        break;
                    case COLUMN_INDEX_CORRECT_ANSWER:
                        question.setCorrectAnswer((String) getCellValue(cell));
                        break;
                    default:
                        break;
                }
            }
            questions.add(question);
        }
        Quiz quiz = quizOptional.get();
        questions.forEach(question -> {
            question.setQuiz(quiz);
            question.setCreatedAt(Instant.now());
        });
        questionRepository.saveAll(questions);
        List<QuestionResponse> lstQuestionResponse = questionMapper.toQuestionResponses(questions);
        lstQuestionResponse.forEach(questionResponse -> questionResponse.setQuizTitle(quizTitle));
        return lstQuestionResponse;
    }

    private static Workbook getWorkbook(InputStream inputStream, String excelFilePath) throws IOException {
        Workbook workbook = null;
        if (excelFilePath.endsWith("xlsx")) {
            workbook = new XSSFWorkbook(inputStream);
        } else if (excelFilePath.endsWith("xls")) {
            workbook = new HSSFWorkbook(inputStream);
        } else {
            throw new IllegalArgumentException("The specified file is not Excel file");
        }
        return workbook;
    }

    private static Object getCellValue(Cell cell) {
        CellType cellType = cell.getCellTypeEnum();
        Object cellValue = null;
        switch (cellType) {
            case BOOLEAN:
                cellValue = cell.getBooleanCellValue();
                break;
            case FORMULA:
                Workbook workbook = cell.getSheet().getWorkbook();
                FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
                cellValue = evaluator.evaluate(cell).getNumberValue();
                break;
            case NUMERIC:
                cellValue = cell.getNumericCellValue();
                break;
            case STRING:
                cellValue = cell.getStringCellValue();
                break;
            case _NONE:
            case BLANK:
            case ERROR:
                break;
            default:
                break;
        }
        return cellValue;
    }
}
