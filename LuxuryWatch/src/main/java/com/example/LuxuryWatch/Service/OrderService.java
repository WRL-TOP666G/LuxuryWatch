package com.example.LuxuryWatch.Service;

import com.example.LuxuryWatch.Beam.*;
import com.example.LuxuryWatch.Dao.*;
import com.example.LuxuryWatch.Dto.CartItemsUserIdRequestDto;
import com.example.LuxuryWatch.http.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private CartDao cartDao;

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private PurchaseDao purchaseDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private PurchaseSerivce purchaseSerivce;

    public List<Order> getAll(){
        return orderDao.findAll();
    }

    public Order getOrderById(Integer id) {
        return orderDao.findById(id).get();
    }


    public ResponseEntity create(User user){
        try{
            Order order = new Order();
            order.setPurchase_date(null);
            order.setUser(user);
            order.setPurchases(null);
            orderDao.save(order);

            return ResponseEntity.ok(user);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.ofNullable(user);
        }
    }

    public ResponseEntity update(int cart_id){
        try {
            // Timestamp
            long timestampInMillis = System.currentTimeMillis(); // Replace this with your actual long timestamp value
            java.sql.Timestamp timestamp = new java.sql.Timestamp(timestampInMillis);
            // Info: Cart, User, CartItemList
            Cart cartFind = cartDao.findById(cart_id).get();
            int user_id = cartFind.getUser().getId();
            User user = userDao.findById(user_id).get();
            List<CartItem> cartItemList = cartFind.getCartItems();
            // Order
            Order order = orderDao.findByUserId(user_id).get();
            order.setUser(user);
            order.setPurchase_date(timestamp);
            List<Purchase> purchaseList = purchaseSerivce.create(cartItemList, order, timestamp);
            order.setPurchases(purchaseList);
            orderDao.save(order);
            return ResponseEntity.ok().body(cart_id);
        } catch (Exception e) {
            return ResponseEntity.ofNullable(cart_id);
        }

    }
//    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
//    public ResponseEntity create(CartItemsUserIdRequestDto cartItemsUserIdRequestDto) {
//        Order order = null;
//        long timestampInMillis = System.currentTimeMillis(); // Replace this with your actual long timestamp value
//        java.sql.Timestamp timestamp = new java.sql.Timestamp(timestampInMillis);
////
//        System.out.println(timestampInMillis);
////
////        int user_id = Integer.valueOf(cartItemsUserIdRequestDto.getUser_id());
////        CartItem[] cartItems = cartItemsUserIdRequestDto.getCartItems();
//        int user_id = cartItemsUserIdRequestDto.getUser_id();
////        TODO: fix, -> cartItems = cartItemsUserIdRequestDto.getCartItems();
//        try {
//            User user = userDao.findById(user_id).get();
//            order = new Order();
//            order.setUser(user);
//            order.setPurchase_date(timestamp);
//
//            //        TODO: fix, -> List<Purchase> purchaseList = purchaseSerivce.create(cartItems, order);
//
//            //        TODO: fix, -> order.setPurchases(purchaseList);
//            orderDao.save(order);
//            return ResponseEntity.ok().body(user_id);
//        } catch (Exception e) {
//            return ResponseEntity.ofNullable(user_id);
//        }
//    }

    public ResponseEntity create2(int cart_id) {
//        long timestampInMillis = System.currentTimeMillis(); // Replace this with your actual long timestamp value
//        java.sql.Timestamp timestamp = new java.sql.Timestamp(timestampInMillis);


        Cart cartFind = cartDao.findById(cart_id).get(); // V
        int user_id = cartFind.getUser().getId();
        User user = userDao.findById(user_id).get(); // V
        List<CartItem> cartItemList = cartFind.getCartItems(); // V


        try {
            Order order = new Order();
            order.setUser(user);
            // order.setPurchase_date(timestamp);

//            List<Purchase> purchaseList = purchaseSerivce.create(cartItemList, order);

            order.setPurchases(null);
            orderDao.save(order);
            return ResponseEntity.ok().body(cart_id);
        } catch (Exception e) {
            return ResponseEntity.ofNullable(cart_id);
        }

    }
    public Response edit(Order order) {
        try {
            // order: transient object
            Order o = (Order) orderDao.findById(order.getId()).get();

            //logic : modify o, make it looks the same as input order
            List<Purchase> purchasesToRemove = o.getPurchases();

            List<Purchase> purchases = order.getPurchases();
            // handled update and add products in order
            purchases.forEach((orderProduct) -> {
                Product product = (Product) productDao.findById(orderProduct.getProduct().getId()).get();
                orderProduct.setProduct(product);
                orderProduct.setOrder(o);
            });

            // handle remove products in order
            if(purchases.size() > 0) {
                purchasesToRemove = purchasesToRemove.stream().filter((purchase) -> {
                    return !purchases.contains(purchase);
                }).collect(Collectors.toList());
            }

            o.setPurchases(purchases);
            // logic til here

            orderDao.save(o);

            deleteOrderProducts(purchasesToRemove);

            return new Response(true);
        } catch (Exception e) {
            System.out.println(e);
            return new Response(false);
        }
    }



    public void deleteOrderProducts(List<Purchase> purchases) {
        purchaseDao.deleteAll(purchases);
    }
}
