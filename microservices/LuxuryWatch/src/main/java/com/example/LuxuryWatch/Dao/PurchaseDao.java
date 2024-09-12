package com.example.LuxuryWatch.Dao;

import com.example.LuxuryWatch.Beam.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PurchaseDao extends JpaRepository<Purchase,Integer> {

    Optional<List<Purchase>> getPurchaseListByOrderId(int order_id);
}
