package lt.receptai.rsp.service.impl;

import lt.receptai.rsp.dto.RecipeDto;
import lt.receptai.rsp.repository.RecipeRepository;
import lt.receptai.rsp.service.RecipeService;
import org.springframework.stereotype.Service;

@Service
public class RecipeServiceImpl implements RecipeService {
    private RecipeRepository recipeRepository;

    @Override
    public RecipeDto addRecipe(RecipeDto recipeDto) {
        return null;
    }
}
