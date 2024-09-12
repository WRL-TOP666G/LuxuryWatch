package com.example.LuxuryWatch.Controller;


import com.example.LuxuryWatch.Beam.Role;
import com.example.LuxuryWatch.Beam.User;
import com.example.LuxuryWatch.Service.RoleService;
import com.example.LuxuryWatch.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;

//    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public List<User> getAll() {
        return userService.getAll();
    }

//    @PreAuthorize("hasAuthority('ADMIN') and hasAuthority('USER')")
    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.getById(id);
    }

//    @PreAuthorize("hasAuthority('ADMIN') and hasAuthority('USER')")
    @GetMapping("/role/{id}")
    public Role getUserRoleById(@PathVariable int id) { return roleService.getById(id);}
}
