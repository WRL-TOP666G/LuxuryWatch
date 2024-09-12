package com.example.favoriteservice.Dao;

import com.example.favoriteservice.Beam.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewDao  extends JpaRepository<Review, Integer> { }
