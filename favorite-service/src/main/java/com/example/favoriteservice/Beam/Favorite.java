package com.example.favoriteservice.Beam;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "LW_FAVORITE")
public class Favorite {
    @Id
    @SequenceGenerator(name = "lw_favorite_seq_gen", sequenceName = "LW_FAVORITE_SEQ", allocationSize = 1)
    @GeneratedValue(generator="lw_favorite_seq_gen", strategy = GenerationType.AUTO)
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
}
