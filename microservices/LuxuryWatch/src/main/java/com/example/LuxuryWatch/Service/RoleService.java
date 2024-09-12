package com.example.LuxuryWatch.Service;


import com.example.LuxuryWatch.Beam.Role;
import com.example.LuxuryWatch.Beam.User;
import com.example.LuxuryWatch.Dao.RoleDao;
import com.example.LuxuryWatch.Dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    @Autowired
    RoleDao roleDao;

    @Autowired
    UserDao userDao;

    public Role saveRole(Role role) {
        return roleDao.save(role);
    }

    public List<Role> getRoles() {
        return roleDao.findAll();
    }

    public Role getById(int id){
        User user = userDao.findById(id).get();
        List<Role> roles = user.getRoles();
        return roles.get(0);
    }
}

