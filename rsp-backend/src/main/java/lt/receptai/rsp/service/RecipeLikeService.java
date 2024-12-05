package lt.receptai.rsp.service;


import lt.receptai.rsp.dto.RecipeLikeDto;

import java.util.List;

public interface RecipeLikeService {

    RecipeLikeDto addLike(RecipeLikeDto recipeLikeDto);

    RecipeLikeDto getLikeById(Long likeId);

    List<RecipeLikeDto> getAllLikes();

    RecipeLikeDto updateLike(RecipeLikeDto likeDto, Long likeId);

    void deleteLike(Long likeId);
}
