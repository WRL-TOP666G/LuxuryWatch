package com.example.LuxuryWatch.Beam;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "LW_CART")
public class Cart {
    @Id
    @SequenceGenerator(name = "lw_cart_seq_gen", sequenceName = "LW_CART_SEQ", allocationSize = 1)
    @GeneratedValue(generator="lw_cart_seq_gen", strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.DETACH, mappedBy = "cart")
    @JsonIgnore
    private List<CartItem> cartItems;

    private CartStatus status;

}
