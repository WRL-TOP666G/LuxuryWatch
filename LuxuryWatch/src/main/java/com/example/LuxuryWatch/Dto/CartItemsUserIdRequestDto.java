package com.example.LuxuryWatch.Dto;


import com.example.LuxuryWatch.Beam.CartItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartItemsUserIdRequestDto {
    int user_id;
    List<CartItem> cartItems;
}
