package com.example.LuxuryWatch.Service;


import com.example.LuxuryWatch.Beam.CartItem;
import com.example.LuxuryWatch.Beam.Order;
import com.example.LuxuryWatch.Beam.Purchase;
import com.example.LuxuryWatch.Dao.OrderDao;
import com.example.LuxuryWatch.Dao.PurchaseDao;
import com.example.LuxuryWatch.Dto.CartItemsUserIdRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PurchaseSerivce {
    @Autowired
    private PurchaseDao purchaseDao;
    @Autowired
    private OrderDao orderDao;

    public List<Purchase> create(List<CartItem> cartItemList, Order order, java.sql.Timestamp timestamp){
        List<Purchase> purchaseList = new ArrayList<>();
        for(CartItem cartItem: cartItemList){
            Purchase purchase = new Purchase();
            purchase.setQuantity(cartItem.getQuantity());
            purchase.setProduct(cartItem.getProduct());
            purchase.setOrder(order);
            purchase.setStatus("Pending");
            purchase.setPurchase_date(timestamp);
            purchaseDao.save(purchase);
            purchaseList.add(purchase);
        }
        return purchaseList;
    }

    public List<Purchase> getAll(){ return purchaseDao.findAll(); }

    public List<Purchase> getPurchaseList(int user_id){
//        System.out.println(user_id);
        Order order = orderDao.findByUserId(user_id).get();
        List<Purchase> purchaseList= purchaseDao.findAll().stream().filter((res)->{
            return res.getOrder().getId() == order.getId();
        }).collect(Collectors.toList());

        return purchaseList;
    }


    public Purchase cancelPurchase(int id){
        Purchase foundPurchase = purchaseDao.findById(id).get();
        foundPurchase.setStatus("Cancel");
        purchaseDao.save(foundPurchase);
        return foundPurchase;
    }

    public Purchase completePurchase(int id){
        Purchase foundPurchase = purchaseDao.findById(id).get();
        foundPurchase.setStatus("Complete");
        purchaseDao.save(foundPurchase);
        return foundPurchase;
    }

}
