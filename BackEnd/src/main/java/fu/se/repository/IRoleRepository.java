package fu.se.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fu.se.model.Role;

@Repository
public interface IRoleRepository extends JpaRepository<Role,Integer>{
    Role findByRoleID(Integer RoleID);
    Optional<Role> findByTitle(String title);
}
