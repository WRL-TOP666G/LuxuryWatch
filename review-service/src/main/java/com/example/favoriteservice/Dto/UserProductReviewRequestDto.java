package com.example.favoriteservice.Dto;

import com.example.favoriteservice.Beam.Product;
import com.example.favoriteservice.Beam.Review;
import com.example.favoriteservice.Beam.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProductReviewRequestDto {
    private User user;
    private Product product;
    private Review review;
}
