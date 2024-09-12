package com.example.LuxuryWatch.Beam;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "LW_ROLE")
public class Role implements GrantedAuthority {
    @Id
    @SequenceGenerator(name = "lw_role_seq_gen", sequenceName = "LW_ROLE_SEQ", allocationSize = 1)
    @GeneratedValue(generator="lw_role_seq_gen", strategy = GenerationType.AUTO)
    private int id;
    private String type;


    @Override
    public String getAuthority() {
        return this.type;
    }
}
