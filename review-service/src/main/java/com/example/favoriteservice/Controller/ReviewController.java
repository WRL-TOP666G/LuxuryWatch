package com.example.favoriteservice.Controller;


import com.example.favoriteservice.Beam.Review;
import com.example.favoriteservice.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/product/{product_id}")
    public List<Review> getByProductId(@PathVariable int product_id){
        return reviewService.getByProductId(product_id);
    }

    @GetMapping("/user/{user_id}")
    public List<Review> getByUserId(@PathVariable int user_id){
        return reviewService.getByUserId(user_id);
    }

    @GetMapping
    public List<Review> getAll(){
        return reviewService.getAll();
    }

    @PostMapping
    public Review createReview(@RequestBody Review review){
        return reviewService.createReview(review);
    }

    @DeleteMapping("/{review_id}")
    public Review deleteReview(@PathVariable Integer review_id){
        return reviewService.deleteReview(review_id);
    }
}
