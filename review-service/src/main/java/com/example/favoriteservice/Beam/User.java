package com.example.favoriteservice.Beam;

import java.util.List;


public record User(int id, String username, String password, List<Role> roles) {
}

