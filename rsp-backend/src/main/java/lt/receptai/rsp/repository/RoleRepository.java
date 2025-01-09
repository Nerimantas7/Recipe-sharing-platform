package lt.receptai.rsp.repository;

import lt.receptai.rsp.entity.Role;
import lt.receptai.rsp.entity.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(RoleType name);
}
