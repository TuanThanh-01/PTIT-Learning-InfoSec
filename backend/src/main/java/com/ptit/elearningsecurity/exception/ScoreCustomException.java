package com.ptit.elearningsecurity.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class ScoreCustomException extends Exception{
    private String errorCode;

    public ScoreCustomException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}
