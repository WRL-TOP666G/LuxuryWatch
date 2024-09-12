package com.example.LuxuryWatch.Service;


import com.example.LuxuryWatch.Beam.*;
import com.example.LuxuryWatch.Dao.CartDao;
import com.example.LuxuryWatch.Dao.CartItemDao;
import com.example.LuxuryWatch.Dto.CartCartItemRequestDto;
import com.example.LuxuryWatch.Dto.CartItemRequestDto;
import com.example.LuxuryWatch.http.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {
    @Autowired
    private CartDao cartDao;
    @Autowired
    private CartItemDao cartItemDao;
    public Cart createCart(User user){
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setCartItems(new ArrayList<>());
        cart.setStatus(CartStatus.UNCOMPLETED);
        return cartDao.save(cart);
    }
    public Cart updateCart(Cart cart){
        Cart cartFind = cartDao.findById(cart.getId()).get();
        cartFind.setStatus(CartStatus.COMPLETED);
        return cartDao.save(cartFind);
    }

    public Cart getCartByUserId(int user_id){
        List<Cart> list = cartDao.findByUserId(user_id).get();
        list.stream().filter( cart ->{
           return cart.getStatus() == CartStatus.UNCOMPLETED;
        });
        return list.get(0);
    }

    public List<CartItem> getAllItems(int id){
        List<CartItem> list = cartDao.findById(id).get().getCartItems();
        return list;
    }
    public ResponseEntity createCartItem(CartItemRequestDto cartItemRequestDto){ // user_id
        int id = cartItemRequestDto.getUser_id();
        Product product = cartItemRequestDto.getProduct();
        int quantity= cartItemRequestDto.getQuantity();
        try {
            List<Cart> cartList = cartDao.findByUserId(id).get();
            cartList.stream().filter( cart ->{
                return cart.getStatus() == CartStatus.UNCOMPLETED;
            });
            Cart cartFind = cartList.get(0);

            CartItem cartItemCreated = new CartItem();
            cartItemCreated.setCart(cartFind);
            cartItemCreated.setProduct(product);
            cartItemCreated.setQuantity(quantity);

            cartItemDao.save(cartItemCreated);

            List<CartItem> list = cartFind.getCartItems();
            list.add(cartItemCreated);
            cartFind.setCartItems(list);
            cartDao.save(cartFind);

            return ResponseEntity.ok().body(cartItemRequestDto);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.ofNullable(cartItemRequestDto);
        }
    }
    public ResponseEntity updateCartItem(CartItemRequestDto cartItemRequestDto){
        System.out.println("Update in Service");
        int cart_item_id = cartItemRequestDto.getUser_id(); // cart_item_id
        CartItem cartItem = cartItemDao.getById(cart_item_id).get();
        int quantity = cartItemRequestDto.getQuantity();
        int cart_id = cartItem.getCart().getId();
        // Find cart
        //      find its list (cartItems)
        //      get itemRemove from list by id of cartItem
        //      remove itemRemove from list
        //      add cartItem to list
        //      set list
        // Find cartItem
        //      set quantity
        try {
            CartItem cartItemFind = cartItemDao.getById(cart_item_id).get();
            cartItemFind.setQuantity(quantity);
            cartItemDao.save(cartItemFind);

            Cart cartFind = cartDao.findById(cart_id).get();
            List<CartItem> listRemove = cartFind.getCartItems();
            List<CartItem> list = listRemove.stream().filter( (item) ->{
               return item.getId()!=cartItem.getId();
            }).collect(Collectors.toList());
            list.add(cartItemFind);
            cartFind.setCartItems(list);
            cartDao.save(cartFind);
            System.out.println("Finish update in Service");
            return ResponseEntity.ok().body(cartItemRequestDto);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.ofNullable(cartItemRequestDto);
        }
    }
    public ResponseEntity deleteCartItem(int cartItem_id){ // cartItem_id


        // delete from cart-item
        //      get id from cartItem and delete it in cartItemDao
        // delete from cart
        //      get cartFind from cart by id
        //      find its list
        //      get itemRemove from list
        //      remove itemRemove from list
        //      set list
        try {
            CartItem cartItem= cartItemDao.findById(cartItem_id).orElseThrow(() -> new Error("Not Found Cart Item"));
            cartItemDao.deleteById(cartItem.getId());

            int id = cartItem.getCart().getId();
            Cart cartFind = cartDao.findById(id).orElseThrow(() ->  new Error("Not Found Cart"));
            List<CartItem> listRemain = cartFind.getCartItems();
            listRemain = listRemain.stream().filter( (item) ->{
               return item.getId()!=cartItem.getId();
            }).collect(Collectors.toList());
            cartFind.setCartItems(listRemain);
            cartDao.save(cartFind);

            return ResponseEntity.ok().body(cartItem_id);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.ofNullable(cartItem_id);
        }
    }

    public ResponseEntity clearCartItem(int cart_id){
        try{
            List<CartItem> cartItems = cartDao.findById(cart_id).get().getCartItems();
            for(CartItem cartItem : cartItems){
                int cartItem_id = cartItem.getId();
                deleteCartItem(cartItem_id);
            }
            return ResponseEntity.ok().body(cart_id);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.ofNullable(cart_id);
        }
    }
}
