package com.example.LuxuryWatch.Controller;


import com.example.LuxuryWatch.Beam.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/review")
public class ReviewController {

//    @PostMapping
//    public Review createReview(@PathVariable int id,
//                               @RequestBody Product product,
//                               @RequestBody Review review){
//        return reviewSerivce.createReview(id, product, review);
//    }
//
//    @DeleteMapping
//    public Review deleteReview(@RequestBody Review review){
//        return reviewSerivce.deleteReview(review);
//    }
//


    @Autowired
    private RestTemplate restTemplate;
    String requestUrl = "http://localhost:8081/api/review";

    @GetMapping
    public List<Review> getAll(){
        ResponseEntity<List> res = restTemplate.exchange(requestUrl, HttpMethod.GET, null, List.class);
        return res.getBody();
    }

    @GetMapping("/product/{product_id}")
    public List<Review> getReviewsByProductId(@PathVariable Integer product_id){
        HttpEntity<Integer> request = new HttpEntity<>(product_id);
        String myRequest = requestUrl + "/product/" + String.valueOf(product_id);
        ResponseEntity<List> res = restTemplate.exchange(myRequest, HttpMethod.GET, null, List.class);
        return res.getBody();
    }

    @GetMapping("/user/{user_id}")
    public List<Review> getReviewsByUserId(@PathVariable Integer user_id){
        HttpEntity<Integer> request = new HttpEntity<>(user_id);
        String myRequest = requestUrl + "/user/" + String.valueOf(user_id);
        System.out.println("___________");
        System.out.println(request);
        ResponseEntity<List> res = restTemplate.exchange(myRequest, HttpMethod.GET, null, List.class);
        System.out.println(res.getBody());
        System.out.println("___________");
        return res.getBody();
    }

    @PostMapping
    public String createReview(@RequestBody Review review){
        HttpEntity<Review> request = new HttpEntity<>(review);
        System.out.println(review);
        ResponseEntity<String> res = restTemplate.exchange(requestUrl, HttpMethod.POST, request, String.class);
        return res.getBody();
    }

    @DeleteMapping("/{review_id}")
    public String deleteReview(@PathVariable Integer review_id){
        HttpEntity<Integer> request = new HttpEntity<>(review_id);
        String myRequest = requestUrl + "/" + String.valueOf(review_id);
        ResponseEntity<String> res = restTemplate.exchange(myRequest, HttpMethod.DELETE, request, String.class);
        return res.getBody();
    }
}
