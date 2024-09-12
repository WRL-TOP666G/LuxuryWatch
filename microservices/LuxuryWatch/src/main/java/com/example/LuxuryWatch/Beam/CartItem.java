package com.example.LuxuryWatch.Beam;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "LW_CART_ITEM")
public class CartItem {
    @Id
    @SequenceGenerator(name = "lw_cart_item_seq_gen", sequenceName = "LW_CART_ITEM_SEQ", allocationSize = 1)
    @GeneratedValue(generator="lw_cart_item_seq_gen", strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;
}
