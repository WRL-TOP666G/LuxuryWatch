package com.example.LuxuryWatch.Controller;


import com.example.LuxuryWatch.Beam.CartItem;
import com.example.LuxuryWatch.Beam.Product;
import com.example.LuxuryWatch.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;


    @GetMapping
    public List<Product> getAll(){ return productService.getAll();}

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable int id){ return productService.getById(id); }

    @PreAuthorize("hasAuthority('ADMIN') and hasAuthority('USER')")
    @PostMapping("/create")
    public String createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @PreAuthorize("hasAuthority('ADMIN') and hasAuthority('USER')")
    @PutMapping("/updateInfo/{id}")
    public Product updateInfo(@RequestBody Product product){
        return productService.updateInfo(product);
    }

//    @PreAuthorize("hasAuthority('ADMIN') and hasAuthority('USER')")
    @PutMapping("/updateStock/{id}")
    public ResponseEntity updateStock(@PathVariable int id){ return productService.updateStock(id); }

    @PutMapping("/updateProductStock")
    public ResponseEntity updateProductStock(@RequestBody Product product){ return productService.updateProductStock(product); }


    @PreAuthorize("hasAuthority('ADMIN') and hasAuthority('USER')")
    @DeleteMapping("/delete")
    public String delete(@RequestBody Product product){
        return productService.deleteProduct(product);
    }
}
