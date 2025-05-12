package com.zosh.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobelExeptions {
	
	
	@ExceptionHandler(UserException.class)
	public ResponseEntity<ErrorDetails> userExceptionHandler(UserException ue,
			WebRequest req){
		ErrorDetails error=new ErrorDetails(ue.getMessage(),
				req.getDescription(false),
				LocalDateTime.now());
		return new ResponseEntity<ErrorDetails>(error,HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<ErrorDetails> handleRuntimeException(RuntimeException ex, WebRequest request) {
		ErrorDetails error = new ErrorDetails(ex.getMessage(),
				request.getDescription(false),
				LocalDateTime.now());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetails> handleOtherExceptions(Exception ex, WebRequest request) {
		ErrorDetails error = new ErrorDetails(ex.getMessage(),
				request.getDescription(false),
				LocalDateTime.now());
		return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
