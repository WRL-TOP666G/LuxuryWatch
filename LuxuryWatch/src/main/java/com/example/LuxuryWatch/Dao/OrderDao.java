package com.example.LuxuryWatch.Dao;

import com.example.LuxuryWatch.Beam.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderDao extends JpaRepository<Order, Integer> {
    public Optional<Order> findByUserId(int user_id);
}
