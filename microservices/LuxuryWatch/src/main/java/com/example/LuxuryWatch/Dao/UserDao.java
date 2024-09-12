package com.example.LuxuryWatch.Dao;

import com.example.LuxuryWatch.Beam.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDao extends JpaRepository<User,Integer> {
    public User findByUsername(String username);
    Boolean existsByUsername(String username);

}
