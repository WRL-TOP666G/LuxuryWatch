package com.example.LuxuryWatch.Dao;

import com.example.LuxuryWatch.Beam.Cart;
import com.example.LuxuryWatch.Beam.CartItem;
import com.example.LuxuryWatch.Beam.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemDao extends JpaRepository<CartItem, Integer> {

    public Optional<CartItem> getById(int id);
}
