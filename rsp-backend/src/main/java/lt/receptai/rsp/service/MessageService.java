package lt.receptai.rsp.service;

import lt.receptai.rsp.dto.MessageDto;
import lt.receptai.rsp.entity.Message;

public interface MessageService {

    Message sendMessage(MessageDto messageDto);

}
