package com.example.LuxuryWatch.Dao;

import com.example.LuxuryWatch.Beam.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartDao extends JpaRepository<Cart, Integer> {

    public Optional<List<Cart>> findByUserId(int user_id);

}
