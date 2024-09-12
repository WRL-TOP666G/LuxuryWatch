package com.example.LuxuryWatch.Controller;


import com.example.LuxuryWatch.Beam.Purchase;
import com.example.LuxuryWatch.Dto.CartItemsUserIdRequestDto;
import com.example.LuxuryWatch.Service.PurchaseSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/purchase")
public class PurchaseController {

    @Autowired
    private PurchaseSerivce purchaseSerivce;

    @GetMapping("getAll")
    public List<Purchase> getAll(){ return purchaseSerivce.getAll();}

    @GetMapping("/getPurchaseList/{user_id}")
    public List<Purchase> getPurchaseList(@PathVariable int user_id){
        System.out.println("+++++++++++++++++++");
        System.out.println(user_id);
        System.out.println("+++++++++++++++++++");
        return purchaseSerivce.getPurchaseList(user_id);
    }
//    @PostMapping("/create")
//    public ResponseEntity create(CartItemsUserIdRequestDto cartItemsUserIdRequestDto){
//        return purchaseSerivce.create(cartItemsUserIdRequestDto);
//    }

    @PutMapping("/cancel/{id}")
    public Purchase cancelPurchase(@PathVariable int id){
        return purchaseSerivce.cancelPurchase(id);
    }

    @PutMapping("/complete/{id}")
    public Purchase completePurchase(@PathVariable int id){
        return purchaseSerivce.completePurchase(id);
    }
}
