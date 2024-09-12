package com.example.favoriteservice.Controller;


import com.example.favoriteservice.Beam.Favorite;
import com.example.favoriteservice.Service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorite")
public class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;

    @GetMapping
    public List<Favorite> getAll(){
        return favoriteService.getAll();
    }

    @GetMapping("/{user_id}")
    public List<Favorite> getByUserId(@PathVariable int user_id){
        return favoriteService.getByUserId(user_id);
    }

    @PostMapping
    public Favorite createFavorite(@RequestBody Favorite favorite){
        return favoriteService.createFavorite(favorite);
    }

    @DeleteMapping("/{id}")
    public Favorite deleteFavorite(@PathVariable Integer id){
        return favoriteService.deleteFavorite(id);
    }


}
