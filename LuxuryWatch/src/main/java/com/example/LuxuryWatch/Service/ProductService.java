package com.example.LuxuryWatch.Service;

import com.example.LuxuryWatch.Beam.*;
import com.example.LuxuryWatch.Dao.CartDao;
import com.example.LuxuryWatch.Dao.ProductDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductDao productDao;

    @Autowired
    private CartDao cartDao;
    public List<Product> getAll(){ return productDao.findAll();}

    public Product getById(int id){
        Optional<Product> p =  productDao.findById(id);
        if(p.isPresent()) return p.get();
        else return null;
    }
    public String createProduct(Product product){
        productDao.save(product);
//        reviewSerivce.createReview(product);
        return "Success!";
    }

    public Product updateInfo(Product product){
        try {
            int id = product.getId();
            Product productRemove = productDao.findById(id).get();
            if (productRemove == null)  throw new Exception();

            deleteProduct(productRemove.getId());
            return productDao.save(product);

        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

//    public ResponseEntity updateStock(int id){
//        Cart cart = cartDao.findById(id).get();
//        List<CartItem> cartItems= cart.getCartItems();
//        try {
//            for(CartItem cartItem: cartItems){
//                Product product = cartItem.getProduct();
//                int quantity = cartItem.getQuantity();
//                Product productFind = productDao.findById(product.getId()).get();
//                if(productFind == null) throw new Exception();
//                productFind.setStock(product.getStock()-quantity);
//                productDao.save(productFind);
//            }
//
//            return ResponseEntity.ok().body(cartItems);
//        }catch(Exception e){
//            e.printStackTrace();
//            return null;
//        }
//    }

    public ResponseEntity updateProductStock(Product product){
        try {
            int id = product.getId();
            int stock = product.getStock();
            Product productFind = productDao.findById(id).get();
            if(productFind == null) throw new Exception();
            productFind.setStock(stock);
            productDao.save(productFind);
            return ResponseEntity.ok().body(product);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }


    public Product deleteProduct(int id){
        Product deletedProduct = productDao.findById(id).get();
        productDao.delete(deletedProduct);
        return deletedProduct;
    }
}
