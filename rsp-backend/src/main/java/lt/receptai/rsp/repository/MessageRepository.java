package lt.receptai.rsp.repository;

import lt.receptai.rsp.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
