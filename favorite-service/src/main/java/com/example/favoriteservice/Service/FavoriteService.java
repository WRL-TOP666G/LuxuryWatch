package com.example.favoriteservice.Service;

import com.example.favoriteservice.Beam.Favorite;
import com.example.favoriteservice.Dao.FavoriteDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FavoriteService {


    @Autowired
    private FavoriteDao favoriteDao;

    public List<Favorite> getAll(){ return favoriteDao.findAll();}
    public List<Favorite> getByUserId(int user_id){
        List<Favorite> favoriteAll = favoriteDao.findAll();
        List<Favorite> favoriteList = favoriteAll.stream().filter( i -> {
            return i.getUser_id() == user_id;
        }).toList();
        return favoriteList;
    }

    public Favorite createFavorite(Favorite favorite){
        Favorite favoriteNew = new Favorite();
        favoriteNew.setUser_id(favorite.getUser_id());
        favoriteNew.setProduct_id(favoriteNew.getProduct_id());
        return favoriteDao.save(favoriteNew);
    }

    public Favorite deleteFavorite(Integer id){
        Favorite favoriteDelete = favoriteDao.findById(id).get();
        favoriteDao.delete(favoriteDelete);
        return favoriteDelete;
    }


}
