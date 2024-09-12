package com.example.LuxuryWatch.Controller;

import com.example.LuxuryWatch.Beam.CartItem;
import com.example.LuxuryWatch.Beam.Order;
import com.example.LuxuryWatch.Beam.User;
import com.example.LuxuryWatch.Dto.CartItemsUserIdRequestDto;
import com.example.LuxuryWatch.Service.OrderService;
import com.example.LuxuryWatch.http.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;


//    @PreAuthorize("hasAuthority('ADMIN') and hasAuthority('USER')")
    @GetMapping
    public List<Order> getAll() {
        return orderService.getAll();
    }


    @GetMapping("/{id}")
    public Order getById(@PathVariable int id) {
        return orderService.getOrderById(id);
    }


    @PutMapping("/update/{cart_id}")
    public ResponseEntity update(@PathVariable int cart_id){
        return orderService.update(cart_id);
    }


    @DeleteMapping("/{id}")
    public Response delete(@PathVariable int id) {
        System.out.println("Order: " + id + " is fake deleted!");
        return new Response(true, "Order: " + id + " is fake deleted!");
    }

}
