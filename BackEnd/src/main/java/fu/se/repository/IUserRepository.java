package fu.se.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fu.se.model.User;

@Repository
public interface IUserRepository extends JpaRepository<User,Integer>{
    User findByUsername (String username);
    User findByEmail (String email);
}
