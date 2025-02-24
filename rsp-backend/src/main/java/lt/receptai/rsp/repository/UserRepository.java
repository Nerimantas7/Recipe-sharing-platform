package lt.receptai.rsp.repository;

import lt.receptai.rsp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String userName);

    Boolean existsByEmail(String email);

    Optional<User> findByUsernameOrEmail(String username, String email);

    Boolean existsByUsername(String userName);

    @Query("SELECT u FROM User u JOIN u.friends f WHERE f.id = :userId")
    Set<User> findUsersWhoAddedMe(@Param("userId") Long userId);

    @Query("SELECT u FROM User u LEFT JOIN u.recipes r WHERE u.id = :userId")
    Optional<User> findUserWithRecipes(@Param("userId") Long userId);

}
