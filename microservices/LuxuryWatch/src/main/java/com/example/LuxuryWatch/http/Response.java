package com.example.LuxuryWatch.http;

import com.example.LuxuryWatch.Beam.CartItem;
import com.example.LuxuryWatch.Beam.Product;
import com.example.LuxuryWatch.Beam.User;
import com.example.LuxuryWatch.Beam.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public class Response {
    private boolean success;
    private int code;
    private String message;
    private User user;
    private UserInfo userInfo;
    private Product product;
    public Response(){ super(); }

    public Response(boolean success) {
        this.success = success;
        this.message = "";
    }

    public Response(boolean success, String message) {
        super();
        this.success = success;
        this.code = success ? 200 : 400;
        this.message = message;
    }




}

