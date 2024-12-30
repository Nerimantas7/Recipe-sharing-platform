package lt.receptai.rsp.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class RecipeAPIException extends RuntimeException{

    private HttpStatus status;
    private String message;
}
