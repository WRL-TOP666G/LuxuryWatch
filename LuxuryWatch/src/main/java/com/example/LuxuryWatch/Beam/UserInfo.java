package com.example.LuxuryWatch.Beam;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "LW_USER_INFO")
public class UserInfo {
    @Id
    @SequenceGenerator(name = "lw_user_info_seq_gen", sequenceName = "LW_USER_INFO_SEQ", allocationSize = 1)
    @GeneratedValue(generator="lw_user_info_seq_gen", strategy = GenerationType.AUTO)
    private int id;

    private String name;
    private String phone;
    private String email;
    private String address1;
    private String address2;
    private String city;
    private String state;
    private Integer zip;

    // private int user_id;
    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
    private boolean membership;
}
