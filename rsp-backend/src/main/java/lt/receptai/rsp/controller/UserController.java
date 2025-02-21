package lt.receptai.rsp.controller;

import lombok.AllArgsConstructor;
import lt.receptai.rsp.dto.MessageDto;
import lt.receptai.rsp.entity.Message;
import lt.receptai.rsp.entity.User;
import lt.receptai.rsp.repository.MessageRepository;
import lt.receptai.rsp.repository.UserRepository;
import lt.receptai.rsp.service.MessageService;
import lt.receptai.rsp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@CrossOrigin("*")
@RestController
@RequestMapping("api/users")
@AllArgsConstructor
public class UserController {

    private UserService userService;
    private MessageService messageService;

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/{userId}/add/{friendId}")
    public User addUserToList(@PathVariable Long userId, @PathVariable Long friendId) {
        return userService.addUserToList(userId, friendId);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/{userId}/friends")
    public Set<User> getUserFriends(@PathVariable Long userId) {
        return userService.getUserFriends(userId);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/{userId}/addedBy")
    public ResponseEntity<Set<User>> getUsersWhoAddedMe(@PathVariable Long userId) {
        Set<User> users = userService.getUsersWhoAddedMe(userId);
        return ResponseEntity.ok(users);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/{userId}/remove/{friendId}")
    public ResponseEntity<String> deleteUserFromList(@PathVariable Long userId, @PathVariable Long friendId){
        userService.deleteUserFromList(userId, friendId);
        return ResponseEntity.ok("Friend removed successfully!");
    }

    @PostMapping("/{senderId}/message/{receiverId}")
    public ResponseEntity<Message> sendMessage(
            @PathVariable Long senderId, @PathVariable Long receiverId,
            @RequestBody MessageDto messageDto) {
        messageDto.setSenderId(senderId);
        messageDto.setReceiverId(receiverId);
        Message sentMessage = messageService.sendMessage(messageDto);

        return ResponseEntity.ok(sentMessage);
    }

}
