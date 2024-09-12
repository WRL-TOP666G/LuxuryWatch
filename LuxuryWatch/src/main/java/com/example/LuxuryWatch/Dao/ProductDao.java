package com.example.LuxuryWatch.Dao;

import com.example.LuxuryWatch.Beam.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDao extends JpaRepository<Product, Integer> {
}
