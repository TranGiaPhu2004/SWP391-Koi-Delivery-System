package fu.se.repository;

import java.beans.JavaBean;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fu.se.model.User;

@JavaBean
@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
}
