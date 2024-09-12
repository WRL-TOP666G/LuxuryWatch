package com.example.LuxuryWatch.Beam;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "LW_ORDER")
public class Order {
    @Id
    @SequenceGenerator(name = "lw_order_seq_gen", sequenceName = "LW_ORDER_SEQ", allocationSize = 1)
    @GeneratedValue(generator="lw_order_seq_gen", strategy = GenerationType.AUTO)
    private int id;

    private Timestamp purchase_date;

    // private int user_id;
    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "order")
    private List<Purchase> purchases;

}
