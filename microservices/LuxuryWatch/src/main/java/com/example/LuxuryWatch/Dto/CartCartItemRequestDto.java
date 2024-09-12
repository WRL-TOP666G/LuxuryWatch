package com.example.LuxuryWatch.Dto;

import com.example.LuxuryWatch.Beam.CartItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartCartItemRequestDto {
    private int cart_id;
    private CartItem cartItem;
}
