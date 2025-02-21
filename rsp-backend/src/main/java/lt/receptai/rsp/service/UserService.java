package lt.receptai.rsp.service;

import lt.receptai.rsp.entity.User;

import java.util.Set;

public interface UserService {

    User addUserToList(Long userId, Long friendId);

    Set<User> getUserFriends(Long userId);

    Set<User> getUsersWhoAddedMe(Long userId);

    void deleteUserFromList(Long userId, Long friendId);
}
