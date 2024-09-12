package com.example.LuxuryWatch.Service;


import com.example.LuxuryWatch.Beam.Product;
import com.example.LuxuryWatch.Beam.User;
import com.example.LuxuryWatch.Dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserDao userDao;
    public List<User> getAll() {
        return userDao.findAll();
    }

    public User saveUser(User user) {
        return userDao.save(user);
    }

    public User getById(int id){
        Optional<User> user = userDao.findById(id);
        if(user.isPresent()) return user.get();
        else return null;
    }


}
