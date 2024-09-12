package com.example.favoriteservice.Dao;

import com.example.favoriteservice.Beam.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteDao  extends JpaRepository<Favorite, Integer> { }
