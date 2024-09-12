package com.example.LuxuryWatch.Controller;


import com.example.LuxuryWatch.Beam.User;
import com.example.LuxuryWatch.Beam.UserInfo;
import com.example.LuxuryWatch.Service.UserInfoService;
import com.example.LuxuryWatch.http.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/userinfo")
public class UserInfoController {
    @Autowired
    private UserInfoService userInfoService;

//    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public List<UserInfo> getAll(){ return userInfoService.getAll();}

    @GetMapping("/id/{id}")
    public UserInfo getUserInfoById(@PathVariable int id){ return userInfoService.getById(id); }

    @GetMapping("/user_id/{user_id}")
    public UserInfo getUserInfoByUserId(@PathVariable int user_id){ return userInfoService.getByUserId(user_id); }

    @PutMapping
    public UserInfo putUserInfos(@RequestBody UserInfo userInfo) {
        return userInfoService.updateUserInfo(userInfo);
    }
}
