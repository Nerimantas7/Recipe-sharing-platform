package lt.receptai.rsp.dto;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.receptai.rsp.entity.User;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {

    private Long id;

    @NotNull(message = "Sender ID cannot be null.")
    private Long senderId;

    @NotNull(message = "Receiver ID cannot be null.")
    private Long receiverId;

    @NotNull(message = "Message cannot be empty.")
    @Column(name = "messages", nullable = false, length = 500) // Updated length
    @Size(min = 3, max = 500, message = "Message must be between 3 and 500 characters.")
    private String content;

}
