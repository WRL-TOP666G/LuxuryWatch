package com.example.LuxuryWatch.Dto;

import com.example.LuxuryWatch.Beam.Product;
import com.example.LuxuryWatch.Beam.Review;
import com.example.LuxuryWatch.Beam.User;
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
