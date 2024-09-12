package com.example.favoriteservice.Service;

import com.example.favoriteservice.Beam.Review;
import com.example.favoriteservice.Dao.ReviewDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewDao reviewDao;

//    @Autowired
//    private UserDao userDao;
    public List<Review> getByProductId(int product_id){
        List<Review> reviewAll = reviewDao.findAll();
        List<Review> reviewList = reviewAll.stream().filter( item ->{
           return item.getProduct_id() == product_id;
        }).toList();
        return reviewList;
    }
    public List<Review> getByUserId(int user_id){
        List<Review> reviewAll = reviewDao.findAll();
        List<Review> reviewList = reviewAll.stream().filter( item ->{
            return item.getUser_id() == user_id;
        }).toList();
        return reviewList;
    }

    public List<Review> getAll(){ return reviewDao.findAll(); }

    public Review createReview(Review review){
        Review reviewNew = new Review();
//        User user = userProductReviewRequestDto.getUser();
//        Product product = userProductReviewRequestDto.getProduct();
//        Review review = userProductReviewRequestDto.getReview();
        reviewNew.setUser_id(review.getUser_id());
        reviewNew.setProduct_id(review.getProduct_id());
        reviewNew.setRating(review.getRating());
        reviewNew.setComment(review.getComment());

        // Timestamp
        long timestampInMillis = System.currentTimeMillis(); // Replace this with your actual long timestamp value
        java.sql.Timestamp timestamp = new java.sql.Timestamp(timestampInMillis);
        reviewNew.setReview_date(timestamp);

        System.out.println(reviewNew);

        return reviewDao.save(reviewNew);
    }

    public Review deleteReview(Integer review_id){
        Review reviewDelete = reviewDao.findById(review_id).get();
        reviewDao.delete(reviewDelete);
        return reviewDelete;
    }
}
