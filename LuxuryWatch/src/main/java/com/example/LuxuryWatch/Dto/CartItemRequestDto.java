package com.example.LuxuryWatch.Dto;

import com.example.LuxuryWatch.Beam.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartItemRequestDto {
    private int user_id;
    private Product product;
    private int quantity;
}
