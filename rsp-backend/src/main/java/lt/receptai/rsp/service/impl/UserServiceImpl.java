package lt.receptai.rsp.service.impl;

import lombok.AllArgsConstructor;
import lt.receptai.rsp.entity.User;
import lt.receptai.rsp.repository.UserRepository;
import lt.receptai.rsp.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Override
    public User addUserToList(Long userId, Long friendId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User friend = userRepository.findById(friendId)
                .orElseThrow(() -> new RuntimeException("Friend not found"));

        user.getFriends().add(friend);
        return userRepository.save(user);
    }

    @Override
    public Set<User> getUserFriends(Long userId) {
        return userRepository.findById(userId)
                .map(User::getFriends)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public Set<User> getUsersWhoAddedMe(Long userId) {
        return userRepository.findUsersWhoAddedMe(userId);
    }

    @Override
    public void deleteUserFromList(Long userId, Long friendId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User friend = userRepository.findById(friendId)
                .orElseThrow(() -> new RuntimeException("Friend not found"));

        user.getFriends().remove(friend);
        userRepository.save(user);
    }

}
