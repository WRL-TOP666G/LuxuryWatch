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

//    public DataResponse(String message, T data) {
//        super(message);
//        this.data = data;
//    }
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

    public Response(boolean success, User user) {
        super();
        this.success = success;
        this.user = user;
    }

    public Response(boolean success, UserInfo userInfo) {
        super();
        this.success = success;
        this.userInfo = userInfo;
    }

    public Response(boolean success, Product product){
        super();
        this.success = success;
        this.product = product;
    }

//    public Response(boolean success, int code, String message) {
//        super();
//        this.success = success;
//        this.code = code;
//        this.message = message;
//    }
//    public Response(String message) {
//        this.success = true;
//        this.message = message;
//    }
//    public DataResponse(boolean success, String message) {
//        super(success, message);
//        this.data = null;
//    }

}

