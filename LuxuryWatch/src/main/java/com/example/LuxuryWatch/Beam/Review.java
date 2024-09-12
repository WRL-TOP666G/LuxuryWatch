package com.example.LuxuryWatch.Beam;

import java.sql.Timestamp;

public record Review(int id,
                     int user_id,
                     int product_id,
                     Float rating,
                     String comment,
                     Timestamp review_date){}

