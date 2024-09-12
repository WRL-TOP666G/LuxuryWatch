package com.example.LuxuryWatch.Auth;

import com.example.LuxuryWatch.Beam.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private boolean success;
    private User user;
    private String token;
}
