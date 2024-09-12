package com.example.LuxuryWatch.Service;


import com.example.LuxuryWatch.Beam.User;
import com.example.LuxuryWatch.Beam.UserInfo;
import com.example.LuxuryWatch.Dao.UserDao;
import com.example.LuxuryWatch.Dao.UserInfoDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserInfoService {
    @Autowired
    private UserInfoDao userInfoDao;

    @Autowired
    private UserDao userDao;

    public List<UserInfo> getAll(){ return userInfoDao.findAll();}

//    public UserInfo getByUsername(String username){
//        Optional<UserInfo> p =  userInfoDao.findByName(username);
//        if(p.isPresent()) return p.get();
//        else return null;
//    }

    public UserInfo getById(int id){
        Optional<UserInfo> p =  userInfoDao.findById(id);
        if(p.isPresent()) return p.get();
        else return null;
    }

    public UserInfo getByUserId(int user_id){
        Optional<UserInfo> p =  userInfoDao.findByUserId(user_id);
        if(p.isPresent()) return p.get();
        else return null;
    }


    public UserInfo createUserInfo(User user){
        UserInfo userInfo = new UserInfo();
        userInfo.setUser(user);
        userInfo.setName(null);
        userInfo.setPhone(null);
        userInfo.setEmail(null);
        userInfo.setAddress1(null);
        userInfo.setAddress2(null);
        userInfo.setCity(null);
        userInfo.setState(null);
        userInfo.setZip(null);
        userInfo.setMembership(false);
        return userInfoDao.save(userInfo);
    }

    public UserInfo updateUserInfo(UserInfo userInfo) {
        User user = userDao.findById(userInfo.getId()).get();
        userInfo.setUser(user);
        UserInfo ud = userInfoDao.findByUserId(user.getId()).get();
        userInfo.setId(ud.getId());

//        System.out.println(userInfo);
        return userInfoDao.save(userInfo);
    }
}
