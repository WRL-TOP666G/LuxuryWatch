package com.example.LuxuryWatch.Controller;

import com.example.LuxuryWatch.Beam.*;
import com.example.LuxuryWatch.Dto.CartItemRequestDto;
import com.example.LuxuryWatch.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carts")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/create/cart")
    public Cart createCart(@RequestBody User user) {
        return cartService.createCart(user);
    }

//    @PreAuthorize("hasAuthority('ADMIN') and hasAuthority('USER')")
    @PutMapping("/update/cart")
    public Cart updateCart(@RequestBody Cart cart) {
        return cartService.updateCart(cart);
    }

//    @PreAuthorize("hasAuthority('ADMIN') and hasAuthority('USER')")
    @GetMapping("/get/{user_id}")
    public Cart getCartByUserId(@PathVariable int user_id){
        return cartService.getCartByUserId(user_id);
    }

//    @PreAuthorize("hasAuthority('ADMIN') and hasAuthority('USER')")
    @GetMapping("/getAll/{id}")
    public List<CartItem> getAllItems(@PathVariable int id){
        return cartService.getAllItems(id);
    }

//    @PreAuthorize("hasAuthority('ADMIN') and hasAuthority('USER')")
    @PostMapping("/create")
    public ResponseEntity createCartItem(@RequestBody CartItemRequestDto cartItemRequestDto){
        return cartService.createCartItem(cartItemRequestDto);
    }

//    @PreAuthorize("hasAuthority('ADMIN') and hasAuthority('USER')")
    @PutMapping("/update/cartItem")
    public ResponseEntity updateCartItem(@RequestBody CartItemRequestDto cartItemRequestDto){
        return cartService.updateCartItem(cartItemRequestDto);
    }

//    @PreAuthorize("hasAuthority('ADMIN') and hasAuthority('USER')")
    @DeleteMapping("/delete/cartItem/{cartItem_id}")
    public ResponseEntity deleteCartItem(@PathVariable int cartItem_id){
        return cartService.deleteCartItem(cartItem_id);
    }

//    @PreAuthorize("hasAuthority('ADMIN') and hasAuthority('USER')")
    @DeleteMapping("/clear/{cart_id}")
    public ResponseEntity clearCartItem(@PathVariable int cart_id){
        return cartService.clearCartItem(cart_id);
    }
}
