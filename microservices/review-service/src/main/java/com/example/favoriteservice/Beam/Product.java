package com.example.favoriteservice.Beam;

import java.util.Set;

public record Product(int id,
                      String model,
                      String manufacturer,
                      Float price,
                      Integer year,
                      String style,
                      Integer size,
                      String material,
                      String movement,
                      String picture,
                      Integer stock,
                      Set<Review> reviews
) {
}