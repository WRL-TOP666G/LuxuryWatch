package com.example.LuxuryWatch.Beam;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "LW_USER")
public class User implements UserDetails {
    @Id
    @SequenceGenerator(name = "lw_user_seq_gen", sequenceName = "LW_USER_SEQ", allocationSize = 1)
    @GeneratedValue(generator="lw_user_seq_gen", strategy = GenerationType.AUTO)
    private int id;
    private String username;
    private String password;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinTable(
            name = "LW_USER_ROLE",
            joinColumns = {//user join to this table
                    @JoinColumn(name = "user_id", referencedColumnName = "id")},
            inverseJoinColumns = { //role join to this table
                    @JoinColumn(name = "role_id",referencedColumnName = "id" )}
    )
    private List<Role> roles;

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}
