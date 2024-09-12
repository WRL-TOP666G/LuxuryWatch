package com.example.favoriteservice.Beam;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "LW_REVIEW")
public class Review {
    @Id
    @SequenceGenerator(name = "lw_review_seq_gen", sequenceName = "LW_REVIEW_SEQ", allocationSize = 1)
    @GeneratedValue(generator="lw_review_seq_gen", strategy = GenerationType.AUTO)
    private int id;

//    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
//    @JoinColumn(name = "user_id")
//    @JsonIgnore
//    private User user;
    private int user_id;

//    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
//    @JoinColumn(name = "product_id")
//    @JsonIgnore
//    private Product product;
    private int product_id;

    private Float rating;
    private String comment;
    private Timestamp review_date;
}

