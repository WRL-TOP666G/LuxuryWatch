package com.example.LuxuryWatch.Dao;


import com.example.LuxuryWatch.Beam.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserInfoDao extends JpaRepository<UserInfo,Integer> {

    public Optional<UserInfo> findByName(String name);
    public Optional<UserInfo> findByUserId(int user_id);
    Boolean existsByUserId(int user_id);
}


