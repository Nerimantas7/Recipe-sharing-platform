package lt.receptai.rsp.service.impl;

import lombok.AllArgsConstructor;
import lt.receptai.rsp.dto.MessageDto;
import lt.receptai.rsp.entity.Message;
import lt.receptai.rsp.entity.User;
import lt.receptai.rsp.repository.MessageRepository;
import lt.receptai.rsp.repository.UserRepository;
import lt.receptai.rsp.service.MessageService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MessageServiceImpl implements MessageService {

    private MessageRepository messageRepository;
    private UserRepository userRepository;
    private ModelMapper modelMapper;

    @Override
    public Message sendMessage(MessageDto messageDto) {
        User sender = userRepository.findById(messageDto.getSenderId())
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(messageDto.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        Message message = modelMapper.map(messageDto, Message.class);
        message.setSender(sender);
        message.setReceiver(receiver);

        return messageRepository.save(message);
    }
}
