package com.example.LuxuryWatch.Beam;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "LW_PURCHASE")
public class Purchase {
    @Id
    @SequenceGenerator(name = "lw_purchase_seq_gen", sequenceName = "LW_PURCHASE_SEQ", allocationSize = 1)
    @GeneratedValue(generator="lw_purchase_seq_gen", strategy = GenerationType.AUTO)
    private int id;

    private int quantity;


    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH) // None of them will be cascaded
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "user_id")
    private User user;

    private Timestamp purchase_date;

    private String status;
}
